import useSmoothScroll from '../../hooks/useSmoothScoll'
import Logo from '../shared/Logo'

const SECTIONS = ['Home', 'About us', 'How It Works?']

const Navbar = () => {
    const { scrollTo } = useSmoothScroll()

    return (
        <nav className={`w-full`}>
            <div className="container mx-auto flex flex-col justify-center p-4 md:flex-row md:items-center md:justify-between">
                <Logo />
                <ul className="flex items-center justify-between space-x-8">
                    {SECTIONS.map((section, index) => (
                        <li key={index}>
                            <button
                                onClick={() => scrollTo(index)}
                                className="border-b-2 border-transparent text-sm font-semibold text-dark hover:border-dark sm:text-base md:text-[100%]"
                            >
                                {section}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
