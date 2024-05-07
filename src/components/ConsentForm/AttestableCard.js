import React from 'react';

const AttestableCard = ({ initials, isSelected, title, text, onSelect }) => (
  <div
    onClick={onSelect}
    className={`flex gap-x-3 cursor-pointer mb-3 p-3 ${
      isSelected ? 'border border-secondary bg-gray-50' : 'bg-white shadow-global'
    }`}
  >
    <div
      className={`h-6 min-w-6 mt-1 flex items-center justify-center text-xs font-semibold ${
        isSelected
          ? 'text-secondary border-2 border-secondary'
          : 'text-gray-400 border border-gray-300 hover:border-primary'
      }`}
    >
      {isSelected ? initials : ' '}
    </div>
    <div className='max-h-36 overflow-y-auto text-sm pr-4 text-justify'>
      <div className="text-gray-500">{title}</div>
      <div className="text-gray-400 font-light">{text}</div>
    </div>
  </div>
);

export default AttestableCard;
