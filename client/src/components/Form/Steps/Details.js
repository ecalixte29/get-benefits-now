import { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import { PrimaryButton } from '../../shared/Buttons'
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
            <StepWrapper title={title}>
                <div>
                    <div className="mb-6 flex space-x-6">
                        <TextField
                            label={'Your Date of Birth'}
                            id={'details-dob'}
                            type={'date'}
                            pattern={
                                '(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])'
                            }
                        />
                        <TextField
                            label={'Zip Code'}
                            id={'details-zip'}
                            type={'number'}
                            placeholder={'Zip Code'}
                            pattern={'.{5}'}
                        />
                        <div className="flex-1">
                            <Select
                                label="Year"
                                id={'details-year'}
                                options={['2024', '2024']}
                            />
                        </div>
                    </div>
                    <div className="mb-6 flex space-x-6">
                        <TextField
                            label={'First Name'}
                            id={'details-first_name'}
                            type={'text'}
                            placeholder={'First Name'}
                            pattern={'.{2,20}'}
                        />
                        <TextField
                            label={'Last Name'}
                            id={'details-last_name'}
                            type={'text'}
                            placeholder={'Last Name'}
                            pattern={'.{2,20}'}
                        />
                    </div>
                    <CheckBox
                        label={
                            'Eligible for coverage through a job, Medicaid, Medicare, or CHIP'
                        }
                        id={'details-has_mec'}
                    />
                    <CheckBox
                        label={
                            'Used tobacco products four (4) or more times per week on average during the past six (6) months (not including ceremonial uses)'
                        }
                        id={'details-uses_tobacco'}
                    />
                </div>
            </StepWrapper>
            {spouse && <Dependent title={'Spouse'} id={'spouse_details'} />}
            {Array.from({ length: dependents }).map((val, index) => (
                <Dependent title={'Dependent'} id={'dependents'} n={index} onRemove={() => setDependents(dependents - 1)} />
            ))}
            <div className="mx-auto mt-4 flex w-full max-w-2xl justify-between space-x-4">
                <PrimaryButton
                    text={'Spouse'}
                    classNames="w-[50%] !border-green-500 !text-green-500 !font-bold hover:!bg-green-500 hover:!text-white"
                    onClick={() => {
                        setSpouse(true)
                    }}
                    disabled={spouse}
                />
                <PrimaryButton
                    text={'Dependent'}
                    classNames="w-[50%] !border-green-500 !text-green-500 !font-bold hover:!bg-green-500 hover:!text-white"
                    onClick={() => setDependents(dependents + 1)}
                />
            </div>
        </div>
    )
}

export default Details
