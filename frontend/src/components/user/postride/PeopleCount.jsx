"use client";
import React, { useState } from "react";
import CounterControls from "./CounterControls";
import { useNavigate } from "react-router-dom";

const PeopleCount = ({state}) => {
  const [count, setCount] = useState(3);
  const [isComfortChecked, setIsComfortChecked] = useState(false);
  const nav = useNavigate()

  const handleIncrement = () => {
    setCount((prev) => Math.min(prev + 1, 4));
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 1));
  };

  const handleComfortCheck = () => {
    setIsComfortChecked(!isComfortChecked);
  };

  const handleSubmit = () => {
    const finalPassengerCount = isComfortChecked ? 2 : count;
    nav('/postride/price',{state:{...state,passanger_count:finalPassengerCount}})
  };

  return (
    <section className="flex flex-col gap-5 justify-center items-center rounded-3xl border border-solid backdrop-blur-[7.5px] bg-[#121212] bg-opacity-50 border-zinc-800 w-full max-w-[546px] px-6 py-10 sm:px-8 sm:py-12">
      <h2 className="text-xl text-center font-bold text-stone-300">
        SO HOW MANY CONNECT PASSENGERS CAN YOU TAKE?
      </h2>

      <CounterControls
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      <div className="flex flex-col gap-2.5 items-start text-xl font-bold text-stone-300 mt-6">
        <span>Passenger options</span>
        <div className="flex gap-2.5 items-center">
          <input
            type="checkbox"
            id="comfort-checkbox"
            checked={isComfortChecked}
            onChange={handleComfortCheck}
            className="h-5 w-5 text-white"
          />
          <label htmlFor="comfort-checkbox" className="text-xs font-medium text-stone-300">
            Max 2 in the back (for comfort)
          </label>
        </div>
        <span className="text-xs font-medium text-zinc-800">
          Think comfort, keep the middle seat empty
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="text-base font-bold text-black uppercase bg-white border border-solid border-zinc-800 h-[62px] rounded-[30px] tracking-[3.15px] w-full max-w-[436px] mt-5"
      >
        Continue
      </button>
    </section>
  );
};

export default PeopleCount;
