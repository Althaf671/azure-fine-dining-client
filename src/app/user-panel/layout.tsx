// Layout admin area/panel
"use client";

import LoadingStateAnimation from "@take/components/loading";
import { useProtectedPage } from "@take/hooks/useProtectedPage";
import { getUserPanel } from "@take/lib/api";
import { ROLES } from "@take/lib/roles.list";
import { UserPanelProvider } from "../../context/provider";
import { useCallback } from "react";

export default function UserPanelLayout({ children }: { children: React.ReactNode }) {
    
    const fetchUserData = useCallback(() => getUserPanel(), []);
    // semua data dan loading state di pass ke children
    const { data, loading } = useProtectedPage(fetchUserData, [ROLES.USER]);

    // seluruh loading state dikombinasikan dengan animasi
    if (loading) return <LoadingStateAnimation />

    return (
        <UserPanelProvider value={data}>
            {children}
        </UserPanelProvider>
    )
};