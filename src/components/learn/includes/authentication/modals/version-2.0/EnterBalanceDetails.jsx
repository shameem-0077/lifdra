import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../../general/RequestLoader";
import TermsService from "../../general/TermsService";
import { connect, useSelector } from "react-redux";
import { accountsConfig } from "../../../../../../axiosConfig";

// Function used to get values from redux react
function mapStatetoProps(state) {
    return {
        user_data: state.user_data,
        signup_data: state.signup_data,
        user_profile: state.user_profile,
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
        toggleSignupUser: (bool) =>
            dispatch({
                type: "TOGGLE_SIGNUP_USER",
                bool: bool,
            }),
        updateUserProfile: (user_profile) =>
            dispatch({
                type: "UPDATE_USER_PROFILE",
                user_profile: user_profile,
            }),
    };
}

function EnterBalanceDetails(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [error_message, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [userCategory, setUserCategory] = useState("");
    const [subscriptionType, setSubscriptionType] = useState("");

    const fetchProfile = () => {
        accountsConfig
            .get("/api/v1/users/profile/", {
                params: {
                    response_type: "minimal",
                },
                headers: {
                    Authorization: `Bearer ${props.user_data.access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    props.updateUserProfile(data);
                    setTimeout(() => {
                        props.toggleSignupUser(true);
                    }, 1500);
                } else {
                }
            })
            .catch((error) => {});
    };

    const onSubmit = (e) => {
        setLoading(true);
        e && e.preventDefault();
        //Phone number is taken as user data from redux store
        let { user_data } = props;
        //access token will be saved
        if (userCategory) {
            accountsConfig
                .post(
                    "api/v1/users/tech-schooling-signup/",
                    {
                        phone: user_data.phone,
                        student_category: userCategory,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user_data.access_token}`,
                        },
                    }
                )

                .then(async (response) => {
                    //From response.data the message and status code  will be taken.
                    const { StatusCode, message, data } = response.data;
                    if (StatusCode === 6000) {
                        props.updateUserData({
                            ...user_data,
                            signup_type: data.signup_type,
                        });
                        fetchProfile();
                        navigate(location.pathname);
                    } else {
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
            setLoading(false);
            setErrorMessage("This field cannot be left blank");
        }
    };

    return (
        <Container className="container">
            <JoinNow>
                <CloseIcon
                    title="Close"
                    className="las la-times-circle"
                    onClick={props.closeModal}
                ></CloseIcon>
                <ItemContainer
                    bg={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg"
                    }
                >
                    <Content>
                        <Title className="b-medium">
                            Join with Steyp's Tech Schooling
                        </Title>
                        <Description className="b-medium">
                            Join with Steyp's Tech Schooling and avail a three
                            days free trial
                        </Description>
                        <ScrollBar>
                            <>
                                <UserCategoryContainer>
                                    <TitleLabel>
                                        Based on the user category, tech
                                        services may differ
                                    </TitleLabel>
                                    <UserCategory>
                                        <Category
                                            style={{
                                                border:
                                                    error && userCategory === ""
                                                        ? "2px solid red"
                                                        : null,
                                            }}
                                            className={
                                                userCategory ===
                                                    "school_student" && "active"
                                            }
                                            onClick={() =>
                                                setUserCategory(
                                                    "school_student"
                                                )
                                            }
                                        >
                                            <CategoryTitle>
                                                School student
                                            </CategoryTitle>
                                            <CategoryDescription>
                                                Student Studying in a class
                                                between 3rd and 12th
                                            </CategoryDescription>
                                            {userCategory ===
                                                "school_student" && (
                                                <Tick
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/tick.svg"
                                                    alt=""
                                                />
                                            )}
                                        </Category>
                                        <Category
                                            style={{
                                                border:
                                                    error && userCategory === ""
                                                        ? "2px solid red"
                                                        : null,
                                            }}
                                            className={
                                                userCategory ===
                                                    "college_student" &&
                                                "active"
                                            }
                                            onClick={() =>
                                                setUserCategory(
                                                    "college_student"
                                                )
                                            }
                                        >
                                            <CategoryTitle>
                                                College student
                                            </CategoryTitle>
                                            <CategoryDescription>
                                                Student pursuing UG/PG
                                            </CategoryDescription>
                                            {userCategory ===
                                                "college_student" && (
                                                <Tick
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/tick.svg"
                                                    alt=""
                                                />
                                            )}
                                        </Category>

                                        <Category
                                            style={{
                                                border:
                                                    error && userCategory === ""
                                                        ? "2px solid red"
                                                        : null,
                                            }}
                                            className={
                                                userCategory === "other" &&
                                                "active"
                                            }
                                            onClick={() =>
                                                setUserCategory("other")
                                            }
                                        >
                                            <CategoryTitle>Other</CategoryTitle>
                                            <CategoryDescription>
                                                Graduate / Dropout
                                            </CategoryDescription>
                                            {userCategory === "other" && (
                                                <Tick
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/tick.svg"
                                                    alt=""
                                                />
                                            )}
                                        </Category>
                                    </UserCategory>
                                </UserCategoryContainer>
                            </>
                        </ScrollBar>
                        <BottomButton
                            className="b-medium white"
                            onClick={onSubmit}
                        >
                            {isLoading ? <RequestLoader /> : "Continue"}
                        </BottomButton>
                    </Content>
                    {location.pathname.includes("/tech-schooling/") ? (
                        ""
                    ) : (
                        <TermsService />
                    )}
                </ItemContainer>
            </JoinNow>
        </Container>
    );
}

export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(EnterBalanceDetails);

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
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
    background: url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-size: 85%;
    background-position-x: right;
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
        background-position-y: -50px;
        background-size: 100%;
    }
`;

const Content = styled.div`
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Title = styled.h4`
    font-size: 27px;
    line-height: 1.4em;
    margin-top: 14px;
    text-transform: capitalize;
    @media (max-width: 640px) {
        font-size: 25px;
        margin-top: 0;
    }
    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    margin: 12px 0 40px;
    width: 94%;
    @media (max-width: 480px) {
        width: 100%;
        font-size: 15px;
        margin: 5px 0 25px;
    }
`;
const InputContainer = styled.div`
    position: relative;
    border: 2px solid #5cc66a;
    border-radius: 7px;
    padding: 15px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 17px;
    margin-bottom: 30px;
    width: -webkit-fill-available;
    width: -moz-available;
    @media (max-width: 480px) {
        padding: 8px 13px;
        border-color: #5f6367;
        font-size: 15px;
    }
    &:focus-within {
        border-color: #56c082;
    }
    &:hover {
        border: 2px solid #56c082 !important;
    }
    @media (max-width: 480px) {
        margin-bottom: 20px;
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
    font-size: 17px;
    padding-left: 15px;
    caret-color: #56c082;
    @media (max-width: 480px) {
        width: 106.666666667%;
        padding-left: 10.66667px;
        font-size: 16px;
        transform: scale(0.9375);
        transform-origin: left top;
    }
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
    cursor: pointer;
    background: #56c082;
    display: block;
    border-radius: 6px;
    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    color: #fff;
    @media (max-width: 480px) {
        height: 44px;
        font-size: 15px;
        margin-bottom: 20px;
    }
`;
const ScrollBar = styled.div`
    /* max-height: 65vh;
    overflow-y: scroll; */
    margin-right: -7px;
    padding-right: 7px;
`;
const GenderContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;
    @media all and (max-width: 480px) {
        grid-gap: 7px;
    }
    @media all and (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
`;
const Gender = styled.span`
    display: flex;
    height: 50px;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    border: 2px solid #c3c3c3;
    border-radius: 8px;
    padding: 0 10px;
    color: #6b6a6a;
    font-size: 14px;
    font-family: baloo_paaji_2semibold;
    transition: 0.2s;
    position: relative;
    &:hover {
        border: 2px solid #56c082;
        color: #56c082;
        background-color: #e7f9f2;
    }
    &.active {
        border: 2px solid #56c082;
        color: #56c082;
        background-color: #e7f9f2;
    }
    @media (max-width: 480px) {
        height: 43px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;

const GenderIcon = styled.img`
    width: 18px;
`;
const Tick = styled.img`
    width: 15px;
    position: absolute;
    right: -7px;
    top: -7px;
`;
const UserCategoryContainer = styled.div`
    border: 2px dashed #56c082;
    border-radius: 8px;
    padding: 20px 15px;
    @media (max-width: 480px) {
        padding: 13px 15px;
    }
`;
const TitleLabel = styled.p`
    font-size: 16px;
    font-family: baloo_paaji_2semibold;
    margin-bottom: 20px;
    @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 11px;
    }
`;

const UserCategory = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    @media all and (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
`;
const Category = styled.div`
    padding: 10px;
    border: 2px solid #d9dada;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
    &:hover {
        color: #56c082;
        border: 2px solid #56c082;
        background-color: #e7f9f2;
    }
    &.active {
        color: #56c082;
        border: 2px solid #56c082;
        background-color: #e7f9f2;
    }
`;
const CategoryTitle = styled.h3`
    font-size: 14px;
    text-align: center;
    font-family: baloo_paaji_2semibold;
    color: inherit;
    @media all and (max-width: 360px) {
        font-size: 11px;
    }
`;
const CategoryDescription = styled.p`
    text-align: center;
    font-size: 12px;
    color: inherit;
    font-family: baloo_paaji_2medium;
    @media all and (max-width: 360px) {
        font-size: 10px;
    }
`;
//old styles
