import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import ResponseModal from "./ResponseModal";
import { useSelector } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";

const AdmissionPreviewModal = ({
    isPreviewModal,
    setPreviewModal,
    name,
    handleKeyDown,
    email,
    phone,
    selectedGender,
    idCardFront,
    idCardFrontName,
    idCardBack,
    idCardBackName,
    campus_data,
}) => {
    const [isError, setError] = useState(false);
    const [isBackError, setBackError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isResponseModal, setResponseModal] = useState(false);
    const handleClick = () => setChecked(!checked);
    const user_data = useSelector((state) => state.user_data);
    const user_profile = useSelector((state) => state.user_profile);

    //to clear error on open
    useEffect(() => {
        setError(false);
        setBackError(false);
    }, [isPreviewModal]);

    const submitForm = () => {
        let { access_token } = user_data;
        setLoading(true);

        if (checked && idCardFront) {
            const formData = new FormData();

            formData.append("email", email);
            formData.append("gender", selectedGender);
            formData.append("campus_id_front_side", idCardFront);

            user_profile.student_category !== "Graduates" &&
                formData.append("campus_name", campus_data.name);

            formData.append("campus_id_back_side", idCardBack);

            accountsConfig
                .post("/api/v1/users/campus-verification/create/", formData, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    const { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setLoading(false);
                        setError(false);
                        setPreviewModal(false);
                        setResponseModal(true);
                        setBackError(false);
                    } else if (StatusCode === 6001) {
                        setError(false);
                        setBackError(true);
                        setPreviewModal(false);
                        setResponseModal(true);
                    }
                })
                .catch((error) => {
                    setError(true);
                    setPreviewModal(false);
                    setBackError(true);
                    setBackError(false);
                });
        } else {
            setError(true);
            setBackError(false);
        }
    };

    //to prevent background scroll
    useEffect(() => {
        if (isPreviewModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isPreviewModal]);

    const [height, setHeight] = useState(window.innerHeight);

    return (
        <>
            <ResponseModal
                isSuccessModal={isSuccessModal}
                setSuccessModal={setSuccessModal}
            />
            <BackContainer
                style={{ transform: isPreviewModal && "scale(1,1)" }}
            >
                <Overlay></Overlay>

                <Modal>
                    <div>
                        <TitleSection>
                            <Title> Confirm Admission Form</Title>
                            <Close onClick={() => setPreviewModal(false)}>
                                <img
                                    src={require("../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                                    alt=""
                                />
                            </Close>
                        </TitleSection>
                        <FormCover>
                            <FormSection height={height}>
                                <SectionTitle>Personal Data</SectionTitle>
                                <ProfilePic>
                                    <img
                                        src={require("../../../../../assets/images/admission/profile.png")}
                                        alt="Profile image"
                                    />
                                </ProfilePic>
                                <Form>
                                    <Cover>
                                        <InputName for="name">
                                            Full Name
                                        </InputName>
                                        <InputSection
                                            value={name}
                                            onKeyDown={handleKeyDown}
                                            // onChange={(e) =>
                                            //     setName(e.target.value)
                                            // }
                                        ></InputSection>
                                    </Cover>
                                    <Cover>
                                        <InputName for="phone">
                                            Phone Number
                                        </InputName>

                                        <InputSection
                                            value={phone}
                                            onKeyDown={handleKeyDown}
                                            // onChange={(e) =>
                                            //     setPhone(e.target.value)
                                            // }
                                        ></InputSection>
                                    </Cover>
                                    <Cover>
                                        <InputName for="email">Email</InputName>

                                        <InputSection
                                            value={email}
                                            onKeyDown={handleKeyDown}
                                            // onChange={(e) =>
                                            //     setEmail(e.target.value)
                                            // }
                                        ></InputSection>
                                    </Cover>
                                    <Cover>
                                        <InputName for="gender">
                                            Gender
                                        </InputName>

                                        <InputSection
                                            value={selectedGender}
                                            onKeyDown={handleKeyDown}
                                            // onChange={(e) =>
                                            //     setSelectedGender(
                                            //         e.target.value
                                            //     )
                                            // }
                                        ></InputSection>
                                    </Cover>
                                </Form>
                                <SectionCard>
                                    <SectionTitle>
                                        Educational Data
                                    </SectionTitle>
                                    <SectionLine></SectionLine>
                                </SectionCard>

                                <Form>
                                    <Cover>
                                        <InputName for="institute">
                                            Institute
                                        </InputName>

                                        <InputSection
                                            value={campus_data.name}
                                            onKeyDown={handleKeyDown}
                                            // onChange={(e) =>
                                            //     setInstitute(e.target.value)
                                            // }
                                        ></InputSection>
                                    </Cover>

                                    <Cover>
                                        <InputName for="idcardFront">
                                            Uploaded ID card
                                        </InputName>
                                        <IDCardCover>
                                            <InputSection
                                                className="icdard"
                                                value={idCardFrontName}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <InputSection
                                                className="icdard"
                                                value={idCardBackName}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </IDCardCover>
                                    </Cover>

                                    <Cover>
                                        <InputSection
                                            onClick={handleClick}
                                            checked={checked}
                                            type="checkbox"
                                        ></InputSection>
                                        <Text>
                                            I here by declaring all the above
                                            details are true.
                                        </Text>
                                    </Cover>
                                </Form>
                            </FormSection>
                        </FormCover>

                        <ButtonSection>
                            <SkipNow onClick={() => setPreviewModal(false)}>
                                Edit
                            </SkipNow>
                            <Submit onClick={submitForm}>Save</Submit>
                        </ButtonSection>
                        {isError && (
                            <ErrorMessage>
                                Please check the box if you want to proceed.
                            </ErrorMessage>
                        )}
                        {isBackError && (
                            <ErrorMessage>
                                {" "}
                                ID card already applied
                            </ErrorMessage>
                        )}
                    </div>

                    <BottomLine></BottomLine>
                </Modal>
            </BackContainer>
        </>
    );
};

export default AdmissionPreviewModal;
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
    width: 700px;
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
    max-width: ${(props) =>
        props.type === "verify"
            ? "600px"
            : props.type === "phone_verfication_failed"
            ? "600px"
            : "700px"};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media all and (max-width: 980px) {
        width: 650px;
    }
    @media all and (max-width: 768px) {
        width: 600px;
        padding: 40px;
    }
    @media all and (max-width: 640px) {
        width: 460px;
    }
    @media all and (max-width: 480px) {
        width: 350px;
        padding: 20px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;

const Close = styled.span`
    display: block;
    width: 15px;
    cursor: pointer;
    img {
        display: block;
        width: 100%;
    }
`;
const BottomLine = styled.span`
    display: block;
    width: 100%;
    border-top: 7px solid #5ac78b;
    border-bottom: 7px solid #459e7b;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const TitleSection = styled.div`
    padding-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid#e7e6e6;
`;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 20px;
`;
const FormCover = styled.div`
    margin: 20px 0 5px 0;
`;
const FormSection = styled.div`
    padding-bottom: 0;
    margin-right: -5px;
    overflow-y: scroll;
    max-height: ${(props) => props.height - 280 + "px"};
    &::-webkit-scrollbar {
        width: 5px;
        margin-left: 10px;
        border: none;
    }
    &::-webkit-scrollbar-track {
        background: #f9f9fb;
    }
    &::-webkit-scrollbar-thumb {
        background: #4ba870;
        border-radius: 3px;
    }
    @media all and (max-width: 768px) {
        max-height: ${(props) => props.height - 270 + "px"};
        grid-template-columns: 1fr;
    }
`;

const SectionCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const SectionTitle = styled.h3`
    font-family: "gordita_medium";
    font-size: 16px;
    width: 30%;
    @media all and (max-width: 640px) {
        width: 40%;
    }
    @media all and (max-width: 480px) {
        width: 68%;
    }
`;
const SectionLine = styled.div`
    width: 70%;
    border: 1px solid#e7e6e6;
    margin-right: 10px;
    @media all and (max-width: 640px) {
        width: 65%;
    }
`;
const ProfilePic = styled.div`
    width: 90px;
    height: 90px;
    min-width: 50px;
    min-height: 50px;
    padding: 5px;
    border: 1px solid #e9e9e9;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 5px;

    img {
        display: block;
        width: 100%;
        border-radius: 50%;
    }
`;

const Form = styled.form`
    margin: 25px 0 25px 0;
`;
const InputName = styled.label`
    font-size: 14px;

    color: #2d2d2d;
    font-family: gordita_regular;
    width: 30%;
    @media all and (max-width: 980px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        width: 40%;
    }
`;

const InputSection = styled.input`
    display: block;
    width: ${(props) =>
        props.type === "checkbox"
            ? "14px"
            : props.type === "button"
            ? "50%"
            : "70%"};

    padding: 0 20px;
    height: 45px;
    height: ${(props) => (props.type === "checkbox" ? "14px" : "45px")};

    border: 1px solid#e7e6e6;
    border-radius: 5px !important;
    background: ${(props) => (props.checked ? "#5ac78b" : "#f9f9f9")};
    font-size: 14px;
    font-family: gordita_regular;
    margin-right: ${(props) => (props.type === "button" ? "10px" : "0")};
    color: #7c7c7c;
    :last-child {
        margin-right: 0;
        margin-bottom: 0;
    }
    &::placeholder {
        font-size: 14px;
        color: #acacac;
        /* font-family: gordita_medium; */
    }
    &.icdard {
        width: 48%;
        @media all and (max-width: 640px) {
            width: 100%;
        }
    }
    @media (max-width: 980px) {
        height: ${(props) => (props.type === "checkbox" ? "14px" : "40px")};
    }
    @media all and (max-width: 640px) {
        width: ${(props) =>
            props.type === "checkbox"
                ? "14px"
                : props.type === "button"
                ? "100%"
                : "70%"};
        margin-right: 0;
        margin-bottom: ${(props) => (props.type === "button" ? "10px" : "0")};
    }
    @media all and (max-width: 480px) {
        &::placeholder {
            font-size: 13px;
        }
        font-size: 13px;
        padding: 0 15px;
    }
    @media all and (max-width: 360px) {
        height: ${(props) => (props.type === "checkbox" ? "18px" : "45px")};
    }
`;

const Cover = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-right: 10px;
    @media all and (max-width: 480px) {
        align-items: flex-start;
    }
`;
const IDCardCover = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 10px;
    width: 70%;

    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

const ButtonSection = styled.div`
    /* height: 80px; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    @media all and (max-width: 480px) {
        padding: 0 20px 20px;
    }
    @media all and (max-width: 360px) {
        padding: 0 20px 40px;
    }
`;
const Text = styled.p`
    margin-left: 10px;
    @media all and (max-width: 480px) {
        width: 80%;
        transform: translateY(-6px);
    }
`;

const SkipNow = styled.span`
    width: 150px;
    height: 45px;
    background-color: #f9f9f9;
    color: #393939;
    font-size: 16px;
    font-family: gordita_medium;
    border: 1px solid#e7e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    @media all and (max-width: 980px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        /* margin-top: 30px; */
    }
`;
const Submit = styled.span`
    width: 150px;
    height: 45px;
    font-size: 16px;
    margin-left: 30px;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 980px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
    }
`;
const ErrorMessage = styled.p`
    position: absolute;
    bottom: 21px;
    right: 70px;
    font-size: 10px;
    font-family: gordita_regular;
    color: red;
    @media all and (max-width: 768px) {
        right: 58px;
    }
    @media all and (max-width: 480px) {
        right: 45px;
    }
    @media all and (max-width: 480px) {
        bottom: 13px;
    }
`;
