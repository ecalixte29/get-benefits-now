import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import FormContainer from "../../components/form/FormContainer";
import useForm from "../../hooks/useForm";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import useContacts from '../../hooks/useContacts'
import _ from 'lodash'

const Form = () => {
    const { createContact } = useContacts()
    const { state, initializeForm, parseData } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        initializeForm();
    }, [])

    const submit = async (setLoading) => {
        const {
            type,
            current_insurance,
            income,
            details,
            contact,
            address,
            us_national,
            recent_employer,
            providers_in_network,
            medications_in_network,
            procedures_in_network,
            spouse_details,
            dependents,
        } = parseData();

        const data = {
            details: _.pickBy({
                current_insurance,
                ...income,
                ...details,
                ...contact,
                ...address,
                us_national,
                recent_employer,
                providers_in_network,
                medications_in_network,
                procedures_in_network,
            }, _.identity),
            ...(spouse_details && { spouse_details: _.pickBy(spouse_details, _.identity) }),
            ...(dependents && { dependents: _.pickBy(dependents, _.identity) }),
            type: type.toLowerCase().replace(" ", "-"),
        };

        try {
            const response = await createContact(data)
            localStorage.setItem("uuid", response.id);
            navigate("/plans");
        } catch (error) {
            return toast.error(String(error), { duration: 3000 });
        }
    }

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
