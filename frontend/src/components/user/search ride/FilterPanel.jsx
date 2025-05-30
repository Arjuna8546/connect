import React, { useState } from "react";
import FilterOption from "./FilterOption";

const FilterPanel = ({ filters, setFilters, handleApply, filterLoading }) => {

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filterOptions = [
    { key: "gender", label: "rider gender" },
    { key: "maxPrice", label: "max price" },
    { key: "minPrice", label: "min price" },
    { key: "instantBooking", label: "instant booking" },
  ];


  return (
    <div className="p-5 rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 w-full h-auto lg:max-w-sm">
      <div className="text-xl font-bold text-stone-300">Filter</div>
      <div className="flex flex-col gap-5 mt-5">
        {filterOptions.map(({ key, label }) => (
          <FilterOption
            key={key}
            label={label}
            value={filters[key]}
            onChange={(value) => handleChange(key, value)}
          />
        ))}
      </div>
      <button
        className="px-5 py-2.5 mt-5 text-xs font-bold text-black uppercase bg-white rounded-[30px] tracking-[2.52px] w-full hover:bg-gray-100 transition-colors"
        onClick={() => setFilters({ gender: "", minPrice: "", maxPrice: "", instantBooking: "" })}>
        Reset
      </button>

      <button
        onClick={handleApply}
        disabled={filterLoading}
        className={`px-5 py-2.5 mt-5 text-xs font-bold uppercase rounded-[30px] tracking-[2.52px] w-full transition-colors
    ${filterLoading
            ? "bg-zinc-400 text-white cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100 cursor-pointer"}`}
      >
        {filterLoading ? "Applying..." : "Apply"}
      </button>
    </div>
  );
};

export default FilterPanel;

