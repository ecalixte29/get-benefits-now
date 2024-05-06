import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";

const CurrencySlider = ({ error, onChange, field }) => {
    const { currentStep } = useForm();

    const dependencyValue = currentStep.fields.find(
        (f) => f.name === field.value_dependency
    ).value;
    const minMax = field.minMax[dependencyValue];

    useEffect(() => {
        if (dependencyValue && minMax) onChange(minMax.min);
        // eslint-disable-next-line
    }, [dependencyValue, minMax]);

    if (field.value_dependency && dependencyValue.length > 0) {
        return (
            <div
                className={`relative border ${error ? "border-red-600" : "border-light"
                    } py-2 `}
            >
                <label
                    htmlFor={field.label}
                    className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? "text-error" : "text-dark"
                        } capitalize ${error ? "animate-fadein" : ""}`}
                >
                    {error
                        ? `Please enter a value in range ${dependencyValue}`
                        : `${field.label.toLowerCase()} ${field.required ? "*" : ""}`}
                </label>
                {minMax.max === Infinity ? (
                    <CurrencySliderInput
                        id={field.id}
                        onChange={onChange}
                        value={field.value}
                    />
                ) : (
                    <div className="mx-2 my-3 mx-2">
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
                        <div className="relative group">
                            <input
                                id="default-range"
                                type="range"
                                label={field.label}
                                value={Number(field.value)}
                                min={minMax.min}
                                max={minMax.max}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full h-2 accent-secondary cursor-pointer"
                            />
                            <div className=" absolute left-1/2 -top-24 transform -translate-x-1/2 mt-2 transition-all ease-in-out duration-200 bg-gray-200 p-2 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100">
                                <CurrencySliderInput
                                    id={field.id}
                                    onChange={onChange}
                                    value={field.value}
                                    isTooltip={true}
                                />
                                <div className="absolute z-10 w-3 h-3 transform left-[45%] -translate-1/2 rotate-45 bg-gray-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

const CurrencySliderInput = ({ id, onChange, value, isTooltip }) => {
    return (
        <div className="relative z-20">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                type="number"
                name={id}
                onChange={(e) => onChange(e.target.value)}
                className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  ${isTooltip ? "w-[3.6rem] pl-4" : "w-full pl-7"
                    } pr-0 border-0 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                placeholder="0.00"
                value={value}
            />
        </div>
    );
};

export default CurrencySlider;
