import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import { useEffect } from "react";

function Membership() {
    const [plans, setPlans] = useState([
        {
            id: 1,
            offer_price: 500,
            price: "",
            discount: "",
            days: 30,
        },
        {
            id: 2,
            offer_price: 1300,
            price: 1500,
            discount: 200,
            days: 90,
        },
        {
            id: 3,
            offer_price: 2300,
            price: 3000,
            discount: 700,
            days: 180,
        },
        {
            id: 4,
            offer_price: 4000,
            price: 6000,
            discount: 2000,
            days: 365,
        },
    ]);
    const [selectedPlan, setSelectedPlan] = useState([]);

    // useEffect(() => {
    //     const fetchPlans = () => {
    //         serverConfig.get("subscriptions/plan-category/").then((response) => {
    //             let { status_code, data } = response.data;
    //             if (status_code === 6000) {
    //                 setPlans(data.filter((item) => item.name === "School"));
    //             }
    //         });
    //     };
    //     fetchPlans();
    // }, []);
    return (
        <Container className="wrapper">
            <Title>
                <span>Our</span>
                <br />
                Membership Fee
            </Title>
            <PlansContainer>
                {plans.map((data) => (
                    <PlanCard key={data.id}>
                        <Duration style={{ "text-align": "start" }}>
                            {data.days === 30
                                ? "1 Month"
                                : data.days === 90
                                ? "3 Months"
                                : data.days === 180
                                ? "6 Months"
                                : data.days === 365
                                ? "1 Year"
                                : null}
                        </Duration>

                        <OfferLabel
                            style={{ display: data.days === 30 && "none" }}
                        >
                            Offer Price
                        </OfferLabel>

                        <DiscountPrice>
                            &#8377; {data.offer_price.toLocaleString()}
                        </DiscountPrice>

                        <ActualPrice
                            style={{ display: data.days === 30 && "none" }}
                        >
                            &#8377;
                            {data.price.toLocaleString()}
                            <Line>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/green-line.svg"
                                    }
                                    alt=""
                                />
                            </Line>
                        </ActualPrice>

                        <DiscountLabel
                            style={{ display: data.days === 30 && "none" }}
                        >
                            &#8377; {data.discount} Off
                        </DiscountLabel>
                    </PlanCard>
                ))}
            </PlansContainer>
            <PayNow to="?action=login&next=/feed/">Subscribe Now</PayNow>
        </Container>
    );
}

export default Membership;

const Container = styled.div`
    padding: 100px 70px;
    position: relative;
    @media all and (max-width: 1280px) {
        padding: 80px 70px;
    }
    @media all and (max-width: 1100px) {
        background: #fbf6f2;
        border-radius: 30px;
    }
    @media all and (max-width: 980px) {
        padding: 70px 20px;
        background-position: left bottom;
    }
    @media all and (max-width: 640px) {
        padding: 50px 20px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 20px;
    }
    @media all and (max-width: 360px) {
        padding: 40px 10px;
        border-radius: 15px;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    color: #2d2d2d;
    text-align: center;
    margin-bottom: 80px;
    font-size: 34px;
    span {
        color: #0fa76f;
    }
    @media all and (max-width: 1280px) {
        margin-bottom: 50px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
        font-size: 24px;
    }
`;

const PlansContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -10px;
    @media all and (max-width: 1100px) {
        justify-content: center;
    }
    @media all and (max-width: 480px) {
        margin: 0 -5px;
    }
`;

const PlanCard = styled.div`
    width: calc(25% - 20px);
    background-color: #fff;
    padding: 30px;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    /* border: 2px solid transparent; */
    /* height: 100%; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    position: relative;
    transition: all 0.3s;
    /* &:hover {
        border: 2px solid #0fa76f;
    } */
    @media all and (max-width: 1100px) {
        width: calc(33% - 20px);
        margin: 0 10px;
        margin-bottom: 30px;
    }
    @media all and (max-width: 768px) {
        width: calc(50% - 20px);
        margin: 0 10px;
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        width: calc(50% - 10px);
        max-width: 250px;
        margin: 0 5px;
        margin-bottom: 15px;
        padding: 20px;
    }
    @media all and (max-width: 400px) {
        padding: 18px 12px;
    }
`;

const BackGround = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0;
    top: 0;
    border-radius: 30px;
    z-index: -1;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1280px) {
        height: 60%;
    }
    @media all and (max-width: 1100px) {
        display: none;
    }
`;

const Duration = styled.p`
    text-align: start;
    font-size: 24px;
    color: #383f50d9;
    font-family: gordita_medium;
    padding-bottom: 30px;
    border-bottom: 1px dashed #eeeeee;
    margin-bottom: 30px;
    @media all and (max-width: 640px) {
        padding-bottom: 15px;
        margin-bottom: 15px;
        font-size: 20px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 5px;
        font-size: 16px;
    }
`;

const OfferLabel = styled.p`
    font-size: 16px;
    text-align: center;
    color: #0fa76f;
    font-family: gordita_medium;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const DiscountPrice = styled.h3`
    font-size: 38px;
    text-align: center;
    color: #0fa76f;
    font-family: gordita_bold;
    position: relative;
    @media all and (max-width: 1280px) {
        font-size: 36px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
    @media all and (max-width: 360px) {
        font-size: 20px;
    }
`;

const ActualPrice = styled.p`
    text-align: center;
    font-size: 24px;
    color: #383f50;
    font-family: gordita_medium;
    position: relative;
    @media all and (max-width: 640px) {
        font-size: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;

const DiscountLabel = styled.span`
    display: block;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eb9e4c;
    color: #fff;
    font-family: gordita_medium;
    font-size: 13px;
    position: absolute;
    width: 130px;
    top: 17px;
    right: -30px;
    transform: rotate(45deg);
    @media all and (max-width: 480px) {
        height: 25px;
        top: 16px;
        right: -36px;
        font-size: 10px;
    }
    @media all and (max-width: 400px) {
        height: 20px;
        top: 22px;
        right: -35px;
    }
`;
const Selector = styled.span`
    width: 30px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    img {
        display: block;
        width: 100%;
    }
`;

const PayNow = styled(Link)`
    margin: 0 auto;
    display: block;
    width: 220px;
    height: 50px;
    color: #fff;
    font-family: gordita_medium;
    background-color: #0fa76f;
    margin-top: 80px;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 640px) {
        margin-top: 50px;
    }
    @media all and (max-width: 480px) {
        margin-top: 30px;
    }
    @media all and (max-width: 360px) {
        width: 100%;
    }
`;

const Line = styled.span`
    display: block;
    width: 100px;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%) !important;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 70px;
    }
`;
