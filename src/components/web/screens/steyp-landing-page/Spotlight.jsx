import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Spotlight = () => {
    return (
        <Contains>
            <Container className="wrapper">
                <ContentSection>
                    <Title>Creating Engineers & Tech Scientists</Title>
                    <Description>
                        Steyp ensures technology related career orientation,
                        creates placement opportunities for tech jobs and helps
                        students to become powerful tech entrepreneurs.
                    </Description>
                    <Button to="/feed/">
                        Go to dashboard{" "}
                        <span>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                alt=""
                            />
                        </span>
                    </Button>

                    <JoinNow>
                        Interested to learn technology?{" "}
                        <JoinLink to="/sat/">Apply for SAT</JoinLink>
                    </JoinNow>
                </ContentSection>
                <ImageSection className="imageSection">
                    <Mammookka>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/spotlight-mammookka.png"
                            alt="image"
                        />
                    </Mammookka>
                    <PrimaryImage>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/spotlight-background.png"
                            alt="image"
                        />
                    </PrimaryImage>
                    <SecondaryImage>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/dashboard-image.png"
                            alt=""
                        />
                    </SecondaryImage>
                </ImageSection>
                {/* </div> */}
            </Container>
        </Contains>
    );
};

export default Spotlight;
const Contains = styled.div``;
const Container = styled.div`
    padding-top: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media all and (max-width: 1040px) {
        padding-bottom: 6%;
    }
    @media all and (max-width: 1110px) {
    }
    @media all and (max-width: 980px) {
        display: flex;
        flex-wrap: wrap-reverse;
    }
    @media all and (max-width: 768px) {
        padding-top: 80px;
    }
    @media all and (max-width: 640px) {
        padding-top: 60px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 2%;
        padding-top: 45px;
        width: 92% !important;
    }
`;
const ContentSection = styled.div`
    max-width: 550px;
    @media all and (max-width: 980px) {
        margin-top: 0px;
        order: 2;
    }
`;
const Title = styled.h1`
    font-size: 44px;
    font-family: gordita_medium;
    color: #212121;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        bottom: -100px;
        right: -100px;
        width: 300px;
        height: 300px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/color.png")
            no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        @media all and (max-width: 768px) {
            display: none;
        }
    }
    span {
        color: #0fa76f;
    }
    @media all and (max-width: 1280px) {
        font-size: 40px;
        max-width: 92%;
    }
    @media all and (max-width: 1280px) {
        font-size: 36px;
    }
    @media all and (max-width: 980px) {
        font-size: 38px;
        max-width: 90%;
    }
    @media all and (max-width: 768px) {
        max-width: 80%;
        font-size: 34px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
        margin-top: 0px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        max-width: 77%;
    }
    @media all and (max-width: 360px) {
        font-size: 26px;
    }
`;
const Description = styled.p`
    margin: 30px 0 40px;
    position: relative;
    @media all and (max-width: 980px) {
        font-size: 18px;
    }
    @media all and (max-width: 768px) {
        font-size: 16px;
        margin: 20px 0 30px;
        max-width: 80%;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 15px 0;
        max-width: 90%;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Button = styled(Link)`
    background-color: #0fa76f;
    font-size: 16px;
    color: #ffffff;
    font-family: gordita_medium;
    height: 50px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: all 0.4s ease;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 220px;
        span {
            width: 20px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        height: 50px;
        width: 250px;
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
        height: 40px;
        width: 200px;
    }
    @media all and (max-width: 480px) {
        margin-top: 30px;
        font-size: 14px;
        position: relative;
        z-index: 5;
    }
`;
const JoinNow = styled.p`
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;

    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        display: block;
        margin-top: 51px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const JoinLink = styled(Link)`
    color: #0fa76f;
    font-family: gordita_medium;
    margin-left: 10px;
    transform: translateY(1px);
    font-size: 16px;
    @media all and (max-width: 640px) {
        font-size: 14px;
        margin-left: 10px;
    }
    @media all and (max-width: 480px) {
        display: block;
        margin-left: 0px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const ImageSection = styled.div`
    position: relative;

    @media all and (max-width: 980px) {
        order: 1;
        margin-top: -80px;
        div {
            margin: 0;
        }
        img {
            width: 100%;
            margin-left: 0;
        }
    }
    @media all and (max-width: 640px) {
        margin-top: -50px;
    }
    @media all and (max-width: 480px) {
        margin-top: -56%;
        margin-left: 20%;
    }
    @media all and (max-width: 420px) {
        margin-top: -57%;
    }
`;
const Mammookka = styled.div`
    position: absolute;
    margin-right: 0%;
    right: -54px;
    width: 115%;

    bottom: -19%;
    z-index: 2;

    img {
        width: 100%;
        display: block;
        margin-left: 0%;
        @media all and (max-width: 480px) {
            margin-left: unset;
        }
    }
    @media all and (max-width: 1040px) {
        bottom: -32%;
    }

    @media all and (max-width: 980px) {
        width: 100%;
        right: -120px;
    }
    @media all and (max-width: 768px) {
        right: -105px;
    }
    @media all and (max-width: 640px) {
        right: -75px;
    }
    @media all and (max-width: 480px) {
        width: 88%;
        bottom: -20%;
        right: -40px;
    }
    @media all and (max-width: 460px) {
        width: 93%;
        bottom: -20%;
        right: -40px;
    }
`;

const PrimaryImage = styled.div`
    img {
        display: block;

        width: 137%;
        margin-left: -12%;
    }
    @media all and (max-width: 1550px) {
        margin-right: -18.5%;
        margin-top: -13%;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const SecondaryImage = styled.div`
    display: none;
    z-index: 1;
    opacity: 0.2;

    @media all and (max-width: 980px) {
        display: block;
    }
    @media all and (max-width: 480px) {
        margin-left: -4%;
        width: 130%;
    }
`;
