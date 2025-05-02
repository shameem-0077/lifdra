/* eslint-disable import/first */

import React from "react";
import ReactWaves from "@dschoon/react-waves";
import styled from "styled-components";

class ChatItemAudio extends React.PureComponent {
    state = {
        playing: false,
        pos: 0,
        duration: 0,
    };

    playPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    currentButton = () => {
        let { playing } = this.state;
        return (
            <AudioButtonContainer
                className="audio-play"
                type="button"
                onClick={this.playPause}
            >
                {playing ? (
                    <i className="las la-pause"></i>
                ) : (
                    <i className="las la-play"></i>
                )}
            </AudioButtonContainer>
        );
    };

    onPosChange = (e) => {
        let { duration } = this.state;
        this.getMinSecStr(duration - e);
    };

    onReady = (e) => {
        let duration = e.wavesurfer.getDuration();
        this.setState({ duration });
        this.getMinSecStr(duration);
    };

    getMinSecStr = (duration) => {
        duration = Math.round(duration);
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        let seconds_str = "";
        let minutes_str = "";
        if (minutes < 10) {
            minutes_str = `0${minutes}`;
        } else {
            minutes_str = minutes;
        }
        if (seconds < 10) {
            seconds_str = `0${seconds}`;
        } else {
            seconds_str = seconds;
        }
        this.setState({ minutes_str, seconds_str });
    };

    onFinish = (e) => {
        this.setState({ playing: false });
    };

    render() {
        let { minutes_str, seconds_str } = this.state;
        return (
            <AudioPlayer
                className="audio-player"
                style={this.styles.audio_player}
            >
                <ReactWaves
                    audioFile={this.props.audioFile}
                    className={"react-waves"}
                    options={{
                        progressColor: "#FBDBAF",
                        backgroundColor: "#FFF8EE",
                        barWidth: 3,
                        barHeight: 1.2,
                        barGap: 3,
                        height: window.innerWidth <= 640 ? 40 : 64,
                        scrollParent: true,
                        responsive: true,
                        cursorColor: "#FBDBAF",
                        cursorWidth: 0,
                        barRadius: 3,
                        hideScrollbar: true,
                        mediaControls: true,
                        waveColor: "#FFAB2E",
                    }}
                    onReady={this.onReady}
                    onFinish={this.onFinish}
                    volume={1}
                    zoom={1}
                    onPosChange={this.onPosChange}
                    playing={this.state.playing}
                />
                <Duration className="duration" style={this.styles.duration}>
                    {minutes_str}:{seconds_str}
                </Duration>
                {this.currentButton()}
            </AudioPlayer>
        );
    }
    styles = {
        chat_item: {
            marginBottom: "25px",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            width: "50%",
        },
        chat_item_content: {
            display: "flex",
            width: "70%",
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        chat_item_user_image: {
            width: "100%",
            display: "block",
        },

        chat_item_bottom: {
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "20px",
            marginLeft: "50px",
        },
        chat_item_bottom_text: {
            color: "#A4A6B2",
            fontSize: "15px",
        },
        chat_item_img: {
            width: "40%",
            margin: "0 10px",
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
        },
        audio_player_actions_pause: {
            display: "none",
        },
    };
}

const AudioPlayer = styled.div`
    width: 50%;
    border-radius: 16px;
    border-bottom-left-radius: 0;
    background: #fff8ee;
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 10px;

    @media only screen and (max-width: 640px) {
        width: 85%;
        padding: 5px 10px;
    }
`;
const AudioButtonContainer = styled.div`
    background-color: #ffab2e;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-family: product_sansbold;
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: -15px;
    right: 30px;

    @media only screen and (max-width: 640px) {
        position: static;
        width: 36px;
        height: 36px;
    }
`;
const Duration = styled.div`
    color: #ffab2e;

    @media only screen and (max-width: 640px) {
        font-size: 12px;
        margin-right: 5px;
    }
`;

export default ChatItemAudio;
