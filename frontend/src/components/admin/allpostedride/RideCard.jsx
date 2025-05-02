const RideCard = ({ ride }) => {
    const {
      properties: {
        start_location_name,
        destination_location_name,
        date,
        time,
        price,
        status = "active", // fallback if not present
        passenger_count,
        passengers = [], // assuming you attach this manually or from API
        stopovers,
        user_details
      },
    } = ride;
  
    const stopoverList = stopovers?.features?.map((s) => s?.properties?.stop) || [];
  
    return (
      <article className="flex justify-between items-start p-6 rounded-3xl bg-stone-950 gap-8 max-sm:flex-col max-sm:gap-5 max-sm:text-center">
        {/* Ride Details */}
        <div className="flex flex-col gap-3 text-stone-300 text-sm font-medium max-sm:items-center max-sm:text-center">
          <div className="flex gap-6 max-sm:flex-col max-sm:items-center">
            <div className="text-blue-400 font-semibold">{start_location_name}</div>
            <div className="text-white">→</div>
            <div className="text-green-400 font-semibold">{destination_location_name}</div>
          </div>
          <div className="flex gap-6 max-sm:flex-col max-sm:items-center">
            <div>{date}</div>
            <div>{time}</div>
          </div>
          <div>Driver: <span className="text-blue-300">{user_details.username}</span></div>
          <div>Seats: {passenger_count}</div>
  
          {stopoverList.length > 0 && (
            <div className="text-xs text-stone-400">
              Stopovers: {stopoverList.join(", ")}
            </div>
          )}
  
          {/* Passenger Details */}
          {passengers.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-xs text-stone-400 uppercase tracking-wide">Passengers:</div>
              {passengers.map((p) => (
                <div key={p.id} className="flex items-center gap-3 text-sm bg-stone-900 px-3 py-2 rounded-xl">
                  <img
                    src={p.profile_url || "/userAvatar.png"}
                    alt={p.name}
                    className="w-8 h-8 rounded-full border border-blue-500"
                  />
                  <div className="flex flex-col text-left">
                    <div className="text-white font-medium">{p.name}</div>
                    <div className="text-stone-400 text-xs">{p.from} → {p.to}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Right Actions */}
        <div className="flex flex-col gap-3 items-end max-sm:items-center">
          <div className="text-xl font-bold text-green-300">₹{price}</div>
          <div
            className={`text-xs px-3 py-1 rounded-full uppercase tracking-widest ${
              status === "active"
                ? "bg-green-500 bg-opacity-10 text-green-100"
                : "bg-red-500 bg-opacity-10 text-red-100"
            }`}
          >
            {status}
          </div>
        </div>
      </article>
    );
  };
  
  export default RideCard;
  
  