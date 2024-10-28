/**** This is Js documentation...
 * An array of routes that are accessible to the public 
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
    "/",
    "/auth/login",
    "/auth/register",
];

/****
 * An array of routes that are used for the authentication 
 * These routes will redirect logged in users to the settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "auth/login",
    "auth/register",
    "auth/error",
];

/****
 * The prefix for API authentication routes
 * Rotues that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/****
 * Default redirect route for the login page after successful login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";