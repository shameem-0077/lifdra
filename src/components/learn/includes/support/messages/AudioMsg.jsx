import React from "react";
import AudioPlayer from "react-modular-audio-player";
import styled from "styled-components";

export default function AudioMsg(props) {
    let audioFiles = [
        {
            src: props.voice,
        },
    ];

    return props.voice ? (
        <Container>
            <AudioPlayer
                playerWidth={window.innerWidth <= 640 ? "14rem" : "20rem"}
                hideRewind
                hideForward
                hideLoop
                hideName
                sliderClass="invert-blue-grey"
                audioFiles={audioFiles}
                iconSize="2rem"
                playIcon="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/play-icon.svg"
                playHoverIcon="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/play-icon.svg"
                pauseIcon="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/pause-icon.svg"
                pauseHoverIcon="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/pause-icon.svg"
            />
        </Container>
    ) : null;
}
const Container = styled.div`
    padding: 7px 0;
`;
