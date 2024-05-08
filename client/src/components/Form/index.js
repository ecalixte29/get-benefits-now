import _ from 'lodash'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useContacts from '../../hooks/useContacts'
import useForm from '../../hooks/useForm'
import Layout from '../Layout'
import { SecondaryButton } from '../shared/Buttons'
import InputField from '../shared/FormElements/InputField'

const Form = () => {
    const [errorIndex, setErrorIndex] = useState(null)
    const [loading, setLoading] = useState(false)

    const { createContact } = useContacts()
    const {
        initializeForm,
        currentStep,
        state,
        parseData,
        nextStep,
        previousStep,
        inputChangeHandler,
        isEndReached,
    } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        initializeForm()
    }, [])

    useEffect(() => {
        const fieldIndex = currentStep.fields.findIndex((field) => field.name === 'zip')
        const zip = localStorage.getItem('zip')
        if (fieldIndex >= 0 && zip && zip.length > 0) {
            setErrorIndex(null)
            inputChangeHandler('zip', zip)
        }
    }, [currentStep.fields])

    const submit = async setLoading => {
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
        } = parseData()

        let data = {
            details: _.pickBy(
                {
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
                _.identity
            ),
            type: type.toLowerCase().replace(' ', '-'),
        }

        if (dependents) data['dependents'] = dependents
        if (spouse_details) data['spouse_details'] = spouse_details

        try {
            const response = await createContact(data)
            localStorage.setItem('uuid', response.id)
            navigate('/plans')
        } catch (error) {
            return toast.error(String(error), { duration: 3000 })
        }
    }

    return (
        <Layout>
            <div className="mx-auto w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3">
                <div
                    aria-label="Progress"
                    className="grid grid-cols-3 justify-center gap-x-8"
                >
                    {state.form.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col border-${index <= state.currentStep ? 'secondary' : 'gray-200'} border-t-4 py-2 md:pt-4`}
                        >
                            <span
                                className={`text-xs font-medium text-${index <= state.currentStep ? 'secondary' : 'gray-500'}`}
                            >
                                Step {index + 1}
                            </span>
                            <span className="text-sm font-medium uppercase text-dark">
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
                <form onSubmit={e => e.preventDefault()} className="mt-8">
                    <div className="mb-8 flex flex-col items-center">
                        {currentStep.icon && (
                            <img
                                className="size-20"
                                src={currentStep.icon}
                                alt=""
                            />
                        )}
                        <h1 className="my-1 text-center text-2xl font-semibold text-dark">
                            {currentStep.title}
                        </h1>
                        <p className="text-center text-base text-gray-400">
                            {currentStep.subtitle}
                        </p>
                    </div>
                    <div className="mb-8 border border-light bg-gray-50 p-6 shadow">
                        {currentStep.fields.map(
                            (field, index) =>
                                field.name !== 'zip' && (
                                    <InputField
                                        key={index}
                                        error={errorIndex === index}
                                        changeHandler={input => {
                                            setErrorIndex(null)
                                            inputChangeHandler(
                                                field.name,
                                                input
                                            )
                                        }}
                                        field={field}
                                    />
                                )
                        )}
                    </div>
                    <div className="flex w-full items-center justify-between gap-x-3">
                        {
                            <SecondaryButton
                                text="Back"
                                classNames="w-full col-span-1"
                                invert={true}
                                disabled={
                                    state.currentStep === 0 &&
                                    state.currentSubStep === 0
                                }
                                onClick={() => {
                                    setErrorIndex(null)
                                    previousStep()
                                }}
                            />
                        }
                        {isEndReached ? (
                            <SecondaryButton
                                text="See plans"
                                classNames="w-full"
                                onClick={() => {
                                    setLoading(false)
                                    nextStep(
                                        i => setErrorIndex(i),
                                        () => {
                                            submit(setLoading)
                                        }
                                    )
                                }}
                                loading={loading}
                            />
                        ) : (
                            <SecondaryButton
                                text={'Continue'}
                                classNames="w-full"
                                onClick={() => nextStep(i => setErrorIndex(i))}
                            />
                        )}
                    </div>
                </form>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Form
