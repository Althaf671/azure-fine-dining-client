// Login button

import LoadingStateAnimation2 from "@take/components/loading2"

export default function SubmitButton({ loading }: { loading: boolean}) {

    if (loading) {
        return (
            <button
                type="submit"
                className="submitOnly__button"
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

