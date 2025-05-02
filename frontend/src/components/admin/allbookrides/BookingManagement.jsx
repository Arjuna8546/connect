import BookingsCard from "./BookingsCard";

const BookingManagement = ({ bookings }) => {

  return (
    <main className="p-10 ml-64 max-md:ml-0 max-md:p-5">
      <h1 className="text-2xl font-bold text-stone-300 mb-8">BOOKING MANAGEMENT</h1>

      <div className="flex flex-col gap-5">
        {bookings.length > 0 ? (
          bookings.map((book) => <BookingsCard key={book.id} booking={book} />)
        ) : (
          <div className="text-center text-stone-400 text-sm font-medium mt-10">
            No bookings found.
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingManagement;
