import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../../axiosConfig";

const MemberShipFee = ({ type }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        learnConfig.get(`subscriptions/plan-category/`).then((response) => {
            let { StatusCode, data } = response.data;
            if (StatusCode === 6000) {
                setPlans(data.filter((item) => item.name === type));
            }
        });
    };

    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            {" "}
            <Title>
                <span></span>Membership Fee
            </Title>
            <Description>
                <span>Upload your valid student ID card </span>and get
                <small> 50%</small> off on your package
            </Description>
            <CardSection>
                {plans.map((data) =>
                    data.plans.map((plan) => (
                        <Card key={plan.id}>
                            <TopSection>
                                <Icon>
                                    <img
                                        src={
                                            plan.days === 30
                                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2021/1-month.svg"
                                                : plan.days === 90
                                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/3-months.svg"
                                                : plan.days === 180
                                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/6-months.svg"
                                                : plan.days === 365
                                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/1-year.svg"
                                                : null
                                        }
                                        alt="icon"
                                    />
                                </Icon>
                                <Period>
                                    {plan.days === 30
                                        ? "1 Month"
                                        : plan.days === 90
                                        ? "3 Months"
                                        : plan.days === 180
                                        ? "6 Months"
                                        : plan.days === 365
                                        ? "1 Year"
                                        : null}
                                </Period>
                            </TopSection>
                            <PriceSection>
                                <Label>offer price</Label>
                                <DiscountPrice>
                                    ₹{" "}
                                    {(
                                        (plan.coins * plan.coin_value) /
                                        2
                                    ).toLocaleString()}
                                </DiscountPrice>
                                <Price>
                                    ₹{" "}
                                    {(
                                        plan.coins * plan.coin_value
                                    ).toLocaleString()}
                                </Price>
                                <Terms>* Terms and conditions apply</Terms>
                            </PriceSection>
                        </Card>
                    ))
                )}
            </CardSection>
        </Container>
    );
};

export default MemberShipFee;
const Container = styled.div`
    padding: 140px 0;
    @media all and (max-width: 1280px) {
        padding: 120px 0;
    }
    @media all and (max-width: 640px) {
        padding: 100px 0;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0;
    }
    @media all and (max-width: 360px) {
        padding: 40px 0;
    }
`;
const Title = styled.h3`
    font-size: 34px;
    color: #2d2d2d;
    text-align: center;
    font-family: gordita_medium;
    position: relative;
    margin-bottom: 25px;
    span {
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: -60px;
            left: -70px;
            width: 200px;
            height: 200px;
            opacity: 0.6;
            background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/color.png")
                no-repeat;
            background-size: 200px;
            background-position: center;
            display: block;
            z-index: -1;
        }
    }

    @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 15px;
    }
`;
const Description = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 0 auto;
    color: #666666;
    /* margin-bottom: 50px; */
    max-width: 550px;
    span {
        font-size: inherit;
        position: relative;
        color: #666666;

        &::before {
            content: "";
            position: absolute;
            top: 18px;
            right: 0;
            width: 100%;
            height: 20px;
            background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
                no-repeat;
            background-size: contain;
            display: block;
            z-index: -1;
        }
    }
    small {
        color: #0fa76f;
        font-family: gordita_medium;
        font-size: 16px;
    }
    @media all and (max-width: 1280px) {
        font-size: 15px;
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
        line-height: 30px;
        small {
            font-size: 14px;
        }
    }
`;
const CardSection = styled.div`
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 -15px;
    margin-top: 40px;
    @media screen and (max-width: 1100px) {
        /* grid-gap: 25px; */
    }
    @media all and (max-width: 980px) {
        /* flex-wrap: wrap;
        grid-gap: 0; */
    }
`;
const Card = styled.div`
    padding: 30px 50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    width: calc(33% - 30px);
    margin: 0 15px;
    margin-bottom: 30px;
    @media all and (max-width: 1100px) {
        padding: 20px 30px;
    }
    @media all and (max-width: 980px) {
        width: calc(50% - 40px);
        margin: 0 20px 40px;
        /* &:first-child {
            margin-left: 0;
        }
        &:nth-child(2n) {
            margin-right: 0;
        }
        &:last-child {
            margin: 0; */
    }
    @media all and (max-width: 786px) {
        width: calc(50% - 30px);
        margin: 0 15px 30px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
        max-width: 350px;
        margin: 0 0 30px;
    }
`;
const TopSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px dashed #00000014;
`;
const Icon = styled.span`
    width: 50px;
    display: block;
    margin-right: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        width: 40px;
    }
`;
const Period = styled.p`
    font-size: 24px;
    font-family: gordita_medium;
    color: #383f50d9;
    transform: translateY(4px);
    @media all and (max-width: 1100px) {
        font-size: 22px;
    }
    @media all and (max-width: 360px) {
        font-size: 20px;
    }
`;
const PriceSection = styled.div`
    padding: 30px 0 20px;
    text-align: center;
    @media all and (max-width: 1100px) {
        padding: 25px 0 10px;
    }
`;
const Label = styled.p`
    text-transform: capitalize;
    color: #0fa76f;
    font-family: gordita_medium;
    font-size: 14px;
`;
const DiscountPrice = styled.h4`
    font-size: 34px;
    font-family: gordita_bold;
    color: #0fa76f;
    margin-bottom: 10px;
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 360px) {
        font-size: 30px;
    }
`;
const Price = styled.p`
    font-size: 22px;
    font-family: gordita_medium;
    color: #383f50;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 100%;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/green-line.svg")
            no-repeat;
        background-size: 110px;
        background-position: center;
        display: block;
        z-index: 0;
    }

    @media all and (max-width: 360px) {
        font-size: 18px;
    }
`;
const Terms = styled.p`
    color: #373e4f;
    font-size: 10px;
    font-family: gordita_medium;
`;
