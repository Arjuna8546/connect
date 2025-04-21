import React from "react";

const FilterOption = ({ label }) => {
  return (
    <div className="flex justify-between items-center px-5 py-2.5 rounded-2xl bg-neutral-900">
      <span className="text-xs font-bold text-white uppercase tracking-[2.1px]">
        {label}
      </span>
      <div>
        <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
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
    </div>
  );
};

export default FilterOption;