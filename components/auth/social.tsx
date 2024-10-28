'use client'

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    const onClick = (provider:
        "google" | "github"
    ) => {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    }
    return (
        <div className="w-full flex flex-col gap-y-4">
            <Button variant="outline" size="lg" className="w-full" onClick={() => onClick("google")}>
                <FcGoogle className="h-5 w-5" />
                Sign in with Google
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={() => onClick("github")}>
                <FaGithub className="h-5 w-5" />
                Sign in with Github
            </Button>
        </div>
    )
}