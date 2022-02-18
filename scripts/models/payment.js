const { ethers } = require("ethers");

class Payment {
    constructor(ethPaid, //WEI
        paymentTimestamp,
        ethPrice, //in USD to 8 Decimals (should we just make this 18 and * 10^10?)
        priceRound, //Chainlink latest price round at time of payment
        priceTimestamp, //chainlink timestamp of latest round at time of payment
        usdPaymentAmount) {
        this.ethPaid = ethPaid;
        this.paymentTimestamp = new Date(paymentTimestamp * 1000);
        this.ethPrice = ethPrice;
        this.priceRound = priceRound;
        this.priceTimestamp = new Date(priceTimestamp * 1000);
        this.usdPaymentAmount = usdPaymentAmount;
    }

    toString() {
        return `Eth Paid: ${ethers.utils.formatUnits(this.ethPaid, 18)}
        Payment Time: ${new Date(this.paymentTimestamp * 1000)}
        Eth Price: ${ethers.utils.formatUnits(this.ethPrice, 8)}
        Price Round: ${this.priceRound}
        Price Timestamp: ${new Date(this.priceTimestamp * 1000)}
        USD Amount: ${ethers.utils.formatUnits(this.usdPaymentAmount, 18)}`
    }
}

function processPaymentData(_rawPayments) {
    var rawPayments = Array.from(_rawPayments);
    //console.log('Raw Payments: %s', rawPayments);
    //console.log('Raw Payment #1: %s', rawPayments[0]);
    //console.log('Raw Payment #2: %s', rawPayments[1]);
    let payments = [];
    rawPayments.forEach((item) => {
        //console.log('Payment #: %s', item);
        payments.push(new Payment(item[0], item[1], item[2], item[3], item[4], item[5]))
    });
    //console.log('Payments: %s', payments)
    return payments;
}

module.exports = {
    payment: Payment,
    processPaymentData: function (rawPayments) {return processPaymentData(rawPayments)},
}