import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/tech-schooling/page-loader.json";

export default function Loader({ width, height }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return (
        <Lottie
            options={defaultOptions}
            height={height ? height : 90}
            width={width ? width : 90}
        />
    );
}
