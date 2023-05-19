export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "_userId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_amountInCents",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "_isAddFund",
            type: "bool",
          },
        ],
        internalType: "struct DonationContract.Transaction",
        name: "_transaction",
        type: "tuple",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "_userId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_amountInCents",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "_isAddFund",
            type: "bool",
          },
        ],
        internalType: "struct DonationContract.Transaction[]",
        name: "_transactions",
        type: "tuple[]",
      },
    ],
    name: "addMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundInCents",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "transactions",
    outputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amountInCents",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isAddFund",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
