import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import TermsService from "../general/TermsService";
import OtpCard from "../general/OtpCard";
import { connect } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import RequestLoader from "../general/RequestLoader";
import ColorLogo from "../general/ColorLogo";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import OtpIssue from "../general/OtpIssue";

// Function used to get values from redux react
function mapStatetoProps(state) {
    return {
        user_data: state.user_data,
        signup_data: state.signup_data,
    };
}
// Function used to update values from redux react
function mapDispatchtoProps(dispatch) {
    return {
        updateUserData: (user_data) =>
            dispatch({
                type: "UPDATE_USER_DATA",
                user_data: user_data,
            }),
        updateSignupData: (signup_data) =>
            dispatch({
                type: "UPDATE_SIGNUP_DATA",
                signup_data: signup_data,
            }),
    };
}

const VerifyOtp = (props) => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isResendLoading, setResendLoading] = useState(false);
    const [isResendSuccess, setResendSuccess] = useState(null);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        let { signup_data } = props;
        if (signup_data.otp) {
            setOtp(signup_data.otp);
        }
    }, []);

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
        let { user_data } = props;
        user_data = {
            ...data,
        };
        props.updateUserData(user_data);
    };

    const onSubmit = (e, otp_value) => {
        if (e) {
            e.preventDefault();
        }
        //Phone number is taken as user data from redux store
        let { user_data, signup_data } = props;
        const otpNumber = otp_value ? otp_value : otp;
        if (otpNumber) {
            if (!(signup_data.otp === otpNumber)) {
                //After submission of userdata loading will starts.
                setLoading(true);

                //user_data, service and otp is passed to the url
                accountsConfig
                    .post("/authentication/signup/verify/phone/", {
                        otp: otpNumber,
                        service: "learn",
                        country: user_data.selectedCountry.web_code,
                        phone: user_data.phone,
                    })

                    .then((response) => {
                        //From response.data the message and statuscode  will be taken.
                        const { StatusCode, message } = response.data;
                        if (StatusCode === 6000) {
                            //stopped the loading function
                            setLoading(false);
                            //When status code reads true it will redirect to the next page.
                            history.push("/auth/join/enter/name/");
                            //setUserDetails will be called from response.data
                            setUserDetails(response.data);
                            props.updateUserData(user_data);
                            props.updateSignupData({
                                ...signup_data,
                                otp: otpNumber,
                                name: null,
                                password: null,
                            });
                        } else if (StatusCode === 6001) {
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
                history.push("/auth/join/enter/name/");
            }
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
        }
    };

    // function used to resend otp.
    const onResend = () => {
        //Phone number is taken as user data from redux store
        let { user_data } = props;
        //After submission of userdata loading will starts.
        setResendLoading(true);

        //user_data, service and country is passed through the url
        accountsConfig
            .post("/authentication/signup/resend/otp/", {
                country: user_data.selectedCountry.web_code,
                service: "learn",
                phone: user_data.phone,
            })

            .then((response) => {
                //From response.data the message and statuscode  will be taken.
                const { StatusCode, message } = response.data;
                if (StatusCode === 6000) {
                    //stopped the loading function
                    setResendLoading(false);
                    setResendSuccess(true);
                    props.updateUserData(user_data);
                } else if (StatusCode === 6001) {
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
            <TalropEdtechHelmet title="Verify phone" />
            <Logo
                alt=""
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
            ></Logo>
            <ColorLogo />
            <Content>
                <Shape
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    alt=""
                />
                <Title className="g-medium">
                    A One Time Password has been sent!
                </Title>
                <Description className="g-medium">
                    Please enter the four-digit number which has been sent to
                    the registered mobile number.
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
                onClick={onSubmit}
                className="b-medium white"
                to="/auth/join/enter/name/"
            >
                {isLoading ? <RequestLoader /> : "Verify"}
            </BottomButton>
            <BottomRow className="g-medium">
                Already have an account?
                <RowItem to="/auth/login/" className="g-medium">
                    Login
                </RowItem>
            </BottomRow>
            <TermsService />
        </Container>
    );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(VerifyOtp);

const Container = styled.div`
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: 40%;
    padding: 0 53px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
const Logo = styled.img`
    display: none;
    @media (max-width: 640px) {
        display: none;
        width: 60px;
    }
`;
const Title = styled.h4`
    font-size: 25px;
    line-height: 1.4em;
    margin-top: 14px;
    @media (max-width: 640px) {
        font-size: 23px;
    }
    @media (max-width: 480px) {
        margin-top: 25px;
        font-size: 20px;
    }
`;
const Description = styled.p`
    margin: 18px 0 40px;
    width: 94%;
    font-size: 13px;
    @media (max-width: 480px) {
        width: 100%;
    }
`;
const Content = styled.div`
    position: relative;
`;
const BottomRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14px 0 70px;
    font-size: 14px;
    @media (max-width: 640px) {
        margin: 20px 0 70px;
    }
    @media (max-width: 480px) {
        margin: 20px 0 40px;
        font-size: 13px;
    }
`;
const RowItem = styled(Link)`
    color: #5cc66a;
    font-size: 14px;
    margin-left: 7px;
    @media (max-width: 480px) {
        font-size: 13px;
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
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    color: #fff;
    min-height: 50px;
    @media (max-width: 480px) {
        height: 44px;
        font-size: 15px;
    }
`;
const Shape = styled.img`
    max-height: 29px;
    max-width: 29px;
    @media (max-width: 640px) {
        display: none;
    }
`;
