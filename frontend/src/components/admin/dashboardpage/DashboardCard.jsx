import React from "react";
import {
    Users,
    Car,
    Wallet,
    CalendarDays,
    ActivitySquare,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#34d399", "#f87171", "#facc15", "#60a5fa"];

const DashboardCard = ({ data, range, setRange }) => {
    if (!data) {
        return <div className="text-center p-6 text-gray-600">Loading dashboard data...</div>;
    }

    const statCards = [
        {
            title: "Total Users",
            value: data.total_users,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            color: "bg-blue-100",
        },
        {
            title: "Total Rides",
            value: data.total_rides,
            icon: <Car className="w-6 h-6 text-green-600" />,
            color: "bg-green-100",
        },
        {
            title: "Total Bookings",
            value: data.total_bookings,
            icon: <CalendarDays className="w-6 h-6 text-purple-600" />,
            color: "bg-purple-100",
        },
        {
            title: "Today's Rides",
            value: data.today_rides,
            icon: <ActivitySquare className="w-6 h-6 text-yellow-600" />,
            color: "bg-yellow-100",
        },
        {
            title: "Active Rides",
            value: data.active_rides,
            icon: <Car className="w-6 h-6 text-teal-600" />,
            color: "bg-teal-100",
        },
        {
            title: "Earnings",
            value: `₹${data.earnings}`,
            icon: <Wallet className="w-6 h-6 text-emerald-600" />,
            color: "bg-emerald-100",
        },
    ];

    return (
        <div className="p-4 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                        <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
                        <div>
                            <p className="text-sm text-gray-600">{card.title}</p>
                            <h3 className="text-xl font-semibold">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Date Range Selector (common for both charts) */}
            <div className="flex justify-end mb-2">
                <label className="mr-2 text-sm font-medium text-gray-700">Date Range:</label>
                <select
                    className="border rounded px-2 py-1 text-sm"
                    value={range}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setRange(value);
                    }}
                >
                    <option value={2}>Past Day</option>
                    <option value={7}>Past Week</option>
                    <option value={30}>Past Month</option>
                    <option value={365}>Past Year</option>
                </select>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rides Chart */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">
                        Rides in Last {range} Day{range > 1 ? "s" : ""}
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data.rides_chart}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="rides" fill="#60a5fa" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Booking Status Chart */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Booking Status</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data.status_chart}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {data.status_chart.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Bookings and Active Rides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
                    <ul className="space-y-3">
                        {data.recent_bookings.map((b) => (
                            <li key={b.id} className="flex items-center gap-3">
                                <img
                                    src={b.user_profile}
                                    alt={b.user}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{b.user}</p>
                                    <p className="text-sm text-gray-500">
                                        {b.from} → {b.to} | ₹{b.price}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Active Rides</h2>
                    <ul className="space-y-3">
                        {data.active_rides_data.map((r) => (
                            <li key={r.id} className="flex items-center gap-3">
                                <img
                                    src={r.driver_profile}
                                    alt={r.driver}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{r.driver}</p>
                                    <p className="text-sm text-gray-500">
                                        {r.start} → {r.end} | ₹{r.price}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;


