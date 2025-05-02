import React from "react";
import styled from "styled-components";

function Categories() {
    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <SubContainer>
                    <Top>
                        <Heading>Categories</Heading>
                        <SubHeading>
                            Students are divided into 2 categories for the
                            contest
                        </SubHeading>
                    </Top>
                    <Bottom>
                        <Ul>
                            {/* <Li className="blue">
                                <Up>
                                    <ImgContainer>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/sub-junior.svg"
                                            alt="Image"
                                        />
                                    </ImgContainer>
                                    <H4>
                                        <Span
                                            style={{
                                                display: "inline-block",
                                                fontSize: "20px",
                                            }}
                                        >
                                            Junior
                                        </Span>
                                        Category
                                    </H4>
                                </Up>
                                <Hr />
                                <Down>
                                    <Para>
                                        Students from classes
                                        <Span>5th-8th</Span>
                                    </Para>
                                </Down>
                            </Li> */}
                            <Li className="green">
                                <Up>
                                    <ImgContainer>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/junior.svg"
                                            alt="Image"
                                        />
                                    </ImgContainer>
                                    <H4>
                                        <Span
                                            style={{ display: "inline-block" }}
                                        >
                                            Junior
                                        </Span>
                                        Category
                                    </H4>
                                </Up>
                                <Hr />
                                <Down>
                                    <Para>
                                        Students from classes
                                        <Span>5th-8th</Span>
                                    </Para>
                                </Down>
                            </Li>
                            <Li className="yellow">
                                <Up>
                                    <ImgContainer>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/senior.svg"
                                            alt="Image"
                                        />
                                    </ImgContainer>
                                    <H4>
                                        <Span
                                            style={{ display: "inline-block" }}
                                        >
                                            Senior
                                        </Span>
                                        Category
                                    </H4>
                                </Up>
                                <Hr />
                                <Down>
                                    <Para>
                                        Students from classes
                                        <Span>9th-12th</Span>
                                    </Para>
                                </Down>
                            </Li>
                        </Ul>
                    </Bottom>
                </SubContainer>
            </WrapperContainer>
        </Cover>
    );
}

export default Categories;
const Cover = styled.div`
    background: url(${require("../../../../assets/images/school-scientist/categories-bg.png")});
    padding: 120px 0px;
    background-size: 90%;
    position: relative;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
    ::before {
        content: "";
        display: inline-block;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        width: 220px;
        height: 122px;
        position: absolute;
        background-size: 80%;
        background-repeat: no-repeat;
        top: -58px;
        right: 6%;
        @media all and (max-width: 768px) {
            background-size: 70%;
            right: 0;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
    ::after {
        content: "";
        display: inline-block;
        width: 220px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        height: 122px;
        position: absolute;
        background-size: 80%;
        bottom: -12%;
        left: 9%;
        background-repeat: no-repeat;
        @media all and (max-width: 1580px) {
            bottom: -9%;
        }
        @media all and (max-width: 1080px) {
            background-size: 70%;
            bottom: -7%;
        }
        @media all and (max-width: 768px) {
            background-size: 70%;
            bottom: -7%;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
`;
const WrapperContainer = styled.div``;
const SubContainer = styled.div``;
const Top = styled.div`
    text-align: center;
    margin-bottom: 75px;
    @media all and (max-width: 1280px) {
        margin-bottom: 65px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
    }
`;
const Heading = styled.h2`
    font-size: 34px;
    margin-bottom: 15px;
    font-family: "gordita_medium" !important;
    color: #023a7f;
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const SubHeading = styled.p`
    font-size: 18px;
    color: #747474;
    @media all and (max-width: 1280px) {
        font-size: 16px;
    }
`;
const Bottom = styled.div``;
const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const Li = styled.li`
    margin-right: 64px;
    width: 30%;
    padding: 32px 48px;
    box-shadow: 0px 5.05258px 118.736px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    position: relative;
    :last-child {
            margin-right: 0;
        }
    @media all and (max-width: 1280px) {
        font-size: 16px;
        width: 40%;
        margin-bottom: 60px;
        :last-child {
            margin-right: 0;
        }
    }
    @media all and (max-width: 1080px) {
        width: 40%;
        margin-bottom: 60px;
    }
    @media all and (max-width: 980px) {
        width: 60%;
        :first-child {
            margin-right: 0;
        }
    }
    @media all and (max-width: 640px) {
        width: 70%;
        padding: 20px 40px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 30px;
    }

    &.blue {
        background: #cfe3f1;
        position: relative;
        ::before {
            position: absolute;
            content: "";
            display: inline-block;
            width: 100px;
            height: 100px;
            top: -21%;
            z-index: -1;
            left: -9%;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/polygon.png");
            background-repeat: no-repeat;
            @media all and (max-width: 1280px) {
                background-size: 80%;
            }
            @media all and (max-width: 480px) {
                display: none;
            }
        }
        ::after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 100px;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/1.svg");
            background-repeat: no-repeat;
            right: -14%;
            bottom: -39%;
            @media all and (max-width: 1280px) {
                background-size: 70%;
            }
            @media all and (max-width: 480px) {
                right: -20%;
                background-size: 50%;
                bottom: -43%;
            }
        }
    }
    &.green {
        background: #d2f0e4;
        ::before {
            position: absolute;
            content: "";
            display: inline-block;
            width: 100px;
            height: 100px;
            top: -21%;
            z-index: -1;
            left: -9%;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/rectangle.png");
            background-repeat: no-repeat;
            @media all and (max-width: 1280px) {
                background-size: 80%;
            }
            @media all and (max-width: 480px) {
                display: none;
            }
        }
        ::after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 100px;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-05-2023/01.svg");
            background-repeat: no-repeat;
            right: -14%;
            bottom: -39%;
            @media all and (max-width: 1280px) {
                background-size: 70%;
            }
            @media all and (max-width: 480px) {
                right: 0;
                background-size: 50%;
                bottom: -43%;
            }
        }
    }
    &.yellow {
        background: #fdf0d1;
        ::before {
            position: absolute;
            content: "";
            display: inline-block;
            width: 100px;
            height: 100px;
            top: -21%;
            z-index: -1;
            left: -9%;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/ellipse.svg");
            background-repeat: no-repeat;
            @media all and (max-width: 1280px) {
                background-size: 80%;
            }
            @media all and (max-width: 480px) {
                display: none;
            }
        }
        ::after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 100px;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-05-2023/02.svg");
            background-repeat: no-repeat;
            right: -14%;
            bottom: -39%;
            @media all and (max-width: 1280px) {
                background-size: 70%;
            }
            @media all and (max-width: 480px) {
                right: 0;
                background-size: 50%;
                bottom: -43%;
            }
        }
    }
`;
const Up = styled.div`
    display: flex;
    align-items: center;
`;
const ImgContainer = styled.div``;
const H4 = styled.h4`
    font-size: 20px;
    font-family: "gordita_medium" !important;
`;
const Span = styled.span`
    display: block;
    color: #f0b509;
    font-size: 18px;
    font-family: "gordita_medium" !important;
    margin-right: 10px;
`;

const Hr = styled.hr`
    height: 1px;
    background-color: #747474;
    width: 49%;
    margin: 10px 0px 15px;
`;
const Down = styled.div``;
const Para = styled.p``;
