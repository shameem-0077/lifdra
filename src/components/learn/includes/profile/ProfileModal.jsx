import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ModalLoader from "./ModalLoader";

export default function ProfileModel({
    selectedModal,
    isModal,
    handleModal,
    succesModal,
    successMessage,
    statusData,
}) {
    //outside click
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleModal();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [value, setValue] = useState("");
    const onChange = (e) => {
        if (selectedModal.type === "name") {
            let c_value = e.target.value;
            let n_value = c_value.replace(/[^A-Za-z, " "]/gi, "");
            setValue(n_value);
        } else {
            setValue(e.target.value);
        }
    };

    useEffect(() => {
        setValue(selectedModal.value);
    }, [selectedModal]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            selectedModal.submit_action(value);
        }
    };
    if (isModal && succesModal) {
        return (
            <Container>
                <Box ref={wrapperRef}>
                    <Content style={{ textAlign: "center" }}>
                        <SuccessImage
                            style={{ margin: "0 auto 26px", width: "63%" }}
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/success.svg"
                            alt=""
                        />
                        <Title>Success!</Title>
                        <Description>{successMessage}</Description>

                        <SubmitButton
                            style={{ margin: "0 auto" }}
                            onClick={() => {
                                handleModal("success");
                            }}
                        >
                            Done
                        </SubmitButton>
                    </Content>
                </Box>
            </Container>
        );
    } else if (isModal) {
        return (
            <Container>
                <Box ref={wrapperRef}>
                    <Image src={selectedModal.image} />
                    <Content>
                        <Title>{selectedModal.title}</Title>
                        <Description>{selectedModal.description}</Description>
                        <InputContainer>
                            <InputIcon src={selectedModal.icon} />
                            <InputField
                                placeholder={selectedModal.placeholder}
                                value={value}
                                onChange={(e) => onChange(e)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            ></InputField>
                        </InputContainer>
                        {statusData.is_error && (
                            <Error>{statusData.error_message}</Error>
                        )}
                        <SubmitButton
                            onClick={() => {
                                selectedModal.submit_action(value);
                            }}
                        >
                            {statusData.isLoading ? (
                                <ModalLoader />
                            ) : (
                                selectedModal.button_text
                            )}
                        </SubmitButton>
                    </Content>
                </Box>
            </Container>
        );
    }
    return null;
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5100;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
const Box = styled.div`
    width: 880px;
    border-radius: 9px;
    height: 530px;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/images/profile/bg-wave.svg")
        #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position-y: -51px;
    background-repeat: no-repeat;
    @media (max-width: 980px) {
        width: 729px;
        height: 472px;
    }
    @media (max-width: 768px) {
        width: 596px;
        height: 373px;
        position: relative;
        justify-content: unset;
        padding: 0 60px;
    }
    @media (max-width: 640px) {
        padding: 56px 43px;
        width: 461px;
        height: unset;
        position: relative;
    }
    @media (max-width: 480px) {
        width: 432px;
        padding: 47px 34px;
    }
    @media (max-width: 436px) {
        width: 405px;
        padding: 45px 33px;
    }
    @media (max-width: 400px) {
        width: 347px;
        padding: 45px 30px;
    }
`;
const Image = styled.img`
    display: block;
    width: 25%;
    margin-right: 51px;
    @media (max-width: 768px) {
        position: absolute;
        top: 26px;
        right: 82px;
        margin-right: 0;
    }
    @media (max-width: 640px) {
        display: none;
    }
    @media (max-width: 480px) {
    }
`;
const Content = styled.div`
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const Title = styled.h4`
    font-size: 25px;
    @media (max-width: 640px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    width: 400px;
    margin: 15px 0 27px;
    color: #676767;
    @media (max-width: 768px) {
        margin: 7px 0 21px;
        width: 60%;
    }
    @media (max-width: 640px) {
        width: 100%;
    }
`;
const InputContainer = styled.div`
    width: 80%;
    border: 1px solid #676767;
    padding: 0 20px;
    border-radius: 6px;
    height: 43px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const InputIcon = styled.img`
    margin-right: 15px;
    @media (max-width: 640px) {
        width: 16px;
    }
`;
const InputField = styled.input`
    font-size: 16px;
    letter-spacing: 0.07rem;
    width: 100%;
    @media (max-width: 640px) {
        width: 106.666666667%;
        padding-left: 10.66667px;
        font-size: 16px;
        transform: scale(0.9375);
        transform-origin: left top;
    }
`;
const Error = styled.p`
    color: red;
    margin-top: 5px;
    font-size: 14px;
`;
const SubmitButton = styled.span`
    cursor: pointer;
    background: #5dc971;
    border-radius: 6px;
    height: 43px;
    width: 80%;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    letter-spacing: 0.07rem;
    font-size: 16px;
    font-family: "product_sansbold";
    margin-top: 20px;
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (max-width: 640px) {
        margin-top: 15px;
    }
`;
const SuccessImage = styled.img`
    display: block;
    width: 25%;
    margin-right: 51px;
    @media (max-width: 768px) {
    }
    @media (max-width: 640px) {
        width: 48% !important;
    }
    @media (max-width: 480px) {
    }
`;
