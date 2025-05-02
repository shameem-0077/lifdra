import React from "react";
import styled from "styled-components";
import colors from "../../../../../Colors";
import RoundGraph from "../../general/RoundGraph";
import Bg_Image from "../../../../../../src/assets/images/Group 3465124.png";
import right from "../../../../../../src/assets/images/right-quote.svg";
import left from "../../../../../../src/assets/images/left-quote.svg";
import star_full from "../../../../../../src/assets/images/Star-full.svg";
import star_half from "../../../../../../src/assets/images/Star-half.svg";

const StarRatingCard = ({
    data: { practice_score },
    data,
    name,
    title,
    setRemarksModal,
    high_score,
    fetchPracticeStatus,
}) => {
    console.log(practice_score, "------data-----");
    return (
        <CardContainer style={{ backgroundImage: `url(${Bg_Image})` }}>
            <LeftContainer>
                <Greeting>
                    {high_score ? (
                        <>
                            Congratulations<GreetingSpan>{name}</GreetingSpan>
                        </>
                    ) : (
                        <>
                            Increase your scores
                            <GreetingSpan>{name}</GreetingSpan>
                        </>
                    )}
                </Greeting>
                {practice_score >= 5 ? (
                    <Description>
                        You have successfully completed practice and got a
                        certification
                    </Description>
                ) : (
                    <Description>
                        Apply for revaluation or improvement to raise your
                        score!
                    </Description>
                )}
                <StarRating>
                    <Stars>
                        {data.practice_score ? (
                            <>
                                {[...Array(data.practice_score)].map((i) => {
                                    return (
                                        <Star
                                            key={i}
                                            src={star_full}
                                            alt="Image"
                                        />
                                    );
                                })}
                                {[...Array(10 - data.practice_score)].map(
                                    (i) => (
                                        <Star
                                            key={i}
                                            src={star_half}
                                            alt="Image"
                                        />
                                    )
                                )}
                            </>
                        ) : (
                            [...Array(10)].map((i) => (
                                <Star key={i} src={star_half} alt="Image" />
                            ))
                        )}
                    </Stars>
                </StarRating>
                {/* {data.practice_score > 5 } */}
                <RemarksContainer>
                    <PlayIcon>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-02-2023/Iconly-new.svg"
                            alt=""
                        />
                    </PlayIcon>
                    <Text
                        onClick={() => {
                            setRemarksModal(true);
                            fetchPracticeStatus();
                        }}
                    >
                        View Remarks
                    </Text>
                </RemarksContainer>
            </LeftContainer>
            <GraphContainer>
                <Title>{title}</Title>
                <RoundGraph
                    count={data.practice_score}
                    content={`${data.practice_score * 10}%`}
                    total={10}
                    contentColor={"#000"}
                    color="#0FA76F"
                    colorLight={colors.lightGreen200}
                    dimension={90}
                    strokewidthPercent={75}
                />
            </GraphContainer>
        </CardContainer>
    );
};

export default StarRatingCard;

const RemarksContainer = styled.div`
    margin-top: 10px;
    background: #15bf81;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 0px;
    gap: 4px;
    width: 202px;
    height: 48px;
    @media all and (max-width: 480px) {
        width: 155px;
        height: 42px;
    }
`;
const PlayIcon = styled.span`
    margin-right: 5px;
    width: 24px;
    img {
        width: 100%;
        display: block;
    }
`;
const Text = styled.p`
    color: #fff;
    font-family: "gordita_medium" !important;
    display: inline-block;
    position: relative;
    font-size: 17px;
    cursor: pointer;
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;

const CardContainer = styled.div`
    width: 100%;
    padding: 13px 30px;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: space-between;
    @media all and (max-width: 980px) {
        flex-direction: column;
        padding: 30px;
        justify-content: space-between;
    }
    @media all and (max-width: 768px) {
        flex-direction: row;
    }
    @media all and (max-width: 640px) {
        flex-wrap: wrap;
        flex-direction: column;
        /* padding: 15px; */
    }
    @media all and (max-width: 480px) {
        /* padding: 20px; */
    }
`;

const LeftContainer = styled.div`
    text-align: left;
    width: 100%;
    @media all and (max-width: 1080px) {
        width: 76%;
    }

    @media all and (max-width: 980px) {
        width: 100%;
    }
    @media all and (max-width: 768px) {
        width: 62%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const Stars = styled.div`
    margin-top: 7px;
    display: flex;
    width: 20px;
    @media all and (max-width: 480px) {
        width: 16px;
    }
`;
const Star = styled.img`
    display: block;
    width: 100%;
    margin-right: 5px;
    &:last-child {
        margin-right: 0;
    }
`;
const Description = styled.h4`
    text-align: left;
    font-size: 14px;
    width: 75%;
    color: #4d4d4d;
    font-family: "gordita_regular";
    @media all and (max-width: 1080px) {
        font-size: 12px;
        width: 80%;
    }
    @media all and (max-width: 640px) {
        width: 75%;
    }
    @media all and (max-width: 360px) {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
`;
const Title = styled.h4`
    font-size: 16px;
    line-height: 30px;
    font-family: gordita_regular;
    color: #4d4d4d;
    margin-right: 30px;
    text-align: left;
    @media all and (max-width: 1280px) {
        font-size: 14px;
    }
    @media all and (max-width: 1080px) {
        font-size: 14px;
        width: 100%;
        line-height: 22px;
    }
    @media all and (max-width: 980px) {
        font-size: 14px;
        width: unset;
        margin-right: 5px;
    }
    @media all and (max-width: 480px) {
    }
`;
const Percentage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid #faefc5;
    font-family: gordita_bold;
    font-size: 22px;
    text-align: center;
    margin: 0 auto 20px;
`;
const StarRating = styled.span`
    display: block;
    width: 100px;
    padding: 5px 0;
    color: #fff;
    font-size: 18px;
    border-radius: 30px;
    font-family: gordita_medium;
    text-align: center;
`;
const StarIcon = styled.i`
    display: inline-block;
    margin-right: 2px;
    font-size: 20px;
`;
const Greeting = styled.p`
    font-size: 20px;
    color: #0fa76f;
    width: 100%;
    margin-left: -22px;
    display: flex;
    font-family: "gordita_medium";
    ::before {
        content: "";
        width: 20px;
        background-image: url(${left});
        background-repeat: no-repeat;
    }
    ::after {
        content: "";
        width: 20px;
        background-image: url(${right});
        background-repeat: no-repeat;
        margin: 15px 0 0 4px;
        @media all and (max-width: 980px) {
            width: 23px;
            height: 20px;
        }
    }
    @media all and (max-width: 1080px) {
        font-size: 16px;
    }
    @media all and (max-width: 980px) {
        font-size: 18px;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        margin-top: 0px;
    }
    @media all and (max-width: 680px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin-left: 0px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const GreetingSpan = styled.p`
    font-size: 18px;
    color: #4d4d4d;
    font-style: italic;
    text-decoration: underline #0fa76f;
    margin-left: 10px;
    font-family: "gordita_medium";
    @media all and (max-width: 1080px) {
        font-size: 16px;
    }
    @media all and (max-width: 980px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
        margin-left: 5px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const GraphContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 50%;
    @media all and (max-width: 980px) {
        width: 100%;
        justify-content: space-evenly;
    }
    @media all and (max-width: 768px) {
        width: 37%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-top: 10px;
    }
`;
