import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../store/authStore";
import PaymentStatusModal from "./PaymentStatusModal";
import loader from "../../../../assets/lotties/modal/buttonloader.json";
import applyLoader from "../../../../assets/lotties/prime-progrmmes/voucherLoader.json";
import Lottie from "react-lottie";
import { PrimeProgramContext } from "../../../contexts/stores/PrimeProgramStore";
import { serverConfig } from "../../../../axiosConfig";
import queryString from "query-string";
import SignupLoader from "../../includes/techschooling/general/loaders/SignupLoader";
import VoucherModal from "./VoucherModal";
import { useParams } from "react-router-dom";
import { getDateStr } from "../../../helpers/functions";

const NewBuyNowModal = (props) => {
    const { user_data } = useAuthStore();
    const { primeProgramState, primeProgramDispatch } = useContext(PrimeProgramContext);

    const [date, setDate] = useState(false);
    const [show, setShow] = useState(false);
    const [isVoucherModal, setVoucherModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [courseId, setCourseId] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [courseDetails, setCourseDetails] = useState([]);
    const [voucherCode, setVoucherCode] = useState("");
    const [isVoucherApplied, setVoucherApplied] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isApplyLoading, setApplyLoading] = useState(false);
    const [couponData, setCouponData] = useState("");
    const [couponId, setCouponId] = useState("");
    const [courseSlug, setCourseSlug] = useState("");
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
    });

    const { course_id } = useParams();

    const handleVoucher = (e) => {
        setVoucherCode(e.target.value);
    };

    let { data } = props;

    const lottieDefaultOptions = {
        loop: false,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    const voucherDefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: applyLoader,
        rendererSettings: {},
    };

    const [isToast, setToast] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 3000);
    }, [isToast]);

    const handleToggle = () => {
        setError(false);
        setErrorMessage(
            "You don't have enough purchased coins to buy this course"
        );
        setToast(true);
    };

    useEffect(() => {
        if (user_data) {
            const { access_token } = user_data;
            const fetchData = async () => {
                await serverConfig
                    .get(`learning/course/${courseId}/`, {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                    .then((response) => {
                        const { data } = response.data;
                        setLoading(false);
                        setCourseDetails(data);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            };

            if (courseId) {
                fetchData();
            } else {
                setCourseDetails(data);
            }
        }
    }, [courseId, user_data, data]);

    useEffect(() => {
        if (props.action !== "buy-course") {
            setVoucherCode("");
            setVoucherApplied(false);
            setCouponData("");
            setCouponId("");
        }
    }, [props.action]);

    useEffect(() => {
        let { location } = props;
        let { search } = location;

        const values = queryString.parse(search);
        const c = values.c;
        setCourseSlug(c);
        if (course_id) setCourseId(course_id);
        else setCourseId(c);
    }, [props.location.search, course_id]);

    const voucherValidation = () => {
        setApplyLoading(true);
        setError(false);
        let access_token = user_data.access_token;
        serverConfig
            .post(
                `coupons/validate-coupon/${courseId}/`,
                {
                    coupon_code: voucherCode,
                },
                {
                    headers: { Authorization: `Bearer ${access_token}` },
                }
            )
            .then((res) => {
                let { status_code, data } = res.data;
                if (status_code === 6000) {
                    setVoucherApplied(true);
                    setVoucherModal(true);
                    setApplyLoading(false);
                    setCouponData(data);
                    setCouponId(data.coupon_pk);
                } else if (status_code === 6001) {
                    setVoucherApplied(false);
                    setError(true);
                    setToast(true);

                    setErrorMessage(
                        data.message ===
                            "coupon_code : This field may not be blank."
                            ? "This field may not be blank."
                            : data.message
                    );
                    setApplyLoading(false);
                }
            })
            .catch((err) => {
                setError(true);
                setToast(true);
                setApplyLoading(false);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            voucherValidation();
        }
    };

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (props.action === "buy-course") {
            document.body.style.position = "fixed";
            document.body.style.top = `-${window.scrollY}px`;

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
            };
        }
    }, [props.action]);

    useEffect(() => {
        let d = String(new window.Date());
        let date = d.split(" ");

        setDate(date[2] + " " + date[1] + " " + date[3]);
    }, []);

    return (
        <>
            <VoucherModal
                isVoucherModal={isVoucherModal}
                setVoucherModal={setVoucherModal}
                modalType={modalType}
                data={couponData}
                coupon={voucherCode}
                topicId={props.topicId}
            />
            <PaymentStatusModal
                purchase_type="purchase"
                topicId={props.topicId}
                setTopicId={props.setTopicId}
                course_id={courseDetails?.id}
                show={show}
                setShow={setShow}
                setModalType={setModalType}
                modalType={modalType}
                closeModal={props.closeModal}
                status={props.status}
                couponId={couponId}
                courseSlug={courseSlug}
            />

            <Overlay action={props.action} onClick={props.closeModal} />
            <ModalContainer
                action={props.action}
                style={{ height: dimensions.height }}
            >
                <Toast isError={isError} active={isToast}>
                    <ToastText isError={isError}>{errorMessage}</ToastText>
                </Toast>
                <Container>
                    <CloseButton onClick={props.closeModal}>
                        <CloseIcon
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/close.png"
                            alt="Arrow"
                        />
                    </CloseButton>
                    <Bg>
                        <BgImage
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/modalbg.svg"
                            alt="Image"
                        />
                    </Bg>
                    {/* <Buynow>
                        <BuyNowImage
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/buynow.svg"
                            alt="Image"
                        />
                    </Buynow> */}
                    <Heading>Order Summary</Heading>
                    {isLoading ? (
                        <LoaderContainer>
                            <SignupLoader />
                        </LoaderContainer>
                    ) : (
                        <CardContainer>
                            <BgCover>
                                <div>
                                    <Card>
                                        <Left>
                                            {/* {courseDetails?.coins <
                                        courseDetails?.actual_coins && (
                                        <Badge
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/badge.svg"
                                            alt="Image"
                                        />
                                    )}
                                    {courseDetails?.coins <
                                        courseDetails?.actual_coins && (
                                        <Offer>
                                            {parseInt(
                                                100 -
                                                    (courseDetails?.coins /
                                                        courseDetails?.actual_coins) *
                                                        100
                                            )}
                                            % off
                                        </Offer>
                                    )} */}
                                            <Icon>
                                                <img
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/basket.png"
                                                    alt="icon"
                                                />
                                            </Icon>
                                            <Title>{courseDetails?.name}</Title>
                                            {/* <ImageCon>
                                                <VideoImage
                                                    src={
                                                        courseDetails?.cover_image
                                                    }
                                                    alt="Image"
                                                />
                                            </ImageCon> */}
                                        </Left>
                                        <Right>
                                            <Label>Purchased on</Label>
                                            <Date>{date}</Date>
                                        </Right>
                                    </Card>

                                    {/* Voucher section  */}
                                    <VoucherCard>
                                        <VoucherIcon>
                                            <img
                                                src={require("../../../../assets/images/prime-program/apply-voucher/badge.svg")}
                                                alt="Icon"
                                            />
                                        </VoucherIcon>
                                        {isVoucherApplied ? (
                                            <AppliedVoucher>
                                                {voucherCode}
                                                <Remove
                                                    onClick={() => {
                                                        setVoucherApplied(
                                                            false
                                                        );
                                                        setVoucherCode("");
                                                    }}
                                                >
                                                    Remove
                                                </Remove>
                                            </AppliedVoucher>
                                        ) : (
                                            <VoucherInput
                                                value={voucherCode}
                                                placeholder="Enter coupon code"
                                                onChange={handleVoucher}
                                                onKeyDown={handleKeyDown}
                                            />
                                        )}

                                        {isVoucherApplied ? (
                                            <img
                                                src={require("../../../../assets/images/prime-program/apply-voucher/tick.svg")}
                                                alt=""
                                                width={30}
                                            />
                                        ) : isApplyLoading ? (
                                            <Lottie
                                                options={voucherDefaultOptions}
                                                height={30}
                                                width={30}
                                            />
                                        ) : (
                                            <ApplyButton
                                                onClick={voucherValidation}
                                            >
                                                Apply
                                            </ApplyButton>
                                        )}
                                    </VoucherCard>
                                    <Purchase className="anim-fade">
                                        <PurchaseCon>
                                            <PurchaseTitle>
                                                Pay using premium coins
                                            </PurchaseTitle>
                                            <FloatingIcons
                                                status={
                                                    user_data.total_purchased_coins ===
                                                    0
                                                        ? "active"
                                                        : "not"
                                                }
                                                onClick={() => {
                                                    user_data.total_purchased_coins >
                                                    0
                                                        ? primeProgramDispatch({
                                                              type: "TOGGLE_IS_PURCHASED_COINS",
                                                          })
                                                        : handleToggle();
                                                }}
                                            >
                                                <FloatingIcon>
                                                    <Circle
                                                        status={
                                                            primeProgramState.isUsedPurchasedCoins &&
                                                            user_data.total_purchased_coins >
                                                                0
                                                                ? "active"
                                                                : "not"
                                                        }
                                                    ></Circle>
                                                    <Span
                                                        status={
                                                            primeProgramState.isUsedPurchasedCoins &&
                                                            user_data.total_purchased_coins >
                                                                0
                                                                ? "active"
                                                                : "not"
                                                        }
                                                    ></Span>
                                                </FloatingIcon>
                                            </FloatingIcons>
                                        </PurchaseCon>
                                        <BalanceCon>
                                            <Balance>
                                                <Para className="g-regular">
                                                    Purchased coins
                                                </Para>
                                                <Coins>
                                                    <CoinImage
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/coin.svg"
                                                        alt="Image"
                                                    />
                                                    <Coin>
                                                        {
                                                            user_data.total_purchased_coins
                                                        }
                                                    </Coin>
                                                </Coins>
                                            </Balance>
                                            <Coins>
                                                <CoinImg
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/coin.svg"
                                                    alt="Image"
                                                />
                                                {isVoucherApplied ? (
                                                    <TotalCoin>
                                                        {courseDetails?.coins -
                                                            couponData.coin_value}
                                                    </TotalCoin>
                                                ) : (
                                                    <TotalCoin>
                                                        {courseDetails?.coins}
                                                    </TotalCoin>
                                                )}
                                            </Coins>
                                        </BalanceCon>
                                    </Purchase>
                                    {/* Voucher card ends here */}

                                    <PriceConatiner className="anim-fade">
                                        <TopPrice>
                                            <List>
                                                <Pricee>Price</Pricee>
                                                {courseDetails?.actual_coins >
                                                courseDetails?.coins ? (
                                                    <Rate>
                                                        ₹
                                                        {courseDetails?.actual_coins *
                                                            50}
                                                    </Rate>
                                                ) : (
                                                    <Rate>
                                                        ₹
                                                        {courseDetails?.coins *
                                                            50}
                                                    </Rate>
                                                )}
                                            </List>
                                            {courseDetails?.actual_coins >
                                                courseDetails?.coins && (
                                                <List>
                                                    <Pricee>
                                                        Discount Applied
                                                    </Pricee>

                                                    <Rate>
                                                        - ₹
                                                        {(courseDetails?.actual_coins -
                                                            courseDetails?.coins) *
                                                            50}
                                                    </Rate>
                                                </List>
                                            )}
                                            {isVoucherApplied && (
                                                <List>
                                                    <Pricee>
                                                        Coupon Applied{" "}
                                                    </Pricee>

                                                    <Rate>
                                                        - ₹
                                                        {couponData.coin_value *
                                                            50}
                                                    </Rate>
                                                </List>
                                            )}

                                            <LeftSpan></LeftSpan>
                                            <RightSpan></RightSpan>
                                        </TopPrice>

                                        <TotalPay>
                                            <LeftTotal>
                                                {" "}
                                                <Total>Total Payable</Total>
                                                {isVoucherApplied ? (
                                                    <TotalRate>
                                                        ₹
                                                        {(courseDetails?.coins -
                                                            couponData.coin_value) *
                                                            50}
                                                    </TotalRate>
                                                ) : (
                                                    <TotalRate>
                                                        ₹
                                                        {courseDetails?.coins *
                                                            50}
                                                    </TotalRate>
                                                )}
                                            </LeftTotal>
                                            <RightTotal>
                                                <ImageCover>
                                                    <img
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/bill.svg"
                                                        alt=""
                                                    />
                                                </ImageCover>
                                            </RightTotal>
                                        </TotalPay>
                                    </PriceConatiner>
                                </div>
                            </BgCover>
                        </CardContainer>
                    )}
                </Container>
                {!isLoading &&
                    (primeProgramState.isUsedPurchasedCoins &&
                    user_data.total_purchased_coins > 0 ? (
                        <Button
                            className="anim-fade"
                            onClick={() => {
                                setShow(true);
                                setModalType("Confirmation");
                            }}
                        >
                            {!isButtonLoading ? (
                                <>
                                    <ButtonSpan> Buy Now </ButtonSpan>
                                    <TotalCont>
                                        (
                                        <TotalImage
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/coin.svg"
                                            alt="Image"
                                        />
                                        {isVoucherApplied ? (
                                            <TotalAmount>
                                                {courseDetails?.coins -
                                                    couponData.coin_value}
                                            </TotalAmount>
                                        ) : (
                                            <TotalAmount>
                                                {courseDetails?.coins}
                                            </TotalAmount>
                                        )}
                                        )
                                    </TotalCont>
                                </>
                            ) : (
                                <Lottie
                                    options={lottieDefaultOptions}
                                    height={45}
                                    width={45}
                                />
                            )}
                        </Button>
                    ) : (
                        <Button
                            className="anim-fade"
                            setShow={setShow}
                            onClick={() => {
                                setShow(true);
                                setModalType("Confirmation");
                            }}
                        >
                            {!isButtonLoading ? (
                                isVoucherApplied ? (
                                    <>
                                        <ButtonSpan>Buy Now</ButtonSpan> ₹
                                        {(courseDetails?.coins -
                                            couponData.coin_value) *
                                            50}
                                    </>
                                ) : (
                                    <>
                                        <ButtonSpan>Buy Now</ButtonSpan> ₹
                                        {courseDetails?.coins * 50}
                                    </>
                                )
                            ) : (
                                <Lottie
                                    options={lottieDefaultOptions}
                                    height={45}
                                    width={45}
                                />
                            )}
                        </Button>
                    ))}
            </ModalContainer>
        </>
    );
};

export default NewBuyNowModal;

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
    bottom: ${(props) => (props.active ? "66px" : "-46px")};
    transition: all 0.2s ease;
    font-size: 17px;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
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
    display: ${(props) => (props.action === "buy-course" ? "block" : "none")};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 499;
    filter: blur(0.1);
`;
const ModalContainer = styled.div`
    overflow: hidden;
    position: relative;
    z-index: 500;
    background: #fff;
    width: 30%;
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 430px;
    /* justify-content: center; */
    border-radius: 5px;
    right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    transition: all 0.2s ease;
    @media (max-width: 1440px) {
        width: 35%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 1080px) {
        width: 42%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 1024px) {
        width: 47%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 780px) {
        width: 51%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 740px) {
        width: 55%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 640px) {
        padding-bottom: 50px;
        width: 63%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 550px) {
        width: 70%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 480px) {
        min-width: 300px;
        width: 94%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 360px) {
        width: 95%;
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
    @media (max-width: 325px) {
        right: ${(props) => (props.action === "buy-course" ? "0" : "-100%")};
    }
`;
const Container = styled.div`
    flex: 1;
    padding: 30px 30px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    @media (max-width: 700px) {
        padding-bottom: 45px;
    }
    @media (max-width: 480px) {
        padding: 30px 20px;
        padding-bottom: 20px;
    }
`;
const CloseButton = styled.span`
    width: 25px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    z-index: 2000;
`;
const CloseIcon = styled.img`
    display: block;
    width: 100%;
`;
const ImageCon = styled.div`
    @media (max-width: 880px) {
        width: 100%;
    }
`;
const ImageContainer = styled.div``;
const Bg = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    display: none;
`;
const Buynow = styled.div`
    width: 130px;
    margin: 0 auto;
`;
const BgImage = styled.img`
    width: 100%;
    display: block;
`;
const BuyNowImage = styled.img`
    width: 100%;
    display: block;
`;
const Heading = styled.h3`
    text-align: center;
    font-family: "gordita_medium";
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 20px;
    @media (max-width: 360px) {
        font-size: 20px;
        margin-top: 10px;
    }
`;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CardContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }

    /* border-bottom: 1px solid #dad9d9; */

    flex: 1;
    /* margin-bottom: 20px; */

    /* overflow: hidden; */
    /* @media (max-width: 700px) {
        padding: 15px 30px 30px;
    }
    @media (max-width: 500px) {
        padding: 5px 25px 25px;
    } */
`;
const Card = styled.div`
    /* background-color: #f0f0f0; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e4e4e4;
    @media (max-width: 640px) {
    }
    @media (max-width: 500px) {
        margin-bottom: 15px;
    }
    @media (max-width: 480px) {
        margin-bottom: 15px;
        padding-bottom: 20px;
    }
`;
const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 60%;
`;
const Badge = styled.img`
    position: absolute;
    left: -24px;
    top: -1px;
    z-index: 1;
    @media (max-width: 1400px) {
        width: 120px;
    }
    @media (max-width: 900px) {
        width: 100px;
        left: -17px;
    }
`;
const Offer = styled.div`
    position: absolute;
    left: 12px;
    top: 4px;
    color: #51a471;
    font-family: "gordita_medium";
    font-size: 14px;
    z-index: 1;
    @media (max-width: 1400px) {
        left: 8px;
        top: 2px;
    }
    @media (max-width: 900px) {
        left: 5px;
        top: 0px;
        font-size: 13px;
    }
`;
const VideoImage = styled.img`
    width: 100%;
    display: block;
`;
const Right = styled.div`
    width: 30%;
    @media (max-width: 480px) {
        width: 40%;
        margin-left: 10px;
    }
    @media (max-width: 360px) {
        width: 50%;
        margin-left: 10px;
    }
`;
const Title = styled.p`
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    font-size: 14px;
    font-family: "gordita_medium";
    word-wrap: break-word;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -ms-line-clamp: 2;
    line-height: 1.3rem;
    margin-left: 10px;
`;
const Price = styled.div`
    display: flex;
    align-items: center;
`;
const Actual = styled.span`
    margin-right: 10px;
    font-family: "gordita_medium";
    font-size: 20px;
    @media (max-width: 380px) {
        font-size: 18px;
    }
`;
const Discount = styled.p`
    text-decoration: line-through;
`;
const PriceConatiner = styled.div`
    margin-top: 15px;
    border-radius: 5px;
`;
const List = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;
const Pricee = styled.p`
    font-size: 15px;
    font-family: gordita_medium;
    @media all and (max-width: 360px) {
        font-size: 15px;
    }
`;
const Rate = styled.p`
    font-size: 17px;
    font-family: gordita_medium;
    color: #3f3f3f;
    @media all and (max-width: 360px) {
        font-size: 16px;
    }
`;
const Total = styled.span`
    font-family: "gordita_regular";
    font-size: 13px;
    color: #7b7b7b;
    @media (max-width: 380px) {
        font-size: 16px;
    }
`;
const TotalRate = styled.span`
    font-family: "gordita_medium";
    font-size: 38px;
    display: block;
    @media (max-width: 380px) {
        font-size: 28px;
    }
`;
const Purchase = styled.div`
    background: #e2f5ef;
    margin-top: 20px;
    border: radius;
    border-radius: 5px;
    padding: 15px;
    @media (max-width: 500px) {
        padding: 12px;
        margin-top: 15px;
    }
`;
const PurchaseCon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;
const FloatingIcon = styled.div`
    display: block;
    position: relative;
`;
const FloatingIcons = styled.div`
    cursor: ${(props) =>
        props.status === "active" ? "not-allowed" : "pointer"};
    /* position: relative;
    span {
        position: absolute;
        top: 0;
        left: 0;
        color: red;
    } */
`;
const Circle = styled.span`
    height: 14px;
    width: 14px;
    background-color: #fff;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: ${(props) => (props.status === "active" ? "20px" : "6px")};
    top: 4px;
    transition: 0.5s;
`;
const Span = styled.span`
    height: 22px;
    width: 40px;
    background-color: ${(props) =>
        props.status === "active" ? "#0fa76f" : "#00000029"};
    border-radius: 40px;
    display: inline-block;
    border: 1px solid #fff;
`;

const PurchaseTitle = styled.p`
    color: #0fa76f;
    font-family: "gordita_medium";
    margin-right: 10px;
    font-size: 18px;
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const BalanceCon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Balance = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 5px;
`;
const Para = styled.p`
    font-size: 14px;
    color: #000;
    margin-right: 5px;

    @media (max-width: 380px) {
        font-size: 13px;
    }
`;
const Coins = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CoinImage = styled.img`
    width: 20px;
    margin-right: 5px;
    @media (max-width: 380px) {
        width: 17px;
    }
`;
const CoinImg = styled.img`
    width: 30px;
    margin-right: 5px;
    @media (max-width: 380px) {
        width: 25px;
    }
`;
const Coin = styled.span`
    color: #000;
    font-size: 16px;
    font-family: "gordita_medium";
    transform: translateY(3px);
`;
const TotalCoin = styled.span`
    color: #000;
    font-size: 20px;
    font-family: "gordita_medium";
    transform: translateY(3px);
    @media (max-width: 380px) {
        font-size: 18px;
    }
`;
const Button = styled.div`
    cursor: ${(props) => (props.status ? "not-allowed" : "pointer")};
    height: 50px;
    display: block;
    background-color: ${(props) => (props.status ? "#868686" : "#0fa76f")};
    color: #ffff;
    border-radius: 0;
    font-family: "gordita_medium";
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0px;
    /* margin: 0 30px; */
    left: 0;
    right: 0;
    font-size: 18px;

    @media (max-width: 500px) {
        padding: 10px 20px;
        margin-top: 20px;
    }
    @media (max-width: 380px) {
        font-size: 16px;
    }
`;
const ButtonSpan = styled.span`
    margin-right: 7px;
`;
const TotalCont = styled.div`
    display: flex;
    align-items: center;
`;
const TotalAmount = styled.div`
    color: #ffff;
    font-family: "gordita_medium";
`;
const TotalImage = styled.img`
    width: 16px;
    margin-right: 2px;
`;

//styles add for new vocher appling section

const TopPrice = styled.div`
    border-bottom: 1px dashed #e4e4e4;
    padding: 20px 0;
    padding-bottom: 30px;
    margin-bottom: 20px;
    position: relative;
    @media all and (max-width: 360px) {
        padding: 10px 0;
    }
`;
const VoucherCard = styled.div`
    position: relative;
    background: #fff;
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #eaf8f0;
    border-radius: 5px;
    padding: 0 15px;

    @media all and (max-width: 360px) {
        padding: 10px 10px;
    }
`;
const VoucherIcon = styled.span`
    width: 20px;
    min-width: 20px;
    display: block;
    margin-right: 15px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        width: 20px;
        min-width: 20px;
    }
`;
const VoucherInput = styled.input`
    flex: 100%;

    font-size: 14px;
    overflow: scroll;
    color: #000;
    margin-right: 10px;
    font-family: "gordita_medium";
    &::placeholder {
        font-family: "gordita_regular";
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const ApplyButton = styled.span`
    font-size: 14px;
    font-family: "gordita_medium";
    color: #0fa76f;
    /* height: 30px; */
    width: 80px;
    cursor: pointer;
    @media all and (max-width: 360px) {
        font-size: 14px;
    }

    &:hover {
        opacity: 0.8;
    }
`;
const AppliedVoucher = styled.p`
    flex: 1;
    font-size: 18px;
    color: #000000;
    font-family: "gordita_medium";
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Remove = styled.span`
    display: block;
    font-size: 13px;
    color: red;
    font-family: "gordita_regular";
    cursor: pointer;
    margin-left: 10px;
`;

const ErrorMessage = styled.p`
    position: absolute;
    left: -13px;
    bottom: -23px;
    display: block;
    font-size: 13px;
    color: red;
    font-family: "gordita_regular";
    cursor: pointer;
    margin-left: 10px;
`;

const BgCover = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* min-height: 100%; */
    background-color: #f4f9ec;
    padding: 30px;
    border-radius: 20px;
    /* border: 1px solid #eeeded; */
    margin-bottom: 30px;
    width: 100%;
    overflow: hidden;
    @media all and (max-width: 360px) {
        padding: 20px;
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

const TotalPay = styled.div`
    padding: 30px 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: 360px) {
        padding: 20px 0 10px 0;
    }
`;

const RightTotal = styled.div``;
const LeftTotal = styled.div``;

const Icon = styled.span`
    display: block;
    width: 50px;
    min-width: 40px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        display: none;
    }
`;
const Date = styled.p`
    color: #4b4c4acc;
    font-family: gordita_regular;
    font-size: 13px;
`;
const Label = styled.span`
    font-size: 13px;
    color: #4b4c4a99;
    font-family: gordita_regular;
`;
const ImageCover = styled.span`
    display: block;
    width: 40px;
    margin-right: 10px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        width: 30px;
    }
`;
