import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { useSchoolScientistStore } from "../../../../store/schoolScientistStore";
import styled from "styled-components";
import RequestLoader from "../../../learn/includes/authentication/general/RequestLoader";
import {
    serverConfig,
    serverConfig,
    serverConfig,
} from "../../../../axiosConfig";
import SuccessModal from "../../inludes/steyp-landing-page/school-scientist/SuccessModal";
import OptModal from "../../inludes/steyp-landing-page/school-scientist/OtpModal";
import ReCAPTCHA from "react-google-recaptcha";
import GreenLoader from "../../../learn/includes/authentication/general/GreenLoader";

function SchoolScientistRegisterPage() {
    const { user_data } = useAuthStore();
    const { school_scientist_data, setSchoolScientistData } = useSchoolScientistStore();
    const recaptchaRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [isOtpModal, setOtpModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [viewPhone, setViewPhone] = useState("");
    // dropDown Toggle===============================
    const [isDropDown, setDropDown] = useState(false);
    const [campusDropDown, setCampusDropDown] = useState(false);

    // secarh filter================================
    const [searchTerm, setSearchTerm] = useState("");

    // featch campus
    const [isCampus, setCampus] = useState([]);

    // error message================================
    const [isError, setError] = useState("");
    const [pnError, setPnError] = useState("");

    // user data====================================
    const [isTick, setTick] = useState(false);
    const [name, setName] = useState("");
    const [CampusName, setCampusName] = useState("");

    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("IN");
    const [isClass, setClass] = useState("5");
    const [campusPk, setCampusPk] = useState("");
    const [campusErrorMessage, setCampusErrorMessage] = useState("");
    const [isTidio, setIsTidio] = useState(false);

    //outside click
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDropDown(false);
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
    // fetch classes=====================================
    const [fetchClass, setFetchClass] = useState([
        {
            id: 1,
            class: "5",
        },
        {
            id: 2,
            class: "6",
        },
        {
            id: 3,
            class: "7",
        },
        {
            id: 4,
            class: "8",
        },
        {
            id: 5,
            class: "9",
        },
        {
            id: 6,
            class: "10",
        },
        {
            id: 7,
            class: "+1",
        },
        {
            id: 8,
            class: "+2",
        },
    ]);
    // campus list api===================================
    useEffect(() => {
        campusSearch();
        if (searchTerm.length === 0) {
            setCampusDropDown(false);
            setCampusPk("");
        }
        // if (isCampus.length <= 0) {
        //     setCampusDropDown(false);
        // }

        if (searchTerm) {
            setCampusDropDown(true);
            setCampusPk("");
            setDropDown(false);
        }
    }, [searchTerm]);

    // form validation=======================

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.keyCode === 69 || e.key === "$") {
            e.preventDefault();
        }
    };
    const onNameChange = (e) => {
        const re = /^[a-zA-Z\. ]*$/;
        if (e.target.value === "" || re.test(e.target.value))
            setName(e.target.value);
        setError(" ");
    };

    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhone(e.target.value);
            setPnError("");
        }
    };
    const campusSearch = () => {
        if (user_data && searchTerm) {
            let { access_token } = user_data;
            setLoading(true);
            serverConfig
                .get(`school-scientists/campuses/?q=${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setCampus(data);
                        setLoading(false);

                        if (data.length <= 0) {
                            setCampusDropDown(false);
                            setCampusErrorMessage("School not found?");
                        } else {
                            setCampusErrorMessage("");
                        }
                    } else if (status_code === 6001) {
                        setCampusErrorMessage("");
                        setLoading(false);

                        // setError(true);
                        // setErrorMessage("An error occurred");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    // form submission===================================
    const submitData = async () => {
        setCampusErrorMessage("");
        setLoading(true);

        let { access_token } = user_data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("country", country);
        formData.append("campus_pk", campusPk);
        formData.append("student_class", isClass);
        formData.append("has_computer", isTick);
        
        try {
            const response = await serverConfig.post(
                `/api/v1/users/school-scientist/apply/form/`, 
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + access_token,
                    },
                }
            );
            
            const { status_code, data } = response.data;
            if (status_code === 6000) {
                setSchoolScientistData(data);
                setSuccessModal(true);
                setLoading(false);
            } else {
                setError("An error occurred");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred");
            setLoading(false);
        }
    };

    useEffect(() => {
        (function () {
            document
                .querySelector("#school-scientist-campus")
                .addEventListener("click", function () {
                    window.tidioChatApi.show();
                    window.tidioChatApi.open();

                    if (window.tidioChatApi) {
                        window.tidioChatApi.setContactProperties({
                            ss_name: name,
                            ss_phone: phone,
                            ss_code: searchTerm,
                        });

                        if (name) {
                            window.tidioChatApi.messageFromVisitor(
                                `Hello I am ${name}. I can't find my campus on the list.`
                            );
                        } else {
                            window.tidioChatApi.messageFromVisitor(
                                `Hello, I can't find my campus on the list.`
                            );
                        }
                    }
                });
        })();
    }, [isTidio, window.tidioChatApi]);

    return (
        <>
            <MainContiner>
                <OptModal
                    isOtpModal={isOtpModal}
                    setOtpModal={setOtpModal}
                    viewPhone={viewPhone}
                    setSuccessModal={setSuccessModal}
                />
                <SuccessModal
                    successModal={successModal}
                    setSuccessModal={setSuccessModal}
                />
                <SubContienr>
                    <SectionLeftContiner>
                        <Imagecontiner>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/Group+3465902.png"
                                }
                                alt="Img"
                            />
                            <Place>
                                <Small>
                                    For <span>UP, HS, HSS</span> Students of{" "}
                                    <Span>Trivandrum</Span>
                                </Small>
                            </Place>
                        </Imagecontiner>
                    </SectionLeftContiner>
                    <SectionRightContienr>
                        <RinghtSubContiner>
                            <TitleSection>
                                <Title>
                                    School Scientist Registration Form
                                </Title>
                            </TitleSection>
                            <Form>
                                <NameDiv>
                                    <TextInput
                                        type="text"
                                        placeholder="Enter name"
                                        id="name"
                                        value={name}
                                        onChange={onNameChange}
                                    />
                                    <Label for="name">Full Name*</Label>
                                    <Error>{name ? "" : isError}</Error>
                                </NameDiv>
                                <NumberDiv>
                                    <Code>{"+91"}</Code>
                                    <NumberInput
                                        type="tel"
                                        placeholder="Enter phone number"
                                        id="number"
                                        value={phone}
                                        // onInput={validate}
                                        maxLength="12"
                                        onKeyDown={handleKeyDown}
                                        // onPaste={(e) => e.preventDefault()}
                                        // onDrop={(e) => e.preventDefault()}
                                        onChange={onChange}
                                    />

                                    <Label for="number">Phone Number*</Label>
                                    <Error>{pnError && pnError}</Error>
                                    {!phone ? (
                                        <Error>{isError}</Error>
                                    ) : (
                                        <Error>
                                            {pnError ===
                                                "Phone number is not valid" ||
                                            pnError === "Already applied"
                                                ? pnError
                                                : ""}
                                        </Error>
                                    )}
                                </NumberDiv>
                                <InputDiv
                                    ref={wrapperRef}
                                    onClick={() => {
                                        setDropDown(!isDropDown);
                                        setCampusDropDown(false);
                                    }}
                                >
                                    <TextInput
                                        placeholder="Select Class"
                                        disabled
                                        id="select"
                                        value={isClass}
                                    />
                                    <Label for="select">Class*</Label>
                                    <Arrow>
                                        <img
                                            src={
                                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                                            }
                                            alt="Down Arrow"
                                        />
                                    </Arrow>
                                    <DropDown
                                        className={isDropDown ? "active" : ""}
                                    >
                                        <Ul>
                                            {fetchClass.map((item) => (
                                                <Li
                                                    onClick={() =>
                                                        setClass(item.class)
                                                    }
                                                >
                                                    {item.class}
                                                </Li>
                                            ))}
                                        </Ul>
                                    </DropDown>
                                </InputDiv>
                                <InputCamp>
                                    <GraduationStatus>
                                        <TextInput
                                            type="text"
                                            placeholder="Enter your school name"
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCampusName("");
                                            }}
                                            value={
                                                CampusName.length !== 0
                                                    ? CampusName
                                                    : searchTerm
                                                // searchTerm ? CampusName : searchTerm
                                            }
                                        />
                                        <Label>School*</Label>
                                        {!campusPk ? (
                                            <>
                                                <Error>
                                                    {campusErrorMessage}{" "}
                                                    <span
                                                        onClick={() =>
                                                            setIsTidio(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        className="tidios"
                                                        id="school-scientist-campus"
                                                    >
                                                        {campusErrorMessage &&
                                                            "Contact us"}
                                                    </span>
                                                </Error>
                                            </>
                                        ) : null}
                                    </GraduationStatus>
                                    <ClassDropDown
                                        className={
                                            campusDropDown ? "active" : ""
                                        }
                                    >
                                        <UlMini>
                                            {!isLoading ? (
                                                isCampus.map((item) => (
                                                    <LiMini
                                                        onClick={() => {
                                                            setCampusPk(
                                                                item.id
                                                            );
                                                            // setSearchTerm(item.name);
                                                            setCampusName(
                                                                item.name
                                                            );
                                                            setCampusDropDown(
                                                                !campusDropDown
                                                            );
                                                        }}
                                                    >
                                                        <p>
                                                            <span className="first">
                                                                {
                                                                    item.token_code
                                                                }{" "}
                                                            </span>{" "}
                                                            -{" "}
                                                            <p> {item.name}</p>
                                                        </p>
                                                    </LiMini>
                                                ))
                                            ) : (
                                                <GreenLoader />
                                            )}
                                        </UlMini>
                                    </ClassDropDown>
                                </InputCamp>
                                <CheckBox>
                                    <TickBox
                                        onClick={() => setTick(!isTick)}
                                    ></TickBox>
                                    {isTick && (
                                        <ImageBox
                                            onClick={() => setTick(!isTick)}
                                        >
                                            <img
                                                src={require("../../../../assets/images/school-scientist/tick.svg")}
                                                alt=""
                                            />
                                        </ImageBox>
                                    )}
                                    <CheckPara onClick={() => setTick(!isTick)}>
                                        I’m using laptop/desktop at home
                                    </CheckPara>
                                </CheckBox>

                                {/* {name !== "" &&
                CampusName !== "" &&
                phone !== "" &&
                isClass !== "" &&
                campusPk !== "" ? (
                  !isLoading ? (
                    <Submit
                      onClick={submitData}
                      className={
                        phone === "" ||
                        name === "" ||
                        isClass === "" ||
                        campusPk === "" ||
                        country === ""
                          ? "disabled"
                          : ""
                      }
                    >
                      Submit
                    </Submit>
                  ) : (
                    <Submit>
                      <RequestLoader />
                    </Submit>
                  )
                ) : (
                  <Submit className="disabled">Submit</Submit>
                )} */}
                                <Submit
                                    onClick={() => setOtpModal(true)}
                                    // className={
                                    //   phone === "" ||
                                    //   name === "" ||
                                    //   isClass === "" ||
                                    //   campusPk === "" ||
                                    //   country === ""
                                    //     ? "disabled"
                                    //     : ""
                                    // }
                                >
                                    Submit
                                </Submit>
                            </Form>
                        </RinghtSubContiner>
                    </SectionRightContienr>
                    {/* <ReCAPTCHA
                        ref={recaptchaRef}
                        //This ref can be used to call captcha related functions in case you need.
                        sitekey="6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc"
                        size="invisible"
                        badge="bottomleft"
                    /> */}
                </SubContienr>
            </MainContiner>
        </>
    );
}

const MainContiner = styled.div`
    width: 100%;
    height: 100vh;
`;
const SubContienr = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const SectionLeftContiner = styled.div`
    background-color: #013f84;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/Spotlight+bg.png");
    height: 100vh;
    min-height: 567px;
    width: 39%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const Imagecontiner = styled.div`
    width: 75%;

    img {
        width: 100%;
        display: block;
    }
`;
const SectionRightContienr = styled.div`
    width: 56%;
    @media all and (max-width: 980px) {
        width: 100%;
        margin: 0 auto;
    }
`;
const RinghtSubContiner = styled.div`
    width: 95%;
    padding: 2%;
    @media all and (max-width: 980px) {
        width: 90%;
        padding: 11% 0;
        margin: 0 auto;
    }
    @media all and (max-width: 360px) {
        padding: 11% 0%;
    }
    /* margin: 0 auto; */
`;
const TitleSection = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #e7e6e6;
    @media all and (max-width: 480px) {
        margin-bottom: 14px;
    }
`;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 30px;
    color: #212121;
    margin-bottom: 16px;
    @media all and (max-width: 980px) {
        font-size: 22px;
    }
    @media all and (max-width: 480px) {
        font-size: 18px;
    }
`;
const Form = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    margin-top: 63px;
    @media all and (max-width: 480px) {
        margin-top: 40px;
    }

    & input::placeholder {
        font-family: "gordita_regular";
    }
`;
const InputDiv = styled.div`
    width: 48%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;
    display: flex;

    @media all and (max-width: 640px) {
        width: 100%;
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
    }
`;
const InputCamp = styled.div`
    width: 100%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 35px;
    border-radius: 10px;
    height: 58px;
    display: flex;

    @media all and (max-width: 640px) {
        width: 100%;
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 25px;
        height: 46px;
    }
`;
const NameDiv = styled.div`
    position: relative;
    width: 100%;
    background-color: #fff;
    position: relative;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;

    @media all and (max-width: 640px) {
        width: 100%;
        height: 50px;
    }
    @media all and (max-width: 480px) {
        height: 46px;
        margin-bottom: 36px;
    }
`;
const NumberInput = styled.input`
    width: calc(100% - 28px);
    height: 100%;

    font-size: 15px;
    font-family: "gordita_Regular";
    @media all and (max-width: 768px) {
        width: calc(100% - 40px);
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Label = styled.label`
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 15px;
    color: #a0a0a0;
    margin-bottom: 10px;

    @media all and (max-width: 480px) {
        font-size: 14px;
        top: -25px;
    }
`;

const NumberDiv = styled.div`
    position: relative;
    display: flex;
    position: relative;
    align-items: center;
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    background-color: #fff;
    width: 48%;
    height: 58px;
    padding: 15px;
    margin-bottom: 50px;
    &:focus-within {
        border: 2px solid #0fa76f;
    }
    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }

    @media all and (max-width: 640px) {
        width: 100%;
        height: 50px;
        padding: 12px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
        padding: 9px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        padding: 10px;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const Code = styled.span`
    font-size: 15px;
    margin-right: 10px;
    line-height: 18px;
    color: #000;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Arrow = styled.div`
    width: 8px;
    transform: rotate(90deg);
    transition: all 0.4s ease;
    position: absolute;
    right: 13px;
    top: 40%;

    img {
        width: 100%;
        display: block;
    }

    &.modal-active {
        transform: rotate(-90deg);
    }
    &.active {
        transform: rotate(-90deg);
    }
`;
const Submit = styled.div`
    /* background-color: #5aa970; */
    background-color: #02529c;
    width: 100%;
    margin-left: auto;
    margin-right: 0;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    font-family: "gordita_medium";
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    &.disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 0 auto;
    }
`;
const GraduationStatus = styled.div`
    position: relative;
    margin-bottom: 35px;
    border-radius: 10px;
    height: 58px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #9e9e9e;
    font-family: "gordita_regular";
    &.district {
        color: #000;
    }
    @media all and (max-width: 1280px) {
        max-height: 50px;
        width: 100%;
        min-height: 50px;
    }
    /* @media all and (max-width: 980px) {
        width: 48%;
    } */
    @media all and (max-width: 768px) {
        width: 100%;
    }

    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 36px;
        height: 46px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;
const DropDownMIni = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    height: 180px;
    overflow: hidden;
    display: none;
    &.active {
        display: block;
    }
    &.none {
        display: none;
    }
`;
const UlMini = styled.ul`
    background-color: #fff;
    font-size: 14px;
    width: 100%;
    height: 100%;
    font-family: "gordita_regular";
    overflow-y: scroll;
    scroll-behavior: smooth;
    ::scrollbar-color {
        color: red;
    }
    /* ::-webkit-scrollbar {
        display: none;
    } */
`;
const LiMini = styled.li`
    border: 2px solid #e6e6e6;
    padding: 10px;
    background-color: #fff;
    color: #747474;
    border-radius: 5px;
    margin: 4px;
    display: flex;
    :hover {
        color: rgb(15, 139, 94);
        background-color: rgb(229, 245, 238);
    }
    :last-child {
        margin-bottom: 0;
    }
    @media all and (max-width: 480px) {
        padding: 8px;
    }
    span {
        font-family: "gordita_medium" !important;
    }
    p {
        font-size: 14px;
        display: inline-block !important;
        @media all and (max-width: 768px) {
            width: 90%;
            white-space: nowrap !important;
            /* overflow: hidden !important;
            text-overflow: ellipsis !important; */
        }
        @media all and (max-width: 768px) {
            font-size: 12px;
        }
    }
`;
const DropDown = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    height: 180px;
    /* overflow: hidden; */
    display: none;
    &.active {
        display: block;
    }
`;
const ClassDropDown = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    height: 262px;
    /* overflow: hidden; */
    background-color: #fff;
    padding: 3px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: none;

    &.active {
        display: block;
    }
    @media all and (max-width: 1280px) {
        top: 84%;
    }
    @media all and (max-width: 1080px) {
        height: 180px;
    }
    @media all and (max-width: 400px) {
        top: 100%;
        padding: 2px;
    }
`;
const Ul = styled.ul`
    background-color: #fff;

    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    font-size: 15px;
    width: 100%;
    height: 100%;
    font-family: "gordita_regular";
    overflow-y: scroll;
`;
const Li = styled.li`
    border-bottom: 2px solid #e6e6e6;
    padding: 10px;
`;
const CheckBox = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 35px;
    position: relative;
    cursor: pointer;
    @media all and (max-width: 400px) {
        margin-bottom: 20px;
    }
`;
const TickBox = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 2px;
    display: block;
    margin-right: 10px;
    border: 1px solid #a0a0a0;
    padding: 10px;
`;
const ImageBox = styled.div`
    width: 23px;
    position: absolute;
    img {
        width: 100%;
        display: block;
    }
`;
const CheckPara = styled.p`
    font-size: 15px;
    color: #a0a0a0;
`;
const Error = styled.p`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: -40%;
    right: 0;
    cursor: auto;
    & .tidios {
        color: #14a62a;
        font-family: "gordita_medium";
        text-decoration: underline;
        cursor: pointer;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
    }
`;
const TextInput = styled.input`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    font-size: 15px;
    width: 100%;
    height: 100%;
    padding: 15px;
    font-family: "gordita_regular";
    &:focus {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }
    &:hover {
        border: 2px solid #0fa76f;
        border-radius: 10px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
        padding: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        padding: 9px;
    }
    @media all and (max-width: 360px) {
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #0fa76f;
            border-radius: 10px;
        }
    }
`;

const Place = styled.div`
    margin-bottom: 35px;
    @media all and (max-width: 680px) {
        margin-bottom: 0px;
    }
`;
const Small = styled.p`
    font-size: 16px;
    font-family: "gordita_medium" !important;
    color: #fff;
    position: relative;
    @media all and (max-width: 1080px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    ::after {
        content: "";
        background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/bend-line.svg");
        background-repeat: no-repeat;
        display: inline-block;
        width: 190px;
        position: absolute;
        left: 4%;
        height: 10px;
        top: 96%;
        @media all and (max-width: 480px) {
            display: none;
        }
    }

    span {
        font-family: "gordita_medium" !important;
        color: #ffde2e;
        font-size: 16px;
        @media all and (max-width: 480px) {
            font-size: 16px;
        }
    }
`;
const Span = styled.span`
    font-family: "gordita_medium" !important;
    color: #ffde2e;
    position: relative;
`;

export default SchoolScientistRegisterPage;
