import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohms } from "../../../general/helpers/functions";
import VideoPlayer from "../../../applications/video-player/src/VideoPlayer";
import ReactPlayer from "react-player";

function PreviewModal({ selectedVideo, isModal, isPromo, promoVideo, previewVideos, setModal }) {
    const [playingVideo, setPlayingVideo] = useState({});
    const [showPromo, setShowPromo] = useState(false);
    const [isYT, setIsYt] = useState(false);

    const renderTopicVideo = () =>
        isYT ? (
            <div className="player-wrapper">
                <ReactPlayer
                    className="react-player"
                    url={playingVideo?.playlist_url}
                    playing="true"
                    controls="true"
                    width="100%"
                    height="100%"
                />
            </div>
        ) : (
            <VideoPlayer source={playingVideo?.playlist_url} />
        );

    useEffect(() => {
        if (isPromo && promoVideo && previewVideos.length > 0) {
            if (promoVideo.playlist_url) {
                setPlayingVideo(promoVideo);
                setShowPromo(true);
            } else {
                setPlayingVideo(previewVideos[0]);
            }
        }
    }, [promoVideo, isPromo, previewVideos.length]);

    useEffect(() => {
        if (selectedVideo) {
            setPlayingVideo(selectedVideo);
        }
    }, [selectedVideo]);

    useEffect(() => {
        function matchYoutubeUrl(url) {
            let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if (url.match(p)) {
                setIsYt(true);
            } else {
                setIsYt(false);
            }
        }

        if (playingVideo.playlist_url) {
            matchYoutubeUrl(playingVideo.playlist_url);
        }
    }, [playingVideo, isYT]);

    return (
        isModal && (
            <BackContainer>
                <Overlay></Overlay>
                <ModalContainer>
                    <VideoContainer>{renderTopicVideo()}</VideoContainer>
                    <LessonContainer>
                        <Lessons>
                            <LessonBar>
                                <LessonNum className="g-regular">Previews</LessonNum>
                            </LessonBar>
                            <AdditionalContainer>
                                {isPromo && showPromo && (
                                    <LessonItem
                                        onClick={() => {
                                            setPlayingVideo(promoVideo);
                                        }}
                                        className={
                                            playingVideo && playingVideo.id === promoVideo.id
                                                ? "playing"
                                                : "null"
                                        }
                                    >
                                        <ItemLeft>
                                            <PlayIcon
                                                src={
                                                    playingVideo &&
                                                    playingVideo.id === promoVideo.id
                                                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-white.svg"
                                                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-blue.svg"
                                                }
                                                alt="Play"
                                            />
                                            <LessonTitle>{promoVideo.name}</LessonTitle>
                                        </ItemLeft>
                                        <ItemRight>
                                            <Duration>
                                                {secondsTohms(promoVideo.duration, "time_format")}
                                            </Duration>
                                        </ItemRight>
                                    </LessonItem>
                                )}
                                {previewVideos.map((item) => (
                                    <LessonItem
                                        key={item.id}
                                        onClick={() => {
                                            setPlayingVideo(item);
                                        }}
                                        className={item.id === playingVideo.id ? "playing" : "null"}
                                    >
                                        <ItemLeft>
                                            <PlayIcon
                                                src={
                                                    item.id === playingVideo.id
                                                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-white.svg"
                                                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/play-circle-blue.svg"
                                                }
                                                alt="Play"
                                            />
                                            <LessonTitle className="g-regular">{item.title}</LessonTitle>
                                        </ItemLeft>
                                        <ItemRight>
                                            <Duration>
                                                {secondsTohms(item.duration, "time_format")}
                                            </Duration>
                                        </ItemRight>
                                    </LessonItem>
                                ))}
                            </AdditionalContainer>
                        </Lessons>
                        {/* ))} */}
                    </LessonContainer>

                    <CloseButton onClick={() => setModal(false)}>
                        <CloseIcon
                            // src={require("../../../../assets/images/prime-program/close.png")}
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/close.png
                            "
                            alt="Arrow"
                        />
                    </CloseButton>
                </ModalContainer>
            </BackContainer>
        )
    );
}
export default PreviewModal;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0;
`;
const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
`;
const ModalContainer = styled.div`
    position: absolute;
    left: 50%;
    width: 45%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 9px;
    background-color: #fff;
    @media (max-width: 1440px) {
        width: 45%;
    }
    @media (max-width: 1280px) {
        width: 55%;
    }
    @media (max-width: 980px) {
        width: 65%;
    }
    @media (max-width: 768px) {
        width: 75%;
    }
    @media (max-width: 640px) {
        width: 85%;
    }
    @media (max-width: 480px) {
        width: 90%;
        max-height: 490px;
    }
`;
const VideoContainer = styled.div`
    position: relative;
`;
const CloseButton = styled.span`
    width: 25px;
    position: absolute;
    top: 10px;
    right: -38px;
    cursor: pointer;
    @media (max-width: 480px) {
        right: -17px;
        width: 25px;
        position: absolute;
        top: -28px;
    }
`;
const CloseIcon = styled.img`
    display: block;
    width: 100%;
`;

const LessonContainer = styled.div`
    padding: 20px 25px;
    @media (max-width: 480px) {
        padding: 10px;
    }
`;
const Lessons = styled.div``;
const LessonBar = styled(Link)`
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
    font-size: 16px;
`;

const AdditionalContainer = styled.div`
    height: 180px;
    overflow-y: scroll;
    transition: 0.5s ease-in-out;
    &.active {
        height: 190px;
        transition: 1s;
    }
    @media (max-width: 480px) {
        height: 80px;
    }
`;
const LessonItem = styled.div`
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
const LessonTitle = styled.span`
    font-size: 16px;
    margin-left: 15px;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const ItemRight = styled.div`
    display: flex;
    align-items: center;
`;
const Duration = styled.span`
    font-size: 13px;
    font-family: "gordita_regular";
    @media (max-width: 480px) {
        font-size: 11px;
    }
`;
