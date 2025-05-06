import React, { useState } from "react";
import styled from "styled-components";

import DesignationCard from "../includes/DesignationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { serverConfig } from "../../../../../axiosConfig";
import { useEffect } from "react";

function Syllabus() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const [yearTopics, setYearTopics] = useState([
        {
            id: 1,
            name: "First Year",
            lesson: [
                {
                    id: 1,
                    name: "UI Engineer",
                    description: "You will learn to develop beautiful websites",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/ui-engineer.svg",
                    color: "#FBE1E3",
                },
                {
                    id: 2,
                    name: "Backend Developer",
                    description: "Server side application development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/backend.svg",
                    color: "#FAF3CB",
                },
                {
                    id: 3,
                    name: "DevOps Engineer",
                    description: "Deployment and network operations",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/devops.svg",
                    color: "#E9F6E0",
                },
                {
                    id: 4,
                    name: "Web Application Developer",
                    description: "Web app like e-commerce development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/web.svg",
                    color: "#E3DEF4",
                },
                {
                    id: 5,
                    name: "Mobile Application Developer",
                    description: "Mobile app, & system development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/mobile.svg",
                    color: "#DDF5F9",
                },
            ],
        },
        {
            id: 2,
            name: "Next 3 Year",
            lesson: [
                {
                    id: 1,
                    name: "ERP Developer",
                    description: "Shop/Company management software development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/erp.svg",
                    color: "#C7E8FD",
                },
                {
                    id: 2,
                    name: "Data Scientist",
                    description: "Smart & crucial data handling",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/ds.svg",
                    color: "#DDF5F9",
                },

                {
                    id: 4,
                    name: "Blockchain Developer",
                    description: "Developing & crafting blockchain protocol",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/block.svg",
                    color: "#E3DEF4",
                },
                {
                    id: 5,
                    name: "AR Engineer",
                    description: "Altering real-world environment",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/ar.svg",
                    color: "#FAF3CB",
                },
                {
                    id: 6,
                    name: "VR Engineer",
                    description: "Creating virtual elements",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/vr.svg",
                    color: "#F5EAF7",
                },
                {
                    id: 7,
                    name: "IoT Engineer",
                    description: "Making things learn and react",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/iot.svg",
                    color: "#FEEEE4",
                },
                {
                    id: 8,
                    name: "Machine Learning Engineer",
                    description: "Training machine to react & understand",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/ml.svg",
                    color: "#E6DEF4",
                },
                {
                    id: 9,
                    name: "Robotics Engineer",
                    description: "Developing bots that understands human",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/robotics.svg",
                    color: "#F5DFE6",
                },
                {
                    id: 10,
                    name: "AI Engineer",
                    description: "Creating artificial expert machines",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/topics/ai.svg",
                    color: "#E6DEF4",
                },
            ],
        },
    ]);

    return (
        <Container>
            <TopSection>
                <Person>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/person.svg"
                        }
                    />
                </Person>

                <Title>
                    <span>നമ്മുടെ</span>
                    <br />
                    എഞ്ചിനീയറിംഗ് സിലബസ്
                </Title>
                <Courses>
                    <span className="green">Web Development</span> to{" "}
                    <span className="blue">Robotics</span>{" "}
                    <CourseArrow>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/course-arrow.svg"
                            }
                            alt=""
                        />
                    </CourseArrow>
                </Courses>

                <Robo>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/robo.svg"
                        }
                        alt=""
                    />
                </Robo>
            </TopSection>
            <BottomSection>
                {/* First year section */}
                {yearTopics.map((item) => (
                    <YearSections key={item.id}>
                        <YearLabal>
                            {" "}
                            <Circle>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/circle-stroke.svg"
                                    }
                                    alt=""
                                />
                            </Circle>
                            <Arrow>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/yellow-arrow.svg"
                                    }
                                    alt=""
                                />
                            </Arrow>
                            {item.name}
                        </YearLabal>

                        {/* Card renders above 1280px screen resolution */}
                        <LessonsContainer>
                            {item.lesson.map((data) => (
                                <CardContainer key={data.id} color={data.color}>
                                    <DesignationCard data={data} />
                                </CardContainer>
                            ))}
                        </LessonsContainer>
                        {/* Card renders below 1280px screen resolution */}
                        {/* <ResponsiveContainer>
                            <Slider {...settings}>
                                {item.lesson.map((data) => (
                                    <Cover>
                                        <CardContainer key={data.id} color={data.color}>
                                            <DesignationCard data={data} />
                                        </CardContainer>
                                    </Cover>
                                ))}
                            </Slider>
                        </ResponsiveContainer> */}
                    </YearSections>
                ))}
            </BottomSection>
        </Container>
    );
}

export default Syllabus;

const Container = styled.div`
    padding: 100px 70px;
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    @media all and (max-width: 1400px) {
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        padding: 90px 70px;
        padding-bottom: 70px;
    }
    @media all and (max-width: 1100px) {
        padding: 80px 70px;
        padding-bottom: 60px;
    }

    @media all and (max-width: 480px) {
        padding: 80px 0px;
        padding-bottom: 50px;
    }
`;

const Title = styled.h2`
    color: #2d2d2d;
    text-align: center;
    /* margin-bottom: 10px; */
    font-size: 39px;
    font-family: "EGGIndulekhaUni";
    span {
        color: #0fa76f;
    }
    small {
        font-family: gordita_bold;
    }
    @media all and (max-width: 640px) {
        /* margin-bottom: 6px; */
        font-size: 32px;
    }
`;
const Courses = styled.p`
    font-size: 18px;
    text-align: center;
    font-family: gordita_medium;
    margin-bottom: 80px;
    position: relative;
    span {
        color: #fa6448;
    }
    @media all and (max-width: 1100px) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 50px;
        font-size: 16px;
    }
    /* @media all and (max-width: 480px) {
        margin-bottom: 30px;
    } */
`;
const CourseArrow = styled.span`
    display: block;
    width: 90%;
    max-width: 350px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    img {
        display: block;
        width: 100%;
    }
`;
const YearLabal = styled.p`
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0fa76f;
    font-family: gordita_medium;
    border-radius: 30px;
    font-size: 30px;
    margin: 0 auto;
    margin-bottom: 60px;
    position: relative;
    @media all and (max-width: 1280px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 20px;
    }
`;

// const BottomSection = styled.div`
//     height: 400px;
//     background: url(${bg}) no-repeat;
//     background-size: cover;
//     /* background-position: left top; */
// `;

const TopSection = styled.div`
    position: relative;
    max-width: 700px;
    margin: 0 auto;
`;
const Person = styled.span`
    position: absolute;
    opacity: 0.4;
    top: 0;
    left: 0;
    display: block;
    width: 30%;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
`;
const Robo = styled.span`
    position: absolute;
    opacity: 0.4;
    top: 0;
    right: 0;
    display: block;
    width: 22%;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
`;

const Circle = styled.span`
    display: block;
    position: absolute;
    top: 0;
    width: 142px;
    left: 54px;
    @media all and (max-width: 480px) {
        width: 120px;
    }
    @media all and (max-width: 360px) {
        width: 100px;
        top: 7px;
        left: 72px;
    }
    img {
        display: block;
        width: 100%;
    }
`;
const Arrow = styled.span`
    display: block;
    position: absolute;
    top: 20px;
    right: -42px;
    width: 42px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 32px;
        right: -10px;
    }
`;

const BottomSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 100px;
    /* max-width: 100%; */
    @media all and (max-width: 1400px) {
        display: block;
        margin: 0 -8%;
    }

    @media all and (max-width: 1280px) {
    }
    @media all and (max-width: 980px) {
    }
`;
const LessonsContainer = styled.div`
    margin: 0 -10px;
    display: flex;
    justify-content: center;
    /* column-gap: 20px; */
    flex-wrap: wrap;
    @media all and (max-width: 1400px) {
        margin: 0 -20px;
        overflow-y: scroll;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding: 0 8vw;
        /* max-width: 100%; */
        ::-webkit-scrollbar {
            display: none;
        }
    }
    @media all and (max-width: 980px) {
        padding: 0 6vw;
        margin: 0 -30px;
    }
    @media all and (max-width: 768px) {
        padding: 0 4vw;
        margin: 0 -30px;
    }
    @media all and (max-width: 480px) {
        padding: 0 12vw;
        margin: 0;
    }
`;

const Cover = styled.div`
    padding: 0 10px;
    position: relative;
    @media all and (max-width: 400px) {
        padding: 0 15%;
    }
    @media all and (max-width: 360px) {
        padding: 0 10%;
    }
`;
const CardContainer = styled.div`
    width: calc(20% - 20px);
    margin: 0 10px;
    background-color: ${(props) => props.color};
    border-radius: 10px;
    margin-bottom: 20px;
    min-width: 200px;
    /* min-height: 345px; */
    @media all and (max-width: 1400px) {
        min-width: 220px;
        max-width: 220px;
        /* min-height: 345px; */
    }
    @media all and (max-width: 768px) {
        /* min-height: 330px !important; */
    }
    /* @media all and (max-width: 1100px) {
        font-size: 15px;
        min-height: 330px !important;
    } */
`;

const YearSections = styled.div`
    max-width: 100%;
    @media all and (max-width: 1400px) {
        :nth-child(2) {
            margin-top: 60px;
        }
    }
    @media all and (max-width: 1100px) {
        :nth-child(2) {
            margin-top: 50px;
        }
    }
    @media all and (max-width: 768px) {
        :nth-child(2) {
            margin-top: 40px;
        }
    }

    @media all and (max-width: 480px) {
        :nth-child(2) {
            margin-top: 30px;
        }
    }
    @media all and (max-width: 360px) {
        :nth-child(2) {
            margin-top: 10px;
        }
    }
`;
