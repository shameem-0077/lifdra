import React from "react";
import styled from "styled-components";
import bggradient from "../../../../assets/images/web/color.png";

function Offers({ data }) {
    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            <ContentSection>
                <Title>What We Offer</Title>
                <Description>
                    We offer various programs to help you build your career in
                    the technology field.
                </Description>
            </ContentSection>
            <CardContainer>
                {data.map((data) => (
                    <Card key={data.id}>
                        <Icon>
                            <img src={data.icon} alt="image" />
                        </Icon>
                        <CardHead>{data.title}</CardHead>
                        <CardDescription>{data.description}</CardDescription>
                    </Card>
                ))}
            </CardContainer>
        </Container>
    );
}

export default Offers;
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
        padding-top:40px;
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
    justify-content: center;
    flex-wrap: wrap;
    width: 85%;
    margin: 0 auto;
    margin-top: 70px;
    margin-bottom: -20px;
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
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    padding: 25px;
    margin: 0 15px;
    margin-bottom: 30px;
    width: 30%;
    /* &:nth-child(3n),
    &:last-child {
        margin-right: 0;
    } */

    @media all and (max-width: 1280px) {
        margin: 0 10px 20px;
    }
    @media all and (max-width: 980px) {
        width: 44%;
        margin: 0 15px 30px;
    }

    @media all and (max-width: 768px) {
        margin: 0 10px 20px;
    }
    @media all and (max-width: 580px) {
        width: 100%;
        margin: 0;
    }

    /* &:last-child {
        margin-bottom: 0;
    } */
`;
const Icon = styled.div`
    width: 35px;
    height: 35px;
    margin-bottom: 10px;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
const CardHead = styled.h4`
    font-family: gordita_medium;
    color: #545454;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: unset;
`;
const CardDescription = styled.p`
    font-family: gordita_regular;
    font-size: 14px;
    color: #7e7e7e;
`;
