// sso button
import Image from 'next/image';

export default function SSOButton() {
    return (
        <button
            type="submit"
            className="sso__button"
        >
            <Image
                src="/misc/google.svg"
                alt="Google login icon"
                width={25}
                height={25}
            />
            Login with Google
        </button>
    )
}