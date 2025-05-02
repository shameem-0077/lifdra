import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../../assets/lotties/chat-message-loader.json";

class MessageLoader extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {},
        };
        return (
            <div style={this.styles.overlay}>
                <div style={this.styles.modal}>
                    <div>
                        <Lottie
                            options={defaultOptions}
                            height={50}
                            width={50}
                        />
                    </div>
                </div>
            </div>
        );
    }
    styles = {
        overlay: {
            backgroundColor: "rgba(255,255,255,0.7)",
            height: "100%",
            width: "100%",
            display: "block",
            position: "absolute",
            zIndex: 3,
            top: 0,
            bottom: 0,
        },
        modal: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
            borderRadius: "10px",
        },
    };
}
export default MessageLoader;
