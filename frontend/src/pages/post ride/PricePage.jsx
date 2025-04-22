"use client";
import React, { useEffect, useState } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import PriceSettingCard from "../../components/user/postride/PriceSettingCard";
import { useLocation } from "react-router-dom";
import { getRouteDistanceFromStartToEnd } from "../../Endpoints/MapBoxAPI";



const PricePage = () => {

  const location = useLocation()
  const states = location?.state
  const [stopOverDistance,setStopOverDistance] = useState([])

  const distance = states?.route_selected?.route_distance
  const distanceInt = parseInt(distance);
  const result = distanceInt * 2;
  useEffect(() => {
    const fetchStopoverDistances = async () => {
      const startCoord = {
        lat: states?.postride?.start_loc_coordinates[1],
        lon: states?.postride?.start_loc_coordinates[0],
      };

      const routeCoordinates = states?.route_selected?.route_coordinate;
      const stopovers = states?.stopever?.Final_stopovers || [];

      const distances = [];

      for (let stop of stopovers) {
        const endCoord = {
          lat: stop.lat,
          lon: stop.lon,
        };

        const {distance,duration} = await getRouteDistanceFromStartToEnd(startCoord, endCoord, routeCoordinates);
        distances.push({ stop: stop.name,lat:stop.lat,lon:stop.lon, distance ,duration });
      }

      setStopOverDistance(distances)
    };

    fetchStopoverDistances();
  }, []);


  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="flex flex-col justify-center mx-auto w-full max-w-none h-screen bg-black max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Navigation />
        <section className="flex justify-center items-center w-full h-[calc(100vh_-_104px)] max-sm:px-5 max-sm:py-0">
          <PriceSettingCard distancePrice={result} distances={stopOverDistance} state={states}/>
        </section>
      </main>
    </>
  );
};

export default PricePage;
