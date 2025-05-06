import React, { useState, useEffect } from "react";
import styled from "styled-components";
import queryString from "query-string";
import { Link, useHistory, useLocation } from "react-router-dom";
import FlagDropDown from "./FlagDropDown";
import TermsService from "./TermsService";
import CountrySelector from "./CountrySelector";
import { useAuthStore } from "../../../store/authStore";
import { serverConfig } from "../../../axiosConfig";
import RequestLoader from "./RequestLoader";
import ColorLogo from "./ColorLogo";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";
import SignupLoader from "../../techschooling/general/loaders/SignupLoader";

const EnterPhone = () => {
    const history = useHistory();
    const location = useLocation();
    const { user_data, updateUserData, signup_data, updateSignupData } = useAuthStore();

    //storing selcted country to state
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [country_code, setCountry] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [referralcode, setRefferalCode] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };

    useEffect(() => {
        const initializeCountry = async () => {
            try {
                // Get default country from API
                const response = await serverConfig.get("/api/v1/users/settings/countries/");
                if (response.data && response.data.length > 0) {
                    const defaultCountry = response.data[0]; // Get first country as default
                    setSelectedCountry(defaultCountry);
                    setCountry(defaultCountry.web_code);
                    updateUserData({ selectedCountry: defaultCountry });
                }
            } catch (error) {
                console.error("Error fetching default country:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeCountry();
    }, [updateUserData]);

    useEffect(() => {
        if (signup_data) {
            setPhone(signup_data.phone);
        }
        let { search } = location;
        const values = queryString.parse(search);
        const phone = values.phone;
        setPhone(phone);
        setRefferalCode(values.token);
    }, [signup_data, location]);

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
            onSubmit(null, phone);
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    const onSubmit = async (e, phone = phone) => {
        e && e.preventDefault();
        if (phone) {
            if (!(signup_data?.phone === phone)) {
                setLoading(true);
                try {
                    const response = await serverConfig.post("/api/v1/users/signup/enter/phone/", {
                        country: selectedCountry.web_code,
                        service: "learn",
                        phone: phone,
                    });

                    const { status_code, message } = response.data;
                    if (status_code === 6000) {
                        setLoading(false);
                        history.push("/auth/join/verify/phone/");
                        let user_data = {
                            phone,
                            selectedCountry,
                        };
                        updateUserData(user_data);
                        updateSignupData({
                            ...signup_data,
                            phone: phone,
                            otp: null,
                            name: null,
                            password: null,
                            referralcode: referralcode,
                        });
                    } else if (status_code === 6001) {
                        setError(true);
                        setErrorMessage(message);
                        setLoading(false);
                    }
                } catch (error) {
                    setError(true);
                    setErrorMessage("An error occurred, please try again later");
                    setLoading(false);
                }
            } else {
                history.push("/auth/join/verify/phone/");
            }
        } else {
            setError(true);
            setErrorMessage("This field cannot be left blank");
        }
    };

    const onSelectHandler = (selected) => {
        setSelectedCountry(selected);
        updateUserData({ selectedCountry: selected });
    };

    return (
        <Container>
            <CountrySelector
                country_code={country_code}
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
            />
            <TalropEdtechHelmet title="Create an account" />
            <Logo
                src={
                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
                }
                alt=""
            ></Logo>
            <ColorLogo />
            <Content>
                <Shape
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                    }
                    alt=""
                />
                <Title className="g-medium">
                    Join Talrop! <br /> A digital education platform for
                    Industry 4.0.
                </Title>
                <Description className="g-medium">
                    Discover the Industry 4.0 courses to upskill yourselves from
                    our top experts and gear up for the next-generation
                    revolution....
                </Description>
                <MiddleContainer>
                    {isInitializing || !selectedCountry ? (
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
                                    <ErrorText className="b-medium">
                                        {error_message}
                                    </ErrorText>
                                )}
                            </InputContainer>
                        </>
                    )}
                </MiddleContainer>
            </Content>

            <BottomButton
                onClick={(e) => onSubmit(e, phone)}
                to="/auth/join/verify/phone/"
                className="g-medium white"
            >
                {isLoading ? <RequestLoader /> : "Join now"}
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

export default EnterPhone;

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
const LoaderContainer = styled.div`
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
        width: 100%;
        font-size: 13px;
    }
`;
const Content = styled.div``;
const InputContainer = styled.div`
    position: relative;
    border: 1px solid;
    border-radius: 7px;
    padding: 15px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 15px;
    margin-left: 10px;
    width: -webkit-fill-available;
    width: -moz-available;
    @media (max-width: 480px) {
        padding: 8px 13px;
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
    font-size: 14px;
    position: absolute;
    left: 0;
    color: #f46565;
    bottom: -27px;
    @media (max-width: 480px) {
        font-size: 13px;
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
    font-size: 15px;
    color: #fff;
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
