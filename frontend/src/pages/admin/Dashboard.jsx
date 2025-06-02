"use client";

import { useEffect, useState } from "react";
import Header from "../../components/admin/othercomponet/Header";
import Sidebar from "../../components/admin/othercomponet/Sidebar";
import { admindashboard } from "../../Endpoints/AdminAPI";
import DashboardCard from "../../components/admin/dashboardpage/DashboardCard";
import { showError } from "../../utils/toastUtils";


const Dashboard = () => {
    const [data, setData] = useState(null)
    const [range,setRange] = useState(7)
    useEffect(() => {
        const handleGetRides = async () => {
            try {
                const response = await admindashboard(range);
                if (response && response.data) {
                    setData(response.data);
                } else {
                    showError("No data found in response:", response);
                }
            } catch (err) {
                showError("Error fetching dashboard data:", err);
            }
        };
        handleGetRides();
    }, [range]);

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <div className="min-h-screen text-white bg-black flex flex-col">
                <Header />
                <div className="flex flex-1 pt-[104px] overflow-hidden">
                    <div className="w-64 bg-gray-900">
                        <Sidebar />
                    </div>
                    <div className="flex-1 bg-gray-50 text-black overflow-auto p-4">
                        {data && <DashboardCard data={data}  range={range} setRange={setRange}/>}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard;