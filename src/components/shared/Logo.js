import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.webp';

const Logo = ({ invert = false }) => {
    const navigate = useNavigate();

    const getAppName = () => {
        const { hostname } = window.location;

        if (hostname === "insurancemadesimple.ai") {
            return "Insurance Made Simple ®";
        } else {
            return "Benefits Rite Now ®";
        }
    };

    return (
        <div className='flex justify-center items-center gap-x-2'>
            <img src={LogoImg} alt="" width={30} />
            <h1
                onClick={() => navigate('/')}
                className={`${invert ? 'text-white' : 'text-secondary'} text-lg sm:text-2xl md:text-3xl font-semibold cursor-pointer`}
            >
                {getAppName()} {/* Call the getAppName function to dynamically set the app name */}
            </h1>
        </div>
    );
};

export default Logo;
