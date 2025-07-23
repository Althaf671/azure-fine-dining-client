"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { handleResetPassword } from "@take/lib/api"; 
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { resetPasswordSchema, resetPasswordSchemaType } from "@take/validators/auth.schema";
import { devLog } from "@take/lib/logger";
import toast from "react-hot-toast";
import Image from "next/image";
import SubmitButtonResetPassword from "../buttons/submitButtonResetPassword";
import { useParams, useSearchParams } from "next/navigation";


export default function ResetPasswordForm() {
    // loading state
    const [loading, setLoading] = useState(false);
    // ambil link dari URL
    const searchParams = useSearchParams();
    const params = useParams();
    const token = params.token;
    const email = searchParams?.get('email');

    // form validation oleh zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = async (data: resetPasswordSchemaType) => {
        devLog.warn(email, token)
        try {
            setLoading(true);
            // jika token dan email tidak ada
            if (!token || !email) {
                toast.error("Invalid reset link")
                return;
            }

            await handleResetPassword(data.password, token as string, email);
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
                src={"/misc/resetPassword.svg"}
                alt="email input icon" 
                width={100}
                height={100}
                className="resetPwd__icon"
            />
            <h3>Reset your password</h3>  
            <p className="additional__info">Please input your new password and confirm</p>           
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

        {/* confirm password input */}
        <div className="input__area">
            <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input__box">
                    <Image 
                        src={"/misc/resetPassword.svg"}
                        alt="password input icon" 
                        width={25}
                        height={25}
                        className="input__icon"
                    />                         
                    <input 
                        {...register("confirmPassword")} 
                        id="confirmPassword"
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm password" 
                        className="password__input"
                        autoComplete="off"
                        spellCheck="false"
                    />                    
                </div>
            {errors.confirmPassword&& <p>{errors.confirmPassword.message}</p>}     
            <SubmitButtonResetPassword loading={loading} />              
        </div>
    </form>
  );
};
