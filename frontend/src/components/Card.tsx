import React from "react";
import { FC } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    price: 100,
  },
  {
    name: "Page B",
    price: 200,
  },
  {
    name: "Page C",
    price: 150,
  },
  {
    name: "Page C",
    price: 120,
  },
  {
    name: "Page C",
    price: 240,
  },
  {
    name: "Page C",
    price: 150,
  },
];

const CardLineChart: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" stroke="#28EF33" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

type CardProps = {
  name: string;
};

export const Card: FC<CardProps> = (props) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 text-zinc-200 rounded-xl p-4 font-bold">
      <h2>{props.name}</h2>
      <CardLineChart />
    </div>
  );
};
