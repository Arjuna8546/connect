import PaymentCard from "./PaymentCard";


const PaymentManagement = ({ payments,setStatus }) => {
    const statusOptions = ["succeeded", "failed", "incomplete", "pending"];
    return (
        <main className="p-10 ml-64 max-md:ml-0 max-md:p-5">
            <h1 className="text-2xl font-bold text-stone-300 mb-8">PAYMENT MANAGEMENT</h1>
            {/* Filter Buttons */}
            <div className="flex gap-3 flex-wrap mb-6">
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