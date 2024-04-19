import React from 'react'
import Logo from './shared/Logo'

const Layout = ({ children }) => {
    return (
        <div className='h-screen max-h-screen overflow-y-auto flex flex-col'>
            <Logo />
            <main className='container mx-auto pb-8 flex-1'>
                {children}
            </main>
        </div>
    )
}

export default Layout
