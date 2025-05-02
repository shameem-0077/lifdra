import React from "react";
import styled from "styled-components";
import "../../../../assets/css/web/style.css";
import WebHeader from "../../inludes/general/steyp-landing-page/WebHeader";
import Footer from "../steyp-landing-page/Footer";

function DynamicProgramPlans() {
    const items = [
        {
            id: 1,
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2021/1-month.svg",
            period: "1 Month",
            price: 2500,
        },
        {
            id: 2,
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/3-months.svg",
            period: "3 Month",
            price: 6500,
            old_price: " ₹7500",
        },
        {
            id: 3,
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/6-months.svg",
            period: "6 Month",
            price: 11500,
            old_price: "₹15000",
        },
        {
            id: 4,
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/1-year.svg",
            period: "1 Year",
            price: 20000,
            old_price: "₹30000",
        },
    ];

    return (
        <>
            <WebHeader />
            <Containers>
                <MainContainer
                    className="wrapper"
                    data-aos="fade-up"
                    data-aos-once="true"
                >
                    <TopContainer>
                        <LeftContainer>
                            <Container>
                                <Name>
                                    Upgrade your learning experience with our
                                    new pricing plans
                                </Name>
                            </Container>
                        </LeftContainer>
                        <RightContainer>
                            <TopImageContainer>
                                <TopImage
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/phone.svg"
                                    alt="Top"
                                />
                            </TopImageContainer>
                        </RightContainer>
                    </TopContainer>
                    <>
                        <CardSection>
                            {items.map((item) => (
                                <Card key={item.id}>
                                    <TopSection>
                                        <Icon>
                                            <img src={item.image} alt="" />
                                        </Icon>
                                        <Period>{item.period}</Period>
                                    </TopSection>
                                    <PriceSection>
                                        <Label>offer price</Label>
                                        <DiscountPrice>
                                            ₹{item.price}
                                        </DiscountPrice>
                                        <Terms>18% GST inculded</Terms>
                                        {item.old_price && (
                                            <Price> {item.old_price}</Price>
                                        )}
                                    </PriceSection>
                                </Card>
                            ))}
                        </CardSection>
                    </>
                </MainContainer>
                <Footer />
            </Containers>
        </>
    );
}

export default DynamicProgramPlans;

const Containers = styled.div`
    /* padding: 20px 10px 0px 10px;
  @media all and (max-width: 1100px) {
    padding: 20px 10px 0px 10px;
  }
  @media all and (max-width: 640px) {
    padding: 10px 10px 0px 10px;
  } */
`;
const MainContainer = styled.div`
    min-height: calc(100vh - 300px);
    padding-top: 20px;
    @media all and (max-width: 480px) {
        padding-top: 0px;
    }
`;

const TopContainer = styled.div`
    position: relative;
    background-color: #dcf6ec;
    padding: 28px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    @media all and (max-width: 640px) {
        padding: 17px 18px;
    }
    @media all and (max-width: 480px) {
        padding: 18px 12px;
    }
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
const TopImageContainer = styled.div`
    position: absolute;
    right: 25px;
    top: 16px;
    width: 92px;
    transition: all 0.6s ease-in-out;
    @media all and (max-width: 640px) {
        right: 14px;
        top: 14px;
        width: 67px;
    }
    @media all and (max-width: 480px) {
        right: 14px;
        top: 6px;
        width: 60px;
    }
    @media all and (max-width: 360px) {
        width: 54px;
        right: 9px;
        top: 13px;
    }
`;
const TopImage = styled.img`
    width: 100%;
    display: block;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const Name = styled.h2`
    line-height: 1.5;
    margin-bottom: 7px;
    font-size: 25px;
    font-family: "gordita_medium";
    div {
        display: inline;
    }
    @media all and (max-width: 980px) {
        width: 78%;
        font-size: 21px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;

const CardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    grid-gap: 15px;
    margin-top: 42px;
    @media all and (max-width: 1150px) {
        flex-wrap: wrap;
        justify-content: space-around;
    }

    @media all and (max-width: 768px) {
        justify-content: space-between;
        margin-top: 20px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 480px) {
        grid-gap: 0px;
    }
`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 7px;
    padding: 30px 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    width: 24%;
    margin-bottom: 10px;
    border: 2px solid #56c082;

    transition: all 0.3s ease-in-out;
    &:hover {
        border: 2px solid #56c082;
    }
    @media all and (max-width: 1150px) {
        width: 31%;
    }
    @media all and (max-width: 980px) {
        padding: 25px 18px;
        width: 32%;
    }
    @media all and (max-width: 768px) {
        padding: 24px 18px;
        width: 48%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        flex-direction: row;
        height: unset;
        align-items: center;
        padding: 15px 10px;
    }
`;
const TopSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px dashed #00000014;
    @media all and (max-width: 480px) {
        border-bottom: none;
        padding-bottom: 0;
    }
`;
const Icon = styled.span`
    width: 50px;
    display: block;
    margin-right: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 540px) {
        width: 40px;
        margin-right: 15px;
    }
    @media all and (max-width: 480px) {
        width: 25px;
        margin-right: 9px;
    }
    @media all and (max-width: 360px) {
        width: 24px;
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
    @media all and (max-width: 768px) {
        font-size: 21px;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
    }
    @media all and (max-width: 360px) {
        font-size: 11px;
    }
`;
const PriceSection = styled.div`
    padding: 30px 0 20px;
    text-align: center;
    @media all and (max-width: 1100px) {
        padding: 25px 0 10px;
    }
    @media all and (max-width: 480px) {
        padding: unset;
    }
`;
const Label = styled.p`
    text-transform: capitalize;
    color: #0fa76f;
    font-family: gordita_medium;
    font-size: 14px;
    @media all and (max-width: 480px) {
        font-size: 9px;
        font-weight: 600;
    }
    @media all and (max-width: 360px) {
        font-weight: 600;
    }
`;
const DiscountPrice = styled.h4`
    font-size: 34px;
    font-family: gordita_bold;
    color: #0fa76f;
    margin-bottom: 10px;
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Price = styled.p`
    font-size: 22px;
    font-weight: 600;
    font-family: gordita_medium;
    color: #383f50;
    padding-bottom: 0px;
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
        @media all and (max-width: 480px) {
            top: 0px;
            left: 8px;
            width: 85%;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Terms = styled.div`
    display: block;
    color: #707070;
    font-size: 10px;
    font-family: gordita_regular;
    margin-bottom: 5px;
    @media all and (max-width: 480px) {
        font-size: 8px;
    }
`;
const Select = styled.div`
    text-align: center;
    border: 2px solid #0fa76f;
    border-radius: 5px;
    padding: 12px 10px;
    margin-top: 21px;
    font-size: 15px;
    color: #2e8852;
    font-family: "gordita_medium";
    transition: all 0.6s ease-in-out;
    &.selection {
        font-family: "gordita_medium";
        transition: all 0.6s ease-in-out;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0fa76f;
        border: 2px solid #0fa76f;
        @media all and (max-width: 480px) {
            padding: 5px 10px;
            align-items: end;
        }
        small {
            font-size: 15px;
            @media all and (max-width: 480px) {
                font-size: 10px;
            }
        }
        span {
            width: 14px;
            margin-left: 6px;
            transition: all 0.6s ease-in-out;
            transform: translateY(-3px);
            img {
                width: 100%;
                display: block;
                transition: all 0.6s ease-in-out;
            }
            @media all and (max-width: 480px) {
                width: 12px;
            }
        }
    }
    @media all and (max-width: 480px) {
        padding: 5px 14px;
        font-size: 10px;
        margin-top: 0px;
        border: 1px solid #0fa76f;
    }
`;
