import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    "token/refresh/",
                    {},
                    { withCredentials: true }
                )
                return axiosInstance(originalRequest)
            } catch (err) {
                console.error("Token refresh failed:", err);
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance