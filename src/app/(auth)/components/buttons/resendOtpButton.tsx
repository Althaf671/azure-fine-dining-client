// Login button

import LoadingStateAnimation2 from "@take/components/loading2"
import { handleResendVerificationEmail } from "@take/lib/api"

export default function ResendOtpButton({ loading }: { loading: boolean}) {

    if (loading) {
        return (
            <button

                className="login__button"
                style={{ position: "relative"}}
                disabled={loading}
            >
                <LoadingStateAnimation2 />
            </button>
        )
    }

    return (
        <button
            className="login__button"
            onClick={handleResendVerificationEmail}
        >
            Resend OTP code?
        </button>
    )
};

