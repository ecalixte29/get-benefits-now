import React from 'react';
import { BsChevronDoubleUp } from "react-icons/bs";
import useSmoothScroll from '../../hooks/useSmoothScoll';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png'

const SECTIONS = [
    "Home",
    "About us",
    "How It Works?",
]

const Navbar = () => {
    const { sticky, scrollTo, scrollToTop } = useSmoothScroll()
    const navigate = useNavigate()

    return (
        <nav className={`w-full`}>
            <div className='container flex flex-col md:flex-row md:items-center justify-center md:justify-between p-4 mx-auto'>
                <div className='flex items-center gap-x-2'>
                    <img src={LogoImg} alt="" width={30} />
                    <h1 onClick={() => navigate('/')} className='font-josefin lowercase leading-0 text-dark text-xl text-center md:text-2xl font-bold cursor-pointer mb-3 sm:mb-0'>benefits-rite-now</h1>
                </div>
                <ul className="flex items-center justify-between space-x-8">
                    {SECTIONS.map((section, index) => (
                        <li key={index}>
                            <button onClick={() => scrollTo(index)} className='text-dark border-b-2 border-transparent hover:border-dark text-sm sm:text-base md:text-[100%] font-semibold'>{section}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {sticky && (
                <button className="fixed bottom-8 right-8 border-2 border-secondary bg-white text-secondary text-xl w-10 h-10 z-50 flex items-center justify-center" onClick={scrollToTop}>
                    <BsChevronDoubleUp />
                </button>
            )}
        </nav>
    );
};

export default Navbar;
