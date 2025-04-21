"use client";
import React from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import { SearchBar } from "../../components/user/homepage/SearchBar";
import FilterPanel from "../../components/user/search ride/FilterPanel";
import RideList from "../../components/user/search ride/RideList";

const RideSearchPage = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">

      <div className="w-full">
        <Navigation />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8">
        <SearchBar />
      </div>
      <div className="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-8 gap-4 py-4">

        <div className="w-full lg:max-w-sm">
          <FilterPanel />
        </div>


        <div
          className="flex-1"
          style={{
            maxHeight: '70vh',
            overflowY: 'auto',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
          }}
        >
          <RideList />
        </div>
      </div>
    </div>
  );
};

export default RideSearchPage;

