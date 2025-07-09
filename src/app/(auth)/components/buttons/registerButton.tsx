// register button

import LoadingStateAnimation2 from "@take/components/loading2"


export default function RegisterButton({ loading }: { loading: boolean}) {

    if (loading) {
        return (
            <button
                type="submit"
                className="register__button"
                style={{ position: "relative"}}
                disabled
            >
                <LoadingStateAnimation2 />
            </button>
        )
    }

    return (
        <button
            type="submit"
            className="register__button"
        >
            Register
        </button>
    )
}