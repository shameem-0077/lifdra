import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../assets/lotties/auth/loader.json";

class ModalLoader extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: loader,
            rendererSettings: {},
        };
        return <Lottie options={defaultOptions} height={30} width={30} />;
    }
}
export default ModalLoader;
