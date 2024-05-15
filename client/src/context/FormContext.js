import { createContext, useContext, useReducer } from 'react'
import { FormReducer } from './reducers/form'

const FormContext = createContext({
    state: {
        data: {},
        currentStep: 0,
        errorIds: []
    },
    dispatch: () => {},
})

export const useFormContext = () => useContext(FormContext)

export const FormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FormReducer, {
        currentStep: 0,
        data: {},
        errorIds: []
    })

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    )
}
