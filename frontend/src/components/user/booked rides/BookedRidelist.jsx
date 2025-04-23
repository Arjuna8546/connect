import React, { useEffect, useState } from "react";
import BookedRideCard from "./BookedRideCard";
import { getbookings } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";

export default function BookedRidelist() {

    const user = useSelector((state) => state.user)
    const [bookings, setBookings] = useState()
    const [status,setStatus] = useState(true)
    useEffect(() => {
        const handleEffect = async (id,status) => {
            try {
                const res = await getbookings(id, status)
                if (res?.data?.success === true) {
                    setBookings(res?.data?.data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        handleEffect(user?.user?.id,status===true?"active":"pending")
    }, [status])



    return (
        <section className="px-20 py-12  max-md:p-10 max-sm:p-5">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-white">My Booked Rides</h2>
                <button
                    className="h-10 text-base font-bold leading-10 text-center text-black uppercase bg-white rounded-[30px] tracking-[3.15px] px-4"
                    onClick={() => setStatus(!status)}
                >
                    {status?"Pending Bookings":"Approved Bookings"}
                </button>
            </div>

            {bookings?.length > 0 ? (
                bookings.map((booking, index) => (
                    <BookedRideCard key={index} {...booking} status={status}/>
                ))
            ) : (
                <p className="text-white">You haven't booked any rides yet.</p>
            )}
        </section>
    );
}
