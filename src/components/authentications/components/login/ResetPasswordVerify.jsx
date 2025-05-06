import React, { useState } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import TermsService from "../../../../authentications/components/TermsService";
import OtpCard from "../../../../authentications/components/OtpCard";
import { connect, useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../../../authentications/components/RequestLoader";

import ColorLogo from "../../../../authentications/components/ColorLogo";
import TalropEdtechHelmet from "../../../../general/helpers/TalropEdtechHelmet";
import OtpIssue from "../../../../authentications/components/OtpIssue";

// Function used to update values from redux react
function mapDispatchtoProps(dispatch) {
    return {
        updateUserData: (user_data) =>
            dispatch({
                type: "UPDATE_USER_DATA",
                user_data: user_data,
            }),
    };
}

// Function used to get values from redux react
function mapStatetoProps(state) {
    return {
        user_data: state.user_data,
    };
}

function ResetPasswordVerify(props) {
    const history = useHistory();
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
                        history.push("/auth/reset/password/");
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
        <Container>
            <TalropEdtechHelmet title="Password Reset Setup (2/3)" />
            <ColorLogo />
            <Content>
                <Shape
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    alt=""
                />
                <Title className="b-medium">Password Reset Setup (2/3)</Title>
                <Description className="b-medium">
                    Enter the four digit OTP sent to the registered mobile
                    number
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
            </Content>
            <BottomButton
                className="b-medium white"
                onClick={onSubmit}
                to="/auth/reset/password/"
            >
                {isLoading ? <RequestLoader /> : "Verify"}
            </BottomButton>
            <TermsService />
        </Container>
    );
}

export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(ResetPasswordVerify);

const Container = styled.div`
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 40%;
    padding: 169px 53px 0 53px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (max-width: 1100px) {
        width: 64%;
    }
    @media (max-width: 980px) {
        width: 100%;
        padding: 169px 49px 0;
    }
    @media (max-width: 640px) {
        padding: 169px 46px 0;
    }
    @media (max-width: 480px) {
        padding: 91px 34px 0;
        background-position-y: -37px;
    }
`;
const Title = styled.h4`
    font-size: 27px;
    line-height: 1.4em;
    margin-top: 14px;
    @media (max-width: 640px) {
        font-size: 25px;
    }
    @media (max-width: 480px) {
        margin-top: 25px;
        font-size: 22px;
    }
`;
const Description = styled.p`
    margin: 18px 0 40px;
    width: 94%;
    @media (max-width: 480px) {
        font-family: unset;
        width: 100%;
    }
`;
const Content = styled.div`
    position: relative;
`;
const Desclimer = styled.span`
    color: #4d4e4e;
    display: block;
    font-size: 14px;
    margin-top: 35px;
`;
const BottomButton = styled(Link)`
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 108px;
    color: #fff;
    min-height: 50px;
    @media (max-width: 480px) {
        height: 44px;
        font-size: 15px;
        margin-bottom: 70px;
    }
`;
const Shape = styled.img`
    max-height: 29px;
    max-width: 29px;
    @media (max-width: 640px) {
        display: none;
    }
`;
