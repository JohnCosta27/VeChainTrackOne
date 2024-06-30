// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDeposit {
    uint256 public totalDeposits;

    // Event to log the deposits
    event DepositMade(address indexed sender, uint256 amount);

    // Function to deposit currency into the contract
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        totalDeposits += msg.value;

        emit DepositMade(msg.sender, msg.value);
    }

    // Function to get the balance of the contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function sendPayment(address payable recipient) public {
        (bool success, ) = recipient.call{value: totalDeposits}("");
        require(success, "Payment failed.");
    }
}
