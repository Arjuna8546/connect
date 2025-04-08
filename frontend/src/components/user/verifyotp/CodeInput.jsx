"use client";
import React, { useState, useRef, useEffect } from "react";

function CodeInput({getOtp}) {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 5);
    }, []);

    useEffect(() => {
        const otp = code.join("");
        getOtp && getOtp(otp); 
    }, [code]);

    const handleInput = (index, value) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center mb-8 ">
            {[0, 1, 2, 3, 4].map((index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={code[index]}
                    onChange={(e) => handleInput(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-14 w-12 sm:h-16 sm:w-16 text-xl sm:text-2xl text-black bg-white rounded-2xl border border-zinc-300 text-center 
                    focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_10px_3px_rgba(255,255,255,0.6)] transition-all duration-300"

                    aria-label={`Digit ${index + 1} of verification code`}
                />
            ))}
        </div>
    );
}

export default CodeInput;
