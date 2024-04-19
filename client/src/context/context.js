import { createContext, useContext, useReducer } from "react";
import { STEPS } from '../utils/form'
import { formReducer } from "./reducers/reducer";


const FormContext = createContext({
    state: {
        form: STEPS,
        currentStep: 0,
        currentSubStep: 0,
    },
    dispatch: () => { },
});

export const useFormState = () => {
    return useContext(FormContext);
};

export const FormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, { currentStep: 0, currentSubStep: 0, form: STEPS })

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};
