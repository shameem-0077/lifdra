import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImage from "../../../../../../assets/images/web/close.svg";
import successImage from "../../../../../../assets/images/job-desk/success-tick.svg";
import { useDispatch } from "react-redux";

function SuccessModal({ isProfilePicSubmited, setProfilePicSubmited }) {
    return (
        <>
            <Overlay
                onClick={() => {
                    // setProfilePicSubmited(false)
                }}
            ></Overlay>
            <BackContainer>
                <Modal>
                    <TitleSection>
                        <Left>
                            <TickImage>
                                <img src={successImage} alt="Tick" />
                            </TickImage>
                            <Title>Information updated!</Title>
                        </Left>

                        <Close
                            onClick={() => {
                                setProfilePicSubmited(false);
                            }}
                        >
                            <img src={closeImage} alt="Close" />
                        </Close>
                    </TitleSection>
                    <Container>
                        <InputDescription>
                            Your profile information has been sucessfully
                            updated!
                        </InputDescription>
                    </Container>
                    <Button
                        onClick={() => {
                            setProfilePicSubmited(false);
                        }}
                    >
                        Close
                    </Button>
                </Modal>
            </BackContainer>
        </>
    );
}

export default SuccessModal;

const BackContainer = styled.div`
    position: fixed;
    transition: all 0.3s ease;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    left: 0;
    top: 0px;
    backdrop-filter: blur(4px);
    position: relative;

    &.active {
        transform: scale(1);
    }
`;
const Modal = styled.div`
    width: 700px;
    max-height: 90vh;
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 38px;
    border-radius: 10px;
    transition: all 0.4s ease;
    z-index: 101;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 550px;

    @media (max-width: 560px) {
        max-width: 400px;
    }
    @media (max-width: 450px) {
        max-width: 350px;
        padding: 35px;
    }
    @media (max-width: 390px) {
        max-width: 300px;
    }
    @media (max-width: 480px) {
        max-width: 350px;
        padding: 25px;
    }
`;
const InputDescription = styled.p`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    align-self: baseline;
    font-size: 16px;
    color: #333333;
    span {
        color: green;
    }
    p {
    }
    @media (max-width: 560px) {
        width: 100%;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const Close = styled.span`
    width: 15px;
    display: block;
    cursor: pointer;
    position: absolute;
    right: 28px;
    top: 28px;
    img {
        display: block;
        width: 100%;
    }

    @media (max-width: 480px) {
        right: 18px;
        top: 15px;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 25px;
    position: relative;
`;
const Button = styled.span`
    margin: 0px 0px 0px auto;
    font-size: 16px;
    background: #0fa76f;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    border: 1px solid #15bf81;
    color: #fff;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;

    @media (max-width: 340px) {
        font-size: 14px;
    }
`;

const TitleSection = styled.div`
    padding-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #e7e6e6;

    @media (max-width: 480px) {
        padding-bottom: 16px;
    }
`;
const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 20px;
    color: #000;

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const TickImage = styled.div`
    width: 15%;
    margin-right: 10px;

    img {
        width: 100%;
        display: block;
    }
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
