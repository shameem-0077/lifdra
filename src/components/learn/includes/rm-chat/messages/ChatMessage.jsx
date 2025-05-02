import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AudioMsg from "./AudioMsg";
import Lightbox from "react-modal-image";
import ChatItemAttachment from "../chat/ChatItemAttachment";
import ChatItemLoader from "../chat/ChatItemLoader";
import { getTimeFromDate, getDateStr } from "../../../../helpers/functions";
import MessageLoader from "./MessageLoader";
import { scroller } from "react-scroll";
import ChatSmallMenu from "./ChatSmallMenu";

export default function ChatMessage(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        scroller.scrollTo("chat-scroll-end", {
            duration: 1000,
            smooth: true,
            containerId: "chat-scroll-container",
            offset: 50, // Scrolls to element + 50 pixels down the page
        });
    }, [messages]);

    useEffect(() => {
        let dated_messages = [];
        let dates = [
            ...new Set(
                props.messages.map(function (message) {
                    let date = new Date(message.timestamp);
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0, 0);
                    return date.toString();
                })
            ),
        ];
        dates.forEach((date) => {
            let messages_list = props.messages.filter((message) => {
                let message_date = new Date(message.timestamp);
                message_date.setHours(0);
                message_date.setMinutes(0);
                message_date.setSeconds(0, 0);
                if (message_date.toString() === date) {
                    return message;
                }
            });
            let date_new = getDateDisplay(date);
            const message_obj = {
                date: date_new,
                messages: messages_list,
            };
            dated_messages.push(message_obj);
        });

        setMessages(dated_messages);
    }, [props.messages]);

    const getDateDisplay = (date) => {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0, 0);
        let date_new = new Date(date);
        date_new.setHours(0);
        date_new.setMinutes(0);
        date_new.setSeconds(0, 0);
        if (today.getTime() === date_new.getTime()) {
            return "Today";
        } else if (today.getTime() - 86400000 === date_new.getTime()) {
            return "Yesterday";
        } else if (today.getTime() - 86400000 * 7 < date_new.getTime()) {
            return days[date_new.getDay()];
        } else {
            let month = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ][date_new.getMonth()];
            let date_str =
                date_new.getDate() + " " + month + " " + date_new.getFullYear();
            return date_str;
        }
    };

    const renderAttachmentLoading = () => {
        let { uploading, selectedFile } = props;
        let { isImageUploading, isAttachmentUploading, isAudioUploading } =
            uploading;

        return isAttachmentUploading ? (
            <MsgLoaderItem
                user="user"
                style={{
                    background: "#fff",
                    padding: "10px 15px",
                }}
            >
                <ChatItemAttachment
                    name={selectedFile.name}
                    attachment_type={selectedFile.type}
                    attachment_size={selectedFile.size}
                    attachment={selectedFile.url}
                />
                <LoaderOverlay>
                    <MessageLoader />
                </LoaderOverlay>
            </MsgLoaderItem>
        ) : isImageUploading ? (
            <ImageLoaderContainer>
                <LoaderImage
                    small={selectedFile.url}
                    medium={selectedFile.url}
                    large={selectedFile.url}
                />
                <LoaderOverlay>
                    <MessageLoader />
                </LoaderOverlay>
            </ImageLoaderContainer>
        ) : isAudioUploading ? (
            <MsgLoaderItem
                user="user"
                style={{
                    background: "#55c597",
                }}
                className="audio-msg otg"
            >
                <AudioMsg voice={selectedFile.url} />
                <LoaderOverlay>
                    <MessageLoader />
                </LoaderOverlay>
            </MsgLoaderItem>
        ) : null;
    };

    const renderChatItem = (messages) =>
        messages.map((item, index) => (
            <MsgItemContainer
                key={index}
                className="d-f"
                style={{
                    padding:
                        item.author === props.contactPk
                            ? window.innerWidth <= 480
                                ? "0 5px 0 0"
                                : "0 24px 0 0"
                            : window.innerWidth <= 480
                            ? "0 0 0 5px"
                            : "0 0 0 24px",
                    flexDirection:
                        item.author === props.contactPk ? "row-reverse" : "row",
                }}
            >
                {item.message_type === "text" ? (
                    <MsgItem
                        user={item.author === props.contactPk && "user"}
                        style={{
                            background:
                                item.author === props.contactPk
                                    ? "#55c597"
                                    : "#fff",
                            color:
                                item.author === props.contactPk
                                    ? "#fff"
                                    : "#3c434d",
                            borderRadius:
                                item.author === props.contactPk
                                    ? "#55c597"
                                    : "#fff",
                        }}
                    >
                        {item.content}
                    </MsgItem>
                ) : item.message_type === "image" ? (
                    <ImageContainer>
                        <Image
                            small={item.image}
                            medium={item.image}
                            large={item.image}
                        />
                    </ImageContainer>
                ) : item.message_type === "audio" ? (
                    <MsgItem
                        user={item.author === props.contactPk && "user"}
                        style={{
                            background:
                                item.author === props.contactPk
                                    ? "#55c597"
                                    : "#fff",
                        }}
                        className={`medium audio-msg ${
                            item.author === props.contactPk ? "otg" : "inc"
                        }`}
                    >
                        <AudioMsg voice={item.audio} />
                    </MsgItem>
                ) : item.message_type === "attachment" &&
                  item.attachment_name.endsWith("svg") ? (
                    <ImageContainer>
                        <Image
                            small={item.attachment}
                            medium={item.attachment}
                            large={item.attachment}
                        />
                    </ImageContainer>
                ) : item.message_type === "attachment" ? (
                    <MsgItem
                        user={item.author === props.contactPk && "user"}
                        style={{
                            background: "#fff",
                            padding: "10px 15px",
                        }}
                    >
                        <ChatItemAttachment
                            name={item.attachment_name}
                            attachment_type={item.attachment_type}
                            attachment_size={`${item.attachment_size} KB`}
                            attachment={`${item.attachment}`}
                        />
                    </MsgItem>
                ) : null}
                {item.author === props.contactPk && (
                    <ChatSmallMenu
                        author={item.author}
                        contactPk={props.contactPk}
                        onDelete={() => props.onDelete(item.pk)}
                    />
                )}

                <Time
                    is_groupable={item.is_groupable}
                    style={{
                        display: item.is_groupable ? "none" : "block",
                        margin:
                            item.author === props.contactPk
                                ? "0 8px 0 0"
                                : "0 0 0 8px",
                    }}
                >
                    {getTimeFromDate(item.timestamp)}
                </Time>
            </MsgItemContainer>
        ));

    const renderChat = messages.map((item, index) => (
        <div key={index}>
            <DateBox>
                <DateText>{item.date}</DateText>
            </DateBox>
            {renderChatItem(item.messages)}
        </div>
    ));

    return (
        <Container>
            <MsgList>
                {renderChat}
                <MsgItemContainer
                    className="d-f"
                    style={{
                        padding:
                            window.innerWidth <= 480
                                ? "0 5px 0 0"
                                : "0 24px 0 0",
                        flexDirection: "row-reverse",
                    }}
                >
                    {renderAttachmentLoading()}
                </MsgItemContainer>
            </MsgList>
        </Container>
    );
}

const Container = styled.div`
    align-items: flex-end;
    margin-bottom: 30px;
`;
const MsgItemContainer = styled.div`
    margin-bottom: 10px;
    align-items: flex-end;
`;
const MsgList = styled.div``;
const MsgItem = styled.div`
    font-size: 15px;
    padding: 14px 19px;
    font-family: "gordita_regular";
    /* background: ${(props) =>
        props.author === props.contactPk ? "#55c597" : "#f2f3f7"};
    color: ${(props) =>
        props.author === props.contactPk ? "#fff" : "#3c434d"}; */
    width: fit-content;
    border-top-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-bottom-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-top-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    border-bottom-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    max-width: 455px;
    &:last-child {
        margin-bottom: 0;
    }
    &:first-child {
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-left-radius: ${(props) =>
            props.user !== "user" ? "6px" : "25px"};
        border-bottom-right-radius: ${(props) =>
            props.user === "user" ? "6px" : "25px"};
    }
    @media only screen and (max-width: 640px) {
        font-size: 13px;
        max-width: 300px;
    }
    @media only screen and (max-width: 480px) {
        max-width: 260px;
    }
`;
const Time = styled.span`
    color: #b0b9c2;
    font-size: 13px;
    font-family: "gordita_regular";
    @media only screen and (max-width: 640px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 12px;
    }
`;
const ImageContainer = styled.div`
    width: 34%;
    cursor: pointer;
    @media only screen and (max-width: 768px) {
        width: 40%;
    }
    @media only screen and (max-width: 480px) {
        width: 48%;
    }
`;
const Image = styled(Lightbox)`
    display: block;
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
        border-radius: 10px;
    }
    @media only screen and (max-width: 480px) {
        border-radius: 5px;
    }
`;
const MsgLoaderItem = styled.div`
    font-size: 16px;
    position: relative;
    padding: 14px 19px;
    width: fit-content;
    overflow: hidden;
    border-top-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-bottom-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-top-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    border-bottom-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    max-width: 455px;
    &:last-child {
        margin-bottom: 0;
    }
    &:first-child {
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-left-radius: ${(props) =>
            props.user !== "user" ? "6px" : "25px"};
        border-bottom-right-radius: ${(props) =>
            props.user === "user" ? "6px" : "25px"};
    }
    @media only screen and (max-width: 640px) {
        font-size: 14px;
        max-width: 300px;
    }
`;
const ImageLoaderContainer = styled.div`
    width: 34%;
    position: relative;
    cursor: pointer;
    @media only screen and (max-width: 768px) {
        width: 40%;
    }
    @media only screen and (max-width: 480px) {
        width: 48%;
    }
`;
const LoaderImage = styled(Lightbox)`
    display: block;
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
        border-radius: 10px;
    }
    @media only screen and (max-width: 480px) {
        border-radius: 5px;
    }
`;
const LoaderOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
`;
const DateBox = styled.div`
    margin-bottom: 12px;
    text-align: center;
`;
const DateText = styled.span`
    background: #868b92;
    font-family: "gordita_regular";
    display: inline-block;
    color: #fff;
    font-size: 13px;
    padding: 3px 12px;
    border-radius: 30px;
`;
