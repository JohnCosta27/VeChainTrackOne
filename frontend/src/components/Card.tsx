import React from "react";
import { FC } from "react";

type CardProps = {
    name: string;
}

export const Card: FC<CardProps> = (props) => {
    return (
        <div className="flex flex-col gap-4 bg-black text-white rounded-xl p-4">
        <h2>{props.name}</h2>
        <p>Card content</p>
        </div>
    );
}