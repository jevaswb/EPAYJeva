'use client'
import { addParticipant } from '@/functions/otherFetchFunction'
import React, { FormEvent, useState } from 'react'

const AddParticipantForm = () => {

    const [error, setError] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [screen_name, setScreenName] = useState<string>('')
    const [current_screen_name_length, setCurrentScreenNameLength] = useState<number>(0)
    const maxLength_screen_name:number = 40

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        setInfo("")
        
        //get user for fetch
        const evp_u = localStorage.getItem("evp_u");
        if (evp_u === null) {
            setError(`Something went wrong. Please try it later again!`)
            return;
        }

        const response = await addParticipant(JSON.parse(evp_u),screen_name,email)
        if(response.error){
            if(response.message === null){
                setError(`That should not happen - please contact the coders about that issue!`)
                return
            }
            setError(response.message)
            return
        }
        //ok handling
        setInfo(response.data)
        setError("")
        setEmail("")
        setScreenName("")
        setCurrentScreenNameLength(0)
    }

    return <>
        <div className='authentication-container'>
            <div className='authentication-sub-container'>
                <h1 className='authentication-headline'>
                    Add Participant
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className='authentication-label'>
                        Email address
                    </label>
                    <input id='email' name='email' type="email" placeholder='email' value={email} autoComplete='off' required className='authentication-input' onChange={(event) => setEmail(event.target.value)} />

                    <label htmlFor="text-name" className='authentication-label'>
                        Name
                    </label>
                    <input id='text-name' name='text-name' type="text" value={screen_name} autoComplete="off" maxLength={maxLength_screen_name} placeholder='name that is shown for the participant' required className='authentication-input' onChange={(event) => {setScreenName(event.target.value); setCurrentScreenNameLength(event.target.value.length)}} />
                    {/* //todo stylen in css counter */}
                    <div className='input-counter'>{`${current_screen_name_length}/${maxLength_screen_name}`}</div> 

                    {error && (
                        <div className='error-message'>
                            <p className='font-medium'>You've got an error</p>
                            {error}
                        </div>
                    )}

                    <button type='submit' className='authentication-button'>Add</button>

                </form>

                
            </div>
        </div>
        {info && (
            <div className='successful-message '>
                <p className='font-medium'>added</p>
                {info}
            </div>
        )}

    </>
}

export default AddParticipantForm