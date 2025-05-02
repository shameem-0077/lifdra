import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";

const Profession = ({ professions }) => {
    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const settings = {
        autoplay: true,
        autoplaySpeed: 2500,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                },
            },
        ],
    };

    return (
        <Container>
            <InnerContainer>
                <Top>
                    <MainTitle>
                        <Content>Next professions</Content>
                    </MainTitle>
                    <MainDescription>
                        After completing UI Engineering, you will get access to the below
                        professions
                    </MainDescription>
                </Top>
                <Bottom>
                    <ProfessionCards className="profession-slider">
                        <PrevArrow onClick={previous}>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.svg"
                                alt="Arrow"
                            />
                        </PrevArrow>
                        <NextArrow onClick={next}>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.svg"
                                alt="Arrow"
                            />
                        </NextArrow>
                        <Slider
                            {...settings}
                            ref={(c) => {
                                slider = c;
                            }}
                        >
                            {professions.map((item) => (
                                <Card key={item.id}>
                                    <InnerCard>
                                        <Image>
                                            <ImageContent src={item.image} alt="Image" />
                                        </Image>
                                        <CardContent>
                                            <Title>{item.title}</Title>
                                            <Description>{item.description}</Description>
                                        </CardContent>
                                    </InnerCard>
                                </Card>
                            ))}
                        </Slider>
                    </ProfessionCards>
                </Bottom>
            </InnerContainer>
        </Container>
    );
};
export default Profession;

const Container = styled.div`
    border: 2px solid #15bf81;
    padding: 50px;
    position: relative;
    border-radius: 5px;
    margin-bottom: 60px;
    @media all and (max-width: 980px) {
        padding: 40px 0 60px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 45px;
        padding-bottom: 41px;
        padding-top: 36px;
        .magic-dots.slick-dots {
            bottom: -11px !important;
        }
    }
    @media all and (max-width: 640px) {
        .slick-slide {
            margin: 0 7px !important;
        }
    }
    .slick-slide {
        margin: 0 9px;
        height: inherit;
        display: flex !important;
    }
    .slick-list {
        margin: 0 -9px;
    }
    .slick-track {
        display: flex !important;
    }
    .slick-slide > div {
        display: flex !important;
        width: 100%;
    }
    .magic-dots.slick-dots {
        width: 131px !important;
    }
    .slick-dots li {
        display: flex;
        align-items: center;
        width: 31px;
    }
    .slick-dots li button:before {
        font-size: 12px !important;
    }
    .slick-dots li.slick-active button:before {
        display: none !important;
    }
    .slick-dots li.slick-active button {
        width: 30px;
        height: 6px;
        background-color: #3fbd7f;
        border-radius: 8px;
        transition: ease 0.25s;
    }
`;
const InnerContainer = styled.div``;
const Top = styled.div`
    width: 52%;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 1280px) {
        width: 92%;
    }
`;
const MainTitle = styled.div``;
const MainDescription = styled.p`
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
    font-family: gordita_medium;
    color: #5c5c5c;
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        padding: 0 20px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 480px) {
        padding: 0;
        font-size: 14px;

        margin-bottom: 12px;
    }
`;
const Content = styled.h3`
    background-color: #15bf81;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 30px;
    height: 52px;
    width: 260px;
    margin: 0 auto;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        width: 220px;
        height: 45px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
        height: 40px;
    }
    @media all and (max-width: 360px) {
        width: 190px;
    }
`;
const Bottom = styled.div`
    margin-top: 0px;
`;
const ProfessionCards = styled.div`
    position: relative;
    padding: 0px 50px;
    @media all and (max-width: 640px) {
        padding: 0px 34px;
    }
`;
const Card = styled.div`
    border-radius: 5px;
    padding: 28px 25px;
    background: #f5f5f5;
    @media all and (max-width: 980px) {
        padding: 28px 25px;
    }
    @media all and (max-width: 768px) {
        padding: 28px 25px;
    }
    @media all and (max-width: 640px) {
        padding: 20px 20px;
    }
    @media all and (max-width: 480px) {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;
const LoadingCard = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f5f5f5;
    z-index: -1;
    top: 0;
    left: 0;
`;
const InnerCard = styled.div`
    z-index: 2;
`;
const Image = styled.div`
    width: 57px;
    @media all and (max-width: 480px) {
        margin: 0 auto;
    }
`;
const ImageContent = styled.img`
    display: block;
    width: 100%;
`;
const CardContent = styled.div`
    margin-top: 20px;
    @media all and (max-width: 480px) {
        text-align: center;
    }
`;
const Title = styled.h3`
    color: #5c5c5c;
    font-size: 14px;
    font-family: gordita_medium;
    @media all and (max-width: 980px) {
        font-size: 13px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Description = styled.p`
    margin-top: 8px;
    color: #5c5c5c;
    font-size: 12px;
    font-family: gordita_regular;
    @media all and (max-width: 768px) {
        font-size: 12px;
    }
`;
const PrevArrow = styled.div`
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        display: none;
    }
`;
const NextArrow = styled.div`
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        display: none;
    }
`;
