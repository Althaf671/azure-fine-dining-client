// Hooks untuk dipakai di protected page/layout
"uce client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useProtectedPage(fetchDataFn?: (token: string) => Promise<any>) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to continue");
            router.push("/login");
            return;
        }
    })
}