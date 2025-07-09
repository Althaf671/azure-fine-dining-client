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

export default function OtpForm() {
    const [otp, setOtp] = useState("");
    // loading state
    const [loading, setLoading] = useState(false);
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
            setLoading(true); 
            const res = await handleVerifyEmail(data.otp);
            if (res?.message === "User email verified") {
                toast.success("Email verified!");
                router.push("/login");
            }
        } catch (error) {
            devLog.failed("OTP verification failed", error);
        } finally {
            setLoading(false);
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
            inputType="tel" // tel lebih natural untuk otp
            inputStyle={{
                width: "3rem",
                height: "3rem",
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

        <SubmitButton loading={loading} />

        {/* additional info */}
        <p className="additional__info">
            To complete your registration and activate your Azure Fine Dining account, please enter the 6-digit One-Time Password 
            (OTP) that has been sent to your registered email address. This unique code helps us verify your identity and secure 
            your account from unauthorized access. The OTP will expire in 15 minutes, so please enter it promptly. If you did not 
            receive the code, check your spam or junk folder, or request a new one. Never share this code with anyone, including 
            Azure Fine Dining staff — it is strictly confidential and ensures the privacy and safety of your account.
        </p>
    </form>
    )
}