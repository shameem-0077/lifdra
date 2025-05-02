import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import clr from "../../../../../assets/images/bck.svg";

function Intenship() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleRoute = () => {
        dispatch({
            type: "UPDATE_STUDENT_TYPE",
            student_type: "Graduates",
        });
        history.push("/tech-grad/apply");
        localStorage.setItem("student", JSON.stringify("Graduates"));
    };
    return (
        <Cover id="internship">
            <Container className="wrapper">
                <LeftSection>
                    {/* <Top> */}
                    <SectionTitle>
                        6 month offline Internship Program
                        <span> for Graduates or Dropouts</span>
                    </SectionTitle>
                    {/* <p>(For College Students / Graduates)</p> */}
                    {/* </Top> */}
                    <SectionDescription>
                        A 6-month internship cum placement program for graduates
                        from IT or related fields. Through this program,
                        students are given comprehensive technology training
                        with real-world industry experience to upskill them into
                        professional Full-Stack Developers.
                    </SectionDescription>{" "}
                    <ApplyButton onClick={() => handleRoute()}>
                        Apply Now
                    </ApplyButton>
                </LeftSection>
                <RightSection>
                    <CardsCover>
                        <Circle>
                            <img
                                src={require("../../../../../assets/images/steyp-update/circle.svg")}
                                alt="image"
                            />
                        </Circle>
                        <InterviewCard className="offset-one">
                            <Icon>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/interview.svg"
                                    }
                                    alt="image"
                                />
                            </Icon>
                            <ContentContainer>
                                <Title>100% Placement</Title>
                                <Description>
                                    Assured placement for candidates
                                </Description>
                            </ContentContainer>
                        </InterviewCard>
                        <TrainingCard>
                            <Icon>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/training.svg"
                                    }
                                    alt="image"
                                />
                            </Icon>
                            <ContentContainer>
                                <Title>Become a Full Stack Developer</Title>
                                <Description>
                                    Learning website development, web
                                    application development and mobile
                                    application development.
                                </Description>
                            </ContentContainer>
                        </TrainingCard>
                        <JobCard className="offset-two">
                            <Icon>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/job.svg"
                                    }
                                    alt="image"
                                />
                            </Icon>
                            <ContentContainer>
                                <Title>Experience on Live Projects</Title>
                                <Description>
                                    Work on several live projects as part of
                                    internship
                                </Description>
                            </ContentContainer>
                        </JobCard>
                    </CardsCover>
                </RightSection>
            </Container>
            <ApplyButton className="responsive" onClick={() => handleRoute()}>
                Apply Now
            </ApplyButton>
        </Cover>
    );
}

export default Intenship;
const Cover = styled.div`
    background-color: #fff;
    padding: 150px 0 210px 0;

    @media all and (max-width: 1280px) {
        padding: 150px 0 210px 0;
    }
    @media all and (max-width: 1100px) {
        grid-gap: 50px;
        padding: 100px 0;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
        padding: 90px 0;
    }
    @media all and (max-width: 768px) {
        /* padding-top: 100px; */
    }
    @media all and (max-width: 640px) {
        padding: 60px 0;
        grid-gap: 20px;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0;
        grid-gap: 20px;
    }
`;
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 70px;
    /* padding: 165px 0 230px 0px; */
    align-items: center;

    @media all and (max-width: 1280px) {
        /* padding-top: 200px; */
    }
    @media all and (max-width: 1100px) {
        grid-gap: 50px;
        /* padding: 80px 0; */
        /* padding-top: 110px; */
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
        /* padding: 70px 0; */
        /* padding-top: 85px; */
        grid-gap: 100px;
        /* padding-bottom: 150px; */
    }
    @media all and (max-width: 768px) {
        /* padding-top: 100px; */
    }
    @media all and (max-width: 640px) {
        /* padding: 0 0 100px; */
        grid-gap: 40px;
    }
    @media all and (max-width: 480px) {
        /* padding: 0 0 100px; */
        grid-gap: 0px;
    }
`;
const RightSection = styled.div`
    @media all and (max-width: 980px) {
        max-width: 500px;
        margin: 0 auto;
        /* order: 2; */
    }
    @media all and (max-width: 640px) {
        transform: translate(0px, 35px);
    }
`;
const LeftSection = styled.div`
    /* margin-left: 50px; */
    @media all and (max-width: 640px) {
        margin-top: 75px;
        text-align: center;
    }
    @media all and (max-width: 480px) {
        margin-top: 0px;
    }
`;

const CardsCover = styled.div`
    padding: 30px 30px 0 30px;
    margin-right: 20%;
    border-radius: 10px;
    position: relative;
    @media all and (max-width: 1280px) {
        margin-right: 10%;
    }

    .offset-one {
        transform: translateX(15%);
        margin-bottom: 20px;
        @media all and (max-width: 480px) {
            transform: translateX(0);
        }
    }
    .offset-two {
        transform: translate(30%, 20px);
        @media all and (max-width: 1280px) {
            transform: translate(15%, 20px);
        }
        @media all and (max-width: 480px) {
            transform: translate(0, 20px);
        }
    }
    @media all and (max-width: 1400px) {
        margin-right: 10%;
    }
    @media all and (max-width: 1280px) {
        margin-right: 0%;
    }
    @media all and (max-width: 480px) {
        padding: 20px 20px 36px 20px;
        margin-right: 0;
        background: rgb(244, 232, 166);
    }
`;
const InterviewCard = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    @media all and (max-width: 480px) {
        display: block;
    }
`;
const TrainingCard = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    position: relative;
    z-index: 10;
    @media all and (max-width: 480px) {
        display: block;
    }
`;
const JobCard = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    position: relative;
    @media all and (max-width: 480px) {
        display: block;
    }
`;
const Icon = styled.div`
    margin-right: 20px;
    width: 50px;

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 40px;
        margin-bottom: 10px;
    }
`;
const ContentContainer = styled.div`
    flex: 1;
`;
const Title = styled.h3`
    font-size: 16px;
    font-family: gordita_medium;
    margin-bottom: 5px;
`;
const Description = styled.p`
    font-size: 13px;
`;
const SectionTitle = styled.h2`
    background-image: url(${clr});
    font-size: 38px;
    margin-bottom: 30px;
    font-family: gordita_medium;
    color: #000;
    span {
        font-size: inherit;
        color: #0fa56e;
        font-family: inherit;
    }

    @media all and (max-width: 1280px) {
        font-size: 30px;
    }
    @media all and (max-width: 980px) {
        font-size: 34px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 768px) {
        font-size: 32px;
        margin-bottom: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 26px;
    }
    @media all and (max-width: 360px) {
        text-align: center;
    }
    @media all and (max-width: 320px) {
    }
`;
const SectionDescription = styled.p`
    max-width: 550px;
    margin-bottom: 30px;
    @media all and (max-width: 980px) {
        max-width: 90%;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
        max-width: 100%;
    }
    @media all and (max-width: 480px) {
        max-width: 100%;
        margin-bottom: 0px;
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

    &:hover {
        opacity: 0.8;
    }
    &.responsive {
        display: none;
        margin: 90px auto 0;
        margin-top: 150px;
    }
    @media all and (max-width: 980px) {
        display: none;
        &.responsive {
            display: flex;
        }
    }

    @media all and (max-width: 640px) {
        margin: 0 auto;
    }
    @media all and (max-width: 480px) {
        &.responsive {
            margin-top: 70px;
        }
    }
`;
const Circle = styled.div`
    position: absolute;
    display: block;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    width: 100%;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1400px) {
        top: 60%;
    }
    @media all and (max-width: 1280px) {
        top: 60%;
    }
    @media all and (max-width: 980px) {
        top: 50%;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
