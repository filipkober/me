export { default } from "next-auth/middleware";

export const config = {

    // all routes under /admin except /admin/login
    // ? any more exceptions can be added by adding "|<route>" after "?!login"
    matcher: [
      '/admin/((?!login).*)',
      '/admin'
    ],
};