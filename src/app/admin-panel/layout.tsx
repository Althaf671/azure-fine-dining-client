// Layout admin area/panel
"use client";

import LoadingStateAnimation from "@take/components/loading";
import { useProtectedPage } from "@take/hooks/useProtectedPage";
import { getAdminPanel } from "@take/lib/api";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    const { data, loading } = useProtectedPage(getAdminPanel);

    // seluruh loading state dikombinasikan dengan animasi
    if (loading) return <LoadingStateAnimation />

    return <>{children}</>
}