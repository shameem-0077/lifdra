import React, { useEffect, useState } from "react";
import styled from "styled-components";
import quotes from "../../../../assets/images/web/test.svg";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";
import { truncateString } from "../../../helpers/functions";
import TestimonialModal from "../../inludes/general/steyp-landing-page/modal/TestimonialModal";
import ParentsTestimonialModal from "../../inludes/general/steyp-landing-page/modal/ParentsTestimonialModal";
import { serverConfig } from "../../../../axiosConfig";
const ParentsTestimonial = ({ program }) => {
    const [isModal, setModal] = useState(false);
    const [ModalData, setModalData] = useState("");
    const [testimonials, setTestimonials] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 3 }]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        arrow: false,
        speed: 2000,
        autoplaySpeed: 5000,
        swipeToSlide: true,

        appendDots: (dots) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    rows: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    rows: 1,
                    speed: 300,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    speed: 300,
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        serverConfig
            .get("testimonials/happy-parents/", {
                params: {
                    program: program,
                },
            })
            .then((response) => {
                let { status_code, data } = response.data;
                if (status_code === 6000) {
                    setTestimonials(data);
                } else {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleModal = (data) => {
        setModal((prev) => !prev);
        setModalData(data);
    };

    return (
        <Container>
            <div className="wrapper web" id="parents_testimonial">
                <ParentsTestimonialModal
                    isModal={isModal}
                    data={ModalData}
                    handleModal={handleModal}
                />
                <Title>Happy Parents</Title>
                <Description>Parents shares their feedbacks about us.</Description>
                <SliderSection>
                    <Slider {...settings}>
                        {testimonials.map((data) => (
                            <div>
                                <TestimonialsCard>
                                    <Name>{data.parent_name}</Name>
                                    <Designation>Parent of {data.student_name}</Designation>
                                    <Review>
                                        {truncateString(data.message, 100)}

                                        {
                                            // data.message.length > 100 && (
                                            <span onClick={() => handleModal(data)}>See more</span>
                                            // )
                                        }
                                    </Review>
                                </TestimonialsCard>
                            </div>
                        ))}
                    </Slider>
                </SliderSection>
            </div>
        </Container>
    );
};

export default ParentsTestimonial;

const Container = styled.div`
    background-color: #ececec;
    padding: 140px 0 120px;
    @media all and (max-width: 1280px) {
        padding: 120px 0 100px;
    }
    @media all and (max-width: 640px) {
        padding: 100px 0 80px;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0 60px;
    }
    @media all and (max-width: 360px) {
        padding: 50px 0 50px;
    }
`;
const Title = styled.h3`
    text-align: center;
    font-family: gordita_medium;
    position: relative;
    font-size: 30px;
    margin-bottom: 30px;
    color: #2d2d2d;
    @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 15px;
    }
`;
const Description = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 0 auto;
    /* margin-bottom: 50px; */
    max-width: 550px;

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
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const SliderSection = styled.div`
    margin-top: 70px;
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px; */
    @media all and (max-width: 768px) {
        margin-top: 50px;
    }
`;
const TestimonialsCard = styled.div`
    border: 1px solid #e3e3e3;
    background-color: #fff;
    padding: 25px;
    margin: 0 15px;
    min-height: 275px;
    @media all and (max-width: 640px) {
        min-height: 260px;
    }
    @media all and (max-width: 480px) {
        margin: 0 5px;
    }
`;
const Name = styled.h4`
    font-size: 18px;
    font-family: gordita_medium;
    color: #2d2d2d;
    text-align: center;
    margin-top: 40px;
    @media all and (max-width: 480px) {
        margin-top: 20px;
    }
`;
const Designation = styled.p`
    font-size: 12px;
    margin-bottom: 30px;
    text-align: center;
    margin-bottom: 50px;
`;
const Review = styled.p`
    font-size: 14px;
    position: relative;
    &::before {
        content: url(${quotes});
        position: absolute;
        left: 0;
        top: -24px;
        color: #2d2d2d;
        width: 10px;
        display: block;
    }
    span {
        color: #049cd8;
        cursor: pointer;
        font-family: gordita_medium;
    }
    @media all and (max-width: 480px) {
        text-align: center;
        font-size: 13px;
    }
`;
