"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { handleForgotPassword } from "@take/lib/api"; 
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { forgotPasswordSchema, forgotPasswordSchemaType } from "@take/validators/auth.schema";
import { devLog } from "@take/lib/logger";
import toast from "react-hot-toast";
import SubmitButtonForgotPassword from "../buttons/submitButtonForgotPwd";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordForm() {
    // loading state
    const [loading, setLoading] = useState(false);

    // form validation oleh zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = async (data: forgotPasswordSchemaType) => {
        try {
            setLoading(true);
            await handleForgotPassword(data.email);
        } catch (error) {
            devLog.failed("Failed submit", error);
            toast.error("Failed to submit");
        } finally {
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="forgot__password__container">

        {/* upper body */}
        <div className="upper__body">
            <Image 
                src={"/misc/forgotPassword.svg"}
                alt="email input icon" 
                width={100}
                height={100}
                className="resetPwd__icon"
            />
            <h3>Forgot your password?</h3>  
            <p className="additional__info">No worries, we&apos;ll send you reset instructions</p>           
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
                    placeholder="Enter your email" 
                    className="email__input"
                    autoFocus                            
                    autoComplete="off"
                    spellCheck="false"
                />                 
                </div>
                {errors.email&& <p>{errors.email.message}</p>}
                <SubmitButtonForgotPassword loading={loading} />
            </div>
            <div className="return__to__login">
                <Link href="/login">
                    <Image
                        src={"/misc/arrowBack.svg"}
                        width={25}
                        height={25}
                        alt="button back to login"
                    />
                    <p>Return to login</p>
                </Link>               
            </div>
    </form>
  );
};
