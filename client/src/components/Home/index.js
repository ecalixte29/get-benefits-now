import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ProcessSection from './ProcessSection'
import Footer from '../shared/Footer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
        <div className="min-h-screen flex flex-col">
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
