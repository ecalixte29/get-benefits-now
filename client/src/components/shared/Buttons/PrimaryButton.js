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
            className={`${disabled || loading ? 'cursor-not-allowed' : ''} focus:shadow-outline flex w-1/2 items-center justify-center rounded border border-blue-500 px-6 py-4 font-bold uppercase text-blue-400 hover:bg-blue-500 hover:text-white focus:outline-none ${classNames}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            {!loading && text}
            {loading && <div>Loading...</div>}
        </button>
    )
}

export default PrimaryButton
