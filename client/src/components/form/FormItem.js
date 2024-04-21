import { memo } from "react";
import useForm from "../../hooks/useForm";
import AppendableForm from "./AppendableForm";
import CurrencyInput from "./CurrencyInput";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import TextInput from "./TextInput";
import CurrencySlider from "./CurrencySlider";

const FormItem = ({ field, error, changeHandler }) => {
    const { currentStep, removeDependent } = useForm()

    const commonProps = {
        label: field.label,
        id: `${currentStep.name.replaceAll(' ', '_')}[${field.name}]`,
        placeholder: field.placeholder,
        type: field.type,
        onChange: (input) => changeHandler(input),
        error,
        value: field.value,
        required: field.required
    }
    if (field.dependency && currentStep.fields.find(f => f.name === field.dependency)?.value !== 'Yes') return <></>
    switch (field.type) {
        case 'currency':
            return <CurrencyInput {...commonProps} currency="USD" />
        case 'radio_group':
            return <RadioGroup {...commonProps} data={field.data} />
        case 'select':
            return <Select {...commonProps} options={field.data} />
        case 'appendable_form':
            return <div>
                {field.value.map((f, i) => (
                    <div className=" py-3 px-3 mb-5 shadow-sm ring-1 ring-gray-300 flex flex-row justify-between">
                        <p>{f.first_name}&nbsp;{f.last_name}</p>
                        <p className="font-bold cursor-pointer border border-2 border-dark px-1.5 hover:bg-secondary hover:border-secondary hover:text-white"
                         onClick={() => removeDependent(field.name, i)}> X </p>
                    </div>
                ))}
                <AppendableForm {...commonProps} fields={field.fields} onAppend={commonProps.onChange} />
            </div>
        case 'currency_slider':
            return <CurrencySlider {...commonProps} field={field} />
        default:
            if (['email', 'tel', 'date', 'text', 'number'].includes(field.type)) return <TextInput {...commonProps} type={field.type} />
            return <></>;
    }
}

export default memo(FormItem)