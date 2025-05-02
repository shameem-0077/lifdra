import React, { Component } from "react";
import styled from "styled-components";

class PreviousSupportEmpty extends Component {
    render() {
        return (
            <div
                className="Previous-support-request-empty"
                style={this.styles.previous_support_empty}
            >
                <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support-empty.svg"
                    alt=""
                    style={this.styles.previous_support_empty_image}
                />
                <Title>
                    No previous <br /> Support Requests
                </Title>
                <Description style={this.styles.previous_support_empty_content}>
                    All your previous support requests will appear here
                </Description>
            </div>
        );
    }
    styles = {
        previous_support_empty: {
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            padding: "10% 5%",
        },
        previous_support_empty_image: {
            display: "block",
            margin: "0 auto",
            width: "30%",
        },
        previous_support_empty_title: {
            fontSize: "25px",
            margin: "8px 0",
            lineHeight: "33px",
            letterSpacing: "0.003rem",
        },
        previous_support_empty_content: {
            color: "#9a9a9a",
        },
    };
}

const Title = styled.h3`
    font-size: 25px;
    margin: 8px 0px;
    line-height: 33px;
    letter-spacing: 0.003rem;
    @media (max-width: 1300px) {
        font-size: 22px;
        line-height: 30px;
    }
    @media (max-width: 1074px) {
        font-size: 19px;
        line-height: 26px;
    }
`;
const Description = styled.p`
    @media (max-width: 1100px) {
        font-size: 15px;
    }
`;

export default PreviousSupportEmpty;
