import React, { useCallback, useState } from "react";
import FormInput from "./FormInput";
import debounce from "lodash.debounce";
import { getCoordinatesFromPlaceName, searchLocation } from "../../../Endpoints/MapBoxAPI";
import { useNavigate } from "react-router-dom";
import { showError } from "../../../utils/toastUtils";


const PostRideForm = () => {
  const [startLoc, setStartLoc] = useState("")
  const [destinationLoc, setDestinationLoc] = useState("")
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);

  const nav = useNavigate()

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
    debounce((val) => fetchSuggestions(val, setStartSuggestions), 1000),
    []
  );

  const debouncedDestFetch = useCallback(
    debounce((val) => fetchSuggestions(val, setDestSuggestions), 1000),
    []
  );

  const handleSubmit = async () => {
    if (!startLoc?.trim() || !destinationLoc?.trim()) {
      showError("Please enter both start and destination locations.");
      return;
    }

    try {
      const start_loc_coordinates = await getCoordinatesFromPlaceName(startLoc);
      const destination_loc_coordinates = await getCoordinatesFromPlaceName(destinationLoc);

      if (!start_loc_coordinates || !destination_loc_coordinates) {
        showError("Unable to get coordinates for the given locations.");
        return;
      }

      nav('/postride/locationselector', {
        state: {
          postride: {
            start_loc: startLoc,
            destination_loc: destinationLoc,
            start_loc_coordinates,
            destination_loc_coordinates,
          },
        },
      });
    } catch (error) {
      showError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className=" absolute top-60 left-1/2 -translate-x-1/2 p-5 w-[384px] max-w-[90%] rounded-3xl bg-zinc-800 bg-opacity-50 backdrop-blur-md shadow-2xl border border-zinc-700 h-auto"
    >
      <h2 className="mb-5 text-xl font-bold text-stone-300 text-center">POST RIDE</h2>

      <div className="flex flex-col gap-5">
        <FormInput
          label="starting from..."
          showArrow={true}
          value={startLoc}
          setLoc={setStartLoc}
          onChange={(e) => debouncedStartFetch(e.target.value)}
          suggestions={startSuggestions}
          setSuggestions={() => setStartSuggestions()}
        />

        <FormInput
          label="destination..."
          showArrow={true}
          value={destinationLoc}
          setLoc={setDestinationLoc}
          onChange={(e) => debouncedDestFetch(e.target.value)}
          suggestions={destSuggestions}
          setSuggestions={() => setDestSuggestions()}
        />


        <button
          onClick={handleSubmit}
          className="h-10 text-base font-bold leading-10 text-center text-black uppercase bg-white rounded-[30px] tracking-[3.15px] w-full"
        >
          publish ride
        </button>
      </div>
    </section>

  );
};

export default PostRideForm;