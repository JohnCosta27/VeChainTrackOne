import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart } from "recharts";
import { useConnex } from "@vechain/dapp-kit-react";
import { Contract, ONE_VET, decodeNumber } from "./contract";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const FundChart: FC = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export const Fund: FC = () => {
  const { fundAddress: bruhh } = useParams();
  const connex = useConnex();

  const [data, setData] = useState({
    totalDeposited: 0,
    totalInvested: 0,
    totalReturned: 0,
  });

  const [deposit, setDeposit] = useState(0);

  if (bruhh == null) {
    throw new Error("Bruh");
  }

  const fundAddress = bruhh;

  useEffect(() => {
    async function fetchNumbers() {
      const fundAccount = connex.thor.account(Contract.Address);

      const getTotalDeposit = fundAccount.method(Contract.TotalDeposited);
      const getTotalInvested = fundAccount.method(Contract.TotalInvested);
      const getTotalReturned = fundAccount.method(Contract.TotalReturn);

      const [totalDepositedData, totalInvestedData, totalReturnData] =
        await Promise.all([
          getTotalDeposit.call(),
          getTotalInvested.call(),
          getTotalReturned.call(),
        ]);

      const totalDeposited = decodeNumber(totalDepositedData);
      const totalInvested = decodeNumber(totalInvestedData);
      const totalReturned = decodeNumber(totalReturnData);

      setData({ totalDeposited, totalInvested, totalReturned });
    }

    fetchNumbers();
  }, []);

  const onDeposit = async () => {
    const clause = connex.thor
      .account(Contract.Address)
      .method(Contract.Deposit)
      .value(deposit * ONE_VET)
      .asClause();

    await connex.vendor
      .sign("tx", [clause])
      .comment("calling the adding thing")
      .request();
  };

  const onInvest = async () => {
    const clause = connex.thor
      .account(Contract.Address)
      .method(Contract.InvestFund)
      .asClause(Contract.InvestmentAccount.Account2);

    await connex.vendor
      .sign("tx", [clause])
      .comment(`Investing the fund in ${Contract.InvestmentAccount.Account2}`)
      .request();
  };

  const onWithdraw = async () => {
    const clause = connex.thor
      .account(Contract.Address)
      .method(Contract.Withdraw)
      .asClause();

    await connex.vendor
      .sign("tx", [clause])
      .comment("Withdrawing your funds")
      .request();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Fund Name</h1>
      <h2>Address: {fundAddress}</h2>
      <h3>Investments</h3>
      <FundChart />
      <p>Deposited: {data.totalDeposited} VET</p>
      <p>Invested: {data.totalInvested} VET</p>
      <p>Returned: {data.totalReturned} VET</p>
      <input
        value={deposit}
        onChange={(e) => setDeposit(parseFloat(e.target.value))}
      />
      <button onClick={onDeposit}>Deposit funds</button>
      <button onClick={onInvest}>Invest in Clean Energy!</button>
      <button onClick={onWithdraw}>Withdraw amount</button>
    </div>
  );
};
