import React from 'react';

const StopoversTimeline = ({ stopovers }) => {
  if (!stopovers || stopovers.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-[#D6BCFA] mb-4">Stopovers</h3>
      <div className="relative ml-4">
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#9b87f5]" />
        {stopovers.map((s, index) => (
          <div key={index} className="mb-8 ml-6 relative">
            <div className="absolute w-4 h-4 bg-[#9b87f5] rounded-full -left-6 top-1.5 border-2 border-[#1a1a1a]" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="text-sm font-semibold text-white mb-1 sm:mb-0">
                #{s.position} &nbsp;|&nbsp; {s.stop}
              </div>
              <div className="text-[#9b87f5] font-medium text-sm">₹ {s.price}</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Lat: {s.stop_location.coordinates[1]} | Lng: {s.stop_location.coordinates[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StopoversTimeline;
