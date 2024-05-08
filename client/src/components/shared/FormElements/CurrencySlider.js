import { useEffect } from 'react'
import useForm from '../../../hooks/useForm'

const CurrencySlider = ({ error, onChange, field }) => {
    const { currentStep } = useForm()

    const dependencyValue = currentStep.fields.find(
        f => f.name === field.value_dependency
    ).value
    const minMax = field.minMax[dependencyValue]

    useEffect(() => {
        if (dependencyValue && minMax) onChange(minMax.min)
        // eslint-disable-next-line
    }, [dependencyValue, minMax])

    if (field.value_dependency && dependencyValue.length > 0) {
        return (
            <div
                className={`relative border ${
                    error ? 'border-red-600' : 'border-light'
                } py-2 `}
            >
                <label
                    htmlFor={field.label}
                    className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${
                        error ? 'text-error' : 'text-dark'
                    } capitalize ${error ? 'animate-fadein' : ''}`}
                >
                    {error
                        ? `Please enter a value in range ${dependencyValue}`
                        : `${field.label.toLowerCase()} ${field.required ? '*' : ''}`}
                </label>
                {minMax.max === Infinity ? (
                    <CurrencySliderInput
                        id={field.id}
                        onChange={onChange}
                        value={field.value}
                    />
                ) : (
                    <div className="mx-2 mx-2 my-3">
                        <div className="flex justify-between text-xs font-medium text-gray-500">
                            <p>
                                {field?.prefix}
                                {minMax.min}
                            </p>
                            <p>
                                {field?.prefix}
                                {minMax.max}
                            </p>
                        </div>
                        <div className="group relative">
                            <input
                                id="default-range"
                                type="range"
                                label={field.label}
                                value={Number(field.value)}
                                min={minMax.min}
                                max={minMax.max}
                                onChange={e => onChange(e.target.value)}
                                className="h-2 w-full cursor-pointer accent-secondary"
                            />
                            <div className=" absolute -top-24 left-1/2 mt-2 -translate-x-1/2 scale-y-0 transform bg-gray-200 p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:scale-y-100 group-hover:opacity-100">
                                <CurrencySliderInput
                                    id={field.id}
                                    onChange={onChange}
                                    value={field.value}
                                    isTooltip={true}
                                />
                                <div className="-translate-1/2 absolute left-[45%] z-10 h-3 w-3 rotate-45 transform bg-gray-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const CurrencySliderInput = ({ id, onChange, value, isTooltip }) => {
    return (
        <div className="relative z-20">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                type="number"
                name={id}
                onChange={e => onChange(e.target.value)}
                className={`[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none  ${
                    isTooltip ? 'w-[3.6rem] pl-4' : 'w-full pl-7'
                } border-0 py-2 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                placeholder="0.00"
                value={value}
            />
        </div>
    )
}

export default CurrencySlider
