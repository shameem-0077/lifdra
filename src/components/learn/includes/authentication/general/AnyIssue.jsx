import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function AnyIssue({ message }) {
    const { user_data } = useSelector((state) => state);

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
                        } else if (user_data.phone)
                            window.tidioChatApi.messageFromVisitor(
                                `I'm facing an issue, my phone number is ${user_data.phone}.`
                            );
                        else {
                            window.tidioChatApi.messageFromVisitor(
                                `I'm facing an issue, please help me to continue.`
                            );
                        }
                    }
                });
        })();
    }, []);

    return (
        <Container className="g-medium">
            If you are facing any difficulties,{" "}
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
    margin: 0;
    margin-bottom: 15px;
    span.action {
        color: #5cc66a;
        cursor: pointer;
    }
`;
