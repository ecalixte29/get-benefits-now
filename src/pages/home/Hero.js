import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import { SecondaryButton } from "../../components/buttons";
import HeroImg from '../../assets/images/hero.webp'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            id="hero"
            className="flex-1 flex flex-col border-b border-b-light"
        >
            <div className="bg-primary grow sm:grow-0">
                <div className="container mx-auto grid grid-cols-5 gap-x-6 pt-10 items-center">
                    <div className="col-span-5 sm:col-span-3 px-4 sm:px-0">
                        <div className="bg-black p-10 mb-10 text-white text-left">
                            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
                                Insurance made easy for everyone
                            </h1>
                            <p className="capitalize text-xl">
                                call us at
                                <a className="ml-2 p-1 bg-gray-800 text-sky-400 visited:text-purple-500" href="tel:8555611045">(855) 561-1045</a>
                            </p>
                        </div>
                    </div>
                    <div className="sm:col-span-2 hidden sm:block">
                        <img src={HeroImg} alt="hero" width={300} className="mx-auto" />
                    </div>
                </div>
            </div>
            <div className="sm:flex-1 bg-gray-100">
                <div className="w-full px-4 sm:w-1/2 py-14 mx-auto flex flex-col justify-center">
                    <p className="mb-2">
                        Enter your zip code to see if you qualify
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch justify-center">
                        <TextInput
                            placeholder="123456"
                            label={""}
                            onChange={() => { }}
                            wrapperClasses='flex-1'
                            innerClasses='py-4 sm:text-xl font-bold'
                        />
                        <SecondaryButton onClick={() => navigate('/form')} text="Next" classNames="font-bold text-xl mb-5 border border-secondary" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;