import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { primeprogramsConfig } from "../../../../axiosConfig";

function StartNowModal({ isModal, setModal, course }) {
    const history = useHistory();
    const user_data = useSelector((state) => state.user_data);
    const [isLoading, setLoading] = useState(false);

    function StartCourse() {
        setLoading(true);
        primeprogramsConfig
            .get(`learning/start-course/${course.id}/`, {
                headers: {
                    Authorization: `Bearer ${user_data?.access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    history.push(`/prime-programs/${course.first_topic}/`);
                    setLoading(false);
                    setModal(false);
                } else if (StatusCode === 6001) {
                    setLoading(false);
                    setModal(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setModal(false);
            });
    }
    return (
        <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
            <Overlay onClick={() => setModal(false)}>
                <VoucherContainer>
                    <ModalTop>
                        <h2>Congratulations!</h2>
                    </ModalTop>
                    <ModalBottom>
                        {/* <Label>Saving with this coupon</Label> */}
                        <Description>
                            Learning new things keeps your mind active and alert
                        </Description>
                    </ModalBottom>
                    <VoucherButton onClick={StartCourse}>Next</VoucherButton>
                </VoucherContainer>
            </Overlay>
        </BackContainer>
    );
}

export default StartNowModal;
const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0px;
    background: rgba(0, 0, 0, 0.397);
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
        padding: 25px 30px;
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
    font-family: "gordita_regular";
    transform: translateY(-10px);
`;
const Description = styled.p`
    text-align: left;
    color: #585858;
    font-family: "gordita_regular";
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
