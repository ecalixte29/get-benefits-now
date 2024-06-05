import React from 'react'
import wave from '../../assets/images/wave.png'

const images = [
    { src: require('../../assets/images/family_3.jpeg'), alt: 'family three' },
    { src: require('../../assets/images/family_4.jpg'), alt: 'family four' },
    { src: require('../../assets/images/family_5.jpg'), alt: 'family five' },
]

const STEPS = [
    {
        title: '4 out of 5 households are eligible',
        description:
            'We are able to find $0 premium policies for the majority of consumers.',
    },
    {
        title: 'Don’t overpay for health insurance',
        description:
            'We’ll find you affordable health insurance that could save your life, allow for preventative treatments and manage any health issues year-round.',
    },
    {
        title: 'No need to talk on the phone',
        description:
            'The form is 100% online. We will only contact you by text or email if we need any additional information.',
    },
]

const WhyUs = () => {
    return (
        <section
            id="why-us"
            className="relative z-0 flex flex-col items-center justify-center gap-y-5 bg-blue-800 px-2 py-16 text-white md:gap-y-10 md:bg-white md:text-gray-700"
        >
            <img
                src={wave}
                className="absolute bottom-0 left-0 -z-10 hidden h-1/2 w-full md:block"
            />
            <div>
                <h1 className="text-center text-4xl font-semibold md:text-5xl">
                    Why Choose Us?
                </h1>
                <p className="mx-auto mt-5 max-w-[500px] text-center">
                    With decades of experience and thousands of happy customers,
                    you’re in safe hands with <em>Benefits Rite Now</em>.
                </p>
            </div>
            <div className="m-auto hidden max-w-[1300px] gap-x-10 md:flex">
                {STEPS.map((step, i) => (
                    <div className="relative mt-20 w-1/3 gap-x-5 rounded-md bg-gray-100 px-6 pb-10 pt-20 text-center shadow-md">
                        <img
                            {...images[i]}
                            className="absolute left-1/2 top-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full object-cover shadow-md"
                        />
                        <div className="mb-4 flex gap-x-3 font-bold">
                            <span className="bg-blue-200 mt-1 flex h-7 w-8 items-center justify-center rounded text-xl text-blue-800">
                                {i + 1}
                            </span>
                            <h1 className="text-start text-2xl font-bold">
                                {step.title}
                            </h1>
                        </div>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyUs
