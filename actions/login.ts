"use server"

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import bcrypt from 'bcryptjs'
import { LoginSchema, RegisterSchema } from "@/schemas"
import { z } from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)
    const dataToReturn = { error: '', success: '' }

    if (!validatedFields.success) {
        dataToReturn.error = 'Invalid fields'
        return dataToReturn
    }
    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                case "CallbackRouteError":
                    dataToReturn.error = "Invalid credentials"
                    return dataToReturn
                default:
                    dataToReturn.error = "Something went wrong test"
                    return dataToReturn
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
    // const hashedPassword = await bcrypt.hash(password, 10)
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


    return { success: 'User created' }
}