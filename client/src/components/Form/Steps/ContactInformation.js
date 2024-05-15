import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const ContactInformation = () => {
    return (
        <StepWrapper title={'Income'}>
            <TextField
                label={'Email'}
                id={'details-email'}
                type={'text'}
                placeholder={'Email'}
                pattern={
                    '^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\\.[a-zA-Z]{2,4}$'
                }
            />
            <TextField
                label={'Phone Number'}
                id={'details-phone'}
                type={'text'}
                placeholder={'Phone Number'}
                pattern={
                    '^(\\+\\d{1,3}\\s?)?(?![ -])(?!.*[- ]$)(?!.*[- ]{2})(?!.*[()]{2})[0-9- ()]+$'
                }
            />
            <TextField
                label={'Address'}
                id={'details-street'}
                type={'text'}
                placeholder={'Address'}
            />
        </StepWrapper>
    )
}

export default ContactInformation
