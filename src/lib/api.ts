// API ts adalah tempat menampung logic untuk
// menghubungkan frontend dan backend!

import toast from "react-hot-toast";
import { devLog } from "./logger";

// Backend API url
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//========== Get login endpoint dan handle login ==========//
export async function handleLogin(email: string, password: string) {

    // deklarasi res dengan isi di bawah
    const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST', // method agar FE mengirim payload input 
        headers: {
            'Content-Type': 'application/json', // payload berbentuk JSON
        },
        body: JSON.stringify({ email, password }), // isi payload
    });

    // deklarasi data berisi res
    const data = await res.json();

    if (res.ok) {
        devLog.success("Login success!", data.accessToken);
        toast.success("You are in!")
        localStorage.setItem('token', data.accessToken); // token saved to localstorage
    } else {
        toast.error("Login failed")
        devLog.failed("Login failed")
    }
};


//========== Get Register endpoint dan handle Register ==========//
export async function handleRegister(name: string, email: string, password: string) {

    // deklarasi res
    const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({ name, email, password })
    })

    if (res.ok) {
        devLog.success("Account registered")
        toast.success("Account registered!")
    } else {
        devLog.failed("Resistration failed")
        toast.error("Registration failed")
    }
}
