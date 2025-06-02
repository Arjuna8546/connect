"use client";
import React, { useState } from "react";
import Logo from "../othercomponent/Logo";
import { showError } from "../../../utils/toastUtils";

const OtpVerificationModal = ({ email, isOpen, onClose, onOtpSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = [];

  const handleInput = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      inputRefs[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 5) {
      showError("Please enter a valid 5-digit code.");
      return;
    }
    onOtpSubmit(otpCode); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-opacity-70">
      <div className="w-[752px] max-w-full px-4">
        <article className="p-10 w-full rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-90 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">
            &times;
          </button>
          <Logo />
          <p className="mb-8 text-lg text-center text-stone-300">
            We've sent a code to <strong>{email}</strong>
          </p>

          <div className="flex gap-3 justify-center mb-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-14 w-12 sm:h-16 sm:w-16 text-xl sm:text-2xl text-black bg-white rounded-2xl border border-zinc-300 text-center 
                focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_10px_3px_rgba(255,255,255,0.6)] transition-all duration-300"
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="h-10 text-xs font-bold text-white uppercase bg-[#9b87f5] shadow-2xl rounded-[48px] tracking-[2.52px] w-[365px]
              focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]
              transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
            >
              VERIFY
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
