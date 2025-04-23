import axios from "../axiosinterceptor/UserIntreceptor"
axios.defaults.withCredentials = true;



export const login = (formBody) => axios.post("token/",
    formBody,
)

export const register = (formBody) => axios.post(
    "register/",
    formBody,
)

export const verify = (formBody) => axios.post(
    "verifyotp/",
    formBody,
)

export const updateuser = (formBody) => axios.patch(
    'update/user/',
    formBody,
)

export const logout = () => axios.post(
    'logout/',
    {}
)

export const registerVehicle = (formBody) => axios.post(
    'register/vehicle',
    formBody
)

export const getVehicles = (user_id) => axios.get(
    `vehicles/${user_id}/`
)

export const updateVehicles = (formBody)=>axios.patch(
    'update/vehicle/',
    formBody
)

export const getalluservehicles = (user_id) => axios.get(
    `getuservehicle/${user_id}/`
)

export const forgetpassword = (formBody) => axios.post(
    'forgetpassword/',
    formBody
)

export const forgetpasswordverifyotp = (formBody) => axios.post(
    'verifyforgetpasswordotp/',
    formBody
)

export const changepassword = (formBody) => axios.post(
    'changepassword/',
    formBody
)

export const restpassword = (formBody) =>axios.post(
    'resetpassword/',
    formBody
)

export const google = (formBody) =>axios.post(
    'google/',
    formBody
)

export const checkgoogle = (formBody) =>axios.post(
    'google/check/',
    formBody
)

export const ridepost = (formBody) => axios.post(
    'ride/add/',
    formBody
)

export const getrides = (user_id) => axios.get(
    `ride/add/${user_id}`,
)

export const search = (formBody) => axios.post(
    'ride/search/',
    formBody
)

export const seat = (ride_id)=> axios.get(
    `ride/seat/${ride_id}`
)

export const updateSeat = (formBody) =>axios.patch(
    'ride/seat/update/',
    formBody
)

export const getbookings = (id,status)=>axios.get(
    `ride/booked/${id}/?status=${status}`
)