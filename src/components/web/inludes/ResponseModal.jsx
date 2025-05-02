import React from "react";
import styled from "styled-components";
import auth from "../../routing/auth";
import { useNavigate } from "react-router-dom";

export default function ResponseModal({ isResponseModal, setResponseModal }) {
    const navigate = useNavigate();

    const direction = () => {
        auth.isAuthenticated()
            ? navigate("/feed/")
            : navigate("/");
    };
    return (
        <>
            <Overlay className={isResponseModal ? "active" : ""}></Overlay>
            <Container className={isResponseModal ? "active" : ""}>
                <FormContainer>
                    <TopHead>
                        <Left>
                            <Img>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-05-2022/checked-icon.svg"
                                    }
                                    alt="icon"
                                />
                            </Img>
                            <H5>Application Submitted</H5>
                        </Left>

                        <Close onClick={() => setResponseModal(false)}>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/close.svg"
                                }
                                alt="Close"
                            />
                        </Close>
                    </TopHead>
                    <Bottom>
                        <Description>
                            Thank you! Your application is submitted, our
                            executives will get back to you soon.
                        </Description>
                        <ButtonConatiner>
                            <Submit
                                onClick={() => {
                                    setResponseModal(false);
                                    direction();
                                }}
                            >
                                Continue
                            </Submit>
                        </ButtonConatiner>
                    </Bottom>

                    <LightBanner></LightBanner>
                    <DarkBanner></DarkBanner>
                </FormContainer>
            </Container>
        </>
    );
}

const Left = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 15px;
`;
const Img = styled.div`
    width: 45px;
    height: 45px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 640px) {
        width: 37px;
        height: 37px;
    }
    @media all and (max-width: 640px) {
        width: 30px;
        height: 30px;
    }
`;
const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: ease-in-out 0.2s;

    &.active {
        opacity: 1;
        visibility: visible;
    }
`;
const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.5);
    &.active {
        display: block;
    }
`;
const FormContainer = styled.div`
    position: fixed;
    z-index: 1001;
    transform: scale(0);
    width: 520px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 31px 40px 45px 40px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    overflow: hidden;

    &.active {
        transform: scale(1);
    }
    @media all and (max-width: 640px) {
        width: 85%;
        padding: 25px 25px;
    }
    @media all and (max-width: 480px) {
        width: 91%;
        padding: 31px 20px 31px 20px;
    }
`;
const TopHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 2px solid #f2f2f2;
    @media all and (max-width: 480px) {
        padding-bottom: 15px;
        margin-bottom: 16px;
    }
`;
const H5 = styled.h5`
    font-size: 21px;
    font-family: gordita_medium;
    @media all and (max-width: 480px) {
        font-size: 18px;
    }
`;
const Close = styled.div`
    cursor: pointer;
    width: 18px;
    height: 18px;
    img {
        width: 100%;
        display: block;
    }
`;
const Bottom = styled.div``;

const Description = styled.p`
    color: #6c6c6c;
    font-size: 16px;
    margin-bottom: 56px;
    font-family: gordita_regular;
    & b {
        color: #4ca473;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 26px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 18px;
    }
`;
const Resend = styled.p`
    font-size: 14px;
    text-align: right;
    & b {
        color: #4ca473;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
    @media all and (max-width: 360px) {
        font-size: 10px;
    }
`;
const ButtonConatiner = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Submit = styled.div`
    padding: 12px 26px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background: transparent linear-gradient(114deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    border-radius: 5px;
    font-family: gordita_regular;
    font-size: 16px;
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const LightBanner = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    left: 0;
    bottom: 7px;
    background: #6dce9f;
`;
const DarkBanner = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    left: 0;
    bottom: 0;
    background: #529f7b;
`;
