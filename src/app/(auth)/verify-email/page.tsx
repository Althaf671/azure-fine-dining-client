// app/(auth)/verify-email/page.tsx
"use client";

import { useState } from "react";
import { handleVerifyEmail } from "@take/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(""); // simpan OTP state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await handleVerifyEmail(otp); // panggil handleVerify email yg berisi OTP
    if (res?.message === "User email verified") {
      toast.success("Email verified!");
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="verify-email-form">
      <h2>Enter OTP Code</h2>
      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your code"
        className="otp__input"
      />
      <button type="submit" className="submit__otp__btn">Verify Email</button>
    </form>
  );
}