import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../../../../axiosConfig";
import Lottie from "react-lottie";
import loader from "../../../../../../assets/lotties/modal/loading_lottie.json";
import greenloader from "../../../../../../assets/lotties/web/green_loader.json";

const OTPModal = ({
    phone,
    setModalType,
    setVerifed,
    setVerfiedNumber,
    isFailed,
}) => {
    const [otp, setOtp] = useState("");
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [resendLoader, setResendLodaer] = useState(false);
    useEffect(() => {
        if (otp.length > 4) {
            setError(true);
        } else {
            setError(false);
        }
    }, [otp]);

    const verifyOtp = () => {
        setLoading(true);
        serverConfig
            .post("web/verify-phone/service-referral/", {
                country: "IN",
                phone: phone,
                otp: otp,
            })
            .then((res) => {
                let { status_code, data } = res.data;
                if (status_code === 6000) {
                    setModalType("");
                    setVerifed(true);
                    setVerfiedNumber(phone);
                    setLoading(false);
                } else if (status_code === 6001) {
                    setError(true);
                    setErrorMessage(data.title);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const resendOtp = function () {
        setResendLodaer(true);

        serverConfig
            .post("web/resend-otp/service-referral/", {
                country: "IN",
                phone: phone,
            })
            .then((res) => {
                let { status_code, data } = res.data;
                if (status_code === 6000) {
                    setResendLodaer(false);
                } else if (status_code === 6001) {
                    setResendLodaer(false);
                    isError(true);
                    errorMessage("Resend OTP failed. Please try again later.");
                }
            })
            .catch((err) => {
                console.log(err);
                setResendLodaer(false);
            });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            verifyOtp();
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    const resendOptions = {
        loop: true,
        autoplay: true,
        animationData: greenloader,
        rendererSettings: {},
    };
    return (
        <VerifyModal>
            <Title style={{ display: isFailed && "none" }}>
                Please enter the OTP
            </Title>
            <CodeSection
                style={{
                    border: isError ? "1px solid red" : "1px solid #4ba870",
                }}
            >
                <input
                    value={otp}
                    type="number"
                    autoFocus
                    maxlength="4"
                    placeholder="0000"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }}
                />
                {isError && !otp ? (
                    <ErrorMessage>OTP required*</ErrorMessage>
                ) : isError && errorMessage ? (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : null}
            </CodeSection>

            <ButtonSection>
                {resendLoader ? (
                    <Resend>
                        <Refresh>
                            <Lottie options={resendOptions} width={30} />
                        </Refresh>
                        Resend
                    </Resend>
                ) : (
                    <Resend onClick={resendOtp}>
                        <Refresh style={{ transform: "translateY(-3px)" }}>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2021/refresh.svg"
                                }
                                alt=""
                            />
                        </Refresh>
                        Resend
                    </Resend>
                )}
                {isLoading ? (
                    <SubmitButton>
                        <Lottie
                            options={defaultOptions}
                            height={40}
                            width={40}
                        />
                    </SubmitButton>
                ) : (
                    <SubmitButton onClick={verifyOtp}>Submit</SubmitButton>
                )}
            </ButtonSection>
        </VerifyModal>
    );
};

export default OTPModal;
const VerifyModal = styled.div``;

const ButtonSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
`;
const Resend = styled.span`
    color: #4ba870;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
    }
`;

const SubmitButton = styled.span`
    width: 150px;
    height: 50px;
    margin-left: auto;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
    }
`;
const Refresh = styled.span`
    width: 20px;
    display: block;
    margin-right: 10px;
    /* transform: translateY(-3px); */
    img {
        display: block;
        width: 100%;
    }
`;

const CodeSection = styled.div`
    margin-top: 30px;
    position: relative;
    input {
        letter-spacing: 10px;
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 22px;
        &::placeholder {
            font-size: 22px;
        }
    }
`;
const Title = styled.h3`
    font-size: 24px;
    font-family: gordita_medium;
    color: #393939;
    padding-bottom: 20px;
    border-bottom: 1px solid#e7e6e6;
    @media all and (max-width: 768px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const ErrorMessage = styled.p`
    position: absolute;
    bottom: -17px;
    left: 0;
    font-size: 10px;
    color: red;
`;
