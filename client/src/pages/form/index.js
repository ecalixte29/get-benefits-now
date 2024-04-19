import React, { useEffect } from "react";
import Stepper from "./Stepper";
import FormContainer from "../../components/form/FormContainer";
import useForm from "../../hooks/useForm";
import Layout from "../../components/Layout";

const Form = () => {
  const { state, initializeForm } = useForm();

  useEffect(() => {
    initializeForm();
    // eslint-disable-next-line
  }, []); //Do not include in dependency array as it will cause an infinite call cycle

  const submit = async (setLoading) => {
    setLoading(false)
    //todo
  };

  return (
    <Layout>
      <div className="lg:w-1/3 md:w-2/3 sm:w-4/5 w-11/12 mx-auto">
        <Stepper steps={state.form} currentStep={state.currentStep} />
        <form onSubmit={(e) => e.preventDefault()} className="mt-8">
          <FormContainer submit={submit} />
        </form>
      </div>
    </Layout>
  );
};

export default Form;
