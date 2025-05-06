import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../../assets/lotties/general/error-lottie.json";

export default function ErrorLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return <Lottie options={defaultOptions} height={50} width={50} />;
}
