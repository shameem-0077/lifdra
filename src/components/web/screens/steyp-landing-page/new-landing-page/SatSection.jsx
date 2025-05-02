import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import arrow from "../../../../../assets/images/steyp-landing/right-arrow.svg";
import clr from "../../../../../assets/images/bck.svg";
import { useDispatch } from "react-redux";

function SatSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRoute = () => {
        dispatch({
            type: "UPDATE_STUDENT_TYPE",
            student_type: "School Students",
        });
        localStorage.setItem("student", JSON.stringify("School Students"));
        navigate("?action=phone");
    };
    const responsiveSection = () => {
        return (
            <ResponsiveContainer>
                <Card>
                    <Icon>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/01.svg"
                            }
                            alt=""
                        />
                    </Icon>
                    <Right>
                        <TopicTitle>Systematic Learning</TopicTitle>
                        <TopicDescription>
                            365 Days syllabus for students
                        </TopicDescription>
                    </Right>
                </Card>
                <Card>
                    <Icon>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/02.svg"
                            }
                            alt=""
                        />
                    </Icon>
                    <Right>
                        <TopicTitle>Creating Engineers</TopicTitle>
                        <TopicDescription>
                            Learn from the basics and make expertise in the tech
                        </TopicDescription>
                    </Right>
                </Card>
                <Card>
                    <Icon>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/03.svg"
                            }
                            alt=""
                        />
                    </Icon>
                    <Right>
                        <TopicTitle>Building future scientist</TopicTitle>
                        <TopicDescription>
                            Moulding to identify and solve future challenges{" "}
                        </TopicDescription>
                    </Right>
                </Card>
                <ApplyButton className="response" onClick={() => handleRoute()}>
                    Start free trial!
                </ApplyButton>
            </ResponsiveContainer>
        );
    };
    const Right = styled.div`
        text-align: left;
    `;
    const ResponsiveContainer = styled.div`
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        display: none;
        transform: translateY(50%);
        @media all and (max-width: 1280px) {
            display: flex;
            bottom: -12;
            /* position: relative; */
        }
        @media all and (max-width: 980px) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 20px;
            bottom: 20px;
        }
        @media all and (max-width: 768px) {
            position: relative;
            grid-template-columns: 1fr;
            transform: translateY(0%);
        }
    `;
    const Card = styled.div`
        background-color: #fff;
        padding: 15px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        min-width: 250px;
        max-width: 250px;
        border-radius: 8px;
        margin-left: 20px;
        &:first-child {
            margin-left: 0;
        }
        @media all and (max-width: 980px) {
            min-width: unset;
            max-width: unset;
            margin-left: 0px;
        }
        @media all and (max-width: 480px) {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            grid-gap: 14px;
        }
    `;

    return (
        <Container className="wrapper" id="sat">
            <LeftSection>
                <Titlehead>
                    {/* <Top> */}
                    {/* <Sat>Sat</Sat> */}
                    {/* <p>(For School Students)</p> */}
                    {/* </Top> */}
                    <Title>
                        Engineering Program <span>for School Students</span>
                    </Title>
                </Titlehead>
                <Description>
                    Steyp's engineering program is a comprehensive training
                    program for school students from 5th to 12th class, to mould
                    them into skilled engineers and future scientists.
                    <br />
                    <br />
                    In the 365 days program, the student will be trained from
                    zero to become a professional engineer.
                </Description>

                <ApplyButton
                    to="/tech-schooling/apply"
                    onClick={() => handleRoute()}
                >
                    Start free trial!
                </ApplyButton>
                {/* <ImageSection>
          <img
            src={require("../../../../../assets/images/steyp-landing/sat-mamooty.png")}
            alt="Mamooty image"
          />
        </ImageSection> */}
            </LeftSection>
            <RightSection>
                <ImageSection>
                    <img
                        src={
                            // "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-01-2024/laptop.png"
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2024/laptop.svg "
                        }
                        alt="laptop image"
                    />
                </ImageSection>
                <ContentSection>
                    <FindTechEngineer className="PointsCard">
                        <Icon>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/01.svg"
                                }
                                alt=""
                            />
                        </Icon>{" "}
                        <TopicTitle>Systematic Learning</TopicTitle>
                        <TopicDescription>
                            365 Days syllabus for students
                        </TopicDescription>
                        {/* <DecoImage
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/yellow-deco.svg"
                            }
                            alt=""
                        /> */}
                    </FindTechEngineer>
                    <FutureScientist className="PointsCard">
                        <Icon>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/02.svg"
                                }
                                alt=""
                            />
                        </Icon>{" "}
                        <TopicTitle>Creating Engineers</TopicTitle>
                        <TopicDescription>
                            Learn from the basics and become An expert in the
                            field.
                        </TopicDescription>
                    </FutureScientist>
                    <FreeExam className="PointsCard">
                        <Icon>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/03.svg"
                                }
                                alt=""
                            />
                        </Icon>{" "}
                        <TopicTitle>Building future scientist</TopicTitle>
                        <TopicDescription>
                            Moulding to identify and solve future challenges{" "}
                        </TopicDescription>
                    </FreeExam>
                </ContentSection>
            </RightSection>
            {responsiveSection()}
        </Container>
    );
}

export default SatSection;
const Container = styled.div`
    padding: 90px 0;
    display: grid;
    grid-gap: 150px;
    grid-template-columns: 1fr 1fr;
    position: relative;
    align-items: center;
    @media all and (max-width: 1280px) {
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
    @media all and (max-width: 980px) {
        padding-top: 70px;
        padding-bottom: 70px;
    }

    @media all and (max-width: 768px) {
        padding: 60px 0;
        text-align: center;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0;
        text-align: center;
    }
    @media all and (max-width: 360px) {
        /* padding: 20px 0 30px; */
    }
`;
const LeftSection = styled.div`
    @media all and (max-width: 980px) {
        margin-right: -50%;
    }
    @media all and (max-width: 768px) {
        margin-right: 0;
    }
`;
const Titlehead = styled.div`
    background-image: url(${clr});
`;
// const Top = styled.div`
//     display: flex;
//     align-items: center;
//     p {
//         font-size: 20px;
//         margin-left: 25px;
//         color: #000;
//     }
// `;
const RightSection = styled.div`
    position: relative;
    @media screen and (max-width: 1280px) {
        .PointsCard {
            display: none;
        }
    }
`;
const Sat = styled.h2`
    text-transform: uppercase;
    font-size: 45px;
    color: #0e9f6a;
    font-family: gordita_medium;
    @media all and (max-width: 980px) {
        font-size: 44px;
    }
    @media all and (max-width: 360px) {
        font-size: 36px;
    }
`;
const Title = styled.h2`
    font-size: 32px;
    font-family: gordita_medium;
    color: #000;
    /* text-transform: uppercase; */
    margin-bottom: 30px;
    span {
        color: #0e9f6a;
        font-family: inherit;
        font-size: inherit;
    }
    @media all and (max-width: 980px) {
        font-size: 30px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
        margin-bottom: 20px;
    }
`;
const Description = styled.p`
    max-width: 550px;
    margin-bottom: 30px;
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const ApplyButton = styled.div`
    width: 180px;
    height: 50px;
    color: #fff;
    display: flex;
    font-family: gordita_medium;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    border-radius: 6px;
    transition: all 0.4s ease;
    position: relative;
    cursor: pointer;
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: 100px;
        height: 50px;
        background: url(${arrow}) no-repeat;
        right: -80px;
        bottom: -40px;
        background-size: contain;
        @media all and (max-width: 1280px) {
            display: none;
        }
    }
    &:hover {
        opacity: 0.8;
    }
    &.response {
        width: 180px;
        height: 50px;
        color: #fff;
        display: flex;
        font-family: gordita_medium;
        font-size: 16px;
        justify-content: center;
        align-items: center;
        background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
        border-radius: 6px;
        transition: all 0.4s ease;
        position: relative;
        cursor: pointer;
        display: none;
        @media all and (max-width: 480px) {
            margin-bottom: 0px;
            display: block;
            height: unset;
            padding: 14px;
        }
    }
    @media all and (max-width: 640px) {
        margin: 0 auto;
        margin-bottom: 20px;
    }
    @media all and (max-width: 480px) {
        margin: 0 auto;
        margin-bottom: 20px;
        display: none;
    }
`;
const ImageSection = styled.div`
    position: relative;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1280px) {
        /* transform: translateY(30%); */
        width: 60%;
        margin: 0 auto;
    }
    @media all and (max-width: 980px) {
        /* transform: translateY(68%); */
        img {
            width: 110%;
            display: block;
        }
    }
    @media all and (max-width: 768px) {
        transform: translateY(0%);
        img {
            width: 100%;
            display: block;
            max-width: 500px;
            margin: 0 auto;
        }
    }
    @media all and (max-width: 480px) {
        display: none;
    }
    @media all and (max-width: 360px) {
        transform: translateY(15%);
    }
`;

const ContentSection = styled.div`
    position: absolute;
    /* left: -40px; */
    bottom: 80px;
    width: 100%;
    @media all and (max-width: 480px) {
        margin-top: 30px;
    }
`;
const FindTechEngineer = styled.div`
    background-color: #fff;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    min-width: 250px;
    max-width: 250px;
    border-radius: 8px;
    position: absolute;
    bottom: 150px;
    left: 0;
`;
const FutureScientist = styled.div`
    background-color: #fff;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    min-width: 250px;
    max-width: 250px;
    border-radius: 8px;
    position: absolute;
    bottom: -15px;
    left: 55%;
    transform: translateX(-50%);
`;
const FreeExam = styled.div`
    background-color: #fff;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    min-width: 250px;
    max-width: 250px;
    border-radius: 8px;
    position: absolute;
    bottom: 130px;
    right: 0;
`;
const Icon = styled.span`
    display: block;
    width: 60px;
    margin-bottom: 15px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 0px;
        &:first-child {
            width: 40px;
        }
    }
    @media all and (max-width: 360px) {
        &:first-child {
            width: 40px;
        }
    }
`;
const TopicTitle = styled.h3`
    font-size: 16px;
    font-family: gordita_medium;
    color: #313030;
    margin-bottom: 8px;
`;
const TopicDescription = styled.p`
    font-size: 13px;
`;
const DecoImage = styled.img`
    position: absolute;
    top: -40px;
    left: -60px;
    width: 100px;
`;
