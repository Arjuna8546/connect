"use client";
import React, { useState } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import RouteOptionSelector from "../../components/user/postride/RouteOptionSelector";
import RouteMap from "../../components/user/postride/RouteMap";
import { useLocation } from "react-router-dom";


const RouteSelector = () => {
    const location = useLocation()
    const states = location?.state
    const start = states.postride.start_loc_coordinates; 
    const end = states.postride.destination_loc_coordinates;   

    const [routeData,setRouteData] = useState([])
    
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@500;700&display=swap"
                rel="stylesheet"
            />


            <main className="flex flex-col md:h-screen bg-black">
                <Navigation />
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-6 w-full max-w-[1440px] px-4 md:px-6 lg:px-8">

                    <div className="flex flex-col items-center justify-center w-full max-w-lg md:w-1/2">
                        <RouteOptionSelector routes={routeData} state={states}/>
                    </div>

                    <div className="w-full md:w-1/2">
                        <RouteMap start={start} end={end} setRouteData={setRouteData}/>
                    </div>
                </div>
            </main>
        </>
    );
};

export default RouteSelector;