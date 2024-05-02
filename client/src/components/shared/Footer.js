import React from 'react';
import { Link } from 'react-router-dom'
import LogoImg from '../../assets/images/logo.webp'

const Footer = () => {
    return (
        <div className='bg-dark mt-8'>
            <div className='container mx-auto text-white space-y-8 pt-8 pb-4'>
                <div className='grid grid-cols-4 justify-between'>
                    <div className='col-span-1 col-start-1 flex gap-x-2'>
                        <img src={LogoImg} alt="" className='h-6' />
                        <h1 className='font-josefin uppercase text-lg text-center md:text-2xl font-bold cursor-pointer mb-3 sm:mb-0'>benefits-rite-now</h1>
                    </div>
                    <div className='col-span-2 col-end-5'>
                        <h1 className='font-semibold'>Attention: </h1>
                        <p className='text-gray-400 text-xs text-justify'>
                            This website is operated by K & A Insurance and is not the Health Insurance Marketplace®️ website.
                            In offering this website, K & A Insurance is required to comply with all applicable Federal law,
                            including the standards established under 45 CFR 155.220 (c) and (d) and standards established
                            under 45 CFR 155.260 to protect the privacy and security of personally identifiable information.
                            This website may not support enrollment in all Qualified Health Plans (QHPs) being offered in your
                            state through the Health Insurance Marketplace®️ website. For enrollment support in all available
                            QHP options in your state, go to the Health Insurance Marketplace®️ website at 
                            <a href='https://www.healthcare.gov/' className='text-sky-400 hover:underline visited:text-purple-400 ml-1'>HealthCare.gov</a>
                        </p>
                    </div>
                </div>
                <div className='flex items-center justify-between text-xs border-t border-gray-600 pt-4'>
                    <p>Copyrights © 2024.</p>
                    <div className='space-x-4'>
                        <Link to='/privacy-policy' className='hover:text-primary hover:underline'>Privacy Policy</Link>
                        <Link to='/terms-and-conditions' className='hover:text-primary hover:underline'>Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
