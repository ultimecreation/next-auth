
import { UserInfo } from '@/components/auth/UserInfo'
import { currentUser } from '@/lib/auth'
import React from 'react'

const ServerPage = async () => {
    const user = await currentUser()
    return (
        <UserInfo label='Server component' user={user} />
    )
}

export default ServerPage