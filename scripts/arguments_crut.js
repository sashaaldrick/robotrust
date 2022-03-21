//need to save constructor arguments passed on deployment to this file in order to verify with hardhat-etherscan
const { ethers } = require("ethers");
//address _owner, address _trustee, address _beneficiary, uint256 _period, uint _numYears, uint16 _paymentPercent, address _priceFeedAddress
module.exports = [
    "0x964D1F946fA32dA8767c28C31Bf99920B01A2b10", //owner
    "0x964D1F946fA32dA8767c28C31Bf99920B01A2b10", //trustee
    "0x3F46807A93b8A10d9af1fE21036609F6D58E0c62", //beneficiary
    "60", //period, 60 seconds for test
    "5", //number of years
    "10", //test payment percetn
    "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8", //Arbitrum Rinkeby ETH/USD Price Feed (Chainlink)
]