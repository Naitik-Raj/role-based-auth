import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Add these logs at the start of your middleware function
    // console.log('Current pathname:', nextUrl.pathname);
    // console.log('Is logged in:', isLoggedIn);
    // console.log('Is public route:', isPublicRoute);
    // console.log('Auth status:', req.auth);

    // Check API routes first
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Check auth routes before redirect logic
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    // Then handle protected routes
    if (!isLoggedIn && !isPublicRoute) {
        const loginUrl = new URL('/auth/login', nextUrl);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};