"use server"

import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    //now in action we have to validate data getting from the login form 
    console.log(values);
    const validateFields = RegisterSchema.safeParse(values);
    //if the data is not valid then we will return an error
    // if (!validateFields.success) throw new Error("Invalid credentials");

    // //now we have to call the login api
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    //     method: "POST",
    //     body: JSON.stringify(values),
    // });

    // //now we have to handle the response
    // const responseData = await response.json();
    // console.log(responseData);

    if (!validateFields.success) return {
        error: "Invalid credentials",
    }
    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) return {
        error: "User already exists",
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    //send email to the user
    const verificationToken = await generateVerificationToken(email);

    return {
        success: "Confirmation Email Sent Successfully...",
    }
}
