// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDeposit {
    uint256 public totalDeposits;

    uint256 public totalInvestedCounter;

    uint256 public totalInvested;
    uint256 public totalReturn;

    mapping(address => uint256) public userDeposits;
    mapping(address => uint256) public investments;
    mapping(address => uint256) public investmentsReturns;

    // Event to log the deposits
    event DepositMade(address indexed sender, uint256 amount);
    event WithdrawMade(address indexed receiver, uint256 amount);

    // Function to deposit currency into the contract
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        totalDeposits += msg.value;
        userDeposits[msg.sender] += msg.value;

        emit DepositMade(msg.sender, msg.value);
    }

    function sendPayment(address payable recipient) public {
        (bool success, ) = recipient.call{value: totalDeposits}("");
        require(success, "Payment failed.");
        require(totalDeposits > 0, "Fund does not have money.");

        investments[recipient] += totalDeposits;

        totalInvested += totalDeposits;
        totalInvestedCounter += totalDeposits;

        totalDeposits = 0;
    }

    // Function used to accounts to return money back to the fund. 
    // Which we can then use to split between the users.
    function recievePayment() public payable {
      require(msg.value > 0, "Payment amount must be greater than zero");

      // When we recieve a payment, we need to do two things.
      // - Increment our totalReturn with the message value
      // - Decrease the totalInvested value because this money has
      //   now returned to us.

      uint256 investedAmount = investments[msg.sender];

      investments[msg.sender] = 0;
      investmentsReturns[msg.sender] += msg.value;

      totalReturn += msg.value;
      totalInvested -= investedAmount;
    }

    function withdraw() public payable {
      require(userDeposits[msg.sender] > 0, "You must have made some investment");

      // Returns `totalReturn` times the percentage the user has invested as a share
      // of the total.
      uint256 toWithdraw = totalReturn * (userDeposits[msg.sender] / totalInvestedCounter);
      totalReturn -= toWithdraw;
      totalInvestedCounter -= userDeposits[msg.sender];

      userDeposits[msg.sender] = 0;

      payable(msg.sender).transfer(toWithdraw);

      emit WithdrawMade(msg.sender, toWithdraw);
    }

}
