import { useFormContext } from '../context/FormContext'
// import { PhoneNumberUtil } from 'google-libphonenumber';

// const phoneUtil = PhoneNumberUtil.getInstance();

// const isPhoneValid = (phone) => {
//   try {
//     return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//   } catch (error) {
//     return false;
//   }
// };

const useForm = () => {
    const { state, dispatch } = useFormContext()

    const setForm = data => {
        dispatch({
            type: 'SET_DATA',
            payload: data,
        })
    }

    const initializeForm = () => {
        //only works for details object as of yet
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const queryParams = Object.fromEntries(urlParams.entries())
        if(queryParams.dob) queryParams.dob = new Date(queryParams.dob).toISOString().split('T')[0]
        if(Object.keys(queryParams).length > 0) setForm({ details: queryParams })
    }

    const setErrorIds = ids => {
        dispatch({
            type: 'SET_ERROR_IDS',
            payload: ids,
        })
    }
    const updateFormField = (id, value, shouldDelete) => {
        dispatch({
            type: 'UPDATE_INPUT_FIELD',
            payload: {
                id,
                value,
                shouldDelete,
            },
        })
    }
    //buildNestedObject([{ id: 'details_zip', value: '' }])
    const returnFormField = id => {
        const keys = id.split('-')
        let current = state.data

        for (let key of keys) {
            if (!isNaN(key)) {
                key = parseInt(key)
                if (Array.isArray(current) && current[key] !== undefined) {
                    current = current[key]
                } else {
                    return undefined
                }
            } else {
                if (current && typeof current === 'object' && key in current) {
                    current = current[key]
                } else {
                    return undefined
                }
            }
        }
        return current
    }

    const inputChangeHandler = (key, value) => {
        updateFormField(key, value)
    }

    const nextStep = submit => {
        //validation
        let inputs = Array.from(document.querySelectorAll('input, select'))
        const erroredInputs = inputs
            .map(input => {
                if (
                    input.tagName === 'SELECT' ||
                    input.type === 'checkbox' ||
                    new RegExp(input.getAttribute('pattern')).test(input.value) //test pattern set in pattern attribute for regex validation
                )
                    return undefined
                return input.id
            })
            .filter(val => val !== undefined)
        if (erroredInputs.length > 0) return setErrorIds(erroredInputs)
        if (submit) return submit()
        dispatch({
            type: 'NEXT_STEP',
        })
    }

    const removeInput = key => {
        updateFormField(key, '', true)
    }

    const previousStep = () => dispatch({ type: 'PREVIOUS_STEP' })

    return {
        setForm,
        inputChangeHandler,
        nextStep,
        previousStep,
        removeInput,
        returnFormField,
        initializeForm,
        data: state.data,
        currentStep: state.currentStep,
        errorIds: state.errorIds,
    }
}

export default useForm
