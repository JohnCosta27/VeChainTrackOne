import React from "react";
import {
  WalletButton,
  useConnex,
  useWallet,
  useWalletModal,
} from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import index from "./index.css";

const CONTRACT_ADDRESS = "0x65DAf03c74E62fB3561365C3482F92B94244f562";

const contractABI = {
  inputs: [],
  name: "withdraw",
  outputs: [],
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

  const callMethod = async () => {
    const clause = connex.thor
      .account(CONTRACT_ADDRESS)
      .method(contractABI)
      .asClause();

    // making the transaction
    const result = await connex.vendor
      .sign("tx", [clause])
      .comment("calling the store function")
      .request();
  };

  return (
    <div>
      <img src="/src/images/EasyP.png" alt="EasyP Logo" style={{ width: '25%'}} />

      <h2>Pension Manager</h2>

      <div className="buttonContainer">
        <WalletButton />
        <button onClick={open}>{buttonText}</button>
        <button onClick={callMethod}>Donate Funds</button>
      </div>
    </div>
  );
};