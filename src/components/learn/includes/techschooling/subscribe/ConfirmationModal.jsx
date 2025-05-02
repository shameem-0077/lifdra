import React, { useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import loader from "../../../../../assets/lotties/modal/loading_lottie.json";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { learnConfig } from "../../../../../axiosConfig";
import queryString from "query-string";
import { getUserDateFromUTC } from "../../../../helpers/functions";
import tick from "../../../../../assets/lotties/web/sucess.json";
import error from "../../../../../assets/lotties/web/error.json";

const ConfirmationModal = ({
    isModal,
    setModal,
    modalType,
    plan,
    subscription,
}) => {
    const user_data = useSelector((state) => state.user_data);
    const history = useHistory();
    const location = useLocation();
    const [isLoading, setLoading] = useState(false);
    const handleModal = () => {
        setModal(false);
    };
    let { search } = location;
    const values = queryString.parse(search);
    const event = values.event;

    const handleSubmit = () => {
        setLoading(true);
        let { access_token } = user_data;
        learnConfig
            .post(
                `/subscriptions/start/${plan}/`,
                {},
                { headers: { Authorization: `Bearer ${access_token}` } }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setLoading(false);
                    history.push({
                        pathname: location.pathname,
                        search: `action=subscribe&status=success${
                            data.event ? `&event=${event}` : ``
                        }`,
                    });
                } else if (StatusCode === 6001) {
                    setLoading(false);
                    if (data.data.is_insufficient_coins) {
                        window.location.href = data.data.payment_link;
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    const successOptions = {
        loop: true,
        autoplay: true,
        animationData: tick,
        rendererSettings: {},
    };
    const failedOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {},
    };
    return (
        <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
            {" "}
            <Overlay onClick={handleModal}></Overlay>
            {modalType === "confirm" ? (
                <Modal>
                    <Title>Are you sure?</Title>
                    <Status>
                        Are you sure you want to purchase this plan?
                    </Status>

                    <ButtonContainer>
                        <Cancel onClick={handleModal}>No</Cancel>
                        {isLoading ? (
                            <Submit>
                                {" "}
                                <Lottie
                                    options={defaultOptions}
                                    height={40}
                                    width={40}
                                />
                            </Submit>
                        ) : (
                            <Submit onClick={handleSubmit}>Yes</Submit>
                        )}
                    </ButtonContainer>

                    <BottomLine modalType={modalType}></BottomLine>
                    <Close onClick={handleModal}>
                        <img
                            src={require("../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                            alt=""
                        />
                    </Close>
                </Modal>
            ) : modalType === "success" ? (
                <Modal>
                    <SucessModal>
                        <TopSection>
                            <LottieIcon>
                                <Lottie
                                    options={successOptions}
                                    width={"100%"}
                                />
                            </LottieIcon>
                            <SucessTitle>Success</SucessTitle>
                        </TopSection>
                        <Status>
                            Your subscription will expire on{" "}
                            {getUserDateFromUTC(subscription.end_timestamp)}
                        </Status>
                        <ContinueButton
                            style={{ width: "100%" }}
                            onClick={() =>
                                history.push({
                                    pathname: location.pathname,
                                })
                            }
                        >
                            Continue
                        </ContinueButton>
                    </SucessModal>

                    <BottomLine modalType={modalType}></BottomLine>
                    <Close
                        onClick={() =>
                            history.push({
                                pathname: location.pathname,
                            })
                        }
                    >
                        <img
                            src={require("../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                            alt=""
                        />
                    </Close>
                </Modal>
            ) : modalType === "failed" ? (
                <Modal>
                    <SucessModal>
                        <TopSection>
                            <LottieIcon>
                                <Lottie
                                    options={failedOptions}
                                    width={"100%"}
                                />
                            </LottieIcon>
                            <SucessTitle>Failed</SucessTitle>
                        </TopSection>
                        <Status>
                            Your subscription transaction was interrupted
                        </Status>
                        <ContinueButton
                            style={{ width: "100%" }}
                            onClick={() =>
                                history.push({
                                    pathname: location.pathname,
                                    search: `action=subscribe`,
                                })
                            }
                        >
                            Try again
                        </ContinueButton>
                    </SucessModal>

                    <BottomLine modalType={modalType}></BottomLine>
                    <Close
                        onClick={() =>
                            history.push({
                                pathname: location.pathname,
                            })
                        }
                    >
                        <img
                            src={require("../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                            alt=""
                        />
                    </Close>
                </Modal>
            ) : null}
        </BackContainer>
    );
};

export default ConfirmationModal;
const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    transform: scale(0, 0);
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0px;
    /* background: rgba(0, 0, 0, 0.2); */
    backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Modal = styled.div`
    width: 600px;
    max-height: 90vh;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 50px;
    border-radius: 10px;
    transition: 0.5s;
    z-index: 101;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media all and (max-width: 980px) {
        width: 550px;
    }
    @media all and (max-width: 640px) {
        width: 450px;
    }
    @media all and (max-width: 480px) {
        width: 350px;
        padding: 30px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;
const Title = styled.h3`
    font-size: 24px;
    font-family: gordita_medium;
    color: #393939;
    padding-bottom: 20px;
    border-bottom: 1px solid#e7e6e6;
    @media all and (max-width: 768px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const BottomLine = styled.span`
    display: block;
    width: 100%;
    border-top: 7px solid #5ac78b;
    border-bottom: 7px solid #459e7b;
    position: absolute;
    bottom: 0;
    left: 0;
`;
const Close = styled.span`
    display: block;
    width: 15px;
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        top: 30px;
        right: 30px;
    }
`;
const Status = styled.h3`
    margin-top: 30px;
    max-width: 450px;
    font-family: gordita_regular;
    @media all and (max-width: 480px) {
        margin-top: 20px;
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Cancel = styled.span`
    margin-left: 30px;
    width: 150px;
    height: 50px;
    background-color: #f9f9f9;
    color: #616060;
    font-family: gordita_medium;
    border: 1px solid#e7e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        /* margin-top: 30px; */
    }
`;
const Submit = styled.span`
    margin-left: 30px;
    width: 150px;
    height: 50px;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        /* margin-top: 30px; */
    }
`;
const SucessModal = styled.div``;
const TopSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid#e7e6e6;
    padding-bottom: 10px;
`;
const LottieIcon = styled.span`
    display: block;
    min-width: 80px;
    width: 80px;
    margin-right: 20px;
    @media all and (max-width: 480px) {
        min-width: 50px;
        width: 50px;
        margin-right: 10px;
    }
`;
const SucessTitle = styled.h4`
    font-size: 24px;
    font-family: gordita_medium;
    color: #393939;
    @media all and (max-width: 768px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const SuccesStatus = styled.p`
    margin-top: 30px;

    max-width: 450px;
    @media all and (max-width: 480px) {
        margin-top: 20px;
        font-size: 14px;
    }
`;
const ContinueButton = styled.span`
    width: 150px;
    height: 50px;
    margin-left: auto;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 50px;
    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        margin-top: 30px;
    }
`;
