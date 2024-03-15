"use client"

import { AuthLayout } from "@/components/layout/AuthLayout"
import Box from "@mui/material/Box/Box"
import Button from "@mui/material/Button/Button"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Option {
    role: string,
    email: string,
    password?: string
}

export default function LoginRecurrente() {
    
    console.log("cargando login recurrente");
    const options: Option[] = [
        {role: "Administrador", email: "dev.mauricio.munoz@gmail.com"},
        {role: "Consultante", email: "paciente@gmail.com"},
        {role: "Practicante", email: "riascossamuel@gmail.com"},
        {role: "Tutor", email: "sarripita@gmail.com"},
        {role: "Coordinador", email: "javier.reyes@correounivalle.edu.co"}
    ]
    
    function ingresar(page: string, email: string) {
        signIn("google");
    }
    return (
        <AuthLayout title="Hola">
            <Box>
                {options.map((option) => <Button key={option.role}
                    size="large"
                    sx={{ margin: 3, display: "block", width: "100%" }}
                    onClick={() => ingresar(option.role, option.email)}>{option.role}</Button>)}
            </Box>
        </AuthLayout>
    )
}