
import { useEffect, useState } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import VehicleSelector from "../../components/user/profilepage/VehicleSelector";
import { useLocation, useNavigate } from "react-router-dom";
import VehicleDetailModal from "../../components/user/profilepage/VehicleDetailModal";
import { useSelector } from "react-redux";
import { showError,showSuccess } from "../../utils/toastUtils";





const SelectVehicle = () => {

    const location = useLocation()
    const states = location?.state
    const nav = useNavigate()
    const [vehicleId, setVehicleId] = useState()
    const [isModelVehicleOpen, setIsModelVehicleOpen] = useState(false)

    const handleVehicleOpen = () => setIsModelVehicleOpen(true)
    const handleVehicleClose = () => setIsModelVehicleOpen(false)

    const user = useSelector((state) => state.user)

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        if (user?.vehicles) {
            setVehicles(user.vehicles);
            const selectedVehicle = user.vehicles.find((vehicle) => vehicle.selected_vehicle);
            if (selectedVehicle) {
                setVehicleId(selectedVehicle.id);
            }
        }
    }, [user])

    const getSelectedId = (id) => {
        const updatedVehicles = vehicles.map((vehicle) => ({
            ...vehicle,
            selected_vehicle: vehicle.id === id ? !vehicle.selected_vehicle : false,
        }));

        setVehicles(updatedVehicles);
        setVehicleId(id)
    };
    const handleClick = () => {
        if (!vehicleId) {
            showError("Please select a vehicle before publishing the ride.");
            return;
        }

        nav('/postride/publish', {
            state: {
                ...states,
                user_id: user?.user?.id,
                vehicle_id: vehicleId,
            },
        });
    };
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
            />
            <Navigation />
            <main className="flex justify-center items-center w-full min-h-[calc(100vh-104px)] px-4 py-6 bg-black">
                <div className="w-full max-w-3xl p-6 rounded-2xl shadow-lg bg-zinc-800 max-sm:p-4 flex flex-col gap-6 items-center">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-xl font-bold text-stone-200">
                            SELECT YOUR VEHICLE
                        </h2>
                        <button
                            onClick={() => handleVehicleOpen()}
                            className="bg-white text-black p-2 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                    </div>

                    <VehicleSelector vehicles={vehicles} onSelect={getSelectedId} />
                    {isModelVehicleOpen && (
                        <VehicleDetailModal
                            isOpen={isModelVehicleOpen}
                            onClose={handleVehicleClose}
                            user={user?.user}
                        />
                    )}

                    <button
                        className="text-base font-bold text-black uppercase bg-white border border-solid shadow-2xl border-zinc-800 h-[55px] rounded-[30px] w-[90%]"
                        onClick={() => handleClick()}
                    >
                        continue
                    </button>
                </div>
            </main>
        </>
    );
};

export default SelectVehicle;
