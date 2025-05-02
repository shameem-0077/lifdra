import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import loader from "../../../../assets/lotties/modal/buttonloader.json";
import successData from "../../../../assets/lotties/modal/successtick.json";
import styled from "styled-components";
import ConfirmationData from "../../../../assets/lotties/modal/questionmark.json";
import failedData from "../../../../assets/lotties/modal/failed.json";
import { useDispatch, useSelector } from "react-redux";
import { PrimeProgramContext } from "../../../contexts/stores/PrimeProgramStore";
import { accountsConfig, primeprogramsConfig } from "../../../../axiosConfig";

export default function PaymentStatusModal({
    show,
    setShow,
    modalType,
    setModalType,
    course_id,
    topicId,
    couponId,
    voucherCode,
    purchase_type,
    courseSlug,
}) {
    const user_data = useSelector((state) => state.user_data);
    const state = useSelector((state) => state);

    const [isButtonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextId, setNextId] = useState("");
    const dispatch = useDispatch();

    const { primeProgramState } = useContext(PrimeProgramContext);

    useEffect(() => {
        let user_data = localStorage.getItem("user_data");
        let data = JSON.parse(user_data);
        dispatch({
            type: "UPDATE_USER_DATA",
            user_data: data,
        });
    }, []);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData:
            modalType === "Confirmation"
                ? ConfirmationData
                : modalType === "success"
                ? successData
                : modalType === "failed"
                ? failedData
                : loader,
        rendererSettings: {},
    };
    const loaderdefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
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

    const handlePayment = (e) => {
        e.preventDefault();
        setButtonLoading(true);
        const { access_token } = user_data;

        primeprogramsConfig
            .post(
                `purchases/course-purchase/${course_id}/`,
                {
                    purchase_type: purchase_type,
                    is_use_purchased_coins: primeProgramState
                        ? primeProgramState.isUsedPurchasedCoins
                        : false,
                    coupon_code: couponId ? couponId : "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setButtonLoading(false);
                    setModalType("success");
                    setShow(true);
                    setNextId(data.new_student_topic);
                    fetchProfile();
                } else {
                    if (data.payment_link) {
                        window.location.href = data.payment_link;
                    } else {
                        setButtonLoading(false);
                        setShow(true);
                        setModalType("failed");
                        setErrorMessage(data.message);
                    }
                }
            })
            .catch((error) => {
                setButtonLoading(false);
                console.log(error);
            });
    };

    return (
        <BackContainer style={{ transform: show && "scale(1,1)" }}>
            <Overlay>
                {modalType === "Confirmation" ? (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Text>
                            Are you sure you want to purchase this course?
                        </Text>
                        <ButtonContainer>
                            <Button onClick={(e) => handlePayment(e)}>
                                {!isButtonLoading ? (
                                    "Yes"
                                ) : (
                                    <Lottie
                                        options={loaderdefaultOptions}
                                        height={45}
                                        width={45}
                                    />
                                )}
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShow(false);
                                }}
                                type="failed"
                            >
                                No
                            </Button>
                        </ButtonContainer>
                    </Container>
                ) : modalType === "PrimeSubscription" ? (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Text>
                            Are you sure wanna subscribe Prime Programs?
                        </Text>
                        <ButtonContainer>
                            <Button onClick={(e) => handlePayment(e)}>
                                {!isButtonLoading ? (
                                    "Yes"
                                ) : (
                                    <Lottie
                                        options={loaderdefaultOptions}
                                        height={45}
                                        width={45}
                                    />
                                )}
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShow(false);
                                }}
                                type="failed"
                            >
                                No
                            </Button>
                        </ButtonContainer>
                    </Container>
                ) : modalType === "success" ? (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Title>Success</Title>
                        <Text>
                            Your course has been successfully purchased, now you
                            can access your course
                        </Text>
                        <Button
                            to={`/prime-programs/${courseSlug}/${
                                topicId ? topicId : nextId
                            }/`}
                            type="success"
                        >
                            {!isButtonLoading ? (
                                "Continue"
                            ) : (
                                <Lottie
                                    options={loaderdefaultOptions}
                                    height={45}
                                    width={45}
                                />
                            )}
                        </Button>
                    </Container>
                ) : (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Title>Sorry!</Title>
                        <Text>
                            {errorMessage
                                ? errorMessage
                                : " Your payment is failed, click below button to retry"}
                        </Text>
                        <ButtonContainer>
                            <Button onClick={(e) => handlePayment(e)}>
                                {!isButtonLoading ? (
                                    "Retry"
                                ) : (
                                    <Lottie
                                        options={loaderdefaultOptions}
                                        height={45}
                                        width={45}
                                    />
                                )}
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShow(false);
                                }}
                                type="failed"
                            >
                                Close
                            </Button>
                        </ButtonContainer>
                    </Container>
                )}
            </Overlay>
        </BackContainer>
    );
}

const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    left: 0;
    top: 0px;
    background: rgba(0, 0, 0, 0.2);
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgb(255, 255, 255);
    padding: 55px 40px 40px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    z-index: 1000;
    transition: 0.3s;
    @media (max-width: 560px) {
        width: 400px;
    }
    @media (max-width: 440px) {
        width: 370px;
        padding: 55px 25px 30px;
    }
    @media (max-width: 385px) {
        width: 340px;
    }
    @media (max-width: 385px) {
        width: 300px;
    }
`;
const LottieContainer = styled.div`
    width: 130px;
    height: 130px;
    position: absolute;
    top: 1px;
    left: 39px;
    transform: translate(-45px, -3px);
    margin: 0px auto;
    @media (max-width: 560px) {
        transform: translate(-45px, -8px);
        width: 120px;
        height: 120px;
    }
    @media (max-width: 440px) {
        transform: translate(-44px, -18px);
        width: 100px;
        height: 100px;
    }
    @media (max-width: 385px) {
        transform: translate(-44px, -23px);
        width: 90px;
    }
`;
const Title = styled.h4`
    font-size: 26px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
    @media (max-width: 768px) {
        font-size: 22px;
    }
`;
const Text = styled.p`
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
    font-family: "gordita_medium";
`;
const Button = styled(Link)`
    background-color: ${(props) =>
        props.type === "failed" ? "#fff" : "#15bf81"};
    height: 40px;
    width: ${(props) => (props.type === "success" ? "100%" : "120px")};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    border: 1px solid
        ${(props) => (props.type === "failed" ? "#f9003a" : "#15bf81")};
    color: ${(props) => (props.type === "failed" ? "#f9003a" : "white")};
    @media (max-width: 440px) {
        width: ${(props) => (props.type === "success" ? "100%" : "100px")};
    }
`;
const Circle = styled.div`
    background-color: #fff;
    padding: 10px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    top: -70px;
    left: 150px;
    transform: translate(40px, 0);
    border: 1px solid rgb(250, 250, 250);
    @media (max-width: 560px) {
        transform: translate(-10px, 0);
        width: 110px;
        height: 110px;
    }
    @media (max-width: 440px) {
        width: 90px;
        height: 90px;
        top: -40px;
    }
    @media (max-width: 385px) {
        width: 80px;
        height: 80px;
        top: -40px;
        transform: translate(-40px, -6px);
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    @media (max-width: 560px) {
        padding: 0 20px;
    }
    @media (max-width: 440px) {
        padding: 0 40px;
    }
    @media (max-width: 385px) {
        padding: 0 10px;
    }
`;

//voucher modal styles
const VoucherModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    transform: translate(-50%, -50%);

    background-color: rgb(255, 255, 255);
    padding: 40px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    z-index: 1000;
    @media (max-width: 640px) {
        width: 500px;
    }
    @media (max-width: 560px) {
        width: 400px;
    }
    @media (max-width: 440px) {
        width: 370px;
        padding: 55px 25px 30px;
    }

    @media (max-width: 385px) {
        width: 310px;
    }
`;
const ModalTop = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 2px solid #7070704b;
    h2 {
        font-size: 24px;
        font-family: "gordita_medium";
        @media (max-width: 560px) {
            font-size: 20px;
        }
        @media (max-width: 385px) {
            font-size: 18px;
        }
    }
`;
const VoucherIcon = styled.span`
    width: 30px;
    display: block;
    margin-right: 20px;
    img {
        width: 100%;
        display: block;
    }
    @media (max-width: 385px) {
        width: 25px;
        margin-right: 10px;
    }
`;
const ModalBottom = styled.div`
    margin-top: 30px;
`;
const CouponDiscountPrice = styled.h3`
    text-align: left;
    font-family: "gordita_medium";
    font-size: 32px;
`;
const Label = styled.p`
    text-align: left;
    color: #585858;
    font-size: 14px;
    transform: translateY(-10px);
`;
const Description = styled.p`
    text-align: left;
    color: #585858;
`;
const VoucherButton = styled.span`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    background-color: #15bf81;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;
