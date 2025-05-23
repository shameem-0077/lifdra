import React from "react";
import Lottie from "react-lottie";
import Loader from "./Loader";

export default function ButtonLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loader,
        rendererSettings: {},
    };
    return <Lottie options={defaultOptions} height={35} width={35} />;
}
