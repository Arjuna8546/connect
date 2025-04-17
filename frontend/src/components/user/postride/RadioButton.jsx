"use client";
import React from "react";

const RadioButton = ({ selected = false }) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[18px] h-[18px] mr-[15px]"
    >
      <g filter="url(#filter0_di_radio)">
        <g clipPath="url(#clip0_radio)">
          <rect x="8" y="11" width="18" height="18" rx="9" fill="#0F0F0F" />
          <rect x="8" y="11" width="18" height="18" fill="#0E0E0E" />
        </g>
        <rect
          x="8.5"
          y="11.5"
          width="17"
          height="17"
          rx="8.5"
          stroke="url(#paint0_linear_radio)"
        />
      </g>
      <g filter="url(#filter2_d_radio)">
        <circle cx="17" cy="20" r="3" fill={selected ? "white" : "#161616"} />
      </g>
      <defs>
        <filter
          id="filter0_di_radio"
          x="0"
          y="0"
          width="34"
          height="34"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.03 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_radio"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_radio"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_radio"
          />
        </filter>
        <filter
          id="filter2_d_radio"
          x="10"
          y="17"
          width="14"
          height="14"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_radio"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_radio"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_radio"
          x1="17"
          y1="11"
          x2="17"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#232323" stopOpacity="0.56" />
          <stop offset="1" stopColor="#101010" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id="clip0_radio">
          <rect x="8" y="11" width="18" height="18" rx="9" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RadioButton;
