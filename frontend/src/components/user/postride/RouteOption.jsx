"use client";
import React from "react";
import RadioButton from "./RadioButton";

const RouteOption = ({ duration, distance, route, selected, onClick }) => {
    return (
        <button
            className="flex items-start gap-4 p-4 mb-5 rounded-2xl cursor-pointer bg-stone-950 w-full"
            onClick={onClick}
        >
            <RadioButton selected={selected} />
            <div className="flex flex-col">
                <p className="text-base font-medium text-stone-300">{duration}</p>
                <p className="text-xs font-bold uppercase text-white text-opacity-50 tracking-[2.1px]">
                    {distance} - {route}
                </p>
            </div>
        </button>

    );
};

export default RouteOption;