import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </>
    )
}

export default Layout
