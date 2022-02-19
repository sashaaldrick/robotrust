import GRATFormModel from './GRATFormModel'
const {
  formField: { ethAmount, usdAmount, trusteeAddress, beneficiaryAddress, retainedInterest, graduatedToggle, termInYears, interestRate, firstPayment, beneficiaryToggle },
} = GRATFormModel

const initialValues = {
    [ethAmount.name]: '',
    [usdAmount.name]: '',
    [trusteeAddress.name]: '',
    [beneficiaryAddress.name]: '', 
    [beneficiaryToggle.name]: false,
    [retainedInterest.name]: '',
    [graduatedToggle.name]: false,
    [termInYears.name]: '',
    [interestRate.name]: '',
    [firstPayment.name]: '',
}

export default initialValues