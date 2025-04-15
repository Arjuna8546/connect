"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import Pagination from "../../components/user/othercomponent/Pagination";
import VerifyUserManagement from "../../components/admin/verifyrequestpage/VerifyUserManagement";
import VerifyRequestModal from "../../components/admin/verifyrequestpage/VerifyRequestModal";
import { adminverifiedusers } from "../../Endpoints/AdminAPI";
import { updateuser } from "../../Endpoints/APIs";
import toast from "react-hot-toast";

const VerifyRequest = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const debouncedSearch = useDebounce(search, 500);

    const onApprove =async(user)=>{
        try {
            const res = await updateuser({
                user_id: user.id,
                gov_status: "verified",
                is_verified: true,
            });
    
            if (res?.data?.success) {
                toast.success("user verified");
                fetchUsers();
            } 
        } catch (error) {
            toast.error("Error during approval:", error);
        }
    }
    const onReject =async(user)=>{
        try {
            const res = await updateuser({
                user_id: user.id,
                gov_status: "reject",
            });
    
            if (res?.data?.success) {
                toast.error("user verification rejected");
                fetchUsers();
            } 
        } catch (error) {
            toast.error("Error during approval:", error);
        }
    }


    const selectedUser = useMemo(() => {
        return users.find(user => user.id === selectedUserId) || null;
    }, [selectedUserId, users]);

    const fetchUsers = async () => {
        const response = await adminverifiedusers(currentPage, debouncedSearch);
        const data = response?.data?.results;

        if (data?.success) {
            setUsers(data.users || []);
            setTotalPages(Math.ceil((response.data.count || 0) / 10));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, debouncedSearch]);

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
                        <VerifyUserManagement
                            users={users}
                            search={search}
                            setSearch={setSearch}
                            setUserId={setSelectedUserId}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 py-6">
                    <Pagination
                        total={totalPages}
                        current={currentPage}
                        setPage={setCurrentPage}
                    />
                </div>
                {isModalOpen && (
                    <VerifyRequestModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        userDetails={selectedUser}
                        onApprove={onApprove}
                        onReject={onReject}
                        jsx={isModalOpen ? "true" : "false"} 
                        global={isModalOpen ? "true" : "false"}
                    />
                )}
            </div>
        </>
    );
};

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default VerifyRequest;
