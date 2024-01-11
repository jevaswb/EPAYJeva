import LoginForm from '@/components/Login/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Login = async () => {
    const session = await getServerSession()
    if (session) {
        redirect('/dashboard')
    }
    return <>
        <LoginForm />
    </>
}

export default Login