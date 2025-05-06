import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../store/authStore";

export default function OtpIssue({ isNotMarginNeed, message }) {
    const { user_data } = useAuthStore();

    useEffect(() => {
        (function () {
            document
                .querySelector(".chat-button")
                .addEventListener("click", function () {
                    window.tidioChatApi.show();
                    window.tidioChatApi.open();
                    if (window.tidioChatApi) {
                        if (message) {
                            window.tidioChatApi.messageFromVisitor(
                                `${message}`
                            );
                        } else if (user_data?.phone)
                            window.tidioChatApi.messageFromVisitor(
                                `I'm facing an issue with the OTP, my phone number is ${user_data.phone}.`
                            );
                        else {
                            window.tidioChatApi.messageFromVisitor(
                                `I'm facing an issue with the OTP.`
                            );
                        }
                    }
                });
        })();
    }, [message, user_data]);

    return (
        <Container className="g-medium" isNotMarginNeed={isNotMarginNeed}>
            If you are facing any issues to get the OTP,{" "}
            <span className="action chat-button">
                chat with our support team.
            </span>
        </Container>
    );
}

const Container = styled.div`
    color: #4d4e4e;
    display: block;
    font-size: 13px;
    /* margin-top: 35px; */
    margin: ${(p) => (p.isNotMarginNeed ? "0 0 15px 0" : "35px 0 0 0")};

    span.action {
        color: #5cc66a;
        cursor: pointer;
    }
`;
