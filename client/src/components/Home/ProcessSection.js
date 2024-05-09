import EvaluationImg from '../../assets/images/evaluation.jpg'
import FillFormImg from '../../assets/images/form.jpg'
import GetInsuredImg from '../../assets/images/insurance.jpg'
import useSmoothScroll from '../../hooks/useSmoothScoll'
import { SecondaryButton } from '../shared/Buttons'

const STEPS = [
    { imageSrc: FillFormImg, title: 'Complete the form' },
    { imageSrc: EvaluationImg, title: 'Evaluation' },
    { imageSrc: GetInsuredImg, title: '$0 HEALTH INSURANCE PREMIUM' },
]

const Process = () => {
    const { scrollToTop } = useSmoothScroll()

    return (
        <section className="container mx-auto mt-10 flex min-h-screen flex-col items-center justify-center space-y-6 md:mt-0">
            <div className="text-center">
                <h3 className="text-base font-bold capitalize text-dark">
                    the process
                </h3>
                <h2 className="mb-4 text-4xl font-semibold uppercase text-secondary">
                    How it works
                </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {STEPS.map((step, index) => (
                    <ProcessCard
                        key={index}
                        imageSrc={step.imageSrc}
                        title={step.title}
                    />
                ))}
            </div>
            <SecondaryButton
                text="qualify now!"
                classNames="w-[90%] sm:w-auto"
                onClick={() => scrollToTop()}
            />
        </section>
    )
}

const ProcessCard = ({ imageSrc, title }) => {
    return (
        <div className="card relative mx-5 flex max-w-sm flex-col md:mx-0">
            <img
                className="card-img h-40 w-full object-cover object-top md:h-80"
                src={imageSrc}
                alt=""
            />
            <div className="flex-1 bg-primary px-4 py-2 md:p-5">
                <h5 className="mb-2 text-lg font-bold uppercase tracking-tight text-dark md:text-2xl">
                    {title}
                </h5>
            </div>
        </div>
    )
}

export default Process
