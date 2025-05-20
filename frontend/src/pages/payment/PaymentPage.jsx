import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";


const stripePromise = loadStripe(
  "pk_test_51RQidGChNna2WnTbzlHPQClruoE86EJzsWBbpSIGODwxx1t3OFre4Uhq36jhtBrVzvMdVBMWzEP1LAXJTYuwwvzT00B0vlPhL7"
);

const PaymentPage = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      });
    }
  }, [clientSecret]);

  return (
    <div className="min-h-screen backdrop-blur-2xl flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#1a1a1a] text-white p-6 rounded-xl shadow-lg">
        {options ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        ) : (
          <p className="text-center text-[#9b87f5] font-semibold">Loading payment details...</p>
        )}
      </div>
    </div>

  );
};

export default PaymentPage;