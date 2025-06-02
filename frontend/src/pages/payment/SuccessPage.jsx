import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirm_payment } from "../../Endpoints/APIs";
import { showError, showSuccess } from "../../utils/toastUtils";

const RedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const paymentIntentId = searchParams.get("payment_intent");
  const redirect_status = searchParams.get("redirect_status");

  useEffect(() => {
    if (paymentIntentId && (redirect_status === "succeeded" || redirect_status === "failed")) {
      const confirmPayment = async () => {
        try {
          const res = await confirm_payment({
            payment_intent_id: paymentIntentId,
            redirect_status: redirect_status,
          });

          if (res.data) {
            if (redirect_status === "succeeded") {
              showSuccess(res.data.message || "Payment succeeded");
              setData(res.data.data);
            } else {
              showError(res.data.message || "Payment failed");
              setErrorMsg(res.data.message || "Payment failed");
            }
          }
        } catch (error) {
          setErrorMsg("Something went wrong during payment confirmation.");
        } finally {
          setLoading(false);
        }
      };
      confirmPayment();
    } else {
      setLoading(false);
      setErrorMsg("Missing or invalid payment information.");
    }
  }, [paymentIntentId, redirect_status]);

  const SuccessIcon = () => (
    <svg className="w-20 h-20 text-green-400 animate-bounce mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
  );

  const FailedIcon = () => (
    <svg className="w-20 h-20 text-red-500 animate-pulse mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center border border-[#2a2a2a]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
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
            {redirect_status === "succeeded" ? (
              <>
                <div className="flex justify-center mb-4">
                  <SuccessIcon />
                </div>
                <h1 className="text-3xl font-extrabold text-green-400 mb-2">Payment Successful</h1>
                <p className="text-gray-300 mb-4 leading-relaxed">
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
                <p className="text-sm text-gray-400 mb-4">A confirmation email has been sent to your registered address.</p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <FailedIcon />
                </div>
                <h1 className="text-3xl font-extrabold text-red-500 mb-2">Payment Failed</h1>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We're sorry, but your payment could not be processed.
                </p>
                <div className="bg-[#2a2a2a] rounded-xl p-4 mb-4 text-sm text-gray-300 border border-[#3a3a3a]">
                  <p>• Double-check your card details.</p>
                  <p>• Ensure your bank hasn't blocked the transaction.</p>
                  <p>• Try using a different payment method.</p>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  If this keeps happening, please contact support.
                </p>
              </>
            )}

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-[#9b87f5] hover:bg-[#8a73f1] text-white py-2 px-6 rounded-full font-medium transition duration-200"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;


