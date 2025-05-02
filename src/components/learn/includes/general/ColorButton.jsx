import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class ColorButton extends React.PureComponent {
    state = {};
    render() {
        return (
            <Button to="/coins/" className="color_button">
                {this.props.title}
            </Button>
        );
    }
    styles = {
        color_button: {
            backgroundColor: this.props.backgroundColor,
            color: "#fff",
            fontFamily: "baloo_paaji_2semibold",
            display: "inline-block",
            padding: "1.10rem 2rem",
            borderRadius: "0.625rem",
            fontSize: "12px",
        },
    };
}

const Button = styled(Link)`
    background-color: rgb(251, 192, 45);
    color: #fff;
    font-family: baloo_paaji_2semibold;
    display: inline-block;
    padding: 14px 21px;
    border-radius: 0.625rem;
    font-size: 12px;
    @media only screen and (max-width: 650px) {
        padding: 14px;
    }
    @media only screen and (max-width: 650px) {
        font-size: 9px;
    }
    @media only screen and (max-width: 540px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 420px) {
        font-size: 14px;
    }
`;

export default ColorButton;
