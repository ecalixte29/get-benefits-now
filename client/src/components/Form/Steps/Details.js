import { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import { SecondaryButton } from '../../shared/Buttons'
import CheckBox from '../../shared/FormElements/CheckBox'
import Select from '../../shared/FormElements/Select'
import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'
import Dependent from './Dependent'

const Details = ({ title }) => {
    const [dependents, setDependents] = useState(0)
    const [spouse, setSpouse] = useState(false)
    const { data } = useForm()

    useEffect(() => {
        setDependents(data?.dependents?.length || 0)
        setSpouse(!!data?.spouse_details)
    }, [data])

    return (
        <div>
            <div className="overflow-hidden border-b border-gray-300 bg-white">
                <StepWrapper title={title}>
                    <div>
                        <div className="mb-6 flex space-x-6">
                            <TextField
                                label="Date of Birth"
                                id="details-dob"
                                type="date"
                                pattern={
                                    '(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])'
                                }
                            />
                            <TextField
                                label="Zip Code"
                                id="details-zip"
                                type="number"
                                placeholder="Zip Code"
                                min={5}
                            />
                            <div className="flex-1">
                                <Select
                                    label="Year"
                                    id="details-year"
                                    options={['2024', '2024']}
                                />
                            </div>
                        </div>
                        <div className="mb-6 flex space-x-6">
                            <TextField
                                label="First Name"
                                id="details-first_name"
                                type="text"
                                placeholder="First Name"
                                min={2}
                                max={20}
                            />
                            <TextField
                                label="Last Name"
                                id="details-last_name"
                                type="text"
                                placeholder="Last Name"
                                min={2}
                                max={20}
                            />
                        </div>
                        <CheckBox
                            label={
                                'Eligible for coverage through a job, Medicaid, Medicare, or CHIP'
                            }
                            id="details-has_mec"
                        />
                        <CheckBox
                            label={
                                'Used tobacco products four (4) or more times per week on average during the past six (6) months (not including ceremonial uses)'
                            }
                            id="details-uses_tobacco"
                        />
                    </div>
                </StepWrapper>
            </div>
            {spouse && (
                <Dependent
                    title="Spouse"
                    id="spouse_details"
                    onRemove={() => setSpouse(false)}
                />
            )}
            {Array.from({ length: dependents }).map((val, index) => (
                <Dependent
                    title="Dependent"
                    id="dependents"
                    n={index}
                    onRemove={() => setDependents(dependents - 1)}
                />
            ))}
            <div className="mx-auto mt-4 flex w-full max-w-2xl justify-between space-x-4">
                <SecondaryButton
                    text="Spouse"
                    invert={true}
                    classNames="w-[50%] !font-bold"
                    onClick={() => {
                        setSpouse(true)
                    }}
                    disabled={spouse}
                />
                <SecondaryButton
                    text="Dependent"
                    invert={true}
                    classNames="w-[50%] !border-green-500 !text-green-500 !font-bold"
                    onClick={() => setDependents(dependents + 1)}
                />
            </div>
        </div>
    )
}

export default Details
