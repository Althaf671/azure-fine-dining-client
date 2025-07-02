/**
 * Login button
 */

export default function LoginButton() {

    // Redirect user to express login provider
    const handleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signout`;
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