import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const ContactInformation = ({ title }) => {
    return (
        <StepWrapper title={title}>
            <TextField
                label={'Email'}
                id={'details-email'}
                type={'text'}
                placeholder={'Email'}
                wrapperClasses='mb-6'
                pattern={'^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\\.[a-zA-Z]{2,4}$'}
            />
            <TextField
                label={'Phone Number'}
                id={'details-phone'}
                type={'text'}
                placeholder={'Phone Number'}
                format={'+# (###) ###-####'}
                wrapperClasses='mb-6'
                pattern={
                    '^(\\+\\d{1,3}\\s?)?(?![ -])(?!.*[- ]$)(?!.*[- ]{2})(?!.*[()]{2})[0-9- ()]+$'
                }
            />
            <TextField
                label={'Address'}
                id={'details-street'}
                type={'text'}
                wrapperClasses='mb-6'
                placeholder={'Address'}
            />
        </StepWrapper>
    )
}

export default ContactInformation
