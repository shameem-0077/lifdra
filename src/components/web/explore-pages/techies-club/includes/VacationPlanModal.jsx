import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import loader from "../../../../../assets/lotties/modal/buttonloader.json";
import Lottie from "react-lottie";
import $ from "jquery";
import { connect } from "react-redux";
import queryString from "query-string";
import { serverConfig } from "../../../../../axiosConfig";
import SignupLoader from "../../../../learn/includes/techschooling/general/loaders/SignupLoader";

function mapStateToProps(state) {
    return {
        user_data: state.user_data,
    };
}

function mapDispatchtoProps(dispatch) {
    return {
        updateUserData: (user_data) =>
            dispatch({
                type: "UPDATE_USER_DATA",
                user_data: user_data,
            }),
    };
}

function VacationPlanModal(props) {
    const history = useHistory();
    const [coinsLoading, setCoinsLoading] = useState(false);
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [planDetails, setPlanDetails] = useState([]);
    const [responseType, setResponseType] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [isError, setError] = useState(false);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
    });
    const location = useLocation();
    let { search } = location;
    const values = queryString.parse(search);
    const event = values.event;
    const dispatch = useDispatch();
    const [isToast, setToast] = useState(false);

    const lottieDefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };

    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 3000);
    }, [isToast]);

    useEffect(() => {
        if (props.action === "vacation-plans") {
            document.body.style.position = "fixed";
            document.body.style.top = `-${window.scrollY}px`;

            // When the modal is hidden, we want to remain at the top of the scroll position
            document.body.style.position = "";
            document.body.style.top = "";
        }
    }, []);

    useEffect(() => {
        if (props.action === "vacation-plans") {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [props.action]);

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
    }, []);

    const fetchData = () => {
        setButtonLoading(true);
        learnConfig
            .get(
                "subscriptions/vacation-plan/e844a42e-1cef-48f8-9526-a2e29780fc00/",
                {
                    headers: {
                        Authorization: `Bearer ${props.user_data.access_token}`,
                    },
                }
            )
            .then((response) => {
                const { data } = response.data;
                setLoading(false);
                setPlanDetails(data);
                setButtonLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [props.user_data.access_token]);

    const onSubscribe = (plan) => {
        setCoinsLoading(true);
        learnConfig
            .post(
                `/subscriptions/start/${plan}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${props.user_data.access_token}`,
                    },
                }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setCoinsLoading(false);
                    setError(false);
                    history.push({
                        pathname: `/feed/`,
                        search: `status=success${
                            data.event ? `&event=${event}` : ``
                        }`,
                    });
                } else if (StatusCode === 6001) {
                    setToast(true);
                    setError(true);
                    setErrorTitle(data.message);
                    if (data.data.is_insufficient_coins) {
                        window.location.href = data.data.payment_link;
                    } else {
                        setErrorTitle(data.message);
                        setResponseType("failed");
                        setCoinsLoading(false);
                    }
                }
            })
            .catch((error) => {
                setCoinsLoading(false);
                setResponseType("failed");
            });
    };

    return (
        <>
            <Overlay action={props.action} onClick={props.closeModal} />
            <ModalContainer
                action={props.action}
                style={{ height: dimensions.height }}
            >
                <Container>
                    {isToast && (
                        <Toast isError={isError} active={isToast}>
                            <ToastText isError={isError}>
                                {errorTitle}
                            </ToastText>
                        </Toast>
                    )}
                    <TopSection>
                        <TopContainer>
                            <CloseButton onClick={props.closeModal}>
                                <CloseIcon
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/close.svg"
                                    }
                                />
                            </CloseButton>
                            <Heading>Order Summary</Heading>
                        </TopContainer>

                        <Bg>
                            <BgImage
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/modal.png"
                                }
                                alt="Image"
                            />
                        </Bg>
                        {isButtonLoading ? (
                            <SignupLoader />
                        ) : (
                            <PlanContainer className="anim-fade">
                                <DetailsListSection>
                                    <Item>
                                        <Tick>
                                            <img
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/tick.svg"
                                                }
                                            />
                                        </Tick>

                                        <span>
                                            Rs{" "}
                                            {planDetails.actual_coins &&
                                                planDetails?.coin_value &&
                                                planDetails.days &&
                                                (planDetails?.actual_coins *
                                                    planDetails?.coin_value) /
                                                    planDetails?.days}
                                            /day
                                        </span>
                                    </Item>
                                    <Item>
                                        <Tick>
                                            <img
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/tick.svg"
                                                }
                                            />
                                        </Tick>
                                        <span>
                                            {planDetails.days &&
                                                planDetails?.days}{" "}
                                            Days
                                        </span>
                                    </Item>
                                    <Item>
                                        <Tick>
                                            <img
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/tick.svg"
                                                }
                                            />
                                        </Tick>

                                        <span> Learn in Malayalam</span>
                                    </Item>
                                    <LeftSpan></LeftSpan>
                                    <RightSpan></RightSpan>
                                </DetailsListSection>
                                <BottomSection>
                                    <Left>
                                        <Head>Total Payable</Head>
                                        <Amount>
                                            ₹
                                            {planDetails?.actual_coins &&
                                                planDetails?.coin_value &&
                                                planDetails?.actual_coins *
                                                    planDetails?.coin_value}
                                        </Amount>
                                    </Left>
                                    <Right>
                                        <img
                                            src={
                                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/list.svg"
                                            }
                                        />
                                    </Right>
                                </BottomSection>
                            </PlanContainer>
                        )}
                    </TopSection>
                    {isError ? (
                        <Button
                            onClick={() => {
                                history.push({
                                    pathname: `/feed/`,
                                    search: "?action=vacation-plans",
                                });
                            }}
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                onSubscribe(planDetails.id);
                            }}
                        >
                            {coinsLoading ? (
                                <Lottie
                                    options={lottieDefaultOptions}
                                    height={45}
                                    width={45}
                                />
                            ) : (
                                <span>
                                    Subscribe Now {""}(₹
                                    {planDetails.actual_coins &&
                                        planDetails.coin_value &&
                                        planDetails?.actual_coins *
                                            planDetails?.coin_value}
                                    )
                                </span>
                            )}
                        </Button>
                    )}
                </Container>
            </ModalContainer>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchtoProps)(VacationPlanModal);

const Toast = styled.div`
    transform: translateX(50%);
    padding: 9px 16px;
    justify-content: center;
    display: inline-flex;
    align-self: center;
    align-items: center;
    background: ${(props) => (props.isError ? "#fbebea" : "#fef7df")};
    border: 1px solid ${(props) => (props.isError ? "#f9d7d4" : "#fef1c8")};
    text-align: center;
    border-radius: 5px;
    position: absolute;
    z-index: 501;
    right: 50%;
    bottom: ${(props) => (props.active ? "96px" : "-76px")};
    transition: all 0.2s ease;
    font-size: 17px;
    border-radius: 2px;
    white-space: nowrap;
`;
const ToastText = styled.span`
    color: ${(props) => (props.isError ? "#f44336" : "#d5b045")};
    font-size: 16px;
    font-family: "gordita_medium";
    @media (max-width: 1024px) {
        font-size: 15px;
    }
    @media (max-width: 980px) {
        font-size: 14px;
    }
    @media (max-width: 640px) {
        font-size: 13px;
    }
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
const Overlay = styled.div`
    display: ${(props) =>
        props.action === "vacation-plans" ? "block" : "none"};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    filter: blur(0.1);
`;
const ModalContainer = styled.div`
    overflow: hidden;
    position: relative;
    z-index: 9999;
    background: #fff;
    width: 30%;
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 430px;
    justify-content: space-between;
    border-radius: 5px;
    right: ${(props) => (props.action === "vacation-plans" ? "0" : "-100%")};
    transition: all 0.2s ease;
    @media (max-width: 1440px) {
        width: 35%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 1080px) {
        width: 42%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 1024px) {
        width: 47%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 780px) {
        width: 51%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 740px) {
        width: 55%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 640px) {
        padding-bottom: 50px;
        width: 63%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 550px) {
        width: 70%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 480px) {
        min-width: 300px;
        width: 94%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 360px) {
        width: 95%;
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
    @media (max-width: 325px) {
        right: ${(props) =>
            props.action === "vacation-plans" ? "0" : "-100%"};
    }
`;
const Container = styled.div`
    padding: 40px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 980px) {
        padding: 40px 30px;
    }
    @media (max-width: 480px) {
        padding: 20px;
    }
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
    @media all and (max-width: 980px) {
        margin-bottom: 20px;
    }
`;
const CloseButton = styled.span`
    width: 20px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    @media all and (max-width: 360px) {
        width: 16px;
    }
`;
const CloseIcon = styled.img`
    display: block;
    width: 100%;
`;
const Heading = styled.h3`
    text-align: center;
    font-family: "gordita_medium";
    font-size: 22px;

    @media (max-width: 360px) {
        font-size: 20px;
    }
`;

const BgImage = styled.img`
    width: 100%;
    display: block;
`;
const Bg = styled.div`
    margin-bottom: 30px;
`;
const PlanContainer = styled.div`
    background: #f3fce6;
    background-size: cover;
    width: 100%;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 20px;
    /* border: 1px solid #e4e4e4; */
    overflow: hidden;
    @media (max-width: 980px) {
        padding: 35px 30px;
    }
`;
const TopSection = styled.div`
    overflow-y: scroll;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none !important;
    }

    /* Hide scrollbar for IE, Edge and Firefox */

    -ms-overflow-style: none !important; /* IE and Edge */
    scrollbar-width: none !important; /* Firefox */
`;
const DetailsListSection = styled.div`
    border-bottom: 1px dashed #e4e4e4;
    padding-bottom: 35px;
    position: relative;
    @media all and (max-width: 980px) {
        padding-bottom: 25px;
    }
`;
const LeftSpan = styled.span`
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    bottom: -30px;
    left: -60px;
    border: 1px solid #e4e4e4;
`;
const RightSpan = styled.span`
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    bottom: -30px;
    right: -60px;
    border: 1px solid #e4e4e4;
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    :first-child {
        margin-top: 0;
    }
    span {
        font-size: 16px;
        display: inline-block;
        font-family: "gordita_medium";
        @media all and (max-width: 360px) {
            font-size: 14px;
        }
    }
`;
const Tick = styled.div`
    width: 18px;
    margin-right: 12px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 360px) {
        width: 16px;
        margin-right: 10px;
    }
`;
const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 35px;
    @media all and (max-width: 980px) {
        margin-top: 25px;
    }
`;
const Left = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    flex-direction: column;
`;
const Right = styled.div`
    width: 46px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        width: 40px;
    }
`;
const Head = styled.p`
    font-family: "gordita_medium";
    font-size: 14px;
    margin-bottom: 2px;
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Amount = styled.p`
    font-size: 30px;
    font-family: "gordita_medium" !important;
    color: #000;
    @media all and (max-width: 980px) {
        font-size: 28px;
    }
    @media all and (max-width: 360px) {
        font-size: 26px;
    }
`;
const Button = styled.div`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin: 0 auto;
    display: flex;
    color: #fff
    align-items: center;
    background: #4ca473;
    justify-content: center;
    font-family: "gordita_medium";
    font-size: 16px;
    cursor:pointer;  
    
`;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
