import React, { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { getrides } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";

export default function RideList() {
  const user = useSelector((state) => state.user)
  const [rides, setRides] = useState()
  useEffect(() => {
    const handleEffect = async (id) => {
      try {
        const res = await getrides(id)
        if (res?.data?.success === true) {
          setRides(res?.data?.rides)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    handleEffect(user?.user?.id)
  }, [user?.user?.id])

  const handleBookRequest = (id)=>{
    console.log(id)
  }

  return (
    <section className="px-20 py-12 max-md:p-10 max-sm:p-5">
      <h2 className="mb-5 text-2xl font-bold text-white">YOUR RIDES</h2>

      {rides && rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} {...ride} handleBookRequest={handleBookRequest}/>
        ))
      ) : (
        <p className="text-white">No rides posted yet.</p>
      )}
    </section>
  );
}
