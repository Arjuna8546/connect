import React from "react";
import RideCard from "./RideCard";

const RideList = () => {
  const rides = [
    {
      startTime: "19:00",
      endTime: "20:20",
      from: "ERNAKULAM",
      to: "THRISSUR",
      duration: "1h 20m",
      driver: "Aryan Kumar",
      gender: "Male",
      driverImage: "https://i.pravatar.cc/150?img=12",
      price: "150.00",
      status: "Requested",
    },
    {
      startTime: "20:00",
      endTime: "22:20",
      from: "ERNAKULAM",
      to: "THRISSUR",
      duration: "2h 20m",
      driver: "Aryan Kumar",
      gender: "Male",
      driverImage: "https://i.pravatar.cc/150?img=15",
      price: "90.00",
      status: "Instant",
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-5 max-md:p-2.5 max-sm:p-2.5">
      {rides.map((ride, index) => (
        <RideCard key={index} {...ride} />
      ))}
    </div>
  );
};

export default RideList;

