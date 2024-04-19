import React from 'react';

const Footer = () => {
    return (
        <div className='bg-dark py-4 mt-8'>
            <div className='container flex justify-between items-center mx-auto text-white text-xs'>
                <p>© 2024 Get Benefits Now. All rights reserved.</p>
                <ul className="flex gap-x-4">
                    <li>Terms of Services</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>

    );
};

export default Footer;
