import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import { SecondaryButton } from "../../components/buttons";
import HeroImg from '../../assets/images/hero.png'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            id="hero"
            className="flex-1 flex flex-col border-b border-b-light"
        >
            <div className="bg-primary">
                <div className="container mx-auto grid grid-cols-5 gap-x-6 pt-10 items-center">
                    <div className="col-span-3">
                        <div className="bg-black p-10 mb-10 text-white text-left">
                            <h1 className="text-2xl md:text-6xl font-semibold mb-6">
                                Insurance made easy for everyone
                            </h1>
                        </div>

                    </div>
                    <div className="col-span-2">
                        <img src={HeroImg} alt="hero" width={300} className="mx-auto" />
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-gray-100">
                <div className="w-1/2 py-14 mx-auto flex flex-col justify-center">
                    <p className="mb-2">
                        Enter your zip code to see if you qualify
                    </p>
                    <div className="flex flex-row items-stretch justify-center">
                        <TextInput
                            placeholder="123456"
                            label={""}
                            onChange={() => { }}
                            wrapperClasses='flex-1 mb-0'
                            innerClasses='py-4 sm:text-xl font-bold focus:ring-dark ring-0'
                        />
                        <SecondaryButton onClick={() => navigate('/form')} text="Next" classNames="font-bold text-xl px-6" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
