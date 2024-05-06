import React from 'react'
import Logo from './shared/Logo'
import Footer from './shared/Footer'

const Layout = ({ children, title = false }) => {
    return (
        <section className='h-screen max-h-screen overflow-y-auto flex flex-col'>
            <div className='text-center p-4 sm:p-8'>
                <Logo />
                {
                    title && (
                        <h1 className='font-semibold text-2xl w-full sm:w-1/3 md:w-1/2 lg:w-1/4 mx-auto my-2 text-center'>{title}</h1>
                    )
                }
            </div>
            <main className='container mx-auto pb-8 flex-1'>
                {children}
            </main>
            <Footer />
        </section>
    )
}

export default Layout
