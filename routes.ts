
/**
 * Array of public routes
 *
 * @var {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
]

/**
 * Array of private routes redirecting to /settings
 *
 * @var {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",

]

/**
 * prefix for API authentication
 *
 * @var {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * redirect path after successfull login
 *
 * @var {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"