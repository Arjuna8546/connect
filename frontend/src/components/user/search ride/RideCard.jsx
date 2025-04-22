"use client";
import React from "react";

export default function RideCard({
    id,
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
    stopovers = [],
    setDetailModal,
    setRideId,
    getSeatDetails
}) {
    return (
        <article className="w-full p-4 sm:p-6 md:p-8 rounded-2xl border border-stone-800 shadow-xl bg-[#0e0e0e] hover:shadow-white/30 transition-all duration-300 flex flex-col gap-6 md:gap-8 animate-fade-in">

            {/* Time + Route */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow">{startTime}</span>
                    <span className="mt-1 text-xs sm:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase">{from}</span>
                </div>

                <div className="relative flex items-center justify-center w-full sm:w-1/2 h-[30px]">
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#9b87f5] to-[#ffffff] rounded-md transform -translate-y-1/2" />
                    <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#9b87f5] bg-[#9b87f5] shadow-md" />
                    <span className="absolute left-1/2 -top-7 -translate-x-1/2 bg-[#1A1F2C] px-4 py-1 rounded-lg text-xs text-[#9b87f5] font-bold shadow">
                        {duration}
                    </span>
                    <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#ffffff] bg-[#ffffff] shadow-md ml-auto" />
                </div>

                <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow">{endTime}</span>
                    <span className="mt-1 text-xs sm:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase">{to}</span>
                </div>
            </div>

            <div className="w-full border-t border-stone-700" />

            {/* Ride Details */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-6">

                {/* Driver Info */}
                <div className="flex items-center gap-4 w-full md:w-1/3">
                    <img
                        src={driverImage}
                        alt={driver}
                        className="w-14 h-14 rounded-full object-cover border border-gray-600 shadow"
                    />
                    <div className="flex flex-col text-left">
                        <p className="text-base sm:text-lg font-semibold text-white">{driver}</p>
                        <p className="text-sm text-[#9b87f5]">{gender}</p>
                    </div>
                </div>

                {/* Ride Status */}
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <span className="text-sm text-[#D6BCFA] font-semibold uppercase tracking-wide">
                        {status} ride
                    </span>
                </div>

                {/* Price Button */}
                <div onClick={()=>{
                    setDetailModal(true)
                    setRideId(id)
                    getSeatDetails(id)
                    }} className="w-full md:w-1/3 flex justify-center">
                    <button className="bg-white text-black font-bold px-6 py-3 rounded-full text-base sm:text-lg tracking-wide hover:scale-105 active:scale-95 transition w-full max-w-[150px]">
                        ₹{price} 
                    </button>
                    
                </div>

            </div>

            {/* Stopovers */}
            {stopovers.length > 0 && (
                <div className="w-full mt-6 flex flex-col gap-4">
                    <h3 className="text-white text-sm font-semibold tracking-wide uppercase border-b border-stone-700 pb-1">
                        Stopovers
                    </h3>
                    <div className="grid gap-3">
                        {stopovers.map((s, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 py-2 rounded-xl bg-[#1a1a1a] border border-stone-700 shadow-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm">{s.stop}</span>
                                    <span className="text-xs text-[#9b87f5]">{s.distance} • {s.duration}</span>
                                </div>
                                <div className="text-white text-sm font-semibold">₹{s.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>


    );
}
