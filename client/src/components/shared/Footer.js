import React from 'react';
import LogoImg from '../../assets/images/logo.png'

const Footer = () => {
    return (
        <div className='bg-dark py-4 mt-8'>
            <div className='flex flex-col items-center justify-center text-white text-xs'>
                <div className='flex items-center gap-x-2'>
                    <img src={LogoImg} alt="" width={30} />
                    <h1 className='font-josefin lowercase leading-0 text-white text-xl text-center md:text-2xl font-bold cursor-pointer mb-3 sm:mb-0'>benefits-rite-now</h1>
                </div>
                <p>Copyrights © 2024</p>
            </div>
        </div>

    );
};

export default Footer;
