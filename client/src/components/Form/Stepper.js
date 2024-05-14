import React from 'react';

const Stepper = ({ steps, currentStep, title }) => {
    return (
        <div aria-label="Progress" className=''>
            <div class="mb-6">
            <div class="flex items-center mb-4">
                <div class="flex-1">
                    <div class="w-full bg-light rounded-full h-2">
                        <div className={`bg-primary h-2 rounded-full w-[${parseInt((currentStep + 1) / steps * 100)}%]`}></div>
                    </div>
                </div>
            </div>
            <h2 class="text-xl font-semibold text-gray-700">{title}</h2>
        </div>
        </div>
    );
};

export default Stepper;