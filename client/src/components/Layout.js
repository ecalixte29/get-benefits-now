import Footer from './shared/Footer'
import Logo from './shared/Logo'

const Layout = ({ children, title = false }) => {
    return (
        <section className="flex h-screen max-h-screen flex-col overflow-y-auto">
            <div className="p-4 text-center sm:p-8">
                <Logo className="sm:!justify-center" />
                {title && (
                    <h1 className="mx-auto my-2 w-full text-center text-2xl font-semibold sm:w-1/3 md:w-1/2 lg:w-1/4">
                        {title}
                    </h1>
                )}
            </div>
            <main className="container mx-auto flex-1 pb-8">{children}</main>
            <Footer />
        </section>
    )
}

export default Layout
