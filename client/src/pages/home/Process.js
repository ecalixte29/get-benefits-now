import React from 'react'
import './Process.scss';
import useSmoothScroll from '../../hooks/useSmoothScoll';
import { SecondaryButton } from '../../components/buttons';
import FillFormImg from '../../assets/images/form.png'
import EvaluationImg from '../../assets/images/evaluation.png'
import GetInsuredImg from '../../assets/images/insurance.png'

const STEPS = [
    { imageSrc: FillFormImg, title: 'Complete the form' },
    { imageSrc: EvaluationImg, title: 'Evaluation' },
    { imageSrc: GetInsuredImg, title: 'GET A $0 HEALTH INSURANCE PREMIUM' },
];

const Process = () => {

    const { scrollToTop } = useSmoothScroll()

    return (
        <section id='process' className='container mt-10 md:mt-0 mx-auto min-h-screen flex flex-col justify-center items-center space-y-6'>
            <div className='text-center'>
                <h3 className='text-base font-bold text-dark capitalize'>the process</h3>
                <h2 className='text-4xl font-semibold text-secondary mb-4 uppercase'>How it works</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
                {STEPS.map((step, index) => (
                    <ProcessCard key={index} imageSrc={step.imageSrc} title={step.title} />
                ))}
            </div>
            <SecondaryButton text='qualify now!' onClick={() => scrollToTop()} />
        </section>
    )
}

const ProcessCard = ({ imageSrc, title }) => {
    return (
        <div className="card max-w-sm mx-5 md:mx-0 bg-white border border-light rounded-lg shadow h-full flex flex-col relative">
            <div className="relative">
                <img className="card-img w-full rounded-t-lg object-cover h-80" src={imageSrc} alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary opacity-50"></div>
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-dark uppercase">{title}</h5>
            </div>
        </div>
    );
};

export default Process