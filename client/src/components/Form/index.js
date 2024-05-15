import React, { useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Layout from '../../components/Layout'
import STEPS from '../../utils/form'
import PrimaryButton from '../shared/Buttons/PrimaryButton'
import Stepper from './Stepper'
import useForm from '../../hooks/useForm'
import useContacts from '../../hooks/useContacts'
import { useNavigate } from 'react-router-dom'
const Form = () => {
    const { currentStep, nextStep, previousStep, data } = useForm()
    const { createContact } = useContacts()
    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            let type;
            if(!!data.spouse_details){
                if(data.dependents?.length > 0) type = 'family'
                else type = 'couple'
            }else {
                if(data.dependents?.length > 0) type = 'single-parent'
                else type = 'single'
            }
            const contact = await createContact({ ...data, type })
            const uuid = contact._id
            localStorage.setItem('uuid',uuid)
            navigate('/plans')
        }catch(err) {
            toast('Error occured while submitting form')
        }
    }

    const StepComponent = useMemo(() => {
        return STEPS[currentStep].component
    }, [currentStep])

    return (
        <Layout>
            <div className="mx-auto max-w-2xl">
                <Stepper
                    steps={STEPS.length}
                    currentStep={currentStep}
                    title={STEPS[currentStep].subtitle}
                />
                <StepComponent
                    title={STEPS[currentStep].title}
                />
                <div className="mx-auto mt-4 flex w-full max-w-2xl justify-between space-x-4">
                    <PrimaryButton
                        text={'Back'}
                        classNames="w-[50%]"
                        disabled={currentStep === 0}
                        onClick={previousStep}
                    />
                    <PrimaryButton
                        text={currentStep === (STEPS.length - 1) ? 'See Plans' : 'Next'}
                        classNames="w-[50%]"
                        onClick={() => nextStep(currentStep === (STEPS.length - 1) ? onSubmit : undefined)}
                    />
                </div>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Form
