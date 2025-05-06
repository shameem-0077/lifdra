import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SpotlightVideo from "./modal/SpotlightVideo";
// import Bground from "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-04-2023/bg-round.svg";
import Infoicon from "../../../../../assets/images/newlandingpage/information.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import queryString from "query-string";
import { connect } from "react-redux";

import FlagDropDown from "../../../../learn/includes/authentication/general/FlagDropDown";
import SignupLoader from "../../../../learn/includes/techschooling/general/loaders/SignupLoader";
import CountrySelector from "../../../../learn/includes/authentication/general/CountrySelector";
import RequestLoader from "../../../../learn/includes/authentication/general/RequestLoader";

import ReCAPTCHA from "react-google-recaptcha";
// Function used to fetch values from redux react
function mapStatetoProps(state) {
    return {
        signup_data: state.signup_data,
    };
}

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

function TrialSpotlight(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const recaptchaRef = useRef(null);

    const [isModal, setModal] = useState(false);

    //storing selected country to state
    const [selectedCountry, setSelectedCountry] = useState("");
    const [country_code, setCountry] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [phoneLength, setPhoneLength] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };
    const [phone, setPhone] = useState("");

    const [isLoading, setLoading] = useState(false);

    let { signup_data } = props;
    useEffect(() => {
        if (signup_data) {
            setPhone(signup_data.phone);
        }
        let { search } = location;
        const values = queryString.parse(search);
        const phone = values.phone;
        setPhone(phone);
        // setCountry(user_data.selectedCountry.web_code);
    }, []);

    //Preventing "Enter" key function
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            verifyService();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setPhoneLength(false);
            setLoading(false);
        }, 1000);
    }, [phoneLength]);

    const checkPhoneLength = () => {
        if (phone?.length !== selectedCountry.phone_number_length) {
            setPhoneLength(true);
        } else {
            setCheckPhone(true);
            setPhoneLength(false);
        }
    };
    //Veryfing "learn" service
    const verifyService = (e) => {
        setError(true);
        checkPhoneLength();
        if (e) {
            e.preventDefault();
        }
        if (phone && checkPhone) {
            setLoading(true);
            //Service is passed to the url
            serverConfig
                .get("/api/v1/users/request/login/", {
                    params: {
                        service: "learn",
                    },
                })

                .then((response) => {
                    const { status_code, message } = response.data;
                    if (status_code === 6000) {
                        onEnter();
                    } else if (status_code === 6001) {
                        setLoading(false);
                        setError(true);
                        setErrorMessage(message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(
                        "An error occurred, please try again later"
                    );
                });
        } else {
            setErrorMessage("This field cannot be empty.");
        }
    };

    const onEnter = async () => {
        //Service, country and phone is passed to the url
        serverConfig
            .post("/api/v1/users/login/enter/", {
                country: selectedCountry.web_code,
                service: "learn",
                phone: phone,
            })
            .then((response) => {
                //From response.data the message and status_code  will be taken.
                const { status_code, message } = response.data;
                if (status_code === 6000) {
                    navigate(`${location.pathname}?action=password${props.nextPath ? `&next=${props.nextPath}` : ""}`);
                    setLoading(false);
                    props.updateUserData({
                        phone,
                        selectedCountry,
                    });
                } else if (response.data.status_code === 6001) {
                    setLoading(false);
                    // setError(true);
                    setErrorMessage(message);
                    if (message === "User Not Exists") {
                        sendOtpNumber();
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                //Saved error message will be shown.
                setError(true);
                setErrorMessage("An error occurred, please try again later");
            });
    };

    const sendOtpNumber = async (e) => {
        if (phone) {
            setLoading(true);
            const token = await recaptchaRef.current.executeAsync();
            // const token = "6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc";
            serverConfig
                .post("/api/v1/users/signup/enter/phone/", {
                    country: selectedCountry.web_code,
                    service: "learn",
                    phone: phone,
                    "g-recaptcha-response": token,
                })
                .then((response) => {
                    //From response.data the message and status_code  will be taken.
                    const { status_code, message } = response.data;
                    if (status_code === 6000) {
                        setLoading(false);
                        //When status code reads true it will redirect to the next page.
                        navigate(`${location.pathname}?action=verify-otp${props.nextPath ? `&next=${props.nextPath}` : ""}`);
                        let user_data = {
                            phone,
                            selectedCountry,
                        };
                        props.updateUserData(user_data);
                        props.updateSignupData({
                            ...signup_data,
                            phone: phone,
                            country: selectedCountry.web_code,
                        });
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
        }
    };

    //Validating the function of entering the phone number

    const onChange = (e) => {
        // checkPhoneLength();
        setError(false);
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhone(e.target.value);
        }
    };

    const onSelectHandler = (selected) => {
        setSelectedCountry(selected);
        props.updateUserData({ selectedCountry: selected });
    };

    const inputRef = useRef(null);

    useEffect(() => {
        const handleInputFocus = () => {
            const viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            );
        };

        const handleInputBlur = () => {
            const viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0"
            );
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener("focus", handleInputFocus);
            inputElement.addEventListener("blur", handleInputBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("focus", handleInputFocus);
                inputElement.removeEventListener("blur", handleInputBlur);
            }
        };
    }, [inputRef.current]);

    return (
        <>
            <SpotlightVideo
                isModal={isModal}
                setModal={setModal}
                videoUrl={
                    "https://player.vimeo.com/external/764557363.m3u8?s=009ead661977487ee9eeb060aeeaeecd908dbf78"
                }
                videoThumnail={""}
            />
            <CountrySelector
                country_code={country_code}
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
            />
            <BgContainer>
                <RightBgContainer>
                    <BgRoundDiv
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-04-2023/bg-round.svg"
                        }
                    />
                </RightBgContainer>
                <Container>
                    <MainSection>
                        <LeftSection>
                            <Title>
                                Creating Computer <span>Engineers </span> & Tech
                                <span> Scientists</span>
                            </Title>
                            <Description>
                                Steyp is a Digital University for students to
                                learn and become Computer Engineers and Tech
                                Scientists irrespective of their age or
                                educational background.
                                <SpringArrow>
                                    <img
                                        src={
                                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/arrow.svg"
                                        }
                                        alt=""
                                    />
                                </SpringArrow>
                            </Description>
                            <FormHeading>
                                Get your free trial account now!
                            </FormHeading>
                            <MiddleContainer>
                                {!selectedCountry ? (
                                    <LoaderContainer>
                                        <SignupLoader />
                                    </LoaderContainer>
                                ) : (
                                    <>
                                        <FormContainer>
                                            <FlagDropDown
                                                handleClick={handleShow}
                                                selectedCountry={
                                                    selectedCountry
                                                }
                                                Responsive={true}
                                            />
                                            <InputContainer
                                                className="g-medium"
                                                style={{
                                                    borderColor: error
                                                        ? "#f32e2f"
                                                        : "#2f3337",
                                                }}
                                            >
                                                {selectedCountry &&
                                                    selectedCountry.phone_code}
                                                <InputField
                                                    ref={inputRef}
                                                    placeholder="Enter phone number"
                                                    onKeyDown={handleKeyDown}
                                                    onChange={onChange}
                                                    value={phone}
                                                    maxLength={
                                                        selectedCountry.phone_number_length
                                                    }
                                                />
                                                {error && !phone ? (
                                                    <ErrorText className="g-medium">
                                                        {error_message}
                                                    </ErrorText>
                                                ) : phone && phoneLength ? (
                                                    <ErrorText className="g-medium">
                                                        Enter Valid number
                                                    </ErrorText>
                                                ) : null}
                                            </InputContainer>
                                        </FormContainer>
                                    </>
                                )}
                                <BottomButton
                                    onClick={verifyService}
                                    to={`${location.pathname}?action=password`}
                                    className="g-medium white"
                                >
                                    {isLoading ? (
                                        <RequestLoader />
                                    ) : (
                                        "Start now!"
                                    )}
                                </BottomButton>
                            </MiddleContainer>
                            <InfoSection>
                                <InfoText>
                                    Try free for <b> 5 days. </b> No credit card
                                    needed
                                </InfoText>
                                <InfoText>
                                    By signing up you agree to the{" "}
                                    <InfoLink
                                        target="blank"
                                        to="/terms-of-service/"
                                    >
                                        Terms
                                    </InfoLink>
                                    and{" "}
                                    <InfoLink
                                        target="blank"
                                        to="/privacy-policy/"
                                    >
                                        {" "}
                                        Privacy policy{" "}
                                    </InfoLink>
                                </InfoText>
                                <InfoText>
                                    View our{" "}
                                    <InfoLink to="/plans/" target="blank">
                                        {" "}
                                        Subscription Plans{" "}
                                    </InfoLink>{" "}
                                </InfoText>
                            </InfoSection>
                        </LeftSection>
                        <RecaptchaContainer>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                //This ref can be used to call captcha related functions in case you need.
                                sitekey="6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc"
                                size="invisible"
                                badge="bottomleft"
                            />
                        </RecaptchaContainer>
                        <RightSection>
                            <MainImgContiner>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-01-2024/roboti.png "
                                    }
                                    alt="Image"
                                />
                            </MainImgContiner>
                            {/* <PlaybuttonImgContiner
                                onClick={() => setModal(true)}
                            >
                                <a href="#">
                                    <img
                                        src={
                                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-04-2023/orangeplay.svg"
                                        }
                                        alt="Icon"
                                    />
                                </a>
                            </PlaybuttonImgContiner> */}
                        </RightSection>
                    </MainSection>
                    <div className="bottom"></div>
                </Container>
            </BgContainer>
        </>
    );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(TrialSpotlight);

const FormHeading = styled.h4`
    font-size: 18px;
    margin-bottom: 10px;
    font-family: "gordita_medium";

    @media all and (max-width: 768px) {
        font-size: 16px;
        text-align: left;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
        text-align: left;
    }
`;

const PlaybuttonImgContiner = styled.div`
    position: absolute;
    width: 15%;
    bottom: 32%;
    left: 40.3%;
    cursor: pointer;
    @media all and (max-width: 1400px) {
        bottom: 35%;
        left: 36.3%;
        width: 15%;
    }
    @media all and (max-width: 1051px) {
        bottom: 40%;
        left: 44.3%;
        width: 13%;
    }

    @media all and (max-width: 980px) {
        bottom: 36%;
        left: 37.8%;
        width: 13%;
    }
    @media all and (max-width: 640px) {
        left: 41%;
    }

    img {
        width: 100%;
        display: block;
    }
`;

const BgContainer = styled.section`
    background: #f7f6f2;
    width: 90%;
    margin: 0 auto;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    @media all and (max-width: 480px) {
        margin-top: 0;
        width: 100%;
        border-radius: 0;
    }
`;

const Container = styled.div`
    width: 85%;
    margin: 0 auto;
    margin-top: 60px;
    @media all and (max-width: 1280px) {
        padding-top: 20px;
        margin-top: 40px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0 0 0;
        width: 90%;
        margin-top: 0;
    }
    .bottom {
        width: 1774px;
        height: 75px;
        background: linear-gradient(
            270deg,
            #f2ecd7 47.92%,
            rgba(242, 236, 215, 0) 99.11%
        );
        @media all and (max-width: 1050px) {
            display: none;
        }
    }
`;
const LeftSection = styled.div`
    width: 45%;

    @media all and (max-width: 1150px) {
        width: 48%;
    }
    @media all and (max-width: 1050px) {
        width: 100%;
    }
`;
const MainSection = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-wrap: wrap;
    /* margin-bottom: 60px; */

    @media all and (max-width: 480px) {
        margin-bottom: 0px;
    }
`;
const RightSection = styled.div`
    width: 47%;
    position: relative;
    right: -70px;
    @media all and (max-width: 1280px) {
        display: flex;
        justify-content: center;
    }
    /* bottom: 50px; */

    @media all and (max-width: 1200px) {
        width: 48%;
        right: -70px;
    }
    @media all and (max-width: 1051px) {
        width: 100% !important;
        right: -70px;
        bottom: 0px;
    }
    @media all and (max-width: 480px) {
        margin-top: 24px;
    }
`;
const RightBgContainer = styled.div`
    width: 42%;
    position: absolute;
    right: 0;
    top: 0;

    @media all and (max-width: 1050px) {
        display: none;
    }
`;
const BgRoundDiv = styled.img`
    width: 100%;
    display: block;
`;
const MainImgContiner = styled.div`
    width: 100%;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1080px) {
        width: 60%;
    }
`;

const Title = styled.h2`
    font-size: 43px;
    font-family: gordita_medium;
    color: #2d2d2d;
    margin-bottom: 20px;
    width: 100%;
    @media all and (max-width: 1050px) {
        width: 60%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
    }
    @media all and (max-width: 980px) {
        width: 80%;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        font-size: 28px !important;
        margin-bottom: 18px;
    }

    span {
        color: #0e9f6a;
        font-family: gordita_medium;
    }

    @media all and (max-width: 1440px) {
        font-size: 39px;
    }
    @media all and (max-width: 1280px) {
        font-size: 32px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    color: #707070;
    font-family: gordita_regular;
    font-size: 16px;
    line-height: 28px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    margin-bottom: 30px;
    @media all and (max-width: 1440px) {
        font-size: 15px;
    }
    @media all and (max-width: 1050px) {
        width: 100%;
        text-align: center;
        font-size: 16px;
    }
    @media all and (max-width: 768px) {
        width: 90%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const SpringArrow = styled.span`
    visibility: hidden;
    display: none;
    width: 70px;
    height: 100px;
    position: absolute;
    right: -10%;
    top: -25%;
    img {
        display: block;
        width: 70px;
        height: 100px;
        position: absolute;
        right: -10%;
        top: -25%;
    }
    @media all and (max-width: 640px) {
        display: none;
    }
`;
const MiddleContainer = styled.div`
    display: flex;
    position: relative;
    height: 50px;
    @media all and (max-width: 480px) {
        justify-content: center;
        margin-bottom: 50px;
        flex-wrap: wrap;
    }
`;
const ErrorText = styled.span`
    font-size: 13px;
    position: absolute;
    left: 0;
    color: #f46565;
    bottom: -27px;

    @media all and (max-width: 600px) {
        font-size: 12px;
        position: absolute;
        left: -55px;

        bottom: -22px;
    }
    @media all and (max-width: 1330px) {
        left: -55px;

        bottom: -22px;
    }
    @media all and (max-width: 1200px) {
        left: -80px;
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
        bottom: -20px;
        left: -60px;
    }
`;
const LoaderContainer = styled.div`
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const InputContainer = styled.div`
    position: relative;
    border-radius: 7px;
    padding: 15px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 15px;
    margin-left: 10px;
    width: -webkit-fill-available;
    width: -moz-available;
    margin-right: 20px;

    &:focus-within {
        border-color: #5cc66a;
    }
    @media all and (max-width: 1280px) {
        font-size: 13px;
    }
    @media all and (min-width: 768px) {
        font-size: 13px;
    }
    @media all and (max-width: 640px) {
        font-size: 13px;
        margin-right: 10px;
        border-radius: 6px;
        width: 88%;
        padding-left: 0px;
    }
    @media all and (max-width: 360px) {
        margin-right: 0px;
    }
`;
const InputField = styled.input`
    width: 100%;
    color: #000;
    font-size: 15px;
    padding-left: 5px;
    caret-color: #5cc66a;
    font-weight: 600 !important;
    font-family: gordita_regular !important;
    touch-action: manipulation;
    text-size-adjust: none;
    &::placeholder {
        font-size: 15px;
        opacity: 0.7;

        @media all and (min-width: 768px) {
            font-size: 13px;
        }
        @media all and (max-width: 640px) {
            font-size: 13px;
        }
        @media (max-width: 480px) {
            font-size: 12px;
        }
    }

    @media all and (min-width: 768px) {
        font-size: 13px;
    }
    @media all and (max-width: 640px) {
        font-size: 13px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        padding-left: 10.66667px;
        font-size: 12px;
    }
`;
const BottomButton = styled(Link)`
    cursor: pointer;
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    display: block;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 50px;
    font-size: 16px;
    width: 175px;
    @media all and (max-width: 640px) {
        height: 50px;
        width: 155px;
        font-size: 16px;
    }
    @media all and (max-width: 1200px) {
        width: 195px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        height: 45px;
        width: 100%;
    }
    /* @media all and (max-width: 360px) {
        width: 190px;
    } */
`;
const FormContainer = styled.div`
    display: flex;
    background: #fff;
    margin-right: 24px;
    border-radius: 6px;
    width: 69%;
    padding-left: 16px;
    @media all and (max-width: 360px) {
        padding-left: 12px;
    }
    @media all and (max-width: 640px) {
        margin-right: 9px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 12px;
        margin-right: 0;
    }
`;
const InfoSection = styled.div`
    margin: 60px 0 0 0;
    @media all and (max-width: 1440px) {
        margin: 38px 0 0 0;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const InfoText = styled.h3`
    margin-bottom: 18px;
    display: flex;
    font-size: 16px;
    align-items: center;

    &::before {
        content: url(${Infoicon});
        margin-right: 12px;
    }
    &:last-child {
        margin-bottom: 0;
    }
    b {
        margin: 0 4px;
    }
    @media all and (max-width: 1150px) {
        font-size: 11px;
    }

    @media all and (max-width: 1280px) {
        margin-bottom: 8px;
        font-size: 12px;
    }
    @media all and (max-width: 1440px) {
        margin-bottom: 10px;
        font-size: 13px;
    }
    @media all and (max-width: 640px) {
        font-size: 13px;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const InfoLink = styled(Link)`
    font-size: 16px;
    font-weight: 700;
    margin: 0 4px;
    text-decoration: underline;
    color: #707070;
    font-family: gordita_regular !important;

    @media all and (max-width: 1440px) {
        font-size: 14px;
    }
    @media all and (max-width: 1280px) {
        font-size: 12px;
    }
    @media all and (max-width: 640px) {
        font-size: 10px;
    }
`;
const RecaptchaContainer = styled.div`
    position: relative;
    left: 0;
    bottom: 0;
    z-index: 1000;
`;
