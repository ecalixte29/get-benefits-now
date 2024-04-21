import { useEffect, useRef, useState } from "react"
import AttestableCard from "../../components/T&C/AttestableCard"
import Layout from '../../components/Layout'
import { SecondaryButton, DisableButton } from "../../components/buttons"
import SignaturePad from 'react-signature-canvas'
import { useNavigate } from "react-router-dom"

const TermsAndConditions = () => {

    const navigate = useNavigate()
    const companyName = 'Get Benefits Now'
    const companyContact = ''
    const privacyPolicyUrl = ''

    const terms = [
        {
            isSelected: false,
            title: 'Attest and Agree',
            text: 'You attest that your estimated income for 2024 will be at least the Federal Poverty Limit for your state and household requirements. You agree to notify us as soon as you become aware of any changes to expected income per month that you provided above. Failure to notify us of any changes may result in your eligibility being affected. '
        },
        {
            isSelected: false,
            title: 'Income verification',
            text: `In some cases, it may be necessary to verify your income. If income verification is required in order to complete your enrollment, you authorize ${companyName} to submit an income attestation letter on your behalf with the information that you have provided.`
        },
        {
            isSelected: false,
            title: 'Consent to Enrollment; Verification of Information',
            text: `By supplying my initials and signing below, I hereby provide consent and authorization to ${companyName} to enroll me and/or my family in a health insurance plan through the ACA Marketplace at no cost to me. I grant permission for ${companyName} to access my healthcare.gov account for the purpose of quoting, enrolling, and maintaining my health insurance. If I already have a plan, I request that ${companyName} and its agents become my Agent of Record and switch me to a better plan if one is available. This consent will remain in effect unless and until rescinded by you in writing, by emailing ${companyContact}`
        },
        {
            title: 'Acknowledgment of Plan Changes',
            text: 'If we change your plan, you understand that your deductible and/or annual maximum out of pocket will start over again once your new policy begins. If you are not currently covered, this will not apply/affect you.'
        },
        {
            isSelected: false,
            title: 'Notification of changes to Income',
            text: `If your income is $0 (or less than the Federal Poverty Limit), you attest that your estimated income for 2024 will be at least the Federal Poverty Limit for your state and household requirements. If your income will be less than (or greater than) those limits, you agree to notify us or the marketplace of any changes or updates as soon as possible. Failure to notify us of any changes may result in your eligibility being affected. I Agree to notify ${companyName} if my estimated income for 2024 changes.`
        },
        {
            isSelected: false,
            title: `Appointment of ${companyName} as Authorized Representative / Power of Attorny`,
            text: `DISCLOSURES REGARDING LIMITED POWER OF ATTORNEY

            The following limited power of attorney authorizes ${companyName} to make decisions concerning your health insurance. This limited power of attorney does not authorize ${companyName} or any other person to make decisions about your medical care.
            
            The following limited power of attorney becomes effective immediately upon signing. If ${companyName} is unable or unwilling to act for you after you sign the limited power of attorney, we will notify you and this power of attorney will end.
            
            Please review the limited power of attorney carefully. If you have questions about the power of attorney or the authority you are granting to ${companyName}, you should seek legal advice before signing this form.
            
            FORM OF LIMITED POWER OF ATTORNEY
            
            I grant ${companyName} limited authority to take any and all actions to select, procure, and maintain health insurance for myself and any dependents through the Federally-Facilitated Marketplace (“FFM”), including, but not limited to the following actions:
            
            Select a health plan for me;
            Apply for and enroll me (and any dependents) in the selected health plan;
            Add or remove coverage;
            Create or change a beneficiary or dependent designation;
            Update contact information for me and any dependents or beneficiaries;
            Update information relevant to eligibility for subsidies for the health insurance;
            Submit supplemental materials to a health insurance marketplace or exchange, including, but not limited to, proof of income and social security numbers;
            Keep my health insurance in-force by renewing coverage from time to time;
            Change the health plan at renewal if a better plan is available; and
            Take any other action with regard to such health insurance as permitted by law.
            The authority granted to ${companyName} hereunder will cease upon my death, incapacity, or if I revoke the power of attorney in writing to ${companyName}.
            
            Any person, including, without limitation, ${companyName}, any web-broker through which ${companyName} may submit an application for insurance on my behalf, and the FFM, may rely upon the validity of this limited power of attorney or a copy of it unless that person knows it has been terminated.
            
            By checking this box I provide my express consent to ${companyName} and grant ${companyName} and/or its agents a limited power of attorney to enroll me in a health insurance plan and to automatically enroll me in a plan at renewal.`
        },
        {
            isSelected: false,
            title: 'Acknowledgement',
            text: `
            ADDITIONAL AGREEMENTS:
            
            Please read the attestations below and sign if you agree. Use of Personal Information:
            
            I consent to the use and disclosure by ${companyName} of (a) the personal information I have provided about myself and others in the questionnaire above, and (b) any other personal information about myself or the other individuals listed above which may be obtained by ${companyName} from government data sources, for purposes of applying for health insurance coverage through the Federally Facilitated Exchange (the “Marketplace”) and for any other purposes disclosed in ${companyName}'s Privacy Policy.
            
            I agree to these websites: Privacy Policy and Terms of Use. If you have questions about our Privacy Policy, please Contact Us. California residents exercising their “right to know” or “right to deletion” can click ${privacyPolicyUrl} to make a request online or contact us at Contact Us. Each request is subject to verification. California and Nevada residents exercising the right to opt out of the sale of their data should access our Do Not Sell My Info form here. For more information regarding these privacy matters, please refer to our Privacy Policy.
            
            Eligibility:
            
            I understand that I am required to provide true and complete answers to the questions posed above and that I may be asked to provide additional information, including proof of my eligibility for a Special Enrollment Period if I qualify. If the information provided by me is not true and complete I may face penalties, including the risk of losing my eligibility for coverage. I know that I must inform ${companyName} if information I have provided changes. I understand that I can update my information in my Marketplace account or by contacting ${companyName} at 1(636) 466-9441. I know a change in my information could affect eligibility for member(s) of my household. I understand that if anyone I identified above as needing coverage is enrolled in Marketplace coverage and is later found to have other qualifying health coverage (like Medicare, Medicaid, or CHIP), the Marketplace will automatically end their Marketplace plan coverage. This will help make sure that anyone who is found to have other qualifying coverage won’t stay enrolled in Marketplace coverage and have to pay full cost.
            
            Renewal of Coverage:
            
            To make it easier to determine my eligibility for help paying for coverage in future years, I agree to allow the Marketplace to use my income data, including information from tax returns, for the next 5 years. The Marketplace will send me a notice, let me make any changes, and I can opt out at any time.
            
            Tax Attestation:
            
            I understand that I am not eligible for a premium tax credit if I am found eligible for other qualifying health coverage, like Medicaid, the Children’s Health Insurance Program (CHIP), or a job-based health plan. I also understand that if I become eligible for other qualifying health coverage, I must contact the Marketplace to end my Marketplace coverage and premium tax credit. If I do not, the person who files taxes in my household may need to pay back my premium tax credit. I understand that because the premium tax credit will be paid on my behalf to reduce the cost of health coverage for myself and/or my dependents: I must file a federal income tax return for the 2024 tax year.
            
            If I’m married at the end of 2024, I must file a joint income tax return with my spouse. I also expect that: No one else will be able to claim me as a dependent on their 2024 federal income tax return. I’ll claim a personal exemption deduction on my 2024 federal income tax return for any individual listed on this application as my dependent who is enrolled in coverage through this Marketplace, and whose premium for coverage is paid in whole or in part by advance payments of the premium tax credit.
            
            IF ANY OF THE ABOVE CHANGES: I understand that it may impact my ability to get the premium tax credit. I also understand that when I file my 2024 federal income tax return, the Internal Revenue Service (IRS) will compare the income on my tax return with the income on my application. I understand that if the income on my tax return is lower than the amount of income on my application, I may be eligible to get an additional premium tax credit amount. On the other hand, if the income on my tax return is higher than the amount of income on my application, I may owe additional federal income tax.
            
            I understand the foregoing does not constitute tax advice provided by ${companyName} to me, and that should I have any questions regarding any tax credits for which I may be eligible, my tax returns, or any other related tax matters I should consult a qualified tax advisor prior to enrolling in health insurance coverage provided via the Marketplace.
            
            Electronic Signatures and Communications:
            
            I consent to the use of an electronic signature to sign all forms presented to me by ${companyName} during the health insurance enrollment process, including, without limitation, to signing this form below, unless and until I withdraw my consent to the use of electronic signatures by providing notice to the address below. I agree that this consent is effective on the date that I affix my signature below and by supplying my initials above. By signing below, I agree to be legally bound as if I had signed this form and other documents with a handwritten signature, and I acknowledge that I have reviewed and I agree to the above terms and conditions. By signing below I am providing my express written consent to receive emails, telephone calls, text messages, and artificial or pre-recorded messages from ${companyName} regarding this form and any health insurance coverage applied for on my behalf by ${companyName}.
            
            I understand that at this time I have not yet applied for Federally Facilitated Exchange health insurance, and that ${companyName} will be using the information and consents I provide herein to fill out, sign on my behalf, and submit the Federally Facilitated Exchange application. If you have any questions, please contact ${companyName} at ${companyContact}. This form is used to help to find insurance for you and your family.
            
            The information provided must be accurate for the subsidies to be accurate. Failure to provide the correct information could result in claims being invalidated or the termination of your insurance policy. By submitting an application, you confirm that the information is accurate to the best of your knowledge.`
        }
    ]

    const [tnc, setTnc] = useState(terms)
    const signaturePadRef = useRef()
    const [uuid, setUUID] = useState(null)
    const [initials, setInitials] = useState('')

    useEffect(() => {
        const validate = async () => {
            const storedUUID = localStorage.getItem('uuid')
            if (!storedUUID) return navigate('/')
            setUUID(storedUUID)
            let lead = await fetch(`${process.env.REACT_APP_BACKEND_URL}/leads/${storedUUID}`)
            lead = await lead.json()
            if (!lead?.data?.plan_id) return navigate('/plans')
            setInitials(`${lead.data.details.first_name[0].toUpperCase()}${lead.data.details.last_name[0].toUpperCase()}`)
        }
        validate()
    }, [navigate])

    const onSubmit = async () => {
        const signature = signaturePadRef.current.toDataURL()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/leads/${uuid}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                signature
            })
        })
        navigate('/thank-you')
    }

    return (
        <Layout>
            <div className="w-11/12 lg:w-3/4 mx-auto space-y-5">
                <h1 className="text-left text-xl font-thin text-dark capitalize">Terms & conditions</h1>
                {tnc.map((term, index) => (
                    <AttestableCard
                        onSelect={() => setTnc(
                            (prevTnc) => prevTnc.map((t, i) => i === index ? { ...t, isSelected: !t.isSelected } : t)
                        )}
                        isSelected={term.isSelected}
                        initials={initials}
                        title={term.title}
                        text={term.text}
                    />
                ))}
                <h1 className="text-left text-dark capitalize">Signature</h1>
                <SignaturePad ref={signaturePadRef} canvasProps={{ className: 'w-full h-48 bg-white mt-5 border border-gray-200 shadow', height: 200 }} />
                <div className="flex justify-end">
                    <DisableButton
                        text='Clear'
                        invert={true}
                        classNames='mr-5'
                        onClick={() => signaturePadRef.current.clear()}
                    />
                    <SecondaryButton
                        text='Submit'
                        disabled={tnc.some(term => !term.isSelected)}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default TermsAndConditions