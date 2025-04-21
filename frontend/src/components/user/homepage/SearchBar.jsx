import { useCallback, useState } from "react";
import { CalendarIcon, UserIcon } from "./Icons";
import { searchLocation } from "../../../Endpoints/MapBoxAPI";
import debounce from "lodash.debounce";

export const SearchBar = () => {
    const [selectedDate, setSelectedDate] = useState("")
    const [num, setNum] = useState(1)
    const [startPoint,setStartPoint] = useState("")
    const [endPoint,setEndPoint] = useState("")
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


    return (
        <div className="relative flex gap-4 justify-center px-6 py-5 max-md:flex-wrap max-sm:px-2.5">
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 21.3334C14.5855 21.3334 13.229 20.7715 12.2288 19.7713C11.2286 18.7711 10.6667 17.4146 10.6667 16.0001C10.6667 14.5856 11.2286 13.229 12.2288 12.2288C13.229 11.2287 14.5855 10.6667 16 10.6667C17.4145 10.6667 18.771 11.2287 19.7712 12.2288C20.7714 13.229 21.3333 14.5856 21.3333 16.0001C21.3333 17.4146 20.7714 18.7711 19.7712 19.7713C18.771 20.7715 17.4145 21.3334 16 21.3334Z"
                        fill="#16DB95"
                        fillOpacity="0.666667"
                    />
                </svg>
                <input
                    type="text"
                    value={startPoint}
                    placeholder="Leaving from..."
                    onChange={(e) => {
                        setStartPoint(e.target.value)
                        debouncedStartFetch(e.target.value)
                    }}
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
                {
                    startSuggestions.length > 0 && (
                        <ul className="absolute top-20  mt-1 z-40 min-w-[280px] max-h-[200px] overflow-y-auto bg-zinc-800 rounded-xl text-white text-xs font-medium shadow-2xl backdrop-blur-md border border-zinc-700 animate-fade-in">
                            {startSuggestions.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer transition-all duration-150 ease-in-out"
                                    onClick={() => {
                                        setStartPoint(item);
                                        setStartSuggestions([]);
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
                    )
                }
            </div>

            {/* Going to */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 21.3334C14.5855 21.3334 13.229 20.7715 12.2288 19.7713C11.2286 18.7711 10.6667 17.4146 10.6667 16.0001C10.6667 14.5856 11.2286 13.229 12.2288 12.2288C13.229 11.2287 14.5855 10.6667 16 10.6667C17.4145 10.6667 18.7711 11.2287 19.7713 12.2288C20.7715 13.229 21.3334 14.5856 21.3334 16.0001C21.3334 17.4146 20.7715 18.7711 19.7713 19.7713C18.7711 20.7715 17.4145 21.3334 16 21.3334Z"
                        fill="#D1D1D1"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Going to..."
                    value={endPoint}
                    onChange={(e) => {
                        setEndPoint(e.target.value)
                        debouncedDestFetch(e.target.value)
                    }}
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
                {
                    destSuggestions.length > 0 && (
                        <ul className="absolute top-36 md:top-20 mt-1 z-20 min-w-[280px] max-h-[200px] overflow-y-auto bg-zinc-800 rounded-xl text-white text-xs font-medium shadow-2xl backdrop-blur-md border border-zinc-700 animate-fade-in">
                            {destSuggestions.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer transition-all duration-150 ease-in-out"
                                    onClick={() => {
                                        setEndPoint(item);
                                        setDestSuggestions([]);
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
                    )
                }
            </div>

            {/* Select date */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <CalendarIcon className="text-white" />
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            {/* Number of travelers */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <UserIcon className="text-white" />
                <input
                    type="number"
                    value={num}
                    placeholder="No. of travelers"
                    min="1"
                    onChange={(e) => setNum(e.target.value)}
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            <button onClick={() => console.log(startPoint,endPoint)} className="w-44 text-base font-bold text-black uppercase bg-white shadow-2xl h-[76px] rounded-[48px] tracking-[3.15px] max-md:w-full">
                search
            </button>
        </div>
    );
};
