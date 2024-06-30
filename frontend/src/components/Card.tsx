import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { GenericCard } from ".";

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
  funds: number;

  address: string;
};

export const Card: FC<CardProps> = (props) => {
  return (
    <Link to={`/fund/${props.address}`}>
      <GenericCard>
        <h2>{props.name}</h2>
        <CardLineChart />
        <span>Funds: {props.funds} VET</span>
      </GenericCard>
    </Link>
  );
};
