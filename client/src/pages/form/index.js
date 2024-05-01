import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import FormContainer from "../../components/form/FormContainer";
import useForm from "../../hooks/useForm";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import GHL_CUSTOM_FIELDS from "../../utils/ghl_custom_fields";

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
        } finally {
            const dependentsDetails = {};
            if (data.dependents) {
                data.dependents.forEach((dependant, index) => {
                    const keyPrefix = `contact.dependent_${index + 1}`;
                    dependentsDetails[GHL_CUSTOM_FIELDS[`${keyPrefix}_full_name`]] = `${dependant.first_name + ' ' + dependant.last_name}`;
                    dependentsDetails[GHL_CUSTOM_FIELDS[`${keyPrefix}_dob`]] = `${dependant.dob}`;
                    dependentsDetails[GHL_CUSTOM_FIELDS[`${keyPrefix}_ssn`]] = `${dependant.social_security_number}`;

                    dependentsDetails[GHL_CUSTOM_FIELDS["contact.do_you_wish_to_enroll_dependents"]] = "Yes"
                    if (index === 1) dependentsDetails[GHL_CUSTOM_FIELDS["contact.do_you_have_a_2nd_dependent"]] = "Yes";
                    if (index === 2) dependentsDetails[GHL_CUSTOM_FIELDS["contact.do_you_have_a_3rd_dependent"]] = "Yes";
                });
            }

            console.log('dependentsDetails', dependentsDetails)

            console.log("data", data)

            let contact = {
                email: data.details.email,
                phone: data.details.phone,
                firstName: data.details.first_name,
                lastName: data.details.last_name,
                name: data.details.first_name,
                dateOfBirth: formatDate(data.details.dob),
                address1: data.details.street,
                city: data.details.city,
                state: data.details.state,
                country: 'US',
                postalCode: data.details.postalCode,
                source: "benefitsritenow.com",
                customField: {
                    [GHL_CUSTOM_FIELDS["contact.current_insurance"]]: data.details.current_insurance,
                    [GHL_CUSTOM_FIELDS["contact.estimated_household_annual_income"]]: data.details.estimated_income,
                    [GHL_CUSTOM_FIELDS["contact.recent_employer"]]: data.details.recent_employer,
                    [GHL_CUSTOM_FIELDS["contact.are_you_a_us_national_"]]: data.details.us_national === 'true' ? 'Yes' : 'No',
                    [GHL_CUSTOM_FIELDS["contact.are_you_a_tobacco_user_"]]: data.details.uses_tobacco === 'true' ? 'Yes' : 'No',
                    [GHL_CUSTOM_FIELDS["contact.are_you_on_medicaid_or_medicare"]]: data.details.current_insurance === 'true' ? 'Yes' : 'No',
                }
            }

            if (dependentsDetails) {
                contact.customField = { ...contact.customField, ...dependentsDetails }
            }
            if (data.spouse_details) {
                contact.customField = {
                    ...contact.customField,
                    ...{
                        [GHL_CUSTOM_FIELDS["contact.do_you_have_a_spouse_"]]: 'Yes',
                        [GHL_CUSTOM_FIELDS["contact.do_you_want_to_enroll_your_spouse_"]]: 'Yes',
                        [GHL_CUSTOM_FIELDS["contact.do_you_wish_to_enroll_spouse"]]: 'Yes',
                        [GHL_CUSTOM_FIELDS["contact.spouse_full_name"]]: data.spouse_details.first_name + ' ' + data.spouse_details.last_name,
                        [GHL_CUSTOM_FIELDS["contact.spouse_date_of_birth"]]: formatDate(data.spouse_details.dob),
                        [GHL_CUSTOM_FIELDS["contact.spouse_email"]]: data.spouse_details.email,
                        [GHL_CUSTOM_FIELDS["contact.spouse_ssn"]]: data.spouse_details.social_security_number,
                        [GHL_CUSTOM_FIELDS["contact.spouse_phone"]]: data.spouse_details.phone,
                        [GHL_CUSTOM_FIELDS["contact.do_your_partner_uses_tobacco"]]: data.spouse_details.uses_tobacco === 'true' ? 'Yes' : 'No'
                    }
                }
            }

            const res = await fetch(process.env.REACT_APP_GHL_URL, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: process.env.REACT_APP_TOKEN,
                    Version: process.env.REACT_APP_VERSION
                },
                method: "POST",
                body: JSON.stringify(contact),
            });

            console.log('res', res.status)
            console.log("inside finally", contact)
        }
    }

    const formatDate = (date) => {
        console.log('date', date)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
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
