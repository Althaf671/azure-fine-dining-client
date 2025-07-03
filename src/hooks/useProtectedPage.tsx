// Hooks untuk dipakai di protected page khusus admin area
/**
 * hook melakukan cek apakah user sudah punya token
 * lalu cek role user jika semua syarat tidak dipenuhi
 * maka protected route menolak permintaan masuk ke page
 */
"uce client";

import { devLog } from "@take/lib/logger";
import { ROLES } from "@take/lib/roles.list";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

/**
 *  NOTE:
 *  fetchDataFn adalah parameter untuk fetch data dari
 *  api admin panel (berisi middlewares, allowed roles) 
 *  yang lalu diberikan ke hook
 */

export function useProtectedPage(fetchDataFn?: (token: string) => Promise<any>) {
    const [data, setData] = useState<any>(null); // simpan data hasil fetch
    const [loading, setLoading] = useState(true); // saat fetch berlangsung maka beri status loading
    const router = useRouter(); // deklarasi redirect

    /**
     * ambil dan simpan token dari localStorage 
     * jika tidak ada maka toast error dan push
     * user kemabli ke login page
     */
    useEffect(() => {
        // ambil token untuk memenuhi syarat middleware VerifyAcessToken.ts
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to continue");
            router.push("/login");
            return;
        }
        // ambil data allowed role dari backend, berhubungan dengan middleware checkRoles.ts
        if (fetchDataFn) {
            fetchDataFn(token).then(res => {
                if(res && (res.role === ROLES.ADMIN || res.role === ROLES.SUPERADMIN )) {
                    setData(res); // data hasil fetch diproses 
                } else {
                    toast.error('Access denied');
                    devLog.failed("Acess to admin area denied");
                    router.push("/login"); // tidak dapat izin dan redirect ke login page
                }
                setLoading(false); // fetch data selesai, baik error maupun tidak dan loading state jadi false
            });
        } else {
            setLoading(false); // tidak ada fetch maka tidak ada loading
        }
    }, [router, fetchDataFn]);

    return { data, loading };
}