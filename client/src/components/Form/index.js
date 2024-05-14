import React, { useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from '../../components/Layout'
import STEPS from '../../utils/form'
import PrimaryButton from '../shared/Buttons/PrimaryButton'
import Stepper from './Stepper'

const Form = () => {
    const [errorIds, setErrorIds] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState({})

    const parseDependents = (inputs, filterKey) => {
        const dependents = inputs
            .filter(
                input => input.id.split('_')[0].toLowerCase() === filterKey //ignore normal input fields
            )
            .map(input => [
                input.id,
                input.type === 'checkbox' ? input.checked : input.value, //set value based on checkbox checked or input's value
            ])

        const grouped = {}

        dependents.forEach(([key, value]) => {
            let split_key = key.split('_') // Extract the number from the key
            const number = split_key[split_key.length - 1]
            const parsedKey = split_key.slice(1, -1).join('_')

            if (!grouped[number]) {
                grouped[number] = []
            }
            grouped[number].push([parsedKey, value])
        })

        return Object.values(grouped).map(dependent =>
            Object.fromEntries(dependent)
        )
    }

    const onClickNext = () => {
        setErrorIds([])
        let inputs = Array.from(document.querySelectorAll('input, select'))
        const erroredInputs = inputs
            .map(input => {
                if (
                    input.tagName === 'SELECT' ||
                    input.type === 'checkbox' ||
                    new RegExp(input.getAttribute('pattern')).test(input.value) //test pattern set in pattern attribute for regex validation
                )
                    return
                return input.id
            })
            .filter(val => val !== undefined)
        if (erroredInputs.length > 0) return setErrorIds(erroredInputs)
        const dependents = parseDependents(inputs, 'dependent')
        const spouse = parseDependents(inputs, 'spouse')[0]
        const currentStepId = STEPS[currentStep].id

        setData({
            ...data,
            [currentStepId]: {
                ...Object.fromEntries(
                    //build an object from key value pairs of input_id: input_value
                    inputs
                        .filter(
                            input =>
                                !['dependent', 'spouse'].includes(
                                    input.id.split('_')[0].toLowerCase()
                                ) //ignore dependent and spouse in normal parsing
                        )
                        .map(input => [
                            input.id,
                            input.type === 'checkbox'
                                ? input.checked
                                : input.value, //set value based on checkbox checked or input's value
                        ])
                ),
                ...(currentStepId === 'details'
                    ? {
                          dependents,
                          spouse,
                      }
                    : {}),
            },
        })
        setCurrentStep(currentStep + 1)
    }
    // const submit = async (setLoading) => {
    //     const {
    //         type,
    //         current_insurance,
    //         income,
    //         details,
    //         contact,
    //         address,
    //         us_national,
    //         dental_insurance,
    //         recent_employer,
    //         procedures_in_network,
    //         spouse_details,
    //         dependents,
    //     } = parseData();

    //     const data = {
    //         details: {
    //             current_insurance,
    //             ...income,
    //             ...details,
    //             ...contact,
    //             ...address,
    //             us_national,
    //             dental_insurance,
    //             recent_employer,
    //             procedures_in_network,
    //         },
    //         spouse_details,
    //         dependents,
    //         type: type.toLowerCase().replace(" ", "-"),
    //     };
    //     try {
    //         setLoading(false);
    //         const response = await createContact(data)
    //         localStorage.setItem('uuid', response._id)
    //         navigate('/plans');
    //     } catch (error) {
    //         return toast.error(String(error), { duration: 3000 });
    //     }
    // };
    const StepComponent = useMemo(() => {
        return STEPS[currentStep].component
    }, [currentStep])
    console.log(data)
    return (
        <Layout>
            <div className="mx-auto max-w-2xl">
                <Stepper
                    steps={STEPS.length}
                    currentStep={currentStep}
                    title={STEPS[currentStep].subtitle}
                />
                <StepComponent
                    errorIds={errorIds}
                    title={STEPS[currentStep].title}
                    data={data[STEPS[currentStep].id]}
                />
                <div className="mx-auto mt-4 flex w-full max-w-2xl justify-between space-x-4">
                    <PrimaryButton
                        text={'Back'}
                        classNames="w-[50%]"
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    />
                    <PrimaryButton
                        text={currentStep === 3 ? 'See Plans' : 'Next'}
                        classNames="w-[50%]"
                        onClick={onClickNext}
                    />
                </div>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Form
