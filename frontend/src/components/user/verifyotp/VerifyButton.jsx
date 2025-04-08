import React from "react";
import { verify } from "../../../Endpoints/APIs";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

function VerifyButton({ otp, userDetail }) {
  const nav = useNavigate()
  const handleSubmit = async (otp, userDetail) => {
    try{
      const response = await verify({ otp: otp, ...userDetail })
      if (response?.data?.success===true) {
  
        toast.success(response?.data?.message)
        nav('/login')
      }
    }
    catch(error){
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="h-10 text-xs font-bold text-black uppercase bg-white shadow-2xl rounded-[48px] tracking-[2.52px] w-[365px] 
        focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_10px_3px_rgba(255,255,255,0.6)] 
        transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
        onClick={() => {
          handleSubmit(otp, userDetail)
        }}
      >
        VERIFY
      </button>
    </div>
  );
}

export default VerifyButton;
