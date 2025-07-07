// Register form
"use client"

import { handleRegister } from "@take/lib/api";
import { useRouter } from "next/navigation";
import SubmitButton from "../buttons/submitButton";
import { registerSchema } from "@take/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegisterForm() {
    // deklarasi route
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema)
    });

    async function onSubmit(data: z.infer<typeof registerSchema>) {
        const token = await handleRegister(data.name, data.email, data.password);
        router.push(`/verify-email/${token}`) 
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} type="text" placeholder="Username" />
            {errors.name&& <p>{errors.name.message}</p>}
            <input {...register("email")} type="email" placeholder="Email" />
            {errors.email&& <p>{errors.email.message}</p>}
            <input {...register("password")} type="password" placeholder="Password" />
            {errors.password&& <p>{errors.password.message}</p>}          
            <SubmitButton />
        </form>
    )
}


