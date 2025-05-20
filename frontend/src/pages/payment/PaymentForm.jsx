import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment/success",
      },
    });

    if (error) {
      setMessage(error.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#9b87f5]">Secure Payment</h2>

      <div className="border rounded-md p-4">
        <PaymentElement />
      </div>

      {message && (
        <div className="text-red-500 text-sm text-center">{message}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-md font-semibold transition-all duration-200 ${
          loading || !stripe
            ? "bg-[#9b87f5]/50 text-white cursor-not-allowed"
            : "bg-[#9b87f5] text-white hover:bg-[#8a73f1]"
        }`}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;
