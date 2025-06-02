import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import SeatBookingModal from "./SeatBookingModal";
import { seat, updateSeat } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import { showError, showSuccess } from "../../../utils/toastUtils";

const RideList = ({ rides }) => {
  const [detailModal, setDetailModal] = useState(false)
  const [rideId, setRideId] = useState(null)
  const [seatData, setSeatData] = useState([])
  const user = useSelector((state) => state.user)

  const handleBook = async (bookingDetails) => {
    try {
      if (!user?.user?.id) {
        showError("User not logged in.");
        return;
      }
      const segment_ids = bookingDetails.flatMap((bookDetail) => bookDetail.segment_ids || []);
      const res = await updateSeat({
        user_id: user.user.id,
        segment_ids
      });
      if (res?.data?.success === true) {
        showSuccess(res.data.message || "Booking successful!");
      } else {
        showError(res?.data?.message || "Booking failed. Please try again.");
      }

    } catch (error) {
      showError(error?.response?.data?.message);
    }
  };

  const getSeatDetails = async (rideId) => {
    try {
      const res = await seat(rideId);

      if (res?.data?.success === true && Array.isArray(res.data.data)) {
        setSeatData(res.data.data);
      } else {
       showError(`Unexpected response format or failed fetch:, ${res?.data}`);
      }
    } catch (error) {
      showError(`Error fetching seat details:", ${error}`);
    }
  }

  return (
    <div className="flex flex-col gap-5 p-5 max-md:p-2.5 max-sm:p-2.5">
      
      {rides && rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard
            key={index}
            {...ride}
            setDetailModal={setDetailModal}
            setRideId={setRideId}
            getSeatDetails={getSeatDetails}
          />
        ))
      ) : (
        <div className="flex justify-center items-center p-8">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-lg transform transition-all hover:scale-102 max-w-md w-full">
            <div className="flex flex-col items-center space-y-4">
              {/* Car Icon */}
              <div className="text-violet-400 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>

              <h3 className="text-violet-400 text-2xl font-bold">
                No Rides Available
              </h3>

              <p className="text-stone-400 text-sm text-center">
                We couldn't find any rides along this path at the moment.
              </p>

              <div className="w-16 h-0.5 bg-stone-800"></div>

              <p className="text-stone-500 text-xs text-center">
                Try adjusting your search criteria or check back later
              </p>
            </div>
          </div>
        </div>
      )}
      {detailModal && <SeatBookingModal
        isOpen={detailModal}
        onClose={() => setDetailModal(false)}
        seatData={seatData}
        onBook={handleBook}
      />}
    </div>
  );
};

export default RideList;

