import useForm from '../../../hooks/useForm'
import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const SSN = ({ title }) => {
    const { data } = useForm()
    return (
        <StepWrapper title={title}>
            <TextField
                label="Social Security Number"
                placeholder={'Social Security Number'}
                id={'details-ssn'}
                pattern={'^\\d{3}-\\d{2}-\\d{4}$'}
            />
            {(data?.dependents || []).map((dependent, index) => (
                <DependentSSN
                    name={`${dependent.first_name} ${dependent.last_name}`}
                    index={index}
                />
            ))}
            {data?.spouse_details && (
                <DependentSSN
                    name={`${data.spouse_details.first_name} ${data.spouse_details.last_name}`}
                    isSpouse={true}
                />
            )}
        </StepWrapper>
    )
}

const DependentSSN = ({ name, isSpouse, index }) => {
    const prefixId =
        index !== undefined
            ? `${isSpouse ? 'spouse_details' : 'dependents'}-${index}`
            : `${isSpouse ? 'spouse_details' : 'dependents'}`
    return (
        <>
            <StepWrapper title={name} rounded={false} borderBottom={false}>
                <TextField
                    label="Social Security Number"
                    placeholder={'Social Security Number'}
                    id={`${prefixId}-social_security_number`}
                    pattern={`^\\d{3}-\\d{2}-\\d{4}$`}
                />
            </StepWrapper>
        </>
    )
}

export default SSN
