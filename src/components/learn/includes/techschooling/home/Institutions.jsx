import React, { useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loader from "../general/loaders/Loader";

export default function Institutions({ institutions }) {
    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        loop: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <Container>
            <Title>Tech Schooling implemented Institutions</Title>
            <CardsContainer className="institution-slider">
                <PrevArrow onClick={previous}>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
                        alt="Arrow"
                        width="100%"
                    />
                </PrevArrow>
                <NextArrow onClick={next}>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
                        alt="Arrow"
                        width="100%"
                    />
                </NextArrow>
                <Slider
                    {...settings}
                    ref={(c) => {
                        slider = c;
                    }}
                >
                    {institutions.map((institution, index) => (
                        <Card key={index}>
                            <Top>
                                <Image src={institution.photo} alt="" />
                            </Top>
                            <Bottom>
                                <CardTitle>{institution.name}</CardTitle>
                                {/* <Location>{institution.district}</Location> */}
                                {institution.logo && (
                                    <LogoWrap>
                                        <Logo src={institution.logo} alt="Logo"></Logo>
                                    </LogoWrap>
                                )}
                            </Bottom>
                        </Card>
                    ))}
                </Slider>
            </CardsContainer>
        </Container>
    );
}

const Container = styled.div`
    /* width: 90%; */
    margin: 0 auto;
    /* max-width: 1386px; */
    padding: 45px 0px 0px;
    text-align: center;
    @media (max-width: 768px) {
        padding: 35px 0 0;
    }
`;
const Title = styled.span`
    width: 68%;
    margin: 0 auto;
    display: block;
    font-family: "gordita_medium";
    font-size: 30px;
    @media (max-width: 1104px) {
        line-height: 2rem;
        font-size: 25px;
        width: 70%;
        margin: 0 auto 30px;
    }
    @media (max-width: 980px) {
        margin: 0 auto 15px;
    }
    @media (max-width: 768px) {
        line-height: 2.2rem;
        font-size: 23px;
        margin-bottom: 0px;
    }
    @media (max-width: 640px) {
        width: 71%;
        margin-bottom: 0px;
    }
    @media (max-width: 480px) {
        font-size: 20px;
        line-height: 1.4em;
        width: 100%;
    }
`;
const CardsContainer = styled.div`
    position: relative;
    padding: 0 50px;
    @media (max-width: 1400px) {
        padding: 0 35px;
    }
    @media (max-width: 480px) {
        padding: unset;
    }
`;
const PrevArrow = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        display: none;
    }
`;
const NextArrow = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        display: none;
    }
`;
const Card = styled.div`
    box-shadow: rgba(35, 47, 53, 0.09) 0px 2px 8px 0px;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
        transform: scale(1.05);
        transition: 0.3s ease-in;
    }
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    height: 145px;
    overflow: hidden;
`;
const Image = styled.img`
    display: block;
    width: 100%;
    /* height: 100%; */
`;
const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 35px 10px 20px 10px;
    position: relative;
`;
const LogoWrap = styled.div`
    overflow: hidden;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    background: #fff;
    height: 58px;
    width: 58px;
    border-radius: 50%;
    position: absolute;
    top: -30px;
    left: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 980px) {
        height: 55px;
        width: 55px;
    }
`;
const Logo = styled.img`
    display: block;
    width: 34px;
`;
const CardTitle = styled.span`
    font-size: 16px;
    display: block;
    text-transform: capitalize;
    font-family: "gordita_medium";
    /* border: 1px solid red; */
`;
const Location = styled.span`
    display: block;
    color: #696868;
    font-size: 15px;
`;
