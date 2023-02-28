// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/Ownable.sol';

contract VoucherContract is Ownable {
  enum Status {
    Unused,
    Used
  }

  struct Voucher {
    string _id;
    string _storeName;
    uint256 _amountInCents;
    bool _isUsed;
  }

  mapping(string => Voucher) public vouchers;

  function create(Voucher memory _voucher) public onlyOwner {
    require(
      vouchers[_voucher._id]._amountInCents <= 0,
      'Voucher already exist.'
    );
    vouchers[_voucher._id] = _voucher;
  }

  function createMultiple(Voucher[] memory _vouchers) public onlyOwner {
    for (uint256 i = 0; i < _vouchers.length; i++) {
      if (vouchers[_vouchers[i]._id]._amountInCents <= 0) {
        revert('Voucher already exist.');
      }
      vouchers[_vouchers[i]._id] = _vouchers[i];
    }
  }

  function use(string memory _id) public onlyOwner {
    require(vouchers[_id]._amountInCents > 0, "Voucher doesn't exist.");
    require(vouchers[_id]._isUsed == false, 'Voucher already used.');
    Voucher memory voucher = vouchers[_id];
    voucher._isUsed = true;
    vouchers[_id] = voucher;
  }

  function useMultiple(string[] memory _ids) public onlyOwner {
    for (uint256 i = 0; i < _ids.length; i++) {
      if (vouchers[_ids[i]]._amountInCents > 0) {
        revert("Voucher doesn't exist");
      }
      Voucher memory voucher = vouchers[_ids[0]];
      voucher._isUsed = true;
      vouchers[_ids[0]] = voucher;
    }
  }
}
