const PassangerCount = ({ value, onChange, min = 1, max = 10 }) => {
    const handleDecrease = () => {
      const newValue = Math.max(min, Number(value) - 1);
      onChange({ target: { value: newValue } });
    };
  
    const handleIncrease = () => {
      const newValue = Math.min(max, Number(value) + 1);
      onChange({ target: { value: newValue } });
    };
  
    return (
        <div className="flex items-center justify-between px-4 py-0 h-12 rounded-2xl bg-stone-950 w-[329px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="min-w-[24px]"
        >
          <path
            d="M15 12C17.55 12 19.59 9.975 19.59 7.5C19.59 5.025 17.55 3 15 3C12.45 3 10.41 5.025 10.41 7.5C10.41 9.975 12.45 12 15 12ZM15 15C10.8 15 7.41 11.64 7.41 7.5C7.41 3.36 10.8 0 15 0C19.2 0 22.59 3.36 22.59 7.5C22.59 11.64 19.2 15 15 15ZM4.5 27H25.5V25.005C25.5 22.38 22.035 19.665 15 19.665C7.965 19.665 4.5 22.38 4.5 25.005V27ZM15 16.665C24.99 16.665 28.5 21.66 28.5 25.005V30H1.5V25.005C1.5 21.66 5.01 16.665 15 16.665Z"
            fill="#D1D1D1"
          />
        </svg>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrease}
            className="text-white text-xl font-bold px-2 focus:outline-none"
          >
            –
          </button>
  
          <input
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className="bg-transparent text-center text-sm font-bold text-white uppercase tracking-[2.1px] focus:outline-none w-[60px] placeholder-white"
            placeholder="Passengers"
          />
  
          <button
            type="button"
            onClick={handleIncrease}
            className="text-white text-xl font-bold px-2 focus:outline-none"
          >
            +
          </button>
        </div>
      </div>
    );
  };
  
  export default PassangerCount;
  