import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function VacationBanner() {
    return (
        <MainContainer className="wrapper">
            <Container>
                <BannerImg
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/banner.png"
                    }
                    alt="Image"
                />
                <BannerImgResponsive
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/banner-resp.png"
                    }
                    alt="Image"
                />
                <BannerImgMobile
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/banner-mobile.png"
                    }
                    alt="Image"
                />
                <Shapes>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/circle-shades.svg"
                        }
                        alt="image"
                    />
                </Shapes>
                <ButtonSection>
                    <Button to="/mlp/vacation-program/">Join Now</Button>
                    <EnquiryButton href="tel:+91 858 999 8874" type="phone">
                        <small>For Enquiry</small>
                        <p> 91 858 999 8874</p>
                    </EnquiryButton>
                </ButtonSection>
            </Container>
        </MainContainer>
    );
}

export default VacationBanner;

const MainContainer = styled.div`
    position: relative;
`;
const Container = styled.div`
    @media all and (max-width: 1180px) {
        margin-top: 50px;
        display: block;
    }
    @media all and (max-width: 1180px) {
        margin-top: 50px;
    }
`;
const BannerImg = styled.img`
    width: 100%;
    display: block;
    border-radius: 18px;
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const BannerImgResponsive = styled.img`
    display: none;
    @media all and (max-width: 980px) {
        width: 100%;
        display: block;
        border-radius: 18px;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const BannerImgMobile = styled.img`
    display: none;
    @media all and (max-width: 480px) {
        width: 100%;
        display: block;
        border-radius: 18px;
    }
`;

const Shapes = styled.span`
    display: block;
    width: 150px;
    position: absolute;
    right: -70px;
    bottom: -25px;
    z-index: -100;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        width: 120px;
        right: -50px;
    }
    @media all and (max-width: 680px) {
        width: 90px;
        right: -35px;
    }
    @media all and (max-width: 480px) {
        width: 60px;
        right: -25px;
        bottom: -15px;
    }
    @media all and (max-width: 340px) {
        display: none !important;
    }
`;
const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 48%;
    right: 26.5%;
    @media all and (max-width: 1180px) {
        top: 46%;
    }
    @media all and (max-width: 1040px) {
        top: 44%;
    }
    @media all and (max-width: 980px) {
        top: 70%;
        left: 8%;
    }
    @media all and (max-width: 880px) {
        top: 70%;
        left: 7%;
    }
    @media all and (max-width: 740px) {
        top: 66%;
        left: 7%;
    }
    @media all and (max-width: 540px) {
        top: 65%;
        left: 7%;
    }
    @media all and (max-width: 480px) {
        flex-direction: column;
        top: 64%;
        left: -15%;
    }
    @media all and (max-width: 380px) {
        top: 62%;
        left: -15%;
    }
`;
const Button = styled(Link)`
    width: 160px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #ffff;
    color: #2334a7;
    font-family: gordita_medium;
    margin-right: 8px;
    cursor: pointer;
    font-size: 16px;
    @media all and (max-width: 1320px) {
        height: 45px;
    }
    @media all and (max-width: 980px) {
        height: 50px;
    }
    @media all and (max-width: 640px) {
        height: 45px;
        width: 145px;
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        margin-right: 0px;
        font-size: 14px;
        margin-bottom: 10px;
    }
`;
const EnquiryButton = styled.a`
    width: 160px;
    height: 50px;
    border-radius: 8px;
    background-color: #f3f9eb;
    border: 2px solid #eb9e4b;
    font-family: gordita_medium;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 12px;
    small {
        color: #2334a7;
        font-size: 12px;
        padding-top: 3px;

        font-family: "gordita_regular";
        @media all and (max-width: 640px) {
            font-size: 10px;
        }
    }
    p {
        color: #2334a7;
        font-size: 14px;
        margin-top: -2px;
        font-family: "gordita_medium" !important;
        @media all and (max-width: 640px) {
            font-size: 12px;
            margin-top: 1px;
        }
    }
    @media all and (max-width: 1320px) {
        height: 45px;
    }
    @media all and (max-width: 980px) {
        height: 50px;
    }
    @media all and (max-width: 640px) {
        height: 45px;
        width: 145px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
