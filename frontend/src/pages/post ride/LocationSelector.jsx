"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import { LocationPanel } from "../../components/user/postride/LocationPanel";
import MapComponent from "../../components/user/postride/MapComponent";

const LocationSelector = () => {
    const initialPlace = {
        latitude: 10.5270,
        longitude: 76.2144,

    };
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
                        <LocationPanel />
                    </div>

                    <div className="w-full md:w-1/2">
                        <MapComponent initialPlace={initialPlace} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default LocationSelector;
