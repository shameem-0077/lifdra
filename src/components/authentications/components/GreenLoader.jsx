import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/web/green2_loader.json";

class GreenLoader extends React.PureComponent {
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
        height={this.props.height ? this.props.height : 120}
        width={this.props.width ? this.props.width : 120}
      />
    );
  }
}
export default GreenLoader;
