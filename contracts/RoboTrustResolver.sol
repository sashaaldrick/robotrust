//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "hardhat/console.sol";

contract RoboTrustResolver {

    address public immutable RoboTrust;

    constructor(address _RoboTrust) {
        RoboTrust = _RoboTrust;
    }

    function checker()
        external
        view
        override
        returns (bool canExec, bytes memory execPayload)
    {
        uint256 lastExecuted = ICounter(COUNTER).lastExecuted();

        // solhint-disable not-rely-on-time
        canExec = (block.timestamp - lastExecuted) > 300;

        execPayload = abi.encodeWithSelector(
            ICounter.increaseCount.selector,
            uint256(100)
        );
    }
}