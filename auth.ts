import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
    //for getting the same route if anything went wrong we use pages
    pages: {
        signIn: "/auth/login",
        // signOut: "/auth/logout",
        error: "/auth/error"
    },

    //inflacting the database that emailVerified when user signin with the OAuth provider so it will update the data with emailVerified to the current date
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
    /*
    The customField is visible in the session because NextAuth.js automatically passes JWT token data to the session callback. The flow works like this:
    
    First, the JWT callback runs and adds customField: "test" to the token
    Then, the session callback receives both the session and token as parameters
    When you return the session, it inherits the token's properties by default */
    callbacks: {
        async signIn({ user, account }) {
            //-but here we allow OAuth without email verification
            if (account?.provider !== "credentials") return true;
            if(!user.id) return false;
            const existingUser = await getUserById(user.id);

            //prevent signIn without verification
            if (!existingUser?.emailVerified) return false;
            //TODO: Add 2FA check

            //by default we allow user to sign in but-
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            // console.log("session", { session, token })

            /*// To see this more explicitly, you can modify the session callback to include the token data:
            // Send properties to the client, like an access_token from a provider.
            if (session.user) {
                session.user.customField = token.customField
            }
            */

            //added type for role to session for the typescript error
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token }) {
            // console.log("jwt", { token })
            // token.customField = "test"
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    },

    /*
    This is a powerful feature that lets you pass data from your JWT token directly to the client-side session.
    */
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})