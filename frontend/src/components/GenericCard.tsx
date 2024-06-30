import React from "react";
import { FC, ReactNode } from "react";

export const GenericCard: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-4 bg-gray-800 text-zinc-200 rounded-xl p-4 font-bold">
    {children}
  </div>
);
