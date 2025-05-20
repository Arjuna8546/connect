import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { payement_intent } from "../../Endpoints/APIs";
import toast from "react-hot-toast";

const PaymentModal = ({ bookId, amount, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handlePayClick = async () => {
    setLoading(true);

    try {
      const response = await payement_intent({
        amount: amount,
        currency: currency,
        user_id: user?.user?.id,
        book_id: bookId,
      });

      const data = response.data;
      if (data.clientSecret) {
        navigate("/payment", {
          state: {
            clientSecret: data.clientSecret,
            booking_id: bookId,
          },
        });
      } else {
        toast.error("Error creating payment intent.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating payment intent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-black text-[#9b87f5] border border-white rounded-2xl p-8 w-full max-w-md relative shadow-xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#9b87f5] hover:text-gray-300 text-xl transition"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 border-b border-white pb-2">Complete Payment</h2>
        <p className="mb-6 text-gray-300">
          Pay ₹{amount} for booking 
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayClick();
          }}
        >
          <button
            type="submit"
            className={`w-full px-5 py-3 rounded-lg border border-white text-white font-semibold transition-all duration-200 ${
              loading
                ? "bg-white text-[#9b87f5] cursor-not-allowed"
                : "hover:bg-white hover:text-[#9b87f5]"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;

