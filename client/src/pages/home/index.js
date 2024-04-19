import React from 'react'
import Hero from './Hero'
import Process from './Process'
import About from './About'
import Footer from '../../components/shared/Footer'
import Navbar from '../../components/shared/Navbar'

const Home = () => {
  return (
    <>
        <Navbar backgroundTransparent={true}/>
        <Hero />
        <About />
        <Process />
        <Footer />
    </>
  )
}

export default Home
