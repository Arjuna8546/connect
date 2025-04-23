"use client";

import BookedRidelist from "../../components/user/booked rides/BookedRidelist";
import { Navigation } from "../../components/user/othercomponent/Navigation";





const BookedRide = () => {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <Navigation />
      <main className="h-screen  bg-black ">
        
        <BookedRidelist/>
      </main>
    </>
  );
};

export default BookedRide;