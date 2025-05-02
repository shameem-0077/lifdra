import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WhoCanJoin = ({ isFormModal, setFormModal }) => {
    const topics = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/top-tick.svg",
            description: `Students who are studying from Class 5 and above`,
        },

        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/red-tick.svg",
            description: `Students who are Tech Enthusiasts`,
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/green-tick.svg",
            description: `Students who can spend one hour on regular basis`,
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/bottom-tick.svg",
            description: `Students who has a laptop or a desktop for day to day studies and practice`,
        },
    ];
    return (
        <Container>
            <ContentSection
                className="wrapper"
                data-aos="fade-left"
                data-aos-once="true"
            >
                <LeftSection>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/who-can-banner.png"
                        }
                        alt="Image"
                    />
                </LeftSection>
                <RightSection>
                    <Title>
                        Who can join in <span>Steyp?</span>{" "}
                    </Title>

                    {topics.map((data) => (
                        <DetailPoints key={data.id}>
                            <Tick>
                                <img src={data.icon} alt="Icon" />
                            </Tick>
                            <span>{data.description}</span>
                        </DetailPoints>
                    ))}

                    <Button to="/tech-schooling/apply/">
                        Apply for SAT
                        <span>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                alt=""
                            />
                        </span>
                    </Button>
                </RightSection>
            </ContentSection>
        </Container>
    );
};

export default WhoCanJoin;
const Button = styled(Link)`
    margin-top: 50px;
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
        margin-top: 30px;
    }
`;
const DetailPoints = styled.span`
    display: flex;
    margin-bottom: 20px;
    color: #595959;
    span {
        font-size: 16px;
        font-family: "gordita_medium";
        @media all and (max-width: 480px) {
            font-size: 14px;
        }
    }
    @media all and (max-width: 640px) {
        span {
            font-size: 14px;
        }
    }
    @media all and (max-width: 480px) {
        margin-bottom: 15px;
    }
`;
const Tick = styled.span`
    display: block;
    width: 33px;
    margin-right: 15px;
    img {
        display: block;
        width: 100%;
        transform: translateY(-3px);
    }
    @media all and (max-width: 480px) {
        min-width: 25px;
        max-width: 25px;
        margin-right: 10px;
    }
`;

const Container = styled.div`
    position: relative;
    padding: 80px 0;
    background: #f9f9f9;
    @media all and (max-width: 480px) {
        padding: 50px 0;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 35px;
    span {
        color: #0e9f6a;
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
        margin-bottom: 27px;
    }
`;

const ContentSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 480px) {
        width: 92% !important;
    }
`;
const LeftSection = styled.div`
    position: relative;
    margin-right: 50px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        order: 2;
    }
    @media all and (max-width: 980px) {
        margin-right: 0;
    }
`;
const RightSection = styled.div`
    @media all and (max-width: 980px) {
        margin-left: 0;
    }
    @media all and (max-width: 480px) {
        padding-right: 0;
        margin-bottom: 30px;
    }
`;
