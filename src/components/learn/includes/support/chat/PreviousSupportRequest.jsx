import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getDateStr, getTimeFromDate } from "../../../../helpers/functions";

class PreviousSupportRequest extends Component {
    render() {
        let { link, id, created_on, closed_on, designation } = this.props;
        return (
            <LinkContainer to={link}>
                <Container>
                    <LeftBox>
                        <DateBox>{getDateStr(created_on)}</DateBox>
                    </LeftBox>
                    <RightBox>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={
                                    this.styles
                                        .previous_support_container_right_head
                                }
                            >
                                <small
                                    style={
                                        this.styles
                                            .previous_support_container_right_id
                                    }
                                >
                                    #{id} |
                                </small>
                                <TimeText>
                                    {getTimeFromDate(created_on)} -{" "}
                                    {getTimeFromDate(closed_on)}
                                </TimeText>
                            </div>
                            <div
                                style={
                                    this.styles
                                        .previous_support_container_right_title
                                }
                            >
                                {designation}
                            </div>
                        </div>
                    </RightBox>
                </Container>
            </LinkContainer>
        );
    }

    styles = {
        previous_support_container: {
            display: "flex",
            margin: "5% 0",
        },
        previous_support_container_left_box: {
            backgroundColor: "#e0e8fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42%",
            textAlign: "center",
            borderRadius: "10px 0 0px 10px",
        },
        previous_support_container_left_box_date: {
            color: "#4d7afa",
            fontWeight: "500",
            lineHeight: "1.3rem",
        },
        previous_support_container_right: {
            backgroundColor: "#fff",
            padding: "20px 10px 20px 30px",
            width: "100%",
            borderRadius: "0 10px 10px 0",
        },
        previous_support_container_right_head: {
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
        },
        previous_support_container_right_id: {},
        previous_support_container_right_time: {
            marginLeft: "3px",
            color: "#6d6d6d",
            fontSize: "14px",
        },
        previous_support_container_right_title: {
            fontSize: "13px",
            color: "#c3c3c3",
        },
    };
}
const Container = styled.div`
    display: flex;
    margin: 5% 0;
    @media (max-width: 1350px) {
        flex-direction: column;
    }
`;
const LinkContainer = styled(Link)`
    display: block;
    &:hover {
        cursor: pointer;
    }
`;
const DateBox = styled.small`
    color: rgb(77, 122, 250);
    font-weight: bold;
    width: 70%;
    line-height: 1.3rem;
    @media (max-width: 1500px) {
        font-size: 14px;
    }
`;
const RightBox = styled.div`
    background-color: rgb(255, 255, 255);
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 0px 10px 10px 0px;
    @media (max-width: 1000px) {
        padding: 15px 0;
    }
`;
const LeftBox = styled.div`
    background-color: rgb(224, 232, 254);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42%;
    text-align: center;
    border-radius: 10px 0px 0px 10px;
    @media (max-width: 1350px) {
        width: 100%;
        border-radius: 10px 10px 0px 0px;
        padding: 10px 0;
    }
    @media only screen and (max-width: 1440px) {
        width: 32%;
    }
`;
const TimeText = styled.p`
    margin-left: 3px;
    color: rgb(109, 109, 109);
    font-size: 14px;
    @media (max-width: 1350px) {
        font-size: 15px;
    }
    @media (max-width: 1350px) {
        font-size: 14px;
    }
`;

export default PreviousSupportRequest;
