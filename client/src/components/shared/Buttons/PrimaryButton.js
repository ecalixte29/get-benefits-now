import ActivityIndicator from '../ActivityIndicator'

const PrimaryButton = ({
    text,
    invert,
    type = 'button',
    className = '',
    onClick,
    loading = false,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            className={`rounded-md px-8 py-3 text-lg capitalize ${
                invert
                    ? 'border-primary text-primary'
                    : 'border-primary bg-primary text-white'
            } ${className}`}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading && (
                <ActivityIndicator
                    height={20}
                    width={20}
                    spinnerClass={'text-secondary'}
                    backgroundClass={'animate-spin mr-2'}
                />
            )}
            <p>{text}</p>
        </button>
    )
}

export default PrimaryButton
