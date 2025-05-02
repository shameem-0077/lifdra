import React from "react";
import styled from "styled-components";

import auth from "../../../../routing/auth";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function SubscriptionBanner() {
    const location = useLocation();
    const history = useHistory();
    const user_profile = useSelector((state) => state.user_profile);

    return (
        <Cover>
            <Container className="wrapper">
                <ContentSection>
                    <Title>
                        Enjoy the benefits of our &#160;
                        <span> Subscription&#160;offer</span>
                    </Title>
                    <Description>
                        Prime Program offers a wide range of courses to enhance
                        your skills in different areas of technology. Grab our
                        monthly subscription plan and get access to all of these
                        courses.
                    </Description>
                    <Price>
                        <span>&#x20b9;500 </span>/month
                    </Price>
                </ContentSection>
                {user_profile.length > 0 ? (
                    user_profile.prime_program_subscription.is_subscription &&
                    !user_profile.prime_program_subscription.is_expired ? (
                        <SubscribeButton
                            onClick={(e) => {
                                history.push({
                                    pathname: `/prime-programs/courses/`,
                                });
                            }}
                        >
                            Continue
                        </SubscribeButton>
                    ) : (
                        <SubscribeButton
                            onClick={(e) => {
                                e.preventDefault();
                                if (auth.isAuthenticated()) {
                                    history.push({
                                        pathname: `/prime-programs/courses/`,
                                        search: `?action=subscribe-prime-programs`,
                                    });
                                } else {
                                    history.push({
                                        pathname: location.pathname,
                                        search: `?action=login&next=${location.pathname}`,
                                    });
                                }
                            }}
                        >
                            Subscribe Now
                        </SubscribeButton>
                    )
                ) : (
                    <SubscribeButton
                        onClick={(e) => {
                            e.preventDefault();
                            if (auth.isAuthenticated()) {
                                history.push({
                                    pathname: `/prime-programs/courses/`,
                                    search: `?action=subscribe-prime-programs`,
                                });
                            } else {
                                history.push({
                                    pathname: location.pathname,
                                    search: `?action=login`,
                                });
                            }
                        }}
                    >
                        Subscribe Now
                    </SubscribeButton>
                )}
                <Sphere></Sphere>
                <MultiSphere>
                    <MultiSphere></MultiSphere>
                </MultiSphere>
            </Container>
        </Cover>
    );
}

export default SubscriptionBanner;

const Cover = styled.div`
    margin: 50px 0;
    background-color: #003c3c;
    overflow: hidden;
    @media all and (max-width: 768px) {
        margin: 20px 0;
    }
    @media all and (max-width: 640px) {
        margin: 0;
    }
`;
const MultiSphere = styled.span`
    position: absolute;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #c0e3bd;
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
const Container = styled.div`
    padding: 70px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media all and (max-width: 980px) {
        padding: 50px 20px;
    }
    @media all and (max-width: 640px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }
    @media all and (max-width: 480px) {
        padding: 30px 10px;
    }
`;

const ContentSection = styled.div``;
const Title = styled.h3`
    position: relative;
    font-size: 26px;
    font-family: gordita_medium;
    display: inline-block;
    color: #fff;
    span {
        color: #4ca473;
        position: relative;
        display: inline-block;
        &::after {
            content: "";
            display: block;
            width: 20px;
            height: 20px;
            background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/right_quote.svg")
                no-repeat;
            background-size: contain;
            position: absolute;
            bottom: 6px;
            right: -25px;
        }
    }
    &::before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/left_quote.svg")
            no-repeat;
        background-size: contain;
        position: absolute;
        top: -15px;
        left: -20px;
    }

    @media all and (max-width: 980px) {
        font-size: 20px;
        &::before,
        ::after {
            width: 10px;
        }
        &::before {
            top: -8px;
            left: -10px;
        }
        span {
            ::after {
                bottom: 6px;
                right: -15px;
                width: 10px;
            }
        }
    }
    @media all and (max-width: 360px) {
        font-size: 19px;
    }
`;
const Description = styled.p`
    max-width: 700px;
    font-size: 18px;
    color: #fff;
    opacity: 0.8;
    width: 80%;
    @media all and (max-width: 980px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        width: 90%;
    }
`;
const Price = styled.p`
    font-size: 20px;
    font-family: gordita_medium;
    color: #fff;
    margin-top: 40px;
    display: inline-block;
    position: relative;
    span {
        font-size: 30px;
    }
    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 30px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/curve_line.svg")
            no-repeat;
        background-size: contain;
        position: absolute;
        bottom: -26px;
        right: 0px;
    }
    @media all and (max-width: 980px) {
        margin-top: 30px;
    }
    @media all and (max-width: 480px) {
        margin-top: 25px;
        font-size: 18px;
    }
`;

const SubscribeButton = styled.span`
    width: 200px;
    min-width: 200px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    border: 2px solid transparent;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 9;
    &:hover {
        color: #4ca473;
        background-color: #fff;
        border: 2px solid #4ca473;
    }
    &::before {
        content: "";
        display: block;
        width: 90px;
        height: 30px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/arrow-right.svg")
            no-repeat;
        background-size: contain;
        position: absolute;
        bottom: -26px;
        left: -95px;
    }
    @media all and (max-width: 980px) {
        width: 180px;
        min-width: 180px;
        height: 50px;
        &::before {
            width: 60px;
            left: -75px;
        }
    }
    @media all and (max-width: 640px) {
        &::before {
            display: none;
        }
    }
`;

const Sphere = styled.span`
    position: absolute;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #c0e3bd;
    bottom: -70px;
    left: 0px;
`;
const BottomCircle = styled.span`
    display: block;
    position: absolute;
    width: 160px;
    height: 160px;
    border: 40px solid #fff;
    background-color: #d3ebce;
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
