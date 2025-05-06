import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import Lottie from "react-lottie";
import "../../../../../../assets/css/web/style.css";

import loader from "../../../../../../assets/lotties/modal/loading_lottie.json";
import tick from "../../../../../../assets/lotties/web/sucess.json";
import error from "../../../../../../assets/lotties/web/error.json";
import greenloader from "../../../../../../assets/lotties/web/green_loader.json";
import { serverConfig } from "../../../../../../axiosConfig";

//components
import OTPModal from "./OTPModal";
import { set } from "react-hook-form";

const TechDegreeForm = () => {
    //global state and dispatch
    const dispatch = useDispatch();
    const isTechDegreeForm = useSelector((state) => state.isTechDegreeForm);
    //local state
    const [isModal, setModal] = useState(true);
    const [modalType, setModalType] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isVerfied, setVerifed] = useState(false);
    const [verfiedNumber, setVerfiedNumber] = useState(null);
    const [isVerficationLoading, setVerficationLoading] = useState(false);
    const [isFileTypeError, setFileTypeError] = useState(false);
    const [fileName, setFileName] = useState("");

    //form input states
    const [name, setName] = useState("");
    const [institute, setInstitute] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [file, setFile] = useState("");
    const [isYearError, setYearError] = useState(false);

    useEffect(() => {
        setYearError(false);
        setError(false);
    }, []);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        if (year.length > 4) {
            setYearError(true);
        } else if (year > currentYear) {
            setYearError(true);
        } else if (year < 2000 && year > 1000) {
            setYearError(true);
        } else {
            setYearError(false);
        }
    }, [year]);

    const handleModal = () => {
        setModalType("");
        dispatch({
            type: "TOGGLE_TECH_DEGREE_FORM_MODAL",
        });
    };

    const handlePhoneVerfication = () => {
        setVerficationLoading(true);

        if (phone && phone.length >= 10) {
            serverConfig
                .post(`web/enter-phone/service-referral/`, {
                    phone: phone,
                    country: "IN",
                })
                .then((res) => {
                    let { status_code, message, data } = res.data;
                    if (status_code === 6000) {
                        if (data.title === "Verified user") {
                            setVerifed(true);
                            setVerfiedNumber(phone);
                            setModalType("");
                        } else {
                            if (modalType === "") {
                                setModalType("verify");
                            }
                        }

                        setVerficationLoading(false);
                    } else {
                        setVerficationLoading(false);
                        setError(true);
                        setErrorMessage(message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({
                        type: "UPDATE_ERROR",
                        error: err,
                        errorMessage: "Server error please try again",
                    });
                    setVerficationLoading(false);
                });
        } else {
            setVerficationLoading(false);
            setError(true);
        }
    };

    $("#fileOverlay").on("click", function () {
        $("#resume").trigger("click");
    });

    const handleSubmit = () => {
        setLoading(true);
        if (
            name &&
            institute &&
            email &&
            phone &&
            phone.length >= 10 &&
            course &&
            year &&
            file &&
            !isYearError &&
            !isFileTypeError
        ) {
            if (isVerfied) {
                const formData = new FormData();

                formData.append("name", name);
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("institution", institute);
                formData.append("course", course);
                formData.append("couse_completion_year", year);
                formData.append("resume", file);

                serverConfig
                    .post("web/submit/tech-degree-registration/", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        let { status_code, title, message } = res.data;
                        if (status_code === 6000) {
                            setError(false);
                            setModalType("success");
                            setLoading(false);
                        } else if (status_code === 6001) {
                            setLoading(false);
                            setError(true);
                            setErrorMessage(message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        dispatch({
                            type: "UPDATE_ERROR",
                            error: err,
                            errorMessage: "Server error please try again",
                        });
                    });
            } else {
                setError(true);
                setLoading(false);
                setModalType("phone_verfication_failed");
            }
        } else {
            setError(true);
            setLoading(false);
        }
    };

    const handleResume = (e) => {
        if (e.target.name === "resume") {
            if (e.target.files.length > 0) {
                if (e.target.files[0].type == "application/pdf") {
                    setFileTypeError(false);
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                } else {
                    setFileTypeError(true);
                }
            }
        }
    };

    //to prevent background scroll
    useEffect(() => {
        if (isTechDegreeForm) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isTechDegreeForm]);
    //loader settings
    useEffect(() => {
        if (phone !== verfiedNumber) {
            setVerifed(false);
        } else if (phone === verfiedNumber) {
            setVerifed(true);
        }
    }, [phone]);

    //lottie settings
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    const successOptions = {
        loop: true,
        autoplay: true,
        animationData: tick,
        rendererSettings: {},
    };
    const failedOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {},
    };
    const verifyOptions = {
        loop: true,
        autoplay: true,
        animationData: greenloader,
        rendererSettings: {},
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };
    return (
        <BackContainer style={{ transform: isTechDegreeForm && "scale(1,1)" }}>
            <Overlay onClick={handleModal}></Overlay>
            <Modal type={modalType}>
                {modalType === "" ? (
                    <>
                        {" "}
                        <Title>Registration Form</Title>
                        <Form>
                            <InputName for="name">
                                Full Name<small>*</small>
                            </InputName>
                            <br />
                            <Cover>
                                <InputSection
                                    name="name"
                                    placeholder="Enter your  name"
                                    type="text"
                                    value={name}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                ></InputSection>
                                {isError && name === "" ? (
                                    <ErrorMessage>
                                        This field can't be empty
                                    </ErrorMessage>
                                ) : null}
                            </Cover>
                            <ContactSection>
                                <Section>
                                    <Cover>
                                        <InputName for="email">
                                            Email<small>*</small>
                                        </InputName>
                                        <br />
                                        <InputSection
                                            name="email"
                                            placeholder="Enter you mail id"
                                            type="email"
                                            required
                                            value={email}
                                            onKeyDown={handleKeyDown}
                                            onChange={(e) =>
                                                setemail(e.target.value)
                                            }
                                        ></InputSection>
                                        {isError && email === "" ? (
                                            <ErrorMessage>
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : isError &&
                                          errorMessage ===
                                              "email : Enter a valid email address." ? (
                                            <ErrorMessage>
                                                Enter a valid email address.
                                            </ErrorMessage>
                                        ) : null}
                                    </Cover>
                                </Section>
                                <Section>
                                    <Cover>
                                        <InputName for="phone">
                                            Contact Number<small>*</small>
                                        </InputName>
                                        <br />
                                        <InputCover>
                                            <InputSection
                                                style={{ paddingRight: "55px" }}
                                                name="phone"
                                                maxlength="5"
                                                placeholder="Enter you phone number"
                                                type="number"
                                                value={phone}
                                                onKeyDown={handleKeyDown}
                                                onChange={(e) =>
                                                    setphone(e.target.value)
                                                }
                                                required
                                            ></InputSection>
                                            {isVerficationLoading ? (
                                                <VerifiyButton>
                                                    <Lottie
                                                        options={verifyOptions}
                                                        height={30}
                                                        width={30}
                                                    />
                                                </VerifiyButton>
                                            ) : (
                                                <VerifiyButton
                                                    onClick={
                                                        handlePhoneVerfication
                                                    }
                                                >
                                                    {isVerfied
                                                        ? "Verified"
                                                        : "Verify"}
                                                </VerifiyButton>
                                            )}
                                        </InputCover>
                                        {isError && phone === "" ? (
                                            <ErrorMessage>
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : isError && phone.length < 10 ? (
                                            <ErrorMessage>
                                                Enter a vaild mobile number
                                            </ErrorMessage>
                                        ) : null}
                                    </Cover>
                                </Section>
                            </ContactSection>
                            <InputName for="name">
                                Institute<small>*</small>
                            </InputName>
                            <br />
                            <Cover>
                                <InputSection
                                    name="institute"
                                    placeholder="Select your  last attented institute"
                                    type="text"
                                    value={institute}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) =>
                                        setInstitute(e.target.value)
                                    }
                                    required
                                ></InputSection>
                                {isError && name === "" ? (
                                    <ErrorMessage>
                                        This field can't be empty
                                    </ErrorMessage>
                                ) : null}
                            </Cover>
                            <ContactSection>
                                <Section>
                                    <Cover>
                                        <InputName for="course">
                                            Course<small>*</small>
                                        </InputName>
                                        <br />
                                        <InputSection
                                            name="course"
                                            placeholder="Enter course"
                                            type="text"
                                            required
                                            value={course}
                                            onKeyDown={handleKeyDown}
                                            onChange={(e) =>
                                                setCourse(e.target.value)
                                            }
                                        ></InputSection>
                                        {isError && course === "" && (
                                            <ErrorMessage>
                                                This field can't be empty
                                            </ErrorMessage>
                                        )}
                                    </Cover>
                                </Section>
                                <Section>
                                    <Cover>
                                        <InputName for="year">
                                            Pass / Drop out year<small>*</small>
                                        </InputName>
                                        <br />
                                        <InputCover>
                                            <InputSection
                                                style={{
                                                    letterSpacing: "6px",
                                                    paddingRight: "50px",
                                                    border: isYearError
                                                        ? "1px solid red"
                                                        : "1px solid #e7e6e6",
                                                }}
                                                name="year"
                                                maxlength="4"
                                                placeholder="YYYY"
                                                type="number"
                                                value={year}
                                                onKeyDown={handleKeyDown}
                                                onChange={(e) =>
                                                    setYear(e.target.value)
                                                }
                                                required
                                            ></InputSection>

                                            {/* <Icon>
                                                <img
                                                    src={require("../../../../../../assets/images/web/techDegree/calendar.svg")}
                                                    alt=""
                                                />
                                            </Icon> */}
                                        </InputCover>
                                        {isError && year === "" ? (
                                            <ErrorMessage>
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : isYearError ? (
                                            <ErrorMessage>
                                                Invalid year
                                            </ErrorMessage>
                                        ) : null}
                                    </Cover>
                                </Section>
                            </ContactSection>
                            <UploadResumeSection>
                                <LeftSection>
                                    <UploadTitle>Upload CV</UploadTitle>
                                    <p>
                                        Upload your resume for further process
                                    </p>
                                </LeftSection>
                                <div>
                                    {" "}
                                    <InputName for="resume">
                                        Drag or Choose file
                                        <small>*</small>
                                    </InputName>
                                    <Cover>
                                        <FileOverLay id="fileOverlay">
                                            {fileName}
                                        </FileOverLay>
                                        <DragSection
                                            style={{ paddingRight: "50px" }}
                                            placeholder="Choose file"
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            accept="application/pdf"
                                            // hidden
                                            onKeyDown={handleKeyDown}
                                            onChange={(e) => {
                                                handleResume(e);
                                            }}
                                        />
                                        <Icon>
                                            <img
                                                src={require("../../../../../../assets/images/web/techDegree/upload.svg")}
                                                alt=""
                                            />
                                        </Icon>
                                        {isError && file === "" ? (
                                            <ErrorMessage>
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : isFileTypeError ? (
                                            <ErrorMessage>
                                                Please select a pdf file
                                            </ErrorMessage>
                                        ) : null}
                                    </Cover>
                                </div>
                            </UploadResumeSection>
                        </Form>
                        <ButtonContainer>
                            <Cancel onClick={handleModal}>Cancel</Cancel>
                            {isLoading ? (
                                <Submit>
                                    {" "}
                                    <Lottie
                                        options={defaultOptions}
                                        height={40}
                                        width={40}
                                    />
                                </Submit>
                            ) : (
                                <Submit onClick={handleSubmit}>Submit</Submit>
                            )}
                        </ButtonContainer>
                    </>
                ) : modalType === "verify" ? (
                    <>
                        <OTPModal
                            phone={phone}
                            setModalType={setModalType}
                            setVerifed={setVerifed}
                            setVerfiedNumber={setVerfiedNumber}
                        />
                    </>
                ) : modalType === "success" ? (
                    <>
                        <SucessModal>
                            <TopSection>
                                <LottieIcon>
                                    <Lottie
                                        options={successOptions}
                                        width={"100%"}
                                    />
                                </LottieIcon>
                                <SucessTitle>Successfully submit</SucessTitle>
                            </TopSection>
                            <Status>
                                Thank you for your responce, We will reach you
                                soon.{" "}
                            </Status>
                            <ContinueButton onClick={handleModal}>
                                Continue
                            </ContinueButton>
                        </SucessModal>
                    </>
                ) : modalType === "phone_verfication_failed" ? (
                    <SucessModal>
                        <TopSection>
                            <LottieIcon>
                                <Lottie
                                    options={failedOptions}
                                    width={"100%"}
                                />
                            </LottieIcon>
                            <SucessTitle>Verify your number</SucessTitle>
                        </TopSection>
                        <Status>
                            Please verify your number. Make sure it's you
                        </Status>
                        <OTPModal
                            phone={phone}
                            setModalType={setModalType}
                            setVerifed={setVerifed}
                            setVerfiedNumber={setVerfiedNumber}
                            isFailed={true}
                        />
                        {/* <ContinueButton
                            style={{ maxWidth: "500px" }}
                            onClick={() => setModalType("")}
                        >
                            Ok
                        </ContinueButton> */}
                    </SucessModal>
                ) : null}
                {modalType == "verify" ||
                modalType == "phone_verfication_failed" ? (
                    <Close onClick={() => setModalType("")}>
                        <img
                            src={require("../../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                            alt=""
                        />
                    </Close>
                ) : (
                    <Close onClick={handleModal}>
                        <img
                            src={require("../../../../../../assets/images/web/Landing-page/new/close-icon-gray.svg")}
                            alt=""
                        />
                    </Close>
                )}

                <BottomLine modalType={modalType}></BottomLine>
            </Modal>
        </BackContainer>
    );
};

export default TechDegreeForm;
const Section = styled.div``;
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
    width: ${(props) =>
        props.type === "verify" ||
        props.type === "success" ||
        props.type === "phone_verfication_failed"
            ? "600px"
            : "800px"};
    max-width: 800px;
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
        width: 700px;
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
        padding: 30px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;
const Title = styled.h3`
    font-size: 24px;
    font-family: gordita_medium;
    color: #393939;
    padding-bottom: 20px;
    border-bottom: 1px solid #e7e6e6;
    @media all and (max-width: 768px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const Form = styled.form`
    display: block;
    padding: 30px 10px 0 0;
    margin-right: -10px;
    overflow-y: scroll;
    max-height: calc(90vh - 260px);
    &::-webkit-scrollbar {
        width: 5px;
        margin-left: 10px;
        border: none;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background: #4ba870;
        border-radius: 3px;
    }
    @media all and (max-width: 768px) {
        max-height: calc(90vh - 215px);
        padding-top: 20px;
    }
`;
const InputName = styled.label`
    font-size: 15px;
    margin-bottom: 10px;
    color: #2d2d2d;
    /* font-family: gordita_medium; */
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
`;

const InputSection = styled.input`
    flex: 1;
    display: block;
    width: 100%;
    padding: 0 20px;
    height: 50px;
    border: 1px solid#e7e6e6;
    border-radius: 5px !important;
    background: #f9f9f9;
    font-size: 14px;
    /* font-family: gordita_medium; */
    margin-bottom: 25px;
    color: #7c7c7c;
    &::placeholder {
        font-size: 14px;
        color: #acacac;
        /* font-family: gordita_medium; */
    }
    @media all and (max-width: 768px) {
        height: 40px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 480px) {
        &::placeholder {
            font-size: 13px;
        }
        font-size: 13px;
        padding: 0 15px;
    }
`;
const Cover = styled.div`
    position: relative;
`;
const FileOverLay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 50px);
    height: 100%;
    background-color: #fff;
    z-index: 2;
    border: 1px solid#e7e6e6;
    border-radius: 5px !important;
    background: #f9f9f9;
    font-size: 14px;
    border-right: none;
    padding-left: 20px;
    display: flex;
    align-items: center;
    overflow-y: scroll;
    cursor: pointer;
    &::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 480px) {
        padding-left: 15px;
    }
`;
const ContactSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
`;

///

const BottomLine = styled.span`
    display: block;
    width: 100%;
    border-top: 7px solid #5ac78b;
    border-bottom: 7px solid #459e7b;
    position: absolute;
    bottom: 0;
    left: 0;
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
const ErrorMessage = styled.p`
    position: absolute;
    bottom: -17px;
    left: 0;
    font-size: 10px;
    color: red;
`;
const VerifiyButton = styled.span`
    position: absolute;
    right: 20px;
    top: 0;
    font-size: 11px;
    color: #4ba870;
    font-family: gordita_medium;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    /* height: 100%; */
`;
const InputCover = styled.div`
    position: relative;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
`;
const CalenderIcon = styled.span`
    position: absolute;
    display: block;
    right: 20px;
    top: 0;
    width: 30px;
    img {
        display: block;
        width: 100%;
    }
`;

const UploadResumeSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    padding-top: 20px;
    @media all and (max-width: 640px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;
    }
`;
const LeftSection = styled.div`
    p {
        font-size: 12px;
        color: #2d2d2d;
    }
`;
const UploadTitle = styled.h4`
    font-size: 15px;
    color: #2d2d2d;
    margin-bottom: 5px;
`;

const DragSection = styled.input`
    flex: 1;
    display: block;
    padding-top: 15px !important;
    width: 100%;
    padding: 0 20px;
    height: 50px;
    border: 1px solid#e7e6e6;
    border-radius: 5px !important;
    background: #f9f9f9;
    font-size: 14px;
    /* font-family: gordita_medium; */
    position: relative;
    margin-bottom: 25px;
    color: #acacac;
    &::placeholder {
        font-size: 14px;
        color: #acacac;
        /* font-family: gordita_medium; */
    }
    &::file-selector-button {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 99;
    }
    @media all and (max-width: 768px) {
        height: 40px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 768px) {
        padding-top: 9px !important;
    }
    @media all and (max-width: 480px) {
        &::placeholder {
            font-size: 13px;
        }
        font-size: 13px;
        padding: 0 15px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Cancel = styled.span`
    margin-left: 30px;
    width: 150px;
    height: 50px;
    background-color: #f9f9f9;
    color: #616060;
    font-family: gordita_medium;
    border: 1px solid#e7e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        /* margin-top: 30px; */
    }
`;
const Submit = styled.span`
    margin-left: 30px;
    width: 150px;
    height: 50px;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        /* margin-top: 30px; */
    }
`;

const Icon = styled.span`
    position: absolute;
    right: 20px;
    width: 15px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
        display: block;
        width: 100%;
    }
`;
const SucessModal = styled.div``;
const TopSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid#e7e6e6;
    padding-bottom: 10px;
`;
const LottieIcon = styled.span`
    display: block;
    min-width: 80px;
    width: 80px;
    margin-right: 20px;
    @media all and (max-width: 480px) {
        min-width: 50px;
        width: 50px;
        margin-right: 10px;
    }
`;
const SucessTitle = styled.h4`
    font-size: 24px;
    font-family: gordita_medium;
    color: #393939;
    @media all and (max-width: 768px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const Status = styled.p`
    margin-top: 30px;

    max-width: 450px;
    @media all and (max-width: 480px) {
        margin-top: 20px;
        font-size: 14px;
    }
`;
const ContinueButton = styled.span`
    width: 150px;
    height: 50px;
    margin-left: auto;
    background-color: #4ba870;
    color: #fff;
    font-family: gordita_medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 50px;
    @media all and (max-width: 768px) {
        height: 40px;
        font-size: 14px;
        width: 120px;
        margin-top: 30px;
    }
`;
