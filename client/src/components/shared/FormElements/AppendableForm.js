import React, { useState } from "react"
import { SecondaryButton } from "../Buttons"
import InputField from "./InputField"

const AppendableForm = ({ label, fields, onAppend, required, error }) => {
    const [formData, setFormData] = useState(fields.map(field => ({ ...field })))
    const [errorIndex, setErrorIndex] = useState()

    const changeHandler = (key, value) => {
        setErrorIndex(null)
        let modifiedData = [...formData]
        const fieldIndex = modifiedData.findIndex(field => field.name === key)
        modifiedData[fieldIndex].value = value
        setFormData(modifiedData)
    }

    const submit = () => {
        const emptyFieldIndex = formData.findIndex(field => field.required && field.value.length === 0)
        if (emptyFieldIndex >= 0) return setErrorIndex(emptyFieldIndex)
        onAppend(Object.fromEntries(formData.map(data => [data.name, data.value])))
        setFormData(fields.map(field => ({ ...field })))
    }

    return (
        <div className='relative mb-5 p-6 shadow-sm ring-1 ring-inset ring-gray-300'>
            <label
                className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'text-secondary' : 'text-dark'} capitalize`}
            >
                {label} {required ? '*' : ''}
            </label>
            <div className="">
                {formData && formData.map((field, index) => (
                    <InputField
                        error={errorIndex === index}
                        changeHandler={(input) => changeHandler(field.name, input)}
                        field={field}
                    />
                ))}
            </div>
            <div className="flex flex-row justify-end">
                <SecondaryButton
                    text={'Add'}
                    classNames='col-span-1'
                    onClick={() => submit()}
                />
            </div>
        </div>
    )
}

export default AppendableForm