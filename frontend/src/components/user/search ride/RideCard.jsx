"use client";
import React from "react";

export default function RideCard({
    startTime,
    endTime,
    from,
    to,
    duration,
    driver,
    gender,
    driverImage,
    price,
    status,
}) {
    return (
        <article className="w-full p-6 md:p-8 rounded-2xl border border-stone-800 shadow-xl bg-[#0e0e0e] hover:shadow-white/30 transition-all duration-300 flex flex-col gap-6 md:gap-8 animate-fade-in">

            <div className="flex items-center justify-between w-full">
                <div className="w-1/4 flex flex-col items-center text-center">
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow">{startTime}</span>
                    <span className="mt-1 text-xs md:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase">{from}</span>
                </div>
                <div className="w-1/2 relative flex items-center justify-center h-[30px]">
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#9b87f5] to-[#ffffff] rounded-md" style={{ transform: "translateY(-50%)" }} />
                    <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#9b87f5] bg-[#9b87f5] shadow-md" />
                    <span className="absolute left-1/2 -top-7 -translate-x-1/2 bg-[#1A1F2C] px-4 py-1 rounded-lg text-xs text-[#9b87f5] font-bold shadow">{duration}</span>
                    <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#ffffff] bg-[#ffffff] shadow-md ml-auto" />
                </div>
                <div className="w-1/4 flex flex-col items-center text-center">
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow">{endTime}</span>
                    <span className="mt-1 text-xs md:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase">{to}</span>
                </div>
            </div>

            <div className="w-full border-t border-stone-700" />

            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-6">

                <div className="flex items-center gap-4 w-full md:w-1/3">
                    <img
                        src={driverImage}
                        alt={driver}
                        className="w-14 h-14 rounded-full object-cover border border-gray-600 shadow"
                    />
                    <div className="flex flex-col text-left">
                        <p className="text-lg font-semibold text-white">{driver}</p>
                        <p className="text-sm text-[#9b87f5]">{gender}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <span className="text-sm text-[#D6BCFA] font-semibold uppercase tracking-wide">
                        {status} ride
                    </span>
                </div>

                <div className="w-full md:w-1/3 flex justify-center">
                    <button className="bg-white text-black font-bold px-6 py-3 rounded-full text-lg tracking-wide hover:scale-105 active:scale-95 transition w-full max-w-[150px]">
                        ₹{price}
                    </button>
                </div>
            </div>
        </article>


    );
}
