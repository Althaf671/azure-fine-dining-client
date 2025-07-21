import LoadingStateAnimation2 from "@take/components/loading2"

export default function SubmitButtonForgotPassword({ loading }: { loading: boolean}) {

    if (loading) {
        return (
            <button
                type="submit"
                className="submitOnly__button"
                style={{ opacity: "80%", cursor: "default", position: "relative" }}
                disabled
            >
                <LoadingStateAnimation2 />
            </button>
        )        
    }

    return (
        <button
            type="submit"
            className="submitOnly__button"
        >
            Send reset email
        </button>
    )
};