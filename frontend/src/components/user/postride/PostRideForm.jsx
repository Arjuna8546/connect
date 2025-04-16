import React, { useCallback, useState } from "react";
import FormInput from "./FormInput";
import PassangerCount from "./PassangerCount";
import debounce from "lodash.debounce";
import { searchLocation } from "../../../Endpoints/MapBoxAPI";


const PostRideForm = () => {
  const [passengerCount,setPassengerCount] = useState(1)
  const [startLoc,setStartLoc] = useState("")
  const [destinationLoc,setDestinationLoc] = useState("")
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);

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

  const handleSubmit =() =>{
    console.log({"passanger_count":passengerCount,"start_loc":startLoc,"destination_loc":destinationLoc})
  }
  return (
    <section className="absolute top-60 p-5 w-96 rounded-3xl bg-zinc-800 bg-opacity-50 backdrop-blur-md shadow-2xl border border-zinc-700 h-[344px] left-[114px] max-md:left-2/4 max-md:-translate-x-2/4 max-sm:left-2/4 max-sm:-translate-x-2/4 max-sm:w-[90%]"
>
      <h2 className="mb-5 text-xl font-bold text-stone-300">POST RIDE</h2>
      <div className="flex flex-col gap-5">
      <FormInput
          label="starting from..."
          showArrow={true}
          value={startLoc}
          setLoc={setStartLoc}
          onChange={(e) => debouncedStartFetch(e.target.value)}
          suggestions={startSuggestions}
          setSuggestions ={()=>setStartSuggestions()}
        />
        <FormInput
          label="destination..."
          showArrow={true}
          value={destinationLoc}
          setLoc={setDestinationLoc}
          onChange={(e) => debouncedDestFetch(e.target.value)}
          suggestions={destSuggestions}
          setSuggestions ={()=>setDestSuggestions()}
        />
        <PassangerCount value={passengerCount} onChange={(e) => setPassengerCount(e.target.value)} />
        <button  onClick={handleSubmit} className="h-10 text-base font-bold leading-10 text-center text-black uppercase bg-white rounded-[30px] tracking-[3.15px] w-[328px]">
          publish ride
        </button>
      </div>
    </section>
  );
};

export default PostRideForm;