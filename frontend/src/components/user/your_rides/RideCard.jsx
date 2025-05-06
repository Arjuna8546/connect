"use client";
import React from "react";
import StopoversTimeline from "./StopoversTimeline";

export default function RideCard({
  id,
  startTime,
  endTime,
  from,
  to,
  duration,
  date,
  status,
  passengers,
  vehicle,
  distance,
  routeName,
  instantBooking,
  pickupLocation,
  dropoffLocation,
  additionalInfo,
  stopovers,
  passengersList,
  handleBookRequest,
}) 

{
  return (
    <article className="w-full py-10 px-6 md:px-14 mx-auto rounded-2xl border border-stone-800 shadow-2xl bg-[#0e0e0e] mb-8 transition hover:shadow-purple-500/30  animate-fade-in relative overflow-hidden flex flex-col gap-7">

      <div className="w-full flex flex-col border-b border-gray-700 pb-6">
        <div className="flex items-center justify-between w-full flex-wrap gap-4">

          <div className="flex items-center justify-between gap-6 md:gap-10 flex-wrap">

            <div className="flex flex-col items-center min-w-[75px] md:w-fit w-full text-center">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow">{startTime}</span>
              <span className="mt-1 text-xs md:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase max-w-[250px]">{from}</span>
            </div>

            <div className="hidden md:flex flex-col items-center flex-1 min-w-[200px]">
              <div className="relative flex items-center w-full max-w-[190px] h-[20px]">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#9b87f5] to-[#ffffff] rounded-md" style={{ transform: "translateY(-50%)" }} />
                <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#9b87f5] bg-[#9b87f5] mr-1 shadow-md" />
                <span className="absolute left-1/2 -top-7 -translate-x-1/2 bg-[#1A1F2C] px-4 py-1 rounded-lg text-xs text-[#9b87f5] font-bold  shadow">{duration}</span>
                <span className="relative z-10 w-4 h-4 rounded-full border-2 border-[#9b87f5] bg-[#ffffff] ml-auto shadow-md" />
              </div>
            </div>


            <div className="flex flex-col items-center min-w-[75px] md:w-fit w-full text-center">
              <span className="text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow">{endTime}</span>
              <span className="mt-1 text-xs md:text-sm text-[#D6BCFA] font-semibold tracking-wider uppercase max-w-[250px]">{to}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <time className="text-3xl md:text-4xl  font-extrabold text-white px-4 py-1 rounded ">
              {date}
            </time>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white border-b border-gray-700 pb-6">
        <p><span className="font-semibold text-[#D6BCFA]">Passengers:</span> {passengers}</p>
        <p><span className="font-semibold text-[#D6BCFA]">Vehicle:</span> {vehicle?.type} - {vehicle?.model} ({vehicle?.number})</p>
        <p><span className="font-semibold text-[#D6BCFA]">Distance:</span> {distance}</p>
        <p><span className="font-semibold text-[#D6BCFA]">Route:</span> {routeName}</p>
        <p><span className="font-semibold text-[#D6BCFA]">Pickup:</span> {pickupLocation}</p>
        <p><span className="font-semibold text-[#D6BCFA]">Dropoff:</span> {dropoffLocation}</p>
        {additionalInfo && (
          <p className="col-span-full"><span className="font-semibold text-[#D6BCFA]">Info:</span> {additionalInfo}</p>
        )}
      </div>

      {(stopovers?.length > 0 || passengersList?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-700 pb-6">

          {stopovers && <StopoversTimeline stopovers={stopovers} />}

          {passengersList?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#D6BCFA] mb-3">
                Passengers ({passengersList.length})
              </h3>
              <ul className="space-y-3">
                {passengersList.map((passenger, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-4 bg-[#1a1a1a] px-4 py-2 rounded-xl shadow-sm"
                  >

                    <div className="flex items-center gap-4">
                      <img
                        src={passenger.profileImage}
                        alt={passenger.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-500"
                      />
                      <div>
                        <p className="text-white font-medium">
                          {passenger.name}{" "}
                          <span className="text-xs text-gray-400">({passenger.gender})</span>
                        </p>
                        <p className="text-sm text-[#9b87f5]">
                          {passenger.from} → {passenger.to}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-7 gap-5 w-full justify-between pt-4">

        <button className="border-none bg-white text-black font-bold rounded-2xl md:rounded-full px-8 py-3 text-base uppercase tracking-wide min-w-[125px] shadow-lg hover:from-[#ffffff] hover:to-[#f9f9f9] hover:scale-105 active:scale-95 transition-all duration-200 self-end md:self-auto">
          {status} ride
        </button>
        {!instantBooking &&<button className="border-none bg-white text-black font-bold rounded-2xl md:rounded-full px-8 py-3 text-base uppercase tracking-wide min-w-[125px] shadow-lg hover:from-[#ffffff] hover:to-[#ffffff] hover:scale-105 active:scale-95 transition-all duration-200 self-end md:self-auto"
        onClick={()=>handleBookRequest(id)}
        >
          requests
        </button>}
      </div>
    </article>
  );
}
