"use client"

import { useSearchParams } from "next/navigation"
import CardWrapper from "./CardWrapper"
import { BeatLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from "react"
import { newVerifcation } from "@/actions/newVerification"
import { FormSuccess } from "../ui/FormSuccess"
import { FormError } from "../ui/formError"
const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (success || error) return
        if (!token) return setError('Missing Token')
        newVerifcation(token)
            .then(data => {
                setError(data.error)
                setSuccess(data.success)
            })
            .catch(() => setError('Something went wrong'))

    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {
                    !success && !error && <BeatLoader />
                }

                <FormSuccess message={success} />
                {!error && <FormError message={error} />}

            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm