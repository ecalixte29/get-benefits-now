import React from 'react'

const PrimaryButton = ({
    text,
    type,
    classNames = '',
    onClick,
    loading,
    style,
    disabled,
}) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{ ...style }}
            className={`${disabled || loading ? 'cursor-not-allowed' : ''} focus:shadow-outline flex w-1/2 items-center justify-center rounded border border-primary px-4 px-6 py-2 py-4 font-bold text-primary hover:bg-primary hover:text-white focus:outline-none ${classNames}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            {!loading && text}
            {loading && <div>Loading...</div>}
        </button>
    )
}

export default PrimaryButton
