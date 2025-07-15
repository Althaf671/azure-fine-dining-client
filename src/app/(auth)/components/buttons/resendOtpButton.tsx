// Login button

import { handleResendVerificationEmail } from "@take/lib/api"
import { devLog } from "@take/lib/logger";
import { ButtonStatus } from "../forms/otpForm";
import { useEffect } from "react";

export default function ResendOtpButton({ 
    resendState,
    setResendState,
    coolDownTime,
    setCoolDownTime
}: { 
    resendState: ButtonStatus,
    setResendState: React.Dispatch<React.SetStateAction<ButtonStatus>>;
    coolDownTime: number,
    setCoolDownTime: React.Dispatch<React.SetStateAction<number>>;
}) {

    // hook timer
    useEffect(()=> {
        // deklarasi timer 
        let timer: ReturnType<typeof setTimeout>; 

        if (resendState === "cooldown") {
            timer = setInterval(() => {
                setCoolDownTime((prev) => { // button cooldown maka beri interval setiap 1 detik
                    if (prev <= 1) {
                        clearInterval(timer); // stop timer
                        setResendState("idle"); // kalau timer stop maka status jadi idle
                        return 30; // reset cooldownd
                    }
                    return prev -1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendState, setResendState, setCoolDownTime]);

    // handle loading state
    const loadingState = async () => {
        setResendState("loading");
        try {
            await handleResendVerificationEmail();
            setResendState("cooldown");
            devLog.success("handleResendVerificationEmail executed");
        } catch (error) {
            devLog.failed(error);
            setResendState("idle")
        }
    };

     // button idle
    if (resendState === "idle") {
        return (
            <button 
                style={{ position: "relative" }} 
                onClick={loadingState} 
                className="resend__button"
            >
                Resend OTP code
            </button>
        )
    };

    // button loading
    if (resendState === "loading") {
        return (
            <button 
                style={{ position: "relative", opacity: "40%", rotate: "270" }} 
                onClick={loadingState} 
                className="resend__button"
                disabled
            >
                sending...
            </button>
        )
    };

    // button cooldown
    if (resendState === "cooldown") {
        return (
            <button 
                style={{ position: "relative", opacity: "40%", rotate: "270" }} 
                onClick={loadingState} 
                className="resend__button"
                disabled
            >
                wait {coolDownTime}s
            </button>           
        )
    };
};

