import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import badgeIcon from "../../../../assets/images/prime-program/apply-voucher/badge.svg";

function VoucherModal({ isVoucherModal, modalType, setVoucherModal, data, coupon }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <BackContainer style={{ transform: isVoucherModal && "scale(1,1)" }}>
            <Overlay
                onClick={(e) => {
                    // e.preventDefault();
                    setVoucherModal(false);
                }}
            >
                <VoucherContainer>
                    <ModalTop>
                        <VoucherIcon>
                            <img
                                src={badgeIcon}
                                alt=""
                            />
                        </VoucherIcon>
                        <h2>'{coupon}' Coupon Applied</h2>
                    </ModalTop>
                    <ModalBottom>
                        <CouponDiscountPrice>₹ {data.coin_value * 50}</CouponDiscountPrice>
                        <Label>Saving with this coupon</Label>
                        <Description>Hurray! You can now avail your discount.</Description>
                    </ModalBottom>
                    <VoucherButton
                        onClick={(e) => {
                            // e.preventDefault();
                            setVoucherModal(false);
                            // navigate(`${location.pathname}?action=buy-course`);
                        }}
                    >
                        Yay!
                    </VoucherButton>
                </VoucherContainer>
            </Overlay>
        </BackContainer>
    );
}

export default VoucherModal;
const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
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

const VoucherContainer = styled.div`
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
