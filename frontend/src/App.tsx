import React from "react";
import {
  WalletButton,
  useConnex,
  useWallet,
  useWalletModal,
} from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";

const ONE_VET = 1_000_000_000_000_000_000;

const FUND_ADDRESS = "0x8A7232b6a9c76D9f4bBa7D6a5c652aa37e8A9482";
const TEST_INVESTMENT_WALLET = "0x07Af697dcB622aD26D504cd3684868b8996Af017";

const ADD_FUNDS = {
  inputs: [],
  outputs: [],
  name: "deposit",
  stateMutability: "payable",
  type: "function",
};

const INVEST = {
  inputs: [
    { internalType: "address payable", name: "recipient", type: "address" },
  ],
  outputs: [],
  name: "sendPayment",
  stateMutability: "nonpayable",
  type: "function",
};

export const App = () => {
  const { account } = useWallet();
  const connex = useConnex();
  const { open, onConnectionStatusChange } = useWalletModal();
  const [buttonText, setButtonText] = useState("Connect Custom Button");

  useEffect(() => {
    const handleConnected = (address: string | null) => {
      if (address) {
        const formattedAddress = `${address.slice(
          0,
          6,
        )}...${address.slice(-4)}`;
        setButtonText(`Disconnect from ${formattedAddress}`);
      } else {
        setButtonText("Connect Custom Button");
      }
    };

    handleConnected(account);

    onConnectionStatusChange(handleConnected);
  }, [account, onConnectionStatusChange]);

  const transferToFund = async () => {
    const clause = connex.thor
      .account(FUND_ADDRESS)
      .method(ADD_FUNDS)
      .value(1 * ONE_VET)
      .asClause();

    await connex.vendor
      .sign("tx", [clause])
      .comment("calling the adding thing")
      .request();
  };

  const investFund = async () => {
    const clause = connex.thor
      .account(FUND_ADDRESS)
      .method(INVEST)
      .asClause(TEST_INVESTMENT_WALLET);

    await connex.vendor
      .sign("tx", [clause])
      .comment("calling the adding thing")
      .request();
  };

  return (
    <div className="flex">
      <h1 className="text-xl">Fund Overview</h1>

      <div className="buttonContainer">
        <WalletButton />
        <button onClick={open}>{buttonText}</button>
        <button onClick={transferToFund}>ADD LIQUIDITY</button>
        <button onClick={investFund}>INVEST FUND</button>
      </div>
    </div>
  );
};
