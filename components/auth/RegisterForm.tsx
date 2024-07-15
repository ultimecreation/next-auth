"use client"
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../ui/formError'
import { FormSuccess } from '../ui/FormSuccess'
import { register } from '@/actions/login'

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            register(values)
                .then(data => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field} type='text' disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field} type='email' disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field} type='password' disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? 'Sending...' : 'Register'}
                </Button>
            </form>
        </Form>
    )
}

export default RegisterForm