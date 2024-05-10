import React, { createContext, useContext, useReducer } from "react";
import { STEPS } from '../utils/form'
import { FormReducer } from "./reducers/form";

const FormContext = createContext({
    state: {
        form: STEPS,
        currentStep: 0,
        currentSubStep: 0,
    },
    dispatch: () => { },
});

export const useFormContext = () => useContext(FormContext);


export const FormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FormReducer, { currentStep: 0, currentSubStep: 0, form: STEPS })

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};
