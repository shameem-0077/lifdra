import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { serverConfig } from "../../../../axiosConfig";

const AssociatedCampus = ({ type }) => {
    const [campus, setCampus] = useState([]);
    const [firstSlideData, setFirstSlideData] = useState([]);
    const [secondSlideData, setSecondSlideData] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
        ],
    };
    const second_settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: -1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                },
            },
        ],
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    const fetchData = () => {
        serverConfig
            .get(`/campuses/`, {
                params: {
                    program: type,
                },
            })
            .then((response) => {
                let { status_code, data } = response.data;
                setCampus(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        divideCampus();
    }, [campus]);

    const divideCampus = () => {
        if (campus) {
            const campusHalf = campus && campus.length / 2;
            setFirstSlideData(campus.slice(0, campusHalf));
            setSecondSlideData(campus.slice(campusHalf, campus.length));
        }
    };

    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            <Title>Associated Institutions</Title>
            <Description>
                Various institutions have joined hands with us, to train their
                students and improve their employability skills, along with
                moulding them to be engineers and future scientists.
            </Description>
            <SlidersContainer>
                <CollageLogoSlider>
                    <Slider {...settings}>
                        {firstSlideData.map((data, index) => (
                            <CampusCard key={data.id}>
                                <Logo>
                                    <img src={data.logo} alt="" />
                                </Logo>
                                <Campusname>{data.name}</Campusname>
                                <CampusLocation>{data.district}</CampusLocation>
                            </CampusCard>
                        ))}
                    </Slider>
                </CollageLogoSlider>
                <CollageLogoSlider>
                    <Slider {...second_settings}>
                        {secondSlideData.map((data, index) => (
                            <CampusCard key={data.id}>
                                <Logo>
                                    <img src={data.logo} alt="" />
                                </Logo>
                                <Campusname>{data.name}</Campusname>
                                <CampusLocation>{data.district}</CampusLocation>
                            </CampusCard>
                        ))}
                    </Slider>
                </CollageLogoSlider>

                <FadeGradient></FadeGradient>
                <FadeGradientRight></FadeGradientRight>
            </SlidersContainer>
        </Container>
    );
};

export default AssociatedCampus;
const Container = styled.div`
    background-color: #fff;
    text-align: center;
    padding: 140px 0 0;
    @media all and (max-width: 1280px) {
        padding: 120px 0 0;
    }
    @media all and (max-width: 980px) {
        padding: 100px 0 0;
    }
    @media all and (max-width: 640px) {
        padding: 80px 0 0;
    }
    @media all and (max-width: 480px) {
        padding: 70px 0 0;
    }
    @media all and (max-width: 360px) {
        padding: 40px 0 0;
    }
`;
const Title = styled.h3`
    font-family: gordita_medium;
    position: relative;
    font-size: 30px;
    margin-bottom: 30px;
    color: #2d2d2d;
    margin-bottom: 30px;
    @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 360px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    margin: 0 auto;
    max-width: 500px;
    font-size: 16px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;

const CollageLogoSlider = styled.div`
    margin-bottom: 30px;
    @media all and (max-width: 1280px) {
        margin-bottom: 20px;
    }
`;
const CampusLogo = styled.span`
    display: block;
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
    padding-left: 60px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 400px) {
        padding: 0 10px;
    }
`;

const SlidersContainer = styled.div`
    margin-top: 50px;
    position: relative;
    @media all and (max-width: 1280px) {
        margin-top: 40px;
    }
    @media all and (max-width: 400px) {
        padding-top: 30px;
    }
`;
const CampusCard = styled.span`
    display: block;
    padding: 0 15px;
    @media all and (max-width: 400px) {
        padding: 0 15px;
    }
`;
const Logo = styled.span`
    display: block;
    width: 70px;
    min-width: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    img {
        display: block;
        width: 100%;
    }
`;
const Campusname = styled.h4`
    font-size: 12px;
    font-family: gordita_medium;
    margin-top: 15px;
`;
const FadeGradient = styled.div`
    width: 40px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    background: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(245, 248, 248, 0.01) 100%
    );
`;
const FadeGradientRight = styled.div`
    width: 40px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        rgba(245, 248, 248, 0.01) 0%,
        #ffffff 100%
    );
`;

const CampusLocation = styled.p`
    font-size: 14px;
    font-family: gordita_medium;
    color: #0fa76f;
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
