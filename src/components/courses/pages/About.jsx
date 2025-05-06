import React from "react";
import styled from "styled-components";

function About() {
    return (
        <Container className="wrapper">
            <Section>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
                <ContentSection>
                    <Title>
                        <span>What </span> are Prime
                        <br />
                        Programs?
                    </Title>
                    <Description>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.{" "}
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
            </Section>
            <Section>
                <ContentSection>
                    <Title>
                        <span>Access </span> to <br /> entire course library
                    </Title>

                    <Description>
                        Pay a small fess and access to entire LCO pro library.
                        This includes all the video courses and tests. As of now
                        we are offering this early bird pricing which will
                        eventually change in future.
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
            </Section>
            <Section>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
                <ContentSection>
                    <Title>
                        <span>Rs10</span>/per day!
                    </Title>

                    <Description>
                        Our most affordable plan will cost you 10rs per day. As
                        people says great learnings can cost you good money.
                        Here at LCO we say, Great learning can cost you some
                        cents
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
            </Section>
            <Section>
                <ContentSection>
                    <Title>
                        <span>Learn </span> as <br /> much as you can!
                    </Title>

                    <Description>
                        Our most affordable plan will cost you 10rs per day. As
                        people says great learnings can cost you good money.
                        Here at LCO we say, Great learning can cost you some
                        cents
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
            </Section>
            <Section>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
                <ContentSection>
                    <Title>
                        <span>Latest </span> and <br />
                        Quality Courses
                    </Title>

                    <Description>
                        Our most affordable plan will cost you 10rs per day. As
                        people says great learnings can cost you good money.
                        Here at LCO we say, Great learning can cost you some
                        cents
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
            </Section>
            <Section>
                <ContentSection>
                    <Title>
                        <span>All the future </span> <br /> Courses will be free
                        for you!
                    </Title>

                    <Description>
                        Our most affordable plan will cost you 10rs per day. As
                        people says great learnings can cost you good money.
                        Here at LCO we say, Great learning can cost you some
                        cents
                    </Description>
                    <SubscribeButton>Subscribe Now</SubscribeButton>
                </ContentSection>
                <ImageSection>
                    <img
                        src={require("../../../../../assets/images/prime-explore/spotlight-image.png")}
                        alt="Spotlight image"
                    />
                </ImageSection>
            </Section>
        </Container>
    );
}

export default About;

const Container = styled.div`
    padding: 0 10%;
`;
const Section = styled.div`
    display: grid;
    grid-template-columns: 3fr 4fr;
    margin-bottom: 110px;
    &:nth-child(2n) {
        grid-template-columns: 4fr 3fr;
    }
    &:last-child {
        margin-bottom: 60px;
    }
    @media all and (max-width: 1100px) {
        margin-bottom: 100px;
        &:last-child {
            margin-bottom: 30px;
        }
    }
    @media all and (max-width: 980px) {
        margin-bottom: 90px;
        &:last-child {
            margin-bottom: 30px;
        }
    }
`;
const ImageSection = styled.div`
    img {
        display: block;
        width: 100%;
    }
`;
const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 50px;
    &:nth-child(2n) {
        margin-right: 0;
        margin-left: 50px;
    }
`;
const Title = styled.div`
    font-family: gordita_medium;
    font-size: 34px;
    margin-bottom: 10px;
    span {
        color: #4ca473;
    }
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 980px) {
        font-size: 28px;
    }
`;

const Description = styled.p`
    max-width: 400px;
    margin-bottom: 30px;
`;

const SubscribeButton = styled.span`
    display: block;
    width: 180px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    border: 2px solid #fff;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #4ca473;
        background-color: #fff;
        border: 2px solid #4ca473;
    }
`;
