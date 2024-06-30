export const ONE_VET = 1_000_000_000_000_000_000;

export const Contract = {
  Address: "0x8f87db42bd9b9b390eb2f69d40c4688eb78f70cc",

  InvestmentAccount: {
    Account2: "0x07Af697dcB622aD26D504cd3684868b8996Af017",
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
