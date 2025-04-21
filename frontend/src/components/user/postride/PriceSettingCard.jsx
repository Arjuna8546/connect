import React, { useState } from "react";
import PriceControls from "./PriceControls";
import StopOverPriceModal from "./StopOverPriceModal";
import { useNavigate } from "react-router-dom";

const PriceSettingCard = ({ distancePrice, distances, state }) => {
    const [price, setPrice] = useState(distancePrice);
    const [open, setOpen] = useState(false);
    const [proportion, setProportion] = useState(1)

    const nav = useNavigate()

    const increment = () => {
        setProportion((prev) => parseFloat((prev + 0.05).toFixed(2)));
    };

    const decrement = () => {
        setProportion((prev) => (prev > 0.5 ? parseFloat((prev - 0.05).toFixed(2)) : prev));
    };

    const handleClick = () => {
        const start = state?.postride?.start_loc;
        const end = state?.postride?.destination_loc;

        const start_coordinates = state?.postride?.start_loc_coordinates;
        const end_coordinates = state?.postride?.destination_loc_coordinates;

        const priceBreakdown = [];

        distances.forEach((stop) => {
            const price = Math.ceil(stop.distance * 2 * proportion);
            priceBreakdown.push({
                start: start,
                stop: stop.stop,
                start_lat: start_coordinates[1],
                start_lon: start_coordinates[0],
                stop_lat: stop.lat,
                stop_lon: stop.lon,
                price: price,
            });
        });

        priceBreakdown.push({
            start: start,
            stop: end,
            start_lat: start_coordinates[1],
            start_lon: start_coordinates[0],
            stop_lat: end_coordinates[1],
            stop_lon: end_coordinates[0],
            price: Math.ceil(price * proportion),
        });

        nav('/postride/vehicles', { state: { ...state, stopover_prices: priceBreakdown } })
    }

    return (
        <div className="flex flex-col justify-center items-center rounded-3xl border border-solid backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 border-zinc-800 h-auto py-10 px-6 max-w-[546px] w-full">
            <h2 className="mb-5 text-xl font-bold text-stone-300">
                SET YOUR PRICE PER SEAT
            </h2>

            <div className="mb-2 text-5xl font-bold text-green-600">₹{Math.ceil(price * proportion)}</div>

            <PriceControls onIncrement={increment} onDecrement={decrement} />

            <p className="my-5 text-xs font-medium text-stone-300 text-center">
                Perfect price for this ride! You'll get passengers in no time
            </p>

            <div className="mb-5 h-px bg-zinc-800 w-[318px]" />

            <h3
                className="mb-1.5 text-xs font-medium text-stone-300 flex items-center cursor-pointer"
                onClick={() => setOpen(true)}
            >
                STOPOVER PRICES
                <svg
                    className="ml-1 w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </h3>

            <StopOverPriceModal
                open={open}
                onClose={() => setOpen(false)}
                distances={distances}
                startLocation={state?.postride?.start_loc}
                desLocation={state?.postride?.destination_loc}
                proportion={proportion}
                setProportion={setProportion}
            />
            <p className="mb-5 text-xs font-medium text-zinc-800">
                stop wise prices that u can edit
            </p>

            <button className="text-base font-bold text-black uppercase bg-white border border-solid shadow-2xl border-zinc-800 h-[62px] rounded-[30px] tracking-[3.15px] w-full max-w-[436px]"
                onClick={() => handleClick()}
            >
                continue
            </button>
        </div>
    );
};

export default PriceSettingCard;

