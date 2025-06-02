"use client";
import React, { useState } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import { SearchBar } from "../../components/user/homepage/SearchBar";
import FilterPanel from "../../components/user/search ride/FilterPanel";
import RideList from "../../components/user/search ride/RideList";
import { search } from "../../Endpoints/APIs";
import { showError } from "../../utils/toastUtils";

const RideSearchPage = () => {
  const [filters, setFilters] = useState({
    gender: "",
    minPrice: 0,
    maxPrice: "",
    instantBooking: "",
  });

  const [rides, setRides] = useState([]);
  const [savedFormBody, setSavedFormBody] = useState({});
  const [loading, setLoading] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)

  const getPathParam = () => {
    return Object.entries(filters)
      .map(([key, value]) => `${key}=${value === "" ? "" : value}`)
      .join("&");
  };


  const handleSearch = async ({ formBody }) => {
    setLoading(true)
    const pathParam = getPathParam();
    setSavedFormBody(formBody);

    try {
      const res = await search(formBody, pathParam);
      if (res) {
        setRides(res?.data?.data || []);
      }
    } catch (err) {
      showError(err?.response?.data?.error)
    } finally {
      setLoading(false)
    }
  };


  const handleApply = async () => {
    const pathParam = getPathParam();
    if (Object.keys(savedFormBody).length > 0) {
      try {
        setFilterLoading(true);
        await handleSearch({ formBody: savedFormBody });
      } catch (error) {
        showError("Search failed:", error);
      } finally {
        setFilterLoading(false);
      }
    }
  };

  return (
    <div className="w-full px-8 min-h-screen bg-black text-white">

      <div className="w-full">
        <Navigation />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8">
        <SearchBar handleClick={handleSearch} loading={loading} />
      </div>
      <div className="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-8 gap-4 py-4">

        <div className="w-full lg:max-w-sm">
          <FilterPanel filters={filters} setFilters={setFilters} handleApply={handleApply} filterLoading={filterLoading} />
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
          <RideList rides={rides} />
        </div>
      </div>
    </div>
  );
};

export default RideSearchPage;

