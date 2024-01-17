'use client'
import fetchData from '@/functions/fetchFunction'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'


const RegisterForm = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [user_name, setUserName] = useState('')
    const [pw, setPw] = useState('')
    const [pwC, setPwC] = useState('')

    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if(pw !== pwC){
            setError(`Passwords don't match`)
        }else if (/^(?=.{8,40}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!-+*~?/"§$%&()0-9])/.test(pw) && pw !== undefined) {
            const data = {
                email: email,
                user_name: user_name,
                pw: pw
            }
            const value = await fetchData('reg', data)

            console.log(value)

            if (value !== '""') {
                setError(`${value}`)
            } else {
                setError('')
                router.push('/login')
            }
        } else {
            setError(`password: uppercase-, lowercase letters, symbols or numbers 8-40 letters`)
        }
    }

    return <>
        <div className='authentication-container'>
            <div className='authentication-sub-container'>
                <h1 className='authentication-headline'>
                    Register a new Account
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className='authentication-label'>
                        Email address
                    </label>
                    <input id='email' name='email' type="email" placeholder='email' required className='authentication-input' onChange={(event) => setEmail(event.target.value)} />

                    <label htmlFor="text-name" className='authentication-label'>
                        Username
                    </label>
                    <input id='text-name' name='text-name' type="text" placeholder='username' required className='authentication-input' onChange={(event) => setUserName(event.target.value)} />

                    <label htmlFor="password" className='authentication-label'>
                        Password
                    </label>
                    <input id='password' name='password' type="password" placeholder='password' required className='authentication-input' onChange={(event) => setPw(event.target.value)} />

                    <label htmlFor="confirm-password" className='authentication-label'>
                        Confirm password
                    </label>
                    <input id='confirm-password' name='confirm-password' type="password" placeholder='confirm password' required className='authentication-input' onChange={(event) => setPwC(event.target.value)} />

                    {error && (
                        <div className='error-message'>
                            <p className='font-medium'>You've got an error</p>
                            {error}
                        </div>
                    )}

                    <button className='authentication-button'>Register</button>

                    <p className='text-center mt-3'>Already have an account? <Link href={'/login'} className='text-teal-400 '>Login</Link></p>
                </form>
            </div>
        </div>
    </>
}

export default RegisterForm