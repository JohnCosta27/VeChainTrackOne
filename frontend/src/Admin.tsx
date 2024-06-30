import React, { useState } from "react";
import { useConnex } from "@vechain/dapp-kit-react";
import { FC, useContext } from "react";
import { Contract, ONE_VET } from "./contract";

export const Admin: FC = () => {
  const connex = useConnex();

  const [returnValue, setReturnValue] = useState(0);

  const onReturnInvestment = async () => {
    const clause = connex.thor
      .account(Contract.Address)
      .method(Contract.ReturnInvestment)
      .value(returnValue * ONE_VET)
      .asClause();

    await connex.vendor
      .sign("tx", [clause])
      .comment("Returning fat stacks back to the fund")
      .request();
  };

  return (
    <div>
      <input
        type="number"
        value={returnValue}
        onChange={(e) => setReturnValue(parseFloat(e.target.value))}
      />
      <button onClick={onReturnInvestment}>RETURN INVESTMENT</button>
    </div>
  );
};
