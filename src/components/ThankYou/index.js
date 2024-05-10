import React from "react"
import Logo from '../../components/shared/Logo';
import HappyFamilyImg from '../../assets/images/happy-family.webp';
import { FaFlagCheckered } from "react-icons/fa";

const ThankYou = () => {
    return (
        <div className="relative bg-gradient-to-br from-primary via-transparent to-gray-200 h-screen flex items-center justify-center overflow-hidden">
            <img src={HappyFamilyImg} alt="Happy Family" className="absolute inset-0 object-cover w-full h-full opacity-30" />
            <div className='w-4/5 sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center gap-y-3 z-10'>
                <FaFlagCheckered className='h-20 w-20 text-dark' />
                <h1 className='text-dark text-3xl sm:text-5xl font-semibold'>Thank You!</h1>
                <p className='text-dark text-xl font-light text-center'>You're all ready to receive your card shortly. An email confirming your form registration will be sent to you shortly.</p>
                <Logo />
            </div>
        </div>
    )
}

export default ThankYou
