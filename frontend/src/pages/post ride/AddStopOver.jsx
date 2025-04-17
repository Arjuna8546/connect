"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import Aurora from "../../animation/Aurora/Aurora";
import StopOverForm from "../../components/user/postride/StopOverForm";
import { useLocation } from "react-router-dom";


const AddStopOver = () => {
    const location = useLocation();
    const coordinates = location.state?.coordinates;
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="overflow-hidden relative mx-auto w-full max-w-none h-screen bg-black max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <Navigation />
        <StopOverForm coordinates={coordinates}/>
      </main>
    </>
  );
};

export default AddStopOver;