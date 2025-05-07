import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { approveorreject, getallapproves, getrides, ridecancel, ridedelete } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import ApprovedRequestModal from "./ApproveRequestModal";
import toast from "react-hot-toast";
import DeleteRideModal from "./DeleteRideModal";
import CancelRideModal from "./CancelRideModal";

export default function RideList() {
  const user = useSelector((state) => state.user)
  const [rides, setRides] = useState()
  const [approves, setApproves] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeletModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [canelId, setCancelId] = useState(null)
  const [refetch, setRefetch] = useState(false)
  const [status,setStatus] = useState(true)


  useEffect(() => {
    const handleEffect = async (id) => {
      try {
        const stats = status ?  "active":"cancelled"
        const res = await getrides(id,stats)
        
        if (res?.data?.success === true) {
          setRides(res?.data?.rides)
        }
      }
      catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
    handleEffect(user?.user?.id)
  }, [user?.user?.id, isModalOpen, refetch,status])

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
  const confirmCancel = async(reason)=>{
    try{
      const res = await ridecancel({ride_id:canelId,reason:reason})
      if (res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
    }
    catch(error){
      toast.error(error?.response?.data?.error)
    }
    finally{
      setIsCancelModalOpen(false)
      setRefetch(!refetch)
    }
  }
  return (
    <section className="px-20 py-12 max-md:p-10 max-sm:p-5">
      <div className="flex justify-between py-3">
      <h2 className="mb-5 text-2xl font-bold text-white">YOUR RIDES</h2> 
       <button onClick={()=>setStatus(!status)} className="border-none bg-[#9b87f5] text-white font-bold rounded-2xl md:rounded-full px-8 py-3 text-base uppercase tracking-wide min-w-[156px] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
        {status?"Cancelled Ride":"Active Ride"}
        </button>
      </div>
      
      {rides && rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} {...ride} handleBookRequest={handleBookRequest} handleDeleteRide={handleDeleteRide} handleCancelRide={handleCancelRide} />
        ))
      ) : (
        <p className="text-white">No rides posted yet.</p>
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
    </section>
  );
}
