import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/web/green_loader.json";

class GreenButtonLoader extends React.PureComponent {
    render() {
        const { height, width } = this.props;
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: loader,
            rendererSettings: {},
        };
        return (
            <Lottie
                options={defaultOptions}
                height={height ? height : 45}
                width={width ? width : 45}
            />
        );
    }
}
export default GreenButtonLoader;
