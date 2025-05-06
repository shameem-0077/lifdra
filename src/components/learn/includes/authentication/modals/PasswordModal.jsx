import React, { useRef, useState } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import { serverConfig } from "../../../../../axiosConfig";
import auth from "../../../../routing/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { Timestamp, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth as firebaseAuth } from "../../../../../firebase";
import { signInWithCustomToken } from "firebase/auth";
import CampusModal from "./CampusModal";
import { useAuthStore } from "../../../../../store/authStore";

function PasswordModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const recaptchaRef = useRef(null);
    const { user_data, updateUserData, updateUserProfile } = useAuthStore();

    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const [password, setPassword] = useState("");
    const [campusData, setCampusData] = useState("");

    const handlePasswordShow = () => {
        setHide(!hide);
    };

    //Preventing "Enter" key function
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    //access_token and refresh_token will be saved in the store
    const setUserDetails = (data) => {
        let user_data = {
            access_token: data.response.access_token,
            refresh_token: data.response.refresh_token,
            name: data.name,
            phone: data.phone,
            is_verified: true,
            is_premium_user: data.is_premium_user,
            has_active_subscription: data.has_active_subscription,
            signup_type: data.signup_type,
            pk: data.id,
        };
        fetchProfile(data.response.access_token);
        updateUserData(user_data);
        firebaseAuthenticate(
            user_data,
            data.name,
            data.response.access_token,
            data.id
        );
    };

    const fetchProfile = (access_token) => {
        serverConfig
            .get("/api/v1/users/profile/", {
                params: {
                    response_type: "minimal",
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    updateUserProfile(data);
                } else {
                }
            })
            .catch((error) => {});
    };

    const firebaseAuthenticate = (user_data, name, access_token, pk) => {
        serverConfig
            .get("/api/v1/users/firebase/auth/login/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { data } = response.data;

                const token = data.token;
                signInWithCustomToken(firebaseAuth, token)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        const roomId =
                            user?.uid + user?.uid.split("").reverse().join("");

                        const data = {
                            ...user_data,
                            uid: user.uid,
                            roomId: roomId,
                        };

                        updateUserData(data);

                        async function getUser() {
                            const currentToken =
                                localStorage.getItem("currentToken");
                            const docRef = doc(db, "users", user.uid);
                            const docSnap = await getDoc(docRef);

                            if (docSnap.exists()) {
                                updateDoc(doc(db, "users", user.uid), {
                                    name,
                                    isOnline: true,
                                    pk: pk,
                                });
                            } else {
                                setDoc(doc(db, "users", user.uid), {
                                    name,
                                    username: "",
                                    uid: user.uid,
                                    createdAt: Timestamp.fromDate(new Date()),
                                    lastMessageTime: Timestamp.fromDate(
                                        new Date()
                                    ),
                                    isOnline: true,
                                    isTyping: false,
                                    isStudent: true,
                                    isNew: true,
                                    activeDeviceToken: currentToken,
                                    pk: pk,
                                });
                            }
                        }

                        getUser();
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ...
                    });
            });
    };

    const onSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (user_data.phone) {
            if (password) {
                setLoading(true);

                serverConfig
                    .post("/api/v1/users/login/verify/", {
                        password: password,
                        service: "learn",
                        phone: user_data.phone,
                        country: user_data.selectedCountry.web_code,
                    })
                    .then(async (response) => {
                        const { status_code, data, message } = response.data;
                        if (status_code === 6000) {
                            if (data?.redirect_url) {
                                setCampusData(data);
                                setTimeout(() => {
                                    window.location.href = `https://${data.redirect_url}`;
                                }, 1000);
                            } else {
                                // Create user data object from the response
                                const userData = {
                                    access_token: data.access_token,
                                    name: data.user_data.name,
                                    phone: data.user_data.phone,
                                    is_verified: true,
                                    pk: data.user_data.id,
                                    ...data.user_data
                                };
                                
                                // Update user data in store
                                updateUserData(userData);
                                
                                // Set auth token
                                auth.login(data.access_token);
                                
                                // Navigate to feed
                                navigate("/feed/");
                            }
                        } else {
                            setLoading(false);
                            setError(true);
                            setErrorMessage(message?.message || "Login failed");
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        setError(true);
                        setErrorMessage(
                            error.response?.data?.message?.message ||
                            "Something went wrong"
                        );
                    });
            } else {
                setError(true);
                setErrorMessage("Please enter password");
            }
        }
    };

    const loginWithOtp = async () => {
        setLoading(true);

        const token = await recaptchaRef.current.executeAsync();
        //Country, service and phone is passed to the url
        serverConfig
            .post("/api/v1/users/login/enter/otp/", {
                country: user_data.selectedCountry.web_code,
                service: "learn",
                phone: user_data.phone,
                "g-recaptcha-response": token,
            })
            .then((response) => {
                //From response.data the message and status_code  will be taken.
                const { status_code, message } = response.data;
                if (status_code === 6000) {
                    setLoading(false);
                    navigate(`${location.pathname}?action=otp`);
                    //When status code reads true it will redirect to the next page.
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
                setErrorMessage("An error occurred, please try again later");
            });
    };

    return (
        <>
            <CampusModal campusData={campusData} />
            <Container className="container">
                <JoinNow>
                    <CloseIcon
                        title="Close"
                        className="las la-times-circle"
                        onClick={() => navigate(-1)}
                    ></CloseIcon>
                    <ItemContainer>
                        {location.search.includes("action=password") && (
                            <>
                                <Content>
                                    <Shape
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                                        alt=""
                                    />
                                    <Title className="g-medium">
                                        Password{" "}
                                    </Title>
                                    <Description className="g-medium">
                                        Enter your password for this account
                                    </Description>
                                    <InputContainer
                                        style={{
                                            marginBottom: 0,
                                            borderColor: error && "#f46565",
                                        }}
                                    >
                                        <Icon
                                            src={
                                                hide
                                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
                                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
                                            }
                                            alt=""
                                        />
                                        <InputField
                                            className="g-medium"
                                            autoFocus
                                            style={{ paddingRight: 15 }}
                                            type={hide ? "password" : "text"}
                                            placeholder="Enter a password"
                                            onKeyDown={handleKeyDown}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setError(false);
                                            }}
                                            value={password}
                                        />
                                        <Icon
                                            onClick={handlePasswordShow}
                                            style={{ cursor: "pointer" }}
                                            src={
                                                hide
                                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
                                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
                                            }
                                            alt=""
                                        />
                                    </InputContainer>
                                    <BottomRow
                                        style={{
                                            justifyContent:
                                                error && "space-between",
                                        }}
                                    >
                                        {error && (
                                            <ErrorText className="b-medium">
                                                {error_message}
                                            </ErrorText>
                                        )}
                                        <RowItem
                                            onClick={(e) => {
                                                e.preventDefault();
                                                loginWithOtp();
                                            }}
                                            to={`${location.pathname}?action=otp`}
                                            className="g-medium"
                                        >
                                            Login with OTP
                                        </RowItem>
                                    </BottomRow>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        //This ref can be used to call captcha related functions in case you need.
                                        sitekey="6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc"
                                        size="invisible"
                                        badge="bottomleft"
                                    />
                                    <BottomButton
                                        onClick={onSubmit}
                                        // to="/tech-schooling/"
                                        to="/feed/"
                                        className="g-medium white"
                                    >
                                        {isLoading ? (
                                            <RequestLoader />
                                        ) : (
                                            "Login"
                                        )}
                                    </BottomButton>
                                    <Forgot
                                        // to="/auth/reset/password/phone/enter/"
                                        to={`${location.pathname}?action=forgot-password`}
                                        className="g-medium"
                                    >
                                        Forgot password?
                                    </Forgot>
                                </Content>
                                <TermsService />
                            </>
                        )}
                    </ItemContainer>
                </JoinNow>
            </Container>
        </>
    );
}

export default PasswordModal;

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
    font: 14px;
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
        display: block;
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
        font-size: 13px;
        transform: scale(0.9375);
        transform-origin: left top;
    }
`;
const BottomRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 9px;
    font-size: 15px;
    @media (max-width: 640px) {
        margin: 10px 0 0 0;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const RowItem = styled(Link)`
    font-size: 13px;
    margin-left: 7px;
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
const MiddleContainer = styled.div`
    display: flex;
    position: relative;
`;
const ErrorText = styled.span`
    font-size: 14px;
    left: 0;
    color: #f46565;
    bottom: -27px;
    @media (max-width: 480px) {
        font-size: 13px;
        bottom: -26px;
    }
`;
const BottomButton = styled(Link)`
    cursor: pointer;
    background: #5cc66a;
    display: block;
    font-size: 14px;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    color: #fff;
    min-height: 50px;
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
const Forgot = styled(Link)`
    margin: 14px 0 70px;
    font-size: 14px;
    text-align: center;
    color: #5cc66a;
    @media (max-width: 640px) {
        margin-bottom: 0;
    }
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;
