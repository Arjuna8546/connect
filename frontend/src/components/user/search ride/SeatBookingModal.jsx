import React, { useState } from "react";

const SeatBookingModal = ({ seatData, onBook, onClose, users }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSegmentClick = (seatNumber, segment, segmentIndex, seat) => {
        if (segment.status !== "vacant") return;

        const existing = selectedSeats.find(sel => sel.seatNumber === seatNumber);

        if (!existing) {
            return setSelectedSeats([...selectedSeats, {
                seatNumber,
                indices: [segmentIndex],
            }]);
        }

        const indices = existing.indices;
        const lastIndex = indices[indices.length - 1];

        let updatedSeats = selectedSeats.filter(sel => sel.seatNumber !== seatNumber);

        if (segmentIndex === lastIndex + 1 && seat.segments[segmentIndex].status === "vacant") {
            updatedSeats.push({
                seatNumber,
                indices: [...indices, segmentIndex],
            });
        } else {
            updatedSeats.push({
                seatNumber,
                indices: [segmentIndex],
            });
        }

        setSelectedSeats(updatedSeats);
    };

    const handleBooking = () => {
        if (selectedSeats.length > 0) {
            const bookingDetails = selectedSeats.map(sel => {
                const seat = seatData.find(s => s.seat_number === sel.seatNumber);
                const fromSegment = seat.segments[sel.indices[0]];
                const toSegment = seat.segments[sel.indices[sel.indices.length - 1]];

                const segment_ids = sel.indices.map(index => seat.segments[index].segment_id);

                return {
                    seatNumber: sel.seatNumber,
                    from: fromSegment.from,
                    to: toSegment.to,
                    segment_ids: segment_ids,
                };
            });

            onBook(bookingDetails);

            setSelectedSeats([]);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
                className="bg-[#0e0e0e] text-white rounded-2xl p-6 max-w-7xl overflow-y-auto max-h-[90vh] shadow-xl border border-gray-700 space-y-8"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <style>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                <h2 className="text-2xl md:text-3xl font-bold text-center">Seat Booking</h2>

                <div className="bg-gray-800 max-w-2xl p-4 rounded-lg text-sm font-medium text-gray-300 mb-4">
                    <h4 className="font-semibold text-xl mb-2">Route Preview</h4>
                    <ul>
                        {seatData && seatData[0]?.segments.map((segment, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-200">{segment?.from}</span>
                                    <span className="mx-2 text-gray-400">→</span>
                                    <span className="font-semibold text-gray-200">{segment?.to}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <span>({segment?.from_short} → {segment?.to_short})</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {seatData.map((seat) => (
                    <div key={seat.seat_number} className="space-y-3">
                        <h3 className="text-lg font-semibold">Seat {seat.seat_number}</h3>

                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                            {seat.segments.map((segment, idx) => {
                                const isSelected = selectedSeats.some(
                                    sel => sel.seatNumber === seat.seat_number && sel.indices.includes(idx)
                                );

                                const bgColor =
                                    segment.status === "booked"
                                        ? "bg-red-500"
                                        : isSelected
                                            ? "bg-yellow-400 text-black"
                                            : "bg-green-500";

                                return (
                                    <div
                                        key={idx}
                                        className={`min-w-[130px] px-4 py-2 rounded-xl flex flex-col items-center justify-center text-sm font-medium border border-white/20 shadow-md transition duration-200 ${bgColor} ${segment.status === "vacant" ? "cursor-pointer hover:scale-105" : "opacity-80"}`}
                                        onClick={() => handleSegmentClick(seat.seat_number, segment, idx, seat)}
                                    >
                                        <div className="whitespace-nowrap">{segment.from_short} → {segment.to_short}</div>
                                        {segment.status === "booked" && (
                                            <div className="mt-1 px-2 py-1 text-xs rounded-full bg-white text-black font-semibold shadow-inner">
                                                {segment.booked_by || "Unknown"}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="flex justify-end gap-4 pt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className={`px-6 py-2 rounded-full transition font-medium ${selectedSeats.length > 0
                            ? "bg-white text-black hover:scale-105"
                            : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                    >
                        Book Selected
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatBookingModal;
