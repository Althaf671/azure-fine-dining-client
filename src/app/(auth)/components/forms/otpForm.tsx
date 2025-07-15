// OTP form
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { otpSchema, OtpSchemaType } from "@take/validators/auth.schema";
import { handleVerifyEmail } from "@take/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { devLog } from "@take/lib/logger";
import OtpInput from "react-otp-input";
import z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../buttons/submitButton";
import ResendOtpButton from "../buttons/resendOtpButton";

// type loading state
export type ButtonStatus = "loading" | "idle" | "cooldown"; // nanti refactor ke types

export default function OtpForm() {
    const [otp, setOtp] = useState("");
    // loading state untuk button verify dan resend OTP
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendState, setResendState] = useState<ButtonStatus>("idle");
    const [coolDownTime, setCooldownTime] = useState(30);
    const router = useRouter();

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema)
    });

    const onSubmit = async (data: OtpSchemaType) => {
        try {
            setIsVerifying(true); 
            const res = await handleVerifyEmail(data.otp);
            if (res?.message === "User email verified") {
                toast.success("Email verified!");
                router.push("/login");
            }
        } catch (error) {
            devLog.failed("OTP verification failed", error);
        } finally {
            localStorage.removeItem("pending-email"); // hapus email dari localstorage
            setIsVerifying(false);
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="otp__form">

        <OtpInput
            value={otp} // value dari input adalah otp
            onChange={(value) => {
                setOtp(value); // simpan ke local state biar live update
                    setValue("otp", value, { shouldValidate: true }); // update ke react-hook-form
                }}
            numInputs={6} // maksimal 6 digit untuk input
            inputType="tel" 
            inputStyle={{
                width: "10vw",        
                height: "10vw",       
                maxWidth: "60px",     
                maxHeight: "60px",
                minWidth: "38px",     
                minHeight: "38px",
                marginRight: "0.5rem",
                fontSize: "1.5rem",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
            shouldAutoFocus
            containerStyle="otp__container"
            renderInput={(props) => <input {...props} />}
        />

        {/* error mesage */}
        {errors.otp && <p className="error__text">{errors.otp.message}</p>}

        <SubmitButton loading={isVerifying} />

        <ResendOtpButton
            resendState={resendState}
            setResendState={setResendState}
            coolDownTime={coolDownTime}
            setCoolDownTime={setCooldownTime}
        />

        {/* additional info */}
        <p className="additional__info">
            Enter the 6-digit OTP sent to your email to verify your account.
            The code is valid for <span style={{ fontWeight: "600"}}>15 minutes</span>. Didn’t 
            get it? Check your spam folder or resend 
            Never share this code with anyone — it’s private.
        </p>
    </form>
    )
}