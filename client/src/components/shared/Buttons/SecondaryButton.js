import ActivityIndicator from '../ActivityIndicator'

const SecondaryButton = ({
    text,
    invert,
    type = 'button',
    classNames = '',
    onClick,
    loading,
    style = {},
    disabled = false,
}) => {
    const buttonClasses = `flex items-center justify-center px-3 md:px-8 py-2 capitalize text-lg border border-secondary ${invert ? 'text-secondary' : 'text-white bg-secondary'} ${classNames} ${disabled || loading ? 'cursor-not-allowed' : ''}`

    return (
        <button
            type={type}
            style={style}
            className={buttonClasses}
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

export default SecondaryButton
