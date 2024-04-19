import React from 'react';
import { useNavigate } from 'react-router-dom';

const RadioButtonCard = ({ id, name, label, icon: Icon, size, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div className='group relative h-28 w-36 m-2 cursor-pointer' onClick={handleClick}>
            <div className='flex flex-col items-center justify-center h-full border-2 border-white group-hover:border-secondary rounded-lg transition-all duration-300 ease-in'>
                {Icon && <Icon size={size} className='text-white group-hover:text-secondary transition-all duration-300 ease-in' />}
                <h1 className='text-white group-hover:text-secondary text-xs font-semibold uppercase tracking-wide transition-all duration-300 ease-in'>{label}</h1>
            </div>
        </div>
    );
};

export default RadioButtonCard;
