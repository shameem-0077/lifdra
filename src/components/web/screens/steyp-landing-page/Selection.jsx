import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Selection = ({ setFormModal }) => {
    const data = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/one.svg",
            title: `Aptitude Test`,
            type: `test`,
            description: `A written Aptitude Test is the first process where candidates will be assessed on their logical thinking, tech knowledge, general knowledge, and mathematical ability.`,
        },

        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/two.svg",
            title: `Personal Interview`,
            type: `interview`,
            description: `A Personal Interview is the next process where candidates will be assessed on critical thinking, situation analysis ability, and soft skills.`,
        },
    ];
    return (
        <Contains>
            <Container className="wrapper">
                <ContentTop>
                    <Title>
                        Our <br />
                        selection <span>process</span>
                    </Title>
                    <Description>
                        Candidates can take admissions in Steyp only through
                        qualifying SAT (Steyp’s Aptitude Test). Candidates can
                        apply for SAT online, and attend the test physically
                        from various centres where SAT is conducted.
                    </Description>
                    <Description>
                        There are 2 tests involved which includes a written{" "}
                        <span>Aptitude Test</span> and a{" "}
                        <span>Personal Interview</span>
                    </Description>
                    <Button
                        to="/tech-schooling/apply/"
                        //  onClick={() => setFormModal(true)}
                    >
                        Apply for SAT
                        <span>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                alt=""
                            />
                        </span>
                    </Button>
                </ContentTop>
                <RightSection className="right">
                    <Cards>
                        {data.map((item) => (
                            <Card key={item.type} type={item.type}>
                                <IconContainer>
                                    {" "}
                                    <img src={item.icon} alt="Icon" />
                                </IconContainer>
                                <Details>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </Details>
                            </Card>
                        ))}
                    </Cards>
                </RightSection>
            </Container>
        </Contains>
    );
};

export default Selection;
const Contains = styled.div`
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/selection-background.png")
        no-repeat;
    background-position: 125% 0%;
    background-size: 36%;
    position: relative;
    z-index: 2;
    background-color: #f9f9f9;
`;
const Container = styled.div`
    padding: 90px 0;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    align-items: center;
    @media all and (max-width: 980px) {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 55px;
    }
    @media all and (max-width: 768px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 40px 0 50px;
    }
    @media all and (max-width: 480px) {
        width: 92% !important;
        grid-gap: 45px;
    }
`;

const ContentTop = styled.div``;
const Title = styled.h1`
    font-size: 35px;
    font-family: gordita_medium;
    color: #212121;
    position: relative;
    br {
        @media all and (max-width: 768px) {
            display: none;
        }
    }
    span {
        color: #0fa76f;
        font-family: gordita_medium;
    }
    @media all and (max-width: 1280px) {
        font-size: 40px;
        max-width: 92%;
    }
    @media all and (max-width: 1280px) {
        font-size: 36px;
    }
    @media all and (max-width: 1080px) {
        width: unset;
        max-width: unset;
    }
    @media all and (max-width: 980px) {
        font-size: 38px;
    }
    @media all and (max-width: 768px) {
        font-size: 34px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
        margin-top: 0px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 360px) {
        font-size: 26px;
    }
`;
const Description = styled.p`
    width: 79%;
    margin: 10px 0 40px;
    position: relative;
    & span {
        color: #0fa76f;
    }

    @media all and (max-width: 980px) {
        font-size: 18px;
    }
    @media all and (max-width: 768px) {
        font-size: 16px;
        margin: 10px 0 20px;
        max-width: 80%;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 15px 0;
        max-width: 100%;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Button = styled(Link)`
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

const RightSection = styled.div``;
const Cards = styled.div``;
const Card = styled.div`
    padding: 30px 25px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid;
    border-color: ${(props) =>
        props.type === "test" ? "#4CA4734D" : "#FFAB004D"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 25px;
    margin-bottom: 15px;
    @media all and (max-width: 480px) {
        padding: 25px 19px;
        flex-direction: column;
        align-items: self-start;
        grid-gap: 15px;
    }
    &:last-child {
        margin-bottom: 0px;
    }
`;
const IconContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 57px;
    max-width: 57px;
    @media all and (max-width: 480px) {
        min-width: 35px;
        max-width: 35px;
    }
    img {
        width: 100%;
        display: block;
    }
`;
const Details = styled.div`
    h3 {
        color: #000;
        font-family: "gordita_medium";
        margin-bottom: 10px;
        @media all and (max-width: 480px) {
            font-size: 16px;
        }
    }
    p {
        font-size: 15px;
        @media all and (max-width: 480px) {
            font-size: 14px;
        }
    }
`;
