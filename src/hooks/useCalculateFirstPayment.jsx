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
        // console.log('typeof retainedInterest', typeof retainedInterest)
        // console.log('typeof gradingPercent', typeof gradingPercent)
        // console.log('typeof termInYears', typeof termInYears)
        // console.log('firstPayment', firstPayment)
        // console.log('gradingPercent', graduatedPercentage)
        // console.log("interestRate: " + interestRate)
        // console.log("retainedInterest: " + retainedInterest)
        // console.log("termInYears: " + termInYears)
        // console.log('paymentsArr', paymentsArr)

    return [paymentsArr]
}

export default useCalculateFirstPayment