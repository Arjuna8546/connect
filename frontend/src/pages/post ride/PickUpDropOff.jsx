"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import Aurora from "../../animation/Aurora/Aurora";
import PickupDropoffForm from "../../components/user/postride/PickupDropoffForm";
import { useLocation } from "react-router-dom";



const PickUpDropOff = () => {
  const location = useLocation();
  const postride = location.state?.postride;
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className=" overflow-hidden relative mx-auto w-full max-w-none h-screen bg-black max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <Navigation />
        <Aurora
          colorStops={["#FFFFFF", "#555555", "#BFBDC1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
          className="z-10"
        />
        
        <PickupDropoffForm postride={postride}/>
      </main>
    </>
  );
};

export default PickUpDropOff;