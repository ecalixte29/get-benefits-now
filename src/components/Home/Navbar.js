import React from 'react';
import useSmoothScroll from '../../hooks/useSmoothScoll';
import Logo from '../shared/Logo';

const SECTIONS = [
    "Home",
    "About us",
    "How It Works?",
]

const Navbar = () => {
    const { scrollTo } = useSmoothScroll()

    return (
        <nav className={`w-full`}>
            <div className='container flex flex-col md:flex-row md:items-center justify-center md:justify-between p-4 mx-auto'>
                <Logo />
                <ul className="flex items-center justify-between space-x-8">
                    {SECTIONS.map((section, index) => (
                        <li key={index}>
                            <button onClick={() => scrollTo(index)} className='text-dark border-b-2 border-transparent hover:border-dark text-sm sm:text-base md:text-[100%] font-semibold'>
                                {section}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
