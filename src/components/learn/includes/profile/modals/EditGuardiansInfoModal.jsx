import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FlagDropDown from "../../authentication/general/FlagDropDown";
import CountrySelector from "../../authentication/general/CountrySelector";
import { accountsConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";
import ConfirmDeleteModal from "../../general/modals/ConfirmDeleteModal";
import ToastModal from "../../general/modals/ToastModal";
import GeneralModal from "../../general/modals/GeneralModal";

export default function EditGuardiansInfoModal({ setReload, isOffline }) {
    const {
        user_data: { access_token },
        selectedEditingMyProfileData,
    } = useSelector((state) => state);

    const [relationList] = useState([
        {
            id: 1,
            name: "father",
        },
        {
            id: 2,
            name: "mother",
        },
        {
            id: 3,
            name: "sister",
        },
        {
            id: 4,
            name: "brother",
        },
        {
            id: 5,
            name: "uncle",
        },
        {
            id: 6,
            name: "aunty",
        },
        {
            id: 7,
            name: "cousin",
        },
        {
            id: 8,
            name: "grandfather",
        },
        {
            id: 9,
            name: "grandmother",
        },
        {
            id: 10,
            name: "other",
        },
    ]);

    const dispatch = useDispatch();

    const [tempName, setTempName] = useState("");
    const [tempPhone, setTempPhone] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [guardianError, setGuardianError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [isDeleteLoading, setDeleteLoading] = useState(false);
    const [isDeleted, setDeleted] = useState(false);
    const [clickedGuardianId, setClickedGuardianId] = useState("");
    const [toastErrorMessage, setToastErrorMessage] = useState("");
    const [toastCondition, setToastCondition] = useState("");
    const [relationDropDown, setRelationDropDown] = useState(false);
    const [selectedRelation, setSelectedRelation] = useState("");
    const classRef = useRef();

    const handleClose = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_MY_PROFILE_EDITING_DATA",
            selectedEditingMyProfileData: {},
        });
        setTempName("");
        setSelectedRelation("");
        setTempPhone("");
        setChecked(false);
    };

    useEffect(() => {
        selectedEditingMyProfileData?.name &&
            setTempName(selectedEditingMyProfileData?.name);
        selectedEditingMyProfileData?.relation &&
            setSelectedRelation(
                selectedEditingMyProfileData?.relation === "grand_father"
                    ? "grandfather"
                    : selectedEditingMyProfileData?.relation === "grand_mother"
                    ? "grandmother"
                    : selectedEditingMyProfileData?.relation
            );
        selectedEditingMyProfileData?.phone &&
            setTempPhone(selectedEditingMyProfileData?.phone);
        selectedEditingMyProfileData?.is_primary &&
            setChecked(selectedEditingMyProfileData?.is_primary);
    }, [selectedEditingMyProfileData]);

    const handleSuccess = () => {
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "success",
        });
        dispatch({
            type: "UPDATE_MY_PROFILE_EDITING_DATA",
            selectedEditingMyProfileData: {},
        });
    };

    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };

    const onChangePhone = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setTempPhone(e.target.value);
            setErrorMessage("");
        }
    };
    const handleNameChange = (event) => {
        const inputValue = event.target.value;

        const hasNumbers = /\d/.test(inputValue);

        // if (!hasNumbers) {
        //     setTempName(inputValue);
        //     setErrorMessage("");
        // }
        if (inputValue.charAt(0) === " ") {
            return;
        } else if (!hasNumbers && /^[a-zA-Z0-9\s]*$/.test(inputValue)) {
            setTempName(inputValue);
            setErrorMessage("");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setGuardianError("");
        }, 3000);
    }, [guardianError]);

    useEffect(() => {
        if (errorMessage)
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
    }, [errorMessage]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    const onSelectHandler = (selected) => {
        setSelectedCountry(selected);
    };

    useEffect(() => {
        if (
            selectedCountry?.web_code !==
                selectedEditingMyProfileData?.country?.web_code &&
            selectedCountry?.web_code
        ) {
            setTempPhone("");
        }
    }, [selectedCountry?.web_code]);

    //------------- Create New Student Gurdian --------------//
    const createStudentGuardian = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (tempName && selectedRelation && tempPhone) {
            const relation =
                selectedRelation === "grandfather"
                    ? "grand father"
                    : selectedRelation === "grandmother"
                    ? "grand mother"
                    : selectedRelation;
            setLoading(true);
            accountsConfig
                .post(
                    "api/v1/users/create-new-student-guardian/",
                    {
                        name: tempName,
                        relation: relation,
                        phone: tempPhone,
                        is_primary: isChecked,
                        country: selectedCountry?.web_code,
                    },

                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    const { StatusCode, data, message } = response.data;
                    setLoading(false);

                    if (StatusCode === 6000) {
                        handleSuccess();
                    } else {
                        setErrorMessage(message?.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else if (!tempName) {
            setErrorMessage("Name is required");
        } else if (!selectedRelation) {
            setErrorMessage("Relation is required");
        } else if (!tempPhone) {
            setErrorMessage("Phone number is required");
        }
    };

    //------------- Delete Student-Gurdian Delete api -----------//
    const deleteStudentGuardian = () => {
        setDeleteLoading(true);
        setToastErrorMessage("");
        accountsConfig
            .post(
                `api/v1/users/delete-student-guardian/${clickedGuardianId}/`,
                {},
                {
                    headers: { Authorization: `Bearer ${access_token}` },
                }
            )
            .then((response) => {
                const { StatusCode, data, message } = response.data;

                if (StatusCode === 6000) {
                    setDeleteModal(false);
                    setDeleteLoading(false);
                    setToastCondition("success");
                    setTimeout(() => {
                        setDeleted(true);
                    }, 500);

                    setTimeout(() => {
                        handleClose();
                        setReload((prev) => !prev);
                    }, 5000);
                } else {
                    setToastErrorMessage(message?.message);
                    setDeleteLoading(false);
                    setDeleteModal(false);
                    setToastCondition("error");
                    setTimeout(() => {
                        setDeleted(true);
                    }, 500);
                }
            })
            .catch((error) => {
                setDeleteLoading(false);
            });
    };

    //--- update student guardians ---//

    const updateStudentGuardian = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (tempName && selectedRelation && tempPhone && !isDeleted) {
            const relation =
                selectedRelation === "grandfather"
                    ? "grand father"
                    : selectedRelation === "grandmother"
                    ? "grand mother"
                    : selectedRelation;
            setLoading(true);
            accountsConfig
                .post(
                    `api/v1/users/update-student-guardian/${selectedEditingMyProfileData?.id}/`,
                    {
                        name: tempName,
                        relation: relation,
                        phone: tempPhone,
                        is_primary: isChecked,
                        country: selectedCountry?.web_code,
                    },

                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    const { StatusCode, data, message } = response.data;
                    setLoading(false);

                    if (StatusCode === 6000) {
                        handleSuccess();
                    } else {
                        setErrorMessage(message?.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const renderAddedGuardian = (guardian) => {
        return (
            <>
                <GuardianDetails>
                    <GuardianDetailsLeft>
                        <Name>{guardian.name}</Name>
                        <Relation>{guardian.relation}</Relation>
                        <Phone>
                            {guardian?.country?.phone_code} {guardian.phone}
                        </Phone>
                    </GuardianDetailsLeft>
                    <GuardianDetailsRight>
                        {guardian?.is_primary && (
                            <Primary type={guardian?.is_primary?.toString()}>
                                Primary{" "}
                            </Primary>
                        )}
                        <DeleteIconContainer
                            onClick={() => {
                                if (!isDeleted) {
                                    setClickedGuardianId(guardian.id);
                                    setDeleteModal(true);
                                }
                            }}
                        >
                            <DeleteIcon
                                src={require("../../../../../assets/images/myprofile/delete.svg")}
                                alt="delete"
                            />
                        </DeleteIconContainer>
                    </GuardianDetailsRight>
                </GuardianDetails>
            </>
        );
    };

    const [innerHeight, setInnerHeight] = useState("");

    useEffect(() => {
        if (!innerHeight) {
            setInnerHeight(window?.innerHeight);
        }
    }, []);

    return (
        <>
            <CountrySelector
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
                selectedwebCode={
                    selectedEditingMyProfileData?.country?.web_code &&
                    selectedEditingMyProfileData?.country?.web_code
                }
            />
            {isDeleteModal && (
                <ConfirmDeleteModal
                    onDelete={deleteStudentGuardian}
                    isLoading={isDeleteLoading}
                    setDeleteModal={setDeleteModal}
                />
            )}
            <ToastModal
                isToast={isDeleted}
                setToast={setDeleted}
                toastCondition={toastCondition}
                toastMessage={toastErrorMessage}
                handleClose={handleClose}
            />

            <Modal height={innerHeight}>
                <TitleBox>
                    <TitleLeft>
                        <Titles>Add guardians info</Titles>
                        <SubTitle>Edit your guardians details</SubTitle>
                    </TitleLeft>
                    <CloseDiv onClick={handleClose}>
                        <img
                            src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                            alt=""
                        />
                    </CloseDiv>
                </TitleBox>
                <MiddleBox>
                    {selectedEditingMyProfileData?.id &&
                        renderAddedGuardian(selectedEditingMyProfileData)}
                    <GuardianBox>
                        <GuardianNameContainer>Name*</GuardianNameContainer>
                        <GuardianNameBox>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={tempName}
                                onChange={handleNameChange}
                            />
                        </GuardianNameBox>
                        <RelationNameContainer>Relation*</RelationNameContainer>
                        <SchoolNameMainBox>
                            <SelectedContainer
                                className={relationDropDown && "active"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRelationDropDown(!relationDropDown);
                                    setErrorMessage("");
                                }}
                            >
                                <SelectedSchool ref={classRef}>
                                    {selectedRelation ? (
                                        <SchoolLabel>
                                            <span>{selectedRelation}</span>
                                        </SchoolLabel>
                                    ) : (
                                        "Select your Relation"
                                    )}
                                </SelectedSchool>
                                <DownArrowContainer
                                    className={relationDropDown ? "flip" : ""}
                                >
                                    <img
                                        src={require("../../../../../assets/images/myprofile/down.svg")}
                                        alt=""
                                    />
                                </DownArrowContainer>
                            </SelectedContainer>

                            {relationDropDown && (
                                <GeneralModal
                                    selectedOption={selectedRelation}
                                    setSelectedOption={setSelectedRelation}
                                    listSourses={relationList}
                                    setDropDown={setRelationDropDown}
                                    isName={true}
                                    topPosition={"46px"}
                                    relationDropDown={relationDropDown}
                                />
                            )}
                        </SchoolNameMainBox>

                        <PhoneNameContainer>Phone number*</PhoneNameContainer>
                        <PhoneContainer>
                            <>
                                <FlagDropDown
                                    handleClick={handleShow}
                                    selectedCountry={selectedCountry}
                                    additional_info={true}
                                    height={28}
                                    width={28}
                                />
                                <InputContainer className="g-medium">
                                    <div className="g-medium">
                                        {selectedCountry &&
                                            selectedCountry.phone_code}
                                    </div>

                                    <div className="input-container">
                                        <InputField
                                            maxLength={
                                                selectedCountry.phone_number_length
                                            }
                                            className="g-medium"
                                            placeholder="Enter number"
                                            onKeyDown={handleKeyDown}
                                            onChange={onChangePhone}
                                            value={tempPhone}
                                        />
                                    </div>
                                </InputContainer>
                            </>
                        </PhoneContainer>
                        <CheckStudy>
                            <Check onClick={() => setChecked(!isChecked)}>
                                {isChecked ? (
                                    <CheckImage>
                                        <img
                                            src={require("../../../../../assets/images/myprofile/checktick.svg")}
                                            alt="check"
                                        />
                                    </CheckImage>
                                ) : (
                                    <CheckImage
                                        onClick={() => setChecked(!isChecked)}
                                    >
                                        <img
                                            src={require("../../../../../assets/images/myprofile/checkbox.svg")}
                                            alt="check"
                                        />
                                    </CheckImage>
                                )}

                                <CheckLabel>Set as primary contact</CheckLabel>
                            </Check>
                        </CheckStudy>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </GuardianBox>
                </MiddleBox>
                <BottomBox>
                    <FooterBox>
                        <Group>
                            <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                            <SaveBtn
                                onClick={() => {
                                    if (selectedEditingMyProfileData?.id) {
                                        updateStudentGuardian();
                                    } else {
                                        createStudentGuardian();
                                    }
                                }}
                                pointerValue={
                                    selectedEditingMyProfileData?.id
                                        ? (selectedEditingMyProfileData?.name !==
                                              tempName ||
                                              selectedEditingMyProfileData?.relation !==
                                                  selectedRelation ||
                                              selectedEditingMyProfileData?.phone !==
                                                  tempPhone ||
                                              selectedEditingMyProfileData?.is_primary !==
                                                  isChecked) &&
                                          tempName &&
                                          selectedRelation &&
                                          tempPhone &&
                                          !isDeleted
                                        : tempName &&
                                          selectedRelation &&
                                          tempPhone &&
                                          !isDeleted
                                }
                            >
                                {isLoading ? (
                                    <RequestLoader height={24} />
                                ) : (
                                    "Save"
                                )}
                            </SaveBtn>
                        </Group>
                    </FooterBox>
                </BottomBox>
            </Modal>
        </>
    );
}

const Modal = styled.div`
    width: 600px;
    max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
    overflow-y: scroll;
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
    scroll-behavior: smooth;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    /* Track */

    @media all and (max-width: 640px) {
        width: 450px;
    }
    @media all and (max-width: 480px) {
        width: 90%;
    }
`;
const CheckImage = styled.div`
    width: 20px;
    margin-right: 5px;
    img {
        width: 100%;
        display: block;
    }
`;
const Check = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px;
    border-bottom: 1px solid #eaecf0;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #fff;
`;
const TitleLeft = styled.div``;
const Titles = styled.h4`
    font-family: "gordita_medium";
    color: #003c3c;
    font-size: 18px;
    margin-bottom: 0px;
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
    ::-webkit-scrollbar {
        width: 10px !important;
    }
`;
const BottomBox = styled.div`
    position: sticky;
    bottom: 0;
    z-index: 2;
`;

const FooterBox = styled.div`
    padding: 20px 25px;
    border-radius: 0px 0px 12px 12px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px -4px 10px 7px rgba(0, 0, 0, 0.04);
`;
const Group = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;
const SaveBtn = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    color: #fff;
    font-family: "gordita_medium";
    cursor: ${({ pointerValue }) => (pointerValue ? "pointer" : "not-allowed")};
    background: ${({ pointerValue }) =>
        pointerValue
            ? "linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%)"
            : "grey"};
    padding: 10px 20px;
    width: 48%;
    font-size: 16px;
    min-height: 44px;
`;
const CancelBtn = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #344054;
    border-radius: 7px;
    cursor: pointer;
    border: 1px solid #d0d5dd;
    font-family: "gordita_medium";
    padding: 10px 20px;
    width: 48%;
    font-size: 16px;
    min-height: 44px;
`;
const GuardianDetails = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 12px 10px;
    align-items: center;
    border-bottom: 1px solid #eaecf0;
    margin-bottom: 10px;
    @media all and (max-width: 640px) {
        flex-wrap: wrap;
        flex-direction: column-reverse;
    }
`;
const GuardianDetailsLeft = styled.div`
    display: flex;
    align-items: center;
    width: 72%;
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const Name = styled.span`
    color: #707070;
    width: 30%;
    font-family: "gordita_regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #d9d9d9;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const Relation = styled.span`
    color: #707070;
    font-family: "gordita_regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #d9d9d9;
    width: 30%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const Phone = styled.span`
    color: var(--steyp-landingpage-paragraph, #707070);
    font-family: "gordita_regular";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    @media all and (max-width: 640px) {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
const GuardianDetailsRight = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 640px) {
        width: 100%;
        justify-content: end;
        margin-bottom: 10px;
    }
`;
const Primary = styled.span`
    border-radius: 4px;
    color: ${({ type }) => (type === "true" ? "#027a48" : "#707070")};
    background: ${({ type }) => (type ? "#c9ede0" : "#E7E7E7")};
    font-family: "gordita_medium";

    display: flex;
    padding: 2px 6px 2px 8px;
    align-items: center;
    margin-right: 15px;
    font-size: 14px;
`;
const DeleteIconContainer = styled.div`
    width: 24px;
    cursor: pointer;
    @media all and (max-width: 640px) {
        width: 20px;
    }
`;
const DeleteIcon = styled.img`
    display: block;
    width: 100%;
`;
const GuardianBox = styled.div`
    border-radius: 8px;
    border: 1px solid #eaecf0;
    display: flex;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 18px;
    align-self: stretch;
    position: relative;
    &.active {
        border: 1px solid #027a48;
    }
    @media all and (max-width: 640px) {
        padding: 20px;
    }
    @media all and (max-width: 480px) {
        padding: 10px;
    }
`;
const GuardianNameContainer = styled.span`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
`;
const GuardianNameBox = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    width: 100%;
    margin-bottom: 20px;
    input {
        font-size: 16px;
        min-width: 114.285714286%;
        transform: scale(0.875);
        padding: 13px 15px 11px 15px;
        transform-origin: left;
        text-transform: capitalize;
        font-family: gordita_regular;
        color: #545454;
    }
`;
const RelationNameContainer = styled.span`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
`;
const SchoolNameMainBox = styled.div`
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    position: relative;

    input {
        width: 100%;
    }
`;

const SelectedContainer = styled.div`
    border: 1px solid #d9d9d9;
    position: relative;
    padding: 0px 40px 0 10px;
    min-height: 45px;
    width: 100%;
    border-radius: 8px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    cursor: pointer;
    /* flex-wrap: wrap;
	flex-direction: column; */
    &.active {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-color: #12a46f;
    }
    &.school {
        padding: 0px 0px 0 10px;
    }
`;
const SelectedSchool = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    min-height: 43px;
    padding: 7px 0px 7px 0px;
    font-size: 14px;
    color: #8a8686;
    font-family: gordita_regular;

    &::-webkit-scrollbar {
        display: none;
    }

    input {
        flex: 1;
        width: 100%;
        display: inline-block;
        padding-top: 4px;
        color: #545454;
        font-family: ${({ selected }) => selected && "gordita_medium"};

        font-size: 16px;
        min-width: ${({ selected }) =>
            selected ? (16 / 14) * 100 + "%" : (16 / 12) * 100 + "%"};
        transform: ${({ selected }) =>
            selected ? `scale(${14 / 16})` : `scale(${12 / 16})`};
        transform-origin: left;
    }
`;
const SchoolLabel = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    span {
        font-size: 14px;
        color: #545454;
        font-family: gordita_medium;
        text-transform: capitalize;
    }
    button {
        display: inline-block;
        min-width: 15px;
        cursor: pointer;
        img {
            width: 100%;
            display: block;
        }

        @media all and (max-width: 768px) {
            min-width: 12px;
        }
    }
`;

const DownArrowContainer = styled.span`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: inline-block;
    height: auto;
    transition: 120ms ease-in all;
    cursor: pointer;
    &.flip {
        transform: rotate(180deg) translateY(50%);
    }
    img {
        width: 100%;
        display: block;
    }
`;
const PhoneNameContainer = styled.div`
    font-size: 12px;
    color: #344054;
    margin-bottom: 5px;
`;
const PhoneContainer = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 2px 15px;
    align-items: center;
    background: #f9f9f9;
    width: 100%;
    margin-bottom: 20px;
    /* input {
        width: 90%;
    } */
    @media all and (max-width: 480px) {
        padding: 2px 10px;
    }
`;
const InputContainer = styled.div`
    position: relative;
    border-radius: 7px;
    padding: 10px 4px 7px 2px;
    width: 100%;
    display: flex;
    align-items: baseline;
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
    width: -webkit-fill-available;
    width: -moz-available;
    @media (max-width: 480px) {
        padding: 8px 0px;
        border-color: #5f6367;
        font-size: 14px;
        margin-left: 0;
    }
    @media (max-width: 380px) {
        font-size: 14px;
    }
    &:focus-within {
        border-color: #5cc66a;
    }

    & .input-container {
        margin-left: 5px;
        max-height: 20px;
    }
`;
const InputField = styled.input`
    width: 100%;
    color: #667085;
    caret-color: #5cc66a;
    font-family: "gordita_regular";
    font-size: 16px;
    min-width: 114.285714286%;
    transform: scale(0.875);
    transform-origin: left;
    /* line-height: 1.1; */
    max-height: 20px;

    /* @media (max-width: 768px) {
        padding-left: 10px;
    } */
`;
const CheckStudy = styled.div``;
const CheckLabel = styled.span`
    font-size: 12px;
    color: #344054;
    padding-top: 4px;
    font-family: gordita_medium;
    img {
        display: block;
        width: 100%;
    }
    input {
        margin-right: 5px;
    }
`;
const ErrorMessage = styled.span`
    font-size: 14px;
    color: red;
    font-family: "gordita_regular";
    position: absolute;
    bottom: -27px;
    right: 10px;

    @media (max-width: 640px) {
        font-size: 13px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
