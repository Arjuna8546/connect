import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { payement_intent, walletPayment } from "../../Endpoints/APIs";
import { Wallet } from "lucide-react";
import { showError, showSuccess } from "../../utils/toastUtils";

const PaymentModal = ({ bookId, amount, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handlePayClick = async () => {
    setLoading(true);
    try {
      const response = await payement_intent({
        amount: amount,
        currency: "USD",
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
        showError("Error creating payment intent.");
      }
    } catch (error) {
      showError("Error creating payment intent.");
    } finally {
      setLoading(false);
    }
  };

  const handleWalletPayment = async () => {
    setIsProcessing(true);

    try {
      const res = await walletPayment({
        amount: amount,
        currency: "USD",
        user_id: user?.user?.id,
        book_id: bookId,
      });

      if (res?.data?.success) {
        showSuccess("Wallet payment successful!");
        console.log(res);
      } else {
        showError(res?.data?.message || "Wallet payment failed!");
      }

    } catch (err) {
      showError(
        err?.response?.data?.message ||
        "An unexpected error occurred during wallet payment"
      );
    } finally {
      setIsProcessing(false);
      onClose();
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

        <h2 className="text-2xl font-bold mb-4 border-b border-white pb-2">
          Complete Payment
        </h2>

        <p className="mb-6 text-gray-300">Pay ₹{amount} for booking</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayClick();
          }}
        >
          <button
            type="submit"
            className={`w-full px-5 py-3 rounded-lg border border-white text-white font-semibold transition-all duration-200 mb-3 ${loading
              ? "bg-white text-[#9b87f5] cursor-not-allowed"
              : "hover:bg-white hover:text-[#9b87f5]"
              }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <div
          onClick={isProcessing ? null : handleWalletPayment}
          className={`mt-2 w-full border border-white text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition duration-200 ${isProcessing
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-white hover:text-[#9b87f5]"
            }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Wallet size={20} />
              Pay with Wallet
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;


