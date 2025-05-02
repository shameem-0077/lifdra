import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../../../assets/lotties/782-check-mark-success.json";
import styled from "styled-components";

export default function ResetModal({ show, isParentModal, nextPath }) {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {},
    };
    return (
        show && (
            <Overlay>
                <Container>
                    <LottieContainer>
                        <Lottie
                            options={defaultOptions}
                            height={120}
                            width="15%"
                        />
                    </LottieContainer>
                    <Text>Your password has been reset successfully</Text>
                    <Button
                        to={
                            isParentModal
                                ? `${nextPath}?action=login`
                                : "/auth/login/"
                        }
                    >
                        Login
                    </Button>
                </Container>
            </Overlay>
        )
    );
}

const Overlay = styled.div`
    background-color: rgba(255, 255, 255, 0.7);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgb(255, 255, 255);
    padding: 20px 100px 44px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 10px;
    z-index: 1000;
    @media (max-width: 480px) {
        width: 90%;
        padding: 20px 20px 44px;
    }
`;
const LottieContainer = styled.div``;
const Text = styled.h4`
    font-size: 24px;
    letter-spacing: 0.01rem;
    position: relative;
    margin-bottom: 25px;
    font-family: "gordita_medium";
    line-height: 2rem;
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
const Button = styled(Link)`
    background-color: rgb(110, 205, 94);
    padding: 12px 60px;
    display: inline-block;
    color: rgb(255, 255, 255);
    position: relative;
    border-radius: 30px;
    font-family: "gordita_regular";
    font-size: 14px;
`;
