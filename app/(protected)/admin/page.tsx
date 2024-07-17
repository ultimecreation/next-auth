"use client"
import { admin } from "@/actions/admin"
import RoleGate from "@/components/auth/RoleGate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormSuccess } from "@/components/ui/FormSuccess"
import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { Chicle } from "next/font/google"
import { Children } from "react"
import { toast } from "sonner"

const AdminPage = () => {
    const role = useCurrentRole()
    const onServerActionClick = async () => {
        const response = await admin()
        if (response.success) return toast.success("good job")
        else return toast.error('bad job')
    }
    const onApiRouteClick = async () => {
        const response = await fetch('/api/admin')
        if (response.ok) return toast.success("good job")
        else return toast.error('bad job')
    }
    return (
        <Card className="w-[600px]">
            <CardHeader className="text-2xl font-semibold text-center">
                <p className="text-2xl">Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to access this content" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin only api routes
                    </p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin only server action
                    </p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage