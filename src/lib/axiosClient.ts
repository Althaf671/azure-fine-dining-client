// semua fetch akan otomatis dengan csrf dan cookie
import getCookie from "@take/helper/cookie";
import axios from "axios";
// helper getCookie dulu

// Backend API url
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosClient = axios.create({
    baseURL: API_URL + '/api', // backend URL + APIs/*
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

/**
    CSRF token interceptor.
    inject semua axiosClient dengan interceptor
*/
axiosClient.interceptors.request.use(
    (config) => {
        // deklarasi csrfToken, getCookie(.ts) mengambil crsf_token
        const csrfToken = getCookie("csrf_token");

        // NOTE: axiosClient belum terhubung dengan refreshToken API

        if (csrfToken && config.method !== "get") {
            config.headers["x-csrf-token"] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;