"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleVerifyEmail } from "@take/lib/api";
import LoadingStateAnimation from "@take/components/loading"; 

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const token = params.token as string;

  useEffect(() => {
    async function verify() {
      const res = await handleVerifyEmail(token);

      if (res?.message === "User email verified") {
        toast.success("Email verified successfully!");
        router.push("/login");
      } else {
        toast.error("Verification failed");
        router.push("/register");
      }

      setLoading(false);
    }

    if (token) verify();
  }, [token, router]);

  if (loading) return <LoadingStateAnimation />;

  return <p>Email verification complete.</p>;
}