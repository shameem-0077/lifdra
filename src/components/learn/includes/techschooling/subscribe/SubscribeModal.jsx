import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import { accountsConfig, learnConfig } from "../../../../../axiosConfig";
import PlanCard from "./PlanCard";
import successAnimate from "../../../../../assets/lotties/7698-success.json";
import errorAnimate from "../../../../../assets/lotties/14331-error.json";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
// import { getUserDateFromUTC } from "../../../../helpers/functions";
import Loader from "../general/loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import dataAnimate from "../../../../../assets/lotties/basic-loader.json";
import requestLoader from "../../../../../assets/lotties/voucher-loader.json";
// import PaymentLinkModal from "../../general/PaymentLinkModal";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition,
} from "react-toasts";
import ResponseModal from "../../profile/modals/ResponseModal";

export default function SubscribeModal({
    closeModal,
    isModal,
    setModal,
    selectedCountry,
    selectedState,
    pincode,
    address,
}) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const user_profile = useSelector((state) => state.user_profile);
    const user_data = useSelector((state) => state.user_data);

    const [copySuccess, setCopySuccess] = useState(false);

    const successLoader = {
        loop: false,
        autoplay: true,
        animationData: successAnimate,
        rendererSettings: {},
    };
    const errorLoader = {
        loop: false,
        autoplay: true,
        animationData: errorAnimate,
        rendererSettings: {},
    };
    const dataLoader = {
        loop: true,
        autoplay: true,
        animationData: dataAnimate,
        rendererSettings: {},
    };
    const submitLoader = {
        loop: true,
        autoplay: true,
        animationData: requestLoader,
        rendererSettings: {},
    };

    const [selected, setSelected] = useState("");
    const [plan, setPlan] = useState("");
    const [event, setEvent] = useState("");
    const [status, setStatus] = useState("");
    const [coinStatus, setCoinStatus] = useState({});
    const [planDetails, setPlanDetails] = useState({});
    const [subscription, setSubscription] = useState({});
    const [plans, setPlans] = useState([]);
    const [isEarnedCoin] = useState(true);
    const [subscriptionLoading, setSubscriptionLoading] = useState(false);
    const [planDetailsLoading, setPlanDetailsLoading] = useState(true);
    const [coinsLoading, setCoinsLoading] = useState(false);
    // const [need_coins, setNeedscoins] = useState(20);
    // const [premium_coins, setPremium_coins] = useState(30);
    // const [isLoading, setIsLoading] = useState(true);
    const [isResponseModal, setResponseModal] = useState(false);
    const [responseType, setResponseType] = useState("");
    const [successTitle, setSuccessTitle] = useState("");
    const [errorTitle, setErrorTitle] = useState("");

    useEffect(() => {
        const fetchPlans = () => {
            let { access_token } = user_data;
            setSubscriptionLoading(true);
            if (access_token) {
                learnConfig
                    .get("subscriptions/vacation-plan/", {
                        headers: { Authorization: `Bearer ${access_token}` },
                    })
                    .then((response) => {
                        setSubscriptionLoading(false);
                        const { StatusCode, data } = response.data;
                        if (StatusCode === 6000) {
                            setPlans(data);
                        }
                    })
                    .catch((error) => console.log(error));
            }
        };

        const verifyPlan = (plan) => {
            let { access_token } = user_data;
            if (access_token) {
                learnConfig
                    .get(`/subscriptions/verify/coins/${plan}/`, {
                        headers: { Authorization: `Bearer ${access_token}` },
                    })
                    .then((response) => {
                        setCoinsLoading(false);
                        const { StatusCode, data } = response.data;
                        setCoinStatus(data);
                        if (StatusCode === 6000) {
                            setCoinStatus(data);
                        } else if (StatusCode === 6001) {
                        }
                    })
                    .catch((error) => console.log(error));
            }
        };

        let { search } = location;
        const values = queryString.parse(search);
        const action = values.action;
        const plan = values.plan;

        const event = values.event;
        const status = values.status;
        setPlan(plan);
        setEvent(event);
        setStatus(status);
        if (action === "subscribe") {
            if (plan) {
                setPlan(plan);
                verifyPlan(plan);
                fetchPlan(plan);
            }
            if (!plan && !status) {
                fetchPlans();
            }
            if (event) {
                setEvent(event);
            }
            if (status) {
                setStatus(status);
                if (status === "success") {
                    getSubscription();
                    setResponseModal(true);
                    // if (isResponseModal) {
                    //     return type === "payment"
                    //         ? history.push("/profile/admission/")
                    //         : history.push("/dashboard/");
                    // }
                }
            }
        }
    }, [location]);

    const renderPlans = () =>
        plans.map((plan) => (
            <PlanCard
                onSelect={setSelected}
                selected={selected}
                key={plan.id}
                data={plan}
                subscriptionLoading={subscriptionLoading}
            />
        ));

    const getSubscription = () => {
        let { access_token } = user_data;
        learnConfig
            .get(`/subscriptions/info/minimal/`, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;

                if (StatusCode === 6000) {
                    setSubscription(data);
                    dispatch({
                        type: "UPDATE_USER_DATA",
                        user_data: {
                            ...user_data,
                            has_active_subscription: true,
                        },
                    });
                    fetchProfile();
                } else if (StatusCode === 6001) {
                }
            })
            .catch((error) => {});
    };

    const fetchPlan = (plan) => {
        let { access_token } = user_data;
        setPlanDetailsLoading(true);

        if (access_token) {
            learnConfig
                .get(`/subscriptions/plan/${plan}/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    setPlanDetailsLoading(false);

                    const { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setPlanDetails(data);
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    const onSubscribe = (e) => {
        e.preventDefault();
        setCoinsLoading(true);
        let { access_token } = user_data;
        learnConfig
            .post(
                `/subscriptions/start/${plan}/`,
                {
                    country: selectedCountry,
                    state: selectedState,
                    pincode: pincode,
                    address: address,
                },
                { headers: { Authorization: `Bearer ${access_token}` } }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setCoinsLoading(false);
                    setResponseType("success");
                    setSuccessTitle("Payment successfull");
                    history.push({
                        pathname: `/feed/`,
                        search: `status=success${
                            data.event ? `&event=${event}` : ``
                        }`,
                    });
                } else if (StatusCode === 6001) {
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

    const fetchProfile = () => {
        let { access_token } = user_data;
        accountsConfig
            .get("/api/v1/users/profile/", {
                params: {
                    response_type: "minimal",
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    dispatch({
                        type: "UPDATE_USER_PROFILE",
                        user_profile: data,
                    });
                } else {
                }
            })
            .catch((error) => {});
    };

    //pay link handlers
    const handlePaymentLink = () => {
        dispatch({
            type: "TOGGLE_PAYMENT_LINK_MODAL",
        });
        dispatch({
            type: "UPDATE_PAYMENT_LINK_MODAL",
            payment_plan: planDetails,
        });
    };
    return (
        <>
            <ResponseModal
                isResponseModal={isResponseModal}
                setResponseModal={setResponseModal}
                responseType={responseType}
                setResponseType={setResponseType}
                type={"payment"}
                successTitle={successTitle}
                setSuccessTitle={setSuccessTitle}
            />
            <Container className="container" status={status}>
                <ContentBox status={status}>
                    <CloseIcon
                        title="Close"
                        className="las la-times-circle"
                        onClick={closeModal}
                    ></CloseIcon>
                    {subscriptionLoading ? (
                        <LottieCover>
                            <Lottie
                                options={dataLoader}
                                height={100}
                                width={100}
                            />
                        </LottieCover>
                    ) : (
                        <ItemContainer>
                            {status === "success" ? (
                                <></>
                            ) : status === "failed" ? (
                                <Content>
                                    <Lottie
                                        options={errorLoader}
                                        height={100}
                                        width={100}
                                    />
                                    <Title>
                                        Tech Schooling subscription has failed
                                    </Title>
                                    <Description>
                                        Your subscription transaction was
                                        interrupted
                                    </Description>
                                    <BottomButtonLink
                                        style={{ backgroundColor: "#2d8cc8" }}
                                        to={`${location.pathname}?action=subscribe`}
                                        className="b-medium white"
                                    >
                                        Try again
                                    </BottomButtonLink>
                                    {event && (
                                        <Subscript>
                                            Transaction ID{" "}
                                            <SubscriptBold>
                                                #{event}
                                            </SubscriptBold>
                                        </Subscript>
                                    )}
                                </Content>
                            ) : status === "confirm" ? (
                                <Content>
                                    <Image
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscribe-image.svg"
                                        alt=""
                                    />
                                    {!planDetailsLoading ? (
                                        <>
                                            {" "}
                                            <Title>Pay & Subscribe</Title>
                                            <Description>
                                                You have selected{" "}
                                                {`${
                                                    planDetails.days === 90
                                                        ? "3 months"
                                                        : planDetails.days ===
                                                          30
                                                        ? "1 month"
                                                        : planDetails.days ===
                                                          180
                                                        ? "6 months"
                                                        : planDetails.days ===
                                                          365
                                                        ? "1 year"
                                                        : null
                                                }`}{" "}
                                                plan
                                            </Description>
                                            <PlanCard
                                                selected={planDetails.id}
                                                data={planDetails}
                                            />
                                        </>
                                    ) : (
                                        <LottieCover>
                                            <Lottie
                                                options={dataLoader}
                                                height={100}
                                                width={100}
                                            />
                                        </LottieCover>
                                    )}
                                    {Object.keys(coinStatus).length > 0 && (
                                        <BulletBox>
                                            <Bullet>
                                                <Icon
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/arr.svg"
                                                    alt=""
                                                />
                                                <BulletText>
                                                    {coinStatus.usable_purchased_coins ===
                                                    0
                                                        ? "No premium coins"
                                                        : coinStatus.usable_purchased_coins ===
                                                          1
                                                        ? "1 premium coin"
                                                        : `${coinStatus.usable_purchased_coins} premium coins`}{" "}
                                                    in your account
                                                </BulletText>
                                            </Bullet>
                                            {coinStatus.total_needed_coins -
                                                coinStatus.total_usable_coins >
                                                0 && (
                                                <Bullet>
                                                    <Icon
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/arr.svg"
                                                        alt=""
                                                    />
                                                    <BulletText>
                                                        You need{" "}
                                                        {coinStatus.total_needed_coins -
                                                            coinStatus.total_usable_coins ===
                                                        1
                                                            ? "1 more coin"
                                                            : `${
                                                                  coinStatus.total_needed_coins -
                                                                  coinStatus.total_usable_coins
                                                              } more coins`}{" "}
                                                        to subscribe
                                                    </BulletText>
                                                </Bullet>
                                            )}
                                        </BulletBox>
                                    )}
                                    {!coinsLoading ? (
                                        <BottomButtonLink
                                            onClick={onSubscribe}
                                            status={status}
                                            className="b-medium white"
                                        >
                                            {user_profile.subscription_data &&
                                            isEarnedCoin
                                                ? coinStatus.total_usable_coins
                                                    ? coinStatus.total_usable_coins >=
                                                      coinStatus.total_needed_coins
                                                        ? `Pay & Subscribe ( ${coinStatus.total_needed_coins} coins )`
                                                        : `Pay & Subscribe ( ₹ ${
                                                              (coinStatus.total_needed_coins -
                                                                  coinStatus.total_usable_coins) *
                                                              50
                                                          } + ${
                                                              coinStatus.total_usable_coins
                                                          } coins)`
                                                    : `Pay & Subscribe ( ₹ ${
                                                          coinStatus.total_needed_coins *
                                                          50
                                                      } )`
                                                : `Pay & Subscribe ( ₹ ${
                                                      coinStatus.total_needed_coins *
                                                      50
                                                  } )`}
                                        </BottomButtonLink>
                                    ) : (
                                        <BottomButtonLink>
                                            <Lottie
                                                options={submitLoader}
                                                height={35}
                                                width={35}
                                            />
                                        </BottomButtonLink>
                                    )}

                                    {/* <GenerateButton
                                        onClick={() => {
                                            handlePaymentLink();
                                        }}
                                    >
                                        <ButtonText>
                                            Generate payment link with chosen
                                            package
                                        </ButtonText>
                                    </GenerateButton> */}
                                </Content>
                            ) : (
                                <Content>
                                    <Title>Choose your plan</Title>
                                    <Description>
                                        Choose a subscription plan that suits
                                        you the best for Tech Schooling
                                    </Description>
                                    <PlanBox>
                                        {subscriptionLoading ? (
                                            <LoaderContainer>
                                                <Loader />
                                            </LoaderContainer>
                                        ) : (
                                            renderPlans()
                                        )}
                                    </PlanBox>
                                    <BottomButtonLink
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (selected) {
                                                history.push({
                                                    pathname: location.pathname,
                                                    search: `action=subscribe&status=confirm&plan=${selected}`,
                                                });
                                            }
                                        }}
                                        to={`${location.pathname}?action=subscribe&status=confirm&plan=${selected}`}
                                        className="b-medium white"
                                    >
                                        Subscribe
                                    </BottomButtonLink>
                                </Content>
                            )}
                        </ItemContainer>
                    )}
                </ContentBox>

                <ToastsContainer
                    store={ToastsStore}
                    position={ToastsContainerPosition.BOTTOM_CENTER}
                    lightBackground
                />
            </Container>
        </>
    );
}

const LoaderContainer = styled.div`
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: ${(props) =>
        props.status === "success" || props.status === "failed" ? 0 : 1};
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
        z-index: 1000;
        font-size: 28px;
        left: 13px;
        top: 13px;
    }
`;
const ContentBox = styled.div`
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
        width: 432px;
    }
    @media (max-width: 480px) {
        width: 100%;
    }
`;
const ItemContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 640px) {
        padding: 0 29px;
    }
    @media (max-width: 400px) {
        padding: 0 16px;
    }
`;
const Content = styled.div`
    display: flex;
    padding: 0 0 20px 0;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: stretch;
`;
const Title = styled.h4`
    font-size: 25px;
    margin-top: 15px;
    line-height: 1.4em;
    /* margin-top: 50px; */
    font-family: "gordita_medium";
    @media (max-width: 640px) {
        font-size: 23px;
        /* margin-top: 38px; */
    }
    @media (max-width: 480px) {
        /* margin-top: 25px; */
        font-size: 20px;
    }
`;
const Description = styled.p`
    margin: 10px auto 14px;
    width: 94%;
    font-size: 16px;
    font-family: "gordita_medium";
    color: #333;
    @media (max-width: 640px) {
        margin: 7px auto 11px;
    }
    @media (max-width: 480px) {
        width: 100%;
        font-size: 14px;
    }
`;
const PlanBox = styled.div`
    margin: 20px 0 35px;
`;
const BottomButtonLink = styled(Link)`
    background: #5cc66a;
    display: block;
    border-radius: 6px;
    min-height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    /* margin-top: ${(props) => props.status === "confirm" && "25px"}; */
    @media (max-width: 480px) {
        min-height: 40px;
        font-size: 15px;
    }
`;
// const GenerateButton = styled.div`
// 	cursor: pointer;
// 	color: #5cc66a;
// 	border-radius: 7px;
// 	padding: 15px 0;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	border: 1px solid #5cc66a;
// 	margin-top: 20px;
// 	@media (max-width: 480px) {
// 		padding: 9px 0;
// 	}
// 	@media (max-width: 360px) {
// 		padding: 7px 0;
// 	}
// `;
// const ButtonText = styled.h3`
// 	font-size: 15px;
// 	font-family: "gordita_medium";
// 	@media (max-width: 480px) {
// 		font-size: 13px;
// 	}
// `;
const Image = styled.img`
    width: 50%;
    display: block;
    margin: 0 auto 10px;
`;
const BulletBox = styled.div`
    margin: 15px 0 20px;
`;
const Bullet = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    &:last-child {
        margin-bottom: unset;
    }
    @media (max-width: 480px) {
        margin-bottom: 9px;
    }
`;
const Icon = styled.img`
    margin-right: 15px;
    width: 20px;
    @media (max-width: 480px) {
        width: 17px;
    }
`;
const BulletText = styled.p`
    font-size: 14px;
    font-family: "gordita_medium";
    color: #555;
    text-align: left;
    line-height: 22px;
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;
const Subscript = styled.p`
    margin: 18px 0 40px;
    width: 94%;
    font-size: 16px;
    color: #333;
    @media (max-width: 480px) {
        width: 100%;
        font-size: 14px;
    }
`;
const SubscriptBold = styled.span`
    margin: 18px 0 40px;
    width: 94%;
    font-size: 16px;
    color: #333;
    font-family: "gordita_medium";
    @media (max-width: 480px) {
        width: 100%;
        font-size: 13 px;
    }
`;
const LottieCover = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
