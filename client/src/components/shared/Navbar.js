import React from 'react';
import { BsChevronDoubleUp } from "react-icons/bs";
import useSmoothScroll from '../../hooks/useSmoothScoll';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
    "Home",
    "About us",
    "How It Works?",
]

const Navbar = () => {
    const { sticky, scrollTo, scrollToTop } = useSmoothScroll()
    const navigate = useNavigate()

    return (
        <nav className={`w-full absolute top-0 left-0`}>
            <div className='container md:flex md:items-center md:justify-between p-4 mx-auto'>
                <h1 onClick={() => navigate('/')} className= {`hidden md:block text-white text-sm md:text-xl font-semibold cursor-pointer`}>Get Benefits Now</h1>
                <ul className="flex items-center justify-between space-x-8">
                    {SECTIONS.map((section, index) => (
                        <li key={index}>
                            <button onClick={() => scrollTo(index)} className='text-white hover:text-secondary text-md md:text-[100%]'>{section}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {sticky && (
                <button className="fixed bottom-8 right-8 bg-secondary text-white w-10 h-10 rounded-lg z-50 flex items-center justify-center" onClick={scrollToTop}>
                    <BsChevronDoubleUp />
                </button>
            )}
        </nav>
    );
};

export default Navbar;