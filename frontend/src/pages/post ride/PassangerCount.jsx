"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import PeopleCount from "../../components/user/postride/PeopleCount";



const PassangerCount = () => {

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Ubuntu:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen bg-black flex flex-col">
        <Navigation />
        <div className="flex flex-1 justify-center items-center px-4">
          <PeopleCount />
        </div>
      </main>

    </>
  );
};

export default PassangerCount;