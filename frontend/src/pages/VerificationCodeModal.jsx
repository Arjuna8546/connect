"use client";
import React, { useEffect, useState } from "react";
import Logo from "../components/user/othercomponent/Logo";
import CodeInput from "../components/user/verifyotp/CodeInput";
import Timer from "../components/user/verifyotp/Timer";
import VerifyButton from "../components/user/verifyotp/VerifyButton";

const VerificationCodeModal = ({ onClose, email, isOpen, userDetail }) => {

  const [otpCode , setOtpCode] = useState("")

  const handleOtpChange = (code) =>{
    setOtpCode(code)
  }


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[752px] max-w-full px-4">
        <article className="p-10 w-full rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-90 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">
            &times;
          </button>
          <Logo />
          <p className="mb-8 text-lg text-center text-stone-300">
            We've sent a code to <strong>{email}</strong>
          </p>
          <CodeInput getOtp = {handleOtpChange}/>
          <Timer />
          <VerifyButton 
          otp={otpCode}
          userDetail = {userDetail}
          />
        </article>
      </div>
    </div>
  );
};

export default VerificationCodeModal;
