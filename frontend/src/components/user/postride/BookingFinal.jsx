"use client";
import { useState } from "react";
import { ridepost } from "../../../Endpoints/APIs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const BookingFinal = ({ state }) => {
  const nav = useNavigate()
  const [instantBooking, setInstantBooking] = useState(false);
  const [reviewRequests, setReviewRequests] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false)

  const handleInstantBookingChange = () => {
    setInstantBooking(true);
    setReviewRequests(false);
  };

  const handleReviewRequestsChange = () => {
    setReviewRequests(true);
    setInstantBooking(false);
  };

  const handleSubmit = () => {
    const input_data = state;
    let stopovers = [];

    input_data["stopever"]["Final_stopovers"].forEach((stop, idx) => {

      const stopoverPrice = input_data["stopover_prices"].find(price =>
        price["start"] === input_data["postride"]["start_loc"] &&
        price["stop"] === stop["name"]
      );

      const duration = stopoverPrice ? stopoverPrice["duration"] : '0 hr';
      const distance = stopoverPrice ? `${stopoverPrice["distance"]} km` : '0';

      stopovers.push({
        "stop": stop["name"],
        "stop_location": {
          "type": "Point",
          "coordinates": [stop["lon"], stop["lat"]]
        },
        "price": stopoverPrice ? stopoverPrice["price"] : 0,
        "position": idx + 1,
        "duration": duration,
        "distance": distance,
      });
    });
    stopovers.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    stopovers.forEach((stop, index) => {
      stop.position = index + 1;
    });

    const finalPrice = input_data["stopover_prices"].at(-1)?.price ?? 0;
    const payload = {
      "user": input_data["user_id"],
      "vehicle": input_data["vehicle_id"],
      "start_location": {
        "type": "Point",
        "coordinates": input_data["postride"]["start_loc_coordinates"]
      },
      "start_location_name": input_data["postride"]["start_loc"],
      "destination_location": {
        "type": "Point",
        "coordinates": input_data["postride"]["destination_loc_coordinates"]
      },
      "destination_location_name": input_data["postride"]["destination_loc"],
      "pick_up_location": {
        "type": "Point",
        "coordinates": [
          input_data["locationselected"]["Final_pickup"]["lng"],
          input_data["locationselected"]["Final_pickup"]["lat"]
        ]
      },
      "drop_off_location": {
        "type": "Point",
        "coordinates": [
          input_data["locationselected"]["Final_dropoff"]["lng"],
          input_data["locationselected"]["Final_dropoff"]["lat"]
        ]
      },
      "date": input_data["date_time"]["date"],
      "time": input_data["date_time"]["time"] + ":00",
      "route": {
        "type": "LineString",
        "coordinates": input_data["route_selected"]["route_coordinate"]
      },
      "route_distance": input_data["route_selected"]["route_distance"],
      "duration": input_data["route_selected"]["duration"],
      "passenger_count": input_data["passanger_count"],
      "instant_booking": instantBooking,
      "additional_info": additionalInfo,
      "stopovers": stopovers,
      "price": finalPrice,
    };

    const handleAddPost = async (payload) => {
      setLoading(true)
      try {
        const res = await ridepost(payload)
        if (res.data.success === true) {
          toast.success(res.data.message)
          nav('/')
        }
      }
      catch (error) {
        const resData = error?.response?.data;

        if (resData?.errors) {
          const firstErrorKey = Object.keys(resData.errors)[0];
          const firstErrorMsg = resData.errors[firstErrorKey][0];
          toast.error(firstErrorMsg);
        } else if (resData?.error) {
          toast.error(resData.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      finally {
        setLoading(false)
      }
    }
    handleAddPost(payload);
  };

  return (
    <section className="flex flex-col gap-5 items-center p-5 rounded-3xl border border-solid backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 border-zinc-800 w-[546px] max-md:w-[90%] max-sm:w-full">
      <div className="w-full px-2 flex flex-col items-start text-left">
        <p className="text-xl uppercase  font-bold text-stone-300">
          Get more passengers
        </p>
        <p className="text-xs font-medium text-zinc-800">
          They prefer to get an instant answer
        </p>
      </div>

      <label className="w-full px-2 flex gap-2.5 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={instantBooking}
          onChange={handleInstantBookingChange}
          className="w-5 h-[18px] rounded-md border border-solid bg-neutral-950 border-zinc-500"
        />
        <span className="text-xl font-bold text-sky-700">
          Enable Instant Booking
        </span>
      </label>

      <hr className="h-px bg-zinc-800 w-[90%]" />

      <label className="w-full px-2 flex gap-2.5 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={reviewRequests}
          onChange={handleReviewRequestsChange}
          className="w-5 h-[18px] bg-white rounded-md border border-solid border-zinc-500"
        />
        <span className="text-xl font-bold text-sky-700">
          Review every request before it expires
        </span>
      </label>

      <label className="w-full px-2 text-lg font-bold text-stone-300">
        Anything to add about your ride?
      </label>

      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Flexible about where and when to meet? Not taking motorway? Got limited space in your boot?"
        className="box-border p-2.5 text-xs font-medium leading-5 rounded-2xl bg-stone-950 text-zinc-500 w-[90%] h-[108px]"
      />

      <button
        className={`text-base font-bold uppercase h-[55px] rounded-[30px] w-[90%] border border-solid shadow-2xl 
        ${loading ? "bg-zinc-400 text-white cursor-not-allowed" : "bg-white text-black border-zinc-800"}`}
        onClick={() => handleSubmit()}
        disabled={loading}
      >
        {loading ? "Posting Ride..." : "Post Ride"}
      </button>
    </section>
  );
};
