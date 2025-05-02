import React from "react";
import Lottie from "react-lottie";
import loader from "../../../../../assets/lotties/auth/loader_green.json";

class DropLoader extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: loader,
            rendererSettings: {},
        };
        return (
            <Lottie
                options={defaultOptions}
                height={this.props.height ? this.props.height : 35}
                width={this.props.width ? this.props.width : 35}
            />
        );
    }
}
export default DropLoader;
