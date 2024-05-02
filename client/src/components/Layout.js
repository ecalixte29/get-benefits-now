import React from 'react'
import Logo from './shared/Logo'

const Layout = ({ children, title = false }) => {
    return (
        <div className='h-screen max-h-screen overflow-y-auto flex flex-col'>
            <Logo title={title} />           
            <main className='container mx-auto pb-8 flex-1'>
                {children}
            </main>
        </div>
    )
}

export default Layout
