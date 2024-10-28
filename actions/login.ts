"use server"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getVerificationByEmail } from "@/data/verification-token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    //now in action we have to validate data getting from the login form 
    // console.log(data);
    const validateFields = LoginSchema.safeParse(values);
    //if the data is not valid then we will return an error
    // if (!validateFields.success) throw new Error("Invalid credentials");

    // //now we have to call the login api
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    // });

    // //now we have to handle the response
    // const responseData = await response.json();
    // console.log(responseData);

    if (!validateFields.success) return {
        error: "Invalid credentials",
    }

    const { email, password } = validateFields.data;
    const existingUser = await getVerificationByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        return { success: "Otp sent to email!" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.message) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials",
                    }
                default:
                    return {
                        error: "Something went wrong",
                    }
            }
        }
        throw error;
    }
    return null;
}
