import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MagicSliderDots from "react-magic-slider-dots";
import Aos from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";
import Slider from "react-slick";

import { serverConfig } from "../../../../axiosConfig";
import { data } from "jquery";

const PrimeProgrammes = () => {
    const [isLoading, setLoading] = useState(true);
    const [primeData, setPrimeData] = useState([]);
    useEffect(() => {
        Aos.init({
            duration: 2000,
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        className: "center",
        // centerMode: true,
        swipeToSlide: true,
        infinite: true,
        arrow: false,
        centerPadding: "60px",
        slidesToShow: 4,
        autoplay: true,
        speed: 3000,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: true,
                    speed: 500,
                },
            },
        ],
        // autoplaySpeed: 2000,
        // cssEase: "linear",
    };

    useEffect(() => {
        const fetchData = () => {
            serverConfig
                .get("/web/services/")
                .then((response) => {
                    let { status_code, data } = response.data;

                    if (status_code === 6000) {
                        setLoading(false);
                        setPrimeData(data.filter((item) => item.title === "Prime Programs"));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchData();
    }, []);

    return (
        <Container>
            <div className="wrapper" data-aos="fade-up" data-aos-once="true">
                <TopSection>
                    <ImageSection>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/prime-programmes.png"
                            }
                            alt="Image"
                        />
                    </ImageSection>
                    <ContentSection>
                        <Title>Prime programs</Title>
                        <Description>
                            Through Prime Program, we offer a wide range of skill training. you can
                            choose from the different programs we offer and shape your skills in
                            those fields.
                        </Description>
                        <Button to="/prime-programs">
                            Go to Prime Programs
                            <span>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                    }
                                    alt=""
                                />
                            </span>
                        </Button>
                    </ContentSection>
                </TopSection>
                <SliderSection>
                    <Slider {...settings}>
                        {primeData[0] &&
                            primeData[0].service_item.map((data) => (
                                <ImageContainer to={data.redirect_link}>
                                    <Poster src={data.image} alt={data.title} />
                                </ImageContainer>
                            ))}
                    </Slider>
                </SliderSection>
            </div>
        </Container>
    );
};

export default PrimeProgrammes;
const Container = styled.div`
    background-color: #ececec65;
    padding: 100px 0 100px;
    @media all and (max-width: 1280px) {
        padding: 80px 0 100px;
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
    grid-template-columns: 3fr 2fr;
    align-items: center;
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
const BottomSection = styled.div``;
const ContentSection = styled.div`
    @media all and (max-width: 768px) {
        order: 1;
        text-align: center;
    }
`;
const Title = styled.h3`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 30px;
    text-align: right;
    color: #2d2d2d;

    @media all and (max-width: 1280px) {
        font-size: 30px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 768px) {
        text-align: center;
    }
    @media all and (max-width: 640px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 15px;
    }
`;
const Description = styled.p`
    /* max-width: 500px; */
    text-align: right;
    margin-left: auto;
    font-size: 15px;
    @media all and (max-width: 768px) {
        text-align: center;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        /* font-size: 13px; */
    }
`;
const Button = styled(Link)`
    background-color: #0fa76f;
    font-size: 16px;
    margin-left: auto;
    color: #ffffff;
    font-family: gordita_medium;
    height: 50px;
    width: 250px;
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
        width: 280px;
        span {
            width: 20px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        margin-top: 20px;
    }
    @media all and (max-width: 768px) {
        margin: 0 auto;
        margin-top: 20px;
    }
    @media all and (max-width: 480px) {
        height: 40px;
        width: 200px;
        font-size: 14px;
        &:hover {
            width: 230px;
            span {
                width: 20px;
                margin-left: 10px;
            }
        }
    }
`;
const ImageSection = styled.div`
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        order: 2;
        padding: 30px 0;
    }
`;
const SliderSection = styled.div`
    margin-top: 30px;
`;
const ImageContainer = styled(Link)`
    padding-right: 20px;
    display: block;
    @media all and (max-width: 480px) {
        padding: 0 10px;
    }
`;
const Poster = styled.img`
    display: block;
    width: 100%;
`;
