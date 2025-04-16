import React, { useCallback, useState } from "react";
import FormInput from "./FormInput";
import debounce from "lodash.debounce";
import { searchLocation } from "../../../Endpoints/MapBoxAPI";

const PickupDropoffForm = () => {
  const [pickLoc, setPickLoc] = useState("");
  const [dropLoc, setDropLoc] = useState("");
  const [pickSuggestions, setPickSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const fetchSuggestions = async (input, setFn) => {
    if (input.length < 3) return;
    try {
      const res = await searchLocation({ place: input });
      const places = res.data.features.map((f) => f.place_name);
      setFn(places);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedStartFetch = useCallback(
    debounce((val) => fetchSuggestions(val, setPickSuggestions), 1000),
    []
  );

  const debouncedDestFetch = useCallback(
    debounce((val) => fetchSuggestions(val, setDropSuggestions), 1000),
    []
  );

  const handleSubmit = () => {
    console.log({ start_loc: pickLoc, destination_loc: dropLoc });
  };

  return (
    <div className="absolute top-[15vh] md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-full px-4 flex flex-col items-center justify-center gap-5 max-h-[calc(100vh-150px)] overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-7 md:gap-5 w-full">
        {/* Pickup Section */}
        <section className="w-full max-w-md p-5 rounded-3xl bg-zinc-800 bg-opacity-50 backdrop-blur-md shadow-2xl border border-zinc-700  h-[250px] overflow-hidden">
          <h2 className="mb-5 text-xl font-bold text-stone-300">SELECT PICK UP SPOT</h2>
          <div className="flex flex-row gap-3 items-start">
            <div className="flex-1">
              <FormInput
                label="Pick up from..."
                showArrow={true}
                value={pickLoc}
                setLoc={setPickLoc}
                onChange={(e) => debouncedStartFetch(e.target.value)}
                suggestions={pickSuggestions}
                setSuggestions={() => setPickSuggestions()}
              />
            </div>
          </div>
        </section>

        {/* Dropoff Section */}
        <section className="w-full max-w-md p-5 rounded-3xl bg-zinc-800 bg-opacity-50 backdrop-blur-md shadow-2xl border border-zinc-700 h-[250px] overflow-hidden">
          <h2 className="mb-5 text-xl font-bold text-stone-300">SELECT DROP OFF SPOT</h2>
          <div className="flex flex-row gap-3 items-start">
            <div className="flex-1">
              <FormInput
                label="Drop off..."
                showArrow={true}
                value={dropLoc}
                setLoc={setDropLoc}
                onChange={(e) => debouncedDestFetch(e.target.value)}
                suggestions={dropSuggestions}
                setSuggestions={() => setDropSuggestions()}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Common Submit Button */}
      <button
        onClick={handleSubmit}
        className="h-10 px-6 text-sm font-bold leading-10 text-center text-black uppercase bg-white rounded-[30px] tracking-[1px] whitespace-nowrap min-w-[200px]"
      >
        SELECT PICKUP AND DROP OFF
      </button>
    </div>
  );
};

export default PickupDropoffForm;
