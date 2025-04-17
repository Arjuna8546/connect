import React from "react";

const CityList = () => {
  const cities = [
    "Ernakulam,kochi,kerala",
    "Ernakulam,kochi,kerala",
    "ERNAKULAM SOUTH RAILWAY STATION",
    "Ernakulam Town North Railway Station",
    "Ernakulam Junction South Railway Station",
  ];

  return (
    <ul className="flex flex-col gap-1.5 p-2.5 rounded-xl backdrop-blur-[7.5px] bg-white bg-opacity-10 h-[187px] w-[397px] max-md:w-[90%] max-sm:w-[95%]">
      {cities.map((city, index) => (
        <li
          key={index}
          className="p-2.5 text-xs font-medium rounded-md text-stone-300"
        >
          {city}
        </li>
      ))}
    </ul>
  );
};

export default CityList;