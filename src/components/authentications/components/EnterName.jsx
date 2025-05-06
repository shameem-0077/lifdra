import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import TermsService from "./TermsService";
import { connect } from "react-redux";
import { serverConfig } from "../../../axiosConfig";
import RequestLoader from "./RequestLoader";
import ColorLogo from "./ColorLogo";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";

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

const EnterName = (props) => {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        let { signup_data } = props;
        setName(signup_data.name);
    }, []);

    //Validating the function of entering the name
    const onChange = (e) => {
        let value = e.target.value;

        value = value.replace(/[^A-Za-z, " "]/gi, "");
        setName(value);
        setError(false);
    };

    //Input values will be saved
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    const setUserDetails = () => {
        let { user_data } = props;
        user_data = { ...user_data, name: name };
        props.updateUserData(user_data);
    };

    const onSubmit = (e) => {
        e && e.preventDefault();
        //Phone number is taken as user data from redux store
        let { user_data, signup_data } = props;
        //access token will be saved
        let { access_token } = user_data;
        if (name) {
            //After submission of userdata loading will starts.
            if (!(signup_data.name === name)) {
                setLoading(true);

                //name, service and authorization is passed through the url
                serverConfig
                    .post(
                        "/authentication/signup/set/name/",
                        {
                            name: name,
                            service: "learn",
                            phone: user_data.phone,
                            country: user_data.selectedCountry.web_code,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + access_token,
                            },
                        }
                    )

                    .then((response) => {
                        //From response.data the message and status_code  will be taken.
                        const { status_code, message } = response.data;
                        if (status_code === 6000) {
                            setLoading(false);
                            //When status code reads true it will redirect to the next page.
                            history.push("/auth/join/set/password/");
                            setUserDetails();
                            props.updateSignupData({
                                ...signup_data,
                                name: name,
                                password: null,
                            });
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
                history.push("/auth/join/set/password/");
            }
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
        }
    };

    return (
        <Container>
            <TalropEdtechHelmet title="Enter name" />
            <Logo
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
                alt="Logo"
            />
            <ColorLogo />
            <Content>
                <Shape
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    alt=""
                />
                <Title className="g-medium">What should we call you?</Title>
                <Description className="g-medium">
                    Enter your full name to personalize your account.
                </Description>
                <InputContainer
                    className="b-medium"
                    style={{ borderColor: error ? "#f32e2f" : "#2f3337" }}
                >
                    <Icon
                        alt=""
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/person.svg"
                    />
                    <InputField
                        autoFocus
                        className="g-medium"
                        placeholder="Enter your name"
                        onKeyDown={handleKeyDown}
                        value={name}
                        onChange={onChange}
                    />
                    {error && (
                        <ErrorText className="g-medium">
                            {error_message}
                        </ErrorText>
                    )}
                </InputContainer>
            </Content>

            <BottomButton
                to="/auth/join/set/password/"
                className="g-medium white"
                onClick={onSubmit}
            >
                {isLoading ? <RequestLoader /> : "Continue"}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(EnterName);

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
        margin-top: 20px;
        font-size: 22px;
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
    position: relative;
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
const MiddleContainer = styled.div`
    display: flex;
    position: relative;
`;
const ErrorText = styled.span`
    font-size: 12px;
    position: absolute;
    left: 0;
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
    margin-top: 40px;
    color: #fff;
    min-height: 50px;
    font-size: 14px;
    @media (max-width: 480px) {
        height: 44px;
        font-size: 13px;
        margin-top: 5px;
    }
`;
const Shape = styled.img`
    max-height: 29px;
    max-width: 29px;
    @media (max-width: 640px) {
        display: none;
    }
`;
