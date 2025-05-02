import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Jdenticon from "react-jdenticon";
import { getTimeFromDate, getDateStr } from "../../../../helpers/functions";

export default function ChatCard(props) {
    function truncate(str) {
        if (str) {
            return str.length > 18 ? str.substring(18, 0) + "..." : str;
        }
    }
    const getShowTime = (date_str) => {
        const today = new Date();
        const date = new Date(date_str);
        if (today === date) {
            return getTimeFromDate(date_str);
        } else {
            return getDateStr(date_str);
        }
    };

    const { active, id, session_id, view_status, last_msg, closed_on } =
        props.data;
    return (
        <ChatItem
            active={active}
            to={`/support/chat/${id}`}
            className="d-f a-c j-s-b"
        >
            <Left className="d-f a-c">
                <PhotoContainer className="d-f a-c">
                    <Jdenticon
                        size={
                            window.innerWidth >= 768 && window.innerWidth <= 980
                                ? "40"
                                : "45"
                        }
                        value={session_id}
                    />
                </PhotoContainer>
                <Middle>
                    <Name className=" semi-bold d-b">{session_id}</Name>
                    <LastMessage view_status={view_status} className="d-b">
                        {truncate(
                            last_msg ? last_msg : "Lorem ipsum dolor set amit"
                        )}
                    </LastMessage>
                </Middle>
            </Left>
            <Right>
                <Time className="d-b medium">{getShowTime(closed_on)}</Time>
            </Right>
        </ChatItem>
    );
}

const ChatItem = styled(Link)`
    background: #f0f0f0;
    border-radius: 4px;
    padding: 0 10px;
    height: 75px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    :last-child {
        margin-bottom: unset;
    }
`;
const PhotoContainer = styled.div`
    width: 45px;
    height: 45px;
    margin-right: 14px;
    border-radius: 50%;
    overflow: hidden;
    @media only screen and (max-width: 980px) {
        width: 40px;
        height: 40px;
    }
    @media only screen and (max-width: 768px) {
        width: 45px;
        height: 45px;
    }
`;
const ChatProfile = styled.img`
    width: 100%;
`;
const Middle = styled.div``;
const Name = styled.span`
    font-size: 16px;
    margin-bottom: unset;
    @media only screen and (max-width: 980px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 768px) {
        font-size: 16px;
    }
`;
const LastMessage = styled.span`
    color: ${(props) => (props.view_status ? "#a5aeb5" : "#333")};
    font-size: 14px;
    @media only screen and (max-width: 980px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 45.4px;
`;
const Time = styled.span`
    color: #b0b9c2;
    font-size: 14px;
    @media only screen and (max-width: 1440px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;
const Left = styled.div``;
