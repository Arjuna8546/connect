import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function LiveLocationModal({ isOpen, onClose, location }) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const defaultLocation = { latitude: 8.5241, longitude: 76.9366 };
  const safeLocation = location || defaultLocation;

  // Initialize map and marker when modal opens
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [safeLocation.longitude, safeLocation.latitude],
      zoom: 14,
    });

    markerRef.current = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([safeLocation.longitude, safeLocation.latitude])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, [isOpen]);

  // Update marker position when location updates
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !location) return;

    const { latitude, longitude } = location;
    markerRef.current.setLngLat([longitude, latitude]);
    mapRef.current.flyTo({
      center: [longitude, latitude],
      speed: 1,
    });
  }, [location]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-2xl  bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-11/12 max-w-2xl shadow-lg relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Live Ride Location</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl">×</button>
        </div>
        <div style={{ height: '400px' }} ref={mapContainerRef} className="rounded-b-lg" />
      </div>
    </div>
  );
}

