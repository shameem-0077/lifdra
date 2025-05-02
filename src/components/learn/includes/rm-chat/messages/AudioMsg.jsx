import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styled from "styled-components";

export default function AudioMsg(props) {
    return props.voice ? (
        <Container>
            <AudioPlayer
                customIcons={{
                    play: (
                        <img
                            alt=""
                            className="aud-action"
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/play-icon.svg"
                        />
                    ),
                    pause: (
                        <img
                            alt=""
                            className="aud-action"
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/pause-icon.svg"
                        />
                    ),
                }}
                layout="horizontal-reverse"
                showJumpControls={false}
                src={props.voice}
            />
        </Container>
    ) : null;
}
const Container = styled.div``;
