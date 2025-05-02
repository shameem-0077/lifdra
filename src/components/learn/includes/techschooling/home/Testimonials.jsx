import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import MagicSliderDots from "react-magic-slider-dots";
import TestimonialModal from "./modal/TestimonialModal";
import { truncateString } from "../../../../helpers/functions";

export default function Testimonials({
    testimonials,
    handleTestimonialPageUp,
}) {
    const [isModal, setModal] = useState(false);
    const [modalData, setModalData] = useState("");
    const [wordCount, setWordCount] = useState(130);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (width >= 1400) {
            setWordCount(130);
        } else if (width >= 1200) {
            setWordCount(110);
        } else if (width > 980) {
            setWordCount(100);
        } else if (width > 768) {
            setWordCount(130);
        } else if (width > 600) {
            setWordCount(80);
        } else if (width > 480) {
            setWordCount(80);
        } else if (width > 360) {
            setWordCount(70);
        } else if (width < 360) {
            setWordCount(50);
        } else {
            setWordCount(80);
        }
    }, [width]);
    useEffect(() => {
        handleResize();
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    const settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        appendDots: (dots) => {
            return (
                <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />
            );
        },
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 1,
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

    let slider = useRef();

    const next = () => {
        slider.slickNext();
        // handleTestimonialPageUp();
    };
    const previous = () => {
        slider.slickPrev();
    };
    const handleModal = (data) => {
        setModal((prev) => !prev);
        setModalData(data);
    };

    return (
        <Container>
            <TestimonialModal
                isModal={isModal}
                handleModal={handleModal}
                data={modalData}
            />
            <Head>What does our students say about Tech Schooling?</Head>

            <SliderContainer className="student-testimonial-slider">
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
                    afterChange={(e) => {
                        if (e === testimonials.length - 2) {
                            handleTestimonialPageUp();
                        }
                    }}
                >
                    {testimonials.map((item) =>
                        item.type === "video" ? (
                            <VideoCard key={item.id}>
                                <Background src={item.photo} alt="Image" />
                                <Content>
                                    <ContentWrapper>
                                        <PlayIcon
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/white-play.png"
                                            alt="Image"
                                        />
                                        <Description>
                                            {truncateString(
                                                item.message,
                                                wordCount
                                            ) + " "}
                                            {item.message.length >
                                                wordCount && (
                                                <SeeMore
                                                    onClick={() =>
                                                        handleModal(item)
                                                    }
                                                >
                                                    See&nbsp;more
                                                </SeeMore>
                                            )}
                                        </Description>
                                        <Name>{item.name}</Name>
                                        <Institution>{item.campus}</Institution>
                                        <Stars>
                                            <Star
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                alt="Image"
                                            />
                                            <Star
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                alt="Image"
                                            />
                                            <Star
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                alt="Image"
                                            />
                                            <Star
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                alt="Image"
                                            />
                                            <Star
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                alt="Image"
                                            />
                                        </Stars>
                                    </ContentWrapper>
                                </Content>
                            </VideoCard>
                        ) : (
                            <>
                                <MobileViewCard
                                    key={item.id}
                                    style={{
                                        minHeight: "250px",
                                    }}
                                >
                                    <ImageContainer>
                                        <Image src={item.photo} alt="Image" />
                                    </ImageContainer>
                                    <QuoteImage
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/white-quote.png"
                                        alt="Image"
                                    />
                                    <Description
                                        style={{
                                            // width: "100%",
                                            marginBottom: "20px",
                                            // maxHeight: "220px",
                                            // minHeight: "200px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {truncateString(
                                            item.message,
                                            wordCount
                                        ) + " "}
                                        {item.message.length > wordCount && (
                                            <SeeMore
                                                onClick={() =>
                                                    handleModal(item)
                                                }
                                            >
                                                See&nbsp;more
                                            </SeeMore>
                                        )}
                                    </Description>
                                    <NormaCardStars>
                                        {new Array(parseInt(item.rating)).map(
                                            (star) => (
                                                <Star
                                                    key={star}
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                            )
                                        )}
                                        <Star
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                            alt="Image"
                                        />
                                        <Star
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                            alt="Image"
                                        />
                                        <Star
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                            alt="Image"
                                        />
                                        <Star
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                            alt="Image"
                                        />
                                    </NormaCardStars>
                                    <Name>{item.name}</Name>
                                    <Institution>{item.campus}</Institution>
                                </MobileViewCard>
                                <NormalCard
                                    style={{
                                        minHeight: "250px",
                                        width: "100%",
                                    }}
                                >
                                    <Top>
                                        <ImageContainer>
                                            <Image
                                                src={item.photo}
                                                alt="Image"
                                            />
                                        </ImageContainer>
                                        <Right>
                                            <Name>{item.name}</Name>
                                            <Institution>
                                                {item.campus}
                                            </Institution>
                                            <NormaCardStars>
                                                {new Array(
                                                    parseInt(item.rating)
                                                ).map((star) => (
                                                    <Star
                                                        key={star}
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                        alt="Image"
                                                    />
                                                ))}
                                                <Star
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                                <Star
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                                <Star
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                                <Star
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                                <Star
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                                    alt="Image"
                                                />
                                            </NormaCardStars>
                                        </Right>
                                    </Top>
                                    <Bottom>
                                        <QuoteImage
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/white-quote.png"
                                            alt="Image"
                                        />
                                        <Description
                                            style={{
                                                width: "100%",
                                                // maxHeight: "100px",
                                                // minHeight: "100px",
                                            }}
                                        >
                                            {truncateString(
                                                item.message,
                                                wordCount
                                            ) + " "}
                                            {item.message.length >
                                                wordCount && (
                                                <SeeMore
                                                    onClick={() =>
                                                        handleModal(item)
                                                    }
                                                >
                                                    See&nbsp;more
                                                </SeeMore>
                                            )}
                                        </Description>
                                    </Bottom>
                                </NormalCard>
                            </>
                        )
                    )}
                </Slider>
            </SliderContainer>
        </Container>
    );
}
const MobileViewCard = styled.div`
    display: none;
    background: transparent linear-gradient(121deg, #34d197 0%, #0fa76f 100%) 0%
        0% no-repeat padding-box;
    border-radius: 5px;
    overflow: visible !important;
    margin-top: 60px;
    padding: 20px 30px;
    @media (max-width: 600px) {
        display: block;
    }
`;
const PrevArrow = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    left: -54px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px !important;
        height: 35px !important;
    }
    @media (max-width: 480px) {
        display: none;
    }
`;
const NextArrow = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    right: -54px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px !important;
        height: 35px !important;
    }
    @media (max-width: 480px) {
        display: none;
    }
`;
const Container = styled.div`
    background: #f8f8fb;
    padding: 46px 72px 55px;
    margin-top: 77px;
    overflow: hidden;
    /* @media (max-width: 980px) {
    padding: 47px 30px 72px;
  } */
    /* @media (max-width: 768px) {
    padding: 35px 50px 64px;
  } */
    @media (max-width: 600px) {
        padding: 32px 30px 56px;
    }
    @media (max-width: 350px) {
        padding: 32px 15px 56px;
    }
    .magic-dots.slick-dots {
        position: relative;
		overflow: hidden;
		width: 80px !important;
		border: 1px solid #0fa76f21;
		border-radius: 27px;
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
const SliderContainer = styled.div`
    position: relative;
`;
const Head = styled.h2`
    text-align: center;
    margin: 0 auto 23px;
    display: block;
    font-family: "gordita_medium";
    font-size: 30px;
    @media (max-width: 1104px) {
        line-height: 2rem;
        font-size: 25px;
        width: 70%;
        margin: 0 auto 20px;
    }
    @media (max-width: 980px) {
        margin: 0 auto 15px;
    }
    @media (max-width: 768px) {
        line-height: 2.2rem;
        font-size: 23px;
        margin-bottom: 12px;
    }
    @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 15px;
    }
    @media (max-width: 600px) {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 1.4em;
        width: 100%;
    }
`;
const VideoCard = styled.div`
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
`;
const Background = styled.img`
    display: block;
    width: 100%;
`;
const Content = styled.div`
    display: flex;
    padding: 0 26px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent linear-gradient(90deg, #15bf81 0%, #ffffff00 100%)
        0% 0% no-repeat padding-box;
`;
const ContentWrapper = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    color: #fff;
    padding: 10px 0;
    @media (max-width: 980) {
        padding: 20px 10px;
    }
`;
const PlayIcon = styled.img`
    display: block;
    width: 53px;
    height: 53px;
    border-radius: 50%;
    box-shadow: 0px 3px 22px #00000052;
    margin-bottom: 14px;
`;
const Description = styled.p`
    color: #fff;
    font-family: "gordita_regular";
    font-size: 13px;
    /* word-wrap: break-word; */

    /* width: 238px; */
`;
const Name = styled.span`
    font-family: "gordita_medium";
    display: block;
    margin-top: 11px;
    font-size: 15px;
    color: #fff;
    @media (max-width: 600px) {
        margin-top: 0px;
    }
`;
const Institution = styled.span`
    display: block;
    font-size: 13px;
    color: #fff;
    font-family: "gordita_regular";
`;
const Stars = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 26px;
    right: 26px;
`;
const Star = styled.img`
    width: 13px;
    display: block;
    margin-right: 11px;
    &:last-child {
        margin-right: 0;
    }
`;
const NormaCardStars = styled.div`
    display: flex;
    align-items: center;
`;
const QuoteImage = styled.img`
    width: 31px;
    display: block;
    margin-bottom: 14px;
`;
const NormalCard = styled.div`
    background: transparent linear-gradient(121deg, #34d197 0%, #0fa76f 100%) 0%
        0% no-repeat padding-box;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
    /* width: 100% !important; */
    @media (max-width: 600px) {
        display: none !important;
    }
`;
const Top = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const Bottom = styled.div`
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;
const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
const Right = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
`;
const ImageContainer = styled.div`
    min-height: 100px;
    min-width: 100px;
    max-height: 100px;
    max-width: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    /* @media (max-width: 550px) {
        min-height: 80px;
        min-width: 80px;
        max-height: 80px;
        max-width: 80px;
    } */
    @media (max-width: 600px) {
        min-height: 100px;
        min-width: 100px;
        max-height: 100px;
        max-width: 100px;
        margin: 0 auto;
        transform: translateY(-75px);
        margin-bottom: -90px;
    }
`;

const SeeMore = styled.span`
    cursor: pointer;
    margin-left: 3px;
    font-family: "gordita_medium";
`;
