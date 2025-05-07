import React, { useState } from 'react';

const CancelRideModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [hasReadWarnings, setHasReadWarnings] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason.trim() && hasReadWarnings) {
      onConfirm(reason);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-transparent bg-opacity-80 backdrop-blur-sm overflow-auto custom-scroll-hide">
      <div className="bg-stone-950 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border border-zinc-800 transform transition-all">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center">
            {/* Warning Icon */}
            <div className="mb-6 text-violet-500 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-violet-500 mb-2">
                Caution: Canceling Your Ride
              </h2>
              <p className="text-stone-400 text-sm">
                This action will cancel your ride and notify all booked passengers.
              </p>
            </div>

            <div className="bg-stone-900 rounded-xl p-6 mb-8 border border-stone-800 w-full">
              <p className="text-stone-300 text-lg font-semibold mb-4">
                 Important Cancellation Notices:
              </p>

              <div className="grid gap-4 text-left mb-6">
                <div className="flex items-start space-x-3 bg-stone-950 p-3 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 text-violet-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.401 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-violet-500 font-semibold">Booked Passengers Impact</p>
                    <p className="text-stone-400 text-sm">Your passengers will need to find alternative transportation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-stone-950 p-3 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 text-violet-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.171-2.303 0-3.182C10.536 7.719 11.768 7.5 12 7.5c.725 0 1.45.22 2.003.659" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-violet-500 font-semibold">Credit Points Reduction</p>
                    <p className="text-stone-400 text-sm">Your profile rating and credit points will be affected.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-left">
                  <label htmlFor="cancellation-reason" className="block text-stone-300 text-sm font-medium mb-2">
                    Reason for Cancellation *
                  </label>
                  <textarea
                    id="cancellation-reason"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-300 placeholder-stone-600 focus:outline-none focus:border-violet-500 transition-colors"
                    rows="3"
                    placeholder="Please provide a detailed reason for canceling this ride..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="warning-checkbox"
                    className="mt-1"
                    checked={hasReadWarnings}
                    onChange={(e) => setHasReadWarnings(e.target.checked)}
                    required
                  />
                  <label htmlFor="warning-checkbox" className="text-stone-400 text-sm">
                    I understand that canceling this ride will affect my credit points and impact booked passengers.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 w-full py-6">
              <button
                type="submit"
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-200 uppercase w-full max-w-[160px] border ${
                  !reason.trim() || !hasReadWarnings
                    ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                    : 'bg-red-950 text-red-200 hover:bg-red-900 border-red-800 hover:scale-105'
                }`}
                disabled={!reason.trim() || !hasReadWarnings}
              >
                Cancel Ride
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-sm font-bold tracking-wider bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 uppercase w-full max-w-[160px] hover:scale-105"
              >
                Keep Ride
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelRideModal;
