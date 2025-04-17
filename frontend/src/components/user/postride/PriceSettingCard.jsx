import React, { useState } from "react";
import PriceControls from "./PriceControls";

const PriceSettingCard = ({distancePrice}) => {
    const [price, setPrice] = useState(distancePrice);

    const increment = () => {
        setPrice((prev) => prev + 10);
    };

    const decrement = () => {
        setPrice((prev) => (prev > 50 ? prev - 10 : prev));
    };

    return (
        <div className="flex flex-col justify-center items-center rounded-3xl border border-solid backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 border-zinc-800 h-auto py-10 px-6 max-w-[546px] w-full">
            <h2 className="mb-5 text-xl font-bold text-stone-300">
                SET YOUR PRICE PER SEAT
            </h2>

            <div className="mb-2 text-5xl font-bold text-green-600">₹{price}</div>

            <PriceControls onIncrement={increment} onDecrement={decrement} />

            <p className="my-5 text-xs font-medium text-stone-300 text-center">
                Perfect price for this ride! You'll get passengers in no time
            </p>

            <div className="mb-5 h-px bg-zinc-800 w-[318px]" />

            <h3 className="mb-1.5 text-xs font-medium text-stone-300 flex items-center">
                STOPOVER PRICES
                <svg
                    className="ml-1 w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </h3>
            <p className="mb-5 text-xs font-medium text-zinc-800">
                stop wise prices that u can edit
            </p>

            <button className="text-base font-bold text-black uppercase bg-white border border-solid shadow-2xl border-zinc-800 h-[62px] rounded-[30px] tracking-[3.15px] w-full max-w-[436px]">
                continue
            </button>
        </div>
    );
};

export default PriceSettingCard;

