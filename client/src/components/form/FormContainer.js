import { useState } from "react";
import { SecondaryButton } from "../buttons";
import useForm from "../../hooks/useForm";
import FormItem from "./FormItem";

const FormContainer = ({ submit }) => {
  const [errorIndex, setErrorIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    currentStep,
    isEndReached,
    state,
    nextStep,
    previousStep,
    inputChangeHandler,
  } = useForm();

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        {currentStep.icon && (
          <img className="size-20" src={currentStep.icon} alt="" />
        )}
        <h1 className="text-2xl font-semibold text-dark my-1 text-center">
          {currentStep.title}
        </h1>
        <p className="text-gray-400 text-base text-center">
          {currentStep.subtitle}
        </p>
      </div>
      <div className="bg-gray-50 border border-light shadow p-6 mb-8">
        {currentStep.fields.map((field, index) => (
          <FormItem
            error={errorIndex === index}
            changeHandler={(input) => {
              setErrorIndex(null);
              inputChangeHandler(field.name, input);
            }}
            field={field}
          />
        ))}
      </div>
      <div className="w-full flex justify-between items-center gap-x-3">
        {
          <SecondaryButton
            text="Back"
            classNames="col-span-1"
            fullWidth={true}
            invert={true}
            disabled={state.currentStep === 0 && state.currentSubStep === 0}
            onClick={() => {
              setErrorIndex(null);
              previousStep();
            }}
          />
        }
        {isEndReached ? (
          <SecondaryButton
            text="See plans"
            fullWidth={true}
            onClick={() => {
              setLoading(true);
              nextStep(
                (i) => setErrorIndex(i),
                () => {
                  submit(setLoading);
                }
              );
            }}
            loading={loading}
          />
        ) : (
          <SecondaryButton
            text={"Continue"}
            fullWidth={true}
            onClick={() => nextStep((i) => setErrorIndex(i))}
          />
        )}
      </div>
    </>
  );
};

export default FormContainer;
