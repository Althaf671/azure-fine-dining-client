// Register form
"use client"

import { handleRegister } from "@take/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react"
import SubmitButton from "../buttons/submitButton";

export default function RegisterForm() {
    // deklarasi name, email, password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        await handleRegister(name, email, password);
        router.push("/login")
    };

    return(
        <form onSubmit={onSubmit}>
            <input 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
                required
            />
            <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
                required
            />
            <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                required
            />           
            <SubmitButton />
        </form>
    )
}