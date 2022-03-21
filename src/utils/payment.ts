import { ethers } from 'ethers';

export class Payment {
    ethPaid: ethers.BigNumber; //WEI
    paymentTimestamp: Date;
    ethPrice: number; //in USD to 8 Decimals (should we just make this 18 and * 10^10?)
    priceRound: number; //Chainlink latest price round at time of payment
    priceTimestamp: Date; //chainlink timestamp of latest round at time of payment
    usdPaymentAmount: number;

    constructor(ethPaid: ethers.BigNumber, //WEI
        paymentTimestamp: number,
        ethPrice: number, //in USD to 8 Decimals (should we just make this 18 and * 10^10?)
        priceRound: number, //Chainlink latest price round at time of payment
        priceTimestamp: number, //chainlink timestamp of latest round at time of payment
        usdPaymentAmount: number) {
        this.ethPaid = ethPaid;
        this.paymentTimestamp = new Date(paymentTimestamp * 1000);
        this.ethPrice = ethPrice;
        this.priceRound = priceRound;
        this.priceTimestamp = new Date(priceTimestamp * 1000);
        this.usdPaymentAmount = usdPaymentAmount;
    }

    toString() {
        return `Eth Paid: ${ethers.utils.formatUnits(this.ethPaid, 18)}
        Payment Time: ${this.paymentTimestamp}
        Eth Price: ${ethers.utils.formatUnits(this.ethPrice, 8)}
        Price Round: ${this.priceRound}
        Price Timestamp: ${this.priceTimestamp}
        USD Amount: ${ethers.utils.formatUnits(this.usdPaymentAmount, 18)}`
    }
}

export function processPaymentData(_rawPayments: any[]) {
    var rawPayments = Array.from(_rawPayments);
    //console.log('Raw Payments: %s', rawPayments);
    //console.log('Raw Payment #1: %s', rawPayments[0]);
    //console.log('Raw Payment #2: %s', rawPayments[1]);
    let payments: Payment[] = [];
    rawPayments.forEach((item: any) => {
        //console.log('Payment #: %s', item);
        payments.push(new Payment(item[0], item[1], item[2], item[3], item[4], item[5]))
    });
    //console.log('Payments: %s', payments)
    return payments;
}
