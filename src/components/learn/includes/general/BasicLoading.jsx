import React from "react";
import animationData from "../../../../assets/lotties/tech-schooling/page-loader.json";
import styled from "styled-components";
import Lottie from "react-lottie";

class BasicLoading extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {},
        };
        if (!this.props.show) {
            return null;
        }
        return (
            <div style={this.styles.overlay}>
                <div style={this.styles.modal}>
                    <div>
                        <LogoImage
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp/steyp1.gif"
                            alt="Steyp"
                        />
                    </div>
                </div>
            </div>
        );
    }
    styles = {
        overlay: {
            backgroundColor: "rgba(255,255,255)",
            height: "100%",
            width: "100%",
            display: "block",
            position: "absolute",
            zIndex: 101,
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
export default BasicLoading;

const LogoImage = styled.img`
    display: block;
    width: 100px;
    @media (max-width: 980px) {
        width: 90px;
    }
`;
