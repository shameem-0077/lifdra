import React, { useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const TechiesClub = () => {
    const topics = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/calender.svg",
            title: "Learn In-Demand Skills",
            description: `This program will enable students to develop website to mobile applications on their own.
            `,
        },
        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/user.svg",
            title: "Monitor Progress Anytime",
            description: `Through Steyp's edtech platform learning goals can be set and parents can monitor the progress of their children in real-time.`,
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/list.svg",
            title: "Tech Schooling",
            description: `Technology training for students through Steyp’s Tech Schooling platform to develop their coding skills.`,
        },
        // {
        //     id: 4,
        //     icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/enterpreneur.svg",
        //     title: "Nominal Fee",
        //     description: `Become an engineer in a year by spending just Rs 12 per day, and secure children's career.`,
        // },
    ];
    return (
        <Container
            className="wrapper"
            data-aos="fade-right"
            data-aos-once="true"
        >
            <Title>Tech Schooling</Title>
            <Label>
                A program introduced for school students (5th to 12th), to mould
                them into future Engineers and Scientists.
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
                    <Button to="/explore/tech-schooling/">
                        Go to Tech Schooling
                        <span>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                alt=""
                            />
                        </span>
                    </Button>
                </LeftSection>
                <RightSection>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/techie-club.png"
                        alt=""
                    />
                </RightSection>
            </ContentSection>
        </Container>
    );
};

export default TechiesClub;

const Container = styled.div``;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;

    &::before {
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
    }
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
    @media all and (max-width: 360px) {
        &::before {
            content: "";
            position: absolute;
            top: -55px;
            left: -50px;
            width: 300px;
            height: 250px;
        }
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
    margin-right: -30px;
    position: relative;
    @media all and (max-width: 980px) {
        margin-right: 0px;
        padding-left: 0px;
    }
    &::before {
        content: "";
        position: absolute;
        top: -50px;
        right: -20px;
        width: 300px;
        height: 300px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/blue-shade.png")
            no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        @media all and (max-width: 980px) {
            bottom: -130px;
        }
    }
    img {
        display: block;
        width: 100%;
    }
`;
const Topic = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
`;
const TopicIcon = styled.span`
    display: block;
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
    text-transform: capitalize;
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
    margin-bottom: 10px;
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
    width: 200px;
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
        width: 220px;
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
    }
    @media all and (max-width: 360px) {
        margin-left: 40px;
    }
`;
