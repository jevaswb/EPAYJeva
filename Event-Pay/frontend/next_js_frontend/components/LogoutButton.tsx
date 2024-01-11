'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
    return <>
        <button onClick={() => {
            localStorage.removeItem('evp_u')
            signOut()
        }}>Logout Button</button>
    </>
}

export default LogoutButton