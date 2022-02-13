//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "hardhat/console.sol";
import "@"
contract RoboTrust {

    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender); // convert msg.sender to payable.
    }

    function payOwner(uint _amount) public {
        (bool sent, ) = owner.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }
}