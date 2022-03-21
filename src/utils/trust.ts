import { Payment, processPaymentData } from './payment';
import { ethers } from 'ethers';

export class Trust {
    owner: string;
    trustee: string;
    beneficiary: string;
    lastTimestamp: Date;
    numberOfYears: number;
    terminated: boolean;
    showBeneficiaryAccounting: boolean;
    gift: number;
    annuityPV: number;
    initialGrant: Payment;
    paymentAmounts: number[];
    payments: Payment[];
    trustAddress?: string;

    constructor(owner: string, trustee: string, beneficiary: string, lastTimestamp: number, numberOfYears: number, terminated: boolean, 
        showBeneficiaryAccounting: boolean, gift: number, annuityPV: number, initialGrant: any, paymentAmounts: number[], payments: Payment[]) {
            this.owner = owner;
            this.trustee = trustee;
            this.beneficiary = beneficiary;
            this.numberOfYears = numberOfYears;
            this.lastTimestamp = new Date(lastTimestamp * 1000);
            this.terminated = terminated;
            this.showBeneficiaryAccounting = showBeneficiaryAccounting;
            this.gift = gift;
            this.annuityPV = annuityPV;
            this.initialGrant = processPaymentData([initialGrant])[0];
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

export function trustFromContractData(data: any[]) {
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
    );
}

export class BeneficiaryTrust {
    owner: string;
    trustee: string;
    contractAddress: string;
    amountRemaining: number;
    payments: Payment[];
    startedTimestamp: Date;
    numberOfYears: number;

    constructor(owner: string, trustee: string, contractAddress: string, amountRemaining: number, payments: any[], startedTimestamp: number, numberOfYears: number) {
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

export function trustFromContractBeneficiary(data: any[]) {
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

export class CRUT {
    /*
address, //0: owner
        address, //1: annuant
        address, //2: trustee
        address, //3: charity
        uint, //4: last payment timestamp
        uint, //5: number of years
        bool, //6: terminated
        Payment memory, //7: initial grant
        uint, //8: payment percent
        Payment[] memory //9: payments made;
    */
    owner: string;
    annuant: string;
    trustee: string;
    charity: string;
    lastPaymentTimestamp: Date;
    numberOfYears: number;
    terminated: boolean;
    initialGrant: Payment;
    percent: number
    payments: Payment[];
    contractAddress?: string;

    constructor(_owner: string, _annuant: string, _trustee: string, _charity: string, _lastPaymentTimestamp: number, _numberOfYears: number, _terminated: boolean, _initialGrant: any, _percent: number, payments: any[], ) {
        this.owner = _owner;
        this.trustee = _trustee;
        this.annuant = _annuant;
        this.charity = _charity;
        this.payments = payments;
        this.lastPaymentTimestamp = new Date(_lastPaymentTimestamp * 1000);
        this.numberOfYears = _numberOfYears;
        this.terminated = _terminated;
        this.initialGrant = processPaymentData([_initialGrant])[0];
        this.percent = _percent;

    }

    toString() {
        return `Owner: ${this.owner}
            Trustee: ${this.trustee}
            Payments: ${processPaymentData(this.payments)}
            Started Timestamp: ${this.lastPaymentTimestamp}
            Number of Years: ${this.numberOfYears}
            `;
    }
}

export function crutFromContract(data: any[]) {
    return new CRUT(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
        data[9]
    );
}