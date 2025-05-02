import React from "react";
import styled from "styled-components";

function EngineeringProgram() {
    const programs = [
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
        {
            id: 5,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/red-tick.svg",
            description: `Students who are Tech Enthusiasts`,
        },
        {
            id: 6,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/green-tick.svg",
            description: `Students who can spend one hour on regular basis`,
        },
        {
            id: 7,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/bottom-tick.svg",
            description: `Students who has a laptop or a desktop for day to day studies and practice`,
        },
    ];
    return (
        <Container className="wrapper">
            <TopSection>
                <Title>
                    <span>Our</span> Engineering{" "}
                    <span>
                        Program{" "}
                        <img
                            src={require("../../../../../assets/images/sat-landing/stroke.svg")}
                            alt="Stroke"
                        />
                    </span>
                </Title>
                <Description>
                    To mould highly skilled engineering professionals through
                    comprehensive technology training and mentorship.
                </Description>
            </TopSection>
            <BottomSection>
                <LeftSection>
                    <img
                        src={require("../../../../../assets/images/sat-landing/engineer-program.svg")}
                        alt="image"
                    />
                </LeftSection>
                <RightSection>
                    {programs.map((data) => (
                        <ProgramCard>
                            <Icon>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/top-tick.svg"
                                    alt=""
                                />
                            </Icon>
                            <DetailSection>
                                <ProgramTitle>E-Learning</ProgramTitle>
                                <ProgramDescription>
                                    Learning is made as easy as it can get.
                                    Learn whenever, wherever.
                                </ProgramDescription>
                            </DetailSection>
                        </ProgramCard>
                    ))}
                </RightSection>
            </BottomSection>
        </Container>
    );
}

export default EngineeringProgram;

const Container = styled.div`
    padding: 100px 0;
`;
const TopSection = styled.div`
    margin-bottom: 50px;
`;

const Title = styled.h2`
    font-family: gordita_medium;
    font-size: 32px;
    color: #000;
    text-align: center;
    margin-bottom: 15px;
    span {
        position: relative;
        font-size: inherit;
        font-family: inherit;

        :first-child {
            color: #13b077;
        }
        img {
            position: absolute;
            width: 150%;
            bottom: -5px;
            right: 0;
            display: block;
            z-index: -1;
        }
    }
`;
const Description = styled.div`
    width: 90%;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-size: 15px;
`;
const BottomSection = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const LeftSection = styled.div`
    width: 40%;

    img {
        width: 100%;
        display: block;
    }
`;
const RightSection = styled.div`
    width: calc(60% - 30px);
    margin-left: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 40px;
    grid-column-gap: 30px;
`;
const ProgramCard = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const Icon = styled.span`
    display: block;
    width: 40px;
    min-width: 40px;
    margin-right: 20px;
    img {
        width: 100%;
        display: block;
    }
`;
const DetailSection = styled.div``;
const ProgramTitle = styled.h4`
    font-family: gordita_medium;
    font-size: 20px;
    margin-bottom: 10px;
`;
const ProgramDescription = styled.p`
    font-size: 13px;
`;
