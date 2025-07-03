// Loading animation saat loading state berlangsung

import Lottie from "lottie-react";
import loadingAnimation from "../../public/misc/loadingAnimation.json";


export default function LoadingStateAnimation() {
    return (
        <Lottie animationData={loadingAnimation} loop={true} />
    )
};