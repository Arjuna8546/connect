import React, { useEffect, useState } from "react";
import BookedRideCard from "./BookedRideCard";
import { cancelbooking, getbookings } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CancelBooking from "./CancelBooking";
import {motion} from "framer-motion";

export default function BookedRidelist() {

    const user = useSelector((state) => state.user)
    const [bookings, setBookings] = useState()
    const [status, setStatus] = useState(true)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const [canelId, setCancelId] = useState(null)

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });


    useEffect(() => {
        const handleEffect = async (id, status) => {
            try {
                const res = await getbookings(id, status, selectedDate)
                if (res?.data?.success === true) {
                    setBookings(res?.data?.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        handleEffect(user?.user?.id, status === true ? "active" : "pending")
    }, [user?.user?.id, status, selectedDate])

    const handleCancel = (id) => {
        setCancelId(id)
        setIsCancelModalOpen(true)
    }

    const handleCancelSubmit = async (reason) => {
        try {
            const res = await cancelbooking(canelId, reason);

            if (res?.data?.success === true) {
                setBookings(prev => prev?.filter(booking => booking.id !== canelId));
                toast.success(res.data.message || "Booking cancelled successfully");
            } else {
                toast.error(res.data?.error || "Failed to cancel booking");
            }

        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong while cancelling the booking");
            console.error("Cancel booking error:", error);
        }
        finally {
            setIsCancelModalOpen(false)
        }
    };




    return (
        <section className="px-20 py-12 h-full max-md:p-10 max-sm:p-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-3">
                <h2 className="text-2xl font-bold text-white">My Booked Rides</h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-[#9b87f5] text-white border border-stone-700 rounded-full px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    />
                    <button
                        className="border-none bg-[#9b87f5] text-white font-bold rounded-2xl md:rounded-full px-6 py-2 text-base uppercase tracking-wide min-w-[156px] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                        onClick={() => setStatus(!status)}
                    >
                        {status ? "Pending Bookings" : "Approved Bookings"}
                    </button>
                </div>
            </div>

            {bookings?.length > 0 ? (
                bookings.map((booking) => (
                    <BookedRideCard key={booking.id} {...booking} handlecancel={handleCancel} status={status} />
                ))
            ) : (
                <div className="flex justify-center items-center p-8">
                    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-lg transform transition-all hover:scale-102 max-w-md w-full">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Car Icon */}

                            <motion.div
                                className="text-violet-400"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-16 h-16"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75c-1.385-1.014-3.375-1.5-6-1.5v12c2.625 0 4.615.486 6 1.5m0-12c1.385-1.014 3.375-1.5 6-1.5v12c-2.625 0-4.615.486-6 1.5m0-12v12"
                                    />
                                </svg>
                            </motion.div>


                            <h3 className="text-violet-400 text-2xl font-bold">
                                No Booking Available
                            </h3>

                            <p className="text-stone-400 text-sm text-center">
                                We couldn't find any booking on this day at the moment.
                            </p>

                            <div className="w-16 h-0.5 bg-stone-800"></div>

                            <p className="text-stone-500 text-xs text-center">
                                Try adjusting your search date or check back later
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {isCancelModalOpen && <CancelBooking isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={handleCancelSubmit} />}
        </section>
    );
}
