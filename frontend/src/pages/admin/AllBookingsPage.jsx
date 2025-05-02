"use client";

import { useEffect, useState } from "react";
import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import Pagination from "../../components/user/othercomponent/Pagination";
import BookingManagement from "../../components/admin/allbookrides/BookingManagement";
import { admingetallbookings } from "../../Endpoints/AdminAPI";



const AllBookingsPage = () => {

    const[bookings,setBookings] = useState([])
    const [current, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        const handleGetRides = async () => {

            const response = await admingetallbookings(current);
            if (response?.data?.results?.success === true) {
                setBookings(response.data.results.bookings);
                setTotal(Math.ceil(response.data.count / 2))
            }

        };

        handleGetRides();
    }, [current]);
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <div className="min-h-screen text-white bg-black flex flex-col">
                <Header />
                <div className="flex flex-1 relative pt-[104px]">
                    <Sidebar />
                    <div className="flex-1 overflow-auto">
                        <BookingManagement bookings={bookings}/>
                    </div>

                </div>
                <div className="flex justify-center items-center gap-5 py-6">

                    <Pagination total={total} current={current} setPage={setPage} />

                </div>
            </div>
        </>
    );
};

export default AllBookingsPage;