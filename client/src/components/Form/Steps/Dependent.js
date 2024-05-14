import TextField from "../../shared/FormElements/TextField"
import CheckBox from "../../shared/FormElements/CheckBox"
import StepWrapper from "../StepWrapper"

const Dependent = ({ errorIds, n, title }) => {
    return (
        <StepWrapper title={title}>
            <div>
                <div className="flex space-x-6 mb-6">
                    <TextField
                        label={'Your Date of Birth'}
                        id={`${title}_dob_${n}`}
                        type={'date'}
                        pattern={'(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])'}
                        error={errorIds.includes(`${title}_dob_${n}`)}
                    />
                </div>
                <div className="flex space-x-6 mb-6">
                    <TextField
                        label={'First Name'}
                        id={`${title}_first_name_${n}`}
                        type={'text'}
                        placeholder={'First Name'}
                        pattern={'.{2,20}'}
                        error={errorIds.includes(`${title}_first_name_${n}`)}
                    />
                    <TextField
                        label={'Last Name'}
                        id={`${title}_last_name_${n}`}
                        type={'text'}
                        placeholder={'Last Name'}
                        pattern={'.{2,20}'}
                        error={errorIds.includes(`${title}_last_name_${n}`)}
                    />
                </div>
                <CheckBox 
                    label={'Eligible for coverage through a job, Medicaid, Medicare, or CHIP'}
                    id={'current_insurance'}
                />
                <CheckBox 
                    label={'Used tobacco products four (4) or more times per week on average during the past six (6) months (not including ceremonial uses)'}
                    id={'uses_tobacco'}
                />
            </div>
        </StepWrapper>
    )
}

export default Dependent