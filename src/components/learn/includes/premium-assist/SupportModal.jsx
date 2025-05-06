import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import Jdenticon from "react-jdenticon";
import tickAnimationData from "../../../../assets/lotties/modal/tick.json";
import CancelledAnimationData from "../../../../assets/lotties/modal/cancelled.json";
import { SupportEngineerContext } from "../../../contexts/stores/SupportEngineerStore";
import { useSelector } from "react-redux";
import { serverConfig, serverConfig } from "../../../../axiosConfig";
import animationData from "../../../../assets/lotties/auth/loader.json";
import redLoader from "../../../../assets/lotties/red_spinner.json";
import { zeroPad } from "../../../helpers/functions";

export default function SupportModal() {
    const modal = useRef(null);
    const history = useHistory();
    const user_data = useSelector((state) => state.user_data);

    const { supportEngineerState, supportEngineerDispatch } = useContext(
        SupportEngineerContext
    );
    const { is_modal, modal_type, selected_package } = supportEngineerState;

    //Modal loader conditions
    const [firstButtonLoading, setFirstButtonLoading] = useState(false);

    // Coin purchase states
    const [coinsCount, setCoinsCount] = useState();

    // loading and Error s states
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState(
        "An error occurred, please try again later"
    );

    // Rating states
    const [rating, setRating] = useState(null);
    const [reviewDescription, setReviewDescription] = useState("");

    // Start chat function
    const onStartChat = () => {
        const { access_token } = user_data;
        setLoading(true);
        serverConfig
            .post(
                `/premium-assists/start/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data, message } = response.data;
                if (status_code === 6000) {
                    setLoading(false);
                    supportEngineerDispatch({
                        type: "UPDATE_MODAL",
                        is_modal: false,
                        modal_type: "",
                    });
                    checkActive();
                    history.push(
                        `/premium-assist/view/${data.premium_assist}/`
                    );
                } else {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(message);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(true);
                setErrorMessage("An error occurred, please try again later");
            });
    };

    // Check active premium assist
    const checkActive = () => {
        const { access_token } = user_data;
        serverConfig
            .get("premium-assists/check-active/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;

                if (status_code === 6000) {
                    supportEngineerDispatch({
                        type: "UPDATE_ACTIVE_PREMIUM_ASSIST",
                        active_premium_assist: data,
                    });
                }
            })
            .catch((error) => {});
    };

    // Coin purchase function
    const onCoinPurchase = () => {
        const { access_token } = user_data;
        if (coinsCount) {
            if (coinsCount <= 4000) {
                setLoading(true);
                serverConfig
                    .post(
                        `/purchases/create-order/`,
                        {
                            coins: coinsCount,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    )
                    .then((response) => {
                        const { status_code, data, message } = response.data;
                        if (status_code === 6000) {
                            window.location.href = data.paymentLink;
                            setLoading(false);
                        } else {
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
                setError(true);
                setErrorMessage("Coin purchase above 4000 is restricted");
            }
        } else {
            setError(true);
            setErrorMessage("This field should not be empty");
        }
    };

    const onCreditPurchase = () => {
        const { access_token } = user_data;
        if (selected_package.coins) {
            if (selected_package.coins <= 4000) {
                setLoading(true);
                serverConfig
                    .post(
                        `/purchases/pa-credit/create-order/${selected_package.id}/`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    )
                    .then((response) => {
                        const { status_code, data, message } = response.data;
                        if (status_code === 6000) {
                            window.location.href = data.paymentLink;
                            setLoading(false);
                        } else {
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
                setError(true);
                setErrorMessage("Coin purchase above 4000 is restricted");
            }
        } else {
            setError(true);
            setErrorMessage("This field should not be empty");
        }
    };

    // End chat api
    const onEndChat = (status) => {
        const { access_token } = user_data;
        setLoading(true);
        serverConfig
            .post(
                `/premium-assists/student/end-session/`,
                { session_status: status },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, message } = response.data;
                if (status_code === 6000) {
                    status === "resolved"
                        ? supportEngineerDispatch({
                              type: "UPDATE_MODAL",
                              is_modal: true,
                              modal_type: "rating",
                          })
                        : supportEngineerDispatch({
                              type: "UPDATE_MODAL",
                              is_modal: true,
                              modal_type: "negative_rating",
                          });
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(message);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(true);
                setErrorMessage("An error occurred, please try again later");
            });
    };

    const onRatePA = () => {
        const { access_token } = user_data;
        serverConfig
            .post(
                `/premium-assists/student/review-activity/${supportEngineerState.active_premium_assist.premium_assist}/`,
                {
                    rating: modal_type === "negative_rating" ? 1 : rating,
                    review: reviewDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;
                const { total_request_count } = data;

                if (status_code === 6000) {
                    modal_type !== "negative_rating" &&
                        supportEngineerDispatch({
                            type: "UPDATE_MODAL",
                            is_modal: true,
                            modal_type: "thank",
                        });
                    modal_type !== "negative_rating" &&
                        total_request_count > 1 &&
                        supportEngineerDispatch({
                            type: "UPDATE_MODAL",
                            is_modal: true,
                            modal_type: "limit_exceeded",
                        });
                    supportEngineerDispatch({
                        type: "UPDATE_MODAL",
                        is_modal: true,
                        modal_type: "thank",
                    });
                    setRating(null);
                    supportEngineerDispatch({
                        type: "UPDATE_ACTIVE_PREMIUM_ASSIST",
                        active_premium_assist: {},
                    });
                    supportEngineerDispatch({
                        type: "UPDATE_ACTIVE_PA_CHAT_SESSION",
                        active_pa_chat_session: "",
                    });
                    supportEngineerDispatch({
                        type: "UPDATE_ACTIVE_PA_CHAT_SESSION_ID",
                        active_pa_chat_session_id: "",
                    });
                } else if (status_code === 6001) {
                }
            })
            .catch((error) => {});
    };

    const onReassign = (session_status) => {
        const { access_token } = user_data;
        serverConfig
            .post(
                `/premium-assists/reassign/`,
                { session_status },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    supportEngineerDispatch({
                        type: "UPDATE_MODAL",
                        is_modal: true,
                        modal_type: "thank",
                    });
                    if (data.is_reassigned) {
                        supportEngineerDispatch({
                            type: "REASSIGN_PREMIUM_ASSIST",
                        });
                    } else {
                        supportEngineerDispatch({
                            type: "UPDATE_ACTIVE_PREMIUM_ASSIST",
                            active_premium_assist: {},
                        });
                        supportEngineerDispatch({
                            type: "UPDATE_ACTIVE_PA_CHAT_SESSION",
                            active_pa_chat_session: "",
                        });
                        supportEngineerDispatch({
                            type: "UPDATE_ACTIVE_PA_CHAT_SESSION_ID",
                            active_pa_chat_session_id: "",
                        });
                    }
                } else if (status_code === 6001) {
                }
            })
            .catch((error) => {});
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData:
            modal_type === "success" || modal_type === "thank"
                ? tickAnimationData
                : CancelledAnimationData,
        rendererSettings: {},
    };

    const condition =
        modal_type === "success"
            ? {
                  status: "Success",
                  description:
                      "Your payment was successful. Click the link to view your ",
                  action: {
                      number: 1,
                      type1: "Continue",
                  },
              }
            : modal_type === "cancelled"
            ? {
                  status: "Cancelled",
                  description:
                      "Your payment is cancelled, click below button to retry",
                  action: {
                      number: 2,
                      type1: "Retry",
                      type2: "Close",
                  },
              }
            : modal_type === "start_chat"
            ? {
                  status: "Start Chat",
                  description:
                      "You will be directed to interact with the subsequent support engineer",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/start+_+chat.svg",
                  action: {
                      number: 2,
                      type1: "Start Now",
                      type2: "Cancel",
                  },
              }
            : modal_type === "reassign"
            ? {
                  status: "Support Engineer",
                  description: "Do you want to assign another support engineer",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/support_engineer.svg",
                  action: {
                      number: 2,
                      type1: "Yes",
                      type2: "No",
                  },
              }
            : modal_type === "out_of_topic"
            ? {
                  status: "Out Of Topic",
                  description:
                      "The question you have asked is out of the topic.",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/out_of_topic.svg",
                  action: {
                      number: 1,
                      type1: "Close",
                  },
              }
            : modal_type === "se_end_chat"
            ? {
                  status: "Chat ended",
                  description:
                      "SE has ended your session. Hope you got your problem solved?",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/end+_chat.svg",
                  action: {
                      number: 2,
                      type1: "Yes",
                      type2: "No",
                  },
              }
            : modal_type === "end_chat"
            ? {
                  status: "End Chat",
                  description: "Hope you are satisfied with the chat",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/end+_chat.svg",
                  action: {
                      number: 2,
                      type1: "Satisfied",
                      type2: "Not Satisfied",
                  },
              }
            : modal_type === "limit_exceeded"
            ? {
                  status: "Limit Exceeded",
                  description:
                      "You can use a support credit and start another chat",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/super_coin.svg",
                  action: {
                      number: 1,
                      type1: "Close",
                  },
              }
            : modal_type === "thank"
            ? {
                  status: "Thank You",
                  description: "We acknowledge you for spending time with us.",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/out_of_topic.svg",
                  action: {
                      number: 1,
                      type1: "Close",
                  },
              }
            : modal_type === "rating"
            ? {
                  id: `#PA${
                      supportEngineerState.active_premium_assist &&
                      zeroPad(
                          supportEngineerState.active_premium_assist.auto_id,
                          5
                      )
                  }`,
                  status: "Rate Your Experience",
                  description:
                      "Your valuable feedback will help us improve our system.",
                  on_star:
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/on_star.svg",
                  off_star:
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/off_star.svg",
                  placeholder: "Write your review",
                  action: {
                      number: 1,
                      type1: "Submit",
                  },
              }
            : modal_type === "negative_rating"
            ? {
                  id: `#PA${
                      supportEngineerState.active_premium_assist &&
                      zeroPad(
                          supportEngineerState.active_premium_assist.auto_id,
                          5
                      )
                  }`,
                  status: "State your reason",
                  placeholder: "Write your feedback",
                  action: {
                      number: 1,
                      type1: "Submit",
                  },
              }
            : modal_type === "gold"
            ? {
                  status: "Gold",
                  title: "Confirm Purchase",
                  description: `Buy ${
                      selected_package.support_credits
                  } support credit for ${selected_package.coins * 50} rupees.`,
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/gold.svg",
                  action: {
                      number: 2,
                      type1: "Continue",
                      type2: "Cancel",
                  },
              }
            : modal_type === "platinum"
            ? {
                  status: "Platinum",
                  title: "Confirm Purchase",
                  description: `Buy ${
                      selected_package.support_credits
                  } support credit for ${selected_package.coins * 50} rupees.`,
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/platinum.svg",
                  action: {
                      number: 2,
                      type1: "Confirm",
                      type2: "Cancel",
                  },
              }
            : modal_type === "silver"
            ? {
                  status: "Silver",
                  title: "Confirm Purchase",
                  description: `Buy ${
                      selected_package.support_credits
                  } support credit for ${selected_package.coins * 50} rupees.`,
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/silver.svg",
                  action: {
                      number: 2,
                      type1: "Confirm",
                      type2: "Cancel",
                  },
              }
            : modal_type === "coin"
            ? {
                  status: "Add Coins",
                  description: "Price per coin ₹ 50.00",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/coin.svg",
                  action: {
                      number: 1,
                      type1: "Purchase",
                  },
              }
            : modal_type === "bronze"
            ? {
                  status: "Bronze",
                  title: "Confirm Purchase",
                  description: `Buy ${
                      selected_package.support_credits
                  } support credit for ${selected_package.coins * 50} rupees.`,
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/bronze.svg",
                  action: {
                      number: 2,
                      type1: "Confirm",
                      type2: "Cancel",
                  },
              }
            : {
                  status: "",
                  title: "",
                  description: "",
                  image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/bronze.svg",
                  action: {
                      number: 2,
                      type1: "Confirm",
                      type2: "Cancel",
                  },
              };

    const array = [];
    var i;
    for (i = 0; i < 5; i++) {
        array.push(i);
    }

    const ButtonLoading = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {},
    };
    const RedButtonLoading = {
        loop: true,
        autoplay: true,
        animationData: redLoader,
        rendererSettings: {},
    };
    const support_engineer =
        modal_type === "start_chat" ||
        modal_type === "reassign" ||
        modal_type === "out_of_topic" ||
        modal_type === "end_chat" ||
        modal_type === "se_end_chat";
    return (
        <BackContainer style={{ transform: is_modal && "scale(1,1)" }}>
            <Overlay
                onClick={() =>
                    modal_type !== "rating" &&
                    modal_type !== "negative_rating" &&
                    supportEngineerDispatch({
                        type: "UPDATE_MODAL",
                        is_modal: false,
                    })
                }
            ></Overlay>
            <Modal
                B="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/coin_modal.svg"
                ref={modal}
                modal_type={modal_type}
            >
                <IconBox type={support_engineer} modal_type={modal_type}>
                    {modal_type === "success" ||
                    modal_type === "cancelled" ||
                    modal_type === "thank" ? (
                        <LottieContainer>
                            <Lottie
                                options={defaultOptions}
                                height={130}
                                width="100%"
                            />
                        </LottieContainer>
                    ) : modal_type === "rating" ||
                      modal_type == "negative_rating" ? (
                        <Jdenticon
                            size={window.innerWidth > 1280 ? "100%" : "100%"}
                            value={modal_type}
                        />
                    ) : (
                        <Image
                            src={condition.image}
                            alt="image"
                            style={{
                                position:
                                    (modal_type === "end_chat" ||
                                        modal_type === "se_end_chat") &&
                                    "relative",
                                right:
                                    (modal_type === "end_chat" ||
                                        modal_type === "se_end_chat") &&
                                    "-3px",
                            }}
                        />
                    )}
                </IconBox>
                {modal_type === "rating" || modal_type === "negative_rating" ? (
                    <>
                        <Id>{condition.id}</Id>
                        <RatingTitle>{condition.status}</RatingTitle>
                        {modal_type === "rating" && (
                            <>
                                <RatingDescription>
                                    {condition.description}
                                </RatingDescription>
                                <StarBox>
                                    {array.map((item, index) => (
                                        <Stars
                                            src={
                                                index < rating
                                                    ? condition.on_star
                                                    : condition.off_star
                                            }
                                            alt="image"
                                            onClick={() => setRating(index + 1)}
                                        />
                                    ))}
                                </StarBox>
                            </>
                        )}
                        <ReviewField
                            onChange={(e) =>
                                setReviewDescription(e.target.value)
                            }
                            placeholder={condition.placeholder}
                        ></ReviewField>
                    </>
                ) : modal_type === "coin" ? (
                    <>
                        <CoinTitle>{condition.status}</CoinTitle>
                        <CoinDescription>
                            {condition.description}
                        </CoinDescription>
                        <CoinInputBox>
                            <CoinImage src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/modal/coin.svg" />
                            <CoinInputField
                                type="number"
                                placeholder="Enter Coin"
                                value={coinsCount}
                                onChange={(e) => setCoinsCount(e.target.value)}
                            ></CoinInputField>
                        </CoinInputBox>
                        <PriceBox>
                            <PriceTitle>Grand Total</PriceTitle>
                            <Price>
                                <Amount>
                                    {" "}
                                    {coinsCount ? coinsCount * 50 : 0}
                                </Amount>
                                <Tax>(18% Tax included)</Tax>
                            </Price>
                        </PriceBox>
                    </>
                ) : (
                    <>
                        {modal_type === "success" ||
                        modal_type === "cancelled" ||
                        support_engineer ||
                        modal_type === "thank" ? (
                            <Status>{condition.status}</Status>
                        ) : (
                            <>
                                <Title color={modal_type}>
                                    {condition.status}
                                </Title>
                                <Status style={{ marginTop: "10px" }}>
                                    {condition.title}
                                </Status>
                            </>
                        )}
                        <StatusDescription>
                            {condition.description}
                            {modal_type === "success" && (
                                <InvoiceLink to="">receipt</InvoiceLink>
                            )}
                        </StatusDescription>
                    </>
                )}
                <ActionBox>
                    <FirstAction
                        type={modal_type === "rating" && "submit"}
                        number={condition.action.number}
                        onClick={() => {
                            // Call the function for purchase coin
                            modal_type === "coin"
                                ? onCoinPurchase()
                                : modal_type === "bronze" ||
                                  modal_type === "silver" ||
                                  modal_type === "gold" ||
                                  modal_type === "platinum" ||
                                  modal_type === "cancelled"
                                ? onCreditPurchase()
                                : modal_type === "end_chat"
                                ? onEndChat("resolved")
                                : modal_type === "se_end_chat"
                                ? onEndChat("resolved")
                                : modal_type === "rating" ||
                                  modal_type === "negative_rating"
                                ? onRatePA()
                                : modal_type === "reassign"
                                ? onReassign("reassign")
                                : modal_type === "thank" ||
                                  modal_type === "success"
                                ? supportEngineerDispatch({
                                      type: "UPDATE_MODAL",
                                      is_modal: false,
                                  })
                                : modal_type === "start_chat"
                                ? onStartChat()
                                : history.push("/premium-assist/");

                            setFirstButtonLoading(true);
                        }}
                    >
                        {isLoading && firstButtonLoading ? (
                            <Lottie
                                options={ButtonLoading}
                                height={50}
                                width={50}
                            />
                        ) : (
                            condition.action.type1
                        )}
                    </FirstAction>
                    <SecondAction
                        color={modal_type}
                        number={condition.action.number}
                        onClick={() => {
                            modal_type === "end_chat"
                                ? onEndChat("not-resolved")
                                : modal_type === "se_end_chat"
                                ? onEndChat("not-resolved")
                                : modal_type === "negative_rating"
                                ? supportEngineerDispatch({
                                      type: "UPDATE_MODAL",
                                      is_modal: false,
                                      modal_type: "reassign",
                                  })
                                : modal_type === "reassign"
                                ? onReassign("close")
                                : supportEngineerDispatch({
                                      type: "UPDATE_MODAL",
                                      is_modal: false,
                                  });
                            setFirstButtonLoading(false);
                        }}
                    >
                        {isLoading && !firstButtonLoading ? (
                            <Lottie
                                options={RedButtonLoading}
                                height={35}
                                width={35}
                            />
                        ) : (
                            condition.action.type2
                        )}
                    </SecondAction>
                </ActionBox>
                {isError ? <Error> {ErrorMessage}</Error> : null}
            </Modal>
        </BackContainer>
    );
}

const Error = styled.p`
    color: red;
`;
const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 100;
    left: 0;
    top: 0px;
`;
const Overlay = styled.div`
    position: fixed;
    background: rgba(24, 72, 76, 0.3);
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Modal = styled.div`
    width: 500px;
    margin: 0 auto;
    background: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px 50px;
    border-radius: 15px;
    z-index: 101;
    background-image: url(${(props) => props.modal_type === "coin" && props.B});
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 980px) {
        padding: 30px 40px;
    }
    @media (max-width: 640px) {
        width: 400px;
        padding: 20px 30px;
    }
    @media (max-width: 480px) {
        width: 330px;
        padding: 20px 20px;
    }
    @media (max-width: 360px) {
        width: 300px;
    }
`;
const IconBox = styled.span`
    display: flex;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    background: white;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 3px 23px #00000029;
    padding: ${(props) =>
        props.modal_type === "end_chat" || props.modal_type === "se_end_chat"
            ? "30px"
            : props.modal_type === "rating"
            ? "10px"
            : props.type
            ? "38px"
            : "0px"};
    @media (max-width: 980px) {
        width: 110px;
        height: 110px;
        padding: ${(props) =>
            props.modal_type === "end_chat" ||
            props.modal_type === "se_end_chat"
                ? "25px"
                : props.modal_type === "rating"
                ? "10px"
                : props.type
                ? "32px"
                : "0px"};
    }
    @media (max-width: 640px) {
        width: 90px;
        height: 90px;
        padding: ${(props) =>
            props.modal_type === "end_chat" ||
            props.modal_type === "se_end_chat"
                ? "22px"
                : props.modal_type === "rating"
                ? "10px"
                : props.type
                ? "27px"
                : "0px"};
    }
    @media (max-width: 480px) {
        width: 85px;
        height: 85px;
        padding: ${(props) =>
            props.modal_type === "end_chat" ||
            props.modal_type === "se_end_chat"
                ? "21px"
                : props.modal_type === "rating"
                ? "10px"
                : props.type
                ? "23px"
                : "0px"};
    }
`;
const Id = styled.span`
    display: block;
    text-align: center;
    margin-top: 35px;
    color: #1f2935;
    font-size: 21px;
    font-family: baloo_paaji_2medium;
    @media (max-width: 480px) {
        font-size: 18px;
        margin-top: 30px;
    }
`;
const RatingTitle = styled.h3`
    text-align: center;
    margin-top: 13px;
    color: #15232e;
    font-size: 23px;
    font-family: baloo_paaji_2medium;
    @media (max-width: 480px) {
        font-size: 19px;
    }
`;
const RatingDescription = styled.p`
    color: #15232e;
    font-family: baloo_paaji_2medium;
    font-size: 15px;
    text-align: center;
    width: 75%;
    margin: 0 auto;
    @media (max-width: 768px) {
        width: 78%;
    }
    @media (max-width: 640px) {
        font-size: 14px;
        width: 90%;
    }
    @media (max-width: 480px) {
        font-size: 13px;
        width: 90%;
        margin-top: 8px;
    }
`;
const StarBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 20px auto;
`;
const Stars = styled.img`
    width: 45px;
    cursor: pointer;
    @media (max-width: 480px) {
        width: 30px;
    }
`;
const ReviewField = styled.textarea`
    background: #fff4ff;
    width: 100%;
    height: 130px;
    color: #1f2935;
    font-size: 12px;
    font-family: baloo_paaji_2medium;
    padding: 20px;
    border-radius: 4px;
    resize: none;
    ::placeholder {
        font-family: baloo_paaji_2medium;
        font-size: 12px;
    }
`;
const LottieContainer = styled.div`
    display: block;
    width: 100%;
`;
const Image = styled.img`
    display: block;
    width: 100%;
`;
const CoinTitle = styled.h3`
    font-size: 24px;
    margin-top: 30px;
    font-family: baloo_paaji_2medium;
`;
const CoinDescription = styled.span`
    display: block;
    font-size: 16px;
`;
const CoinInputBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 15px 15px;
    margin-top: 20px;
    border: 1px solid #f3c900;
    border-radius: 10px;
    margin-bottom: 50px;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -30px;
        border-bottom: 2px dotted #f3c900;
    }
`;
const CoinImage = styled.img`
    display: block;
    width: 20px;
`;
const CoinInputField = styled.input`
    width: calc(100% - 50px);
    font-size: 15px;
    &::placeholder {
        color: black;
        opacity: 0.7;
    }
`;
const PriceBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const PriceTitle = styled.div`
    font-family: baloo_paaji_2medium;
    font-size: 14px;
`;
const Price = styled.div``;
const Amount = styled.span`
    display: block;
    font-family: baloo_paaji_2medium;
    font-size: 21px;
    text-align: right;
`;
const Tax = styled.span`
    display: block;
    font-family: baloo_paaji_2medium;
    font-size: 13px;
    text-align: right;
`;
const Status = styled.h3`
    text-align: center;
    margin-top: 45px;
    color: #15232e;
    font-size: 32px;
    font-family: baloo_paaji_2medium;
    @media (max-width: 980px) {
        font-size: 29px;
    }
    @media (max-width: 640px) {
        font-size: 24px;
    }
    @media (max-width: 480px) {
        margin-top: 35px;
        font-size: 21px;
    }
`;
const Title = styled.h3`
    margin-top: 45px;
    font-size: 27px;
    font-family: baloo_paaji_2semibold;
    text-align: center;
    color: ${(props) =>
        props.color === "bronze"
            ? "#AA6F2B"
            : props.color === "silver"
            ? "#A2A5AA"
            : props.color === "platinum"
            ? "#47596F"
            : "#47596F"};
    @media (max-width: 980px) {
        font-size: 25px;
    }
    @media (max-width: 640px) {
        font-size: 21px;
    }
    @media (max-width: 480px) {
        margin-top: 35px;
        margin-bottom: -5px;
        font-size: 18px;
    }
`;
const StatusDescription = styled.p`
    text-align: center;
    font-size: 17px;
    color: #15232e;
    font-family: baloo_paaji_2medium;
    width: 90%;
    margin: 0 auto;
    @media (max-width: 980px) {
        font-size: 16px;
    }
    @media (max-width: 640px) {
        font-size: 14px;
    }
    @media (max-width: 480px) {
        font-size: 13px;
        width: 100%;
        margin-top: 8px;
    }
`;
const InvoiceLink = styled(Link)`
    color: #1ec569;
    font-size: 17px;
    font-family: baloo_paaji_2medium;
    margin-left: 2px;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: 4px;
        left: 0;
        border-bottom: 1px solid #1ec569;
        display: inline-block;
    }
    @media (max-width: 980px) {
        font-size: 16px;
    }
    @media (max-width: 640px) {
        font-size: 14px;
    }
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;
const ActionBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    width: 100%;
    @media (max-width: 480px) {
        margin-top: 18px;
    }
`;
const FirstAction = styled.div`
    width: ${(props) => (props.number !== 1 ? "47%" : "100%")};
    border-radius: 4px;
    background: #1ec569;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-family: baloo_paaji_2medium;
    color: #ffffff;
    height: 50px;
    border: 2px solid #1ec569;
    cursor: pointer;
    @media (max-width: 640px) {
        padding: 8px;
        font-size: 14px;
    }
    @media (max-width: 480px) {
        padding: 5px;
        font-size: 13px;
    }
`;
const SecondAction = styled.span`
    display: ${(props) => (props.number !== 1 ? "flex" : "none")};
    width: 47%;
    height: 50px;
    border-radius: 4px;
    border: ${(props) =>
        props.color === "success" ? "2px solid #1EC569" : "2px solid #B10808"};
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-family: baloo_paaji_2medium;
    color: ${(props) => (props.color === "success" ? "#333333" : "#B10808")};
    padding: 10px;
    cursor: pointer;
    @media (max-width: 640px) {
        padding: 8px;
        font-size: 14px;
    }
    @media (max-width: 480px) {
        padding: 5px;
        font-size: 13px;
    }
`;
