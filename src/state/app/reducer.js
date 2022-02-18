import { createReducer } from '@reduxjs/toolkit'
import { updateGRAT } from './actions'

const initialState = {
  GRAT: {
    usdAmount: 0,
    noOfPayouts: 0,
    trusteeAddress: "0x",
    beneficiaryAddress: 0,
    retainedInterest: false,
    termInYears: 0,
    graduatedToggle: 0,
    graduatedPercentage: 0,
    beneficiaryToggle: 0,
    interestRate: 0,
    firstPayment: 0,
  }
}

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(updateGRAT, (state, action) => {
      state.GRAT = action.payload.GRAT
    }),
)

export default reducer
