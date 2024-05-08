import Footer from '../shared/Footer'
import AboutSection from './AboutSection'
import HeroSection from './HeroSection'
import Navbar from './Navbar'
import ProcessSection from './ProcessSection'

const Home = () => {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <HeroSection />
            </div>
            <AboutSection />
            <ProcessSection />
            <Footer />
        </>
    )
}

export default Home
