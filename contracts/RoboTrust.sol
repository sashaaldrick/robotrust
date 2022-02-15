//SPDX-License-Identifier: MIT
// v 0.3; implementing keepers script on Arbitrum. DONE.
pragma solidity 0.8.11;

import "hardhat/console.sol";

contract RoboTrust {

    address payable public owner;
    uint256 public immutable period;
    uint256 public lastTimeStamp;
    uint public noOfPayouts;
    uint public maxPayouts;

    constructor(uint256 _period, uint _maxPayouts) payable {
        owner = payable(msg.sender); // convert msg.sender to payable.
        period = _period; // period to next payment i.e. time or number of blocks.
        maxPayouts = _maxPayouts; // maximum payouts over the trust's lifespan.
        lastTimeStamp = block.timestamp; 
    }

    function payOwner(uint256 _amount) internal {
        (bool sent, ) = owner.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        noOfPayouts += 1;
    }

    function checkUpkeep() 
    external
    view
    returns (bool upkeepNeeded) 
    {
       upkeepNeeded = (block.timestamp - lastTimeStamp) > period && noOfPayouts <= maxPayouts;
    }
 
   function performUpkeep() external {
       if ((block.timestamp - lastTimeStamp) > period && noOfPayouts <= maxPayouts) {
           lastTimeStamp = block.timestamp;
           payOwner(address(this).balance / (maxPayouts+1)); 
           // this is where we set the payouts.
       }
   }
}