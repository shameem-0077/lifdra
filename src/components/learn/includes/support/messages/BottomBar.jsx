import React, { useState } from "react";
import styled from "styled-components";
import { AudioMessagePopup } from "../AudioMessagePopup";

let mediaRecorder = null;
let localStream = null;
let chunks = null;

export default function BottomBar(props) {
    const [recording, setRecording] = useState(false);
    const [isRecording, setStopRecording] = useState(false);
    const [audio, setAudio] = useState({});
    const [micError, setMicError] = useState(false);

    const onClickRecord = async () => {
        await navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                // init recording
                mediaRecorder = new MediaRecorder(stream);
                localStream = stream;
                // init data storage for video chunks
                chunks = [];
                // listen for data from media recorder
                mediaRecorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                setTimeout(() => {
                    startRecordingOnMount();
                }, 200);
            })
            .catch((err) => {
                setMicError(true);
            });
    };

    const startRecordingOnMount = () => {
        // wipe old data chunks
        chunks = [];
        // start recorder with 10ms buffer
        mediaRecorder.start(10);
        // say that we're recording
        setRecording(true);
    };

    const onStopRecording = (e) => {
        e.preventDefault();
        if (mediaRecorder) {
            // stop the recorder
            mediaRecorder.stop();
            // say that we're not recording
            setRecording(false);
            // save the video to memory
            var track = localStream.getTracks()[0];
            track.stop();
            onSaveAudio();
        }
    };

    const onSaveAudio = () => {
        // convert saved chunks to blob
        const blob = new Blob(chunks, {
            type: "audio/ogg; codecs=opus",
        });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);

        audio, { audioURL, blob };
    };

    const onSendAudio = () => {
        // stop the recorder
        mediaRecorder.stop();
        // say that we're not recording
        setRecording(false);
        // convert saved chunks to blob
        const blob = new Blob(chunks, {
            type: "audio/ogg; codecs=opus",
        });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);

        audio, { audioURL, blob };
        // save the video to memory

        var track = localStream.getTracks()[0];
        track.stop();

        props.sendAudio(audioURL, blob);
    };

    const onDeleteAudio = (e) => {
        onStopRecording(e);
    };

    const onPauseAudio = (e) => {
        e.preventDefault();
        if (mediaRecorder) {
            // stop the recorder
            mediaRecorder.pause();
            setStopRecording(true);
        }
    };

    const onResumeAudio = (e) => {
        e.preventDefault();
        if (mediaRecorder) {
            // stop the recorder
            mediaRecorder.resume();
            setStopRecording(false);
        }
    };

    const showModal = () => {
        setMicError(!micError);
    };

    return (
        <Container>
            <AudioMessagePopup showModal={showModal} show_modal={micError} />
            {recording ? (
                <>
                    <BottomLeft>
                        {isRecording ? (
                            <IconContainer
                                title="Resume"
                                onClick={onResumeAudio}
                            >
                                <Icon
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/play.svg"
                                    alt=""
                                ></Icon>
                            </IconContainer>
                        ) : (
                            <IconContainer title="Pause" onClick={onPauseAudio}>
                                <Icon
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/pause.svg"
                                    alt=""
                                ></Icon>
                            </IconContainer>
                        )}

                        <Recording className="medium">
                            {isRecording ? "Paused" : " Recording..."}
                        </Recording>
                    </BottomLeft>

                    <BottomRight>
                        <IconContainer title="Cancel" onClick={onDeleteAudio}>
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/delete.svg"
                                alt=""
                            ></Icon>
                        </IconContainer>
                        <IconContainer onClick={onSendAudio} title="Send">
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/send.svg"
                                alt=""
                            ></Icon>
                        </IconContainer>
                    </BottomRight>
                </>
            ) : (
                <>
                    <BottomLeft>
                        <MsgIcon htmlFor="image" title="Send image">
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/image.svg"
                                alt=""
                            ></Icon>
                        </MsgIcon>
                        <input
                            id="image"
                            name="image"
                            style={{
                                visibility: "hidden",
                                position: "absolute",
                            }}
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            onChange={(e) => {
                                props.onUploadAttachment(e, "image");
                            }}
                        />

                        {micError ? (
                            <MicError>Microphone is disabled</MicError>
                        ) : (
                            <MessageText
                                placeholder="Type a message..."
                                className="medium"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        props.onSendTextHandler();
                                    }
                                }}
                                onChange={(e) => {
                                    props.setMessageText(e.target.value);
                                }}
                                value={props.messageText}
                            ></MessageText>
                        )}
                    </BottomLeft>

                    <BottomRight>
                        <AudioMsgIcon
                            title={
                                props.audioPermission === "allowed"
                                    ? "Record voice"
                                    : props.audioPermission === "denied"
                                    ? "Cannot record audio"
                                    : "Record voice"
                            }
                            onClick={onClickRecord}
                            style={{
                                cursor:
                                    props.audioPermission === "allowed"
                                        ? "pointer"
                                        : props.audioPermission === "denied"
                                        ? "not-allowed"
                                        : null,
                            }}
                        >
                            {props.audioPermission === "allowed" ? (
                                <Icon
                                    style={{ height: "100%" }}
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/mic.svg"
                                    alt=""
                                ></Icon>
                            ) : props.audioPermission === "denied" ? (
                                <Icon
                                    style={{ height: "100%" }}
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/mic-disabled.svg"
                                    alt=""
                                ></Icon>
                            ) : null}
                        </AudioMsgIcon>
                        <MsgIcon htmlFor="attachment" title="Attach file">
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/attach.svg"
                                alt=""
                            ></Icon>
                        </MsgIcon>
                        <input
                            id="attachment"
                            name="attachment"
                            style={{
                                visibility: "hidden",
                                position: "absolute",
                            }}
                            type="file"
                            onChange={(e) => {
                                props.onUploadAttachment(e, "attachment");
                            }}
                        />
                        <IconContainer
                            onClick={props.onSendTextHandler}
                            title="Send"
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/send.svg"
                                alt=""
                            ></Icon>
                        </IconContainer>
                    </BottomRight>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 5px;
    flex: 0 1 40px;
    background: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 25px;
    margin-top: 9px;
    @media only screen and (max-width: 480px) {
        padding: 15px 5px;
        height: 55px;
    }
`;
const BottomRight = styled.div`
    display: flex;
    align-items: center;
`;
const BottomLeft = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;
const MsgIcon = styled.label`
    width: 29px;
    cursor: pointer;
    margin-right: 27px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 480px) {
        width: 22px;
        margin-right: 10px;
    }
`;
const IconContainer = styled.div`
    width: 29px;
    cursor: pointer;
    margin-right: 27px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 480px) {
        width: 22px;
        margin-right: 10px;
    }
`;
const AudioMsgIcon = styled.div`
    height: 36px;
    cursor: pointer;
    margin-right: 27px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 480px) {
        height: 24px;
        margin-right: 10px;
    }
`;
const Icon = styled.img`
    display: block;
    width: 100%;
`;
const MessageText = styled.input`
    font-size: 17px;
    flex: 1;
`;
const Recording = styled.span`
    font-size: 19px;
    color: #333;
`;
const MicError = styled.p`
    color: #c23629;
`;
