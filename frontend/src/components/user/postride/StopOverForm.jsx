"use client";
import React, { useEffect, useState } from "react";
import CitySelector from "./CitySelector";
import { getPlacesAlongRoute } from "../../../Endpoints/MapBoxAPI";
import { useNavigate } from "react-router-dom";

const StopOverForm = ({ coordinates ,state }) => {
    const [cities, setCities] = useState([]);
    const [placesData, setPlacesData] = useState([]);
    const [stopovers, setStopovers] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const nav = useNavigate()

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await getPlacesAlongRoute(coordinates);

            const cities = places.map((place) => {
                const name = place.tags.name || "";
                return {
                    name: name,
                    lat: place.lat,
                    lon: place.lon,
                };
            });

            setPlacesData(cities);
            setCities(cities.map(c => c.name));
        };

        if (coordinates?.length) {
            fetchPlaces();
        }
    }, [coordinates]);

    const handleAddStopover = () => {
        const selected = placesData.find((place) => place.name === selectedCity);
        if (selected && !stopovers.some((s) => s.name === selected.name)) {
            setStopovers([...stopovers, selected]);
        }
        setSelectedCity("");
    };

    const handleRemove = (cityToRemove) => {
        setStopovers(stopovers.filter((city) => city.name !== cityToRemove.name));
    };

    return (
        <section
            className="mx-auto mt-10 flex flex-col gap-5 justify-center items-center 
            rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 
            h-auto w-[511px] p-8 
            max-md:w-[90%] max-sm:w-[95%]"
        >
            <h2 className="text-xl font-bold text-stone-300 text-center">
                ADD STOPOVER TO GET MORE PASSENGER
            </h2>

            <CitySelector
                cities={cities}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
            />

            <button
                type="button"
                onClick={handleAddStopover}
                className="text-sm font-semibold text-white border border-white rounded-full px-6 py-2 uppercase tracking-wide"
            >
                Add Stopover
            </button>

            <div className="w-full max-w-[436px] flex flex-col gap-2 mt-4">
                {stopovers.map((stop, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center px-4 py-3 rounded-xl 
                 bg-white bg-opacity-10 backdrop-blur-sm border border-white/20"
                    >
                        <div>
                            <span className="text-sm font-medium ">{stop.name}</span>
                        </div>
                        <button
                            onClick={() => handleRemove(stop)}
                            className=" hover:text-red-400 font-bold text-xl"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                className="mt-5 text-base font-bold text-black uppercase bg-white shadow-2xl 
                h-[62px] rounded-[30px] tracking-[3.15px] w-full max-w-[436px]"
                onClick={() => {
                    nav('/postride/datetime',{state:{...state,stopever:{"Final_stopovers": stopovers}}})
                }}
            >
                Continue
            </button>
        </section>
    );
};

export default StopOverForm;

