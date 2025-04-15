"use client";
import React from "react";

function VerifyRequestModal({
  isOpen,
  setIsOpen,
  userDetails,
  onApprove,
  onReject,
}) {
  if (!isOpen) return null;

  const handleApprove = () => {
    onApprove?.(userDetails);
    setIsOpen(false);
  };

  const handleReject = () => {
    onReject?.(userDetails);
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6"
      onClick={handleBackdropClick}
    >
      <main className="font-bold w-full max-w-[653px] max-h-[90vh] animate-fadeIn my-auto">
        <section className="w-full bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] relative">

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="px-12 pt-12 pb-6 border-b border-gray-100 max-md:px-6">
            <h1 className="text-xl font-bold text-neutral-950">
              VERIFY REQUEST
            </h1>
          </div>


          <div className="flex-1 overflow-y-auto px-12 py-6 max-md:px-6 scrollbar-hide">
            <div className="space-y-6">

              <div className="bg-gray-50 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  User Details
                </h2>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-gray-700">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Name</span>
                    <span className="font-medium">
                      {userDetails?.username || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Email</span>
                    <span className="font-medium">
                      {userDetails?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Phone</span>
                    <span className="font-medium">
                      {userDetails?.phone_no || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Date-Of-Birth</span>
                    <span className="font-medium">
                      {userDetails?.date_of_birth || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Gender</span>
                    <span className="font-medium">
                      {userDetails?.gender || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Bio</span>
                    <span className="font-medium">
                      {userDetails?.bio || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Uploaded ID Preview
                </h2>
                {userDetails?.gov_url ? (
                  <div className="relative aspect-[1.17] w-full">
                    <img
                      src={userDetails.gov_url}
                      alt="Government ID"
                      className="rounded-xl w-full h-full object-contain bg-white p-4 border border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 rounded-xl border border-gray-200">
                    <p className="text-red-500 font-medium">
                      No document uploaded
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-12 py-6 border-t border-gray-100 max-md:px-6">
            <div className="flex gap-6 justify-end">
              <button
                onClick={handleReject}
                className="px-10 py-3 bg-red-600 rounded-full text-xs font-bold text-white uppercase tracking-[2.1px] hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                aria-label="Reject request"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="px-10 py-3 bg-blue-500 rounded-full text-xs font-bold text-white uppercase tracking-[2.1px] hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                aria-label="Approve request"
              >
                Approve
              </button>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default VerifyRequestModal;
