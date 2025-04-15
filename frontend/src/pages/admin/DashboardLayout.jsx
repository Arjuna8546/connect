"use client";

import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import UserManagement from "../../components/admin/dashboardpage/UserManagement";
import { useEffect, useState } from "react";
import { admingetallusers } from "../../Endpoints/AdminAPI";
import Pagination from "../../components/user/othercomponent/Pagination";


const DashboardLayout = () => {
    const [users, setUsers] = useState([]);
    const [current, setPage] = useState(1)
    const [total, setTotal] = useState()
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [verified, setVerified] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const handleGetUser = async () => {

            const response = await admingetallusers(current, debouncedSearch, verified);
            if (response?.data?.results?.success === true) {
                setUsers(response.data.results.users);
                setTotal(Math.ceil(response.data.count / 10))
            }

        };

        handleGetUser();
    }, [current, debouncedSearch, verified]);
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
                        <UserManagement users={users} search={search} setSearch={setSearch} setUsers={setUsers}/>
                    </div>

                </div>
                <div className="flex justify-center items-center gap-5 py-6">
                    <button
                        onClick={() => setVerified(true)}
                        className={"px-6 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium uppercase border-white text-white hover:bg-white hover:text-black"}
                    >
                        verified users
                    </button>
                    <Pagination total={total} current={current} setPage={setPage} />
                    <button
                        onClick={() => setVerified(false)}
                        className={"px-6 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium uppercase border-white text-white hover:bg-white hover:text-black"}
                    >
                        Unverified users
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;