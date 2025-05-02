import React from "react";
import styled from "styled-components";

function Scientist() {
    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <Top>
                    <Heading>Levels of Greenovation</Heading>
                </Top>
                <Bottom>
                    <UL>
                        <Li className="quest">
                            <UpContain>
                            <Up>
                                <ImgContainer>
                                    <img
                                        src={require("../../../../assets/images/school-scientist/note.svg")}
                                        alt="Image"
                                    />
                                </ImgContainer>
                                <Text>Quiz</Text>
                            </Up>
                            <Hr />
                            </UpContain>
                            <Middle>
                                <Para>
                                    We have a general round open for all student
                                    from two categories (junior & senior). This
                                    round comprises an online quiz competition.
                                    You can register for this round in the link
                                    given below.
                                </Para>
                            </Middle>
                            <Down>
                                <Left>
                                    <CalendarImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/calendar.svg")}
                                            alt="Image"
                                        />
                                    </CalendarImg>
                                    <H4>
                                        <Span>4th</Span>June
                                    </H4>
                                </Left>
                                <Right>
                                    <ArrowImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/arrows.svg")}
                                            alt="Image"
                                        />
                                    </ArrowImg>
                                </Right>
                            </Down>
                        </Li>
                        <Li className="Collission ">
                            <UpContain>
                            <Up>
                                <ImgContainer>
                                    <img
                                        src={require("../../../../assets/images/school-scientist/idea.svg")}
                                        alt="Image"
                                    />
                                </ImgContainer>
                                <Text>Idea Pitching</Text>
                            </Up>
                            <Hr />
                            </UpContain>
                            <Middle>
                                <Para>
                                    In the second round, students can attend in
                                    group (minimum of 2 & maximum of 3) and
                                    pitch their ideas. This will be conducted in
                                    online, and problem statements will be
                                    provided.
                                </Para>
                            </Middle>
                            <Down>
                                <Left>
                                    <CalendarImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/calendar.svg")}
                                            alt="Image"
                                        />
                                    </CalendarImg>
                                    <H4>
                                        <Span>5th</Span>June
                                    </H4>
                                </Left>
                                <Right>
                                    <ArrowImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/arrows.svg")}
                                            alt="Image"
                                        />
                                    </ArrowImg>
                                </Right>
                            </Down>
                        </Li>
                        <Li className="Eureka">
                            <UpContain>
                            <Up>
                                <ImgContainer>
                                    <img
                                        src={require("../../../../assets/images/school-scientist/reward.svg")}
                                        alt="Image"
                                    />
                                </ImgContainer>
                                <Text>Presentation</Text>
                            </Up>
                            <Hr />
                            </UpContain>
                            <Middle>
                                <Para>
                                    In this final round, selected groups based
                                    on the performance can present their ideas.
                                </Para>
                            </Middle>
                            <Down>
                                <Left>
                                    <CalendarImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/calendar.svg")}
                                            alt="Image"
                                        />
                                    </CalendarImg>
                                    <H4>
                                        <Span>11th</Span>June
                                    </H4>
                                </Left>
                                <Right>
                                    <ArrowImg>
                                        <img
                                            src={require("../../../../assets/images/school-scientist/arrows.svg")}
                                            alt="Image"
                                        />
                                    </ArrowImg>
                                </Right>
                            </Down>
                        </Li>
                    </UL>
                </Bottom>
            </WrapperContainer>
        </Cover>
    );
}

export default Scientist;
const Cover = styled.div`
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/Levels-of-school-scientist.svg");
    background-color: #4cb0b3;
    padding: 90px 0px;
    position: relative;
    z-index: -2;
    background-size: 88%;
    background-position-x: 151px;
    background-position-y: -55px;

    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
`;
const WrapperContainer = styled.div``;
const Top = styled.div`
    text-align: center;
    margin-bottom: 50px;
    @media all and (max-width: 1280px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
    }
`;
const Heading = styled.h2`
    font-size: 34px;
    margin-bottom: 15px;
    font-family: "gordita_medium";
    color: #ffffff;
    @media all and (max-width: 1280px) {
        margin-bottom: 10px;
        font-size: 32px;
    }
    @media all and (max-width: 1080px) {
        font-size: 36px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const SubHeading = styled.p`
    color: #ffffff;
    font-size: 18px;
    width: 41%;
    margin: 0 auto;
    @media all and (max-width: 1280px) {
        font-size: 17px;
    }
    @media all and (max-width: 1080px) {
        font-size: 18px;
    }
    @media all and (max-width: 980px) {
        width: 80%;
    }
    @media all and (max-width: 640px) {
        font-size: 16px;
        width: 100%;
    }
`;
const Bottom = styled.div``;
const UL = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media all and (max-width: 1080px) {
        justify-content: space-evenly;
    }
`;
const Li = styled.li`
    width: 32%;
    padding: 48px;
    position: relative;
    box-shadow: 0px 5.05258px 118.736px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media all and (max-width: 1080px) {
        width: 45%;
        margin-bottom: 30px;
        :last-child {
            margin-bottom: 0;
        }
    }
    @media all and (max-width: 768px) {
        width: 80%;
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        padding: 40px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 25px;
    }
    @media all and (max-width: 360px) {
        padding: 12px;
    }

    ::before {
        content: "";
        /* display: inline-block; */
        width: 150px;
        height: 150px;
        border: 1px solid #ffff;
        border-radius: 24px;
        position: absolute;
        left: -4%;
        top: -5%;
        z-index: -1;
        @media all and (max-width: 1280px) {
            width: 125px;
            height: 125px;
        }
        @media all and (max-width: 480px) {
            width: 100px;
            height: 100px;
        }
    }

    &.quest {
        background: #fdf9f0;
        ::after {
            content: "";
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/one.svg");
            display: inline-block;
            width: 72px;
            height: 44px;
            background-repeat: no-repeat;
            position: absolute;
            top: 7%;
            right: 0%;
            background-size: 75%;
        }
    }
    &.Collission {
        background: #f2f0fa;
        ::after {
            content: "";
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/two.svg");
            display: inline-block;
            width: 72px;
            height: 44px;
            background-repeat: no-repeat;
            position: absolute;
            top: 7%;
            right: 0%;
            background-size: 75%;
        }
    }
    &.Eureka {
        background: #faefef;
        ::after {
            content: "";
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/three.svg");
            display: inline-block;
            width: 72px;
            height: 44px;
            background-repeat: no-repeat;
            position: absolute;
            top: 7%;
            right: 0%;
            background-size: 75%;
        }
    }
`;
const UpContain = styled.div``;
const Up = styled.div`
    display: flex;
    align-items: center;
`;
const ImgContainer = styled.div`
    width: 10%;
    margin-right: 10px;
    img {
        width: 100%;
        display: block;
    }
`;
const Text = styled.h4`
    font-size: 23px;
    color: #eec749;
    font-family: "gordita_medium";
    @media all and (max-width: 360px) {
        font-size: 20px;
    }
`;
const Hr = styled.hr`
    height: 1px;
    background-color: #747474;
    width: 36%;
    margin: 10px 0px 20px;
    @media all and (max-width: 1280px) {
        margin: 5px 0px 15px;
    }
    @media all and (max-width: 640px) {
        margin: 3px 0px 10px;
    }
    @media all and (max-width: 360px) {
        margin: 5px 0px 10px;
    }
`;

const Middle = styled.div``;
const Para = styled.div`
    font-size: 16px;

    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const Down = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    @media all and (max-width: 768px) {
        margin-top: 15px;
    }
    @media all and (max-width: 1280px) {
        margin-top: 10px;
    }
`;
const Left = styled.div`
    display: flex;
`;
const CalendarImg = styled.div`
    width: 35%;
    margin-right: 10px;
    @media all and (max-width: 1280px) {
        width: 32%;
        margin-right: 5px;
    }
    img {
        width: 100%;
        display: block;
    }
`;
const H4 = styled.h4`
    width: 20px;
`;
const Span = styled.span`
    font-size: 18px;
    color: #eec749;
    font-family: "gordita_medium";
    margin-right: 5px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
`;
const Right = styled.div``;
const ArrowImg = styled.div`
    width: 81%;
    img {
        width: 100%;
        display: block;
    }
`;
