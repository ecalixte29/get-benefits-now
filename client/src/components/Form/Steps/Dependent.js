import useForm from '../../../hooks/useForm'
import CheckBox from '../../shared/FormElements/CheckBox'
import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const Dependent = ({ n, title, id }) => {
    const idPrefx = (n !== undefined) ? `${id}-${n}` : `${id}`
    const { removeInput } = useForm()
    return (
        <StepWrapper
            title={title}
            removable={true}
            onRemove={() => {
                removeInput(idPrefx)
            }}
        >
            <div>
                <div className="mb-6 flex space-x-6">
                    <TextField
                        label={'Your Date of Birth'}
                        id={`${idPrefx}-dob`}
                        type={'date'}
                        pattern={
                            '(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])'
                        }
                    />
                </div>
                <div className="mb-6 flex space-x-6">
                    <TextField
                        label={'First Name'}
                        id={`${idPrefx}-first_name`}
                        type={'text'}
                        placeholder={'First Name'}
                        pattern={'.{2,20}'}
                    />
                    <TextField
                        label={'Last Name'}
                        id={`${idPrefx}-last_name`}
                        type={'text'}
                        placeholder={'Last Name'}
                        pattern={'.{2,20}'}
                    />
                </div>
                <CheckBox
                    label={
                        'Eligible for coverage through a job, Medicaid, Medicare, or CHIP'
                    }
                    id={`${idPrefx}-has_mec`}
                />
                <CheckBox
                    label={
                        'Used tobacco products four (4) or more times per week on average during the past six (6) months (not including ceremonial uses)'
                    }
                    id={`${idPrefx}-uses_tobacco`}
                />
            </div>
        </StepWrapper>
    )
}

export default Dependent
