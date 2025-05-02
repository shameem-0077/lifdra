import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import imageBg from "../../../../assets/images/web/blue-shade.png";
import bggradient from "../../../../assets/images/web/color.png";

const Introduction = () => {
    const techPlatform = [
        {
            id: 1,
            type: "school students",
            name: "Tech Schooling",
            icon: require("../../../../assets/images/web/Landing-page/new/club.svg"),
            link: "/explore/tech-schooling/",
        },
        {
            id: 1,
            type: "college students",
            name: "Tech Degree ",
            icon: require("../../../../assets/images/web/Landing-page/new/hub.svg"),
            link: "/explore/tech-degree/",
        },
        {
            id: 1,
            type: "graduates",
            name: "Tech Grad",
            icon: require("../../../../assets/images/web/Landing-page/new/degree.svg"),
            link: "/explore/tech-grad/",
        },
    ];
    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            <Title>
                <span>Steyp</span> Introducing <small>Tech platform</small> for{" "}
                <br className="break" /> School students, College students and
                Graduates
            </Title>
            <Description>
                This platform is introduced to build a tech-literate generation
                by making technology education simple and attainable for all.
            </Description>
            <IconSection>
                {techPlatform.map((data) => (
                    <>
                        <Card key={data.id} to={data.link}>
                            <Icon>
                                <img src={data.icon} alt="Icon" />
                            </Icon>
                            <CardTitle>{data.name}</CardTitle>
                            <CardLabel>
                                for <span>{data.type}</span>
                            </CardLabel>
                        </Card>
                        <Border></Border>
                    </>
                ))}
            </IconSection>
        </Container>
    );
};

export default Introduction;

const Container = styled.div`
    padding: 140px 0 150px !important;
    @media all and (max-width: 768px) {
        padding: 130px 0 !important;
    }
    @media all and (max-width: 768px) {
        padding: 100px 0 !important;
    }
    @media all and (max-width: 480px) {
        padding: 80px 0 !important;
    }
    @media all and (max-width: 360px) {
        padding: 60px 0 !important;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 30px;
    color: #2d2d2d;
    text-align: center;
    /* max-width: 750px; */
    span {
        color: #57c289;
        font-size: 40px;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: -80px;
            left: -100px;
            width: 300px;
            height: 300px;
            /* background: url(${bggradient}) no-repeat; */
            background-size: contain;
            display: block;
            z-index: -1;
        }
    }
    small {
        border-bottom: 4px solid #57c289;
        font-size: 34px;
    }
    @media all and (max-width: 1110px) {
        margin-bottom: 20px;
        font-size: 32px;
        span {
            color: #57c289;
            font-size: 36px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 32px;
        }
    }
    @media all and (max-width: 768px) {
        font-size: 30px;
        .break {
            display: none !important;
        }
        span {
            color: #57c289;
            font-size: 32px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 30px;
        }
    }

    @media all and (max-width: 640px) {
        font-size: 26px;

        span {
            color: #57c289;
            font-size: 28px;
            &::before {
                content: "";
                position: absolute;
                top: -50px;
                left: -100px;
                width: 250px;
                height: 250px;
                background: url(${bggradient}) no-repeat;
                background-size: contain;
                display: block;
                z-index: -1;
            }
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 26px;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 24px;

        span {
            color: #57c289;
            font-size: 26px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 24px;
        }
    }
    @media all and (max-width: 360px) {
        font-size: 22px;
        margin-bottom: 15px;

        span {
            color: #57c289;
            font-size: 24px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 22px;
        }
    }
`;
const Description = styled.p`
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 60px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 45px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
        margin-bottom: 40px;
    }
`;
const IconSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 640px) {
        flex-direction: column;
    }
`;
const Card = styled(Link)`
    display: block;
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-color: #fff;
    min-width: 200px;
    border: 2px solid #e9e9e9;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    &:hover {
        border: 2px solid #57c289;
        position: relative;
        /* &:before {
            content: "";
            width: 300px;
            height: 300px;
            position: absolute;
            bottom: -150px;
            right: -80px;
            background: url(${imageBg}) no-repeat;
            background-size: contain;
            display: block;
            z-index: -1;
        } */
    }
    @media all and (max-width: 768px) {
        width: 150px;
        min-width: 150px;
        height: 150px;
    }
    @media all and (max-width: 640px) {
        width: 200px;
        min-width: 200px;
        height: 200px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        min-width: 150px;
        height: 150px;
    }
`;
const Icon = styled.span`
    display: block;
    width: 70px;
    margin: 0 auto;
    margin-bottom: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        width: 50px;
    }
    @media all and (max-width: 640px) {
        width: 60px;
    }
    @media all and (max-width: 480px) {
        width: 50px;
    }
`;
const CardTitle = styled.h3`
    color: #545454;
    font-family: gordita_medium;
    font-size: 18px;
    @media all and (max-width: 768px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const CardLabel = styled.p`
    color: #545454;
    font-family: gordita_medium;
    font-size: 14px;
    span {
        color: #57c289;
        font-family: gordita_bold;
    }
    @media all and (max-width: 768px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;

const Border = styled.span`
    width: 50px;
    height: 2px;
    display: block;
    border-bottom: 2px dashed #57c289;
    &:last-child {
        display: none;
    }
    @media all and (max-width: 640px) {
        width: 2px;
        height: 50px;
        border-bottom: none;
        border-left: 2px dashed #57c289;
    }
    @media all and (max-width: 360px) {
        height: 30px;
    }
`;
