import React, { useState } from "react";
import "./Hero.scss";
import { MdFamilyRestroom, MdMan } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import RadioButtonCard from "../../components/form/RadioButtonCard";
import { ImManWoman } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import { SecondaryButton } from "../../components/buttons";

const Hero = () => {
  const navigate = useNavigate();
  const [zipEntered, setZipEntered] = useState(false);
  const [zip, setZip] = useState("")

  return (
    <section
      id="hero"
      className="hero min-h-screen flex items-center justify-center"
    >
      <div className="text-white text-center flex items-center justify-center flex-col max-w-[800px]">
        <h1
          onClick={() => navigate("/")}
          className={`block md:hidden text-white text-5xl font-semibold cursor-pointer`}
        >
          Get Benefits Now
        </h1>
        <h1 className="text-1xl md:text-6xl mx-15 font-semibold">
          Insurance made easy for everyone
        </h1>
        {zipEntered ? (
          <>
            <p className="max-w-[700px] mx-auto mb-8">
              Who would you like to insure?
            </p>
            <div className="flex justify-center space-x-2s flex-wrap">
              <RadioButtonCard
                id="single"
                name="hero-type"
                label="Single"
                icon={MdMan}
                size={50}
                to="/form"
              />
              <RadioButtonCard
                id="couple"
                name="hero-type"
                label="couple"
                icon={ImManWoman}
                size={50}
                to={"/form?type=couple"}
              />
              <RadioButtonCard
                id="family"
                name="hero-type"
                label="family"
                icon={MdFamilyRestroom}
                size={50}
                to={"/form?type=family"}
              />
              <RadioButtonCard
                id="single-parent"
                name="hero-type"
                label="single parent"
                icon={RiParentFill}
                size={50}
                to={"/form?type=single-parent"}
              />
            </div>
          </>
        ) : (
          <>
            <p className="max-w-[700px] mx-auto mb-8">
              Enter your zip code to see if you qualify
            </p>
            <div className="gap-x-5 flex flex-row items-start justify-center">
              <TextInput width={'lg:w-[300px] w-[200px]'} placeholder="123456" label={""} onChange={() => {}} className={'w-[300px]'}  />
              <SecondaryButton onClick={() => setZipEntered(true)} text={"Next"} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
