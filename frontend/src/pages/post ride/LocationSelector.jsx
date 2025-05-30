"use client";
import React, { useState, useRef, useEffect } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import { LocationPanel } from "../../components/user/postride/LocationPanel";
import MapComponent from "../../components/user/postride/MapComponent";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LocationSelector = () => {
    const location = useLocation();
    const nav = useNavigate()
    const { postride } = location.state;

    const [locationname, setLocationname] = useState("")

    const [step, setStep] = useState("pickup");
    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const [dropoffCoordinates, setDropoffCoordinates] = useState(null);

    const latestMarker = useRef(null);

    const [pickLong, pickLang] = postride.start_loc_coordinates;
    const [dropLong, dropLang] = postride.destination_loc_coordinates;
    useEffect(() => {
        if (step === "pickup") {
            setLocationname(postride.start_loc);
        } else {
            setLocationname(postride.destination_loc);
        }
    }, [step, postride]);

    const initialPlace = step === "pickup"
        ? { latitude: pickLang, longitude: pickLong }
        : { latitude: dropLang, longitude: dropLong };

    const handleMapClick = (lat, lng) => {
        latestMarker.current = { lat, lng };
    };

    const handleSelectClick = () => {
        if (!latestMarker.current) {
            toast.error("Please select a location on the map.For Pickup Exact Point");
            return;
        }

        if (step === "pickup") {
            setPickupCoordinates(latestMarker.current);
            setStep("dropoff");
        } else {
            const isSameAsPickup =
                pickupCoordinates &&
                pickupCoordinates.lat === latestMarker.current.lat &&
                pickupCoordinates.lng === latestMarker.current.lng;

            if (isSameAsPickup) {
                toast.error("Please select a location on the map.For Drop off Exact Point");
                return;
            }

            setDropoffCoordinates(latestMarker.current);
            nav("/postride/routeselector", {
                state: {
                    postride: postride,
                    locationselected: {
                        Final_pickup: pickupCoordinates,
                        Final_dropoff: latestMarker.current,
                    },
                },
            });
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
