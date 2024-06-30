import React, { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart } from "recharts";
import { useConnex, useWallet } from "@vechain/dapp-kit-react";
import { Contract, ONE_VET, decodeNumber } from "./contract";
import { GenericCard } from "./components";

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
  const { account } = useWallet();

  const [data, setData] = useState({
    totalDeposited: 0,
    totalInvested: 0,
    totalReturned: 0,
    totalInvestedByMe: 0,
    availableWithdraw: 0,
    totalInvestedCounter: 0,
  });

  const [deposit, setDeposit] = useState(0);

  if (bruhh == null) {
    throw new Error("Bruh");
  }

  const fundAddress = bruhh;

  const interval = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  useEffect(() => {
    async function fetchNumbers() {
      const fundAccount = connex.thor.account(Contract.Address);

      const getTotalDeposit = fundAccount.method(Contract.TotalDeposited);
      const getTotalInvested = fundAccount.method(Contract.TotalInvested);
      const getTotalReturned = fundAccount.method(Contract.TotalReturn);

      const getTotalInvestedByMe = fundAccount.method(Contract.UserDeposit);
      const getTotalInvestedCounter = fundAccount.method(
        Contract.TotalOriginalInvested,
      );

      const [
        totalDepositedData,
        totalInvestedData,
        totalReturnData,
        investedByMeData,
        totalInvestedCounterData,
      ] = await Promise.all([
        getTotalDeposit.call(),
        getTotalInvested.call(),
        getTotalReturned.call(),
        getTotalInvestedByMe.call(account!),
        getTotalInvestedCounter.call(),
      ]);

      const totalDeposited = decodeNumber(totalDepositedData);
      const totalInvested = decodeNumber(totalInvestedData);
      const totalReturned = decodeNumber(totalReturnData);
      const totalInvestedByMe = decodeNumber(investedByMeData);
      const totalInvestedCounter = decodeNumber(totalInvestedCounterData);

      const availableWithdraw =
        Math.round((totalReturned / totalInvestedByMe) * 100) / 100;

      console.log(totalInvestedCounter);

      setData({
        totalDeposited,
        totalInvested,
        totalReturned,
        totalInvestedByMe,
        availableWithdraw,
        totalInvestedCounter,
      });
    }

    if (account == null) {
      return;
    }

    clearInterval(interval.current);
    interval.current = setInterval(fetchNumbers, 5000);
  }, [account]);

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
      <div className="flex gap-2 w-full">
        <GenericCard>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg">Invested</p>
            <p className="text-md">{data.totalInvested}</p>
          </div>
        </GenericCard>
        <GenericCard>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg">Returned</p>
            <p className="text-md">{data.totalReturned}</p>
          </div>
        </GenericCard>
        <GenericCard>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg">Deposited</p>
            <p className="text-md">{data.totalDeposited}</p>
          </div>
        </GenericCard>
      </div>
      <div className="flex gap-2 w-full">
        <GenericCard>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg">Invested by You</p>
            <p className="text-md">{data.totalInvestedByMe}</p>
          </div>
        </GenericCard>
        <GenericCard>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg">Available Withdraw</p>
            <p className="text-md">{data.availableWithdraw}</p>
          </div>
        </GenericCard>
      </div>
      <div className="join">
        <input
          className="input input-bordered join-item"
          placeholder="0"
          value={deposit}
          onChange={(e) => setDeposit(parseFloat(e.target.value))}
        />
        <button className="btn join-item rounded-r-full" onClick={onDeposit}>
          Deposit
        </button>
      </div>
      <button onClick={onInvest}>Invest in Clean Energy!</button>
      <button onClick={onWithdraw}>Withdraw amount</button>
    </div>
  );
};
