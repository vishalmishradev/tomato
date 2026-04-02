"use client"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type prop = {
  price: number;
  id: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};

const Price = ({ price, id, options }: prop) => {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  // TanStack Query for total calculation
  const { data: total = price } = useQuery({
    queryKey: ["total", price, quantity, selected, options],
    queryFn: () => {
      return (
        quantity *
        (options
          ? price + options[selected].additionalPrice
          : price)
      );
    },
    staleTime: Infinity, // prevent unnecessary recalculations
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">$ {total.toFixed(2)}</h2>

      {/* Options */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>

      {/* Quantity + Cart */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>
              {"<"}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(prev => (prev < 9 ? prev + 1 : 9))}>
              {">"}
            </button>
          </div>
        </div>

        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Price;