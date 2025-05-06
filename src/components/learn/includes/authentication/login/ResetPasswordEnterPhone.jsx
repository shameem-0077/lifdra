import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import TermsService from "../general/TermsService";
import FlagDropDown from "../general/FlagDropDown";
import CountrySelector from "../general/CountrySelector";

import { connect } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../general/RequestLoader";
import ColorLogo from "../general/ColorLogo";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import SignupLoader from "../../techschooling/general/loaders/SignupLoader";

function mapStatetoProps(state) {
    return { user_data: state.user_data };
}

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

const ResetPasswordEnterPhone = (props) => {
    const history = useHistory();
    const [country_details] = useState([
        {
            country: "India (+91)",
            number_length: 10,
            short_code: "IN",
            selected: false,
            code: "+91",
            flag:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/flags/india.svg",
        },
    ]);

    //storing selcted country to state
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");

    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };

    useEffect(() => {
        let { user_data } = props;
        setPhone(user_data.phone);
    }, []);

    //Preventing "Enter" key function
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    //Validating the function of entering the phone number
    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhone(e.target.value);
            setError(false);
        }
    };

    const onEnter = () => {
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
                        setLoading(false);
                        //When status code reads true it will redirect to the next page.
                        history.push("/auth/reset/password/phone/verify/");
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
        props.updateUserData({ ...props.user_data, selectedCountry: selected });
    };

    return (
        <Container>
            <CountrySelector
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
                country_details={country_details}
            />
            <TalropEdtechHelmet title="Password Reset Setup (1/3)" />
            <ColorLogo />
            <Content>
                <Shape
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    alt=""
                />
                <Title className="b-medium">Password Reset Setup (1/3)</Title>
                <Description className="b-medium">
                    Enter your registered mobile number to reset your password
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
                            className="b-medium"
                            style={{
                                borderColor: error ? "#f32e2f" : "#2f3337",
                            }}
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg"
                                alt=""
                                onClick={() => setError(!error)}
                            />
                            {selectedCountry && selectedCountry.phone_code}
                            <InputField
                                autoFocus
                                className="b-medium"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={onChange}
                                onKeyDown={handleKeyDown}
                            />
                        </InputContainer>
                        {error ? (
                            <ErrorText className="b-medium">
                                {error_message}
                            </ErrorText>
                        ) : null}
                    </MiddleContainer>
                )}
            </Content>

            <BottomButton
                onClick={(e) => {
                    e.preventDefault();
                    onEnter();
                }}
                to="/auth/auth/reset/password/phone/verify/"
                className="b-medium white"
            >
                {isLoading ? <RequestLoader /> : "Send OTP"}
            </BottomButton>
            <TermsService />
        </Container>
    );
};

export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(ResetPasswordEnterPhone);

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
const Logo = styled.img`
    display: none;
    @media (max-width: 640px) {
        display: block;
        width: 60px;
    }
    @media (max-width: 640px) {
        width: 55px;
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
const Content = styled.div``;
const InputContainer = styled.div`
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
        margin-bottom: 10px;
        padding: 10px 12px;
        border-color: #5f6367;
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
        max-width: 20px;
        max-height: 20px;
    }
`;
const InputField = styled.input`
    width: 100%;
    color: #000;
    font-size: 17px;
    padding-left: 15px;
    caret-color: #5cc66a;
    @media (max-width: 480px) {
        width: 106.666666667%;
        padding-left: 16px;
        font-size: 16px;
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
`;
const RowItem = styled(Link)`
    color: #5cc66a;
    font-size: 15px;
    margin-left: 7px;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const LoaderContainer = styled.div`
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const MiddleContainer = styled.div`
    display: flex;
    position: relative;
`;
const ErrorText = styled.span`
    font-size: 13px;
    position: absolute;
    left: 70px;
    color: #f46565;
    bottom: -26px;
`;
const BottomButton = styled(Link)`
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0 108px;
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
