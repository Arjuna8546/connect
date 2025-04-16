import axios from "axios"

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const searchLocation = ({place}) =>axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${MAPBOX_TOKEN}&country=in&autocomplete=true`,

)