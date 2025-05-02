import React from "react";
import styled from "styled-components";
import bggradient from "../../../../assets/images/web/color.png";
import bgcard from "../../../../assets/images/web/techiesClub/learning-colors.png";

function Learnings({ data, description }) {
    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            <ContentSection>
                <Title>Individual Learning System</Title>
                <Description>{description}</Description>
            </ContentSection>
            <CardContainer>
                {data.map((data) => (
                    <Card key={data.id}>
                        <Top>
                            <CardHead>{data.title}</CardHead>
                            <CardDescription>
                                {data.description}
                            </CardDescription>
                        </Top>
                        <ImageContainer>
                            <img src={data.icon} alt="image" />
                        </ImageContainer>
                    </Card>
                ))}
            </CardContainer>
        </Container>
    );
}

export default Learnings;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 140px;
    @media all and (max-width: 1100px) {
        padding-top: 120px;
    }
    @media all and (max-width: 980px) {
        padding-top: 100px;
    }
    @media all and (max-width: 768px) {
        padding-top: 90px;
    }
    @media all and (max-width: 640px) {
        padding-top: 80px;
    }
    @media all and (max-width: 480px) {
    }
`;

const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 34px;
    color: #2d2d2d;
    text-align: center;
    font-family: gordita_medium;
    position: relative;
    margin-bottom: 25px;
    &::before {
        content: "";
        position: absolute;
        top: -90px;
        left: -170px;
        width: 300px;
        height: 300px;
        background: url(${bggradient}) no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
    }
    @media all and (max-width: 1110px) {
        font-size: 32px;
    }
    @media all and (max-width: 980px) {
        font-size: 31px;
    }
    @media all and (max-width: 768px) {
        font-size: 30px;
    }
    @media all and (max-width: 640px) {
        font-size: 28px;
        &::before {
            top: -50px;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 26px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 24px;
    }
`;
const Description = styled.p`
    text-align: center;
    position: relative;
    font-family: gordita_regular;
    max-width: 555px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    margin-top: 70px;
    width: 85%;
    @media all and (max-width: 1100px) {
        width: 90%;
    }
    @media all and (max-width: 980px) {
        width: 100%;
        margin-top: 50px;
    }
    @media all and (max-width: 640px) {
        margin-top: 40px;
    }
    @media all and (max-width: 580px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }
    @media all and (max-width: 480px) {
        margin-top: 30px;
        grid-gap: 20px;
    }
`;
const Card = styled.div`
    overflow: hidden;
    position: relative;
    border: 0.5px solid #e3e3e3;
    border-radius: 5px;
    width: 30%;
    margin: 0 15px;
    margin-bottom: 30px;
    padding: 35px 25px 0;
    background-image: linear-gradient(
        to bottom,
        #ffffff,
        #fcfcfd,
        #f8f9fa,
        #f4f6f8,
        #f0f3f5
    );
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media all and (max-width: 1280px) {
        margin: 0 10px 20px;
        padding: 25px 20px 0;
    }
    @media all and (max-width: 980px) {
        width: 44%;
        margin: 0 15px 30px;
    }
    @media all and (max-width: 768px) {
        margin: 0 10px 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    @media all and (max-width: 580px) {
        width: 100%;
        margin: 0;
    }
    @media all and (max-width: 360px) {
        padding: 25px 20px 0;
    }
`;
const Top = styled.div``;
const ImageContainer = styled.div`
    position: relative;
    width: 90%;
    padding-top: 10px;
    margin: 0 auto;

    &::before {
        content: "";
        position: absolute;
        top: -60px;
        right: 0;
        width: 300px;
        height: 300px;
        background: url(${bgcard}) no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    @media all and (max-width: 580px) {
        width: 100%;
        max-width: 250px;
    }
`;
const CardHead = styled.h4`
    font-family: gordita_medium;
    text-align: center;
    color: #545454;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: unset;
`;
const CardDescription = styled.p`
    /* padding: 0 25px; */
    font-family: gordita_regular;
    text-align: center;
    font-size: 13px;
    color: #7e7e7e;
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
