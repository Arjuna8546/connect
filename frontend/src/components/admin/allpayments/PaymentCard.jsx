const PaymentDetailCard = ({ payment }) => {
  const {
    amount,
    currency = "INR",
    success,
    created_at,
    stripe_payment_id,
    user = {},
    book = {},
  } = payment;

  const {
    from_loc_name,
    to_loc_name,
    ride_details = {},
    ride_owner = {},
  } = book;

  const rideDate = ride_details?.properties?.date || "N/A";
  const rideTime = ride_details?.properties?.time || "N/A";

  const statusStyles = {
    succeeded: "bg-green-100 text-green-800 border-green-400",
    failed: "bg-red-100 text-red-800 border-red-400",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-400",
    incomplete: "bg-gray-100 text-gray-800 border-gray-400",
  };

  const statusClass = statusStyles[success] || "bg-gray-100 text-gray-800 border-gray-300";

  return (
      <div className="w-full  bg-white rounded-2xl shadow-lg p-8 text-gray-800">

        {/* Payment Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Payment Status</p>
            <div className={`mt-1 inline-block px-4 py-1 rounded-full text-sm font-semibold border ${statusClass}`}>
              {success?.toUpperCase()}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Paid On</p>
            <p className="mt-1 font-semibold">
              {new Date(created_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Amount</p>
            <p className="mt-1 text-green-600 text-lg font-bold">
              ₹{parseFloat(amount).toFixed(2)} {currency}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Payment ID</p>
            <p className="mt-1 text-xs text-gray-500 font-mono break-all">{stripe_payment_id}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-6 border-t pt-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Paid By</p>
          <div className="flex items-center gap-4">
            <img
              src={user.profile_url || "/userAvatar.png"}
              alt={user.username}
              className="w-10 h-10 rounded-full border border-blue-400"
            />
            <div>
              <p className="text-blue-600 font-semibold">{user.username || "User"}</p>
              <p className="text-xs text-gray-500">Passenger</p>
            </div>
          </div>
        </div>

        {/* Ride Info */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Ride Information</p>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Route:</span>{" "}
              <span className="text-blue-500">{from_loc_name || "From"}</span> →
              <span className="text-green-500"> {to_loc_name || "To"}</span>
            </p>
            <p>
              <span className="font-medium">Ride Date:</span> {rideDate}
            </p>
            <p>
              <span className="font-medium">Ride Time:</span> {rideTime}
            </p>
            {ride_owner?.username && (
              <p>
                <span className="font-medium">Posted By:</span>{" "}
                <span className="text-orange-500">{ride_owner.username}</span>
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default PaymentDetailCard;


