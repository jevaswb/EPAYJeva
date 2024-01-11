import Link from 'next/link'
import React from 'react'

const FooterForm = () => {
    return <>
        <footer className='bg-teal-500 w-full bottom-0 fixed'> 
            <div className='p-3 text-white font-medium'>
                {/* <div>
                    Some Links to Github maybe
                </div> */}
                <div className=''>
                    <ul className='flex justify-center m-1 max-sm:flex-col max-sm:text-center'>
                        <li className='m-5 underline opacity-95 hover:opacity-100 hover:font-bold max-sm:m-1'><Link href='/impressum'>Impressum</Link></li>
                        <li className='m-5 underline opacity-95 hover:opacity-100 hover:font-bold max-sm:m-2 max-sm:mt-1'><Link href='/security-policy'>Security Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className='bg-teal-600 p-1 text-center text-white font font-medium'>
                <ul className='flex justify-center max-sm:flex-col max-sm:text-center'>
                    <li className='m-3 max-sm:mb-0'>Copyright &copy;2023</li>
                    <li className='m-3  max-sm:mt-1'>Developed by <span className='opacity-80 uppercase ml-1 font-normal'>Clarissa Elias Jeva</span></li>
                </ul>
            </div>
        </footer>
    </>
}

export default FooterForm