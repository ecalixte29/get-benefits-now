import React from 'react';

const Stepper = ({ steps, currentStep, title }) => {
    return (
        <div aria-label="Progress" className=''>
            <div className="mb-6">
            <div className="flex items-center mb-4">
                <div className="flex-1">
                    <div className="w-full bg-light rounded-full h-2">
                        <div className={`bg-primary h-2 rounded-full`} style={{ width: `${parseInt((currentStep + 1) / steps * 100)}%` }}></div>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        </div>
        </div>
    );
};

export default Stepper;