import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirm_payment } from "../../Endpoints/APIs";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    if (paymentIntentId) {
      const confirmPayment = async () => {
        try {
          const res = await confirm_payment({ payment_intent_id: paymentIntentId });
          if (res.data) {
            toast.success(res.data.message);
            setData(res.data.data);
          }
        } catch (error) {
          toast.error("Failed to confirm payment.");
        } finally {
          setLoading(false);
        }
      };
      confirmPayment();
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center border border-[#2a2a2a]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
            {/* Spinner */}
            <svg
              className="w-12 h-12 text-[#9b87f5] animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <p className="text-[#9b87f5] text-lg font-medium">Confirming payment...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-[#9b87f5] mb-4">Payment Successful</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you for your payment! Your transaction was completed successfully.
            </p>

            {data && (
              <div className="bg-[#2a2a2a] rounded-xl p-4 text-left mb-6 border border-[#3a3a3a]">
                <h2 className="text-lg font-semibold mb-2 text-white">Booking Details</h2>
                <div className="text-sm space-y-1 text-gray-300">
                  <p><span className="text-[#9b87f5] font-medium">From:</span> {data.from_loc_name}</p>
                  <p><span className="text-[#9b87f5] font-medium">To:</span> {data.to_loc_name}</p>
                  <p><span className="text-[#9b87f5] font-medium">Amount Paid:</span> ₹{data.price}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate("/")}
              className="bg-[#9b87f5] hover:bg-[#8a73f1] text-white py-2 px-6 rounded-full font-medium transition duration-200"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
