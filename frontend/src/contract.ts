export const ONE_VET = 1_000_000_000_000_000_000;

export const Contract = {
  Address: "0x2c8996e3c86ffc6e6176ccec9c9a4e72ea6793aa",

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
};

export function decodeNumber(data: {
  decoded: Record<number, string>;
}): number {
  const num = data.decoded["0"];

  return parseFloat(num) / ONE_VET;
}
