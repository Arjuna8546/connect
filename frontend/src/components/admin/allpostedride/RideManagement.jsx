import RideCard from "./RideCard";

const RideManagement = ({ rides }) => {
      
  return (
    <main className="p-10 ml-64 max-md:ml-0 max-md:p-5">
      <h1 className="text-2xl font-bold text-stone-300 mb-8">RIDE MANAGEMENT</h1>

      <div className="flex flex-col gap-5">
        {rides.length > 0 ? (
          rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
        ) : (
          <div className="text-center text-stone-400 text-sm font-medium mt-10">
            No rides found.
          </div>
        )}
      </div>
    </main>
  );
};

export default RideManagement;
