import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import FormContainer from "../../components/form/FormContainer";
import useForm from "../../hooks/useForm";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const { state, initializeForm, parseData } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    initializeForm();
    // eslint-disable-next-line
  }, []); //Do not include in dependency array as it will cause an infinite call cycle

  const submit = async (setLoading) => {
    const {
      type,
      current_insurance,
      income,
      details,
      contact,
      address,
      us_national,
      dental_insurance,
      recent_employer,
      providers_in_network,
      medications_in_network,
      procedures_in_network,
      spouse_details,
      dependents,
    } = parseData();

    const data = {
      details: {
        current_insurance,
        ...income,
        ...details,
        ...contact,
        ...address,
        us_national,
        dental_insurance,
        recent_employer,
        providers_in_network,
        medications_in_network,
        procedures_in_network,
      },
      spouse_details,
      dependents,
      type: type.toLowerCase().replace(" ", "-"),
    };
    try {
      const req = await fetch(`${process.env.REACT_APP_BACKEND_URL}/leads`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const res = await req.json();
      if (res.message) {
        setLoading(false);
        return toast.error(res.message, { duration: 3000 });
      }
      localStorage.setItem("uuid", res.uuid);
      navigate("/plans");
    } catch (error) {
      return toast.error(String(error), { duration: 3000 });
    }
  };

  return (
    <Layout>
      <div className="lg:w-1/3 md:w-2/3 sm:w-4/5 w-11/12 mx-auto">
        <Stepper steps={state.form} currentStep={state.currentStep} />
        <form onSubmit={(e) => e.preventDefault()} className="mt-8">
          <FormContainer submit={submit} />
        </form>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Form;
