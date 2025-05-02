import React, { useState } from "react";
import styled from "styled-components";
import SatApplyNowSection from "../../../inludes/steyp-landing-page/sat/SatApplyNowSection";
import Backgroundi from "../../../../../assets/images/steyp-landing/Back.png";
import SpotlightVideo from "./modal/SpotlightVideo";

function NewSpotling() {
    const [isModal, setModal] = useState(false);

    return (
        <>
            <SpotlightVideo
                isModal={isModal}
                setModal={setModal}
                videoUrl={
                    "https://player.vimeo.com/external/764557363.m3u8?s=009ead661977487ee9eeb060aeeaeecd908dbf78"
                }
                videoThumnail={""}
            />

            <Container className="wrapper">
                <MainSection>
                    <LeftSection>
                        <Title>
                            Creating Computer <span>Engineers </span> & Tech
                            <span> Scientists</span>
                        </Title>
                        <Description>
                            Steyp is a Digital University for students to learn
                            and become Computer Engineers and Tech Scientists
                            irrespective of their age or educational background.
                            All that is required is the aptitude for the field.
                            <SpringArrow>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/arrow.svg"
                                    }
                                    alt=""
                                />
                            </SpringArrow>
                        </Description>
                    </LeftSection>
                    <RightSection>
                        <MainImgContiner>
                            <img
                                src={require("../../../../../assets/images/steyp-landing/Main.png")}
                                alt=""
                            />
                        </MainImgContiner>
                        <LogoContiner>
                            <img
                                src={require("../../../../../assets/images/steyp-landing/Logo.svg")}
                                alt=""
                            />
                        </LogoContiner>
                        <PlaybuttonImgContiner onClick={() => setModal(true)}>
                            {/* <a href="#"> */}
                            <img
                                src={require("../../../../../assets/images/steyp-landing/Play.png")}
                                alt=""
                            />
                            {/* </a> */}
                        </PlaybuttonImgContiner>
                    </RightSection>
                </MainSection>

                <RightSectiono>
                    <SatApplyNowSection />
                </RightSectiono>
                <ImageSection>
                    <Background
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/background.png"
                        }
                        alt="Image"
                    />
                    <ImageContainer>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-08-2022/Steyp-Day+by+Day+Dashboard.png"
                            }
                            alt="daybydayimage"
                        />
                    </ImageContainer>
                </ImageSection>
            </Container>
        </>
    );
}

export default NewSpotling;

const Container = styled.div`
    width: 85%;
    margin: 0 auto;
    padding-top: 100px;
    background-image: url(${Backgroundi});
    background-repeat: no-repeat;
    background-position: -62px 301px;
    @media all and (max-width: 980px) {
        padding-top: 60px;
    }
    @media all and (max-width: 768px) {
        padding-top: 80px;
    }
    @media all and (max-width: 640px) {
        padding-top: 60px;
    }
    /* @media all and (max-width: 380px) {
        padding-top: 40px;
    } */
`;
const LeftSection = styled.div`
    width: 48%;
    @media all and (max-width: 980px) {
        width: 100%;
        margin-bottom: 20px;
    }
`;
const MainSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 60px;
`;
const RightSection = styled.div`
    width: 48%;
    position: relative;
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;
const MainImgContiner = styled.div`
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 980px) {
        width: 90%;
        margin: 0 auto;
    }
`;
const LogoContiner = styled.div`
    position: absolute;
    width: 38%;
    bottom: 34%;
    left: 8%;
    @media all and (max-width: 1400px) {
        width: 32%;
        bottom: 36%;
        left: 9%;
    }

    @media all and (max-width: 980px) {
        width: 29%;
        bottom: 36%;
        left: 13%;
    }
    @media all and (max-width: 1280px) {
    }
    @media all and (max-width: 1110px) {
    }
    img {
        width: 100%;
        display: block;
    }
`;
const PlaybuttonImgContiner = styled.div`
    position: absolute;
    width: 19%;
    bottom: 32%;
    left: 40.3%;
    cursor: pointer;
    @media all and (max-width: 1400px) {
        bottom: 35%;
        left: 36.3%;
        width: 15%;
    }

    @media all and (max-width: 1051px) {
        bottom: 35%;
        left: 41.3%;
        width: 11%;
    }

    img {
        width: 100%;
        display: block;
    }
`;
const RightSectiono = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin-bottom: 80px; */
    @media all and (max-width: 768px) {
        margin-bottom: 45px;
    }
`;

const Title = styled.h2`
    font-size: 44px;
    font-family: gordita_medium;
    color: #2d2d2d;
    margin-bottom: 20px;
    width: 80%;

    span {
        font-family: gordita_bold;
        color: #0e9f6a;
    }

    @media all and (max-width: 1400px) {
        font-size: 42px;
        width: 100%;
    }
    @media all and (max-width: 1080px) {
        font-size: 36px;
    }
    @media all and (max-width: 980px) {
        text-align: center;
        margin: 0 auto;
        width: 75%;
        font-size: 33px;
    }
    @media all and (max-width: 768px) {
        width: 90%;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 27px;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        font-size: 25px;
        width: 100%;
    }
`;
const Description = styled.p`
    color: #707070;
    font-family: gordita_regular;
    font-size: 20px;
    line-height: 34px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    @media all and (max-width: 1400px) {
        font-size: 16px;
    }
    @media all and (max-width: 1080px) {
        font-size: 15px;
        line-height: 1.7;
    }
    @media all and (max-width: 980px) {
        text-align: center;
        margin: 0 auto;
        width: 90%;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
        width: 100%;
    }
`;
const SpotlightImageSection = styled.div`
    max-width: 1100px;
    margin: 0 auto;

    img {
        display: block;
        width: 100%;
        transform: translateX(4%);
        @media all and (max-width: 768px) {
            transform: translateX(5%);
        }
    }
    @media all and (max-width: 768px) {
        width: 88%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const SpringArrow = styled.span`
    visibility: hidden;
    display: none;
    width: 70px;
    height: 100px;
    position: absolute;
    right: -10%;
    top: -25%;
    img {
        display: block;
        width: 70px;
        height: 100px;
        position: absolute;
        right: -10%;
        top: -25%;
    }
    @media all and (max-width: 640px) {
        display: none;
    }
`;

const ImageSection = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 25px;
    img {
        width: 100%;
        display: block;
    }
`;
const Background = styled.img`
    position: absolute;
    top: -30px;
    width: 100% !important;
    max-width: 1440px !important;
    /* zoom: 9; */
    z-index: -5;
    object-fit: cover;
    display: block;
`;
const ImageContainer = styled.div`
    width: 75% !important;
    position: relative;
    display: flex;
    justify-content: center;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 95% !important;
    }
`;
