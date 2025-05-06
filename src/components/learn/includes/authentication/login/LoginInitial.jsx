import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory, useLocation } from "react-router-dom";
import TermsService from "../general/TermsService";
import FlagDropDown from "../general/FlagDropDown";
import CountrySelector from "../general/CountrySelector";
import { connect, useSelector } from "react-redux";
import queryString from "query-string";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../general/RequestLoader";
import ColorLogo from "../general/ColorLogo";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import SignupLoader from "../../techschooling/general/loaders/SignupLoader";

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
        updateNextPath: (nextPath) =>
            dispatch({
                type: "UPDATE_NEXT_PATH",
                nextPath: nextPath,
            }),
    };
}

const LoginInitial = (props) => {
    const history = useHistory();

    const [country_details] = useState([]);

    //storing selcted country to state
    const [selectedCountry, setSelectedCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };

    const [nextPath, setNextPath] = useState("");

    useEffect(() => {
        let { search } = props.location;
        const values = queryString.parse(search);
        setNextPath(values.next);
        props.updateSignupData({});
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

    //Veryfing "learn" service
    const verifyService = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (phone) {
            setLoading(true);
            //Service is passed to the url
            serverConfig
                .get("/api/v1/users/request/login/", {
                    params: {
                        service: "learn",
                    },
                })

                .then((response) => {
                    //From response.data the message and status_code  will be taken.
                    const { status_code, message } = response.data;
                    if (status_code === 6000) {
                        onEnter();
                    } else if (status_code === 6001) {
                        //When status is invalid error message will be saved in setState.
                        setLoading(false);
                        setError(true);
                        setErrorMessage(message);
                    }
                })
                .catch((error) => {
                    //Saved error message will be shown.
                    setLoading(false);
                    setError(true);
                    setErrorMessage(
                        "An error occurred, please try again later"
                    );
                });
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
        }
    };

    const onEnter = () => {
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
                props.updateUserData({
                    phone,
                    selectedCountry,
                });
                if (status_code === 6000) {
                    history.push({
                        pathname: "/auth/login/verify/",
                        search: nextPath ? `?next=${nextPath}` : "",
                    });
                    setLoading(false);
                    //When status code reads true it will redirect to the next page.
                } else if (status_code === 6001) {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(message);
                    if (message === "User Not Exists") {
                        history.push({
                            pathname: "/auth/join/enter/phone/",
                            search: `${phone ? `&phone=${phone}` : ""}${
                                props.nextPath ? `&next=${props.nextPath}` : ""
                            }`,
                        });
                    }
                }
            })
            .catch((error) => {
                //Saved error message will be shown.
                setError(true);
                setErrorMessage("An error occurred, please try again later");
            });
    };

    //Validating the function of entering the phone number
    const onChange = (e) => {
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

    return (
        <Container>
            <CountrySelector
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
            />
            <TalropEdtechHelmet title="Login" />
            <ColorLogo />
            <Content>
                <Shape
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    }
                    alt=""
                />
                <Title className="g-medium">Login to your account</Title>
                <Description className="g-medium">
                    Enter your registered phone number
                </Description>
                <MiddleContainer>
                    {!selectedCountry ? (
                        <LoaderContainer>
                            <SignupLoader />
                        </LoaderContainer>
                    ) : (
                        <>
                            <FlagDropDown
                                handleClick={handleShow}
                                selectedCountry={selectedCountry}
                            />
                            <InputContainer
                                className="g-medium"
                                style={{
                                    borderColor: error ? "#f32e2f" : "#2f3337",
                                }}
                            >
                                <Icon
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg"
                                    }
                                    alt=""
                                    onClick={() => setError(!error)}
                                />
                                {selectedCountry && selectedCountry.phone_code}

                                <InputField
                                    autoFocus
                                    className="g-medium"
                                    placeholder="Enter your phone number"
                                    onChange={onChange}
                                    value={phone}
                                    onKeyDown={handleKeyDown}
                                />
                                {error && (
                                    <ErrorText className="g-medium">
                                        {error_message}
                                    </ErrorText>
                                )}
                            </InputContainer>
                        </>
                    )}
                </MiddleContainer>
            </Content>
            <BottomButton
                onClick={verifyService}
                to="/auth/login/enter/password/"
                className="g-medium white"
            >
                {isLoading ? <RequestLoader /> : "Next"}
            </BottomButton>
            <BottomRow className="g-medium">
                New to Steyp?
                <RowItem to="/auth/join/enter/phone/" className="g-medium">
                    Create an account
                </RowItem>
            </BottomRow>
            <TermsService />
        </Container>
    );
};

export default connect(null, mapDispatchtoProps)(LoginInitial);

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
    font-size: 25px;
    line-height: 1.4em;
    margin-top: 14px;
    @media (max-width: 640px) {
        font-size: 23px;
        margin-top: 38px;
    }
    @media (max-width: 480px) {
        margin-top: 25px;
        font-size: 20px;
    }
`;
const Description = styled.p`
    margin: 18px 0 40px;
    width: 94%;
    font-size: 14px;
    @media (max-width: 480px) {
        font-family: unset;
        width: 100%;
        font-size: 13px;
        margin-top: 7px;
    }
`;
const Content = styled.div``;
const InputContainer = styled.div`
    position: relative;
    border: 1px solid;
    border-radius: 7px;
    padding: 15px 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 15px;
    margin-left: 10px;
    width: -webkit-fill-available;
    width: -moz-available;
    @media all and(max-width: 640px) {
        padding: 8px 13px;
    }
    @media all and(max-width: 480px) {
        padding: 8px 8px;
        border-color: #5f6367;
        font-size: 13px;
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
    @media all and(max-width: 480px) {
        display: none;
    }
`;
const InputField = styled.input`
    width: 81%;
    color: #000;
    font-size: 15px;
    padding-left: 8px;
    caret-color: #5cc66a;
    @media all and(max-width: 640px) {
        width: 81%;
    }
    @media all and(max-width: 480px) {
        width: 80%;
        padding-left: 8px;
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
    left: 0;
    color: #f46565;
    bottom: -27px;
    @media (max-width: 480px) {
        font-size: 12px;
        bottom: -26px;
    }
`;
const BottomButton = styled(Link)`
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    font-size: 14px;
    color: #fff;
    @media (max-width: 480px) {
        height: 44px;
        font-size: 13px;
    }
`;
const Shape = styled.img`
    max-height: 29px;
    max-width: 29px;
    @media (max-width: 640px) {
        display: none;
    }
`;
