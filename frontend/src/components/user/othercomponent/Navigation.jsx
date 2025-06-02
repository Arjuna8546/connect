"use client";
import Logo from "./Logo";
import { DropdownIcon, LoginIcon } from "../homepage/Icons";
import NavigationMenu from "../homepage/NavigationMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const nav = useNavigate();

  return (
    <header className="flex bg-black justify-between items-center px-20 border-b border-gray-700 border-opacity-10 h-[104px] max-md:px-10 max-sm:px-4 max-sm:h-[80px]">
      <div className="flex items-center">
        <div className="max-sm:scale-75 transition-transform duration-300">
          <Logo />
        </div>
      </div>

      <nav className="flex gap-6 items-center">
        <button className="flex gap-1.5 items-center text-xs font-bold tracking-widest text-white uppercase max-md:hidden">
          <span onClick={()=>nav("/search")}>Search</span>
          <DropdownIcon />
        </button>

        <button
          className="px-10 py-4 text-xs font-bold tracking-widest text-white uppercase bg-[linear-gradient(57deg,#0A0A0A_0%,#3D3B3B_50%,#0A0A0A_100%)] rounded-[50px]
          max-sm:px-4 max-sm:py-2 max-sm:text-[10px]"
          onClick={() => nav("/postride")}
        >
          post a ride
        </button>

        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="p-5 cursor-pointer max-md:hidden"
        >
          <LoginIcon />
        </button>
      </nav>

      <button
        className="hidden gap-5 items-center max-md:flex"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Menu"
      >
        <div className="flex flex-col gap-2 justify-center items-center h-5 w-[30px]">
          <span className="h-0.5 bg-white bg-opacity-90 w-[30px]" />
          <span className="w-4 h-0.5 bg-white bg-opacity-90" />
          <span className="h-0.5 bg-white bg-opacity-90 w-[30px]" />
        </div>
      </button>

      {showMenu && (
        <div className="absolute top-[104px] left-0 md:left-auto md:right-0 w-full md:w-auto z-50 max-sm:top-[80px]">
          <NavigationMenu />
        </div>
      )}
    </header>
  );
};

