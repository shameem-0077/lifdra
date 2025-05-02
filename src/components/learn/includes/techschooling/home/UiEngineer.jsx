import React, { useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import EnrollPopup from "../general/EnrollPopup";
import MagicSliderDots from "react-magic-slider-dots";
import Loader from "../../../includes/techschooling/general/loaders/Loader";

export default function UiEngineer({ skills, practices, isLoading, setLoading }) {
    const [is_modal_active, setModalActive] = useState(false);
    const handleModal = (videoItem) => {
        setActiveVideo(videoItem);
        setTimeout(() => {
            setModalActive((prev) => !prev);
        }, 500);
    };
    const [activeVideo, setActiveVideo] = useState({});

    let topic_slider = useRef();
    const topic_next = () => {
        topic_slider.slickNext();
    };
    const topic_previous = () => {
        topic_slider.slickPrev();
    };

    let website_slider = useRef();

    const website_next = () => {
        website_slider.slickNext();
    };
    const website_previous = () => {
        website_slider.slickPrev();
    };

    const settings = {
        autoplay: true,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
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
                breakpoint: 980,
                settings: {
                    dots: true,
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

    const practices_settings = {
        autoplay: true,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    dots: true,
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
        <MainContainer>
            <EnrollPopup
                is_active={is_modal_active}
                setModalActive={setModalActive}
                isVideoOnlyModal={true}
                image={activeVideo.thumbnail}
                video_url={activeVideo.playlist}
            />
            <Title>Learn UI Engineering to Robotics Engineering</Title>
            <ContentContainer>
                <ContentTitle>First Profession : UI Engineer</ContentTitle>
                <Top>
                    <TopTitle>The skills you will learn in UI Engineering</TopTitle>
                    <TopicContainer className="topic-slider">
                        <PrevArrow onClick={topic_previous}>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.svg"
                                alt="Arrow"
                            />
                        </PrevArrow>
                        <NextArrow onClick={topic_next}>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.svg"
                                alt="Arrow"
                            />
                        </NextArrow>

                        <div className="slider-wrapper">
                            <Slider
                                {...settings}
                                ref={(c) => {
                                    topic_slider = c;
                                }}
                            >
                                {skills.map((skill) => (
                                    <TopicCard key={skill.id}>
                                        <TopicImageWrrapper>
                                            <TopicImage src={skill.image} alt="Image" />
                                        </TopicImageWrrapper>
                                        <TopicTitle>{skill.title}</TopicTitle>
                                        <TopicDescription>{skill.description}</TopicDescription>
                                    </TopicCard>
                                ))}
                            </Slider>
                        </div>
                    </TopicContainer>
                </Top>
                <Bottom>
                    <BottomTitle>
                        You will learn to develop beautiful websites like shown below in UI
                        Engineering
                    </BottomTitle>
                    {isLoading ? (
                        <LoaderContainer>
                            <Loader />
                        </LoaderContainer>
                    ) : (
                        <WebsiteContainer className="website-slider">
                            {practices.length > 4 ||
                                (window.innerWidth < 1140 && (
                                    <>
                                        <PrevArrowSpec onClick={website_previous}>
                                            <img
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.svg"
                                                alt="Arrow"
                                            />
                                        </PrevArrowSpec>
                                        <NextArrowSpec onClick={website_next}>
                                            <img
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.svg"
                                                alt="Arrow"
                                            />
                                        </NextArrowSpec>
                                        <PrevArrow onClick={website_previous}>
                                            <img
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.svg"
                                                alt="Arrow"
                                            />
                                        </PrevArrow>
                                        <NextArrow onClick={website_next}>
                                            <img
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.svg"
                                                alt="Arrow"
                                            />
                                        </NextArrow>
                                    </>
                                ))}
                            <Slider
                                {...practices_settings}
                                ref={(c) => {
                                    website_slider = c;
                                }}
                            >
                                {practices.map((item) => (
                                    <WebsiteCard key={item.id} onClick={() => handleModal(item)}>
                                        <WebsiteImage src={item.thumbnail} alt="Image" />
                                        <WebsiteIcon
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/playgreen.png"
                                            alt="Image"
                                        />
                                    </WebsiteCard>
                                ))}
                            </Slider>
                        </WebsiteContainer>
                    )}
                </Bottom>
            </ContentContainer>
        </MainContainer>
    );
}

const WebView = styled.div`
    @media (max-width: 1140px) {
        display: none;
    }
`;

const MobView = styled.div`
    display: none;
    @media (max-width: 1140px) {
        display: block;
    }
`;
const NonSlider = styled.div`
    display: flex;
    justify-content: space-between;
`;
const MainContainer = styled.div`
    margin-bottom: 68px;
`;

const Title = styled.h1`
    text-align: center;
    font-family: gordita_medium;
    font-size: 30px;
    margin-bottom: 50px;
    @media all and (max-width: 980px) {
        font-size: 24px;
    }
    @media all and (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 36px;
    }
    @media all and (max-width: 480px) {
        font-size: 18px;
        margin-bottom: 29px;
    }
`;

const ContentContainer = styled.div`
    border: 2px solid #15bf81;
    padding: 50px;
    position: relative;
    border-radius: 5px;
    @media all and (max-width: 980px) {
        padding: 40px 0 60px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 45px;
        padding-top: 33px;
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
const ContentTitle = styled.h3`
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

const Top = styled.div`
    margin-bottom: 14px;
    @media all and (max-width: 640px) {
        margin-bottom: 50px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 10px;
    }
`;

const TopTitle = styled.h5`
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
    font-family: gordita_medium;
    color: #5c5c5c;
    @media all and (max-width: 980px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        padding: 0 20px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 480px) {
        padding: 0;
        font-size: 14px;
        font-family: gordita_medium;
        margin-bottom: 12px;
    }
`;

const TopicContainer = styled.div`
    position: relative;
    padding: 0px 50px;
    @media all and (max-width: 768px) {
        padding: 0px 40px;
    }
    @media all and (max-width: 640px) {
        padding: 0px 34px;
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
const PrevArrowSpec = styled.div`
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
const NextArrowSpec = styled.div`
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

const TopicCard = styled.div`
    border-radius: 5px;
    padding: 30px;
    background: #f5f5f5;
    @media all and (max-width: 980px) {
        padding: 30px;
    }
    @media all and (max-width: 640px) {
        padding: 20px;
    }
    @media all and (max-width: 480px) {
        padding: 20px;
    }
`;

const TopicImageWrrapper = styled.span`
    border-radius: 10px;
    width: 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 17px;
    @media all and (max-width: 480px) {
        margin: 0 auto;
    }
`;

const TopicImage = styled.img`
    width: 100%;
    display: block;
    cursor: pointer;
`;

const TopicTitle = styled.h6`
    color: #5c5c5c;
    font-size: 14px;
    font-family: gordita_medium;
    @media all and (max-width: 980px) {
        font-size: 12px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        text-align: center;
        margin-top: 8px;
    }
    @media all and (max-width: 360px) {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
`;

const TopicDescription = styled.p`
    color: #5c5c5c;
    font-size: 12px;
    font-family: gordita_regular;
    @media all and (max-width: 768px) {
        font-size: 10px;
    }
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
        text-align: center;
    }
`;

const Bottom = styled.div`
    margin-top: 39px;
    @media (max-width: 640px) {
        margin-top: 50px;
    }
    @media (max-width: 640px) {
        margin-top: 42px;
    }
`;
const BottomTitle = styled.h5`
    font-size: 18px;
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
        font-family: gordita_medium;
        width: 80%;
        margin: 0 auto 12px;
    }
`;
const LoaderContainer = styled.div`
    padding: 50px;
`;
const WebsiteContainer = styled.div`
    position: relative;
    padding: 0px 50px;
    @media all and (max-width: 640px) {
        padding: 0px 34px;
    }
`;

const WebsiteCard = styled.div`
    position: relative;
    cursor: pointer;
`;
const WebsiteCardNoSlide = styled.div`
    position: relative;
    width: 24%;
`;
const WebsiteImage = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
`;

const WebsiteIcon = styled.img`
    display: block;
    width: 46px;
    height: 46px;
    position: absolute;
    left: 50%;
    cursor: pointer;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0px 3px 22px #00000052;

    @media all and (max-width: 640px) {
        width: 30px;
        height: 30px;
    }
    @media all and (max-width: 480px) {
        width: 40px;
        height: 40px;
    }
`;
