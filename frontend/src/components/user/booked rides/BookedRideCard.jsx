import React from "react";

export default function BookedRideCard({id, from, to, pickup_time, price,payment_status, ride, status ,handlecancel,connectWs,onPayemntClick}) {
  const today = new Date().toISOString().split("T")[0];
  const formattedTime = new Date(pickup_time).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <article
      className={`w-full py-8 px-6 md:px-10 rounded-2xl border border-stone-800 shadow-xl mb-6 transition hover:shadow-purple-500/30 animate-fade-in flex flex-col gap-5 relative ${ride.status === "cancelled"
          ? "bg-[#1a1a1a] opacity-60 backdrop-blur-[3px]"
          : "bg-[#0e0e0e]"
        }`}
    >
      {/* Cancelled Tag */}
      {ride.status === "cancelled" && (
        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Cancelled
        </span>
      )}

      <div className="flex flex-col gap-2 text-white">
        <h3 className="text-xl font-bold text-[#D6BCFA]">
          {from} → {to}
        </h3>
        <p>
          <span className="text-[#9b87f5] font-semibold">Pickup Time:</span>{" "}
          {formattedTime}
        </p>
        <p>
          <span className="text-[#9b87f5] font-semibold">Price:</span> ₹{price}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-700 pt-4">
        <div className="flex items-center gap-4">
          <img
            src={ride.rider.profileImage}
            alt={ride.rider.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-600"
          />
          
          <div className="text-white">
            <div className="flex gap-2 items-center">
            <p className="font-medium">{ride.rider.name}</p>{ride.rider.is_verified && (
            <img
              src="https://cdn.builder.io/api/v1/image/assets/aadabba814c24e21949a3d066a352728/ac356513f4cd364f86e079687e73a62865c2b46b?placeholderIfAbsent=true"
              alt="Verified badge"
              className="w-4 h-4"
            />
          )}
          </div>
            <p className="text-sm text-gray-400">{ride.rider.gender}</p>
          </div>
        </div>

        <div className="text-white">
          <p>
            <span className="text-[#9b87f5] font-semibold">Vehicle:</span>{" "}
            {ride.vehicle.type} - {ride.vehicle.model} ({ride.vehicle.number})
          </p>
        </div>
      </div>
      {ride.date>=today && ride.status !== "cancelled" &&<div className="flex  md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-700 pt-4">
        {!ride.is_tracking&&<button onClick={()=>handlecancel(id)} className="border border-[#fb5e5e] text-[#fb5e5e] font-bold rounded-2xl md:rounded-full px-5 py-3 text-base uppercase tracking-wide min-w-[156px] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">cancel</button>}
        <div className="flex gap-3">
        {ride.is_tracking&&<button onClick={()=>connectWs(ride.id)} className="border border-[#9b87f5] text-[#9b87f5] font-bold rounded-2xl md:rounded-full px-5 py-3 text-base uppercase tracking-wide min-w-[156px] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200" >track</button>}
        {payment_status!=="paid"&&<button onClick={()=>onPayemntClick(id,price)} className="border border-[#9b87f5] text-[#9b87f5] font-bold rounded-2xl md:rounded-full px-5 py-3 text-base uppercase tracking-wide min-w-[156px] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200" >payment</button>}
        </div> 
      </div>}


    </article>

  );
}
