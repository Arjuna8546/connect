import React from "react";
import { ArrowIcon, CloseIcon } from "../../user/homepage/Icons";

export const LocationPanel = () => {
    return (
        <section className="box-border px-8 py-12 rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 w-full max-w-[511px] mx-auto mb-5 max-md:w-[90%] max-md:px-6 max-md:py-8">
            <h2 className="mb-5 text-xl font-bold text-stone-300 text-center">
                WHERE WOULD YOU LIKE TO DROP OFF PASSENGER?
            </h2>

            <button className="mb-8 text-xs font-bold text-white uppercase rounded-3xl border-2 border-white border-solid h-[38px] w-[169px] mx-auto">
                why exact location?
            </button>

            <div className="box-border flex justify-between items-center px-5 py-0 mb-8 w-full rounded-2xl bg-stone-950 h-[75px]">
                <ArrowIcon />
                <span className="text-xs font-medium text-stone-300">
                    Ernakulam, kochi, kerala
                </span>
                <button aria-label="Clear location">
                    <CloseIcon />
                </button>
            </div>

            <button className="text-base font-bold text-black uppercase bg-white h-[62px] rounded-[30px] shadow-[0px_17px_33px_rgba(255,255,255,0.2)] w-full max-w-[436px] mx-auto">
                select
            </button>
        </section>

    );
};