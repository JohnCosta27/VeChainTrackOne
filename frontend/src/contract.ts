export const ONE_VET = 1_000_000_000_000_000_000;

export const Contract = {
  Address: "0x45eb0c9cdfffb33d060966191b63760d6aea7c78",

  InvestmentAccount: {
    SolarFarm: "0x07Af697dcB622aD26D504cd3684868b8996Af017",
    Walmart: "0xc7996Ce759327a48f9A631D287bd64951830C3a6",
    Opec: "0x1D360947E44798107B3a6B991dc0340a3CE51CE9",
  },

  ReverseInvestmentAccount: {
    "0x07Af697dcB622aD26D504cd3684868b8996Af017": "Solar Farm",
    "0xc7996Ce759327a48f9A631D287bd64951830C3a6": "Walmart",
    "0x1D360947E44798107B3a6B991dc0340a3CE51CE9": "Opec",
  },

  Deposit: {
    inputs: [],
    outputs: [],
    name: "deposit",
    stateMutability: "payable",
    type: "function",
  },

  InvestFund: {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
    ],
    outputs: [],
    name: "sendPayment",
    stateMutability: "nonpayable",
    type: "function",
  },

  TotalDeposited: {
    inputs: [],
    name: "totalDeposits",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  TotalInvested: {
    inputs: [],
    name: "totalInvested",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  TotalReturn: {
    inputs: [],
    name: "totalReturn",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  TotalOriginalInvested: {
    inputs: [],
    name: "totalInvestedCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  Withdraw: {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },

  ReturnInvestment: {
    inputs: [],
    name: "recievePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },

  UserDeposit: {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userDeposits",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  Investments: {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "investments",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },

  InvestmentsReturns: {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "investmentsReturns",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
};

export function decodeNumber(data: {
  decoded: Record<number, string>;
}): number {
  const num = data.decoded["0"];

  return parseFloat(num) / ONE_VET;
}

export const depositABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InvestmentReturn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawMade",
    type: "event",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "investments",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "investmentsReturns",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recievePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
    ],
    name: "sendPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDeposits",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalInvested",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalInvestedCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReturn",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userDeposits",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
