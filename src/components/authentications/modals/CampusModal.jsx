import React, { useState, useEffect } from "react";
import styled from "styled-components";
import $ from "jquery";
import SignupLoader from "../../general/loaders/SignupLoader";

function CampusModal({ campusData }) {
    return (
        <>
            {campusData?.redirect_url && (
                <BackContainer className="success-modal">
                    <Overlay>
                        <Modal>
                            <Loader>
                                <SignupLoader />
                            </Loader>
                            <Paragraph>
                                Your account already exist in campus{" "}
                                <span>{campusData.name}.</span>
                                Redirecting to{" "}
                                <span className="medium">
                                    {campusData.name}
                                </span>{" "}
                                account
                            </Paragraph>
                        </Modal>
                    </Overlay>
                </BackContainer>
            )}
        </>
    );
}

export default CampusModal;
const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    // transform: scale(0, 0);
    width: 100%;
    height: 100vh;
    z-index: 10000;
    left: 0;
    top: 0px;
    backdrop-filter: blur(6px);
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
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px;
    border-radius: 10px;
    transition: 0.5s;
    z-index: 101;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 700px;
    @media (max-width: 980px) {
        max-width: 550px;
    }

    @media (max-width: 640px) {
        max-width: 500px;
    }
    @media (max-width: 540px) {
        max-width: 400px;
        padding: 35px;
    }
    @media (max-width: 480px) {
        max-width: 350px;
    }
    @media (max-width: 360px) {
        max-width: 300px;
    }
`;
const VideoSection = styled.div`
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
`;
const Loader = styled.div`
    width: 100px;
    margin: 0 auto;
    margin-bottom: 12px;
`;
const Paragraph = styled.p`
    text-align: center;
    font-size: 15px;
    font-family: gordita_regular;
    span {
        font-family: gordita_medium;
        &.medium {
            font-family: gordita_medium;
        }
    }
`;
