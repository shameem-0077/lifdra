import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { truncateString } from "../../../helpers/functions";
import MagicSliderDots from "react-magic-slider-dots";
import { communityConfig } from "../../../../axiosConfig";
import TestimonialModal from "../../inludes/general/steyp-landing-page/modal/TestimonialModal";
import { Link } from "react-router-dom";

const SatTestimonials = ({ title, program, setFormModal }) => {
    const star = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const [pageNumber, setPageNumber] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [isModal, setModal] = useState(false);
    const [modalData, setModalData] = useState("");

    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const settings = {
        // dots: true,
        infinite: true,
        rows: 2,
        slidesToShow: 2,
        autoplay: true,
        arrow: false,
        speed: 2000,
        autoplaySpeed: 3000,
        swipeToSlide: true,

        appendDots: (dots) => {
            return (
                <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={20} />
            );
        },
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    rows: 1,
                    swipeToSlide: true,
                    speed: 300,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    rows: 1,
                },
            },
        ],
    };

    const handleModal = (data) => {
        setModal((prev) => !prev);
        setModalData(data);
    };

    const handleTestimonialPageUp = () => {
        pagination.has_next_page && setPageNumber(pageNumber + 1);
    };

    useEffect(() => {
        fetchData();
        handleLength();
        handleResize();
    }, [pageNumber]);

    const fetchData = () => {
        communityConfig("testimonials/tech-schooling/student/", {
            params: {
                page: pageNumber,
            },
        })
            .then((response) => {
                let { StatusCode, data, pagination_data } = response.data;
                if (StatusCode === 6000) {
                    setTestimonials((prev) => prev.concat(data));
                    setPagination(pagination_data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    useEffect(() => {
        handleLength();
    }, [testimonials, width]);

    const handleLength = () => {
        if (width < 480) {
            setLength(testimonials.length);
        } else {
            setLength(testimonials.length / 2);
        }
    };

    useEffect(() => {
        handleSlider(testimonials);
    }, [isModal]);

    function handleSlider(testimonials) {
        return (
            <TestimonialsSection>
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
                        if (e === length - 2) {
                            handleTestimonialPageUp();
                        }
                    }}
                >
                    {testimonials.map((data) => (
                        <Cover>
                            <TestimonialsCard>
                                <ImageSection>
                                    <img src={data.photo} alt="User image" />
                                </ImageSection>
                                <ContentSection>
                                    <TopSection>
                                        <UserDetails>
                                            <Name
                                                style={{
                                                    marginTop:
                                                        !data.linkedin_profile &&
                                                        0,
                                                }}
                                            >
                                                {data.name}
                                            </Name>
                                            {data.program_type ===
                                                "techies_degree" &&
                                            data.company_logo ? (
                                                <Designation
                                                    degree={true}
                                                    className="single"
                                                >
                                                    Placed @{" "}
                                                    <a
                                                        href={data.company_link}
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src={
                                                                data.company_logo
                                                            }
                                                            alt=""
                                                        />
                                                    </a>
                                                </Designation>
                                            ) : (
                                                <Designation
                                                    margin={
                                                        data.linkedin_profile
                                                    }
                                                    className="single"
                                                >
                                                    {truncateString(
                                                        data.campus,
                                                        30
                                                    )}
                                                </Designation>
                                            )}
                                        </UserDetails>
                                        {data.linkedin_profile ? (
                                            <Linkedin
                                                href={data.linkedin_profile}
                                                target="_blank"
                                            >
                                                <LinkedinIcon>
                                                    <img
                                                        src={
                                                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/linkedin-white.svg"
                                                        }
                                                        alt=""
                                                    />
                                                </LinkedinIcon>
                                                <p>Linkedin Profile</p>
                                            </Linkedin>
                                        ) : (
                                            <Linkedin
                                                style={{
                                                    filter: "grayscale(100%)",
                                                    opacity: 0,
                                                    cursor: "defualt",
                                                    height: 0,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <LinkedinIcon>
                                                    <img
                                                        src={
                                                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/linkedin-white.svg"
                                                        }
                                                        alt=""
                                                    />
                                                </LinkedinIcon>
                                                <p>Linkedin Profile</p>
                                            </Linkedin>
                                            // <div style={{ margin: "20px 0 0 0" }}></div>
                                        )}
                                    </TopSection>
                                    {data.program_type === "techies_degree" &&
                                    data.company_logo ? (
                                        <Designation className="landscape">
                                            Placed @{" "}
                                            <a
                                                href={data.company_link}
                                                target="_blank"
                                            >
                                                <img
                                                    src={data.company_logo}
                                                    alt=""
                                                />
                                            </a>
                                        </Designation>
                                    ) : (
                                        <Designation className="landscape">
                                            {truncateString(data.campus, 30)}
                                        </Designation>
                                    )}

                                    {/* {isHover && hoveringCard.id === data.id ? (
                                <Review>{data.message}</Review>
                            ) : ( */}
                                    <Review>
                                        {truncateString(data.message, 60) + " "}
                                        {data.message.length > 60 && (
                                            <span
                                                onClick={() =>
                                                    handleModal(data)
                                                }
                                            >
                                                See&nbsp;more
                                            </span>
                                        )}
                                    </Review>
                                    {/* )} */}
                                </ContentSection>
                                {/* {hoverCardTestimonials(data)} */}
                            </TestimonialsCard>
                        </Cover>
                    ))}
                </Slider>
            </TestimonialsSection>
        );
    }

    return (
        <Container
            className="wrapper"
            id="testimonials"
            // style={{ overflow: "hidden" }}
            program={program}
        >
            <TestimonialModal
                isModal={isModal}
                handleModal={handleModal}
                data={modalData}
                testimonials={testimonials}
                setModalData={setModalData}
            />
            <Title>
                What our students say about the experience in <span>Steyp</span>{" "}
            </Title>
            {/* <Description>
				Here is what the students say about their experience with us.
			</Description> */}
            {handleSlider(testimonials)}
            <Button
                to="/tech-schooling/apply/"
                // onClick={() => setFormModal(true)}
            >
                Apply for SAT
                <span>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                        alt=""
                    />
                </span>
            </Button>
        </Container>
    );
};

export default SatTestimonials;

const Button = styled(Link)`
    margin: 35px auto 0;
    cursor: pointer;
    width: 200px;
    padding: 15px 14px;
    background: transparent linear-gradient(100deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    font-size: 15px;
    color: #ffffff;
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
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
        width: 220px;
        span {
            width: 18px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        height: 50px;
        width: 250px;
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
        height: 40px;
        width: 200px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        position: relative;
        z-index: 5;
        margin: 45px auto 0;
    }
`;
const Container = styled.div`
    padding: ${(props) =>
        props.program === "techies_hub" ? "140px 0 30px" : "140px 0 100px"};
    @media all and (max-width: 1280px) {
        padding: ${(props) =>
            props.program === "techies_hub" ? "120px 0 30px" : "120px 0 80px"};
    }
    @media all and (max-width: 640px) {
        padding: ${(props) =>
            props.program === "techies_hub" ? "100px 0 30px" : "100px 0 60px"};
    }
    @media all and (max-width: 480px) {
        padding: ${(props) =>
            props.program === "techies_hub" ? "60px 0 30px" : "50px 0 46px"};
    }
    @media all and (max-width: 360px) {
        padding: 50px 0 50px;
        padding: ${(props) =>
            props.program === "techies_hub" ? "50px 0 30px" : "40px 0 40px"};
    }
`;
const Title = styled.h1`
    font-size: 34px;
    font-family: gordita_medium;
    color: #212121;
    position: relative;
    max-width: 721px;
    margin: 0 auto 55px;
    text-align: center;
    /* &::before {
        content: "";
        position: absolute;
        right: 45px;
        width: 314px;
        height: 20px;
        bottom: -6px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
            no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        @media all and (max-width: 768px) {
            right: 3px;
            width: 270px;
            height: 20px;
            bottom: -9px;
        }
        @media all and (max-width: 640px) {
            right: 3px;
            width: 188px;
            height: 20px;
            bottom: -9px;
        }
        @media all and (max-width: 400px) {
            right: 3px;
            width: 150px;
            height: 20px;
            bottom: -13px;
        }
    } */
    span {
        color: #0fa76f;
        font-family: gordita_medium;
    }
    @media all and (max-width: 1280px) {
        font-size: 35px;
        max-width: 721px;
    }

    @media all and (max-width: 768px) {
        font-size: 31px;
    }
    @media all and (max-width: 640px) {
        font-size: 23px;
        margin-top: 0px;
        max-width: 400px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
        margin: 0 auto 30px;
    }
    @media all and (max-width: 420px) {
        font-size: 19px;
    }
    @media all and (max-width: 400px) {
        font-size: 18px;
    }
    @media all and (max-width: 360px) {
        font-size: 16px;
    }
`;
const Description = styled.p`
    font-size: 16px;
    max-width: 500px;
    margin-bottom: 50px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    /* @media all and (max-width: 480px) {
        font-size: 13px;
    } */
`;
const TestimonialsSection = styled.div`
    position: relative;
    & .magic-dots.slick-dots {
        position: relative;
        overflow: hidden;
        margin: 0px auto 0 7px !important;
        width: 80px !important;
        border: 1px solid #0fa76f21;
        border-radius: 27px;
    }
    & .magic-dots.slick-dots ul {
        /* padding: 3px 9px 6px !important; */
        padding: 3px 3px 6px 6px !important;
    }

    & .magic-dots.slick-dots ul li {
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        margin: 0 1px;
        padding: 0;
        cursor: pointer;
    }
    & .magic-dots.slick-dots ul li button {
        width: 15px !important ;
        /* height: 15px !important; */
    }
    & .magic-dots.slick-dots ul li button:before {
        width: 15px !important ;
        height: 15px !important;
    }
`;

const PrevArrow = styled.div`
    width: 42;
    overflow: visibles;
    height: 42px;
    position: absolute;
    left: -5%;
    top: 44%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        width: 25px;
        left: -8%;
        height: 30px;
    }
`;
const NextArrow = styled.div`
    width: 42;
    height: 42px;
    position: absolute;
    right: -5%;
    top: 44%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        width: 25px;
        left: 99%;
        height: 30px;
    }
`;

const TestimonialsCard = styled.div`
    position: relative;
    display: flex !important;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    min-height: 165px;
    margin: 0 10px;
    transition: all 0.3s ease;
    /* &:hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transform: scale(1.05, 1.05);
        z-index: 999;
    } */
    @media all and (max-width: 1100px) {
        min-height: 165px;
    }
    @media all and (max-width: 980px) {
        margin: 0 10px;
    }
    @media all and (max-width: 640px) {
        padding: 15px;
        min-height: 160px;
    }
    @media all and (max-width: 480px) {
        display: grid !important;
        grid-template-columns: 1fr;
        min-height: 250px;
        max-width: 260px;
        margin: 0 auto;
        padding: 20px;
    }
`;
const ImageSection = styled.div`
    width: 120px;
    min-width: 120px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 15px;
    img {
        display: block;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
    @media all and (max-width: 640px) {
        width: 120px;
        min-width: 120px;
    }
    @media all and (max-width: 480px) {
        width: 80px;
        min-width: 80px;
    }
    @media all and (max-width: 480px) {
        margin: 0 auto;
        margin-bottom: 0px;
    }
`;
const ContentSection = styled.div`
    flex: 1;
`;
const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media all and (max-width: 1110px) {
    }
    @media all and (max-width: 480px) {
        justify-content: center;
        flex-wrap: wrap;
    }
`;
const Review = styled.div`
    font-size: 14px;
    position: relative;
    &::before {
        content: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/test.svg");
        position: absolute;
        left: 0;
        top: -18px;
        color: #2d2d2d;
        width: 10px;
        display: block;
    }
    span {
        color: #049cd8;
        cursor: pointer;
        font-family: gordita_medium;
    }
    @media all and (max-width: 1280px) {
        font-size: 12px;
    }

    @media all and (max-width: 480px) {
        font-size: 14px;
        text-align: center;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const UserDetails = styled.div`
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const Linkedin = styled.a`
    display: flex;
    align-items: center;
    width: 140px;
    background-color: #2b7ebc;
    height: 35px;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;

    p {
        font-size: 12px;
        font-family: gordita_medium;
        color: #fff;

        display: flex;
        justify-content: flex-start;
        /* align-items: center; */
        /* line-height: 12px; */
        transform: translateY(1px);
    }
    @media all and (max-width: 1300px) {
        width: 35px;
        p {
            display: none;
        }
    }
    @media all and (max-width: 1100px) {
        width: 150px;
        p {
            display: flex;
        }
    }
    @media all and (max-width: 640px) {
        width: 30px;
        height: 30px;
        p {
            display: none;
        }
    }
    @media all and (max-width: 480px) {
        width: 150px;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 25px;
        p {
            display: flex;
            /* transform: translateY(1px); */
        }
    }
`;
const LinkedinIcon = styled.span`
    display: flex;
    height: 20px;
    width: 25px;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #fff;
    padding-right: 6px;
    margin-right: 6px;
    img {
        display: block;
        width: 15px;
        transform: translateY(-3px);
    }
    @media all and (max-width: 1300px) {
        padding: 0;
        margin: 0;
        border: none;
        img {
            transform: translateY(0px);
        }
    }
    @media all and (max-width: 1100px) {
        border-right: 1px solid #fff;
        padding-right: 6px;
        margin-right: 6px;
        img {
            transform: translateY(-3px);
        }
    }
    @media all and (max-width: 640px) {
        padding: 0;
        margin: 0;
        border: none;
        img {
            transform: translateY(0px);
        }
    }
    @media all and (max-width: 480px) {
        border-right: 1px solid #fff;
        padding-right: 6px;
        margin-right: 6px;
        img {
            transform: translateY(-3px);
        }
    }
`;
const Name = styled.h4`
    font-size: 18px;
    font-family: gordita_medium;
    color: #2d2d2d;
    text-transform: capitalize;
    @media all and (max-width: 1100px) {
        font-size: 18px;
    }
    @media all and (max-width: 768px) {
        font-size: 16px;
    }
    @media all and (max-width: 510px) {
        font-size: 15px;
    }

    @media all and (max-width: 480px) {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
`;
const Designation = styled.p`
    font-size: 12px;
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.single {
        display: none;
    }
    a {
        transform: translateY(-2px);
        display: inline-block;
        height: 20px;
        margin-left: 5px;
        cursor: pointer;
        img {
            display: block;
            height: 100%;
        }
    }
    @media all and (max-width: 1100px) {
        font-size: 12px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 768px) {
        font-size: 11px;
    }

    @media all and (max-width: 480px) {
        width: 100%;
        text-align: center;
        margin-bottom: 0px;
        margin: ${(props) => props.degree && "3px 0"};
        &.single {
            display: flex;
            justify-content: center;

            /* margin-bottom: ${(props) => props.margin === null && "50px"}; */
        }
        &.landscape {
            display: none;
        }
    }
`;
const Star = styled.span`
    display: block;
    width: 12px;
    margin-right: 3px;
    img {
        display: block;
        width: 100%;
    }

    @media all and (max-width: 480px) {
        width: 15px;
        margin-bottom: 30px;
    }
`;
const Cover = styled.div`
    padding: 0 0px 20px 0;
    position: relative;
    min-height: 190px;

    @media all and (max-width: 480px) {
        padding: 0;
    }
`;
const HoverCard = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: scale(1, 0);
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    min-height: 170px;
    /* margin: -10px; */
    z-index: 999999;
    transition: all 0.4s ease;
    &.image {
        margin-bottom: 20px;
    }
    @media all and (max-width: 980px) {
        /* margin: 0 10px; */
    }
    @media all and (max-width: 480px) {
        display: grid !important;
        grid-template-columns: 1fr;
        min-height: 300px;
    }
`;
const HoverContentSection = styled.div`
    flex: 1;
    /* margin-top: 20px; */
`;
