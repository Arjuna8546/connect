import React from "react";

const CitySelector = ({ cities = [], selectedCity, onSelectCity }) => {
  const [showList, setShowList] = React.useState(false);

  const handleSelectCity = (city) => {
    onSelectCity(city); // Notify parent
    setShowList(false); // Close dropdown
  };

  return (
    <div className="relative w-[438px] max-md:w-full">
      {/* Input */}
      <div
        className="flex items-center rounded-2xl bg-stone-950 h-[75px] w-full px-4 cursor-pointer"
        onClick={() => setShowList((prev) => !prev)}
      >
        <input
          type="text"
          value={selectedCity}
          readOnly
          placeholder="Add City"
          className="w-full bg-transparent text-white placeholder-white text-xs font-bold uppercase tracking-[2.1px] outline-none"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent div toggle
            setShowList((prev) => !prev);
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: showList ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="M7 10l5 5 5-5H7z" fill="white" />
          </svg>
        </button>
      </div>

      {/* Dropdown List */}
      {showList && (
        <ul className="absolute z-10 top-[80px] left-0 flex flex-col gap-1.5 p-2.5 rounded-xl backdrop-blur-[7.5px] bg-white bg-opacity-10 h-[187px] w-full overflow-y-auto">
          {cities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city)}
              className="p-2.5 text-xs font-medium rounded-md text-stone-500 hover:bg-white hover:bg-opacity-20 cursor-pointer transition"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;

