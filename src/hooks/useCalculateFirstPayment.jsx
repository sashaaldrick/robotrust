import { useEffect, useState } from 'react'

const useCalculateFirstPayment = (retainedInterest, interestRate, gradingPercent, termInYears) => {
    const [firstPaymentVar, setFirstPaymentVar] = useState();
    function getFirstPayment(retainedInterest, interestRate, gradingPercent, termInYears) {
        return ((interestRate - gradingPercent) * retainedInterest) / (1 - (((1 + gradingPercent)/(1 + interestRate))**termInYears))
      }
  
    function getPayments(firstPayment, termInYears, gradingPercent) {
        let payments = [];
        for(let x = 0; x < termInYears; x++) {
            payments.push(firstPayment * ((1 + gradingPercent)**x));
        }
        return payments;
    }

    useEffect(() => {
        const firstPayment = getFirstPayment(retainedInterest, interestRate, gradingPercent, termInYears)
        const paymentsArr = getPayments(firstPayment, termInYears, gradingPercent)
        console.log('paymentsArr', firstPayment)
        console.log("interestRate: " + interestRate);
        console.log("retainedInterest: " + retainedInterest);
        console.log("termInYears: " + termInYears);
        setFirstPaymentVar(paymentsArr)
    }, [setFirstPaymentVar, retainedInterest, interestRate, gradingPercent, termInYears])

    return [firstPaymentVar]
}

export default useCalculateFirstPayment