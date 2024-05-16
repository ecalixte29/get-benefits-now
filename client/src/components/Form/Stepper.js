import React from 'react'

const Stepper = ({ steps, currentStep, title }) => {
    return (
        <div aria-label="Progress" className="">
            <div className="mb-6">
                <div className="mb-4 flex items-center">
                    <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-light">
                            <div
                                className={`h-2 rounded-full bg-blue-600`}
                                style={{
                                    width: `${parseInt(((currentStep + 1) / steps) * 100)}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            </div>
        </div>
    )
}

export default Stepper
