import React, { useState } from "react";
import styled from "styled-components";

import DesignationCard from "../includes/DesignationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { learnConfig } from "../../../../../axiosConfig";
import { useEffect } from "react";

function VacationSyllabus() {
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
                    name: "HTML",
                    description: "You will learn to develop beautiful websites",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/hml.svg",
                    background: "rgba(249, 233, 227, 0.4)",
                    border: "2px solid #F9E9E3",
                },
                {
                    id: 2,
                    name: "Cascading Style Sheets",
                    description: "Server side application development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/css.svg",
                    background: "rgba(228, 240, 248, 0.5)",
                    border: "2px solid #E6F4FC",
                },
                {
                    id: 3,
                    name: "Git & Gitlab",
                    description: "Deployment and network operations",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/git.svg",
                    background: "rgba(255, 245, 232, 0.5)",
                    border: "2px solid #FCF3E7",
                },
                {
                    id: 4,
                    name: "JavaScript",
                    description: "Web app like e-commerce development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/js.svg",
                    background: "rgba(255, 246, 203, 0.4)",
                    border: "2px solid #FCF4CA",
                },
                {
                    id: 5,
                    name: "jQuery",
                    description: "Mobile app, & system development",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/jquery.svg",
                    background: "rgba(228, 239, 246, 0.5)",
                    border: "2px solid #E2ECF5",
                },
                {
                    id: 6,
                    name: "Bootstrap",
                    description: "Creating virtual elements",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/bootstrap.svg",
                    background: "rgba(238, 234, 247, 0.5)",
                    border: "2px solid #ECE7F6",
                },

                {
                    id: 7,
                    name: "SASS",
                    description: "Making things learn and react",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/saas.svg",
                    background: "rgba(253, 238, 243, 0.5)",
                    border: "2px solid #FAEBF2",
                },
                {
                    id: 8,
                    name: "React",
                    description: "Training machine to react & understand",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/react.svg",
                    background: "rgba(232, 246, 253, 0.5)",
                    border: "2px solid #E6F4FC",
                },
                {
                    id: 9,
                    name: "Progressive Web Apps",
                    description: "Developing bots that understands human",
                    image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-03-2022/pwa.svg",
                    background: " rgba(237, 229, 249, 0.4)",
                    border: "2px solid #EAE3F8",
                },
            ],
        },
    ]);

    return (
        <Container className="wrapper">
            <TopSection>
                <Title>
                    <span>നമ്മുടെ</span>
                    <br />
                    എഞ്ചിനീയറിംഗ് സിലബസ്
                </Title>
            </TopSection>
            <BottomSection>
                {/* First year section */}
                {yearTopics.map((item) => (
                    <YearSections key={item.id}>
                        <LessonsContainer>
                            {item.lesson.map((data) => (
                                <CardContainer
                                    key={data.id}
                                    background={data.background}
                                    border={data.border}
                                >
                                    <DesignationContainer>
                                        <Top>
                                            {/* <Descrition>
                                                {data.description}
                                            </Descrition> */}
                                            <DesignationImage>
                                                <img src={data.image} alt="" />
                                            </DesignationImage>
                                            <CardTitle>{data.name}</CardTitle>
                                        </Top>
                                    </DesignationContainer>
                                </CardContainer>
                            ))}
                        </LessonsContainer>
                    </YearSections>
                ))}
            </BottomSection>
        </Container>
    );
}

export default VacationSyllabus;

const Container = styled.div`
    padding: 150px 0 180px;

    @media all and (max-width: 1280px) {
        padding: 100px 0 120px;
    }
    @media all and (max-width: 1100px) {
        padding: 80px 0;
    }

    @media all and (max-width: 480px) {
        padding: 80px 0px;
    }
`;

const Title = styled.h2`
    color: #2d2d2d;
    text-align: center;
    margin-bottom: 50px;
    font-size: 39px;
    font-family: "EGGIndulekhaUni";
    span {
        color: #2334a7;
    }
    small {
        font-family: gordita_bold;
    }

    @media all and (max-width: 640px) {
        margin-bottom: 40px;
        font-size: 32px;
    }
`;

const TopSection = styled.div`
    position: relative;
    max-width: 700px;
    margin: 0 auto;
`;

const BottomSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 100px;
    @media all and (max-width: 1400px) {
        display: block;
    }
`;
const LessonsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
    width: calc(16% - 20px);
    margin: 0 10px;
    background-color: ${(props) => props.background};
    border-radius: 10px;
    margin-bottom: 20px;
    min-width: 200px;
    border: ${(props) => props.border};
    @media all and (max-width: 1400px) {
        min-width: 220px;
        max-width: 220px;
    }
    @media all and (max-width: 980px) {
        min-width: 200px;
        max-width: 200px;
    }
    @media all and (max-width: 790px) {
        min-width: 180px;
        max-width: 180px;
    }
    @media all and (max-width: 768px) {
        min-width: calc(50% - 20px);
    }
    @media all and (max-width: 360px) {
        min-width: 80%;
    }
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
const DesignationImage = styled.div`
    margin: 0 auto;
    margin-bottom: 15px;
    width: 100px;
    img {
        display: block;
        width: 100%;
        border-radius: 18px;
        max-width: 100px;
    }
    @media all and (max-width: 540px) {
        width: 80px;
    }
`;

const Top = styled.div``;
const CardTitle = styled.h4`
    font-size: 18px;
    color: #48445b;
    font-family: gordita_medium;
    text-align: center;
    @media all and (max-width: 1100px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;

const DesignationContainer = styled.div`
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;
const Descrition = styled.p`
    font-size: 14px;
    color: #5c5c5c;
    /* @media all and (max-width: 1100px) {
        font-size: 13px;
    } */
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
