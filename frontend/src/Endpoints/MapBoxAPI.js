import axios from "axios"

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const searchLocation = ({ place }) => axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${MAPBOX_TOKEN}&country=in&autocomplete=true`,

)

export const getCoordinatesFromPlaceName = async (placeName) => {
    
  
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
  
    try {
      const response = await axios.get(url);
      const feature = response.data.features[0];
  
      if (feature) {
        return feature.center;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates from Mapbox:", error);
      return null;
    }
  };

export const getroutes = (start, end, accessToken) =>
    axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}`,
        {
            params: {
                geometries: 'geojson',
                overview: 'full',
                alternatives: true,
                access_token: accessToken,
            },
        }
    );

//Overpass API openstreetmap
export const getPlacesAlongRoute = async (coordinates) => {
    try {
        const sampleRate = 50;
        const sampledPoints = coordinates.filter((_, index) => index % sampleRate === 0);

        const queries = sampledPoints.map(([lng, lat]) => {
            return `node["place"~"town|village|city"](around:1000,${lat},${lng});`;
        });

        const overpassQuery = `
            [out:json][timeout:25];
            (
              ${queries.join("\n")}
            );
            out body;
          `;

        const response = await axios.post(
            'https://overpass-api.de/api/interpreter',
            new URLSearchParams({ data: overpassQuery }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return response.data.elements;
    } catch (error) {
        console.error('Overpass API error:', error);
        return [];
    }
};

//OSR

export const getRouteDistanceFromStartToEnd = async (startCoord, endCoord, routeCoordinates) => {
  try {
    const access_Token = import.meta.env.VITE_ORS_TOKEN;

    const startIndex = findClosestPoint(startCoord, routeCoordinates);
    const endIndex = findClosestPoint(endCoord, routeCoordinates);

    const [startLng, startLat] = routeCoordinates[startIndex];
    const [endLng, endLat] = routeCoordinates[endIndex];

    const url = "https://api.openrouteservice.org/v2/directions/driving-car";

    const body = {
      coordinates: [
        [startLng, startLat],
        [endLng, endLat]
      ]
    };

    const headers = {
      Authorization: access_Token,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, body, { headers });

    const distanceInMeters = response.data.routes[0].summary.distance;
    const distanceInKm = distanceInMeters / 1000;

    return distanceInKm;
  } catch (error) {
    console.error("❌ Error fetching route distance:", error?.response?.data || error.message);
    return null;
  }
};

  

  const findClosestPoint = (coord, routeCoordinates) => {
    let minDistance = Infinity;
    let closestIndex = -1;
  
    routeCoordinates.forEach(([lng, lat], index) => {
      const distance = haversineDistance(coord, { lat, lon: lng });
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
  
    return closestIndex; 
  };
  
  const haversineDistance = (coord1, coord2) => {
    const R = 6371;
    const lat1 = coord1.lat * (Math.PI / 180);
    const lon1 = coord1.lon * (Math.PI / 180);
    const lat2 = coord2.lat * (Math.PI / 180);
    const lon2 = coord2.lon * (Math.PI / 180);
  
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
  
    const a = Math.sin(dlat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dlon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  