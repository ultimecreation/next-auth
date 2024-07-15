import CardWrapper from '@/components/auth/CardWrapper'
import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const RegisterPage = () => {
    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel="Already have an account"
            backButtonHref='/auth/login'
            showSocial>

            <RegisterForm />
        </CardWrapper>
    )
}

export default RegisterPage