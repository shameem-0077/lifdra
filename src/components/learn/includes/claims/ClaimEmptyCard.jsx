import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class CoinEmptyCard extends Component {
    state = {};
    render() {
        return (
            <NoDataContainer>
                <span style={this.styles.icon_container}>
                    <i className="las la-running" style={this.styles.icon}></i>
                </span>

                <h2 style={this.styles.title}>{this.props.title}</h2>
                <p style={this.styles.content}>{this.props.description}</p>
                <Link
                    // to={"/tech-schooling/"}
                    to={"/feed/"}
                >
                    <Button className="button">{"Go to dashboard"}</Button>
                </Link>
            </NoDataContainer>
        );
    }
    styles = {
        title: {
            fontSize: "18px",
            fontFamily: "baloo_paaji_2semibold",
            textAlign: "center",
            color: "#707070",
        },
        content: {
            fontSize: "15px",
            margin: "10px auto",
            color: "#acacac",
            width: "70%",
        },
        icon_container: {
            color: "green",
            fontSize: "30px",
            height: "60px",
            width: "60px",
            lineHeight: "60px",
            display: "inline-block",
            borderRadius: "50%",
            backgroundColor: "#e9fcef",
            marginBottom: "10px",
        },
        icon: {
            fontSize: "30px",
            color: "#6ce478",
        },
    };
}

const NoDataContainer = styled.div`
    padding: 50px;
    text-align: center;
    @media only screen and (max-width: 450px) {
        padding: 15px;
    }
`;
const Button = styled.small`
    color: rgb(255, 255, 255);
    padding: 15px 200px;
    background-color: rgb(107, 224, 101);
    border-radius: 5px;
    font-size: 20px;
    font-family: product_sansbold;
    display: inline-block;
    cursor: pointer;
    @media only screen and (max-width: 1320px) {
        padding: 15px 30px;
    }
    @media only screen and (max-width: 920px) {
        padding: 15px 25px;
    }
`;

export default CoinEmptyCard;
