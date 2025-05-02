import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Eligibility = ({ isFormModal, setFormModal }) => {
    const topics = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/top-tick.svg",
            title: "Unemployment ratio is increasing",
            description: `Students take up Engineering due to peer pressure and other irrelevant reasons.`,
        },
        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/red-tick.svg",
            title: "Lack of skilled work force",
            description: `A lot of students completes Engineering but fails to pursue needed skills for the industry.`,
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/green-tick.svg",
            title: "The right person for the right job",
            description: `It is high time to realize that if we encourage students what they want to pursue, society will get the right persons for the right duties.`,
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/bottom-tick.svg",
            title: "Not everyone are meant to become Engineers",
            description: `Only the capable, deserving, and passionate students grows to become an Engineer.`,
        },
    ];
    return (
        <Container
            className="wrapper"
            data-aos="fade-right"
            data-aos-once="true"
        >
            <Title>
                Why are we <br />
                checking your <span>ELIGIBILITY?</span>
            </Title>
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

export default Eligibility;
const Button = styled(Link)`
    margin: 20px auto 0 72px;
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
    }
`;

const Container = styled.div`
    padding: 130px 0 100px;
    @media all and (max-width: 768px) {
        padding: 60px 0;
    }
    @media all and (max-width: 480px) {
        width: 92% !important;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 40px;

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
    span {
        color: #4eaf7c;
        font-family: gordita_medium;
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

const ContentSection = styled.div`
    grid-gap: 20px;
    margin-top: 45px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 768px) {
        margin-top: 26px;
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
    @media all and (max-width: 480px) {
        margin-bottom: 21px;
    }
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
    @media all and (max-width: 480px) {
        min-width: 25px;
        max-width: 25px;
        margin-right: 10px;
    }
`;
const TopicContent = styled.div``;
const TopicTitle = styled.h3`
    font-family: gordita_medium;
    font-size: 18px;
    margin-bottom: 15px;
    @media all and (max-width: 1280px) {
        font-size: 16px;
        /* margin-bottom: 10px; */
    }
    @media all and (max-width: 640px) {
        /* font-size: 18px; */
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
        margin-bottom: 10px;
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
