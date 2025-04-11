const VehicleSelector = ({ vehicles = [], onSelect }) => {
  return (
    <section className="flex flex-col items-center p-5 w-full bg-gradient-to-br">
      <div className="w-full max-w-[653px]">
        <div className="mt-6 space-y-6">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <label
                key={vehicle.id}
                className={`flex items-start gap-6 p-6 rounded-3xl transition-all duration-500 cursor-pointer relative
                backdrop-blur-xl backdrop-saturate-150
                ${vehicle.selected_vehicle
                    ? "bg-white/80 border-2 border-indigo-500 shadow-[0_0_35px_-5px_rgba(99,102,241,0.4)]"
                    : "bg-white/40 hover:bg-white/60 border-2 border-transparent hover:border-indigo-200"
                  }`}
              >
                {vehicle.selected_vehicle && (
                  <div className="absolute -top-3 -left-2 animate-fade-in">
                    <div className="bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-2 uppercase tracking-wider">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Selected
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <input
                    type="radio"
                    name="selectedVehicle"
                    value={vehicle.id}
                    checked={vehicle.selected_vehicle}
                    onChange={() => onSelect(vehicle.id)} 
                    className="sr-only peer"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300
        ${vehicle.selected_vehicle
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300 bg-transparent"
                      }`}
                  >
                    {vehicle.selected_vehicle && (
                      <svg
                        className="w-full h-full text-white p-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xs font-bold text-indigo-950/70 uppercase tracking-[2px]">
                        Type
                      </h3>
                      <p className="text-sm text-indigo-900 font-medium bg-indigo-50/50 px-3 py-1.5 rounded-lg">
                        {vehicle.vehicle_type}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xs font-bold text-indigo-950/70 uppercase tracking-[2px]">
                        Model
                      </h3>
                      <p className="text-sm text-indigo-900 font-medium bg-indigo-50/50 px-3 py-1.5 rounded-lg">
                        {vehicle.vehicle_model}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xs font-bold text-indigo-950/70 uppercase tracking-[2px]">
                        Color
                      </h3>
                      <p className="text-sm text-indigo-900 font-medium bg-indigo-50/50 px-3 py-1.5 rounded-lg">
                        {vehicle.vehicle_color}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-indigo-950/70 uppercase tracking-[2px]">
                      Registration
                    </h3>
                    <p className="text-sm text-indigo-900 font-medium bg-indigo-50/50 px-3 py-1.5 rounded-lg inline-block w-fit">
                      {vehicle.vehicle_register_no}
                    </p>
                  </div>

                  {vehicle.vehicle_bio && (
                    <div className="flex flex-col gap-2 pt-4 border-t border-indigo-100">
                      <h3 className="text-xs font-bold text-indigo-950/70 uppercase tracking-[2px]">
                        About Vehicle
                      </h3>
                      <p className="text-sm text-indigo-800/80 leading-relaxed bg-indigo-50/30 p-4 rounded-xl">
                        {vehicle.vehicle_bio}
                      </p>
                    </div>
                  )}
                </div>
              </label>
            ))
          ) : (
            <div className="text-center p-8 rounded-3xl bg-white/60 backdrop-blur-xl border-2 border-indigo-100">
              <div className="bg-indigo-50/50 rounded-xl p-6">
                <p className="text-indigo-900 font-bold uppercase tracking-[2px]">
                  No vehicles registered
                </p>
                <p className="text-sm text-indigo-600/80 mt-2">
                  Add your first vehicle to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VehicleSelector;
