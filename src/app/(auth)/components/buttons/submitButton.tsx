import LoadingStateAnimation2 from "@take/components/loading2"

export default function SubmitButton({ loading }: { loading: boolean}) {

    if (loading) {
        return (
            <button
                type="submit"
                className="submitOnly__button"
                style={{ opacity: "80%", cursor: "default" }}
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
            Verify
        </button>
    )
};


