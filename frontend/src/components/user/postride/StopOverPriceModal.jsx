import React, { useState } from 'react';

const StopOverPriceModal = ({ open, onClose, distances, startLocation, desLocation, setProportion ,proportion }) => {

  if (!open) return null;

  const increment = () => setProportion(prev => parseFloat((prev + 0.05).toFixed(2)));
  const decrement = () => setProportion(prev => (prev > 0.5 ? parseFloat((prev - 0.05).toFixed(2)) : prev));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-wide uppercase text-black">
            Edit Your Recommended Price Per Seat
          </h2>
          <button onClick={onClose} aria-label="Close">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/aadabba814c24e21949a3d066a352728/8d4684076c0b49254fe2614c9bb7cd9bd6c06bce?placeholderIfAbsent=true"
              alt="Close"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Proportion Controls */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={decrement}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-lg"
          >
            −
          </button>
          <span className="font-bold text-lg">x{proportion}</span>
          <button
            onClick={increment}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-lg"
          >
            +
          </button>
        </div>

        {/* Stops */}
        <div className="mb-6">
          <StopItem name={startLocation} isStartOrEnd />
        </div>

        <div className="space-y-6">
          {[...distances]
            .sort((a, b) => a.distance - b.distance)
            .map((item, index) => (
              <StopItem key={index} item={item} proportion={proportion} />
            ))}
        </div>

        <div className="mt-6">
          <StopItem name={desLocation} isStartOrEnd />
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-black text-white px-8 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-gray-900 transition"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const StopItem = ({ item, name, isStartOrEnd = false, proportion = 1 }) => {
  const stopName = name || item?.stop;
  const distance = item?.distance;
  const price = Math.ceil((distance || 0) *2 * proportion);

  return (
    <div className="flex items-start gap-6">
      {/* Timeline Dot */}
      <div className="relative flex flex-col items-center">
        <div className="w-4 h-4 mx-8 rounded-full bg-zinc-300" />
      </div>

      {/* Stop Info */}
      <div className="flex-1">
        <h3 className="text-sm font-bold uppercase text-zinc-800 tracking-[2px]">{stopName}</h3>
        {distance && (
          <p className="text-xs text-gray-500 mt-1">Distance: {distance.toFixed(2)} km</p>
        )}
      </div>

      {/* Price */}
      {distance && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">₹{price}</span>
        </div>
      )}
    </div>
  );
};

export default StopOverPriceModal;
