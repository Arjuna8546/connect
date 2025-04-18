"use client";
import { useState } from "react";

export const BookingFinal = ({state}) => {
  const [instantBooking, setInstantBooking] = useState(false);
  const [reviewRequests, setReviewRequests] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleInstantBookingChange = () => {
    setInstantBooking(true);
    setReviewRequests(false);
  };

  const handleReviewRequestsChange = () => {
    setReviewRequests(true);
    setInstantBooking(false);
  };

  return (
    <section className="flex flex-col gap-5 items-center p-5 rounded-3xl border border-solid backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 border-zinc-800 w-[546px] max-md:w-[90%] max-sm:w-full">
      <div className="w-full px-2 flex flex-col items-start text-left">
        <p className="text-xl uppercase  font-bold text-stone-300">
          Get more passengers
        </p>
        <p className="text-xs font-medium text-zinc-800">
          They prefer to get an instant answer
        </p>
      </div>

      <label className="w-full px-2 flex gap-2.5 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={instantBooking}
          onChange={handleInstantBookingChange}
          className="w-5 h-[18px] rounded-md border border-solid bg-neutral-950 border-zinc-500"
        />
        <span className="text-xl font-bold text-sky-700">
          Enable Instant Booking
        </span>
      </label>

      <hr className="h-px bg-zinc-800 w-[90%]" />

      <label className="w-full px-2 flex gap-2.5 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={reviewRequests}
          onChange={handleReviewRequestsChange}
          className="w-5 h-[18px] bg-white rounded-md border border-solid border-zinc-500"
        />
        <span className="text-xl font-bold text-sky-700">
          Review every request before it expires
        </span>
      </label>

      <label className="w-full px-2 text-lg font-bold text-stone-300">
        Anything to add about your ride?
      </label>

      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Flexible about where and when to meet? Not taking motorway? Got limited space in your boot?"
        className="box-border p-2.5 text-xs font-medium leading-5 rounded-2xl bg-stone-950 text-zinc-500 w-[90%] h-[108px]"
      />

      <button className="text-base font-bold text-black uppercase bg-white border border-solid shadow-2xl border-zinc-800 h-[55px] rounded-[30px] w-[90%]"
      onClick={()=>{
        console.log({...state,final_publish:{"instantBooking":instantBooking,"additionalInfo":additionalInfo } })
      }}
      >
        publish ride
      </button>
    </section>
  );
};
