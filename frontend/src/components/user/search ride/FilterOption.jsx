import React, { useState } from "react";

const FilterOption = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderOptions = () => {
    switch (label) {
      case "rider gender":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full mt-2 px-3 py-2 rounded bg-zinc-800 text-white text-sm"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        );
      case "max price":
      case "min price":
        return (
          <input
            type="number"
            value={value}
            min="0"
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${label}`}
            className="w-full mt-2 px-3 py-2 rounded bg-zinc-800 text-white text-sm"
          />
        );
      case "instant booking":
        return (
          <label className="flex items-center gap-2 mt-2 text-white text-sm">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked ? true : "")}
            />
            Enable Instant Booking
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col px-5 py-2.5 rounded-2xl bg-neutral-900">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-bold text-white uppercase tracking-[2.1px]">
          {label}
        </span>
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M7.40389 10.9768C7.59916 10.7712 7.91574 10.7712 8.111 10.9768L13.0607 16.1893C13.256 16.3949 13.256 16.7283 13.0607 16.9339L12.3536 17.6785C12.1584 17.8842 11.8418 17.8842 11.6465 17.6785L6.69679 12.4661C6.50152 12.2605 6.50152 11.9271 6.69679 11.7214L7.40389 10.9768Z"
            fill="white"
          />
          <path
            d="M10.9616 16.934C10.7663 16.7283 10.7663 16.395 10.9616 16.1893L15.9113 10.9769C16.1066 10.7712 16.4232 10.7712 16.6184 10.9769L17.3255 11.7215C17.5208 11.9271 17.5208 12.2605 17.3255 12.4661L12.3758 17.6786C12.1805 17.8842 11.864 17.8842 11.6687 17.6786L10.9616 16.934Z"
            fill="white"
          />
        </svg>
      </div>
      {isOpen && <div className="mt-2">{renderOptions()}</div>}
    </div>
  );
};

export default FilterOption;
