import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohms } from "../../../general/helpers/functions";
import PreviewModal from "./PreviewModal";

function CurriculamTabBars({ previewVideos, syllabus, duration, topicsname }) {
    const [isModal, setModal] = useState(false);
    const [active, setActive] = useState("active");
    const [selectedLesson, setSelectedLesson] = useState({});
    const [selectedSyllabus, setSelectedSyllabus] = useState(
        syllabus && syllabus[0]
    );
    const [selectedVideo, setSelectedVideo] = useState({});

    const handleTab = () => {
        setActive("active");
    };

    return (
        <MainContainer>
            <PreviewModal
                isPreview={true}
                isModal={isModal}
                setModal={setModal}
                selectedVideo={selectedVideo}
                setSelectedVideo={setSelectedVideo}
                syllabus={syllabus}
                previewVideos={previewVideos}
                duration={duration}
                topicsname={topicsname}
            />
            <LessonContainer>
                {syllabus.map((syllabus) => (
                    <Lessons>
                        <LessonBar
                            onClick={(e) => {
                                e.preventDefault();
                                handleTab();
                                setSelectedSyllabus(syllabus);
                            }}
                            to="#"
                        >
                            <LessonNum className="g-regular">{syllabus.title}</LessonNum>
                            <ArrowContainer
                                active={selectedSyllabus.id === syllabus.id}
                            >
                                <Arrow
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/arrow.svg"
                                    alt="Arrow"
                                />
                            </ArrowContainer>
                        </LessonBar>
                        {selectedSyllabus.id === syllabus.id && (
                            <AdditionalContainer
                                className={active === "active" ? "active" : ""}
                            >
                                {syllabus.topics.map((item) => (
                                    <LessonItems
                                        onClick={() => {
                                            setSelectedLesson(item);
                                        }}
                                        className={
                                            item.id === selectedLesson.id
                                                ? "playing"
                                                : ""
                                        }
                                    >
                                        <ItemLeft>
                                            {item.is_preview ? (
                                                <PlayIcon
                                                    src={
                                                        item.id ===
                                                        selectedLesson.id
                                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-white.svg"
                                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-blue.svg"
                                                    }
                                                    alt="Play"
                                                />
                                            ) : (
                                                <PlayIcon
                                                    src={
                                                        item.id ===
                                                        selectedLesson.id
                                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-white.svg"
                                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-black.svg"
                                                    }
                                                    alt="Play"
                                                />
                                            )}
                                            <LessonTitle
                                                className={
                                                    item.id ===
                                                    selectedLesson.id
                                                        ? "playing"
                                                        : "null"
                                                }
                                                preview={item.is_preview}
                                            >
                                                {item.title}
                                            </LessonTitle>
                                        </ItemLeft>
                                        <ItemRight>
                                            {item.is_preview ? (
                                                <PreviewButton
                                                    className="g-regular"
                                                    setModal={setModal}
                                                    onClick={() => {
                                                        {
                                                            setModal(true);
                                                            setSelectedVideo(
                                                                item
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Preview
                                                </PreviewButton>
                                            ) : (
                                                ""
                                            )}
                                            <Duration
                                                className={
                                                    item.id ===
                                                    selectedLesson.id
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
                        )}
                    </Lessons>
                ))}
            </LessonContainer>
        </MainContainer>
    );
}

export default CurriculamTabBars;

const MainContainer = styled.div``;
const LessonContainer = styled.div``;
const Lessons = styled.div`
    transition: 0.5s;
`;
const LessonBar = styled(Link)`
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    margin: 10px 0;
    border-radius: 9px;
    transition: 0.5s;
    @media (max-width: 480px) {
        padding: 8px 16px;
    }
`;
const LessonNum = styled.span`
    font-size: 16px;
    margin-right: 10px;
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
        transition: 0.5s;
    }
`;
const LessonItems = styled.div`
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
    width: 20px;
    @media (max-width: 480px) {
        width: 15px;
    }
`;
const LessonTitle = styled.p`
    font-size: 14px;
    margin: 0 15px;
    font-family: gordita_regular;
    color: ${(props) => (props.preview ? "#5F7AE9" : "#000")};
    @media (max-width: 480px) {
        font-size: 13px;
    }
    @media (max-width: 640px) {
        word-break: break-word;
    }
    &.playing {
        color: #fff;
    }
`;
const ItemRight = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 510px) {
        flex-direction: column-reverse;
    }
`;
const PreviewButton = styled.span`
    font-size: 14px;
    border-bottom: 1px solid;
    cursor: pointer;
    margin-right: 15px;
    &.playing {
        color: #fff;
    }
    @media (max-width: 480px) {
        font-size: 12px;
    }
    @media (max-width: 510px) {
        margin-right: 0;
    }
`;
const Duration = styled.span`
    font-size: 14px;
    color: #000;
    @media (max-width: 510px) {
        text-align: right;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }

    &.playing {
        color: #fff;
    }
`;
