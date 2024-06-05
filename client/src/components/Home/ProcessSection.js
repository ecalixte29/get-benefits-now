import React from 'react'
import wave2 from '../../assets/images/wave-2.png'

const STEPS = [
    {
        title: 'Complete the form',
        description:
            'Fill out the required information in the form to proceed.',
    },
    {
        title: 'Evaluation',
        description:
            'Your information will be evaluated to determine eligibility.',
    },
    {
        title: 'GET A $0 HEALTH INSURANCE PREMIUM',
        description:
            'If eligible, enjoy the benefits of a health insurance premium with no cost.',
    },
]

const INCOME_DATA = [
    { size: 1, 100: '$14,580', 150: '$21,870', 200: '$29,160', 400: '$58,320' },
    { size: 2, 100: '$19,720', 150: '$29,580', 200: '$39,440', 400: '$78,880' },
    { size: 3, 100: '$24,860', 150: '$37,290', 200: '$49,720', 400: '$99,440' },
    {
        size: 4,
        100: '$30,000',
        150: '$45,000',
        200: '$60,000',
        400: '$120,000',
    },
    {
        size: 5,
        100: '$35,140',
        150: '$52,710',
        200: '$70,280',
        400: '$140,560',
    },
]

const Process = () => {
    return (
        <section
            id="process"
            className="relative z-0 bg-white py-10 py-16 text-gray-700"
        >
            <img
                src={wave2}
                className="absolute bottom-0 left-0 -z-10 h-1/2 w-full"
                alt="wave"
            />
            <div className="m-auto flex max-w-[1300px] flex-col items-center justify-center gap-y-5 text-center">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">
                    How It Works
                </h1>
                <h1 className="text-lg sm:text-2xl md:text-3xl">
                    Eligibility for a complimentary health plan is based on
                    household income.
                </h1>
                <div className="my-10 w-full px-1 text-center">
                    <h1 className="text-lg font-semibold text-blue-800 sm:text-2xl md:text-3xl">
                        If your income falls within the blue bracket, you
                        qualify.
                    </h1>
                    <h1 className="text-lg md:text-2xl">
                        Don't wait, submit the form now!
                    </h1>
                    <div className="overflow-x-auto">
                        <table className="mt-4 min-w-full border-separate border-spacing-1">
                            <thead>
                                <tr>
                                    <th>Family Size</th>
                                    <th className="bg-blue-300">100%</th>
                                    <th className="bg-blue-300">150%</th>
                                    <th>200%</th>
                                    <th>400%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INCOME_DATA.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 1
                                                ? 'bg-gray-200 text-center'
                                                : 'text-center'
                                        }
                                    >
                                        <td>{row.size}</td>
                                        <td className="bg-blue-300">
                                            {row[100]}
                                        </td>
                                        <td className="bg-blue-300">
                                            {row[150]}
                                        </td>
                                        <td>{row[200]}</td>
                                        <td>{row[400]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <center>
                        <b>Note:</b> Exact income levels may vary by state.
                    </center>
                </div>
                <div className="flex flex-col gap-x-10 md:flex-row">
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            className="m-2 flex items-center justify-center gap-x-5 rounded-md bg-gray-100 px-6 py-6 text-start shadow-lg md:py-12"
                        >
                            <h1 className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 p-5 text-2xl font-bold">
                                {i + 1}
                            </h1>
                            <div className="border-l pl-6">
                                <h1 className="text-xl font-bold md:text-2xl">
                                    {step.title}
                                </h1>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Process
