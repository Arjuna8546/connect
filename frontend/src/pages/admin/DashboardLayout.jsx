"use client";

import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import UserManagement from "../../components/admin/dashboardpage/UserManagement";
import { useEffect, useState } from "react";
import { admingetallusers } from "../../Endpoints/AdminAPI";
import toast from "react-hot-toast";
import Pagination from "../../components/user/othercomponent/Pagination";


const DashboardLayout = () => {
    const [users, setUsers] = useState([]);
    const [current, setPage] = useState(1)
    const [total, setTotal] = useState()
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const handleGetUser = async () => {

            const response = await admingetallusers(current, debouncedSearch);
            if (response?.data?.results?.success === true) {
                setUsers(response.data.results.users);
                setTotal(Math.ceil(response.data.count / 10))
            }

        };

        handleGetUser();
    }, [current, debouncedSearch]);
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
                        <UserManagement users={users} search={search} setSearch={setSearch} />
                    </div>

                </div>
                <div className="py-5 mb-7">
                    <Pagination total={total} current={current} setPage={setPage} />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;