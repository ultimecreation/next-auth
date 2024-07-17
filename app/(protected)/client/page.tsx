
"use client"
import { UserInfo } from '@/components/auth/UserInfo'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { currentUser } from '@/lib/auth'
import React from 'react'

const ClientPage = () => {
    const user = useCurrentUser()
    return (
        <UserInfo label='Client component' user={user} />
    )
}

export default ClientPage