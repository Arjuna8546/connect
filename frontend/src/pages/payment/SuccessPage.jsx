import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirm_payment } from "../../Endpoints/APIs";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
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
        }
      };
      confirmPayment();
    }
  }, [paymentIntentId]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] text-white rounded-xl p-8 max-w-lg w-full shadow-lg text-center">
        <h1 className="text-3xl font-bold text-[#9b87f5] mb-4">Payment Successful</h1>
        <p className="text-gray-300 mb-6">
          Thank you for your payment. Your transaction was completed successfully.
        </p>

        {data && (
          <div className="bg-[#2a2a2a] rounded-lg p-4 text-left mb-6">
            <h2 className="text-lg font-semibold mb-2 text-white">Booking Details:</h2>
            <p><span className="text-gray-400">From:</span> {data.from_loc_name}</p>
            <p><span className="text-gray-400">To:</span> {data.to_loc_name}</p>
            <p><span className="text-gray-400">Amount Paid:</span> ₹{data.price}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-[#9b87f5] hover:bg-[#8a73f1] text-white py-2 px-6 rounded-md transition duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
