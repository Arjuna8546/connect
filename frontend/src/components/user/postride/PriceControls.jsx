import React from "react";

const PriceControls = ({ onIncrement, onDecrement }) => {
  return (
    <div className="flex justify-center gap-32 mt-3 mb-1">
      <button
        onClick={onDecrement}
        className="flex justify-center items-center w-11 h-[43px] border-2 border-white rounded-full"
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M22.9706 17.3975C22.9706 17.6736 22.7468 17.8975 22.4707 17.8976L11.4707 17.9007C11.1946 17.9008 10.9706 17.677 10.9706 17.4009L10.9703 16.4009C10.9702 16.1247 11.194 15.9008 11.4701 15.9007L22.4701 15.8976C22.7463 15.8975 22.9702 16.1213 22.9703 16.3975L22.9706 17.3975Z"
            fill="white"
          />
        </svg>
      </button>

      <button
        onClick={onIncrement}
        className="flex justify-center items-center w-11 h-[43px] border-2 border-white rounded-full"
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M17.4688 10.8996C17.7449 10.8995 17.9688 11.1233 17.9689 11.3994L17.972 22.3994C17.9721 22.6756 17.7483 22.8995 17.4722 22.8996L16.4722 22.8998C16.196 22.8999 15.9721 22.6761 15.972 22.4L15.9689 11.4C15.9688 11.1238 16.1926 10.8999 16.4688 10.8998L17.4688 10.8996Z"
            fill="white"
          />
          <path
            d="M22.9706 17.3975C22.9706 17.6736 22.7468 17.8975 22.4707 17.8976L11.4707 17.9007C11.1946 17.9008 10.9706 17.677 10.9706 17.4009L10.9703 16.4009C10.9702 16.1247 11.194 15.9008 11.4701 15.9007L22.4701 15.8976C22.7463 15.8975 22.9702 16.1213 22.9703 16.3975L22.9706 17.3975Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default PriceControls;


