import adminaxios from '../axiosinterceptor/AdminInterceptor'



export const adminlogin = (formBody) => adminaxios.post(
    'token/',
    formBody
)

export const admingetallusers = (page = 1, search = "", verified) => {
    let url = `allusers/?page=${page}&search=${search}`;
    if (verified !== undefined) {
        url += `&verified=${verified}`;
    }
    return adminaxios.get(url);
}

export const adminverifiedusers = (page = 1, search = "") => adminaxios.get(`verifyusers/?page=${page}&search=${search}`);



export const logout = () => adminaxios.post(
    'logout/'
)

export const blockuser = (formBody)=> adminaxios.patch(
    'blockuser/',
    formBody
)

export const admingetallrides = (page = 1,status) => {
    let url = `allrides/?page=${page}&status=${status}`;
    return adminaxios.get(url);
}

export const admingetallbookings = (page = 1,status) => {
    let url = `allbookings/?page=${page}&status=${status}`;
    return adminaxios.get(url);
}

export const admingetallpayements = (page = 1,status) => {
    let url = `allpayment/?page=${page}&status=${status}`;
    return adminaxios.get(url);
}
