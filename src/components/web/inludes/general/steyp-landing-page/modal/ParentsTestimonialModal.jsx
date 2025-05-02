import React, { useEffect } from "react";
import styled from "styled-components";
import $ from "jquery";
import quotes from "../../../../../../assets/images/web/test.svg";

const ParentsTestimonialModal = ({ data, isModal, handleModal }) => {
    useEffect(() => {
        if (isModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isModal]);
    return (
        <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
            <Overlay onClick={handleModal}></Overlay>
            <Modal>
                <Cover>
                    <TestimonialsCard>
                        <Name>{data.parent_name}</Name>
                        <Designation>Parent of {data.student_name} </Designation>
                        <Review>{data.message}</Review>
                    </TestimonialsCard>
                </Cover>
                <Close onClick={handleModal}>
                    <img
                        src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/close-icon-gray.svg"
                        }
                        alt=""
                    />
                </Close>
            </Modal>
        </BackContainer>
    );
};

export default ParentsTestimonialModal;

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
    width: 650px;
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
        width: 650px;
    }
    @media all and (max-width: 768px) {
        width: 600px;
        padding: 40px;
    }
    @media all and (max-width: 640px) {
        width: 450px;
        padding: 30px;
    }
    @media all and (max-width: 480px) {
        width: 350px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;
const TestimonialsCard = styled.div`
    background-color: #fff;
`;
const Name = styled.h4`
    font-size: 24px;
    font-family: gordita_medium;
    color: #2d2d2d;
    text-align: center;
    /* margin-top: 40px; */

    @media all and (max-width: 480px) {
        font-size: 22px;
    }
`;
const Designation = styled.p`
    font-size: 14px;
    margin-bottom: 30px;
    text-align: center;
    margin-bottom: 50px;
    @media all and (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 35px;
    }
`;
const Review = styled.p`
    font-size: 14px;
    position: relative;
    text-align: center;
    &::before {
        content: url(${quotes});
        position: absolute;
        left: 0;
        top: -24px;
        color: #2d2d2d;
        width: 10px;
        display: block;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const Cover = styled.div`
    overflow-y: scroll;
    max-height: calc(90vh - 100px);
    padding-right: 10px;
    margin-right: -10px;
    &::-webkit-scrollbar {
        width: 5px;
        margin-left: 10px;
        border: none;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background: #afafaf;
        border-radius: 3px;
    }
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
