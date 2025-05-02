import React, { Component } from "react";
import ColorButton from "./ColorButton";
import styled from "styled-components";

class CoinAlertCard extends Component {
    render() {
        return (
            <Container className="CoinAlert">
                <ImageCont>
                    <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/no-coin.png" />
                </ImageCont>
                <Heading>You have no coins left</Heading>
                <Paragraph>
                    Update your coin wallet to access more activities.
                </Paragraph>
                <ColorButton title="+ Add Coins" backgroundColor="#FBC02D" />
            </Container>
        );
    }
    styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #cacaca",
            marginRight: "8%",
            borderRadius: "8px",
            padding: "10px",
        },
        card_image: {
            display: "block",
            width: "12%",
        },
        heading_style: {
            fontSize: "22px",
            display: "block",
            color: "#263238",
            margin: "20px 0",
        },
        para_style: {
            color: "#78909C",
            width: "50%",
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
        },
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #cacaca;
    border-radius: 8px;
    padding: 22px 0;
`;

const ImageCont = styled.div`
    width: 11%;
    @media only screen and (max-width: 980px) {
        width: 16%;
    }
`;
const Image = styled.img`
    width: 100%;
    display: block;
    // @media only screen and (max-width: 980px) {
    //     grid-template-columns: repeat(1, 1fr);
    // }
`;
const Heading = styled.h1`
    font-size: 22px;
    display: block;
    color: #263238;
    margin: 12px 0;
    @media only screen and (max-width: 980px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 780px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 700px) {
        font-size: 19px;
        margin: 10px 0;
    }
`;
const Paragraph = styled.p`
    color: #78909c;
    width: 50%;
    display: block;
    text-align: center;
    margin-bottom: 12px;

    @media only screen and (max-width: 1200px) {
        width: 70%;
    }
    @media only screen and (max-width: 880px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 980px) {
        width: 80%;
    }
`;

export default CoinAlertCard;
