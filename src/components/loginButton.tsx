/**
 * Login button
 */

"use client"
import { devLog } from "@take/lib/logger";

export default function LoginButton() {

    // Redirect user to express login provider
    const handleLogin = () => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        if (!backendUrl) {
            devLog.failed("Failed to fetch auth google")
            return; // stop executio if env not found
        }

        // redirect
        window.location.href = `${backendUrl}/auth/google`;
    }

    return (
        <button
            type="button"
            onClick={handleLogin}
        >
            Login to access
        </button>
    )
}