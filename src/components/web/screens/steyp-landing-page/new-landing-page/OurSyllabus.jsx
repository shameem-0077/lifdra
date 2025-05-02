import React, { useState } from "react";
import styled from "styled-components";
import SyllabusCard from "../../../inludes/steyp-landing-page/new-landing-page/SyllabusCard";
import Loader from "../../../../learn/includes/techschooling/general/loaders/Loader";

function OurSyllabus() {
    const [selectedYear, setSelectedYear] = useState("first");
    const [isLoading, setLoading] = useState(false);
    const [item, setItem] = useState([
        {
            id: 1,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/UI_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: "56h 55m",
            heading: "UI Engineer",
            subhead:
                "Develop an interactive responsive website using HTML, CSS, JavaScript and its modern Frameworks.",
            year: "first",
        },
        {
            id: 2,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Backend_Developer_ACsVD3G.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: "24h 13m",
            heading: "Backend Developer",
            subhead:
                "Build beautiful websites with CMS features using Python and Django web framework",
            year: "first",
        },
        {
            id: 3,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/DevOps_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: "6h 13m ",
            heading: "DevOps Engineer",
            subhead: "Build, publish and maintain web application",
            year: "first",
        },
        {
            id: 4,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Web_Application_Developer_vmaZxha.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: "6h 13m ",
            heading: "Web Application Developer",
            subhead:
                "Build an entire Web application with Frontend, Backend and API connections.               ",
            year: "first",
        },
        {
            id: 5,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Mobile_Application_Developer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: "6h 13m ",
            heading: "Mobile Application Developer",
            subhead:
                "Creating iOS and Android Applications and publishing on respective platform",
            year: "first",
        },
        {
            id: 6,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/ERP_Developer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "ERP Developer",
            //   subhead:
            //       "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 7,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Data_Scientist.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "Data Scientist",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 8,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Blockchain_Developer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "Blockchain Developer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 9,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/AR_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "AR Engineer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 10,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/VR_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "VR Engineer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },

        {
            id: 11,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Robotics_Engineer__1.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "Machine Learning Engineer",

            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 12,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/IoT_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "IoT Engineer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 13,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/AI_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "AI Engineer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
        {
            id: 14,
            image: "https://d3mbaugvr53zg5.cloudfront.net/media/elearning/designation/Machine_Learning_Engineer.jpg",
            clock: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/clock.svg",
            time: " ",
            heading: "Robotics Engineer",
            // subhead:
            //     "To mould highly skilled engineering professionals through. ",
            year: "third",
        },
    ]);
    setTimeout(() => {
        setLoading(false);
    });
    return (
        <Container>
            <Content className="wrapper">
                <TopContainer>
                    <Heading>
                        <span>Our</span> Syllabus
                        <Img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/green-line.svg"
                            }
                            alt="line"
                        />
                    </Heading>
                    <Description>
                        To mould highly skilled engineering professionals
                        through comprehensive technology training and
                        mentorship.
                    </Description>
                </TopContainer>
                <ButtonSection>
                    <YearSelect>
                        <FirstYear
                            className={selectedYear === "first" && "active"}
                            onClick={() => (
                                setSelectedYear("first"), setLoading(true)
                            )}
                        >
                            First Year
                        </FirstYear>
                        <ThirdYear
                            className={
                                selectedYear === "third" && "select" && "active"
                            }
                            onClick={() => (
                                setSelectedYear("third"), setLoading(true)
                            )}
                        >
                            Next 3 Year{" "}
                        </ThirdYear>{" "}
                        <ArrowIcon>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/arrow.svg"
                                }
                                alt="Icon"
                            />
                        </ArrowIcon>
                    </YearSelect>
                </ButtonSection>

                {isLoading ? (
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                ) : (
                    <MiddleContainer>
                        {item
                            .filter((years) => years.year === selectedYear)
                            .map((data, index) => (
                                <Cover key={index}>
                                    <SyllabusCard items={data} />
                                </Cover>
                            ))}
                    </MiddleContainer>
                )}
            </Content>
        </Container>
    );
}

export default OurSyllabus;
const Container = styled.div`
    padding: 80px 0 40px 0;
    @media all and (max-width: 768px) {
        padding: 60px 0 60px 0;
    }
`;
const Content = styled.div`
    position: relative;
`;
const TopContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    text-align: center;
    @media all and (max-width: 980px) {
        width: 90%;
    }
    @media all and (max-width: 640px) {
        width: 97%;
    }
`;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const Heading = styled.h2`
    font-family: "gordita_medium";
    font-size: 32px;
    color: #2d2d2d;
    text-transform: capitalize;
    position: relative;
    span {
        color: #0e9f6a;
        font-family: "gordita_medium";
    }
    @media all and (max-width: 980px) {
        font-size: 30px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 26px;
    }
`;
const Img = styled.img`
    position: absolute;
    width: 130px;
    top: 38px;
    right: 39%;
    @media all and (max-width: 1280px) {
        right: 34%;
    }
    @media all and (max-width: 1080px) {
        right: 32%;
    }
    @media all and (max-width: 768px) {
        width: 116px;
        top: 34px;
        right: 32%;
    }
    @media all and (max-width: 640px) {
        right: 27%;
    }
    @media all and (max-width: 480px) {
        width: 104px;
        right: 30%;
    }
    @media all and (max-width: 360px) {
        right: 19%;
    }
`;
const Description = styled.p`
    width: 70%;
    margin: 15px auto;
    font-family: "gordita_regular";
    /* position: relative; */
    @media all and (max-width: 1280px) {
        width: 92%;
    }
    @media all and (max-width: 1080px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const MiddleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-gap: 15px;
    @media all and (max-width: 1280px) {
        /* margin-top: 55px; */
    }
`;
const Cover = styled.div`
    width: calc(33.3% - 60px);
    padding: 0 10px;
    /* margin: 10px; */
    animation: 1000ms ease-in-out 0ms 1 normal none running fade;
    /* :last-child{
        margin:0px;
    } */
    @media all and (max-width: 1280px) {
        width: calc(39% - 60px);
    }
    @media all and (max-width: 980px) {
        width: calc(41% - 60px);
    }
    @media all and (max-width: 768px) {
        width: calc(45% - 10px);
    }
    @media all and (max-width: 640px) {
        width: 48%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        padding: 0px;
    }
`;
const YearSelect = styled.div`
    display: none;
    width: 270px;
    margin: 0 auto;
    border: 1px solid #10a67b;
    border-radius: 60px;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    padding: 5px;
    position: relative;
`;
const FirstYear = styled.div`
    font-size: 16px;
    font-family: "gordita_medium";
    cursor: pointer;
    border-radius: 60px;
    padding: 8px 20px;
    color: #000;
    &.active {
        background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
        color: #fff;
    }
`;
const ThirdYear = styled.div`
    font-size: 16px;
    font-family: "gordita_medium";
    border-radius: 60px;
    padding: 8px 20px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    color: #000;
    &.active {
        background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
        color: #fff;
    }
`;
const ButtonSection = styled.div`
    margin: 40px 0px 25px;
    position: relative;
    @media all and (max-width: 480px) {
        margin: 0px 0px 20px;
    }
`;
const ArrowIcon = styled.div`
    position: absolute;
    top: -40px;
    transform: rotate(45deg);
    width: 35px;
    right: -50px;
    /* @media all and (max-width: 1440px) {
        right: 345px;
    }
    @media all and (max-width: 1280px) {
        right: 245px;
    }
    @media all and (max-width: 1050px) {
        right: 215px;
    }
    @media all and (max-width: 980px) {
        right: 125px;
    }
    @media all and (max-width: 768px) {
        right: 70px;
    }*/
    @media all and (max-width: 640px) {
        display: none;
    }

    img {
        display: block;
        width: 100%;
    }
`;
