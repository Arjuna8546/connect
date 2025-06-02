import React from "react";

const HowToStartRideModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-60 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-violet-700">How to Start a Ride</h2>
          
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <span className="font-semibold">Install the App:</span>{" "}
              <a
                href="/ConnectTracker.apk"
                download
                className="text-violet-600 underline"
              >
                Download the .apk file
              </a>
            </li>
            <li>
              <span className="font-semibold">Login:</span> Use your current account's email and password.
            </li>
            <li>
              <span className="font-semibold">Select the Ride:</span> Choose the ride you plan to start.
            </li>
            <li>
              <span className="font-semibold">Start Tracking:</span> Tap on “Start Tracking” to begin.
            </li>
          </ol>

          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded">
            <p><strong>Important:</strong> Location and Notification access are required.</p>
            <p>Location will be tracked in the background. Please do not close the app.</p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-violet-700 text-white rounded hover:bg-violet-800"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToStartRideModal;
