import Link from 'next/link'
import React from 'react'

const HomeForm = () => {
  return <>
    <div className='grid place-items-center mt-20'>
      <div className='md:text-5xl text-4xl font-medium'>
        Welcome to Eventpay
      </div>
      <div className='font-medium mt-8'>
        Eventpay is your website to manage events or excursions!
        <p className='mt-2'>
        If you already have an account click <Link href={'/login'} className='text-teal-400 underline'>here</Link> to login. 
        </p>
        <p>
        If you dont have an account click <Link href={'/register'} className='text-teal-400 underline'>here</Link> to register
        </p>
      </div>
    </div>
  </>
}

export default HomeForm