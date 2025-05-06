export default function ApprovedRequestModal({ request = [], onClose, onApprove, onReject }) {
  console.log(request)
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center overflow-y-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
  
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Approved Ride Requests</h2>
  
          <div className="space-y-6">
            {request.map((req, idx) => (
              <div key={idx} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                {/* Route */}
                <div className="mb-2 text-gray-700">
                  <strong>Route:</strong> {req.from} → {req.to}
                </div>
  
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img src={req.user.profileImage} alt="Profile" className="w-14 h-14 rounded-full object-cover border" />
                  <div>
                    <p className="text-lg font-medium">{req.user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{req.user.gender}</p>
                  </div>
                </div>
  
                {/* Pickup and Price */}
                <div className="grid grid-cols-2 gap-4 text-gray-700 mb-4">
                  <div>
                    <strong>Pickup Time:</strong>
                    <p>{new Date(req.pickup_time).toLocaleString()}</p>
                  </div>
                  <div>
                    <strong>Price:</strong>
                    <p>₹{req.price}</p>
                  </div>
                </div>
  
                {/* Booked Seats */}
                <div>
                  <strong className="text-gray-800">Seats Booked:</strong>
                  <div className="mt-2 space-y-2">
                    {req.seat_segments.map((seg) => (
                      <div key={seg.id} className="flex justify-between items-center p-2 border rounded-md bg-white text-sm">
                        <div>Seat #{seg.seat_number}</div>
                        <div>{seg.from} → {seg.to}</div>
                        <div
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            seg.status === 'vacant' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {seg.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Approve / Reject Buttons */}
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    onClick={() => onReject(req.id)}
                  >
                    Reject
                  </button>
                  <button
                    className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                    onClick={() => onApprove(req.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  