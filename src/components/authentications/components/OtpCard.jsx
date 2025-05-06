import React from "react";
import styled from "styled-components";

const Timer = ({ onResend, isResendLoading, isResendSuccess }) => {
    const [counter, setCounter] = React.useState(30);

    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <>
            {counter === 0 ? (
                <TimerContainer onClick={onResend}>
                    {isResendSuccess ? (
                        <SendIcon
                            className="las la-check-circle"
                            style={{
                                color: isResendSuccess
                                    ? "#5cc66a"
                                    : isResendSuccess === false
                                    ? "#f44336"
                                    : "#000",
                            }}
                        ></SendIcon>
                    ) : isResendSuccess === false ? (
                        <SendIcon
                            style={{ color: "#f44336" }}
                            className="las la-exclamation-circle"
                        ></SendIcon>
                    ) : (
                        <SendIcon
                            className={`las la-undo-alt ${
                                isResendLoading && "loader"
                            }`}
                        ></SendIcon>
                    )}

                    <Resend
                        className="b-medium"
                        style={{
                            color: isResendSuccess
                                ? "#5cc66a"
                                : isResendSuccess === false
                                ? "#f44336"
                                : "#000",
                        }}
                    >
                        {isResendSuccess
                            ? "OTP Sent!"
                            : isResendSuccess === false
                            ? "Resend OTP failed"
                            : "Resend OTP"}
                    </Resend>
                </TimerContainer>
            ) : (
                <>
                    <Resend className="b-medium">{`Resend OTP in ${counter}s`}</Resend>
                </>
            )}
        </>
    );
};

export default function OtpCard({
    error,
    error_message,
    onChange,
    handleKeyDown,
    otp,
    onResend,
    isResendSuccess,
    isResendLoading,
}) {
    return (
        <>
            <MiddleContainer>
                <InputContainer
                    className="g-medium"
                    style={{ borderColor: error ? "#f32e2f" : "#2f3337" }}
                >
                    <Icon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg"
                        alt=""
                    />
                    <InputField
                        autoFocus
                        type="number"
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        className="g-medium"
                        placeholder="Enter OTP"
                        value={otp}
                    />
                </InputContainer>
            </MiddleContainer>
            <InputBottom
                style={{
                    justifyContent: error ? "space-between" : "flex-end",
                }}
            >
                {error && (
                    <ErrorText className="g-medium">{error_message}</ErrorText>
                )}
                <ResendContainer>
                    <Timer
                        onResend={onResend}
                        isResendLoading={isResendLoading}
                        isResendSuccess={isResendSuccess}
                    />
                </ResendContainer>
            </InputBottom>
        </>
    );
}

const TimerContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;
const InputContainer = styled.div`
    border: 1px solid;
    border-radius: 7px;
    padding: 15px 18px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    color: #000;
    font-size: 17px;
    width: -webkit-fill-available;
    width: -moz-available;
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 480px) {
        margin-bottom: 10px;
        padding: 10px 12px;
        border-color: #5f6367;
    }
    &:focus-within {
        border-color: #5cc66a;
    }
`;
const InputBottom = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 8px;
`;
const ResendContainer = styled.div`
    display: flex;
    align-items: center;
`;
const SendIcon = styled.span`
    font-size: 14px;
    -webkit-text-stroke-width: 0.02em;
    &.loader {
        animation: rotate 2s infinite linear reverse;
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
const Resend = styled.span`
    font-size: 14px;
    margin-left: 5px;
`;
const Icon = styled.img`
    max-width: 17px;
    max-height: 17px;
    margin-right: 7px;
    display: block;
    @media (max-width: 480px) {
        max-width: 20px;
        max-height: 20px;
    }
`;
const InputField = styled.input`
    width: 100%;
    color: #000;
    font-size: 15px;
    padding-left: 15px;
    caret-color: #5cc66a;
    @media (max-width: 480px) {
        width: 106.666666667%;
        padding-left: 16px;
        font-size: 14px;
        transform: scale(0.9375);
        transform-origin: left top;
    }
`;
const MiddleContainer = styled.div`
    display: flex;
`;
const ErrorText = styled.span`
    font-size: 12px;
    left: 70px;
    color: #f46565;
    bottom: -26px;
`;
