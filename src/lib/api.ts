// API ts adalah tempat menampung logic untuk
// menghubungkan frontend dan backend!

import toast from "react-hot-toast";
import { devLog } from "./logger";
import axios from "axios";
import axiosClient from "./axiosClient";

//========== Get login endpoint dan handle login ==========//
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
            toast.error(err.response?.data?.message || "Login failed")
        } else {
            toast.error("Unexpected error")
        }
    }
};


//========== Get Register endpoint dan handle Register ==========//
export async function handleRegister(name: string, email: string, password: string) {

    /**
        Axios POST hasil input/payload ke backend dengan
        payload: name, emai, password
    */
    try {
        await axiosClient.post("/register", { name, email, password })
        devLog.success("Account registered")
        toast.success("Account registered!")
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Registration failed")
        } else {
            toast.error("Unexpected error")
        }
    }
};

//========== Get protected admin panel api ==========//
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
        devLog.success("protected admin panel api received");
        return res.data; // return data sukses, data sudah diatur backend/admin.route.ts
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Access denied")
        } else {
            toast.error("Unexpected error")
        }
    }
};

//========== Get protected user panel api ==========//
export async function getUserPanel() {

    try {
        const res = await axiosClient.get("/user-panel");
        devLog.success("protected user panel api received");
        return res.data; // return data sukses, data sudah diatur backend
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Access denied")
        } else {
            toast.error("Unexpected error")
        }
    }
};


