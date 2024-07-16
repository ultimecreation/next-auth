
"use server"

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken"
import { getUserByEmail } from "@/data/user"
import { NewPasswordSchema } from "@/schemas"
import { z } from "zod"
import bcryptjs from 'bcryptjs'
import { db } from "@/lib/db"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if (!token) return { error: "Missing token" }

    const validatedFields = await NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) return { error: "Invalid fields" }


    const { password } = validatedFields.data
    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) return { error: "Token does not exist" }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) return { error: "Token has expired" }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) return { error: "Email does not exists" }

    const hashedPassword = await bcryptjs.hash(password, 10)
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    })

    await db.passwordResetToken.delete({
        where: { email: existingUser.email, token: token }
    })

    return { success: "Password updated" }
}