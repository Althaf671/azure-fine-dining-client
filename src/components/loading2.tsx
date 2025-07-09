// Loading animation saat loading state kecil berlangsung

import Lottie from "lottie-react";
import loadingAnimation from "../../public/misc/loading.json";


export default function LoadingStateAnimation2() {
    return (
        <Lottie className="loadingState2" animationData={loadingAnimation} loop={true} />
    )
};