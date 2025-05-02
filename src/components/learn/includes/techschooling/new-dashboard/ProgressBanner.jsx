import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";

function ProgressBanner({ activeDayId }) {
    const [status, setStatus] = useState({
        learning_speed: "medium",
    });
    const { user_data } = useSelector((state) => state);

    const fetchStudentStatus = () => {
        const { access_token } = user_data;
        learnConfig
            .get(`learn/get-student-learning-status/${activeDayId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                const { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    setStatus(data);
                }
            });
    };

    useEffect(() => {
        fetchStudentStatus();
    }, []);

    return (
        <>
            {status ? (
                <Container>
                    {status.learning_speed === "medium" ? (
                        <Content>Keep going, you are upto date 🥳</Content>
                    ) : status.learning_speed === "fast" ? (
                        <Content>
                            <span>Hurray! </span> You are way ahead 🏄🏻‍♀️
                        </Content>
                    ) : status.learning_speed === "slow" ? (
                        <Content>
                            You are 2 days behind, <span>Study fast </span> 🏃
                        </Content>
                    ) : (
                        ""
                    )}
                    <Icon>
                        <img
                            src={require("../../../../../assets/images/new-dashboard/tick.svg")}
                            alt="icon"
                        />
                    </Icon>
                </Container>
            ) : null}
        </>
    );
}

export default ProgressBanner;
const Container = styled.div`
    background-color: #f3f9eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    @media all and (max-width: 480px) {
        padding: 10px;
    }
`;
const Content = styled.p`
    font-family: gordita_medium;
    font-size: 18px;
    color: #003c3c;
    span {
        color: #1a987c;
        font-size: inherit;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Icon = styled.span`
    display: block;
    width: 28px;
    @media all and (max-width: 640px) {
        width: 20px;
    }

    img {
        display: block;
        width: 100%;
    }
`;
