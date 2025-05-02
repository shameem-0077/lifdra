import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../../assets/lotties/general/warning-lottie.json";

export default function WarningLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return <Lottie options={defaultOptions} height={35} width={35} />;
}
