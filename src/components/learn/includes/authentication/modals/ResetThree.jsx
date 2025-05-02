import React, { useState } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";

import { connect } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import OtpCard from "../general/OtpCard";
import auth from "../../../../routing/auth";
import ResetModal from "../../auth/general/ResetModal";

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

function ResetThree(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const default_icon =
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-round.svg";
    const check_icon =
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg";

    const [hide, setHide] = useState(true);
    const [error, setError] = useState(false);
    const [isPasswordError, setNoMatchError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [password_1, setPassword_1] = useState("");
    const [password_2, setPassword_2] = useState("");

    const [isPasswordValidation, setPasswordValidation] = useState(false);
    const [password_rules] = useState([
        {
            key: "character",
            status: false,
            text: "Should contain at least 8 characters",
        },
        {
            key: "small_letter",
            status: false,
            text: "Should contain a lowercase (small) letter (a -z)",
        },
        {
            key: "capital_letter",
            status: false,
            text: "Should contain a uppercase (capital) letter (A - Z)",
        },
        {
            key: "number",
            status: false,
            text: "Should contain at least one number (0-9)",
        },
        {
            key: "symbol",
            status: false,
            text: "Should contain at least one symbol ($,@,#,%,!,*,?,&)",
        },
    ]);

    const handlePasswordShow = () => {
        setHide(!hide);
    };

    //Preventing "Enter" key function. submit value will not be taken
    const handleKeyDown_1 = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    //Preventing "Enter" key function, submit values will be read
    const handleKeyDown_2 = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    const showModal = () => {
        setShow(true);
    };

    //
    const onChange_1 = (e) => {
        setPassword_1(e.target.value);
        validatePassword(e.target.value);
        if (e.target.value !== password_2) {
            setNoMatchError(true);
        } else {
            setNoMatchError(false);
            setError(false);
        }
    };

    const validatePassword = (string) => {
        let rules_array = password_rules;
        let isSmallLetterOkay = /[a-z]/.test(string);
        let isCapitalLetterOkay = /[A-Z]/.test(string);
        let isNumberOkay = /\d/.test(string);
        let isSymbolOkay = /[$@#%!*?&]/.test(string);
        let isCharacterOkay = string.length >= 8;
        let isPasswordValidation =
            string.length > 0
                ? isSmallLetterOkay &&
                  isCapitalLetterOkay &&
                  isNumberOkay &&
                  isSymbolOkay &&
                  isCharacterOkay
                    ? false
                    : true
                : false;
        setPasswordValidation(isPasswordValidation);
        rules_array.find((item) => item.key === "character").status =
            isCharacterOkay;
        rules_array.find((item) => item.key === "small_letter").status =
            isSmallLetterOkay;
        rules_array.find((item) => item.key === "capital_letter").status =
            isCapitalLetterOkay;
        rules_array.find((item) => item.key === "number").status = isNumberOkay;
        rules_array.find((item) => item.key === "symbol").status = isSymbolOkay;
    };

    //
    const onChange_2 = (e) => {
        setPassword_2(e.target.value);
        if (e.target.value !== password_1) {
            setNoMatchError(true);
        } else {
            setNoMatchError(false);
            setError(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let { user_data } = props;
        let { access_token } = user_data;
        if (password_1 && password_2) {
            if (password_1 === password_2) {
                setLoading(true);

                //Password, service and authorization is passed to the url
                accountsConfig
                    .post(
                        "/authentication/forget/password/reset/",
                        {
                            password: password_2,
                            service: "learn",
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + access_token,
                            },
                        }
                    )
                    .then((response) => {
                        const { StatusCode, message } = response.data;
                        if (StatusCode === 6000) {
                            setLoading(false);
                            showModal();
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
                setError(true);
                setErrorMessage("Password doesn't match");
            }
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
        }
    };

    const renderRules = password_rules.map((item, index) => (
        <RuleItem key={index}>
            <RuleImage src={item.status ? check_icon : default_icon} />
            <RuleText
                className="b-medium"
                style={{ color: item.status && "#46cb7a" }}
            >
                {item.text}
            </RuleText>
        </RuleItem>
    ));

    return (
        <Container className="container">
            <ResetModal
                nextPath={location.pathname}
                isParentModal
                show={show}
            />
            <JoinNow>
                <CloseIcon
                    title="Close"
                    className="las la-times-circle"
                    onClick={props.closeModal}
                ></CloseIcon>
                <ItemContainer>
                    <Content>
                        <Shape
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                            alt=""
                        />
                        <Title className="g-medium">
                            Password Reset Setup (3/3)
                        </Title>
                        <Description className="g-medium">
                            Set a strong password for your account
                        </Description>
                        <MiddleContainer>
                            <InputContainer>
                                <Icon
                                    src={
                                        hide
                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
                                    }
                                />
                                <InputField
                                    autoFocus
                                    className="g-medium"
                                    style={{ paddingRight: 15 }}
                                    type={hide ? "password" : "text"}
                                    placeholder="Enter a new password"
                                    onChange={onChange_1}
                                    onKeyDown={handleKeyDown_1}
                                    value={password_1}
                                />
                                <Icon
                                    onClick={handlePasswordShow}
                                    style={{ cursor: "pointer" }}
                                    src={
                                        hide
                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
                                    }
                                />
                            </InputContainer>
                            <InputContainer style={{ marginBottom: 0 }}>
                                <Icon
                                    src={
                                        hide
                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
                                    }
                                />
                                <InputField
                                    className="b-medium"
                                    style={{ paddingRight: 15 }}
                                    type={hide ? "password" : "text"}
                                    placeholder="Confirm your password"
                                    onChange={onChange_2}
                                    onKeyDown={handleKeyDown_2}
                                    value={password_2}
                                />
                                <Icon
                                    onClick={handlePasswordShow}
                                    style={{ cursor: "pointer" }}
                                    src={
                                        hide
                                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
                                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
                                    }
                                />
                            </InputContainer>
                            {error && (
                                <ErrorText className="g-medium">
                                    {error_message}
                                </ErrorText>
                            )}
                            <PasswordRules>{renderRules}</PasswordRules>
                        </MiddleContainer>
                        <BottomButton
                            onClick={(e) => onSubmit(e)}
                            className="g-medium white"
                            to={`${location.pathname}action=login`}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(ResetThree);

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
    font-size: 14px;
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
    margin: 30px 0 42px;
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
const PasswordRules = styled.div`
    margin: 20px 0 30px;
`;
const RuleItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    &:last-child {
        margin-bottom: 0;
    }
`;
const RuleImage = styled.img`
    display: block;
    width: 15px;
    margin-right: 8px;
`;
const RuleText = styled.span`
    font-size: 14px;
    display: block;
    transform: translateY(2px);
    color: #868686;
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
const InputContainer = styled.div`
    border: 1px solid #2f3337;
    border-radius: 7px;
    padding: 15px 18px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
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
const Icon = styled.img`
    max-width: 20px;
    max-height: 20px;
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
const MiddleContainer = styled.div``;
const ErrorText = styled.span`
    font-size: 12px;
    left: 70px;
    color: #f46565;
    bottom: -26px;
`;
