// Register form
"use client"

import { handleRegister } from "@take/lib/api";
import { useRouter } from "next/navigation";
import { registerSchema } from "@take/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import z from "zod";
import RegisterButton from "../buttons/registerButton";
import Link from "next/link";
import SSOButton from "../buttons/ssoButtons";
import { useState } from "react";
import { devLog } from "@take/lib/logger";

export default function RegisterForm() {
    // loading state
    const [loading, setLoading] = useState(false)
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
        try {
            setLoading(true); // loading state
            const isUserExist = await handleRegister(data.name, data.email, data.password); 
            if (isUserExist) {
                router.push(`/verify-email`); 
            } else {
                router.push('/login'); // jika user sudah ada, redirect ke login
            }
        } catch (error) {
            devLog.failed("Register failed", error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="register__from__container">

            {/* image */}
            <div className="auth__page__image__wrapper">
                <Image
                    src="/main/restaurant.webp"
                    alt="restaurant image"
                    priority
                    width={1000}
                    height={1000}
                    objectFit="cover"
                    className="auth__page__image"
                />
            </div>

            {/* Register form */}
            <form onSubmit={handleSubmit(onSubmit)} className="register__form">

                <h2>Register to Reserve Your Seat</h2>

                {/* Username input */}
                <div className="input__area">
                    <label htmlFor="name">Username</label>
                    <div className="input__box">
                        <Image 
                            src={"/misc/user.svg"}
                            alt="user input icon" 
                            width={25}
                            height={25}
                            className="input__icon"
                        />                         
                        <input 
                            {...register("name")} 
                            id="name"
                            type="text" 
                            placeholder="Username" 
                            className="username__input"
                            autoComplete="off"
                            autoFocus
                            spellCheck="false"
                        />                  
                    </div>
                    {errors.name&& <p>{errors.name.message}</p>}                
                </div>      

                {/* Email input */} 
                <div className="input__area">
                    <label htmlFor="email">Email Address</label>
                    <div className="input__box">
                        <Image 
                            src={"/misc/email.svg"}
                            alt="email input icon" 
                            width={25}
                            height={25}
                            className="input__icon"
                        />                           
                        <input 
                            {...register("email")} 
                            id="email"
                            type="email" 
                            name="email"
                            placeholder="Example@gmail" 
                            className="email__input"
                            autoComplete="off"
                            spellCheck="false"
                        />                 
                    </div>
                    {errors.email&& <p>{errors.email.message}</p>}
                </div>

                {/* password input */}
                <div className="input__area">
                    <label htmlFor="password">Password</label>
                    <div className="input__box">
                        <Image 
                            src={"/misc/password.svg"}
                            alt="password input icon" 
                            width={25}
                            height={25}
                            className="input__icon"
                        />                         
                        <input 
                            {...register("password")} 
                            id="password"
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            className="password__input"
                            autoComplete="off"
                            spellCheck="false"
                        />                    
                    </div>
                    {errors.password&& <p>{errors.password.message}</p>}                   
                </div>

                {/* honeypot */}
                <div className="input-box">
                    <input
                        type="text"
                        name="register"
                        autoComplete="off"
                        tabIndex={-1}
                    />
                </div>

                {/* checklist privacy policy */}
                <div className="checklist__additional">
                    <input
                        type="checkbox"
                        required
                    />
                    <label>I have read terms and service</label>
                </div>

                {/* Submit button */}
                <div className="submit__button">
                    <RegisterButton loading={loading} />
                    <div className="line">
                        <hr className="hr__left"/>
                        <span>or</span>
                        <hr className="hr__right" />
                    </div>
                    <SSOButton />                    
                </div>

                {/* Additional menu */}
                <div className="additional__menu">
                    <span>
                        Already have an account? <Link href="/login">Login</Link>
                    </span>
                </div>

            </form>
        </div>
    )
}


