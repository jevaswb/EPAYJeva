import RegisterForm from '@/components/Register/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function Register() {
    const session = await getServerSession()
    if (session) {
        redirect('/dashboard')
    }
    return <>
        <RegisterForm />
    </>
}

export default Register