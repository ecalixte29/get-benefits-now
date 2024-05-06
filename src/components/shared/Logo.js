import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.webp';

const Logo = ({ invert = false }) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center gap-x-2'>
            <img src={LogoImg} alt="" width={30} />
            <h1 
                onClick={() => navigate('/')} 
                className={`${invert ? 'text-white' : 'text-secondary'} text-xl sm:text-3xl font-semibold cursor-pointer`}
            >
                Get Benefits Now ®
            </h1>
        </div>
    );
};

export default Logo;
