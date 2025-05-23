import PaymentCard from "./PaymentCard";
import { useLocation } from "react-router-dom";

const PaymentManagement = ({ payments,setStatus }) => {
    const isAdmin = location.pathname.includes("/admin");
    const statusOptions = ["succeeded", "failed", "incomplete"];
    return (
        <main className={`p-10 ${isAdmin ? "ml-64" : ""} max-md:ml-0 max-md:p-5`}>
            {/* Filter Buttons */}
            <div className="flex gap-3 justify-end flex-wrap mb-6">
                {statusOptions.map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${status === s
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-5">
                {payments.length > 0 ? (
                    payments.map((payment) => <PaymentCard key={payment.id} payment={payment} />)
                ) : (
                    <div className="text-center text-stone-400 text-sm font-medium mt-10">
                        No Payment found.
                    </div>
                )}
            </div>
        </main>
    );
};

export default PaymentManagement;