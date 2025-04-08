"use client";
import React, { useState } from "react";

const PasswordInput = ({ value, onChange, onBlur, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col">
            <div
                className={`flex relative items-center px-4 py-0 h-12 rounded-2xl bg-neutral-950 transition-all duration-300 
        hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)] 
        ${error ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]" : "border border-transparent"}`}
            >
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full  text-xs font-bold placeholder-white text-white tracking-[2.1px] outline-none"
                    placeholder={name==="confirmPassword"?"Confirm Password":"Password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4"
                >
                    <svg
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.97724 0L0.878052 1.08126L15.0227 15L16.1219 13.9184L1.97724 0Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                        <path
                            d="M3.20032 3.36632L4.23492 4.38437C3.10236 5.33326 2.20051 6.5144 1.61773 7.54781L1.61595 7.5513C3.23901 10.2216 5.81431 12.7453 9.06468 12.3625C9.94204 12.2591 10.7605 11.964 11.5083 11.5418L12.5557 12.572C11.098 13.4926 9.42705 13.9802 7.6166 13.7392C4.35204 13.3047 1.68268 10.67 0 7.57575C0.790054 6.01149 1.87079 4.51498 3.20032 3.36632ZM5.55345 1.85759C6.4663 1.45736 7.45405 1.22197 8.50887 1.2052C8.56744 1.20485 9.26273 1.23733 9.5779 1.28832C9.77559 1.32045 9.97257 1.36062 10.1667 1.41056C13.2634 2.20439 15.5576 4.78041 17 7.43431C16.3949 8.63675 15.6023 9.81021 14.6572 10.8157L13.6538 9.82837C14.3519 9.08797 14.934 8.26376 15.3823 7.46434C15.3823 7.46434 14.9315 6.75119 14.5897 6.30346C14.37 6.01568 14.139 5.73629 13.8962 5.46702C13.7046 5.25468 12.9603 4.53349 12.7832 4.38332C11.5949 3.37785 10.1997 2.58891 8.52626 2.60218C7.87818 2.6123 7.25494 2.73803 6.66328 2.94967L5.55345 1.85759Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.01656 6.13796L6.81524 6.92354L9.88946 9.94856C9.47846 10.1756 9.00428 10.3048 8.49994 10.3048C6.92942 10.3048 5.65454 9.0503 5.65454 7.5049C5.65454 7.00863 5.78622 6.54239 6.01656 6.13796ZM8.44741 4.70572C8.4648 4.70537 8.48255 4.70502 8.49994 4.70502C10.0705 4.70502 11.3453 5.95985 11.3453 7.5049C11.3453 7.52236 11.3453 7.53948 11.345 7.55659L8.44741 4.70572Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                    </svg>
                </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default PasswordInput;
