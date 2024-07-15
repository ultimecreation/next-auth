import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import Header from './Header'
import BackButton from './BackButton'
import CardWrapper from './CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const ErrorCard = () => {
    return (
        <CardWrapper headerLabel='Something went wrong'
            backButtonLabel='Back To Login'
            backButtonHref='/auth/login'
        >
            <div className="w-full flex justify-center items-center">

                <ExclamationTriangleIcon />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard