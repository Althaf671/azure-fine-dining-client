// Hooks untuk dipakai di protected page khusus admin/user area
"uce client";

import { devLog } from "@take/lib/logger";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 *  NOTE:
 *  fetchDataFn adalah parameter untuk fetch data dari
 *  api protected panel (berisi middlewares, allowed roles) 
 *  yang lalu diberikan ke hook
 */

// data dari user/admin
type UserResponse = {
    message: string,
    name: string,
    email: string,
    role: number,
};

export function useProtectedPage(
    fetchDataFn?: () => Promise<UserResponse>,
    allowedRoles: number[] = [], // roles dizinkan mengakses protected route tapi roles spesifik harus di tambahkan di page/layout
) {
    const [data, setData] = useState<UserResponse | null>(null); // simpan data hasil fetch
    const [loading, setLoading] = useState(true); // saat fetch berlangsung maka beri status loading
    const router = useRouter(); // deklarasi redirect

    // gunakan useCallback untuk simpan memori fecthData
    const fetchData = useCallback(() => {
        // ambil data allowed role dari backend, berhubungan dengan middleware checkRoles.ts
        if (fetchDataFn) {
            fetchDataFn().then(res => {
                // semua role diizinkan
                if(res && 
                    (allowedRoles.length === 0 || allowedRoles.includes(res.role))
                ) {
                    // return data user/admin panel
                    setData((prev) => {
                        if (JSON.stringify(prev) !==
                    JSON.stringify(res)) return res;
                    return prev; // jika data sudah pernah direturn maka return data itu, bukan data baru, ini mencegah loop
                }); // data hasil fetch diproses 
                } else {
                    devLog.failed("Acess to this area denied");
                    router.push("/login"); // tidak dapat izin dan redirect ke login page

                }
                setLoading(false); // fetch data selesai, baik error maupun tidak dan loading state jadi false
            });
        } else {
            setLoading(false); // tidak ada fetch maka tidak ada loading
        }
    }, [router, fetchDataFn, allowedRoles]);

    // cegah pemanggil hook yang lebih dari sekali
    const hasFatchedRef = useRef(false);

    useEffect(() => {
        if (hasFatchedRef.current) return;
        hasFatchedRef.current = true; 

        // jalankan fungsi fetch data di atas
        fetchData();
    }, [fetchData]);

    return { data, loading };
};