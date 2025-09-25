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
import Image from "next/image";
import GalleryGrid from "@take/components/gallery/gallery";
import Link from "next/link";
import { useState } from "react";
import { devLog } from "@take/lib/logger";
import SSOButton from "../buttons/ssoButtons";

export default function LoginForm() {
    // deklarasi route
    const router = useRouter();
    // loading state
    const [loading, setLoading] = useState(false)

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
        try {
            setLoading(true); // loading state dijalankan
            const role = await handleLogin(data.email, data.password); // logic ini di eksekusi
             if (role === ROLES.USER) {
                router.push("/admin-panel")
                devLog.success("login - pushing to user panel");
            } else {
                router.push("/user-panel")
                devLog.success("login - pushing to user panel");
            }    
        } catch (error) {
            devLog.failed("failed to login", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <main className="login__from__container">

            {/* image */}
            <div className="auth__page__image__wrapper">
                <GalleryGrid />
            </div>

            {/* Register form */}
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">

                <h2>Login to continue to your Dashboard</h2>    

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
                            autoFocus                            
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


                {/* Submit button */}
                <div className="submit__button">
                    <LoginButton loading={loading} />
                    <div className="line">
                        <hr className="hr__left"/>
                        <span>or</span>
                        <hr className="hr__right" />
                    </div>                  
                </div>

                <SSOButton />  

                <Link 
                    className="forgot__password__link"
                    href="/forgot-password"
                >
                    Forgot Password?
                </Link>

                {/* Additional menu */}
                <div className="additional__menu">
                    <span>
                        Doesn&apos;t have an account? <Link href="/register">Register now</Link>
                    </span>
                </div>

            </form>
        </main>
    )
}