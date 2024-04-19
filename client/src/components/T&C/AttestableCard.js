import React from 'react';

const AttestableCard = ({ initials, isSelected, title, text, onSelect }) => (
    <div
        onClick={onSelect}
        className={`flex gap-x-3 cursor-pointer rounded-lg mb-3 p-2 border border-gray-200 bg-white shadow ${ isSelected && 'border-primary'}`}
    >
        <div
            className={`h-6 min-w-6 mt-1 rounded flex items-center justify-center text-xs font-semibold ${isSelected ? 'text-primary border-2 border-primary' : 'text-gray-400 border border-gray-300 hover:border-primary'}`}
        >
            {isSelected ? initials : ' '}
        </div>
        <div className='h-20 overflow-y-auto text-sm pr-4 text-justify'>
            <div className="text-gray-500">{title}</div>
            <div className="text-gray-400 font-light">{text}</div>
        </div>
    </div>
);

export default AttestableCard;
