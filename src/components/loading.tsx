// Loading animation saat loading state berlangsung

import Lottie from "lottie-react";
import loadingAnimation from "../../public/misc/loading-animation.json";


export default function LoadingStateAnimation() {
    return (
        <Lottie style={{ padding: "35vw", background: "#FOE7D5" }}animationData={loadingAnimation} loop={true} />
    )
};