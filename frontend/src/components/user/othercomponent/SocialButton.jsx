import React from "react";

const SocialButton = ({ icon, label }) => {
  return (
    <button className="flex gap-2.5 items-center px-5 py-2.5 bg-black rounded-3xl cursor-pointer max-sm:justify-center max-sm:w-full">
      <div dangerouslySetInnerHTML={{ __html: icon }} />
      
      <span className="text-xs font-bold uppercase text-stone-300 tracking-[2.1px]">
        {label}
      </span>
    </button>
  );
};

export default SocialButton;
