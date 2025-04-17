"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import PriceSettingCard from "../../components/user/postride/PriceSettingCard";


const PricePage = () => {
    const distance = "70 km"
    const distanceInt = parseInt(distance);
    const result = distanceInt * 5;
    const stopovers = [
        {
          name: "Ashtamichira (അഷ്ടമിച്ചിറ)",
          lat: 10.2714696,
          lon: 76.278656
        },
        {
          name: "Kodakara (കൊടകര)",
          lat: 10.3717111,
          lon: 76.3042007
        }
      ];
      
    


  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="flex flex-col justify-center mx-auto w-full max-w-none h-screen bg-black max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Navigation />
        <section className="flex justify-center items-center w-full h-[calc(100vh_-_104px)] max-sm:px-5 max-sm:py-0">
          <PriceSettingCard distancePrice={result}/>
        </section>
      </main>
    </>
  );
};

export default PricePage;
