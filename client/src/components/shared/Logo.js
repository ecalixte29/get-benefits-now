import React from 'react';
import { BsChevronDoubleUp } from "react-icons/bs";
import useSmoothScroll from '../../hooks/useSmoothScoll';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const { sticky, scrollToTop } = useSmoothScroll();
    const navigate = useNavigate();

    return (
        <nav>
            <div className='text-center p-8'>
                <h1 onClick={() => navigate('/')} className='text-secondary text-3xl font-semibold cursor-pointer'>Get Benefits Now ®</h1>
            </div>
            {sticky && (
                <button className="fixed bottom-8 right-8 bg-secondary text-white w-10 h-10 rounded-lg z-50 flex items-center justify-center" onClick={scrollToTop}>
                    <BsChevronDoubleUp />
                </button>
            )}
        </nav>
    );
};

export default Logo;
