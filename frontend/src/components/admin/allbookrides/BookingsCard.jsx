const BookingsCard = ({ booking }) => {
    const {
        status,
        from_loc_name,
        to_loc_name,
        price: total_price,
        seat_number,
        booking_time: created_at,
        seat_segments = [],  // Use the correct seat segment property name
        user_details = {},
        ride: {
            properties: {
                date,
                time,
                user_details: driver = {},
            } = {},
        } = {},
    } = booking;

    const statusStyles = {
        confirmed: "bg-green-500 bg-opacity-10 text-green-100",
        cancelled: "bg-red-500 bg-opacity-10 text-red-100",
        completed: "bg-blue-500 bg-opacity-10 text-blue-100",
        reject: "bg-yellow-500 bg-opacity-10 text-yellow-100", // Added rejected status
    };

    const statusClass = statusStyles[status] || "bg-gray-500 bg-opacity-10 text-gray-100";

    return (
        <article className="flex justify-between items-start p-6 rounded-3xl bg-stone-950 gap-8 max-sm:flex-col max-sm:gap-5 max-sm:text-center">
            {/* Booking Details */}
            <div className="flex flex-col gap-3 text-stone-300 text-sm font-medium max-sm:items-center max-sm:text-center">
                <div className="flex gap-6 max-sm:flex-col max-sm:items-center">
                    <div className="text-blue-400 font-semibold">{from_loc_name}</div>
                    <div className="text-white">→</div>
                    <div className="text-green-400 font-semibold">{to_loc_name}</div>
                </div>
                <div className="flex gap-6 max-sm:flex-col max-sm:items-center">
                    <div>{date}</div>
                    <div>{time}</div>
                </div>
                <div>Passenger: <span className="text-blue-300">{user_details.username}</span></div>
                

                {/* Seat Segments */}
                {seat_segments.length > 0 && (
                    <div className="text-xs text-stone-400">
                        Segments: {seat_segments.map(seg => `${seg.from_location} → ${seg.to_location}`).join(", ")}
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex flex-col gap-3 items-end max-sm:items-center">
                <div className="text-xl font-bold text-green-300">₹{total_price}</div>
                <div className={`text-xs px-3 py-1 rounded-full uppercase tracking-widest ${statusClass}`}>
                    {status}
                </div>
                <div className="text-xs text-stone-500">Booked on: {new Date(created_at).toLocaleDateString()}</div>
            </div>
        </article>
    );
};

export default BookingsCard;
