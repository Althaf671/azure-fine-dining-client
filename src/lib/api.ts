// API ts adalah tempat menampung logic untuk
// menghubungkan frontend dan backend!

import toast from "react-hot-toast";
import { devLog } from "./logger";
import axios from "axios";
import axiosClient from "./axiosClient";

//========== ambil login endpoint(POST) dan handle login ==========//
export async function handleLogin(email: string, password: string) {

    /**
        axiosClient berisi method, headers, dan body.
        saat user isi form input dan submit maka fungsi ini
        akan POST hasilnya ke backend untuk diverifikasi.
    */
    try {
        const res = await axiosClient.post("/login", { email, password })
        devLog.success("Login success!", res.data.accessToken);
        return res.data.user.role; // return role agar bisa dipakai untuk split login route admin-user
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;

            if (status === 429) {
                toast.error("Calm down! You're hitting the limit.")
            } else {
                setTimeout(() => {
                    toast.error(err.response?.data?.message || "Login failed")
                })
            }

        } else {
            toast.error("Unexpected error")
        }
    }
    return undefined;
};


//========== ambil Register endpoint(POST) dan handle Register ==========//
export async function handleRegister(name: string, email: string, password: string) {

    /**
        Axios POST hasil input/payload ke backend dengan
        payload: name, emai, password
    */
    try {
        await axiosClient.post("/register", { name, email, password })
        devLog.success("Account registered")
        setTimeout(() => {
            toast.success("Account registered", { duration: 3000 })
        })
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data?.message || "Registration failed")
            })
        } else {
            toast.error("Unexpected error")
        }
    }
};

//========== ambil protected admin panel api(GET) ==========//
/**
    api admin panel dilindungi oleh middleware yang cek
    token dan check roles, logic ini berfungsi untuk fetch
    api admin panel yang dilindungi agar bisa di pakai di 
    hook dan pages/layouts
*/
export async function getAdminPanel() {
    // axiosClient dengan method GET
    try {
        const res = await axiosClient.get("/admin-panel"); // deklarasi res yang berisi data dari admin.route.ts
        setTimeout(() => {
            toast.success("Welcome to admin dashboard", { duration: 3000 })
        })
        devLog.success("protected admin panel api received");
        return res.data; // return data sukses, data sudah diatur backend/admin.route.ts
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
        setTimeout(() => {
            toast.error(err.response?.data?.message || "Access denied")
        })
        } else {
            toast.error("Unexpected error")
        }
    }
};

//========== ambil protected user panel api(GET) ==========//
export async function getUserPanel() {

    try {
        const res = await axiosClient.get("/user-panel"); // fetch endpoint
        setTimeout(() => {
            toast.success("Welcome to your dashboard", { duration: 3000 })
        })
        devLog.success("protected user panel api received");
        return res.data; // return data sukses, data sudah diatur backend
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data?.message || "Access denied")
            })
        } else {
            toast.error("Unexpected error")
        }
    }
};

//==========  ambil refresh token api/token rotation (POST) ==========//
export async function getRefreshToken() {
    try {
        const res = await axiosClient.post("/refresh-token");
        devLog.success("Success to connect with refresh token endpoint");
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            devLog.failed(err.response?.data?.message || "failed to connect with this endpoint")
        } else {
            toast.error("Unexpected error")
        }     
    }
};

//==========  ambil logout api/endpoint (POST) ==========//
export async function handleLogout() {
    try {
        const res = await axiosClient.post("/logout");
        setTimeout(() => {
            toast.success("Logged out succesfully", { duration: 3000 })
        });
        devLog.success("You have logout");
        return res.data; // JSON message dan status sudah ada di backend
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Logout failed")
        } else {
            toast.error("Unexpected error")
        }       
    }
};




