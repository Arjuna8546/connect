const RideCard = ({ ride }) => {
  const {
    properties: {
      start_location_name,
      destination_location_name,
      date,
      time,
      price,
      status,
      passenger_count,
      passengers = [],
      stopovers,
      user_details
    },
  } = ride;

  const stopoverList = stopovers?.features?.map((s) => s?.properties?.stop) || [];

  return (
    <article className="flex justify-between items-start p-6 rounded-3xl bg-white border shadow-md gap-8 max-sm:flex-col max-sm:gap-5 max-sm:text-center">

      {/* Left Column: Info */}
      <div className="flex flex-col gap-4 text-gray-800 text-sm w-full max-sm:items-center">

        {/* Locations */}
        <div className="flex gap-4 items-center justify-start max-sm:flex-col max-sm:gap-2">
          <div className="text-blue-600 font-semibold">{start_location_name}</div>
          <div className="text-gray-500">→</div>
          <div className="text-green-600 font-semibold">{destination_location_name}</div>
        </div>

        {/* Date & Time */}
        <div className="flex gap-4 text-gray-500 max-sm:flex-col max-sm:items-center">
          <span>{date}</span>
          <span>{time}</span>
        </div>

        {/* Driver Info */}
        <div className="space-y-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Driver</div>
          <div className="flex items-center gap-3">
            <img
              src={user_details.profile_url || "/userAvatar.png"}
              alt={user_details.name}
              className="w-8 h-8 rounded-full border border-blue-400"
            />
            <span className="text-blue-600">{user_details.username}</span>
          </div>
        </div>

        <div className="text-gray-600">Seats: <span className="text-gray-800">{passenger_count}</span></div>

        {/* Stopovers */}
        {stopoverList.length > 0 && (
          <div className="text-xs text-gray-500">
            <span className="uppercase tracking-wide">Stopovers:</span> {stopoverList.join(", ")}
          </div>
        )}

        {/* Passengers */}
        {passengers.length > 0 && (
          <div className="mt-2 flex flex-col gap-3 w-full">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Passengers</div>
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-2">
              {passengers.map((p) => (
                <div key={p.user_details.id} className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
                  <img
                    src={p.user_details.profile_url || "/userAvatar.png"}
                    alt={p.user_details.name}
                    className="w-8 h-8 rounded-full border border-blue-400"
                  />
                  <div className="flex flex-col">
                    <div className="text-gray-800 font-medium">{p.name}</div>
                    <div className="text-gray-500 text-xs">{p.from_loc_name} → {p.to_loc_name}</div>
                    <div
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit mt-1 ${p.booking_status === "active"
                          ? "bg-green-100 text-green-700"
                          : p.booking_status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : p.booking_status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {p.booking_status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Price & Status */}
      <div className="flex flex-col gap-4 items-end max-sm:items-center">
        <div className="text-xl font-bold text-green-600">₹{price}</div>
        <div
          className={`text-xs px-4 py-1 rounded-full uppercase tracking-widest font-semibold ${status === "active"
              ? "bg-green-100 text-green-700"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
            }`}
        >
          {status}
        </div>
      </div>
    </article>
  );
};

export default RideCard;


