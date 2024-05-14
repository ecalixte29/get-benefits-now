import ContactInformation from "../components/Form/Steps/ContactInformation";
import Details from "../components/Form/Steps/Details";
import Income from "../components/Form/Steps/Income";
import SSN from "../components/Form/Steps/SSN";

export const STEPS = [
    {
        title: 'You',
        subtitle: "Tell us about yourself & your household.",
        id: "details",
        component: Details
    },
    {
        title: 'Income',
        subtitle: "What is your household income?",
        id: "income",
        component: Income
    },
    {
        title: 'Social Security Number',
        subtitle: "Enter Social Security Numbers",
        id: "ssn",
        component: SSN
    },
    {
        title: 'Contact Info',
        subtitle: "What is your contact information?",
        id: "contact",
        component: ContactInformation
    }
]

export default STEPS