import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"
import { getUserById, } from "./data/user"
import { getTwoFactorConfirmationById } from "./data/twoFactorConfirmation"

declare module "next-auth" {
    interface Session {
        user: {
            role: "ADMIN" | "USER"
        } & DefaultSession["user"]
    }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id || '')
            if (!existingUser?.emailVerified) return false
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = getTwoFactorConfirmationById(existingUser.id)
                console.log({ twoFactorConfirmation })
                if (!twoFactorConfirmation) return false
                await db.twoFactorConfirmation.delete({
                    where: { userId: existingUser.id }
                })
            }
            return true
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "USER"
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role
            return token

        },

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})