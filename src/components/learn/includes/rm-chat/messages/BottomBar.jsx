import React, { useEffect, useRef, useState } from "react";
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
    const [isAttachmentPopup, setAttachPopup] = useState(false);
    const popupBox = useRef(null);
    const popupIcon = useRef(null);

    const handleClickOutside = (event) => {
        if (popupIcon.current && !popupIcon.current.contains(event.target)) {
            if (popupBox.current && !popupBox.current.contains(event.target)) {
                togglePopup();
            }
        }
    };
    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        };
    }, []);

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

        setAudio({ audioURL, blob });
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

        setAudio({ audioURL, blob });
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

    const togglePopup = () => {
        setAttachPopup((prev) => !prev);
    };

    const renderAttachments = () => {
        return (
            isAttachmentPopup && (
                <AttatchmentsContainer ref={popupBox}>
                    <AttachmentItem htmlFor="image" title="Upload image">
                        <AttachIcon
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/image.svg"
                            alt=""
                        />
                    </AttachmentItem>
                    <AttachmentItem htmlFor="attachment" title="Attach file">
                        <AttachIcon
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/attach.svg"
                            alt=""
                        />
                    </AttachmentItem>
                </AttatchmentsContainer>
            )
        );
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

                        <Recording>
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
                        <IconContainer
                            title="Send emoji"
                            onClick={props.onClickEmojiPicker}
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/emoji.svg"
                                alt=""
                            ></Icon>
                        </IconContainer>
                        <MsgIconBox>
                            {renderAttachments()}
                            <Icon
                                onClick={() => {
                                    togglePopup();
                                }}
                                ref={popupIcon}
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/attach.svg"
                                alt=""
                            ></Icon>
                        </MsgIconBox>
                        <IconContainerLabel htmlFor="image" title="Send image">
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/image.svg"
                                alt=""
                            ></Icon>
                        </IconContainerLabel>
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
                        {props.messageText ? (
                            <MsgIconLabel
                                onClick={props.onSendTextHandler}
                                title="Send"
                            >
                                <Icon
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/send.svg"
                                    alt=""
                                ></Icon>
                            </MsgIconLabel>
                        ) : (
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
                        )}
                    </BottomRight>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    border-radius: 5px;
    height: 64px;
    background: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-top: 9px;
    @media (max-width: 980px) {
        margin-top: 6px;
    }
    @media only screen and (max-width: 480px) {
        padding: 15px 14px;
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
    @media only screen and (max-width: 640px) {
        display: none;
    }
`;
const IconContainer = styled.div`
    width: 25px;
    cursor: pointer;
    margin-right: 24px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 480px) {
        width: 22px;
        margin-right: 10px;
    }
`;
const IconContainerLabel = styled.label`
    width: 25px;
    cursor: pointer;
    margin-right: 24px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 640px) {
        display: none;
    }
`;
const MsgIconLabel = styled.label`
    width: 21px;
    cursor: pointer;
    margin-right: 24px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 640px) {
        margin-right: 10px;
    }
`;
const AudioMsgIcon = styled.div`
    width: 17px;
    cursor: pointer;
    margin-right: 24px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (max-width: 480px) {
        margin-right: 12px;
        width: 15px;
    }
`;
const Icon = styled.img`
    display: block;
    width: 100%;
`;
const MessageText = styled.input`
    font-size: 15px;
    flex: 1;
    font-family: "gordita_regular";
    padding: 10px 15px;
    border-radius: 30px;
    background: #fff;
    margin-right: 24px;
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const Recording = styled.span`
    font-size: 19px;
    color: #333;
`;
const MicError = styled.p`
    color: #c23629;
    font-family: "gordita_medium";
    font-size: 13px;
`;
const MsgIconBox = styled.div`
    display: none;
    width: 21px;
    margin-right: 24px;
    @media (max-width: 640px) {
        display: block;
        position: relative;
    }
    @media (max-width: 480px) {
        margin-right: 19px;
    }
`;
const AttatchmentsContainer = styled.div`
    display: none;
    @media (max-width: 640px) {
        display: block;
        position: absolute;
        background: #fff;
        padding: 10px;
        top: -90px;
        border-radius: 30px;
        left: -15px;
    }
`;
const AttachmentItem = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #f0f0f0;
    margin-bottom: 5px;
    &:last-child {
        margin-bottom: 0;
    }
`;
const AttachIcon = styled.img`
    width: 15px;
`;
