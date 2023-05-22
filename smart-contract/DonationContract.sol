// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DonationContract is Ownable {
  uint256 public fundInCents; // Total fund in cents available

  struct Transaction {
    string _id; // transaction id
    string _userId; // user id
    uint256 _amountInCents; // amount transacted in cents
    bool _isAddFund;
  }

  // transaction id => donation
  mapping(string => Transaction) public transactions;

  function add(Transaction memory _transaction) public onlyOwner {
    // Check if transaction already exist
    require(
      transactions[_transaction._id]._amountInCents <= 0,
      'Transaction already exist.'
    );

    updateFund(_transaction);
    transactions[_transaction._id] = _transaction;
  }

  function addMultiple(Transaction[] memory _transactions) public onlyOwner {
    for (uint256 i = 0; i < _transactions.length; i++) {
      // Check if transaction already exist
      if (transactions[_transactions[i]._id]._amountInCents <= 0) {
        revert('Transaction already exist.');
      }

      updateFund(_transactions[i]);
      transactions[_transactions[i]._id] = _transactions[i];
    }
  }

  function updateFund(Transaction memory _transaction) private {
    if (_transaction._isAddFund) {
      // Add to fund if the transaction is a donation
      fundInCents += _transaction._amountInCents;
    } else {
      if (fundInCents < _transaction._amountInCents) {
        revert('Insufficient fund.');
      }

      // Subtract from fund if the transaction is a redemption
      fundInCents -= _transaction._amountInCents;
    }
  }
}
