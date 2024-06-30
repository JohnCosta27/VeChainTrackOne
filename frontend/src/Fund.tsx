import React from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { GenericCard } from "./components";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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
  const { fundAddress } = useParams();
  console.log(fundAddress);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Fund Name</h1>
      <h2>Address: {fundAddress}</h2>
      <h3>Investments</h3>
      <FundChart />
    </div>
  );
};
