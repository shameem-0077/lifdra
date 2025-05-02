import React from "react";
import { useState } from "react";
import styled from "styled-components";
import clr from "../../../../../assets/images/bck.svg";

function EngineeringProgram() {
    const [item, setItem] = useState([
        {
            id: 1,
            image: require("../../../../../assets/images/newlandingpage/blue-tick.png"),
            heading: "Systematic E-Learning Syllabus",
            description: " Spend One hour per day for 365 days.",
        },
        {
            id: 2,
            image: require("../../../../../assets/images/newlandingpage/yellow-tick.png"),
            heading: "Practice",
            description:
                "A timely practice session to get experience with the real world projects.",
        },
        {
            id: 3,
            image: require("../../../../../assets/images/newlandingpage/red-tick.png"),
            heading: "Workshop",
            description:
                "Build a better understanding on practice session through workshop.",
        },
        {
            id: 4,
            image: require("../../../../../assets/images/newlandingpage/green-tick.png"),
            heading: "Assessment",
            description:
                "Evaluate and know where you stand with regular assessments.",
        },
        {
            id: 5,
            image: require("../../../../../assets/images/newlandingpage/red-tick.png"),
            heading: "Support",
            description:
                "Support for doubts and queries, because asking is learning.",
        },

        {
            id: 6,
            image: require("../../../../../assets/images/newlandingpage/green-tick.png"),
            heading: "Follow up",
            description:
                "Assistance by dedicated Students Relationship Managers.",
        },
        {
            id: 7,
            image: require("../../../../../assets/images/newlandingpage/red-tick.png"),
            heading: "Hackathon",
            description:
                "Exclusive hackathons and coding events for Steyp students. ",
        },
        {
            id: 8,
            image: require("../../../../../assets/images/newlandingpage/yellow-tick.png"),
            heading: "Certification",
            description:
                "Earn certificates on successfully completing a profession.",
        },
        {
            id: 8,
            image: require("../../../../../assets/images/newlandingpage/blue-tick.png"),
            heading: "Placement",
            description:
                "Opportunity for placement on successful completion of the program. ",
        },
    ]);
    return (
        <Container>
            <Content className="wrapper">
                <Heading>
                    <span>Engineering </span> Program Learning Process
                </Heading>
                <Description>
                    To mould highly skilled engineering professionals through
                    comprehensive technology training and mentorship.
                </Description>
                <MiddleContainer>
                    {item.map((items, index) => (
                        <Div key={index}>
                            <Left>
                                <ImageContainer heading={items.heading}>
                                    <ImgContainer>
                                        <img src={items.image} alt="image" />
                                    </ImgContainer>
                                </ImageContainer>
                            </Left>
                            <Right>
                                <h6>{items.heading}</h6>
                                <p>{items.description}</p>
                            </Right>
                        </Div>
                    ))}
                </MiddleContainer>
            </Content>
        </Container>
    );
}

export default EngineeringProgram;
const Container = styled.div`
    background-color: #fffaf0;

    padding: 90px 0 90px 0;
    @media all and (max-width: 980px) {
        padding: 80px 0 40px 0;
    }
    @media all and (max-width: 768px) {
        padding: 65px 0 40px 0;
    }
    @media all and (max-width: 640px) {
        padding: 60px 0;
    }
    @media all and (max-width: 360px) {
        padding: 60px 0 20px;
    }
`;
const Content = styled.div``;
const Heading = styled.h2`
    background-image: url(${clr});
    /* background-repeat: no-repeat; */
    font-size: 32px;
    text-align: center;
    font-family: "gordita_medium";
    color: #2d2d2d;
    span {
        color: #0e9f6a;
        font-family: "gordita_medium";
    }
    @media all and (max-width: 1080px) {
        font-size: 32px;
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
    @media all and (max-width: 360px) {
        font-size: 26px;
    }
`;
const Description = styled.p`
    text-align: center;
    width: 50%;
    margin: 10px auto 0;
    font-family: "gordita_regular";
    @media all and (max-width: 1280px) {
        width: 60%;
    }
    @media all and (max-width: 1080px) {
        width: 75%;
    }
    @media all and (max-width: 980px) {
        width: 90%;
    }
    @media all and (max-width: 640px) {
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
    margin-top: 60px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media all and (max-width: 640px) {
        margin-top: 38px;
    }
    @media all and (max-width: 480px) {
        flex-direction: column;
    }
`;
const Div = styled.div`
    padding: 15px;
    display: flex;
    justify-content: flex-start;
    width: calc(33% - 30px);
    /* border: 2px solid #f8f8f8; */
    border-radius: 6px;
    margin-right: 20px;
    background-color: #fff;
    margin-bottom: 20px;
    &:nth-child(3) {
        margin-right: 0;
    }
    &:nth-child(6) {
        margin-right: 0;
    }
    &:nth-child(7) {
        margin-right: 20px;
    }
    :last-child {
        margin-right: 0px;
    }
    @media all and (max-width: 980px) {
        width: 45%;
        margin-right: 20px !important;
        &:nth-child(2n) {
            margin-right: 0 !important;
        }
        &:last-child {
            margin-right: 0 !important;
        }
    }
    @media all and (max-width: 640px) {
        margin-right: 12px;
        width: 47%;
        margin-bottom: 12px;
        padding: 15px 10px;
        margin-right: 12px !important;
        &:nth-child(2n) {
            margin-right: 0 !important;
        }
        &:last-child {
            margin-right: 0 !important;
        }
        /* &:nth-child(3) {
            margin-right: 12px;
        }
        &:nth-child(5) {
            margin-right: 12px;
        }
        &:nth-child(4) {
            margin-right: 0;
        }
        &:nth-child(6) {
            margin-right: 0;
        }
    } */
        @media all and (max-width: 480px) {
            width: 100%;
            margin-right: 0;
            &:nth-child(3) {
                margin-right: 0px;
            }
            &:nth-child(5) {
                margin-right: 0px;
            }
            &:nth-child(4) {
                margin-right: 0;
            }

            &:nth-child(6) {
                margin-right: 0;
            }
        }
    }
`;
const Left = styled.div`
    margin-right: 20px;
    @media all and (max-width: 640px) {
        margin-right: 12px;
    }
`;
const Right = styled.div`
    h6 {
        color: #545454;
        font-family: "gordita_medium";
        font-size: 18px;
        margin-bottom: 10px;
        @media all and (max-width: 640px) {
            font-size: 16px;
            margin-bottom: 7px;
        }
    }
    p {
        font-family: "gordita_regular";
        font-size: 14px;
        color: #707070;
        @media all and (max-width: 980px) {
            font-size: 13px;
        }
    }
`;
const ImgContainer = styled.div`
    width: 20px;
    @media all and (max-width: 640px) {
        width: 15px;
    }
    img {
        display: block;
        width: 100%;
    }
`;
const ImageContainer = styled.div`
    width: 35px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${({ heading }) =>
        heading == "E-Learning"
            ? "#EDF9FF"
            : heading == "Support"
            ? "#FFF4F3"
            : heading == "Workshop"
            ? "#FFF4F3"
            : heading == "Follow up"
            ? "#E9F7F2"
            : heading == "Practice"
            ? "#FFF5E0"
            : heading == "Certification"
            ? "#FFF5E0"
            : heading == "Assessment"
            ? "#E9F7F2"
            : heading == "Systematic E-Learning Syllabus"
            ? "#EDF9FF"
            : heading == "Exclusive Event"
            ? "#FFF4F3"
            : heading == "Placement"
            ? "#EDF9FF"
            : ""};
    @media all and (max-width: 640px) {
        width: 30px;
        padding: 8px;
    }
`;
