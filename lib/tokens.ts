import {v4 as uuidv4} from "uuid";
import {getVerificationByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);
    const existingToken = await getVerificationByEmail(email);
    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })
    return verificationToken;
}