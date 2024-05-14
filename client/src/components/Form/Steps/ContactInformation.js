import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const ContactInformation = ({ errorIds, data }) => {
    return (
        <StepWrapper title={'Income'}>
            <TextField
                label={'Email'}
                id={'gross_income'}
                type={'number'}
                pattern={
                    '.{5,7}'
                }
                error={errorIds.includes('gross_income')}
                value={data?.gross_income || 0}
            />
            <TextField
                label={'County'}
                id={'county'}
                type={'text'}
                pattern={
                    '.{4,15}'
                }
                error={errorIds.includes('county')}
                value={data?.county || ""}
            />
        </StepWrapper>
    )
}

export default ContactInformation
