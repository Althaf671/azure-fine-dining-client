//========= file Axios Client ==========//
// semua fetch akan otomatis dengan csrf dan cookie
import getCookie from "@take/helper/cookie";
import axios from "axios";
import { getRefreshToken } from "./api";
import { devLog } from "./logger";
import toast from "react-hot-toast";


// Backend API url
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// basic configuration
/**
 * semua fetch dengan axiosClient ini akan menggunakan
 * credentials true dan header dengan content-type 
 * application/JSON
 */
const axiosClient = axios.create({
    baseURL: API_URL + '/api', // backend URL + APIs/*
    withCredentials: true, // true agar cookie(httpOnly) dan isinya termasuk refreshToken ikut
    headers: {
        'Content-Type': 'application/json'
    },
});

/**
    CSRF token interceptor.
    inject semua axiosClient fetch (kecuali GET) dengan CSRF interceptor
*/
axiosClient.interceptors.request.use(
    (config) => {
        // deklarasi csrfToken, getCookie(.ts) mengambil crsf_token
        const csrfToken = getCookie("csrf_token");

        if (csrfToken && config.method !== "get") { // fetch dengan method GET tidak akan diinject crsf token
            config.headers["x-csrf-token"] = csrfToken;
        } 

        return config;
    },
    (error) => Promise.reject(error)
);

/**
    Refresh token rotation.
    inject semua fecth dengan refresh token rotation
*/
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // jike previous refresh token expired maka jalankan fungsi di bawah
        if(error.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.url.includes("login") &&
            !originalRequest.url.includes("logout") &&
            !originalRequest.url.includes("refresh-token")  &&
            !originalRequest.url.includes("log-user-device")  
            // lainnya
        ) {
            originalRequest._retry = true;
            try {
                await getRefreshToken(); // meminta token baru dari api.ts
                devLog.success("You have received new refresh token")
                return axiosClient(originalRequest); 
            } catch (refreshError) {
                toast.error("Session expired. Please login again"); 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;