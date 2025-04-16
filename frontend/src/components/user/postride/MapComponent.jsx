import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ initialPlace }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null); 

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
      center: [initialPlace.longitude, initialPlace.latitude],
      zoom: 15,
      maxBounds: [
        [-180, -85],
        [180, 85],
      ],
    });

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      console.log('Clicked Location:', lat, lng);
    });

    return () => mapRef.current.remove();
  }, [initialPlace]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '450px',
        overflow: 'hidden',
        borderRadius: '15px',
      }}
    />
  );
};

export default MapComponent;



