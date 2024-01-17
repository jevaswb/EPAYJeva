'use client'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const res: any = await signIn('credentials', {
        email: email,
        pw: pw,
        redirect: false
      })

      console.log(res)

      if (res.error) {
        setError('Invalid Credentials')
      } else {
        localStorage.setItem('evp_u', JSON.stringify(email))
        setError('')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return <>
    <div className='authentication-container'>
      <div className='authentication-sub-container'>
        <h1 className='authentication-headline'>
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className='authentication-label'>
            Email address
          </label>
          <input id='email' name='email' type="email" placeholder='email' className='authentication-input' required onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor="password" className='authentication-label'>
            Password
          </label>
          <input id='password' name='password' type="password" placeholder='password' className='authentication-input' required onChange={(event) => setPw(event.target.value)} />

          {error && (
            <div className='error-message'>
              <p className='font-medium'>You've got an error</p>
              {error}
            </div>
          )}

          <button type='submit' className='authentication-button'>Login</button>

          <p className='text-center mt-3'>Don't have an account? <Link href={'/register'} className='text-teal-400 '>Register</Link></p>
        </form>
      </div>
    </div>
  </>
}

export default LoginForm