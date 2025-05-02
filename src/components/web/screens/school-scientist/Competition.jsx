import React from "react";
import styled from "styled-components";
import BendLine from "../../../../assets/images/school-scientist/bend-line.svg";

function Competition() {
    return (
        <Cover className="wrapper">
            <Left>
                <Heading>
                    <Span>Environment Day</Span> Special Competition
                </Heading>
                <Para>
                    As part of the World Environment Day 2023, celebrated
                    annually on June 5th, with the theme <b>"Mission Life"</b> which
                    focus to encourage people to adopt sustainable lifestyle
                    exercises to safeguard the environment. The National
                    Services Scheme-NSS in association with Steyp, an initiative
                    from Talrop, is hosting <b>Greenovation.</b>
                </Para>
            </Left>
            <Right>
                <ImgContainer>
                    <img
                        src={require("../../../../assets/images/school-scientist/plant.svg")}
                        alt="Image"
                    />
                </ImgContainer>
            </Right>
        </Cover>
    );
}

export default Competition;
const Cover = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 90px 0px;
    position: relative;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 640px) {
        flex-direction: column-reverse;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
    ::after {
        content: "";
        display: inline-block;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        width: 220px;
        height: 122px;
        position: absolute;
        background-size: 100%;
        bottom: -10%;
        z-index: 2;
        right: -3%;
        background-repeat: no-repeat;
        @media all and (max-width: 1563px){
            right: -5%;
        }
        @media all and (max-width: 1380px) {
            bottom: -18%;
            right: -8%;
            z-index: 2;
            background-size: 80%;
        }
        @media all and (max-width: 1280px) {
            bottom: -14%;
        }
        @media all and (max-width: 980px) {
            bottom: -17%;
            right: -8%;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
`;
const Left = styled.div`
    width: 70%;
    @media all and (max-width: 980px) {
        width: 72%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const Heading = styled.h2`
    font-size: 28px;
    margin-bottom: 15px;
    font-family: "gordita_medium";
    @media all and (max-width: 1080px) {
        font-size: 26px;
        margin-bottom: 10px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        text-align: center;
    }
`;
const Span = styled.span`
    position: relative;
    color: #27cf23;
    font-size: 28px;
    display: inline-block;
    font-family: "gordita_medium" !important;
    @media all and (max-width: 1080px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    ::after {
        content: "";
        background-image: url(${BendLine});
        background-repeat: no-repeat;
        display: inline-block;
        width: 190px;
        position: absolute;
        left: 2%;
        top: 76%;
        height: 10px;
        /* top: 96%; */
        transform: rotate(-2deg);
        @media all and (max-width: 480px) {
            display: none;
        }
    }
`;
const Para = styled.p`
    width: 75%;
    font-size: 17px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 1080px) {
        width: 90%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const Right = styled.div`
    width: 23%;
    @media all and (max-width: 980px) {
        width: 26%;
    }
    @media all and (max-width: 640px) {
        width: 46%;
        margin-bottom: 40px;
    }
`;
const ImgContainer = styled.div`
    width: 100%;
    img {
        width: 100%;
        display: block;
    }
`;
