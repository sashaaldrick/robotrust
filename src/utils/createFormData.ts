import trust from "../../scripts/models/trust";

export interface ICreateFormData {
    ethAmount?: number,
    usdValue?: number,
    trusteeAddress?: string,
    beneficiaryAddress?: string,
    retainedInterest?: number,
    termInYears?: number,
    interestRate?: number,
    showBeneficiaryAccount?: boolean,
    graduatedPercentage?: number
}

export class CreateFormData {
    ethAmount: number = 0;
    usdValue: number = 0;
    trusteeAddress: string = '';
    beneficiaryAddress: string = '';
    retainedInterest: number = 0;
    termInYears: number = 2;
    interestRate: number = 0;
    showBeneficiaryAccount: boolean = false;
    graduatedPercentage: number = 0;

    constructor(params: ICreateFormData) {
        this.ethAmount = params.ethAmount ?? this.ethAmount;
        this.usdValue = params.usdValue ?? this.usdValue;
        this.trusteeAddress = params.trusteeAddress ?? this.trusteeAddress;
        this.beneficiaryAddress = params.beneficiaryAddress ?? this.beneficiaryAddress;
        this.retainedInterest = params.retainedInterest ?? this.retainedInterest;
        this.termInYears = params.termInYears ?? this.termInYears;
        this.interestRate = params.interestRate ?? this.interestRate;
        this.showBeneficiaryAccount = params.showBeneficiaryAccount ?? this.showBeneficiaryAccount;
        this.graduatedPercentage = params.graduatedPercentage ?? this.graduatedPercentage;
    }

    copyWith(
        _params: ICreateFormData
    ) {
        let _newFullParams: ICreateFormData = {
            ethAmount: _params.ethAmount ?? this.ethAmount,
            usdValue: _params.usdValue ?? this.usdValue,
            trusteeAddress: _params.trusteeAddress ?? this.trusteeAddress,
            beneficiaryAddress: _params.beneficiaryAddress ?? this.beneficiaryAddress,
            retainedInterest: _params.retainedInterest ?? this.retainedInterest,
            termInYears: _params.termInYears ?? this.termInYears,
            interestRate: _params.interestRate ?? this.interestRate,
            showBeneficiaryAccount: _params.showBeneficiaryAccount ?? this.showBeneficiaryAccount,
            graduatedPercentage: _params.graduatedPercentage ?? this.graduatedPercentage
        };
        console.log(`New Params: ${_newFullParams}`);
        return new CreateFormData(
            _newFullParams
        );
    }
    
    toString() {
        return `
            Eth Amount: ${this.ethAmount}
            USD Value: ${this.usdValue}
            Trustee: ${this.trusteeAddress}
            Beneficiary: ${this.beneficiaryAddress}
            Retained Interest: ${this.retainedInterest}
            Term In Years: ${this.termInYears}
            Interest Rate: ${this.interestRate}
            Show Beneficiary: ${this.showBeneficiaryAccount}
            Graduated Percentage: ${this.graduatedPercentage}
        `
    }
}

export interface ICreateCRUTData {
    ethAmount?: number,
    usdValue?: number,
    annuant?: string,
    trusteeAddress?: string,
    charityAddress?: string,
    termInYears?: number,
    percent?: number
}

export class CreateCRUTData {
    ethAmount: number = 0;
    usdValue: number = 0;
    annuant: string = '';
    trusteeAddress: string = '';
    charityAddress: string = '';
    termInYears: number = 1;
    percent: number = 5;
    
    constructor(params: ICreateCRUTData) {
        this.ethAmount = params.ethAmount ?? this.ethAmount;
        this.usdValue = params.usdValue ?? this.usdValue;
        this.annuant = params.annuant ?? this.annuant;
        this.trusteeAddress = params.trusteeAddress ?? this.trusteeAddress;
        this.charityAddress = params.charityAddress ?? this.charityAddress;
        this.termInYears = params.termInYears ?? this.termInYears;
        this.percent = params.percent ?? this.percent;
    }

    copyWith(
        _params: ICreateCRUTData
    ) {
        let _newFullParams: ICreateCRUTData = {
            ethAmount: _params.ethAmount ?? this.ethAmount,
            usdValue: _params.usdValue ?? this.usdValue,
            annuant: _params.annuant ?? this.annuant,
            trusteeAddress: _params.trusteeAddress ?? this.trusteeAddress,
            charityAddress: _params.charityAddress ?? this.charityAddress,
            termInYears: _params.termInYears ?? this.termInYears,
            percent: _params.percent ?? this.percent
        };
        console.log(`New Params: ${_newFullParams}`);
        return new CreateCRUTData(
            _newFullParams
        );
    }
    
    toString() {
        return `
            Eth Amount: ${this.ethAmount}
            USD Value: ${this.usdValue}
            Annuant: ${this.annuant}
            Trustee: ${this.trusteeAddress}
            Beneficiary: ${this.charityAddress}
            Term In Years: ${this.termInYears}
            Percent: ${this.percent}
        `
    }
}