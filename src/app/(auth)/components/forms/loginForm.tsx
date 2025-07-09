// Login form
"use client";

import { handleLogin } from "@take/lib/api";
import { useRouter } from "next/navigation";
import { ROLES } from "@take/lib/roles.list";
import { loginSchema } from "@take/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import LoginButton from "../buttons/loginButton";

export default function LoginForm() {
    // deklarasi route
    const router = useRouter();

    // form validation oleh zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });
    
    // panggil handleLogin
    async function onSubmit(data: z.infer<typeof loginSchema>) {
        const role = await handleLogin(data.email, data.password);

        // jika login gagal maka return
        if (!role) return;

        if (role === ROLES.USER) {
            router.push("/user-panel")
        } else {
            router.push("/admin-panel")
        } 
    };

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input__area">
                    <input {...register("email")} type="email" placeholder="Email" />
                    {errors.email&& <p>{errors.email.message}</p>}
                </div>
                <div className="input__area">
                    <input {...register("password")} type="password" placeholder="Password" />
                    {errors.password&& <p>{errors.password.message}</p>}
                </div>
                <LoginButton />
            </form>
        </main>
    )
}