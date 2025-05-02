import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Countdown, { zeroPad } from "react-countdown";
import { getDateStr, getTimeFromDate } from "../../../helpers/functions";
import { useSelector } from "react-redux";
import axios from "axios";
import CountDown from "../../../applications/count-down";

function ExamPageTop({
    endExamination,
    selectedLanguage,
    setSelectedLanguage,
}) {
    const school_scientist_data = useSelector(
        (state) => state.school_scientist_data
    );

    return (
        <Container>
            <DisplayContainer>
                <LeftContainer>
                    <Title>
                        School Scientist Examination {""}(
                        <span>{school_scientist_data.student_category}</span>)
                    </Title>
                    <LanguageBox>
                        <PrimaryLanguage
                            className={
                                school_scientist_data.selected_language ===
                                    "malayalam" && "active"
                            }
                        >
                            Malayalam
                        </PrimaryLanguage>
                        <Switch
                            onClick={(e) => {
                                setSelectedLanguage(
                                    school_scientist_data.selected_language ===
                                        "malayalam"
                                        ? "english"
                                        : "malayalam"
                                );
                            }}
                        >
                            <Ball
                                active={
                                    school_scientist_data.selected_language ===
                                    "english"
                                        ? true
                                        : false
                                }
                            ></Ball>
                        </Switch>
                        <PrimaryLanguage
                            className={
                                school_scientist_data.selected_language ===
                                    "english" && "active"
                            }
                        >
                            English
                        </PrimaryLanguage>
                    </LanguageBox>
                </LeftContainer>
                <RightContainer>
                    {!school_scientist_data.is_loading &&
                        school_scientist_data.exam_status !== "completed" && (
                            <>
                                <TimerDiv>
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/timer_clock.svg"
                                        alt="Clock"
                                    />
                                </TimerDiv>
                                <RemainingTime>
                                    <Time>
                                        <CountDown
                                            targetDate={
                                                school_scientist_data.end_timestamp
                                            }
                                            onComplete={endExamination}
                                        />
                                    </Time>
                                </RemainingTime>
                            </>
                        )}
                    {/* <EndButton
                        onClick={() => {
                            setEndModal(true);
                            setMoment(true);
                        }}
                    >
                        End Test
                    </EndButton> */}
                    {/* <TimerDiv
                        onClick={() => {
                            // setCompletedModal(true);
                        }}
                    >
                        <img
                            src={require("../../../../assets/images/school-scientist/pause-circle.svg")}
                            alt="Pause"
                        />
                    </TimerDiv> */}
                </RightContainer>
            </DisplayContainer>
        </Container>
    );
}

export default ExamPageTop;
const Container = styled.div``;

const DisplayContainer = styled.div`
    border: 1px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 20px;
    @media all and (max-width: 640px) {
        border: unset;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    @media all and (max-width: 360px) {
        padding: 0;
    }
`;
const LeftContainer = styled.div``;
const Title = styled.h3`
    font-family: "gordita_medium";
    margin-bottom: 10px;
    font-size: 21px;
    span {
        font-family: "gordita_medium";
        margin-bottom: 10px;
        font-size: 16px;
        text-transform: uppercase;
        @media all and (max-width: 768px) {
            font-size: 15px;
        }
    }
    @media all and (max-width: 980px) {
        font-size: 19px;
    }
    @media all and (max-width: 768px) {
        font-size: 17px;
    }
    @media all and (max-width: 360px) {
        font-size: 16px;
    }
`;
const LanguageBox = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: 640px) {
        display: none;
    }
`;
const PrimaryLanguage = styled.p`
    height: 17px;
    color: #9e9e9e;
    font-family: "gordita_medium";
    font-weight: 600;
    &.active {
        color: #0fa76f;
    }
`;
const Switch = styled.span`
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 24px;
    background-color: #0fa76f;
    /* color: #0fa76f; */
    border-radius: 30px;
    position: relative;
    margin: 0 10px;
`;
const Ball = styled.span`
    display: inline-block;
    transition: 200ms ease all;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ active }) => (active ? "18px" : "5px")};
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    opacity: 1;
`;
const RemainingTime = styled.div`
    border-left: 1px solid #d4d4d4;
    height: 100%;
    width: 140px;
    display: flex;
    align-items: center;
    padding: 0 30px 0 20px;
    position: relative;
    ::before {
        content: "TIME REMAINING";
        font-family: "gordita_medium";
        position: absolute;
        color: #333;
        top: 0;
        left: 10px;
        font-size: 10px;
        white-space: nowrap;
    }

    @media all and (max-width: 640px) {
        border-left: 0;
        padding: 0 10px;
        width: 92px;
        &::before {
            content: "";
        }
    }
`;
const TimerDiv = styled.span`
    display: none;
    width: 25px;
    height: 25px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        display: inline-block;
    }
`;
const TimeDiv = styled.div`
    display: flex;
    align-items: center;
`;
const Time = styled.div`
    color: #0fa76f;
    font-family: "gordita_medium";
    font-weight: 600;
    height: 22px;
`;
const Min = styled.span`
    position: relative;
    margin-right: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    ::before {
        font-family: "gordita_regular";
        content: "Min";
        position: absolute;
        color: #333;
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;
const Sec = styled.span`
    position: relative;
    margin-left: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    ::before {
        font-family: "gordita_regular";
        content: "Sec";
        position: absolute;
        color: #333;
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;

const EndButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    border: 1px solid #ff5a4f;
    border-radius: 5px;
    font-weight: 600;
    font-size: 15px;
    color: #ff5a4f;
    cursor: pointer;
    width: 120px;
    height: 40px;
    @media all and (max-width: 640px) {
        display: none;
    }
`;
