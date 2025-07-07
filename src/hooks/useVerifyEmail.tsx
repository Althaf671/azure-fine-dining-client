// hooks untuk verification email

/* import { handleVerifyEmail } from "@take/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export function useVerifyEmail(token: string | undefined) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      const res = await handleVerifyEmail(token!);

      if (res?.message === "User email verified") {
        toast.success("Email verified successfully!", { duration: 3000 });
        router.push("/login");
      }

      setLoading(false);
    }

    if (token) verify();
  }, [token, router]);

  return { loading };
}
*/