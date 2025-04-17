import axios from "axios"

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const searchLocation = ({ place }) => axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${MAPBOX_TOKEN}&country=in&autocomplete=true`,

)

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