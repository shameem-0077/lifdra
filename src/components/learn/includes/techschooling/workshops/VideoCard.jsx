import React from "react";
import VideoPlayer from "../../../../applications/video-player/src/VideoPlayer";

export default function VideoCard(props) {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [
            {
                src:
                    "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
                type: "video/mp4",
            },
        ],
    };
    return (
        <VideoPlayer
            {...videoJsOptions}
            cover={props.image}
            source={props.playlist}
        />
    );
}
