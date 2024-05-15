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
                pattern={
                    '.{5,7}'
                }
            />
            <TextField
                label={'County'}
                id={'details-county'}
                type={'text'}
                placeholder={'County'}
                pattern={
                    '.{4,15}'
                }
            />
        </StepWrapper>
    )
}

export default Income
