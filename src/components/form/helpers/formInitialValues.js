import GRATFormModel from './GRATFormModel'
const {
  formField: { ethAmount, usdAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, termInYears, interestRate, firstPayment, beneficiaryToggle },
} = GRATFormModel

const initialValues = {
    [ethAmount]: '',
    [usdAmount]: '',
    [trusteeAddress]: '',
    [beneficiaryAddress]: '', 
    [beneficiaryToggle]: false,
    [retainedInterest]: '',
    [graduatedToggle]: false,
    [termInYears]: '',
    [interestRate]: '',
    [firstPayment]: '',
}

export default initialValues