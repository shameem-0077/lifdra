import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../store/authStore";
import { serverConfig } from "../../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { getDateStr } from "../../../helpers/functions";
import loader from "../../../../assets/lotties/modal/buttonloader.json";
import Lottie from "react-lottie";

const PaymentStatusModal = (props) => {
    const { user_data, updateUserData } = useAuthStore();
    const navigate = useNavigate();
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [date, setDate] = useState(false);

    const lottieDefaultOptions = {
        loop: false,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };

    useEffect(() => {
        let d = String(new window.Date());
        let date = d.split(" ");
        setDate(date[2] + " " + date[1] + " " + date[3]);
    }, []);

    const handleClose = () => {
        props.setShow(false);
        props.closeModal();
    };

    const handleSuccess = () => {
        setButtonLoading(true);
        let access_token = user_data.access_token;
        primeprogramsConfig
            .post(
                `learning/course/${props.course_id}/purchase/`,
                {
                    coupon_id: props.couponId,
                },
                {
                    headers: { Authorization: `Bearer ${access_token}` },
                }
            )
            .then((res) => {
                let { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    updateUserData({
                        ...user_data,
                        total_purchased_coins: data.total_purchased_coins,
                    });
                    props.setShow(false);
                    props.closeModal();
                    navigate(`/learn/prime-programs/${props.courseSlug}`);
                }
            })
            .catch((err) => {
                console.log(err);
                setButtonLoading(false);
            });
    };

    return (
        <>
            <Overlay show={props.show} onClick={handleClose} />
            <ModalContainer show={props.show}>
                <Container>
                    <CloseButton onClick={handleClose}>
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
                    <Heading>Order Confirmation</Heading>
                    <CardContainer>
                        <BgCover>
                            <div>
                                <Card>
                                    <Left>
                                        <Icon>
                                            <img
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/basket.png"
                                                alt="icon"
                                            />
                                        </Icon>
                                        <Title>Course Purchase</Title>
                                    </Left>
                                    <Right>
                                        <Label>Purchased on</Label>
                                        <Date>{date}</Date>
                                    </Right>
                                </Card>
                                <PriceConatiner>
                                    <TopPrice>
                                        <List>
                                            <Pricee>Price</Pricee>
                                            <Rate>₹{props.courseDetails?.coins * 50}</Rate>
                                        </List>
                                        <LeftSpan></LeftSpan>
                                        <RightSpan></RightSpan>
                                    </TopPrice>
                                    <TotalPay>
                                        <LeftTotal>
                                            <Total>Total Payable</Total>
                                            <TotalRate>₹{props.courseDetails?.coins * 50}</TotalRate>
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
                </Container>
                <Button onClick={handleSuccess}>
                    {!isButtonLoading ? (
                        <ButtonSpan>Confirm Purchase</ButtonSpan>
                    ) : (
                        <Lottie
                            options={lottieDefaultOptions}
                            height={45}
                            width={45}
                        />
                    )}
                </Button>
            </ModalContainer>
        </>
    );
};

export default PaymentStatusModal;

const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 999;
`;

const ModalContainer = styled.div`
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
    display: ${props => props.show ? 'block' : 'none'};
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

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
`;

const CloseIcon = styled.img`
    width: 20px;
`;

const Bg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const BgImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Heading = styled.h4`
    font-size: 26px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const CardContainer = styled.div`
    margin-bottom: 20px;
`;

const BgCover = styled.div`
    position: relative;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
`;

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Title = styled.h5`
    font-size: 18px;
    font-family: "gordita_medium";
`;

const Right = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.p`
    font-size: 14px;
    color: #585858;
    margin-right: 10px;
`;

const Date = styled.p`
    font-size: 14px;
    color: #585858;
`;

const PriceConatiner = styled.div`
    margin-top: 10px;
`;

const TopPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const List = styled.div`
    display: flex;
    align-items: center;
`;

const Pricee = styled.p`
    font-size: 14px;
    color: #585858;
    margin-right: 10px;
`;

const Rate = styled.p`
    font-size: 14px;
    color: #585858;
`;

const LeftSpan = styled.div`
    flex-grow: 1;
`;

const RightSpan = styled.div`
    flex-grow: 1;
`;

const TotalPay = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const LeftTotal = styled.div`
    display: flex;
    flex-direction: column;
`;

const Total = styled.p`
    font-size: 14px;
    color: #585858;
    margin-bottom: 5px;
`;

const TotalRate = styled.p`
    font-size: 14px;
    color: #585858;
`;

const RightTotal = styled.div`
    display: flex;
    align-items: center;
`;

const ImageCover = styled.div`
    width: 40px;
    height: 40px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Button = styled.button`
    background-color: #15bf81;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    color: #fff;
    border: none;
`;

const ButtonSpan = styled.span`
    font-size: 16px;
`;
