import { createContext, useContext, useReducer } from 'react'
import { STEPS, FIELD_NAMES } from '../utils/form'
import { FormReducer } from './reducers/form'
import _ from 'lodash'

const FormContext = createContext({
    state: {
        form: STEPS,
        currentStep: 0,
        currentSubStep: 0,
    },
    dispatch: () => { },
})

export const useFormContext = () => useContext(FormContext)

export const FormContextProvider = ({ children }) => {
    const queryParamsString = window.location.search;
    const queryParams = new URLSearchParams(queryParamsString);

    const initialState = [...STEPS]

    initialState.forEach(step => {
        step.subSteps.forEach(subStep => {
            subStep.fields.forEach(field => {
                let queryValue = queryParams.get(field.name);
                if (field.type === 'date') {
                    const date = new Date(queryValue)
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is zero-based
                    const day = String(date.getDate()).padStart(2, '0');
                    queryValue = `${year}-${month}-${day}`;
                }

                if (queryValue !== null) {
                    field.value = queryValue.toLowerCase();
                }
            });
        })
    })

    const [state, dispatch] = useReducer(FormReducer, {
        currentStep: 0,
        currentSubStep: 0,
        form: STEPS,
    })

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    )
}
