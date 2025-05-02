import React, { useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const TechiesDegree = () => {
    const topics = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/training.svg",
            title: "Full Stack Development ",
            description: `Imparting all the required skills for developing websites, web applications, mobile applications, ERP, etc to work proficiently in real-world projects.`,
        },

        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/rocket.svg",
            title: "Tech Entrepreneurship ",
            description: `Provides training to students, to co-found tech startups and become future Tech entrepreneurs.
            `,
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/green-rocket.svg",
            title: "Soft Skills Development ",
            description: `Building a resume, giving mock interviews and developing soft skills required for working as part of a company.`,
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/25-09-2021/offline-training.svg",
            title: "Offline Internship",
            description: `Providing offline internships through our centres across Kerala.
            `,
        },
        {
            id: 5,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/placement.svg",
            title: "Placement Assurance",
            description: `Assured placement in our associate companies based on the qualification and performance of the candidates.`,
        },
    ];
    return (
        <Container
            className="wrapper"
            data-aos="fade-right"
            data-aos-once="true"
        >
            <Title>Tech Grad</Title>
            <Label>
                A six-month full-time internship program for graduates or
                dropouts.
            </Label>
            <ContentSection>
                <LeftSection>
                    {topics.map((data) => (
                        <Topic key={data.id}>
                            <TopicIcon>
                                <img src={data.icon} alt="Icon" />
                            </TopicIcon>
                            <TopicContent>
                                <TopicTitle>{data.title}</TopicTitle>
                                <TopicDescription>
                                    {data.description}
                                </TopicDescription>
                            </TopicContent>
                        </Topic>
                    ))}
                    <Button to="explore/tech-grad/">
                        Go to Tech Grad
                        <span>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                }
                                alt=""
                            />
                        </span>
                    </Button>
                </LeftSection>
                <RightSection>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/techie-degree.png"
                        }
                        alt=""
                    />
                </RightSection>
            </ContentSection>
        </Container>
    );
};

export default TechiesDegree;

const Container = styled.div`
    padding-bottom: 100px;
    @media all and (max-width: 768px) {
        padding-bottom: 70px;
    }
    @media all and (max-width: 640px) {
        padding-bottom: 40px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 30px;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    text-transform: capitalize;
    font-size: 34px;
    /* &::before {
        content: "";
        position: absolute;
        top: -75px;
        left: -50px;
        width: 300px;
        height: 300px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/color.png")
            no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
    } */
    @media all and (max-width: 1280px) {
        font-size: 30px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
`;
const Label = styled.p`
    font-family: gordita_medium;
    font-size: 16px;
    margin-bottom: 50px;
    border-left: 3px solid #56c082;
    padding-left: 10px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
        /* margin-bottom: 30px; */
    }
    @media all and (max-width: 768px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        font-size: 13px;
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const ContentSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;
const LeftSection = styled.div`
    @media all and (max-width: 980px) {
        margin-bottom: 60px;
        padding-right: 10%;
    }
    @media all and (max-width: 480px) {
        padding-right: 0;
        margin-bottom: 40px;
    }
`;
const RightSection = styled.div`
    /* padding-left: 50px; */
    /* margin-right: -50px; */
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        padding-left: 0;
        margin-right: 0;
    }
`;
const Topic = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30px;
`;
const TopicIcon = styled.span`
    display: block;
    width: 40px;
    min-width: 40px;
    margin-right: 30px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        margin-right: 20px;
        width: 35px;
        min-width: 35px;
    }
    @media all and (max-width: 360px) {
        width: 30px;
        min-width: 30px;
        margin-right: 10px;
    }
`;
const TopicContent = styled.div``;
const TopicTitle = styled.h3`
    font-family: gordita_medium;
    font-size: 22px;
    margin-bottom: 15px;
    @media all and (max-width: 1280px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;
const TopicDescription = styled.p`
    font-size: 16px;
    width: 85%;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const Button = styled(Link)`
    background-color: #0fa76f;
    font-size: 16px;
    margin-left: 70px;
    color: #ffffff;
    font-family: gordita_medium;
    height: 50px;
    width: 230px;
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
        width: 260px;
        span {
            width: 20px;
            margin-left: 10px;
        }
    }
    @media all and (max-width: 1280px) {
        margin-left: 55px;
    }
    @media all and (max-width: 980px) {
        margin-top: 20px;
        /* margin-left: 60px; */
    }
    @media all and (max-width: 480px) {
        width: 190px;
        height: 40px;
        font-size: 14px;
        /* margin-left: 57px; */
        &:hover {
            width: 220px;
            span {
                width: 20px;
                margin-left: 10px;
            }
        }
    }
    @media all and (max-width: 360px) {
        margin-left: 40px;
    }
`;
