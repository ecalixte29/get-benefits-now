const AttestableCard = ({ initials, isSelected, title, text, onSelect }) => (
    <div
        onClick={onSelect}
        className={`mb-3 flex cursor-pointer gap-x-3 p-3 ${
            isSelected
                ? 'border border-secondary bg-gray-50'
                : 'bg-white shadow-global'
        }`}
    >
        <div
            className={`mt-1 flex h-6 min-w-6 items-center justify-center text-xs font-semibold ${
                isSelected
                    ? 'border-2 border-secondary text-secondary'
                    : 'border border-gray-300 text-gray-400 hover:border-primary'
            }`}
        >
            {isSelected ? initials : ' '}
        </div>
        <div className="max-h-36 overflow-y-auto pr-4 text-justify text-sm">
            <div className="text-gray-500">{title}</div>
            <div className="font-light text-gray-400">{text}</div>
        </div>
    </div>
)

export default AttestableCard
