import { Payment, processPaymentData } from './payment.js';
import { ethers } from 'ethers';

export class Trust {
    constructor(owner, trustee, beneficiary, lastTimestamp, numberOfYears, terminated, showBeneficiaryAccounting, gift, annuityPV, 
       initialGrant, paymentAmounts, payments) {
            this.owner = owner;
            this.trustee = trustee;
            this.beneficiary = beneficiary;
            this.numberOfYears = numberOfYears;
            this.lastTimestamp = new Date(lastTimestamp * 1000);
            this.terminated = terminated;
            this.showBeneficiaryAccounting = showBeneficiaryAccounting;
            this.gift = gift;
            this.annuityPV = annuityPV;
            this.initialGrant = processPaymentData([initialGrant]);
            this.paymentAmounts = paymentAmounts;
            this.payments = processPaymentData(payments);
        }
    
        toString() {
            return `Owner: ${this.owner}
            Trustee: ${this.trustee}
            Beneficiary: ${this.beneficiary}
            Number of Years: ${this.numberOfYears}
            Last Timestamp: ${this.lastTimestamp}
            Terminated: ${this.terminated}
            Show Beneficiary Accounting: ${this.showBeneficiaryAccounting}
            Gift: ${ethers.utils.formatUnits(this.gift, 18)}
            Annuity Present Value: ${ethers.utils.formatUnits(this.annuityPV, 18)}
            Initial Grant: ${this.initialGrant}
            Payment Amounts: ${this.paymentAmounts}
            Payments: ${this.payments}
            `;
        }
}

export function trustFromContractData(data) {
    return new Trust(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
        data[9],
        data[10],
        data[11],
        data[12]
    );
}

export class BeneficiaryTrust {
    constructor(owner, trustee, contractAddress, amountRemaining, payments, startedTimestamp, numberOfYears) {
        this.owner = owner;
        this.trustee = trustee;
        this.contractAddress = contractAddress;
        this.amountRemaining = amountRemaining;
        this.payments = payments;
        this.startedTimestamp = new Date(startedTimestamp * 1000);
        this.numberOfYears = numberOfYears;
    }

    toString() {
        return `Owner: ${this.owner}
            Trustee: ${this.trustee}
            Contract Address: ${this.contractAddress}
            Amount Remaining: ${ethers.utils.formatUnits(this.amountRemaining, 18)}
            Payments: ${processPaymentData(this.payments)}
            Started Timestamp: ${this.startedTimestamp}
            Number of Years: ${this.numberOfYears}
            `;
    }
}

export function trustFromContractBeneficiary(data) {
    return new BeneficiaryTrust(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6]
    );
}

