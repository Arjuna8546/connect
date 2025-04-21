import React from "react";
import FilterOption from "./FilterOption";

const FilterPanel = () => {
  const filterOptions = [
    "vehicle type",
    "rider gender",
    "max price",
    "min price",
    "instant booking",
  ];

  return (
    <div className="p-5 rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 w-full h-auto lg:max-w-sm">
      <div className="text-xl font-bold text-stone-300">Filter</div>
      <div className="flex flex-col gap-5 mt-5">
        {filterOptions.map((option, index) => (
          <FilterOption key={index} label={option} />
        ))}
      </div>
      <button className="px-5 py-2.5 mt-5 text-xs font-bold text-black uppercase bg-white rounded-[30px] tracking-[2.52px] w-full hover:bg-gray-100 transition-colors">
        Apply
      </button>
    </div>
  );
};

export default FilterPanel;
 