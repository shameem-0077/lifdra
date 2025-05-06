import React, { useState } from "react";
import styled from "styled-components";
import TermsService from "../components/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../components/RequestLoader";

import { connect } from "react-redux";
import { serverConfig } from "../../../axiosConfig";
import OtpCard from "../components/OtpCard";
import OtpIssue from "../components/OtpIssue";

function mapDispatchtoProps(dispatch) {
    return {
        updateUserData: (user_data) =>
            dispatch({
                type: "UPDATE_USER_DATA",
                user_data: user_data,
            }),
        updateUserProfile: (user_profile) =>
            dispatch({
                type: "UPDATE_USER_PROFILE",
                user_profile: user_profile,
            }),
    };
}

function mapStatetoProps(state) {
    return {
        user_data: state.user_data,
    };
}

function ResetTwo(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isResendLoading, setResendLoading] = useState(false);
    const [isResendSuccess, setResendSuccess] = useState(null);
    const [otp, setOtp] = useState("");

    //Entering otp values will read in the setstate, after it occupies 4 value it will call submit function
    const onChange = (e) => {
        const length = e.target.value.toString().length;
        const otp_value = e.target.value;
        if (length <= 4) {
            setError(false);
            setOtp(otp_value);
            if (length === 4) {
                onSubmit(null, otp_value);
            }
        }
    };

    //Preventing "Enter" key function while entering any keys
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    //access_token and refresh_token will be saved in the redux store
    const setUserDetails = (data) => {
        let user_data = {
            access_token: data.learn_student_token.access_token,
            refresh_token: data.learn_student_token.refresh_token,
            name: data.name,
        };
        props.updateUserData(user_data);
    };

    const onSubmit = (e, otp_value) => {
        if (e) {
            e.preventDefault();
        }
        let { user_data } = props;
        const otpNumber = otp_value ? otp_value : otp;
        if (otpNumber) {
            //After submission of userdata loading will starts.
            setLoading(true);

            // Otp, service and phone is passed to the url
            serverConfig
                .post("/authentication/forget/password/verify/phone/", {
                    otp: otpNumber,
                    service: "learn",
                    country: user_data.selectedCountry.web_code,
                    phone: user_data.phone,
                })
                .then((response) => {
                    //From response.data the message and status_code  will be taken.
                    const { status_code, message } = response.data;
                    if (status_code === 6000) {
                        setLoading(false);
                        //When status code reads true it will redirect to the next page.
                        navigate(`${location.pathname}?action=forgot-password-reset`);
                        setUserDetails(response.data);
                    } else if (status_code === 6001) {
                        //When status is invalid error message will be saved in setState.
                        setError(true);
                        setErrorMessage(message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    //Saved error message will be shown.
                    setError(true);
                    setErrorMessage(
                        "An error occurred, please try again later"
                    );
                    setLoading(false);
                });
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
            setLoading(false);
        }
    };

    // function used to resend otp.
    const onResend = () => {
        let { user_data } = props;
        setResendLoading(true);
        serverConfig
            .post("/authentication/forget/password/resend/otp/", {
                country: user_data.selectedCountry.web_code,
                service: "learn",
                phone: user_data.phone,
            })
            .then((response) => {
                const { status_code } = response.data;
                if (status_code === 6000) {
                    setResendLoading(false);
                    setResendSuccess(true);
                    props.updateUserData(user_data);
                } else if (status_code === 6001) {
                    //When status is invalid error message will be saved in setState.
                    setResendLoading(false);
                    setResendSuccess(false);
                }
            })
            .catch((error) => {
                //Saved error message will be shown.
                setResendLoading(false);
                setResendSuccess(false);
            });
    };

    return (
        <Container className="container">
            <JoinNow>
                <CloseIcon
                    title="Close"
                    className="las la-times-circle"
                    onClick={props.closeModal}
                ></CloseIcon>
                <ItemContainer>
                    <Content>
                        <Shape src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg" />
                        <Title className="g-medium">
                            Password Reset Setup (2/3)
                        </Title>
                        <Description className="g-medium">
                            Enter the four digit OTP sent to the registered
                            mobile number
                        </Description>

                        <OtpCard
                            error={error}
                            error_message={error_message}
                            handleKeyDown={handleKeyDown}
                            onChange={onChange}
                            otp={otp}
                            onResend={onResend}
                            isResendSuccess={isResendSuccess}
                            isResendLoading={isResendLoading}
                        />

                        <OtpIssue />
                        <BottomButton
                            onClick={(e) => onSubmit(e)}
                            to={`${location.pathname}?action=forgot-password-reset`}
                            className="g-medium white"
                        >
                            {isLoading ? <RequestLoader /> : "Verify"}
                        </BottomButton>
                    </Content>

                    <TermsService />
                </ItemContainer>
            </JoinNow>
        </Container>
    );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ResetTwo);

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5000;
`;
const CloseIcon = styled.span`
    font-size: 34px;
    color: #ff9800;
    position: absolute;
    left: -42px;
    top: 11px;
    cursor: pointer;
    @media (max-width: 480px) {
        font-size: 30px;
        left: -38px;
    }
    @media (max-width: 400px) {
        left: 9px;
        top: 11px;
        z-index: 5000;
    }
`;
const JoinNow = styled.div`
    z-index: 500;
    background: #fff;
    width: 600px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    animation: slide-box 0.4s ease;
    @keyframes slide-box {
        0% {
            right: -600px;
        }
        100% {
            right: 0;
        }
    }
    @media (max-width: 640px) {
        width: 428px;
    }
    @media (max-width: 480px) {
        width: 359px;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;
const ItemContainer = styled.div`
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position-y: -106px;
    @media (max-width: 980px) {
        background-position-y: -106px;
    }
    @media (max-width: 640px) {
        padding: 0 29px;
        background-position-y: -79px;
    }
`;
const Content = styled.div`
    padding-top: 125px;
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 640px) {
        padding-top: 52px;
    }
`;
const Title = styled.h4`
    font-size: 25px;
    line-height: 1.4em;
    margin-top: 14px;
    @media (max-width: 640px) {
        font-size: 23px;
        margin-top: 0;
    }
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
const Description = styled.p`
    margin: 18px 0 40px;
    width: 94%;
    font-size: 14px;
    @media (max-width: 480px) {
        font-size: 13px;
        width: 100%;
    }
`;
const Desclimer = styled.span`
    color: #4d4e4e;
    display: block;
    font-size: 13px;
    margin-top: 35px;
`;
const BottomButton = styled(Link)`
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    min-height: 58px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 30px 0 108px;
    color: #fff;
    min-height: 50px;
    font-size: 15px;
    @media (max-width: 640px) {
        margin-bottom: 0;
    }
    @media (max-width: 480px) {
        min-height: 44px;
        font-size: 14px;
    }
`;
const Shape = styled.img`
    max-height: 29px;
    max-width: 29px;
    @media (max-width: 640px) {
        display: none;
    }
`;
