import React from "react";
import styled from "styled-components";
import AudioMsg from "./AudioMsg";

export default function SentMessages() {
    return (
        <Container>
            <MsgList className="d-f">
                <MsgItem className="medium white">Hello</MsgItem>

                <MsgItem className="medium white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minus, error. Deleniti dolor cum neque error tempory.
                </MsgItem>
                <MsgItem>
                    <AudioMsg />
                </MsgItem>
            </MsgList>

            <Time>10.31 pm</Time>
        </Container>
    );
}

const Container = styled.div`
    /* right: 0; */
    padding-right: 24px;
    /* display: flex; */
    /* align-items: flex-end; */
    /* flex-direction: row-reverse; */
    margin-bottom: 30px;
`;
const MsgList = styled.div`
    /* flex-direction: column; */
    /* align-items: flex-end; */
`;
const MsgItem = styled.div`
    font-size: 16px;
    padding: 14px 19px;
    background: #55c597;
    margin-bottom: 6px;
    border-radius: 25px;
    width: fit-content;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    max-width: 455px;
    &:last-child {
        margin-bottom: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 25px;
    }
    &:first-child {
        border-bottom-right-radius: 6px;
        border-top-right-radius: 25px;
    }
`;
const Time = styled.span`
    color: #b0b9c2;
    font-size: 15px;
    margin-right: 15px;
`;
