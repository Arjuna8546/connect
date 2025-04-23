import React from "react";

export default function BookedRideCard({ from, to, pickup_time, price, ride ,status}) {
  const formattedTime = new Date(pickup_time).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article
    className={`w-full py-8 px-6 md:px-10 rounded-2xl border border-stone-800 shadow-xl bg-[#0e0e0e] mb-6 transition hover:shadow-purple-500/30 animate-fade-in flex flex-col gap-5 ${
      !status ? "opacity-60 backdrop-blur-[4px]" : ""
    }`}>
      <div className="flex flex-col gap-2 text-white">
        <h3 className="text-xl font-bold text-[#D6BCFA]">{from} → {to}</h3>
        <p><span className="text-[#9b87f5] font-semibold">Pickup Time:</span> {formattedTime}</p>
        <p><span className="text-[#9b87f5] font-semibold">Price:</span> ₹{price}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-700 pt-4">
        <div className="flex items-center gap-4">
          <img
            src={ride.rider.profileImage}
            alt={ride.rider.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-600"
          />
          <div className="text-white">
            <p className="font-medium">{ride.rider.name}</p>
            <p className="text-sm text-gray-400">{ride.rider.gender}</p>
          </div>
        </div>

        <div className="text-white">
          <p><span className="text-[#9b87f5] font-semibold">Vehicle:</span> {ride.vehicle.type} - {ride.vehicle.model} ({ride.vehicle.number})</p>
        </div>
      </div>
      
    </article>
  );
}
