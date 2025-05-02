import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../../../assets/lotties/tech-schooling/page-loader.json";

export default function SignupLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return <Lottie options={defaultOptions} height={35} width={35} />;
}
