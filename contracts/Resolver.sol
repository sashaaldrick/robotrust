//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "hardhat/console.sol";

interface IRoboTrust {
    function payOwner(uint256 _amount) external;
    function getLastExecuted() external view returns(uint);
}

contract Resolver {

    address public immutable RoboTrustAddress;

    constructor(address _RoboTrustAddress) {
        RoboTrustAddress = _RoboTrustAddress;
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        uint256 lastExecuted = IRoboTrust(RoboTrustAddress).getLastExecuted();

        canExec = (block.number - lastExecuted) > 10;

        execPayload = abi.encodeWithSelector(
            IRoboTrust.payOwner.selector,
            uint256(40000000000000000)
        );
    }
}