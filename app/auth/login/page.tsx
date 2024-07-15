import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
    return (
        <CardWrapper headerLabel='Welcome back' backButtonLabel="Dont have an account?"
            backButtonHref='/auth/register' showSocial>

            <LoginForm />
        </CardWrapper>
    )
}

export default LoginPage