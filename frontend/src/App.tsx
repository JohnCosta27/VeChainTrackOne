import React from "react";
import {
  WalletButton,
  useConnex,
  useWallet,
  useWalletModal,
} from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { Contract, ONE_VET } from "./contract";

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
      .account(Contract.Address)
      .method(Contract.Deposit)
      .value(1 * ONE_VET)
      .asClause();

    await connex.vendor
      .sign("tx", [clause])
      .comment("calling the adding thing")
      .request();
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-16 bg-[#FAFAFA]">
      <h1 className="text-xl">Fund Overview</h1>
      <div className="flex gap-2">
        <Card name="DeHedgeFund" funds={100} address={Contract.Address} />
        <Card name="Flynn's Farm" funds={200} address="dna" />
        <Card name="Bad Company" funds={250} address="kmdslam" />
        <Card name="Dmani's Good Deeds" funds={500} address="dnsajdnjk" />
      </div>
      <div className="buttonContainer">
        <WalletButton />
        <button onClick={open}>{buttonText}</button>
        <button onClick={transferToFund}>ADD LIQUIDITY</button>
      </div>
    </div>
  );
};
