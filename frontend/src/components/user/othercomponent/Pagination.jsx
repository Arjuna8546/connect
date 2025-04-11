import React from "react";

function Pagination({ total, current, setPage }) {
  return (
    <div className="flex items-center justify-center space-x-6 bg-black p-4 rounded-lg">
      <button
        onClick={() => setPage(current - 1)}
        disabled={current === 1}
        className={`px-6 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium
          ${
            current === 1
              ? "border-gray-800 text-gray-700 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
      >
        Previous
      </button>
      <span className="text-white font-medium px-4 py-2 bg-black rounded-lg border border-gray-800">
        {current} / {total}
      </span>
      <button
        onClick={() => setPage(current + 1)}
        disabled={current === total}
        className={`px-6 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium
          ${
            current === total
              ? "border-gray-800 text-gray-700 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;