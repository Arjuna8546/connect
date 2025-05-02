import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { approveorreject, getallapproves, getrides } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";
import ApprovedRequestModal from "./ApproveRequestModal";
import toast from "react-hot-toast";

export default function RideList() {
  const user = useSelector((state) => state.user)
  const [rides, setRides] = useState()
  const [approves,setApproves] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleEffect = async (id) => {
      try {
        const res = await getrides(id)
        if (res?.data?.success === true) {
          setRides(res?.data?.rides)
        }
      }
      catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
    handleEffect(user?.user?.id)
  }, [user?.user?.id,isModalOpen])

  const handleBookRequest = async(id)=>{
    const res = await getallapproves(id)
    if(res?.data?.success===true){
      setApproves(res?.data?.data)
    }
    setIsModalOpen(true)
  }

  const onApprove=async(book_ride_id)=>{
    try{
      const res = await approveorreject({book_ride_id:book_ride_id,approve:true})
      if(res?.data?.success===true){
        toast.success(res?.data?.message)
      }
    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
    finally{
      setIsModalOpen(false)
    }
  }
  const onReject=async(book_ride_id)=>{
    try{

      const res = await approveorreject({book_ride_id:book_ride_id,approve:false})
      if(res?.data?.success===true){
        toast.success(res?.data?.message)
      }
    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
    finally{
      setIsModalOpen(false)
    }
  }
  return (
    <section className="px-20 py-12 max-md:p-10 max-sm:p-5">
      <h2 className="mb-5 text-2xl font-bold text-white">YOUR RIDES</h2>

      {rides && rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} {...ride} handleBookRequest={handleBookRequest} />
        ))
      ) : (
        <p className="text-white">No rides posted yet.</p>
      )}
      {isModalOpen&&<ApprovedRequestModal request={approves} onClose={()=>setIsModalOpen(false)} onApprove={onApprove} onReject={onReject}/>}
    </section>
  );
}
