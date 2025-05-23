import React, { useEffect, useState } from 'react'
import { admingetallpayements } from '../../Endpoints/AdminAPI'
import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import Pagination from "../../components/user/othercomponent/Pagination";
import PaymentManagement from '../../components/admin/allpayments/PaymentManagement';



const AllPaymentPage = () => {

    const[payments,setPayments] = useState([])
    const [current, setPage] = useState(1)
    const [total, setTotal] = useState()
    const [status, setStatus] = useState("succeeded");

    useEffect(() => {
        const handleGetPayments = async () => {

            const response = await admingetallpayements(current,status);
            if (response?.data?.results?.success === true) {
                setPayments(response.data.results.payments);
                setTotal(Math.ceil(response.data.count / 2))
            }

        };

        handleGetPayments();
    }, [current,status]);
    
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
                        <h1 className=" ml-74 text-2xl font-bold text-stone-300 mt-8">PAYMENT MANAGEMENT</h1>
                        <PaymentManagement payments={payments} setStatus={setStatus}/>
                    </div>

                </div>
                <div className="flex justify-center items-center gap-5 py-6">

                    <Pagination total={total} current={current} setPage={setPage} />

                </div>
            </div>
        </>
    );
};

export default AllPaymentPage;
