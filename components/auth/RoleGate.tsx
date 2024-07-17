"use client"

import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { FormError } from "../ui/formError"

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}
const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = useCurrentRole()
    if (role !== allowedRole) return <FormError message="You don't have the required role" />
    return (
        <>
            {children}
        </>
    )
}

export default RoleGate