import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function SuccessfullRegistered({ setProgarm, setHeadContent }) {
    const dispatch = useDispatch();
    return (
        <>
            <HeadSection>
                <VerifyIcon>
                    <img
                        src={require("../../../../../assets/images/school-scientist/Featured-icon.svg")}
                        alt=""
                    />
                </VerifyIcon>
                <Heading>Successfully Registered</Heading>
            </HeadSection>
            <Description>
                Thank you for your registration, first round quiz will conducted
                on <span>June 04, 2023.</span> Further details will be messaged
                to your registered phone number.
            </Description>
            <Bottom>
                <ModalButton
                    onClick={() => {
                        setProgarm(false);
                        setHeadContent("Select programme");
                        localStorage.removeItem("school_scientist_members");
                        dispatch({
                            type: "CLEAR_SS_MEMBERS",
                        });
                    }}
                >
                    Close
                </ModalButton>
            </Bottom>
        </>
    );
}

export default SuccessfullRegistered;
const Bottom = styled.div`
    display: flex;
    justify-content: end;
`;
const ModalButton = styled.button`
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    padding: 16px 44px;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    @media all and (max-width: 480px) {
        width: 90%;
        margin: 0 auto;
        padding: 13px 40px;
    }
`;
const HeadSection = styled.div`
    padding-bottom: 25px;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    align-items: center;
    @media all and (max-width: 480px) {
        padding-bottom: 18px;
    }
`;
const Description = styled.p`
    font-size: 18px;
    padding: 24px 0;
    span {
        color: #009262;
        font-size: 20px;
        font-weight: 600;
    }
    @media all and (max-width: 480px) { 
        font-size: 14px;
        span {
            font-size: 14px;
        }
    }
`;
const Heading = styled.h2`
    color: #003c3c;
    font-size: 24px;
    /* font-weight: 600; */
    margin-bottom: 8px;
    @media all and (max-width: 480px) {
        font-size: 20px;     
        margin-bottom: 0;  
    }
    @media all and (max-width: 320px) {
        font-size: 18px;       
    }
`;
const VerifyIcon = styled.div`
    width: 10%;
    margin-right: 12px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 320px) {
        width: 30%;        
    }
`;
