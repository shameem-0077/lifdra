import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohms } from "../../../helpers/functions";

function LessonBars({
    selectedTopic,
    lessons,
    selectedLesson,
    setSelectedLesson,
}) {
    const [active, setActive] = useState("active");

    const handleTab = () => {
        setActive("active");
    };

    return (
        <MainContainer>
            <LessonContainer>
                {lessons.map((lesson) => (
                    <Lessons>
                        <LessonBar
                            to={lessons.id}
                            onClick={(e) => {
                                e.preventDefault();
                                handleTab();
                                setSelectedLesson(lesson);
                            }}
                        >
                            <LessonNum className="g-regular">
                                {lesson.title}
                            </LessonNum>
                            <ArrowContainer
                                active={selectedLesson.id === lesson.id}
                            >
                                <Arrow
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/arrow.svg"
                                    alt="Arrow"
                                />
                            </ArrowContainer>
                        </LessonBar>
                        {selectedLesson.id === lesson.id ? (
                            <AdditionalContainer
                                className={active === "active" ? "active" : ""}
                            >
                                {lesson.topics.map((item) => (
                                    <LessonItems
                                        to={`/prime-programs/${lesson.course_slug}/${item.id}/`}
                                        className={
                                            item.id === selectedTopic.id
                                                ? "playing"
                                                : ""
                                        }
                                    >
                                        <ItemLeft>
                                            <PlayIcon
                                                src={
                                                    item.id === selectedTopic.id
                                                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-white.svg"
                                                        : item.is_watched
                                                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/green-tick.svg"
                                                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-black.svg"
                                                }
                                                alt="Play"
                                            />
                                            <LessonTitle
                                                className={
                                                    item.id === selectedTopic.id
                                                        ? "playing"
                                                        : "null"
                                                }
                                                preview={item.is_preview}
                                            >
                                                {item.title}
                                            </LessonTitle>
                                        </ItemLeft>
                                        <ItemRight>
                                            <Duration
                                                className={
                                                    item.id === selectedTopic.id
                                                        ? "playing"
                                                        : null
                                                }
                                            >
                                                {secondsTohms(
                                                    item.duration,
                                                    "time_format"
                                                )}
                                            </Duration>
                                        </ItemRight>
                                    </LessonItems>
                                ))}
                            </AdditionalContainer>
                        ) : null}
                    </Lessons>
                ))}
            </LessonContainer>
        </MainContainer>
    );
}

export default LessonBars;

const MainContainer = styled.div``;
const LessonContainer = styled.div``;
const Lessons = styled.div``;
const LessonBar = styled(Link)`
    cursor: pointer;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    margin: 10px 0;
    border-radius: 9px;
    @media (max-width: 480px) {
        padding: 8px 16px;
    }
`;
const LessonNum = styled.span`
    font-size: 15px;
    margin-right: 5px;
    @media (max-width: 400px) {
        font-size: 14px;
    }
`;
const Arrow = styled.img`
    display: block;
    width: 100%;
`;
const ArrowContainer = styled.div`
    transform: rotate(${(props) => (props.active ? "90deg" : "0px")});
    transition: 0.5s;
    width: 15px;
`;
const AdditionalContainer = styled.div`
    height: 0px;
    overflow: hidden;
    &.active {
        height: max-content;
        transition: 1s;
    }
`;
const LessonItems = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    margin: 7px 0;
    cursor: pointer;
    border-radius: 9px;
    background-color: #fff;
    color: #5f7ae9;
    &.playing {
        background-color: #15bf81;
        color: #fff;
    }
    @media (max-width: 480px) {
        padding: 7px 12px;
    }
`;
const ItemLeft = styled.div`
    display: flex;
`;
const PlayIcon = styled.img`
    display: block;
    min-width: 20px;
    @media (max-width: 480px) {
        width: 15px;
    }
`;
const LessonTitle = styled.h3`
    font-size: 14px;
    margin: 0 15px;
    font-family: gordita_regular;
    color: ${(props) => (props.preview ? "#5F7AE9" : "#000")};
    @media (max-width: 480px) {
        font-size: 13px;
    }
    @media (max-width: 640px) {
        margin-right: 10px;
        word-break: break-word;
    }
    &.playing {
        color: #fff;
    }
`;
const ItemRight = styled.div`
    display: flex;
    align-items: center;
`;

const Duration = styled.span`
    font-size: 14px;
    color: #000;
    @media (max-width: 480px) {
        font-size: 12px;
    }
    &.playing {
        color: #fff;
    }
`;
