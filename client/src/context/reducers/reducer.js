export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM":
      return { ...state, form: action.payload };
    case "NEXT_STEP":
      const nextSubSteps = state.form[state.currentStep + 1].subSteps.filter(
        (step) =>
          !step.dependency ||
          step.dependency.values.includes(
            state.form
              .flatMap((subStep) => subStep.subSteps)
              .flatMap((subStep) => subStep.fields)
              .find((field) => field.name === step.dependency.name).value
          )
      );
      const updatedForm = [...state.form];
      updatedForm[state.currentStep + 1] = {
        ...state.form[state.currentStep + 1],
        subSteps: nextSubSteps,
      };
      return {
        form: updatedForm,
        currentStep: state.currentStep + 1,
        currentSubStep: 0,
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
        currentSubStep: state.form[state.currentStep - 1].subSteps.length - 1,
      };
    case "NEXT_SUBSTEP":
      return { ...state, currentSubStep: state.currentSubStep + 1 };
    case "PREVIOUS_SUBSTEP":
      return { ...state, currentSubStep: state.currentSubStep - 1 };
    default:
      return state;
  }
};
