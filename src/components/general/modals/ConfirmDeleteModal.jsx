import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImage from "../../../../../assets/images/web/close.svg";
import RequestLoader from "../../authentications/components/RequestLoader";

function ConfirmDeleteModal({
    onDelete,
    isLoading,
    setDeleteModal,
    text,
    heading,
}) {
    return (
        <>
            <BackContainer>
                <Modal>
                    <TitleSection>
                        <Title>{heading ? heading : "Delete Guardian"}</Title>
                        <Close onClick={() => setDeleteModal(false)}>
                            <img src={closeImage} alt="Close" />
                        </Close>
                    </TitleSection>
                    <InputDescription>
                        {text ? text : "Are you sure you want to delete?"}
                    </InputDescription>
                    <ButtonContainer>
                        <Cancel onClick={() => setDeleteModal(false)}>
                            Cancel
                        </Cancel>
                        <Delete
                            onClick={() => {
                                onDelete();
                            }}
                        >
                            {isLoading ? (
                                <RequestLoader height={20} />
                            ) : (
                                "Delete"
                            )}
                        </Delete>
                    </ButtonContainer>
                </Modal>
            </BackContainer>
        </>
    );
}

export default ConfirmDeleteModal;

const BackContainer = styled.div`
    position: fixed;
    transition: all 0.3s ease;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    left: 0;
    top: 0px;
    backdrop-filter: blur(4px);
    position: relative;
    position: fixed;

    &.active {
        transform: scale(1);
    }
`;
const Modal = styled.div`
    width: 700px;
    max-height: 90vh;
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 38px;
    border-radius: 10px;
    transition: all 0.4s ease;
    z-index: 101;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 550px;

    @media (max-width: 560px) {
        max-width: 400px;
    }
    @media (max-width: 450px) {
        max-width: 350px;
        padding: 35px;
    }
    @media (max-width: 480px) {
        max-width: 350px;
        padding: 25px;
    }
    @media (max-width: 390px) {
        max-width: 300px;
    }
`;
const InputDescription = styled.p`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    align-self: baseline;
    font-size: 16px;
    color: #333333;
    span {
        color: green;
    }
    p {
    }
    @media (max-width: 560px) {
        width: 100%;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const Close = styled.span`
    width: 15px;
    display: block;
    cursor: pointer;
    position: absolute;
    right: 28px;
    top: 28px;
    img {
        display: block;
        width: 100%;
    }
    @media (max-width: 480px) {
        right: 18px;
        top: 15px;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    position: relative;
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    @media (max-width: 480px) {
        justify-content: center;
    }
`;
const Cancel = styled.span`
    border: 1px solid #d0d5dd;
    padding: 8px 30px;
    margin-right: 10px;
    display: block;
    border-radius: 5px;
    font-size: 14px;
    font-family: "gordita_medium";
    cursor: pointer;
    min-width: 107px;
    @media (max-width: 480px) {
        width: 50%;
        text-align: center;
    }
`;
const Delete = styled.span`
    font-size: 14px;
    background: #d92d20;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    color: #fff;
    padding: 8px 30px;
    cursor: pointer;
    min-width: 107px;

    @media (max-width: 480px) {
        width: 50%;
        text-align: center;
    }
`;

const TitleSection = styled.div`
    padding-bottom: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 480px) {
        padding-bottom: 16px;
    }
`;
const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 18px;
    color: #000;
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
