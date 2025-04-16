import { useEffect, useState } from "react";

const FormInput = ({ label, showArrow = false, setLoc, value, suggestions = [], onChange, setSuggestions }) => {
  return (
    <div className="relative w-[329px]">
      <div className="flex justify-between items-center px-4 py-0 h-12 rounded-2xl bg-stone-950">
        <input
          type="text"
          placeholder={label}
          value={value}
          onChange={(e) => {
            setLoc(e.target.value);
            onChange?.(e);
          }}
          className="bg-transparent w-full text-xs font-bold text-white tracking-[2.1px] focus:outline-none placeholder:text-white"
        />
        {showArrow && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.81803 16.5962C9.62277 16.401 9.62277 16.0844 9.81803 15.8891L14.7678 10.9394C14.963 10.7441 15.2796 10.7441 15.4749 10.9394L16.182 11.6465C16.3773 11.8417 16.3773 12.1583 16.182 12.3536L11.2322 17.3033C11.037 17.4986 10.7204 17.4986 10.5251 17.3033L9.81803 16.5962Z"
              fill="white"
            />
            <path
              d="M15.4749 13.0385C15.2796 13.2338 14.963 13.2338 14.7678 13.0385L9.81804 8.08879C9.62277 7.89353 9.62277 7.57695 9.81804 7.38168L10.5251 6.67458C10.7204 6.47931 11.037 6.47931 11.2322 6.67458L16.182 11.6243C16.3773 11.8196 16.3773 12.1362 16.182 12.3314L15.4749 13.0385Z"
              fill="white"
            />
          </svg>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 z-20 min-w-[280px] max-h-[200px] overflow-y-auto bg-zinc-800 rounded-xl text-white text-xs font-medium shadow-2xl backdrop-blur-md border border-zinc-700 animate-fade-in">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer transition-all duration-150 ease-in-out"
              onClick={() => {
                setLoc(item);
                setSuggestions();
              }}
            >
              <svg
                className="text-green-400 w-4 h-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 12.414A4 4 0 1012 13.414l4.243 4.243a1 1 0 001.414-1.414z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormInput;
