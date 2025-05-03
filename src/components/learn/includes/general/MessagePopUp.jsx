import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { Link } from "react-router-dom";
import { getUserTimeFromUTC } from "../../../helpers/functions";
import { useAuthStore } from "../../../../store/authStore";

function MessagePopUp() {
    const { message } = useAuthStore();
    const [chatPopup, setChatPopup] = useState(false);

    const truncate = (str) => {
        if (str) {
            return str.length > 18 ? str.substring(18, 0) + "..." : str;
        }
        return " - ";
    };

    const handlePopUp = () => {
        setChatPopup(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => handlePopUp(), 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        chatPopup &&
        message &&
        message.unread_messages_count > 0 && (
            <MessagesBody>
                <MessageItem to="/chat-with-rm/">
                    <LeftBox>
                        <JdenticonBox>
                            <Jdenticon size="42" value={message.rm_name} />
                        </JdenticonBox>
                        <ActiveTag />
                    </LeftBox>
                    <RightBox>
                        <Top>
                            <NameItem>{message.rm_name}</NameItem>
                        </Top>
                        <Bottom>
                            <LastMessage>
                                {truncate(message.last_message)}
                            </LastMessage>
                            {message.message_time && <Dot />}
                            {message.message_time && (
                                <Timestamp>
                                    {getUserTimeFromUTC(message.message_time)}
                                </Timestamp>
                            )}
                        </Bottom>
                    </RightBox>
                </MessageItem>
                <Count>{message.unread_messages_count}</Count>
                <CloseIcon
                    title="close"
                    onClick={() => setChatPopup(false)}
                    className="las la-times"
                />
            </MessagesBody>
        )
    );
}
export default MessagePopUp;

const MessagesBody = styled.div`
    background: #fff;
    padding: 13px 16px;
    position: fixed;
    bottom: 20px;
    border-radius: 6px;
    right: 20px;
    z-index: 10000;
    box-shadow: -2px -1px 52px -8px rgba(0, 0, 0, 0.3);
    animation: zoom 0.7s linear infinite alternate;
    @keyframes zoom {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.05);
        }
    }
`;
const Count = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ea1919;
    z-index: 10001;
    top: -10px;
    left: -10px;
    color: #fff;
    font-size: 13px;
    font-family: "gordita_medium";
`;
const CloseIcon = styled.i`
    position: absolute;
    top: -17px;
    right: 0;
    color: #bdbdbd;
    cursor: pointer;
    font-size: 15px;
`;
const MessageItem = styled(Link)`
    display: flex;
    align-items: center;
    position: relative;
    &:last-child {
        margin-bottom: unset;
    }
`;
const LeftBox = styled.div`
    margin-right: 14px;
    width: 45px;
    height: 45px;
`;
const ActiveTag = styled.span``;
const RightBox = styled.div``;
const Top = styled.div``;
const NameItem = styled.p`
    font-size: 14px;
    font-family: "gordita_medium";
`;
const Bottom = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
`;
const LastMessage = styled.span`
    font-family: "gordita_regular";
    font-size: 12px;
`;
const Dot = styled.small`
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #333;
    margin: 0 15px;
`;
const Timestamp = styled.small`
    font-family: "gordita_regular";
    font-size: 12px;
`;
const JdenticonBox = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    border: 0.5px solid #aaa;
`;
