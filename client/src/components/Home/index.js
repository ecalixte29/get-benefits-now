import Footer from '../shared/Footer'
import Afford from './Afford'
import ApplySticky from './ApplySticky'
import Carriers from './Carriers'
import FAQ from './FAQ'
import HeroSection from './HeroSection'
import ProcessSection from './ProcessSection'
import WaitingFor from './WaitingFor'
import WhyUs from './WhyUs'

const Home = () => {
    return (
        <>
            <ApplySticky />
            <div className="flex min-h-screen flex-col">
                <HeroSection />
            </div>
            <Carriers />
            <ProcessSection />
            <Afford />
            <WhyUs />
            <WaitingFor />
            <FAQ />
            <Footer />
        </>
    )
}

export default Home
