'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const NavFormNoAuth = () => {

    const [isClick, setIsClick] = useState(false)

    const toggleNavbar = (): void => {
        setIsClick(!isClick)
    }

    return <>
        <nav className='bg-teal-500 shadow-lg'>
            <div className='min-w-full mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <a href="/" className='text-white font-medium'>
                                Eventpay
                            </a>
                        </div>
                    </div>
                    <div className='hidden sm:block'>
                        <div className='ml-4 flex items-center space-x-4'>
                            <Link href={'/'} className='nav-item-design'>Home</Link>
                            <Link href={'/login'} className='nav-item-design'>Login</Link>
                            <Link href={'/register'} className='nav-item-design'>Register</Link>
                            <Link href={'/request'} className='nav-item-design'>Request</Link>
                        </div>
                    </div>
                    <div className='sm:hidden flex items-center'>
                        <button className='nav-button' onClick={toggleNavbar}>
                            {isClick ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                {isClick && (
                    <div className='sm:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <Link href={'/'} className='nav-item-design-block'>Home</Link>
                            <Link href={'/login'} className='nav-item-design-block'>Login</Link>
                            <Link href={'/register'} className='nav-item-design-block'>Register</Link>
                            <Link href={'/request'} className='nav-item-design-block'>Request</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    </>
}

export default NavFormNoAuth