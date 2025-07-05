// Login form
"use client";

import { handleLogin } from "@take/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../buttons/submitButton";
import toast from "react-hot-toast";
import { ROLES } from "@take/lib/roles.list";

export default function LoginForm() {
    // deklarasi email, password, dan route
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    // panggil handleLogin
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const role = await handleLogin(email, password);
        if (role === ROLES.USER) {
            toast.success("Welcome to Admin Dashboard")
            router.push("/user-panel")
        } else {
            toast.success("Welcome to Your Dashboard")
            router.push("/admin-panel")
        } 
    };

    return (
        <main>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email@example.com"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <SubmitButton />
            </form>
        </main>
    )
}