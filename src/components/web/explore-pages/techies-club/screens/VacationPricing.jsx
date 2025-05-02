import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";

function VacationPricing() {
    const location = useLocation();
    const history = useHistory();
    const [plan, setPlans] = useState([]);
    const monthypoints = [
        { id: 1, point: "Rs 10/day" },
        { id: 2, point: "Learn in Malayalam" },
        { id: 3, point: "Study at anytime anywhere" },
        { id: 4, point: "Learning with no limits" },
        { id: 5, point: "Become a website developer" },
    ];

    return (
        <Container className="wrapper">
            <Title>
                <span>Our Membership Fee</span>
            </Title>
            <OfferTag>
                <img
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/offer.svg"
                    }
                    alt="Image"
                />
            </OfferTag>
            <Description>
                2 months vacation course at the rate of Rs 10/day
            </Description>
            <SubcriptionPlanDetails>
                <LeftSection>
                    {monthypoints.map((data) => (
                        <DetailPoints key={data.id}>
                            <Tick>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/blue-tick.svg"
                                    }
                                    alt=""
                                />
                            </Tick>
                            <span>{data.point}</span>
                        </DetailPoints>
                    ))}
                </LeftSection>
                <RightSection>
                    <Price>
                        <span>&#x20b9;600</span>
                        <br />
                        <small>Rs 10/day</small>
                    </Price>

                    <BuyNow
                        onClick={() => {
                            if (auth.isAuthenticated()) {
                                history.push({
                                    pathname: location.pathname,
                                    search: "?action=vacation-plans",
                                });
                            } else {
                                history.push({
                                    pathname: location.pathname,
                                    search: `?action=login&next=/mlp/vacation-program/?action=vacation-plans`,
                                });
                            }
                        }}
                    >
                        Subscribe Now
                    </BuyNow>
                </RightSection>
            </SubcriptionPlanDetails>
            <BottomCircle>
                <span></span>
            </BottomCircle>
        </Container>
    );
}

export default VacationPricing;

const Container = styled.div`
    margin-top: 20px;
    padding: 100px 0;
    background-color: #131c59;
    border-radius: 30px;
    position: relative;
    @media all and (max-width: 768px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 70px 0;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0 30px;
    }
    @media all and (max-width: 360px) {
        padding: 40px 0 30px;
    }
`;

const Title = styled.div`
    font-family: gordita_medium;
    font-size: 34px;
    margin-bottom: 10px;
    text-align: center;
    color: #fff;
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 360px) {
        margin-top: 10px;
    }
`;
const OfferTag = styled.div`
    position: absolute;
    top: -10%;
    left: 4%;
    width: 250px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 980px) {
        width: 200px;
        top: -8%;
    }
    @media all and (max-width: 768px) {
        width: 200px;
        top: -6%;
    }
    @media all and (max-width: 380px) {
        width: 180px;
    }
`;

const Description = styled.p`
    max-width: 600px;
    margin-bottom: 30px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 40px;
    color: #fff;

    @media all and (max-width: 980px) {
        font-size: 15px;
        width: 80%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 15px;
        width: 90%;
    }
`;

const SelectionButton = styled.span`
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 2px;
    margin: 0 20px;
    background-color: #2334a7;
    border-radius: 15px;
    position: relative;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    span {
        transition: all 0.3s ease-in-out;
        display: block;
        height: 24px;
        width: 24px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 3px;
        left: ${(props) => (props.selectedPlan === "yearly" ? "33px" : "3px")};
    }
    @media all and (max-width: 480px) {
        width: 50px;
        height: 24px;
        span {
            height: 18px;
            width: 18px;
            left: ${(props) =>
                props.selectedPlan === "yearly" ? "29px" : "3px"};
        }
    }
`;

const Selection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-family: gordita_medium;
        color: #fff;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        &.active {
            color: #4ca473 !important;
        }
    }
    &.active {
        color: "#4CA473";
    }
    @media all and (max-width: 480px) {
        span {
            font-size: 16px;
        }
    }
`;

const SubcriptionPlanDetails = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20px;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 20px;
    width: 80%;
    max-width: 900px;
    @media all and (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }
    @media all and (max-width: 480px) {
        width: 90%;
    }
`;

const LeftSection = styled.div`
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media all and (max-width: 980px) {
        margin-left: 0;
    }
    @media all and (max-width: 768px) {
        order: 2;
    }
`;
const RightSection = styled.div`
    background: rgba(105, 117, 195, 0.3);
    padding: 30px 40px;
    flex: 1;
    border-radius: 16px;
    margin-left: 60px;
    @media all and (max-width: 980px) {
        max-width: 47%;
        margin-left: 20px;
        padding: 20px 20px;
    }
    @media all and (max-width: 768px) {
        order: 1;
        max-width: 100%;
        padding: 30px 40px;
        margin-left: 0px;
    }
    @media all and (max-width: 640px) {
        padding: 20px 30px;
    }
    @media all and (max-width: 480px) {
        padding: 20px 20px;
    }
`;
const DetailPoints = styled.span`
    display: flex;
    margin-bottom: 15px;
    color: #212121;
    &:last-child {
        margin-bottom: 0;
    }
    span {
        font-size: 16px;
        font-family: gordita_medium;
    }
    @media all and (max-width: 980px) {
        font-size: 15px;
    }
    @media all and (max-width: 640px) {
        span {
            font-size: 14px;
            font-family: gordita_medium;
        }
    }
`;
const Tick = styled.span`
    display: block;
    width: 20px;
    margin-right: 15px;
    min-width: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        margin-right: 10px;
    }
`;

const Price = styled.span`
    font-family: gordita_medium;

    display: block;
    span {
        font-size: 40px;
    }
    small {
        font-size: 20px;
        color: #212121;
        font-family: "gordita_regular";
    }
    @media all and (max-width: 980px) {
        span {
            font-size: 28px;
        }
        font-size: 16px;
    }
    @media all and (max-width: 768px) {
        span {
            font-size: 38px;
        }
        font-size: 20px;
    }
    @media all and (max-width: 640px) {
        span {
            font-size: 34px;
        }
        small {
            font-size: 16px;
        }
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        span {
            font-size: 28px;
        }
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        span {
            font-size: 23px;
        }
        font-size: 15px;
    }
`;

const Off = styled.span`
    display: block;
    font-size: 20px;
    font-family: gordita_medium;
    color: #212121;
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 768px) {
        font-size: 18px;
    }
    @media all and (max-width: 640px) {
        font-size: 16px;
    }
`;

const BuyNow = styled.div`
    display: block;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2334a7;
    border: 2px solid transparent;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 30px;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #2334a7;
        background-color: #fff;
        border: 2px solid #2334a7;
    }
    @media all and (max-width: 980px) {
        height: 50px;
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        height: 45px;
        font-size: 15px;
    }
`;

const BottomCircle = styled.span`
    display: block;
    position: absolute;
    width: 160px;
    height: 160px;
    border: 40px solid #fff;
    background-color: #eb9e4b;
    left: -40px;
    bottom: -40px;
    border-radius: 50%;
    @media all and (max-width: 980px) {
        width: 130px;
        height: 130px;
        border: 40px solid #fff;
    }
    @media all and (max-width: 980px) {
        width: 100px;
        height: 100px;
        border: 20px solid #fff;
        left: -20px;
        bottom: -20px;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;

const Sphere = styled.span`
    position: absolute;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #eb9e4b;
    top: 50px;
    right: 50px;
    opacity: 0.2;
    span {
        top: 100px;
        right: 100px;
        width: 70px;
        height: 70px;
    }
    @media all and (max-width: 980px) {
        width: 80px;
        height: 80px;
        span {
            top: 70px;
            right: 70px;
            width: 50px;
            height: 50px;
        }
    }
    @media all and (max-width: 480px) {
        width: 60px;
        height: 60px;
        span {
            top: 70px;
            right: 70px;
            width: 40px;
            height: 40px;
        }
    }
`;
