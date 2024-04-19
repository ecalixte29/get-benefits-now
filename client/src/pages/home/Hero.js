import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/form/TextInput";
import { SecondaryButton } from "../../components/buttons";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="hero min-h-screen flex items-center justify-center bg-primary"
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
        <p className="max-w-[700px] mx-auto mb-8">
          Enter your zip code to see if you qualify
        </p>
        <div className="gap-x-5 flex flex-row items-start justify-center">
          <TextInput
            width={"lg:w-[300px] w-[200px]"}
            placeholder="123456"
            label={""}
            onChange={() => {}}
            className={"w-[300px]"}
          />
          <SecondaryButton onClick={() => navigate('/form')} text={"Next"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
