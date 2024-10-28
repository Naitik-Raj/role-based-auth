//type configuration for the session in the auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}