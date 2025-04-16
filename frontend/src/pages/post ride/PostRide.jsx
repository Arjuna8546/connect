"use client";
import React from "react";
import PostRideForm from "../../components/user/postride/PostRideForm";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import Aurora from "../../animation/Aurora/Aurora";


const PostRide = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="overflow-hidden relative mx-auto w-full max-w-none h-screen bg-black max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <Navigation />
        <Aurora
          colorStops={["#FFFFFF", "#555555", "#BFBDC1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        
        <PostRideForm />
      </main>
    </>
  );
};

export default PostRide;