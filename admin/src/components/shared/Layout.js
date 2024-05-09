import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children, title = false }) => {
    return (
        <>
            <Sidebar />
            <main className="py-6 lg:pl-72 min-h-screen">
                <div className="px-4 sm:px-6 lg:px-8">
                    {title && (
                        <h1 className='text-2xl font-semibold text-primary-950 capitalize mb-4'>{title}</h1>
                    )}
                    <div className='bg-white p-2 sm:p-4 md:p-6 shadow border border-gray-200 rounded-lg'>
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Layout
