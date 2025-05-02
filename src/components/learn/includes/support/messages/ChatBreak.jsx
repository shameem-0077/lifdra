import React from "react";
import styled from "styled-components";

export default function ChatBreak() {
    return (
        <Container>
            <Time className="medium">Today</Time>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    margin: 10px 0;
`;
const Time = styled.span`
    color: #7a8691;
    font-size: 18px;
`;
