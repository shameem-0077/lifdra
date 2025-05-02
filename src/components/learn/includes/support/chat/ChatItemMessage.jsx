import React from "react";
import styled from "styled-components";
import { getTimeStrFromDate } from "../../../../helpers/functions";

class ChatItemMessage extends React.PureComponent {
    render() {
        let { background, radius, color } = this.props;
        return (
            <Container>
                <Message background={background} radius={radius} color={color}>
                    <Description>{this.props.message}</Description>
                    <Time>{getTimeStrFromDate(this.props.time)}</Time>
                </Message>
            </Container>
        );
    }
}

const Message = styled.div`
    background: ${(props) => props.background};
    padding: 10px 18px;
    border-radius: ${(props) => props.radius};
    border: 1px solid #f0f0f0;
    border-bottom-left-radius: 0;
    color: ${(props) => props.color};
    margin: 0 10px;
    width: 100%;
    @media only screen and (max-width: 640px) {
        margin: 0 5px;
        padding: 5px 10px;
    }
`;
const Time = styled.span`
    color: #a4a6b2;
    font-size: 12px;
    float: right;
    margin-top: 5px;
    @media only screen and (max-width: 640px) {
        font-size: 10px;
        margin-top: 0;
    }
`;
const Description = styled.p`
    font-family: product_sansbold;
    @media (max-width: 1110px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 14px;
    }
`;
const Container = styled.div`
    display: flex;
    max-width: 55%;
    @media only screen and (max-width: 640px) {
        max-width: 75%;
    }
`;

export default ChatItemMessage;
