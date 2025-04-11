import adminaxios from '../axiosinterceptor/AdminInterceptor'



export const adminlogin =(formBody) => adminaxios.post(
    'token/',
    formBody
)

export const admingetallusers = (page=1,search = "") => adminaxios.get(
    `allusers/?page=${page}&search=${search}`
)

export const logout  = () =>adminaxios.post(
    'logout/'
)