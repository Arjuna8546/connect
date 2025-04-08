import React from "react";
import { ArrowRightIcon } from "./Icons";

const MenuItem = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex relative items-center px-6 py-0 bg-white border-b border-solid border-b-neutral-400 h-[63px] w-full text-left max-sm:px-4 max-sm:py-0"
    >
      <span className="flex-shrink-0">
        <Icon />
      </span>
      <span className="ml-3.5 text-sm font-bold uppercase text-zinc-800 tracking-[2.73px] max-sm:text-xs max-sm:tracking-[2px]">
        {label}
      </span>
      <span className="absolute right-6 max-sm:right-4">
        <ArrowRightIcon />
      </span>
    </button>
  );
};

export default MenuItem;