const BookingsCard = ({ booking }) => {
    const {
        booking_status,
        from_loc_name,
        to_loc_name,
        price: total_price,
        payment_status,
        booking_time: created_at,
        seat_segments = [],
        user_details = {},
        ride_details,
    } = booking;

    const date = ride_details.properties?.date;
    const time = ride_details.properties?.time;
    const rider_details = ride_details.properties?.user_details;

    const statusStyles = {
        active: "bg-green-600 bg-opacity-10 text-white border border-green-600",
        cancelled: "bg-red-500 bg-opacity-10 text-white border border-red-400",
        completed: "bg-blue-500 bg-opacity-10 text-white border border-blue-400",
        pending: "bg-yellow-500 bg-opacity-10 text-white border border-yellow-400",
    };

    const statusClass = statusStyles[booking_status] || "bg-gray-500 bg-opacity-10 text-gray-300";

    return (
        <article className="flex justify-between items-start p-6 rounded-3xl bg-white gap-8 shadow-md hover:shadow-lg transition-shadow duration-300 max-sm:flex-col max-sm:gap-5 w-full  mx-auto">
            {/* Left Section */}
            <div className="flex flex-col gap-4 text-sm text-gray-700 font-medium w-full">
                {/* Route */}
                <div className="flex items-center gap-4 text-base font-semibold text-gray-900 justify-start max-sm:justify-center">
                    <span className="text-blue-600">{from_loc_name}</span>
                    <span>→</span>
                    <span className="text-green-600">{to_loc_name}</span>
                </div>

                {/* Date & Time */}
                <div className="flex gap-4 text-xs text-gray-500 max-sm:justify-center">
                    <span>Ride Date: {date}</span>
                    <span>Ride Time: {time}</span>
                </div>

                {/* Passenger Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={user_details.profile_url || "/userAvatar.png"}
                        alt={user_details.name}
                        className="w-8 h-8 rounded-full border border-blue-500"
                    />
                    <div>
                        Passenger:{" "}
                        <span className="text-blue-600 font-semibold">{user_details.username}</span>
                    </div>
                </div>

                {/* Rider Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={rider_details.profile_url || "/userAvatar.png"}
                        alt={rider_details.name}
                        className="w-8 h-8 rounded-full border border-green-500"
                    />
                    <div>
                        Rider:{" "}
                        <span className="text-green-600 font-semibold">{rider_details.username}</span>
                    </div>
                </div>

                {/* Segments */}
                {seat_segments.length > 0 && (
                    <div className="text-xs text-gray-500">
                        Segments:{" "}
                        {seat_segments
                            .map((seg) => `${seg.from_location} → ${seg.to_location}`)
                            .join(", ")}
                    </div>
                )}
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end gap-3 max-sm:items-center text-sm">
                <div className="text-2xl font-bold text-green-600">₹{total_price}</div>

                {/* Booking Status */}
                <div
                    className={`text-xs px-3 py-1 rounded-full uppercase tracking-widest ${statusClass}`}
                >
                    {booking_status}
                </div>

                {/* Booking Time */}
                <div className="text-xs text-gray-400">
                    Booked on:{" "}
                    {new Date(created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </div>

                {/* Payment */}
                <div
                    className={`px-3 py-1 text-xs rounded-full border ${payment_status === "paid"
                            ? "text-green-400 border-green-500"
                            : "text-red-400 border-red-500"
                        }`}
                >
                    Payment: {payment_status}
                </div>
            </div>
        </article>

    );
};

export default BookingsCard;

