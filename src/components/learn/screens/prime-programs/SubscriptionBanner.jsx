import React from "react";
import styled from "styled-components";
import left_quote from "../../../../assets/images/prime-explore/left_quote.svg";
import right_quote from "../../../../assets/images/prime-explore/right_quote.svg";
import curve_line from "../../../../assets/images/prime-explore/curve_line.svg";
import arrow_right from "../../../../assets/images/prime-explore/arrow-right.svg";
import auth from "../../../routing/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";

function SubscriptionBanner() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user_data } = useAuthStore();

    return (
        <Container
            onClick={(e) => {
                e.preventDefault();
                if (auth.isAuthenticated()) {
                    navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                } else {
                    navigate(`${location.pathname}?action=login`);
                }
            }}
        >
            <LeftQuote src={left_quote} alt="Quote" />
            <RightQuote src={right_quote} alt="Quote" />
            <CurveLine src={curve_line} alt="Curve" />
            <Content>
                <Title>Get access to all courses</Title>
                <Description>
                    Subscribe to Prime Programs and get access to all courses
                </Description>
                <Button>
                    <ButtonText>Subscribe Now</ButtonText>
                    <ArrowRight src={arrow_right} alt="Arrow" />
                </Button>
            </Content>
        </Container>
    );
}

export default SubscriptionBanner;

const Container = styled.div`
    position: relative;
    background-color: #f9f9fb;
    border-radius: 5px;
    padding: 40px;
    cursor: pointer;
    margin-bottom: 20px;
`;

const LeftQuote = styled.img`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 30px;
`;

const RightQuote = styled.img`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 30px;
`;

const CurveLine = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    opacity: 0.1;
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
`;

const Title = styled.h3`
    font-size: 24px;
    font-family: "gordita_medium";
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #585858;
    margin-bottom: 20px;
`;

const Button = styled.div`
    display: inline-flex;
    align-items: center;
    background-color: #15bf81;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
`;

const ButtonText = styled.span`
    font-size: 16px;
    color: #fff;
    font-family: "gordita_medium";
    margin-right: 10px;
`;

const ArrowRight = styled.img`
    width: 20px;
`;
