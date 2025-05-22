import React, { useRef, useEffect, useState } from "react";
import RideCard from "./RideCard";
import { approveorreject, finishride, getallapproves, getrides, ridecancel, ridedelete, verifybook } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import ApprovedRequestModal from "./ApproveRequestModal";
import toast from "react-hot-toast";
import DeleteRideModal from "./DeleteRideModal";
import CancelRideModal from "./CancelRideModal";
import LiveLocationModal from "./LiveLocationModal";
import OtpVerificationModal from "./OtpVerificationModal";

export default function RideList() {
  const user = useSelector((state) => state.user)
  const [rides, setRides] = useState()
  const [approves, setApproves] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeletModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [canelId, setCancelId] = useState(null)
  const [refetch, setRefetch] = useState(false)
  const [status, setStatus] = useState("active")
  const ws = useRef(null);
  const [location, setLocation] = useState(null);
  const [rideId, setRideId] = useState(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [bookId, setBookId] = useState(null)
  const [email, setEmail] = useState(null)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const websocket_ride_url = import.meta.env.VITE_WEBSOCKET_RIDE_URL

  useEffect(() => {
    const handleEffect = async (id) => {
      try {
        const res = await getrides(id, status, selectedDate)

        if (res?.data?.success === true) {
          setRides(res?.data?.rides)
        }
      }
      catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
    handleEffect(user?.user?.id)
  }, [user?.user?.id, isModalOpen, refetch, status, selectedDate])

  const handleBookRequest = async (id) => {
    const res = await getallapproves(id)
    if (res?.data?.success === true) {
      setApproves(res?.data?.data)
    }
    setIsModalOpen(true)
  }

  const onApprove = async (book_ride_id) => {
    try {
      const res = await approveorreject({ book_ride_id: book_ride_id, approve: true })
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message)
    }
    finally {
      setIsModalOpen(false)
    }
  }
  const onReject = async (book_ride_id) => {
    try {

      const res = await approveorreject({ book_ride_id: book_ride_id, approve: false })
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message)
    }
    finally {
      setIsModalOpen(false)
    }
  }

  const handleDeleteRide = (id) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }
  const confirmDelete = async () => {
    try {
      const res = await ridedelete(deleteId)
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.error)
    }
    finally {
      setIsDeleteModalOpen(false)
      setRefetch(!refetch)
    }
  }
  const handleCancelRide = (id) => {
    setCancelId(id)
    setIsCancelModalOpen(true)
  }
  const confirmCancel = async (reason) => {
    try {
      const res = await ridecancel({ ride_id: canelId, reason: reason })
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.error)
    }
    finally {
      setIsCancelModalOpen(false)
      setRefetch(!refetch)
    }
  }

  const connectWs = (ride_id) => {
    setRideId(ride_id);
    ws.current = new WebSocket(`${websocket_ride_url}${ride_id}/?user_id=${user.id}`);
    setLocationModalOpen(true);

    ws.current.onopen = () => {
      console.log("🟢 WebSocket connected");
    };

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setLocation(data);
      } catch (err) {
        console.error("❌ Invalid JSON:", err);
      }
    };

    ws.current.onclose = (e) => {
      console.log("🔴 WebSocket closed");
    };

    ws.current.onerror = (e) => {
      console.error("⚠️ WebSocket error:", e.message);
    };
  };

  const handleLocationModalClose = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    setLocation(null);
    setRideId(null)
    setLocationModalOpen(false);
  };

  const handleOtpVerify = (bookid, email) => {
    setIsOtpModalOpen(true)
    setEmail(email)
    setBookId(bookid)
  }

  const onOtpSubmit = async (otp) => {
    try {
      const res = await verifybook({ otp: otp, bookId: bookId });
      if (res?.data?.success) {
        toast.success("OTP verified successfully");
        setIsOtpModalOpen(false)
      } else {
        toast.error(res?.data?.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setRefetch(!refetch)
    }
  };


  const handleFinishRide = async (location) => {
    try {
      const res = await finishride({ "location": location, "ride_id": rideId })
      if (res?.data?.success) {
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      setTimeout(()=>{setLocationModalOpen(false)
      setRefetch(!refetch)},300)
    }
  }

  return (
    <section className="px-20 py-12 max-md:p-10 max-sm:p-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-3">
        <h2 className="text-2xl font-bold text-white">YOUR RIDES</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-[#9b87f5] text-white border border-stone-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          />
          <div className="flex flex-wrap gap-2">
            {["active", "cancelled", "completed"].map((item) => (
              <button
                key={item}
                className={`border-none px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${status === item
                    ? "bg-[#9b87f5] text-white"
                    : "bg-gray-200 text-black"
                  }`}
                onClick={() => setStatus(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)} Ride
              </button>
            ))}
          </div>
        </div>
      </div>
      {rides && rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} {...ride} handleBookRequest={handleBookRequest} handleDeleteRide={handleDeleteRide} handleCancelRide={handleCancelRide} connectWs={connectWs} handleOtpVerify={handleOtpVerify} />
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
                We couldn't find any rides on this date at the moment.
              </p>

              <div className="w-16 h-0.5 bg-stone-800"></div>

              <p className="text-stone-500 text-xs text-center">
                Try adjusting your search date or check back later
              </p>
            </div>
          </div>
        </div>

      )}
      {isModalOpen && <ApprovedRequestModal request={approves} onClose={() => setIsModalOpen(false)} onApprove={onApprove} onReject={onReject} />}
      {isDeletModalOpen && <DeleteRideModal isOpen={isDeletModalOpen} onClose={() => {
        setIsDeleteModalOpen(false);
        setDeleteId(null)
      }} onConfirm={confirmDelete} />}
      {isCancelModalOpen && <CancelRideModal isOpen={isCancelModalOpen} onClose={() => {
        setIsCancelModalOpen(false);
        setCancelId(null)
      }} onConfirm={confirmCancel} />}
      <LiveLocationModal
        isOpen={locationModalOpen}
        onClose={() => handleLocationModalClose()}
        location={location || { latitude: 8.5241, longitude: 76.9366 }}
        handleFinishRide={handleFinishRide}
      />
      {isOtpModalOpen && <OtpVerificationModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(!isOtpModalOpen)} email={email} onOtpSubmit={onOtpSubmit} />}

    </section>
  );
}
