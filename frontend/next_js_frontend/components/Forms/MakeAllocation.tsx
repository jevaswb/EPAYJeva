'use client'
import { createAllocation, datalistFetch } from '@/functions/otherFetchFunction'
import React, { FormEvent, useEffect, useState } from 'react'

const MakeAllocation = () => {

    const [error, setError] = useState<string>('')
    const [screen_name, setScreenName] = useState<string>('')
    const [event_name, setEventName] = useState<string>('')
    const [info, setInfo] = useState<string>('')

    const [datalist_event, setDatalistEvent] = useState<string[]>([]);
    const [datalist_participant, setDatalistParticipant] = useState<string[]>([]);

    useEffect(() => {
        //get user for fetch
        const evp_u = localStorage.getItem("evp_u");
        if (evp_u === null) {
            setError(`Something went wrong. Please try it later again!`)
            return;
        }
        datalistFetch("event", JSON.parse(evp_u))
          .then((data) => {
            if(data.error){
              console.log('datalist-event could not be loaded!')
              //setError(`Datalist-Event could not be loaded - ${data.message}`)
              return
            }
            setDatalistEvent(data.data.sort((a:any, b:any) => a.localeCompare(b)));
        });
        datalistFetch("participant", JSON.parse(evp_u))
          .then((data) => {
            if(data.error){
              console.log('datalist-participant could not be loaded!')
              //setError(`Datalist-Particpant could not be loaded - ${data.message}`)
              return
            }
            setDatalistParticipant(data.data.sort((a:any, b:any) => a.localeCompare(b)));
        });
        
      }, []);
    
    

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        setInfo("")
        
        //get user for fetch
        const evp_u = localStorage.getItem("evp_u");
        if (evp_u === null) {
            setError(`Something went wrong. Please try it later again!`)
            return;
        }

        const response = await createAllocation(JSON.parse(evp_u),screen_name,event_name)
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
        setScreenName("")
        setEventName("")
        
    }

    return <>
        <div className='authentication-container'>
            <div className='authentication-sub-container'>
                <h1 className='authentication-headline'>
                    Add Allocation
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="participant" className='authentication-label'>
                        Choose Participant
                    </label>
                    <input id='participant' autoComplete='off' value={screen_name} list='participant-datalist' name='participant' type="text" placeholder='participant' required className='authentication-input' onChange={(event) => setScreenName(event.target.value)} />
                    <datalist id="participant-datalist">
                    {
                        datalist_participant.map((d) =>  <option key={d}>{d}</option>)
                    }
                    </datalist>

                    <label htmlFor="event" className='authentication-label'>
                        Choose Event
                    </label>
                    <input id='event' value={event_name} autoComplete='off' list='event-datalist' name='event' type="text" placeholder='event' required className='authentication-input' onChange={(event) => setEventName(event.target.value)} />
                    <datalist id="event-datalist">
                    {
                        datalist_event.map((d) => <option key={d}>{d}</option>)
                    }
                    </datalist>

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
                <p className='font-medium'>done</p>
                {info}
            </div>
        )}
    </>
}

export default MakeAllocation