"use client";

import { Navigation } from "../../components/user/othercomponent/Navigation";
import RideList from "../../components/user/your_rides/RideList";





const YourRidePage = () => {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <Navigation />
      <main className=" h-full bg-black ">
        
        <RideList/>
      </main>
    </>
  );
};

export default YourRidePage;