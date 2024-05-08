import { useNavigate } from 'react-router-dom'

const RadioButtonCard = ({ id, name, label, icon: Icon, size, to }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(to)
    }

    return (
        <div
            className="group relative m-2 h-28 w-36 cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex h-full flex-col items-center justify-center border-2 border-white transition-all duration-300 ease-in group-hover:border-secondary">
                {Icon && (
                    <Icon
                        size={size}
                        className="text-white transition-all duration-300 ease-in group-hover:text-secondary"
                    />
                )}
                <h1 className="text-xs font-semibold uppercase tracking-wide text-white transition-all duration-300 ease-in group-hover:text-secondary">
                    {label}
                </h1>
            </div>
        </div>
    )
}

export default RadioButtonCard
