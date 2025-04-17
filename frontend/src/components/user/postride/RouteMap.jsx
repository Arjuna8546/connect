import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getroutes } from '../../../Endpoints/MapBoxAPI'; // this must return fetch()

function RouteMap({start,end,setRouteData}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: start,
      zoom: 8,
    });

    map.on('load', async () => {
      try {
        const response = await getroutes(start, end, mapboxgl.accessToken); 
        const data = response.data;
        setRouteData(data?.routes)
        data.routes.forEach((route, index) => {
          map.addSource(`route-${index}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route.geometry,
            },
          });

          map.addLayer({
            id: `route-${index}`,
            type: 'line',
            source: `route-${index}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': index === 0 ? '#ff0000' : '#00bfff',
              'line-width': 4,
              'line-opacity': index === 0 ? 1 : 0.6,
            },
          });
        });

        new mapboxgl.Marker({ color: 'blue' }).setLngLat(start).addTo(map);
        new mapboxgl.Marker({ color: 'red' }).setLngLat(end).addTo(map);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '520px' ,borderRadius:'15px'}} />;
}

export default RouteMap;

