import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled, { keyframes } from "styled-components";
import $ from "jquery";
import VideoPlayer from "../../../../../../components/applications/video-player/src/VideoPlayer.jsx";

function SpotlightVideo({ isModal, setModal, videoThumnail, videoUrl }) {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [
            {
                src: "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
                type: "video/mp4",
            },
        ],
    };
    useEffect(() => {
        if (isModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isModal]);
    return (
        isModal && (
            <BackContainer id="add_video">
                <Overlay onClick={() => setModal(false)}></Overlay>
                <VideoModalContainer>
                    <Video className="player-wrappers">
                        {videoUrl && (
                            <VideoPlayer
                                {...videoJsOptions}
                                source={videoUrl}
                                cover={videoThumnail}
                            />
                        )}
                    </Video>
                    <CloseIconContainer onClick={() => setModal(false)}>
                        <CloseIcon
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-10-2021/close.svg"
                            }
                            alt=""
                        />
                    </CloseIconContainer>
                </VideoModalContainer>
            </BackContainer>
        )
    );
}

export default SpotlightVideo;
const videoAnimation = keyframes`
 0% { transform:scale(0,0); opacity:0; }
 100% { transform:scale(0,0); opacity:1; }
`;
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

const VideoModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 9px;
    transition: all;
    background-color: #000;
    width: 70%;
    animation-name: ${videoAnimation};
    animation-duration: 0.2s;

    @media (max-width: 480px) {
        width: 97%;
    }
`;
const Video = styled.div`
    /* position: relative; */
`;
const CloseIcon = styled.img`
    display: block;
    width: 100%;
`;
const CloseIconContainer = styled.div`
    position: absolute;
    top: 0;
    right: -35px;
    width: 25px;
    cursor: pointer;
    @media (max-width: 640px) {
        right: -30px;
        width: 22px;
    }
    @media (max-width: 480px) {
        right: 0;
        top: -28px;
        width: 20px;
    }
`;
const Iframe = styled.iframe`
    height: 70vh;
`;
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
