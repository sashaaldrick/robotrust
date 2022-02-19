const GRATFormModel = {
    formId: 'GRATForm',
    formField: {
      beneficiaryToggle: {
        name: 'beneficiaryToggle',
        label: 'Beneficiary Toggle',
        required: 'Beneficiary Toggle is required'
      },
      ethAmount: {
        name: 'ethAmount',
        label: 'ETH Amount',
        required: 'ETH Amount is required'
      },
      usdAmount: {
        name: 'usdAmount',
        label: 'USD Amount',
        requiredErrorMsg: 'USD amount is required',
      },
      trusteeAddress: {
        name: 'trusteeAddress',
        label: 'Trustee Address',
        requiredErrorMsg: 'Trustee Address is required',
        invalidErrorMsg: 'Trustee Address is invalid.',
      },
      beneficiaryAddress: {
        name: 'beneficiaryAddress',
        label: 'Beneficiary Address',
        requiredErrorMsg: 'Beneficiary Address is required',
      },
      retainedInterest: {
        name: 'retainedInterest',
        label: 'Retained Interest',
      },
      graduatedToggle: {
        name: 'graduatedToggle',
        label: 'Graduated Toggle',
      },
      termInYears: {
        name: 'termInYears',
        label: 'Term In Years',
        requiredErrorMsg: 'Term In Years is required',
      },
      interestRate: {
        name: 'interestRate',
        label: 'Interest Rate',
        requiredErrorMsg: 'Interest Rate is required',
      },
      firstPayment: {
        name: 'firstPayment',
        label: 'First Payment',
        requiredErrorMsg: 'First Payment is required',
      },
    },
  }

  export default GRATFormModel