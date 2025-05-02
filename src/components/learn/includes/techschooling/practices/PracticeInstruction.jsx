import React, { useState } from "react";
import styled from "styled-components";
import VideoPlayer from "../../../../applications/video-player/src/VideoPlayer";

const PracticeInstruction = ({ practice, onClick, handleUpload }) => {
    const [video, setVideo] = useState(false);
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
    return (
        <Container>
            <Top>
                <Title>Practice Instructions</Title>
                {practice.status === "pending" && (
                    <UploadButton
                        onClick={handleUpload}
                        style={{ marginRight: 0 }}
                    >
                        <i class="las la-file-upload m-r-5"></i>Upload
                    </UploadButton>
                )}
            </Top>

            <VideoPlayer
                {...videoJsOptions}
                source={practice.playlist}
                cover={practice.image}
            />
            <VideoTitleBottom>{practice.title}</VideoTitleBottom>
            <Description>{practice.description}</Description>
        </Container>
    );
};

export default PracticeInstruction;
const Container = styled.div``;
const Title = styled.h2`
    color: #4d4d4d;
    font-size: 20px;
    font-family: gordita_medium;
    @media all and (max-width: 640px) {
        font-size: 16px;
    }
`;
const VideoCard = styled.div`
    background-image: url(${({ bg_image }) => bg_image});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: block;
    height: 500px;
    padding: 390px 39px 20px;
    border-radius: 7px;
    overflow: hidden;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background-position: center center;
    cursor: pointer;
    @media all and (max-width: 1200px) {
        height: 400px;
        padding: 300px 20px 20px;
    }
`;
const PlayIcon = styled.span`
    display: block;
`;
const Icon = styled.i`
    color: #fff;
    font-size: 50px;
`;
const VideoTitle = styled.h5`
    color: #fff;
    font-size: 18px;
    font-family: gordita_medium;
`;
const VideoTitleBottom = styled.h5`
    color: #4d4d4d;
    font-size: 20px;
    font-family: gordita_medium;
    margin-top: 30px;
    @media all and (max-width: 640px) {
        font-size: 16px;
    }
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    @media all and (max-width: 640px) {
        margin-bottom: 18px;
    }
`;
const UploadButton = styled.span`
    cursor: pointer;
    background-color: #157ee7;
    color: rgb(255, 255, 255);
    min-width: 125px;
    padding: 9px 21px;
    border-radius: 24px;
    font-size: 15px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
    @media all and (max-width: 640px) {
        font-size: 16px;
        padding: 7px 10px;
    }
`;
const Description = styled.p`
    font-family: gordita_regular;
    font-size: 14px;
    @media all and (max-width: 980px) {
        font-size: 14px;
        margin-bottom: 20px;
    }
`;
