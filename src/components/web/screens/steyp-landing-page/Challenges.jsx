import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MagicSliderDots from "react-magic-slider-dots";

import bggradient from "../../../../assets/images/web/color.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { challengeConfig } from "../../../../axiosConfig";
import { getDateStr, truncateString } from "../../../helpers/functions";
const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [width, setWidth] = useState(0);
    const [count, setCount] = useState(4);

    const today = new Date();

    useEffect(() => {
        fetchData();
        handleResize();
    }, []);
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    const fetchData = () => {
        challengeConfig("competitions/all/").then((res) => {
            let { status_code, data } = res.data;
            if (status_code === 6000) {
                setChallenges(data.competition_data);
            }
        });
    };

    const settings = {
        dots: true,
        infinite: true,
        className: "center",
        // centerMode: true,
        arrow: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        autoplay: true,
        speed: 3000,
        swipeToSlide: true,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 510,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: true,
                    speed: 300,
                },
            },
        ],
        // autoplaySpeed: 2000,
        // cssEase: "linear",
    };

    useEffect(() => {
        if (width > 1200) {
            setCount(4);
        } else if (width <= 480) {
            setCount(1);
        } else if (width <= 820) {
            setCount(2);
        } else if (width <= 1200) {
            setCount(3);
        } else {
            setCount(4);
        }
    }, [width]);

    const comingSoon =
        challenges.length < count &&
        [...Array(count - challenges.length)].map((index, i) => (
            <EmptyCard key={index}>
                <CardContent>
                    <CardTop>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/coming-soon.svg"
                            }
                            alt=""
                        />
                    </CardTop>
                    <CartTitle>{"Coming Soon"}</CartTitle>
                    <CardDescription>
                        {"Our next challenge is on designing processes it will live soon 😉"}
                    </CardDescription>
                </CardContent>
                <BottomCover>
                    <Label>
                        <ChallengeLabel>{0} Challengers</ChallengeLabel>
                        <EndTime>Ends on DD MM YY</EndTime>
                    </Label>
                    <Apply
                        style={{
                            cursor: "not-allowed",
                            filter: "grayscale(1)",
                        }}
                    >
                        Apply Now{" "}
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/arrow-right.svg"
                            }
                            alt=""
                        />
                    </Apply>
                </BottomCover>
            </EmptyCard>
        ));

    // const handleResize = () => {
    //     setWidth(window.innerWidth);
    // };
    // window.addEventListener("resize", handleResize);

    const applyNow = (data) => {
        const submission_end = new Date(data.end_timestamp);

        return (
            <>
                <BottomCover>
                    <Label>
                        <ChallengeLabel>{data.challengers_count} Challengers</ChallengeLabel>
                        {today > submission_end ? (
                            <EndTime>Ended on {getDateStr(data.end_timestamp)}</EndTime>
                        ) : (
                            <EndTime>Ends on {getDateStr(data.end_timestamp)}</EndTime>
                        )}
                    </Label>

                    {today > submission_end ? (
                        <Apply to={`challenges/${data.id}`}>
                            View Challenge
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/arrow-right.svg"
                                }
                                alt=""
                            />
                        </Apply>
                    ) : (
                        <Apply to={`challenges/${data.id}`}>
                            Apply Now{" "}
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/arrow-right.svg"
                                }
                                alt=""
                            />
                        </Apply>
                    )}
                </BottomCover>
            </>
        );
    };

    return (
        <Container
            id="challenges"
            className="wrapper"
            data-aos="fade-right"
            data-aos-duration="3000"
            data-aos-once="true"
        >
            <TopSection>
                <LeftSection>
                    <Title>Challenges</Title>
                    <Description>
                        Steyp has now introduced a variety of exciting challenges! Come join us and
                        earn awesome rewards.
                    </Description>
                    <Button to={"/challenges/"}>
                        Go to Challenges{" "}
                        <span>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                }
                                alt=""
                            />
                        </span>
                    </Button>
                </LeftSection>
                <RightSection>
                    <img
                        // src={
                        //     "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/challenge.png"
                        // }
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/challenge.png"
                        }
                        alt=""
                    />
                </RightSection>
            </TopSection>
            <SliderSection>
                <Slider {...settings}>
                    {challenges.map((data) => (
                        <Card key={data.id} to={`challenges/${data.id}`}>
                            <CardContent>
                                <CardTop>
                                    <img src={data.featured_image} alt="" />
                                </CardTop>
                                <CartTitle>{data.title}</CartTitle>
                                <CardDescription>
                                    {
                                        truncateString(data.short_description, 100)
                                        // data.short_description
                                    }
                                </CardDescription>
                            </CardContent>
                            {applyNow(data)}
                        </Card>
                    ))}

                    {comingSoon}
                </Slider>
            </SliderSection>
        </Container>
    );
};

export default Challenges;

const Container = styled.div`
    padding: 100px 0;
    background-color: #fff;
    @media all and (max-width: 1280px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 60px 0 70px;
    }
    @media all and (max-width: 480px) {
        padding: 50px 0 60px;
    }
`;
const TopSection = styled.div`
    display: grid;
    /* align-items: center; */
    grid-template-columns: 1fr 1fr;
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
const LeftSection = styled.div`
    padding-right: 20%;
    margin-top: 40px;
    @media all and (max-width: 980px) {
        padding-right: 10%;
    }
    @media all and (max-width: 768px) {
        margin-top: 0;
        padding: 0px 0 40px;
        text-align: center;
    }
`;
const RightSection = styled.div`
    img {
        display: block;
        width: 100%;
    }
`;
const Title = styled.h3`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 30px;
    color: #2d2d2d;
    /* z-index: 3; */
    &::before {
        content: "";
        position: absolute;
        top: -90px;
        left: -10px;
        width: 300px;
        height: 300px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/color.png")
            no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
    }
    @media all and (max-width: 1280px) {
        font-size: 30px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 768px) {
        &::before {
            background-size: contain;
            /* display: none; */
            z-index: -1;
            top: -60px;
            left: 50px;
            width: 250px;
            height: 250px;
        }
    }
    @media all and (max-width: 640px) {
        font-size: 28px;
        &::before {
            background-size: contain;
            display: none;
            z-index: -1;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 26px;
        margin-bottom: 15px;
    }
`;
const Button = styled(Link)`
    background-color: #0fa76f;
    font-size: 16px;
    color: #ffffff;
    font-family: gordita_medium;
    height: 50px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 40px;
    transition: all 0.4s ease;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 230px;
        span {
            width: 20px;
            margin-left: 10px;
        }
    }
    @media all and (max-width: 980px) {
        margin-top: 20px;
    }
    @media all and (max-width: 768px) {
        margin: 20px auto 0;
    }
    @media all and (max-width: 480px) {
        height: 40px;
        width: 200px;
        font-size: 14px;
    }
`;
const Description = styled.p`
    /* max-width: 500px; */
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const SliderSection = styled.div`
    margin-top: 30px;
    &.magic-dots.slick-dots {
        bottom: 9px !important;
    }
    &.magic-dots.slick-dots {
        margin-top: 15px !important;
    }
`;
const Card = styled(Link)`
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    transition: all 0.4s ease;

    &:hover {
        background: #f2f2f2;
    }
    @media all and (max-width: 980px) {
    }
`;
const EmptyCard = styled.div`
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
    transition: all 0.4s ease;
    cursor: not-allowed !important;

    &:hover {
        background: #f2f2f2;
    }
    @media all and (max-width: 980px) {
    }
`;
const CardTop = styled.div`
    /* height: 190px; */
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
        object-fit: cover;
    }
`;

const CardContent = styled.div``;
const CartTitle = styled.h4`
    margin-top: 25px;
    font-family: gordita_medium;
    font-size: 18px;
    color: #545454;
    @media all and (max-width: 1100px) {
        font-size: 16px;
    }
`;
const CardDescription = styled.p`
    font-size: 13px;
    margin-top: 10px;

    @media all and (max-width: 1100px) {
        font-size: 12px;
        margin-top: 8px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const Label = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`;
const ChallengeLabel = styled.p`
    font-size: 11px;
    @media all and (max-width: 1100px) {
        font-size: 10px;
    }

    @media all and (max-width: 640px) {
        font-size: 9px;
    }
    @media all and (max-width: 510px) {
        font-size: 12px;
    }
    @media (max-width: 360px) {
        font-size: 11px;
    }
`;
const EndTime = styled.p`
    font-size: 11px;
    @media all and (max-width: 1100px) {
        font-size: 10px;
    }

    @media all and (max-width: 640px) {
        font-size: 9px;
    }
    @media all and (max-width: 510px) {
        font-size: 12px;
    }
    @media (max-width: 360px) {
        font-size: 11px;
    }
`;
const Apply = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 11px;
    font-family: gordita_medium;
    color: #0fa76f;
    margin-top: 15px;
    cursor: pointer;
    img {
        width: 10px;
        display: block;
        margin-left: 7px;
    }
`;

const SiderCover = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media all and (max-width: 980px) {
    }
`;
// const SiderCover = styled.div``;
const FlexCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 20px;
    background-color: #fff;
    transition: all 0.4s ease;
    width: 30%;
    /* position: relative; */
    &:hover {
        background: #f2f2f2;
    }
    @media all and (max-width: 980px) {
        width: 39%;
    }
    @media all and (max-width: 768px) {
        width: 48%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const BottomCover = styled.div``;
const Topcover = styled.div``;
