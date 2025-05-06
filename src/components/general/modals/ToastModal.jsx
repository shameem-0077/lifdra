import React, { useEffect } from "react";
import styled from "styled-components";
import SuccessLottie from "../lotties/SuccessLottie";
import WarningLottie from "../lotties/WarningLottie";
import ErrorLottie from "../lotties/ErrorLottie";

function ToastModal({
    isToast,
    setToast,
    toastMessage,
    toastCondition,
    setReload,
}) {
    useEffect(() => {
        if (isToast) {
            setTimeout(() => {
                setToast(false);
            }, [5000]);

            if (setReload) {
                setTimeout(() => {
                    setReload((prev) => !prev);
                }, [5500]);
            }
        }
    }, [isToast]);

    return (
        <TotalContent
            className={isToast && "active"}
            toastCondition={toastCondition}
        >
            <MainContainer>
                <SuccessTick>
                    {toastCondition === "error" ? (
                        <ErrorLottie />
                    ) : toastCondition === "warning" ? (
                        <WarningLottie />
                    ) : (
                        <SuccessLottie />
                    )}
                </SuccessTick>
                <MessageContainer>
                    <Heading>
                        {toastCondition === "error"
                            ? "Failed"
                            : toastCondition === "warning"
                            ? "Success"
                            : "Success"}
                    </Heading>
                    <Text>
                        {toastMessage
                            ? toastMessage
                            : "Your operation was successfully completed."}
                    </Text>
                </MessageContainer>
            </MainContainer>
            <CloseButton onClick={() => setToast(false)}>
                <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/x-close+.svg"
                    alt="closeIcon"
                />
            </CloseButton>
            <Progress
                className={isToast && "active"}
                toastCondition={toastCondition}
            ></Progress>
        </TotalContent>
    );
}

const TotalContent = styled.div`
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 1000;
    border-radius: 6px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    border-left: ${({ toastCondition }) =>
        toastCondition === "error"
            ? "8px solid #f04438"
            : toastCondition === "warning"
            ? "8px solid #ffc163"
            : "8px solid #56c082"};
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.25, 1.35);
    max-width: 90%;

    &.active {  
        transform: translateX(0);
    }

    @media (max-width: 768px) {
        padding: 15px 20px 15px 15px;
        top: 25px;
        right: 5px;
    }
`;
const MessageContainer = styled.div``;
const Heading = styled.h6`
    font-family: "baloo_paaji_2semibold" !important;
    font-size: 23px;
    color: #344054;
    line-height: 1;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 2px;
    }
`;
const MainContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Text = styled.p`
    font-size: 15px;
    font-family: "gordita_medium" !important;
    color: #666;

    &::first-letter {
        text-transform: capitalize;
    }

    @media (max-width: 768px) {
        font-size: 13px;
    }
`;
const SuccessTick = styled.div`
    margin-right: 17px;
    img {
        display: block;
        width: 100%;
    }
`;
const CloseButton = styled.div`
    width: 24px;
    img {
        display: block;
        width: 100%;
    }

    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`;
const Progress = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background-color: ${({ toastCondition }) =>
            toastCondition === "error"
                ? " #f04438"
                : toastCondition === "warning"
                ? " #ffc163"
                : " #56c082"};
        opacity: 0.5;
    }
    &.active {
        &::before {
            animation: progress 5s linear forwards;
        }
    }
    @keyframes progress {
        100% {
            right: 100%;
        }
    }
`;

export default ToastModal;
