import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import SeatBookingModal from "./SeatBookingModal";
import { seat, updateSeat } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RideList = ({ rides }) => {
  const [detailModal, setDetailModal] = useState(false)
  const [rideId, setRideId] = useState(null)
  const [seatData, setSeatData] = useState([])
  const user = useSelector((state) => state.user)

  const handleBook = async (bookingDetails) => {
    try {
      if (!user?.user?.id) {
        toast.error("User not logged in.");
        return;
      }
      const segment_ids = bookingDetails.flatMap((bookDetail) => bookDetail.segment_ids || []);
      const res = await updateSeat({
        user_id: user.user.id,
        segment_ids
      });
      if (res?.data?.success === true) {
        toast.success(res.data.message || "Booking successful!");
      } else {
        toast.error(res?.data?.message || "Booking failed. Please try again.");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getSeatDetails = async (rideId) => {
    try {
      const res = await seat(rideId);

      if (res?.data?.success === true && Array.isArray(res.data.data)) {
        setSeatData(res.data.data);
      } else {
        console.error("Unexpected response format or failed fetch:", res?.data);
      }
    } catch (error) {
      console.error("Error fetching seat details:", error);
    }
  }

  return (
    <div className="flex flex-col gap-5 p-5 max-md:p-2.5 max-sm:p-2.5">
      {rides && rides.map((ride, index) => (
        <RideCard key={index} {...ride} setDetailModal={setDetailModal} setRideId={setRideId} getSeatDetails={getSeatDetails} />
      ))}
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

