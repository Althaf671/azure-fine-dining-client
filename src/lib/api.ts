// API ts adalah tempat menampung logic untuk
// menghubungkan frontend dan backend!

// PR!!!! SEMUA CATCH BELUM ADA RETURN NYA!!!

import toast from "react-hot-toast";
import { devLog } from "./logger";
import axios from "axios";
import axiosClient from "./axiosClient";
import { userDeviceLog } from "@take/utils/monitoring/userDeviceLog";


//========== ambil Register endpoint(POST) dan handle Register ==========//
export async function handleRegister(name: string, email: string, password: string) { // body

    /**
        Axios POST hasil input/payload ke backend dengan
        payload: name, emai, password
    */
    try {
        const res = await axiosClient.post("/register", { name, email, password });
        await userDeviceLog("REGISTER", "SUCCESS"); // ambil action dan status user device log
        devLog.success("Account registered");
        setTimeout(() => {
            toast.success("Account registered", { duration: 3000 })
        });
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data?.message || "Registration failed", { duration: 3000 })
            })
        } else {
            toast.error("Unexpected error")
        }
        return null; // jika error, return null
    }
};

//========== ambil verify email endpoint(POST) ==========//
export async function handleVerifyEmail(otp: string) {
    try {
        const res = await axiosClient.post(`/verify-email`, { otp }); // panggil route
        //await userDeviceLog("VERIFY_EMAIL", "SUCCESS");
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data?.message || "Verification failed", { duration: 3000 })
            })
        } else {
            toast.error("Unexpected error");
        }
    }
    return null;
};

//========== ambil resend verification email endpoint(POST) ==========//
export async function handleResendVerificationEmail() { // tidak ada body karena hanya memanggil
    try {
        await axiosClient.post(`/resend-verification-email`);
        toast.success("new OTP sent into ypur email!")
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data?.message || "Failed to resend OTP code", { duration: 3000 })
            })
        } else {
            toast.error("Unexpected error");
        }
    }
    return null;
};

//========== ambil login endpoint(POST) dan handle login ==========//
export async function handleLogin(email: string, password: string) {

    /**
        axiosClient berisi method, headers, dan body.
        saat user isi form input dan submit maka fungsi ini
        akan POST hasilnya ke backend untuk diverifikasi.
    */
    try {
        devLog.warn("initiating handle login");
        const res = await axiosClient.post("/login", { email, password })
        await axiosClient.get("/csrf-token")
        // eksekusi user device log 
        /*try {
            await userDeviceLog("LOGIN", "SUCCESS");
        } catch (error: unknown) {
            devLog.warn("user device log not executed", error)
        }*/

        devLog.warn("returning hanlde login data")
        devLog.success("Login success!", res.data.accessToken);
        devLog.warn("ROLE:", res.data.user.role)
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
    return null;
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
        await userDeviceLog("ADMIN_PANEL", "SUCCESS");
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
    return null;
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
    return null;
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
    return null;
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
    return null;
};

//==========  ambil csrf token endpoint (GET) ==========//
/*export const getAndSetCsrfToken = async () => {
  try {
    const res = await axiosClient.get("/csrf-token"); // ini route kamu
    const csrfToken = res.data.csrfToken;

    if (!csrfToken) throw new Error("No csrf token in response");

    // Set ke header default agar semua request pakai ini
    axiosClient.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    console.log("✅ CSRF token injected to headers:", csrfToken);
  } catch (err) {
    console.error("💥 Gagal inject CSRF token:", err);
  }
};*/

//========== ambil login google endpoint (POST) ==========//
export async function handleGoogleLogin(credential: string) {
    try {
        const res = await axiosClient.post("/login-google", { credential });
        setTimeout(() => {
            toast.success("You've logged in with Google!", { duration: 3000 });
        });
        devLog.success(res);
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Failed to connect with this endpoint");
        } else {
            toast.error("Unexpected error")
        }       
    }
    return null;
};

//==========  ambil forgot password endpoint (POST) ==========//
export async function handleForgotPassword(email: string) {
    try {
        const res = await axiosClient.post("/forgot-password", { email });
        setTimeout(() => {
            toast.success("Reset password email sent! Check your inbox", { duration: 3000 });
        });
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Failed to connect with this endpoint");
        } else {
            toast.error("Unexpected error")
        }       
    }
    return null;
};

//==========  ambil reset password endpoint (POST) ==========//
export async function handleResetPassword(newPassword: string, resetToken: string, email:string) {
    try {
        await axiosClient.post("/reset-password", {newPassword, resetToken, email});
        setTimeout(() => {
            toast.success("Password reset successfully!", { duration: 3000 });
        });
        return;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Failed to connect with this endpoint");
        } else {
            toast.error("Unexpected error")
        }       
    }
    return null;
}; // TEST




