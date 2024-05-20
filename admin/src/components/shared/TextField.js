import React from 'react';

const TextField = ({ label, error, onChange, id, required, width, wrapperClasses = '', innerClasses = '', ...additional_options }) => {
    return (
        <div key={id} className={`relative mb-5 ${wrapperClasses}`}>
            <label
                htmlFor={id}
                className={`absolute -top-2 left-2 inline-block bg-primary-1000 px-1 text-xs text-white font-medium ${error ? 'text-error animate-fadein' : 'text-dark'} capitalize`}
            >
               {error ? `Please enter a valid ${label ? label.toLowerCase() : additional_options?.type}` : `${label} ${required ? '*' : ''}`}
            </label>
            <input
                key={id}
                id={id}
                name={id}
                onChange={(e) => onChange(e.target.value)}
                min={0}
                {...additional_options}
                className={`block ${width ? width : 'w-full'} bg-primary-1000 rounded py-3 text-white shadow-sm outline-0 border-0 ring-gray-800 ${error ? 'ring-2 ring-error' : 'ring-1'} ${error ? 'focus:ring-2 focus:ring-red' : 'focus:ring-2 focus:ring-inset focus:ring-gray-800'} sm:text-sm sm:leading-6 ${innerClasses}`}
            />
        </div>
    );
};

export default TextField;