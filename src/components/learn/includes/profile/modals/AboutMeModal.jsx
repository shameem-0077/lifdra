import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";

export default function AboutMeModal({ bio, isOffline }) {
    const {
        user_data: { access_token },
        isNewUpdateModal,
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
    };
    const [aboutMetext, setAboutMeText] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const inputText = event.target.value;
        if (inputText.charAt(0) === " ") {
            return;
        } else if (inputText.length <= 600) {
            setAboutMeText(inputText);
        }
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(aboutMetext);
    };

    const handlePaste = async () => {
        const clipboardText = await navigator.clipboard.readText();
        setAboutMeText(clipboardText);
    };

    useEffect(() => {
        setAboutMeText(bio);
    }, [bio, isNewUpdateModal]);

    const handleSuccess = () => {
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "success",
        });
    };

    const updateUserBio = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (aboutMetext && aboutMetext !== bio) {
            setLoading(true);
            serverConfig
                .post(
                    "api/v1/users/update-biodata/",
                    { about_me: aboutMetext },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((reponse) => {
                    const { status_code, data } = reponse.data;
                    if (status_code === 6000) {
                        handleSuccess();
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {});
        }
    };

    const [innerHeight, setInnerHeight] = useState("");

    useEffect(() => {
        if (!innerHeight) {
            setInnerHeight(window?.innerHeight);
        }
    }, []);

    return (
        <>
            <Modal height={innerHeight}>
                <TitleBox>
                    <TitleLeft>
                        <Titles>About me</Titles>
                        <SubTitle>
                            Write a brief description about yourself
                        </SubTitle>
                    </TitleLeft>
                    <CloseDiv onClick={handleClose}>
                        <img
                            src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                            alt=""
                        />
                    </CloseDiv>
                </TitleBox>
                <MiddleBox>
                    <DescriptionHeading>Description*</DescriptionHeading>
                    <DescriptionBox
                        placeholder="Type here...."
                        value={aboutMetext}
                        onChange={handleChange}
                        selected={aboutMetext}
                    >
                        <div>
                            <button onClick={handleCopy}>Copy</button>
                            <button onClick={handlePaste}>Paste</button>
                        </div>
                    </DescriptionBox>
                    <DescriptionLabel>
                        Max 600 characters. <span>{aboutMetext?.length}</span>
                        /600 used.
                    </DescriptionLabel>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </MiddleBox>

                <FooterBox>
                    <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                    <SaveBtn
                        onClick={updateUserBio}
                        aboutMetext={aboutMetext && aboutMetext !== bio}
                    >
                        {isLoading ? <RequestLoader height={24} /> : "Save"}
                    </SaveBtn>
                </FooterBox>
            </Modal>
        </>
    );
}

const Modal = styled.div`
    width: 550px;
    max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};

    /* overflow-y: scroll;
    overflow-x: hidden; */
    margin: 0 auto;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 10px;
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03),
        0px 20px 24px -4px rgba(16, 24, 40, 0.08);
    transition: 0.5s;
    z-index: 101;
    &::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 768px) {
        width: 550px;
    }
    @media all and (max-width: 640px) {
        width: 450px;
    }
    @media all and (max-width: 480px) {
        width: 90%;
        border-radius: none;
    }
    @media all and (max-width: 390px) {
        width: 90%;
    }
`;
const ErrorMessage = styled.span`
    font-size: 14px;
    color: red;
    font-family: "gordita_regular";
    position: absolute;
    bottom: 109px;
    right: 40px;

    @media (max-width: 640px) {
        font-size: 13px;
        bottom: 80px;
        right: 31px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px;
    border-bottom: 1px solid #eaecf0;
`;
const TitleLeft = styled.div``;
const Titles = styled.h4`
    font-family: "gordita_medium";
    color: #003c3c;
    font-size: 18px;
    margin-bottom: 5px;
`;
const SubTitle = styled.h4`
    font-family: "gordita_regular";
    font-size: 14px;
`;
const CloseDiv = styled.span`
    cursor: pointer;
    display: inline-block;
    width: 24px;
    img {
        width: 100%;
        display: block;
    }
`;
const MiddleBox = styled.div`
    padding: 25px;
`;
const DescriptionHeading = styled.h5`
    color: #344054;
    font-size: 14px;
    font-family: gordita_medium;
`;

const DescriptionBox = styled.textarea`
    border-radius: 8px;
    border: 1px solid var(--gray-300, #d0d5dd);
    background: #f9f9f9;
    color: #667085;
    resize: none;
    min-height: 150px;
    font-size: 16px;
    min-width: 114.285714286%;
    transform: scale(0.875);
    padding: 10px 15px;
    transform-origin: left;
    color: ${({ selected }) => (selected ? "#101828" : "#101828")};
`;
const DescriptionLabel = styled.h6`
    font-size: 12px;
    color: #667085;
    font-family: "gordita_regular";
    span {
        color: #1ea027;
    }
`;
const FooterBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-radius: 0px 0px 12px 12px;
    background: #fff;
    /* box-shadow: 0px -4px 10px 7px rgba(0, 0, 0, 0.04); */
`;
const SaveBtn = styled.span`
    text-align: center;
    padding: 10px 20px;
    border-radius: 7px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    color: #fff;
    font-family: "gordita_medium";
    cursor: ${({ aboutMetext }) => (aboutMetext ? "pointer" : "not-allowed")};
    background: ${({ aboutMetext }) =>
        aboutMetext
            ? "linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%)"
            : "grey"};
    min-width: 48%;
    font-size: 16px;
    min-height: 44px;
`;
const CancelBtn = styled.span`
    text-align: center;
    padding: 10px 20px;
    color: #344054;
    border-radius: 7px;
    cursor: pointer;
    border: 1px solid #d0d5dd;
    font-family: "gordita_medium";
    min-width: 48%;
    font-size: 16px;
    min-height: 44px;
`;
