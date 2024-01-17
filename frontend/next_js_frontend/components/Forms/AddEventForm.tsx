'use client'
import { addEvent } from '@/functions/otherFetchFunction'
import { Currency, toCurrenyEnumValue } from '@/ts_classes/ts_export_classes'
import React, { FormEvent, useState } from 'react'

const AddEventForm = () => {

    const [error, setError] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [event_date, setDate] = useState<any>('')
    const [time, setTime] = useState<string>('')
    const [currency, setCurrency] =useState<Currency | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [current_name_length, setCurrentNameLength] = useState<number>(0)
    const currencyValues:any = Object.keys(Currency)
    const maxLength_name:number = 40

    //todo  improve (price) (date) (currency)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        
        setInfo("")
        
        //get user for fetch
        const evp_u = localStorage.getItem("evp_u");
        if (evp_u === null) {
            setError(`Something went wrong. Please try it later again!`)
            return;
        }

        if (currency === null) {
            setError(`Choose a currency!`)
            return;
        }

        if (price === null) {
            setError(`Ivalid value of price!`)
            return;
        }

        const response = await addEvent(JSON.parse(evp_u), name, event_date, (time !== "") ? time : "00:00",currency, price)
        if(response.error){
            if(response.message === null){
                setError(`That should not happen - please contact the coders about that issue!`)
                return
            }
            setError(`${response.message}  -  A possible problem could be a duplicated event name`)
            return
        }
        //ok handling
        setInfo(response.data)
        setError("")
        setName("")
        setCurrentNameLength(0)
        setDate("")
        setTime("")
        setPrice(null)
        setCurrency(null)
    }

    return <>
        <div className='authentication-container'>
            <div className='authentication-sub-container'>
                <h1 className='authentication-headline'>
                    Add Event
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text-name" className='authentication-label'>
                        Name
                    </label>
                    <input id='text-name' name='text-name' type="text"  value={name} autoComplete='off' maxLength={maxLength_name} placeholder='Name' required className='authentication-input' onChange={(event) => {setName(event.target.value); setCurrentNameLength(event.target.value.length)}} />
                    <div className='input-counter'>{`${current_name_length}/${maxLength_name}`}</div>

                    <label htmlFor="date" className='authentication-label'>
                        Date
                    </label>
                    <input id='date' name='date' type="date" value={event_date} autoComplete='off' required className='authentication-input' onChange={(event) => setDate(event.target.value)} />

                    <label htmlFor="time" className='authentication-label'>
                        Time
                    </label>
                    {/* input time is not required */}
                    <input id='time' name='time' type="time" value={time} autoComplete='off' placeholder='Time' className='authentication-input' onChange={(event) => setTime(event.target.value)} />

                    <label htmlFor="price" className='authentication-label'>
                        Price
                    </label>
                    <input id='price' name='price' value={(price=== null) ? "": price} type="number" step={0.01} min={0} autoComplete='off' placeholder='Price' required className='authentication-input' onChange={(event) => setPrice(parseFloat(event.target.value))} />
                    {/* //todo check input price via redex - fixed to two after ,  and date - has to be in the future or today */}

                    <select name="currency" id="currency"  value={(currency === null)? "":currency } className='authentication-input' required onChange={(event) => { setCurrency(toCurrenyEnumValue(event.target.value))}}>
                        <option value="" disabled>Choose currency</option>
                        {Object.keys(Currency).map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                    
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

export default AddEventForm