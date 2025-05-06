import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../../assets/lotties/general/success-animation-lottie.json";

export default function SuccessLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return <Lottie options={defaultOptions} height={35} width={35} />;
}
