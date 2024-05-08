import { memo } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import useForm from '../../../hooks/useForm'
import AppendableForm from './AppendableForm'
import CurrencyInput from './CurrencyInput'
import CurrencySlider from './CurrencySlider'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextField from './TextField'

const InputField = ({ field, error, changeHandler }) => {
    const { state, currentStep, removeDependent } = useForm()

    const commonProps = {
        label: field.label,
        id: `${currentStep.name.replaceAll(' ', '_')}[${field.name}]`,
        placeholder: field.placeholder,
        type: field.type,
        onChange: input => changeHandler(input),
        error,
        value: state.form[state.currentStep].subSteps[
            state.currentSubStep
        ].fields.find(stateField => stateField.name === field.name)?.value,
        required: field.required,
    }

    if (
        field.dependencify &&
        currentStep.fields.find(f => f.name === field.dependency)?.value !==
            'Yes'
    ) {
        return <></>
    }

    switch (field.type) {
        case 'currency':
            return <CurrencyInput {...commonProps} currency="USD" />
        case 'radio_group':
            return <RadioGroup {...commonProps} data={field.data} />
        case 'select':
            return <Select {...commonProps} options={field.data} />
        case 'appendable_form':
            return (
                <div>
                    {field.value.map((f, i) => (
                        <div
                            key={i}
                            className=" mb-5 flex flex-row justify-between px-3 py-3 shadow-sm ring-1 ring-gray-300"
                        >
                            <p>
                                {f.first_name}&nbsp;{f.last_name}
                            </p>
                            <button
                                className="border border-secondary bg-white p-1 hover:bg-primary"
                                onClick={() => removeDependent(field.name, i)}
                            >
                                <IoCloseOutline
                                    size={20}
                                    className="text-secondary"
                                />
                            </button>
                        </div>
                    ))}
                    <AppendableForm
                        {...commonProps}
                        fields={field.fields}
                        onAppend={commonProps.onChange}
                    />
                </div>
            )
        case 'currency_slider':
            return <CurrencySlider {...commonProps} field={field} />
        default:
            if (
                ['email', 'tel', 'date', 'text', 'number'].includes(field.type)
            ) {
                return <TextField {...commonProps} />
            } else {
                return null // Or <></> if you prefer
            }
    }
}

export default memo(InputField)
