"use client"
import { ResetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../ui/formError'
import { FormSuccess } from '../ui/FormSuccess'
import CardWrapper from './CardWrapper'
import { reset } from '@/actions/reset'


const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Forgot your password'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'
        >


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
                                            {...field} type='email' disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type='submit' className='w-full' disabled={isPending}>
                        {isPending ? 'Sending...' : 'Send reset email'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm