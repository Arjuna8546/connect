import React from "react";

const CityInput = () => {
    return (
        <div className="flex relative items-center rounded-2xl bg-stone-950 h-[75px] w-[438px] max-md:w-full px-4">
            <input
                type="text"
                placeholder="Add City"
                className="w-full bg-transparent text-white placeholder-white text-xs font-bold uppercase tracking-[2.1px] outline-none"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(44.984deg)" }}
                >
                    <path
                        d="M17.498 10.9289C17.7742 10.9288 17.9981 11.1526 17.9982 11.4287L18.0013 22.4287C18.0014 22.7049 17.7776 22.9288 17.5015 22.9289L16.5015 22.9291C16.2253 22.9292 16.0014 22.7054 16.0013 22.4293L15.9982 11.4293C15.9981 11.1531 16.2219 10.9292 16.498 10.9291L17.498 10.9289Z"
                        fill="white"
                    />
                    <path
                        d="M22.9999 17.4268C22.9999 17.7029 22.7761 17.9268 22.5 17.9269L11.5 17.93C11.2239 17.9301 10.9999 17.7063 10.9999 17.4302L10.9996 16.4302C10.9995 16.154 11.2233 15.9301 11.4994 15.93L22.4994 15.9269C22.7756 15.9268 22.9995 16.1506 22.9996 16.4268L22.9999 17.4268Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>

    );
};

export default CityInput;