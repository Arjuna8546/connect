"use client";
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const handleResend = () => {
    setSeconds(120);
    setIsActive(true);
  };

  return (
    <button
      onClick={handleResend}
      disabled={isActive}
      className="mb-8 text-xs text-center text-white w-full"
    >
      Send code again {minutes} : {remainingSeconds}
    </button>
  );
}

export default Timer;
