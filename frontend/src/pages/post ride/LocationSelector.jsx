"use client";
import React, { useState, useRef, useEffect } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import { LocationPanel } from "../../components/user/postride/LocationPanel";
import MapComponent from "../../components/user/postride/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";

const LocationSelector = () => {
    const location = useLocation();
    const nav = useNavigate()
    const { postride, pickupdropoff } = location.state;
    const [locationname, setLocationname] = useState("")

    const [step, setStep] = useState("pickup");
    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const [dropoffCoordinates, setDropoffCoordinates] = useState(null);

    const latestMarker = useRef(null); // store latest clicked marker from map

    const [pickLong, pickLang] = pickupdropoff.pick_loc_coordinates;
    const [dropLong, dropLang] = pickupdropoff.drop_loc_coordinates;
    useEffect(() => {
        if (step === "pickup") {
            setLocationname(pickupdropoff.pick_loc);
        } else {
            setLocationname(pickupdropoff.drop_loc);
        }
    }, [step, pickupdropoff]);

    const initialPlace = step === "pickup"
        ? { latitude: pickLang, longitude: pickLong }
        : { latitude: dropLang, longitude: dropLong };

    const handleMapClick = (lat, lng) => {
        latestMarker.current = { lat, lng };
    };

    const handleSelectClick = () => {
        if (latestMarker.current) {
            if (step === "pickup") {
                setPickupCoordinates(latestMarker.current);
                setStep("dropoff");
            } else {
                setDropoffCoordinates(latestMarker.current);
                nav('/routeselector',{ state: { postride: postride, pickupdropoff : pickupdropoff,locationselected :{"Final_pickup": pickupCoordinates,"Final_dropoff":latestMarker.current} } })
            }
        } else {
            alert("Please select a location on the map.");
        }
    };

    return (
        <>
            <main className="flex flex-col md:h-screen bg-black">
                <Navigation />
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-6 w-full max-w-[1440px] px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center w-full max-w-lg md:w-1/2">
                        <LocationPanel step={step} onSelectClick={handleSelectClick} locationname={locationname} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <MapComponent
                            initialPlace={initialPlace}
                            onMapClick={handleMapClick}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default LocationSelector;
