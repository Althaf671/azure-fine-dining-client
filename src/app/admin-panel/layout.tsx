// Layout admin area/panel
"use client";

import LoadingStateAnimation from "@take/components/loading";
import { AdminPanelProvider } from "@take/context/provider";
import { useProtectedPage } from "@take/hooks/useProtectedPage";
import { getAdminPanel } from "@take/lib/api";
import { ROLES } from "@take/lib/roles.list";
import { useCallback } from "react";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    
    const fetchUserData = useCallback(() => getAdminPanel(), []);
    // semua data dan loading state di pass ke children
    const { data, loading } = useProtectedPage(fetchUserData, [ROLES.ADMIN, ROLES.SUPERADMIN]);

    // seluruh loading state dikombinasikan dengan animasi
    if (loading) return <LoadingStateAnimation />

    // jika link dicoba dibuka paksa tanpa login atau bukan role bersangkutan maka access denied
    if (!data) {
        return null;
    };

    return (
        <AdminPanelProvider value={data}>
            {children}
        </AdminPanelProvider>
    )
}