'use client'

import React from 'react'
import { getServerSession } from 'next-auth'
import LogoutButton from './LogoutButton'

const UserInfo = () => {

  const session = async () => {
    const s = getServerSession()
    return s
  }

  let user = localStorage.getItem('evp_u')

  return <>
    <h1>Email: {user}</h1>
    {!!session &&
      <LogoutButton />
    }
    {!session &&
      <h1>Something went terribly wrong close the website and open it again</h1>
    }
  </>
}

export default UserInfo