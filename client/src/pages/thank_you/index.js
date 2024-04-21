import React from "react"
import Logo from '../../components/shared/Logo';
// import { BiSolidCheckShield } from "react-icons/bi";
import { FaFlagCheckered } from "react-icons/fa";

import './ThankYou.css'

const ThankYou = () => {
    return (
        <div id='thank-you' className='h-screen flex items-center justify-center'>
            <div className='w-4/5 sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center gap-y-3'>
                <FaFlagCheckered className='h-20 w-20 text-dark' />
                <h1 className='text-dark text-3xl sm:text-5xl font-semibold'>Thank You!</h1>
                <p className='text-dark text-xl font-light text-center'>You're all ready to receive your card shortly. An email confirming your form registration will be sent to you shortly.</p>
                <Logo />
            </div>
        </div>
    )
}

export default ThankYou
