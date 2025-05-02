import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import FlagDropDown from "../general/FlagDropDown";
import CountrySelector from "../general/CountrySelector";
import { accountsConfig } from "../../../../../axiosConfig";
import { connect, useSelector } from "react-redux";
import SignupLoader from "../../techschooling/general/loaders/SignupLoader";

// Function used to fetch values from redux react
function mapStatetoProps(state) {
    return {
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

function ResetOne(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [country_details] = useState([
        {
            country: "India (+91)",
            number_length: 10,
            short_code: "IN",
            selected: false,
            code: "+91",
            flag: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/flags/india.svg",
        },
    ]);

    //storing selcted country to state
    const [selectedCountry, setSelectedCountry] = useState({
        country: "India (+91)",
        number_length: 10,
        short_code: "IN",
        selected: false,
        code: "+91",
        flag: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/flags/india.svg",
    });

    const { user_data } = useSelector((state) => state);

    useEffect(() => {
        setPhone(user_data.phone);
    }, [Object.keys(user_data).length]);

    const [countryselector, setCountryselector] = useState(false);
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };
    const [phone, setPhone] = useState("");
    const [isLoading, setLoading] = useState(false);

    //Validating the function of entering the phone number
    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhone(e.target.value);
            setError(false);
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (phone) {
            setLoading(true);

            //Service, country and phone is passed to the url
            accountsConfig
                .post("/authentication/forget/password/enter/phone/", {
                    country: selectedCountry.web_code,
                    service: "learn",
                    phone: phone,
                })
                .then((response) => {
                    //From response.data the message and statuscode  will be taken.
                    const { StatusCode, message } = response.data;
                    if (StatusCode === 6000) {
                        navigate(`${location.pathname}?action=forgot-password-verify-otp`);
                        setLoading(false);
                        //When status code reads true it will redirect to the next page.
                        props.updateUserData({
                            phone,
                            selectedCountry: {
                                web_code: selectedCountry.web_code,
                                phone_code: selectedCountry.phone_code,
                                flag: selectedCountry.flag,
                            },
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
            setError(true);
            setErrorMessage("This field cannot be left blank");
            setLoading(false);
        }
    };

    const onSelectHandler = (selected) => {
        setSelectedCountry(selected);
        props.updateUserData({ ...user_data, selectedCountry: selected });
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
                    <>
                        <CountrySelector
                            show={countryselector}
                            handleClick={handleShow}
                            onSelectHandler={onSelectHandler}
                            selectedCountry={selectedCountry}
                            country_details={country_details}
                        />
                        <Content>
                            <Shape src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg" />
                            <Title className="g-medium">
                                Password Reset Setup (1/3)
                            </Title>
                            <Description className="g-medium">
                                Enter your registered mobile number to reset
                                your password
                            </Description>
                            {!selectedCountry ? (
                                <LoaderContainer>
                                    <SignupLoader />
                                </LoaderContainer>
                            ) : (
                                <MiddleContainer>
                                    <FlagDropDown
                                        handleClick={handleShow}
                                        selectedCountry={selectedCountry}
                                    />
                                    <InputContainer
                                        className="g-medium"
                                        style={{
                                            borderColor: error
                                                ? "#f32e2f"
                                                : "#2f3337",
                                        }}
                                    >
                                        <Icon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg" />
                                        {selectedCountry &&
                                            selectedCountry.phone_code}
                                        <InputField
                                            autoFocus
                                            className="g-medium"
                                            placeholder="Enter your phone number"
                                            onKeyDown={handleKeyDown}
                                            value={phone}
                                            onChange={onChange}
                                        />
                                        {error ? (
                                            <ErrorText className="g-medium">
                                                {error_message}
                                            </ErrorText>
                                        ) : null}
                                    </InputContainer>
                                </MiddleContainer>
                            )}

                            <BottomButton
                                className="g-medium white"
                                onClick={(e) => onSubmit(e)}
                                to={`${location.pathname}?action=forgot-password-verify-otp`}
                            >
                                {isLoading ? <RequestLoader /> : "Send OTP"}
                            </BottomButton>
                        </Content>
                        <TermsService />
                    </>
                </ItemContainer>
            </JoinNow>
        </Container>
    );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ResetOne);

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5000;
`;
const LoaderContainer = styled.div`
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
        width: 100%;
        font-size: 13px;
    }
`;
const InputContainer = styled.div`
    position: relative;
    border: 1px solid;
    border-radius: 7px;
    padding: 15px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 17px;
    margin-left: 10px;
    width: -webkit-fill-available;
    width: -moz-available;
    @media (max-width: 480px) {
        padding: 8px 13px;
        border-color: #5f6367;
        font-size: 15px;
    }
    &:focus-within {
        border-color: #5cc66a;
    }
`;
const Icon = styled.img`
    max-width: 17px;
    max-height: 17px;
    margin-right: 12px;
    display: block;
    @media (max-width: 480px) {
        display: none;
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
        padding-left: 10.66667px;
        font-size: 14px;
        transform: scale(0.9375);
        transform-origin: left top;
    }
`;
const BottomRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14px 0 70px;
    font-size: 15px;
    @media (max-width: 640px) {
        margin: 20px 0 10px 0;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const RowItem = styled(Link)`
    color: #5cc66a;
    font-size: 15px;
    margin-left: 7px;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const MiddleContainer = styled.div`
    display: flex;
    position: relative;
`;
const ErrorText = styled.span`
    font-size: 13px;
    position: absolute;
    left: 0;
    color: #f46565;
    bottom: -27px;
    @media (max-width: 480px) {
        font-size: 12px;
        bottom: -26px;
    }
`;
const BottomButton = styled(Link)`
    cursor: pointer;
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    color: #fff;
    font-size: 15px;
    @media (max-width: 640px) {
        height: 50px;
    }
    @media (max-width: 480px) {
        height: 44px;
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
