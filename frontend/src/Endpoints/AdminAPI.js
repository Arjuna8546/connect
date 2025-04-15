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