import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import GreenLoader from "../../authentication/general/GreenLoader";

function EnterYourDetails({
    setHeadContent,
    HeadContent,
    progamType,
    button,
    userName,
    setUserName,
    mobile,
    setMobile,
    campus,
    setCampus,
    isCoumputer,
    setComputer,
    setDivision,
    division,
    studentClass,
    setStudentClass,
    isError,
    setError,
    submitData,
    updateData,
    setUpdateData,
    errorMsg,
    setErrorMsg,
}) {
    const [isLoading, setLoading] = useState(false);
    // dropDown Toggle===============================
    const [isDropDown, setDropDown] = useState(false);
    const [campusDropDown, setCampusDropDown] = useState(false);

    // secarh filter================================
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const { school_scientist_members } = useSelector((state) => state);
    const [members, setMembers] = useState([]);

    // featch campus
    const [CapmusData, setCampusData] = useState([]);

    // error message================================
    // const [isError, setError] = useState("");
    const [pnError, setPnError] = useState("");

    // user data====================================
    const [name, setName] = useState("");
    const [CampusName, setCampusName] = useState("");

    const [country, setCountry] = useState("IN");
    const [campusErrorMessage, setCampusErrorMessage] = useState("");
    const [isTidio, setIsTidio] = useState(false);

    const storeStudentDetails = () => {
        setUpdateData(!updateData);
        let data = {
            name: userName,
            phone: mobile,
            student_class: studentClass,
            school_name: CampusName,
            campus_pk: campus,
            student_division: division,
        };

        dispatch({
            type: "UPDATE_SS_MEMBERS",
            school_scientist_members: data,
        });
        resetValues();
    };

    useEffect(() => {
        setMembers(school_scientist_members);
    }, [updateData]);

    // Clearing error msg
    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
            setError(false);
        }, [800]);
    }, [errorMsg]);

    const validateValues = () => {
        let no_error = true;
        if (userName === "") {
            setError(true);
            no_error = false;
        } else if (mobile === "") {
            setError(true);
            no_error = false;
        } else if (studentClass === "") {
            setError(true);
            no_error = false;
        // } else if (division === "") {
        //     setError(true);
        //     no_error = false;
        } else if (campus === "") {
            setError(true);
            no_error = false;
        } else {
            setError(false);
            no_error = true;
        }
        return no_error;
    };
    const submitButton = () => {
        const validate = validateValues();
        if (validate) {
            storeStudentDetails();
            if (progamType === "quiz") {
                submitData();
            } else {
                if (school_scientist_members?.length < 1) {
                    submitData();
                }
            }
        }
    };

    //outside click
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setDropDown(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const resetValues = () => {
        setDivision("");
        setUserName("");
        setMobile("");
        setStudentClass("");
        setCampus("");
        setCampusName("");
        setSearchTerm("");
    };

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
        }

        if (searchTerm) {
            setCampusDropDown(true);
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
            setUserName(e.target.value);
    };

    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setMobile(e.target.value);
            setPnError("");
        }
    };
    const campusSearch = () => {
        if (searchTerm) {
            setLoading(true);
            serverConfig
                .get(`/campuses/?q=${searchTerm}`, {})
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setCampusData(data);
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

    // useEffect(() => {
    // 	(function () {
    // 		document
    // 			.querySelector("#school-scientist-campus")
    // 			.addEventListener("click", function () {
    // 				window.tidioChatApi.show();
    // 				window.tidioChatApi.open();

    // 				if (window.tidioChatApi) {
    // 					window.tidioChatApi.setContactProperties({
    // 						ss_name: name,
    // 						ss_phone: phone,
    // 						ss_code: searchTerm,
    // 					});

    // 					if (name) {
    // 						window.tidioChatApi.messageFromVisitor(
    // 							`Hello I am ${name}. I can't find my campus on the list.`
    // 						);
    // 					} else {
    // 						window.tidioChatApi.messageFromVisitor(
    // 							`Hello, I can't find my campus on the list.`
    // 						);
    // 					}
    // 				}
    // 			});
    // 	})();
    // }, [isTidio, window.tidioChatApi]);
    return (
        <>
            <Form>
                <NameDiv>
                    <TextInput
                        type="text"
                        placeholder="Enter name"
                        id="name"
                        value={userName}
                        onChange={onNameChange}
                    />
                    <Label htmlFor="name">Full Name*</Label>
                    {!userName && isError && !errorMsg && (
                        <Error>Name is required*</Error>
                    )}
                </NameDiv>
                <NumberDiv>
                    <Code>{"+91"}</Code>
                    <NumberInput
                        type="tel"
                        placeholder="Enter phone number"
                        id="number"
                        value={mobile}
                        // onInput={validate}
                        maxLength="10"
                        onKeyDown={handleKeyDown}
                        onChange={onChange}
                    />

                    <Label htmlFor="number">Phone Number*</Label>
                    {!mobile && isError && !errorMsg && (
                        <Error>Phone is required</Error>
                    )}
                </NumberDiv>
                <InputClass
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
                        value={studentClass}
                    />
                    <Label htmlFor="select">Class*</Label>
                    <Arrow>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                            }
                            alt="Down Arrow"
                        />
                    </Arrow>
                    <DropDown className={isDropDown ? "active" : ""}>
                        <Ul>
                            {fetchClass.map((item, index) => (
                                <Li
                                    key={index}
                                    onClick={() => {
                                        setStudentClass(item.class);
                                        setDropDown(false);
                                    }}
                                >
                                    {item.class}
                                </Li>
                            ))}
                        </Ul>
                    </DropDown>
                    {!studentClass && isError && !errorMsg && (
                        <Error>class is required</Error>
                    )}
                </InputClass>
                <InputClass
                    onClick={() => {
                        setCampusDropDown(false);
                    }}
                >
                    <TextInput
                        placeholder="Enter Division"
                        id="select"
                        value={division}
                        // onChange={(e) => setDivision(e.target.value || 'not')}
                        onChange={(e) => setDivision(e.target.value)}
                    />
                    <Label htmlFor="select">Division</Label>
                    {/* {!division && isError && !errorMsg && (
                        <Error>division is required</Error>
                    )} */}
                </InputClass>
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
                    </GraduationStatus>
                    {!CampusName && !campus && isError && !errorMsg && (
                        <Error>campus is required</Error>
                    )}
                    {errorMsg && <Error>{errorMsg}</Error>}
                    <ClassDropDown className={campusDropDown ? "active" : ""}>
                        <UlMini>
                            {!isLoading ? (
                                CapmusData.map((item, index) => (
                                    <LiMini
                                        key={index}
                                        onClick={() => {
                                            setCampus(item.id);
                                            // setSearchTerm(item.name);
                                            setCampusName(item.name);
                                            setCampusDropDown(!campusDropDown);
                                        }}
                                    >
                                        <p>
                                            <span className="first">
                                                {item.token_code}{" "}
                                            </span>{" "}
                                            - <p> {item.name}</p>
                                        </p>
                                    </LiMini>
                                ))
                            ) : (
                                <GreenLoader />
                            )}
                        </UlMini>
                    </ClassDropDown>
                </InputCamp>
                {!progamType === "quiz" &&
                HeadContent === "Enter your details" ? (
                    <CheckBox>
                        <TickBox
                            onClick={() => setComputer(!isCoumputer)}
                        ></TickBox>
                        {isCoumputer && (
                            <ImageBox onClick={() => setComputer(!isCoumputer)}>
                                <img
                                    src={require("../../../../../assets/images/school-scientist/tick.svg")}
                                    alt=""
                                />
                            </ImageBox>
                        )}{" "}
                        <CheckPara onClick={() => setComputer(!isCoumputer)}>
                            I’m using laptop/desktop at home
                        </CheckPara>
                    </CheckBox>
                ) : HeadContent === "Successfully Registered" ? (
                    <CheckBox>
                        <TickBox
                            onClick={() => setComputer(!isCoumputer)}
                        ></TickBox>
                        {isCoumputer && (
                            <ImageBox onClick={() => setComputer(!isCoumputer)}>
                                <img
                                    src={require("../../../../../assets/images/school-scientist/tick.svg")}
                                    alt=""
                                />
                            </ImageBox>
                        )}{" "}
                        <CheckPara onClick={() => setComputer(!isCoumputer)}>
                            I’m using laptop/desktop at home
                        </CheckPara>
                    </CheckBox>
                ) : (
                    ""
                )}
            </Form>
            {button && school_scientist_members?.length < 3 && (
                <AddMember
                    onClick={() => {
                        if (school_scientist_members?.length < 3) {
                            submitButton();
                        }
                    }}
                >
                    <AddIcon>
                        <img
                            src={require("../../../../../assets/images/school-scientist/Add.svg")}
                            alt=""
                        />
                    </AddIcon>
                    <AddText>Add another member</AddText>
                </AddMember>
            )}
            <Bottom className={button ? "none" : ""}>
                <ModalButton
                    onClick={() => {
                        submitButton();
                    }}
                >
                    Next
                </ModalButton>
            </Bottom>
            {/* )} */}
        </>
    );
}

export default EnterYourDetails;

const AddMember = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const AddIcon = styled.div`
    width: 4%;
    margin-right: 10px;
    img {
        width: 100%;
        display: block;
    }
`;
const AddText = styled.h4`
    color: #2d2d2d;
    font-weight: 600;
    font-size: 18px;
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
const InputClass = styled.div`
    width: 24%;
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
    @media all and (max-width: 640px) {
        bottom: -55%;
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
const Bottom = styled.div`
    display: flex;
    justify-content: end;
    font-weight: 600;
    &.none {
        display: none;
    }
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
`;
