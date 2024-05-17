import TextField from '../../shared/FormElements/TextField'
import StepWrapper from '../StepWrapper'

const Income = () => {
    return (
        <StepWrapper title={'Income'}>
            <TextField
                label={'Household Income (Annual)'}
                id={'details-gross_income'}
                type={'number'}
                placeholder={'Household Income'}
                min={1800}
            />
            <TextField
                label={'County'}
                id={'details-county'}
                type={'text'}
                placeholder={'County'}
                min={4}
                max={15}
            />
        </StepWrapper>
    )
}

export default Income
