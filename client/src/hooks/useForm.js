import { useSearchParams } from 'react-router-dom'
import { useFormContext } from '../context/FormContext'
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const useForm = () => {
    const { state, dispatch } = useFormContext()
    const [searchParams] = useSearchParams()

    const currentStep = state.form[state.currentStep]
    const currentSubStep = currentStep.subSteps[state.currentSubStep]

    const setForm = data => {
        dispatch({
            type: 'SET_FORM',
            payload: data,
        })
    }

    const initializeForm = () => {
        const data = state.form.map(step => ({
            ...step,
            subSteps: step.subSteps.filter(
                subStep =>
                    !subStep.required_query ||
                    subStep.required_query.value.includes(
                        searchParams.get(subStep.required_query.name)
                    )
            ),
        }))
        setForm(data)
    }

    const updateFormField = (key, value, filterFunc = null) => {
        if (state.currentSubStep < 0) return
        const updatedStep = { ...currentStep }
        const fieldIndex = updatedStep.subSteps[
            state.currentSubStep
        ].fields.findIndex(field => field.name === key)

        if (fieldIndex !== -1) {
            const field =
                updatedStep.subSteps[state.currentSubStep].fields[fieldIndex]
            const isArray = field.type === 'appendable_form'
            if (isArray && filterFunc) {
                field.value = field.value.filter(filterFunc)
            } else {
                field.value = isArray ? [...field.value, value] : value
            }
        }

        let clonedForm = state.form
        clonedForm[state.currentStep] = updatedStep
        setForm(clonedForm)
    }

    const inputChangeHandler = (key, value) => {
        updateFormField(key, value)
    }

    const removeDependent = (key, i) => {
        const filterFunc = (value, index) => index !== i
        updateFormField(key, null, filterFunc)
    }

    const nextStep = (onError, onEndReached) => {
        //validation
        const invalidFieldIndex = currentSubStep.fields.findIndex(field => {
            if(field.type === 'tel') {
                return !isPhoneValid(field.value)
            }
            
            if (!field.dependency && field.required && field.value.length === 0) {
                return true;
            }
            
            if (field.type === 'number' && Number(field.value) < 0) {
                return true;
            }
            
            if (field.min && field.value < field.min) {
                return true;
            }

            return false
        })
        if (invalidFieldIndex >= 0) return onError(invalidFieldIndex)

        if (state.currentSubStep < currentStep.subSteps.length - 1) {
            return dispatch({ type: 'NEXT_SUBSTEP' })
        }

        //trigger next page or submit
        if (onEndReached) {
            return onEndReached()
        }

        dispatch({
            type: 'NEXT_STEP',
        })
    }

    const previousStep = () =>
        state.currentSubStep > 0
            ? dispatch({ type: 'PREVIOUS_SUBSTEP' })
            : dispatch({ type: 'PREVIOUS_STEP' })

    const parseData = () => {
        const parseField = field => {
            switch (field.type) {
                case 'number':
                    return Number(field.value);
                case 'currency_slider':
                case 'currency':
                    return Number(field.value)
                case 'radio_group':
                    return field.value.toLowerCase() === 'yes' || field.value.toLowerCase() === 'no'
                        ? field.value.toLowerCase() === 'yes'
                        : field.value;
                case 'date':
                    return new Date(field.value)
                default:
                    return field.value
            }
        }

        const parseFields = fields => {
            const parsedFields = {}

            fields.forEach(field => {
                if (
                    field.name === field.value &&
                    field.type !== 'radio_group'
                ) {
                    parsedFields[field.name] = parseField(field)
                } else {
                    const dependants = fields.filter(
                        f => f.dependency === field.name
                    )
                    if (
                        dependants.length === 0 ||
                        dependants.some(d => d.value === 'Yes')
                    ) {
                        parsedFields[field.name] = parseField(field)
                    }
                }
            })

            return parsedFields
        }

        const parseStep = step => {
            const stepFields = step.fields
            const parsedStep = {}
            const filteredFields = stepFields.filter(
                field =>
                    !field.dependency ||
                    stepFields.some(
                        f => f.name === field.dependency && f.value === 'Yes'
                    )
            )
            if (filteredFields[0].name === 'dependents') {
                parsedStep[step.name] = [];
                filteredFields[0].value.forEach((dependentValue, index) => {
                    filteredFields[0].fields.forEach((field) => {
                        const parsedValue = parseField({ value: dependentValue[field.name], type: field.type });
                        if (parsedStep[step.name][index]) {
                            parsedStep[step.name][index] = { ...parsedStep[step.name][index], [field.name]: parsedValue };
                        } else {
                            parsedStep[step.name].push({ [field.name]: parsedValue });
                        }
                    });
                });
            } else if (
                filteredFields.length === 1 &&
                filteredFields[0].name === step.name
            ) {
                parsedStep[step.name] = parseField(stepFields[0])
            } else {
                parsedStep[step.name] = parseFields(filteredFields)
            }

            return parsedStep
        }

        const parseFormData = form => {
            const parsedData = {}

            form.flatMap(subStep => subStep.subSteps).forEach(step => {
                const parsedStep = parseStep(step)
                Object.assign(parsedData, parsedStep)
            })

            return parsedData
        }

        const parsedData = parseFormData(state.form)
        return parsedData
    }

    return {
        initializeForm,
        setForm,
        inputChangeHandler,
        nextStep,
        previousStep,
        removeDependent,
        parseData,
        state: state,
        currentStep: currentStep.subSteps[state.currentSubStep],
        isEndReached:
            state.currentStep === state.form.length - 1 &&
            state.currentSubStep === currentStep.subSteps.length - 1,
    }
}

export default useForm