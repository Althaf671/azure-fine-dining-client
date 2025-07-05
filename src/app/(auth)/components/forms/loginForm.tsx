// Login form
"use client";

import { handleLogin } from "@take/lib/api";
import { useRouter } from "next/navigation";
import SubmitButton from "../buttons/submitButton";
import toast from "react-hot-toast";
import { ROLES } from "@take/lib/roles.list";
import { loginSchema } from "@take/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
        console.log("FORM SUMBITTED: ", data)
        const role = await handleLogin(data.email, data.password);
        if (role === ROLES.USER) {
            toast.success("Welcome to Your Dashboard")
            router.push("/user-panel")
        } else {
            toast.success("Welcome to Admin Dashboard")
            router.push("/admin-panel")
        } 
    };

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} type="email" placeholder="Email" />
                {errors.email&& <p>{errors.email.message}</p>}
                <input {...register("password")} type="password" placeholder="Password" />
                {errors.password&& <p>{errors.password.message}</p>}
                <SubmitButton />
            </form>
        </main>
    )
}