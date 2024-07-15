"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import bcrypt from 'bcryptjs'
import { LoginSchema, RegisterSchema } from "@/schemas"
import { z } from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }
    const { email, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" }
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmation email sent" }
    }

    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                case "CallbackRouteError":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong test" }
            }
        }
        throw error
    }
}
export const register = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }
    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if (existingUser) return { error: "Email already in use" }


    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "Confirmation email sent" }
}