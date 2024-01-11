'use client'
import sendEmail from '@/functions/emailFunction'
import React, { FormEvent, useState } from 'react'

const RequestForm = () => {
    const [email, setEmail] = useState('')
    const [sender, setSender] = useState('')
    const [message, setMessage] = useState('')
    const [header, setHeader] = useState('')
    const [error, setError] = useState('')
    const [sucess, setSucess] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        const data = {
            to: email,
            sender: sender,
            message: message,
            head: header
        }
        const value:any = await sendEmail('req', data)

        if (value !== '""') {
            setSucess(false)
            setError(`${value}`)
        } else {
            setError('');
            setSucess(true);
            (document.querySelector('#form-id') as HTMLFormElement).reset()
        }
    }

    return <>
        <div className='authentication-container'>
            <div className='authentication-sub-container'>
                <h1 className='authentication-headline'>
                    Send Email to Admin
                </h1>
                <form id='form-id' onSubmit={handleSubmit}>
                    <label htmlFor="email" className='authentication-label'>
                        Email address (of admin)
                    </label>
                    <input id='email' name='email' type="email" placeholder='email address of the admin' required className='authentication-input' onChange={(event) => setEmail(event.target.value)}/>

                    <label htmlFor="sender-name" className='authentication-label'>
                        From
                    </label>
                    <input id='sender-name' name='sender-name' type="text" placeholder='from (please enter your name)' required className='authentication-input' onChange={(event) => setSender(event.target.value)} />

                    <label htmlFor="head" className='authentication-label'>
                        Head
                    </label>
                    <input id='head' name='head' type="text" placeholder='head' required className='authentication-input' onChange={(event) => setHeader(event.target.value)} />

                    <label htmlFor="message" className='authentication-label'>
                        Message
                    </label>
                    <input id='message' name='message' type="text" placeholder='message' required className='authentication-input' onChange={(event) => setMessage(event.target.value)} />

                    {error && (
                        <div className='error-message'>
                            <p className='font-medium'>You've got an error</p>
                            {error}
                        </div>
                    )}

                    {sucess && (
                        <div className='successful-message'>
                            <p className='font-medium'>Email sent succesfull</p>
                        </div>
                    )}

                    <button type='submit' className='authentication-button' >Send</button>
                </form>
            </div>
        </div>
    </>
}

export default RequestForm