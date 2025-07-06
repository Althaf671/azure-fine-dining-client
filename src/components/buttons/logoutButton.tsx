// logout button

import { handleLogout } from "@take/lib/api";
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter();

    async function onLogout() {
        await handleLogout();
        router.push("/")
    }

    return (
        <button
            type="button"
            onClick={onLogout}
        >
            Logout
        </button>
    )
}