// import { DefaultSession } from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER"
}
// // declare module "next-auth" {
// //     interface Session {
// //         user: {
// //             role: ExtendedUser
// //         }
// //     }
// // }

// declare module "next-auth" {
//     /**
//      * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         user: {
//             /** The user's postal address. */
//             // role: string
//             role: "ADMIN" | "USER"
//             /**
//              * By default, TypeScript merges new interface properties and overwrites existing ones.
//              * In this case, the default session user properties will be overwritten,
//              * with the new ones defined above. To keep the default session user properties,
//              * you need to add them back into the newly declared interface.
//              */
//         } & DefaultSession["user"]
//     }
// }