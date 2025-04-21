"use client";
import React, { useEffect, useState } from "react";
import RouteOption from "./RouteOption";
import { useNavigate } from "react-router-dom";

const RouteOptionSelector = ({ routes ,state }) => {
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [finalRoute, setFinalRoute] = useState({})

    const nav = useNavigate()

    const handleClick = (index) => {
        const selected = formattedRoutes[index];
        setFinalRoute({"route":selected.route,"coordinates":selected.coordinates,"distance":selected.distance ,"duration":selected.duration});
        setSelectedRoute(index)
    }

    const handleSubmit = ()=>{
        nav('/postride/stopover',{ state: { ...state,route_selected: {route_coordinate:finalRoute.coordinates,route_distance:finalRoute.distance,duration:finalRoute.duration} } })
    }

    const formattedRoutes = routes.map((route) => {
        return {
            duration: `${Math.floor(route.duration / 3600)} hr ${Math.round((route.duration % 3600) / 60)} min`,
            distance: `${(route.distance / 1000).toFixed(0)} km`,
            route: route.legs[0].summary,
            coordinates: route.geometry.coordinates
        };
    });

    useEffect(() => {
        const selected = formattedRoutes[0];
        if (selected){
            setFinalRoute({ "route": selected?.route, "coordinates": selected.coordinates,"distance":selected.distance,"duration":selected.duration });
        }
      }, [routes]);


    return (
        <section className="px-9 py-14 rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 h-[536px] w-[511px] max-md:w-full max-md:max-w-[500px] max-sm:w-full max-sm:max-w-[400px]">
            <h2 className="mb-5 text-xl font-bold text-stone-300">
                WHAT IS YOUR EXACT ROUTE ?
            </h2>

            {formattedRoutes.map((route, index) => (
                <RouteOption
                    key={index}
                    duration={route.duration}
                    distance={route.distance}
                    route={route.route}
                    selected={selectedRoute === index}
                    onClick={() => handleClick(index)}
                />
            ))}

            <button onClick={()=>handleSubmit() } className="mt-5 text-base font-bold text-center text-black uppercase bg-white h-[62px] leading-[62px] rounded-[30px] shadow-[0_17px_33px_rgba(255,255,255,0.2)] w-[436px] max-w-full">
                continue
            </button>
        </section>
    );
};

export default RouteOptionSelector;
