import React from "react";
import { StrictMode } from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";
import { WalletConnectOptions } from "@vechain/dapp-kit";
import { DAppKitProvider } from "@vechain/dapp-kit-react";
import "./index.css";

const walletConnectOptions: WalletConnectOptions = {
  projectId: "a0b855ceaf109dbc8426479a4c3d38d8",
  metadata: {
    name: "Sample VeChain dApp",
    description: "A sample VeChain dApp",
    url: window.location.origin,
    icons: [`${window.location.origin}/images/logo/my-dapp.png`],
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DAppKitProvider
      nodeUrl={"https://testnet.vechain.org/"}
      genesis={"test"}
      usePersistence
      walletConnectOptions={walletConnectOptions}
    >
      <App />
    </DAppKitProvider>
  </StrictMode>,
);
