"use client"
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { SetStateAction, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../ui/formError'
import { FormSuccess } from '../ui/FormSuccess'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
        ? 'Email already in use with another  provider'
        : ''

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field} type='email' disabled={isPending} autoComplete="email" />
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
                                        {...field} type='password' disabled={isPending} autoComplete="current-password" />
                                </FormControl>
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className='px-0 font-normal'
                                >
                                    <Link href="/auth/reset">Forgot password</Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )} />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? 'Sending...' : 'Login'}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm