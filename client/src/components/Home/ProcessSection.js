import React from 'react'
import useSmoothScroll from '../../hooks/useSmoothScoll';
import { SecondaryButton } from '../shared/Buttons';
import FillFormImg from '../../assets/images/form.jpg'
import EvaluationImg from '../../assets/images/evaluation.jpg'
import GetInsuredImg from '../../assets/images/insurance.jpg'

const STEPS = [
    { imageSrc: FillFormImg, title: 'Complete the form' },
    { imageSrc: EvaluationImg, title: 'Evaluation' },
    { imageSrc: GetInsuredImg, title: '$0 HEALTH INSURANCE PREMIUM' },
];

const Process = () => {

    const { scrollToTop } = useSmoothScroll()

    return (
        <section className='container mt-10 md:mt-0 mx-auto min-h-screen flex flex-col justify-center items-center space-y-6'>
            <div className='text-center'>
                <h3 className='text-base font-bold text-dark capitalize'>the process</h3>
                <h2 className='text-4xl font-semibold text-secondary mb-4 uppercase'>How it works</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
                {STEPS.map((step, index) => (
                    <ProcessCard key={index} imageSrc={step.imageSrc} title={step.title} />
                ))}
            </div>
            <SecondaryButton text='qualify now!' classNames='w-[90%] sm:w-auto' onClick={() => scrollToTop()} />
        </section>
    )
}

const ProcessCard = ({ imageSrc, title }) => {
    return (
        <div className="card max-w-sm mx-5 md:mx-0 flex flex-col relative">
            <img className="card-img w-full object-cover object-top h-40 md:h-80" src={imageSrc} alt="" />
            <div className="py-2 px-4 md:p-5 bg-primary flex-1">
                <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-dark uppercase">{title}</h5>
            </div>
        </div>
    );
};

export default Process