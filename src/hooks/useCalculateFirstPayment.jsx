import { useEffect, useState } from 'react'
import { useSetGRAT } from './useSetGRAT'

const useCalculateFirstPayment = () => {

    const [GRAT] = useSetGRAT()
    const { retainedInterest, graduatedPercentage, termInYears } = GRAT
    const interestRate = 0.017
    function getFirstPayment(retainedInterest, interestRate, gradingPercent, termInYears) {
        return ((interestRate - gradingPercent) * parseInt(retainedInterest)) / (1 - (((1 + gradingPercent)/(1 + interestRate))**termInYears))
      }
  
    function getPayments(firstPayment, termInYears, gradingPercent) {
        let payments = [];
        for(let x = 0; x < termInYears; x++) {
            payments.push(firstPayment * ((1 + gradingPercent)**x));
        }
        return payments;
    }

        const firstPayment = getFirstPayment(+retainedInterest, +interestRate, +(graduatedPercentage/100), +termInYears)
        const paymentsArr = getPayments(+firstPayment, +termInYears, +(graduatedPercentage/100))

    return [paymentsArr]
}

export default useCalculateFirstPayment