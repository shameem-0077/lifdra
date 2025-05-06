import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../../store/authStore";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RequestLoader from "../../authentication/general/RequestLoader";
import { serverConfig } from "../../../../../axiosConfig";
import Moment from "moment";
import { startTransition } from "react";

export default function AddCertificationsModal({ isOffline }) {
    const { user_data, updateUserData } = useAuthStore();
    const access_token = user_data?.access_token;
    const selectedEditingMyProfileData = user_data?.selected_editing_my_profile_data;

    const handleClose = () => {
        updateUserData({ 
            show_new_updates_modal: false,
            selected_editing_my_profile_data: {}
        });
        setCertificateName("");
        setCompanyName("");
        setCertificateId("");
        setCertificateUrl("");
        setIssuedDate("");
        setValidDate("");
    };

    const [issuedDate, setIssuedDate] = useState("");
    const [validDate, setValidDate] = useState("");
    const [certificateName, setCertificateName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [certificateId, setCertificateId] = useState("");
    const [certificateUrl, setCertificateUrl] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [requiedError, setRequiedError] = useState("");

    const handleNameChange = (event) => {
        const inputValue = event.target.value;

        const hasNumbers = /\d/.test(inputValue);

        if (inputValue.charAt(0) === " ") {
            return;
        } else if (!hasNumbers && /^[a-zA-Z0-9\s]*$/.test(inputValue)) {
            setCertificateName(inputValue);
            setErrorMessage("");
        }
    };

    const RequiredField = () => {
        if (
            issuedDate !== "" ||
            certificateName !== "" ||
            companyName !== "" ||
            certificateId !== ""
        ) {
        } else {
            setRequiedError("this field is required");
        }
    };

    useEffect(() => {
        if (Object.keys(selectedEditingMyProfileData)?.length > 0) {
            selectedEditingMyProfileData?.name &&
                setCertificateName(selectedEditingMyProfileData?.name);
            selectedEditingMyProfileData?.issued_by &&
                setCompanyName(selectedEditingMyProfileData?.issued_by);
            selectedEditingMyProfileData?.certificate_id &&
                setCertificateId(selectedEditingMyProfileData?.certificate_id);
            selectedEditingMyProfileData?.link &&
                setCertificateUrl(selectedEditingMyProfileData?.link);
            selectedEditingMyProfileData?.issued_date &&
                setIssuedDate(
                    new Date(selectedEditingMyProfileData?.issued_date)
                );
            selectedEditingMyProfileData?.valid_till &&
                setValidDate(
                    new Date(selectedEditingMyProfileData?.valid_till)
                );
        }
    }, [selectedEditingMyProfileData]);

    useEffect(() => {
        if (errorMessage)
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
    }, [errorMessage]);

    const today = new Date();

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because months are zero-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const handleSuccess = () => {
        updateUserData({ show_new_updates_modal: "success" });
        updateUserData({ selected_editing_my_profile_data: {} });
    };

    const createStudentCertificate = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (
            certificateName &&
            companyName &&
            certificateId &&
            issuedDate
        ) {
            setLoading(true);
            accountsConfig
                .post(
                    "api/v1/users/create-student-certificate/",
                    {
                        name: certificateName,
                        issued_by: companyName,
                        certificate_id: certificateId,
                        link: certificateUrl,
                        issued_date: issuedDate
                            ? Moment(issuedDate)?.format("YYYY-MM-DD")
                            : null,
                        valid_till: validDate
                            ? Moment(validDate)?.format("YYYY-MM-DD")
                            : null,
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    setLoading(false);
                    const { StatusCode, message } = response.data;
                    if (StatusCode === 6000) {
                        handleSuccess();
                    } else {
                        setErrorMessage(message?.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else if (!certificateName) {
            setErrorMessage("Certificate name is required");
        } else if (!companyName) {
            setErrorMessage("Issued by is required");
        } else if (!issuedDate) {
            setErrorMessage("Issued date is required");
        } else if (!certificateId) {
            setErrorMessage("Certificate Id is required");
        }
    };

    const updateStudentCertificate = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (
            (selectedEditingMyProfileData?.name !== certificateName ||
                selectedEditingMyProfileData?.issued_by !== companyName ||
                selectedEditingMyProfileData?.certificate_id !== certificateId ||
                selectedEditingMyProfileData?.link !== certificateUrl ||
                (selectedEditingMyProfileData?.issued_date &&
                    Moment(selectedEditingMyProfileData?.issued_date)?.format("YYYY-MM-DD") !==
                        Moment(issuedDate)?.format("YYYY-MM-DD")) ||
                (selectedEditingMyProfileData?.valid_till
                    ? Moment(selectedEditingMyProfileData?.valid_till)?.format("YYYY-MM-DD") !==
                        Moment(validDate)?.format("YYYY-MM-DD")
                    : validDate)) &&
            certificateName &&
            companyName &&
            issuedDate &&
            certificateId
        ) {
            setLoading(true);
            accountsConfig
                .post(
                    `/api/v1/users/update-student-certificate/${selectedEditingMyProfileData?.id}/`,
                    {
                        name: certificateName,
                        issued_by: companyName,
                        certificate_id: certificateId,
                        link: certificateUrl,
                        issued_date: issuedDate
                            ? Moment(issuedDate)?.format("YYYY-MM-DD")
                            : null,
                        valid_till: validDate
                            ? Moment(validDate)?.format("YYYY-MM-DD")
                            : null,
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    setLoading(false);
                    const { StatusCode, data, message } = response.data;
                    if (StatusCode === 6000) {
                        handleSuccess();
                        updateUserData({ selected_editing_my_profile_data: {} });
                    } else {
                        setErrorMessage(message?.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else if (!certificateName) {
            setErrorMessage("certificate name is required");
        } else if (!companyName) {
            setErrorMessage("issued by is required");
        } else if (!issuedDate) {
            setErrorMessage("issued date is required");
        } else if (!certificateId) {
            setErrorMessage("certificate Id is required");
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
                        <Titles>Add certifications</Titles>
                        <SubTitle>Add your certification details</SubTitle>
                    </TitleLeft>
                    <CloseDiv onClick={handleClose}>
                        <img
                            src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                            alt=""
                        />
                    </CloseDiv>
                </TitleBox>
                <MiddleBox height={innerHeight - 180}>
                    <CertificateNameContainer>
                        Certificate name*
                    </CertificateNameContainer>
                    <CertificateSearchBox>
                        <input
                            type="text"
                            placeholder="Enter certificate name"
                            value={certificateName}
                            onChange={handleNameChange}
                        />
                    </CertificateSearchBox>
                    <IssueNameContainer>Issued by*</IssueNameContainer>
                    <CompanyContainer>
                        <input
                            type="text"
                            placeholder="Company name"
                            value={companyName}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.charAt(0) === " ") {
                                    return;
                                } else if (
                                    /^[a-zA-Z0-9\s]*$/.test(inputValue)
                                ) {
                                    setCompanyName(inputValue);
                                    setErrorMessage("");
                                }
                            }}
                        />
                    </CompanyContainer>

                    <CertificateDateContainer>
                        <IssueDateContainer>
                            <IssueDateLabel>Issue date*</IssueDateLabel>
                            <IssueDate>
                                <ShowStartDate selecteddate={issuedDate}>
                                    <span>
                                        {issuedDate
                                            ? formatDate(issuedDate)
                                            : "DD-MM-YY"}
                                    </span>
                                    <DatePickerCover>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                error={false}
                                                label={null}
                                                onKeyDown={(e) => {
                                                    handleKeyDown();
                                                }}
                                                value={issuedDate}
                                                onChange={(e) => {
                                                    setIssuedDate(e);
                                                    setErrorMessage("");
                                                }}
                                                maxDate={
                                                    validDate
                                                        ? validDate
                                                        : today
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                    </DatePickerCover>
                                </ShowStartDate>
                            </IssueDate>
                        </IssueDateContainer>
                        <ValidDateContainer>
                            <ValidDateLabel>Valid till</ValidDateLabel>
                            <ValidDate>
                                <ShowStartDate selecteddate={validDate}>
                                    <span>
                                        {validDate
                                            ? formatDate(validDate)
                                            : "DD-MM-YY"}
                                    </span>
                                    <DatePickerCover>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                error={false}
                                                label={null}
                                                onKeyDown={(e) => {
                                                    handleKeyDown();
                                                }}
                                                value={validDate}
                                                onChange={(e) => {
                                                    setValidDate(e);
                                                }}
                                                minDate={
                                                    issuedDate
                                                        ? issuedDate
                                                        : false
                                                }
                                            />
                                        </MuiPickersUtilsProvider>
                                    </DatePickerCover>
                                </ShowStartDate>
                            </ValidDate>
                            {validDate && (
                                <ValidClose
                                    onClick={() => {
                                        setValidDate("");
                                    }}
                                >
                                    <img
                                        src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                                        alt=""
                                    />
                                </ValidClose>
                            )}
                        </ValidDateContainer>
                    </CertificateDateContainer>
                    <CertificateIdName>Certificate ID*</CertificateIdName>
                    <CertificateIdContainer>
                        <input
                            type="text"
                            value={certificateId}
                            onChange={(e) => {
                                const inputValue = e.target.value;

                                if (inputValue.charAt(0) === " ") {
                                    return;
                                } else if (
                                    /^[a-zA-Z0-9\s]*$/.test(inputValue)
                                ) {
                                    setCertificateId(inputValue);
                                    setErrorMessage("");
                                }
                            }}
                            placeholder="ex: cert35261"
                        />
                    </CertificateIdContainer>
                    <CertificateLinkName>Certificate link</CertificateLinkName>
                    <CertificateLinkContainer>
                        <input
                            type="url"
                            placeholder="Paste URL"
                            value={certificateUrl}
                            onChange={(e) => {
                                const inputValue = e.target.value;

                                if (inputValue.charAt(0) === " ") {
                                    /^[a-zA-Z0-9\s]*$/.test(inputValue);
                                }
                                {
                                    setCertificateUrl(inputValue);
                                    setErrorMessage("");
                                }
                            }}
                        />
                    </CertificateLinkContainer>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </MiddleBox>
                <FooterBox>
                    <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                    <SaveBtn
                        onClick={() => {
                            if (selectedEditingMyProfileData?.id) {
                                updateStudentCertificate();
                                RequiredField();
                            } else {
                                createStudentCertificate();
                                RequiredField();
                            }
                        }}
                        pointerValue={
                            selectedEditingMyProfileData?.id
                                ? (selectedEditingMyProfileData?.name !==
                                      certificateName ||
                                      selectedEditingMyProfileData?.issued_by !==
                                          companyName ||
                                      selectedEditingMyProfileData?.certificate_id !==
                                          certificateId ||
                                      selectedEditingMyProfileData?.link !==
                                          certificateUrl ||
                                      (selectedEditingMyProfileData?.issued_date &&
                                          Moment(
                                              selectedEditingMyProfileData?.issued_date
                                          )?.format("YYYY-MM-DD") !==
                                              Moment(issuedDate)?.format(
                                                  "YYYY-MM-DD"
                                              )) ||
                                      (selectedEditingMyProfileData?.valid_till
                                          ? Moment(
                                                selectedEditingMyProfileData?.valid_till
                                            )?.format("YYYY-MM-DD") !==
                                            Moment(validDate)?.format(
                                                "YYYY-MM-DD"
                                            )
                                          : validDate)) &&
                                  certificateName &&
                                  companyName &&
                                  issuedDate &&
                                  certificateId
                                : certificateName &&
                                  companyName &&
                                  issuedDate &&
                                  certificateId
                        }
                    >
                        {isLoading ? <RequestLoader height={24} /> : "Save"}
                    </SaveBtn>
                </FooterBox>
            </Modal>
        </>
    );
}

const ValidDate = styled.div`
    position: relative;
    font-size: 12px;
`;

const ErrorMessage = styled.span`
    font-size: 14px;
    color: red;
    font-family: "gordita_regular";
    position: absolute;
    bottom: 15px;
    right: 40px;

    @media (max-width: 640px) {
        font-size: 13px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;

const DatePickerCover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
const ShowStartDate = styled.span`
    /* text-align: center; */
    width: 100%;
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    background: #f9f9f9;
    padding: 10px;
    align-items: center;
    color: #707070;
    font-size: 12px;
    color: ${({ selecteddate }) =>
        selecteddate !== "" ? "#545454" : "#707070"};
    font-family: ${({ selecteddate }) =>
        selecteddate !== "" ? "gordita_medium" : "gordita_regular"};
    span {
        padding-top: 3px;
        display: block;
        color: inherit;
        font-family: inherit;
    }
`;
const Validdate = styled.span`
    padding-top: 3px;
    display: block;
    color: inherit;
`;
const ValidClose = styled.div`
    width: 18px;
    cursor: pointer;
    position: absolute;
    top: 29px;
    right: 10px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        width: 16px;
    }
    @media all and (max-width: 360px) {
        top: 28px;
    }
`;
const Modal = styled.div`
    width: 550px;
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
    overflow-y: scroll;

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
        width: 360px;
        border-radius: none;
    }
    @media all and (max-width: 360px) {
        width: 290px;
    }
    & .MuiInput-underline::after {
        display: none !important;
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
const IssueDate = styled.div`
    margin-right: 10px;
    position: relative;
    font-size: 12px;
`;
const MiddleBox = styled.div`
    padding: 25px;
    position: relative;
    padding-bottom: 44px;
    max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
    overflow-y: scroll;
    overflow-x: hidden;
    p {
        font-size: 14px;
        color: red;
        font-family: "gordita_regular";
        position: absolute;
        right: 30px;
        top: 96px;

        @media (max-width: 640px) {
            font-size: 13px;
        }
        @media (max-width: 360px) {
            font-size: 12px;
        }
    }
`;
const IssueDateLabel = styled.div`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
`;

const CertificateIdName = styled.div`
    font-size: 12px;
    color: #344054;
    margin-bottom: 5px;
`;
const CertificateLinkName = styled.div`
    font-size: 12px;
    color: #344054;
    margin-bottom: 5px;
`;
const ShowValidDate = styled.span`
    min-width: 226px;
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    background: #f9f9f9;
    padding: 8px 9px;
    align-items: center;

    color: #707070;
    font-size: 12px;
    @media all and (max-width: 480px) {
        min-width: 145px;
    }
`;
const CertificateIdContainer = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    input {
        font-size: 16px;
        min-width: 114.285714286%;
        transform: scale(0.875);
        padding: 10px 15px;
        transform-origin: left;
    }
`;
const CertificateLinkContainer = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    width: 100%;
    input {
        font-size: 16px;
        min-width: 114.285714286%;
        transform: scale(0.875);
        padding: 10px 15px;
        transform-origin: left;
    }
`;
const ValidDateLabel = styled.div`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
`;
const ValidDateContainer = styled.div`
    width: 50%;
    position: relative;
    ::before {
    }
`;
const CalendarDivBox = styled.div`
    position: absolute;
    bottom: 60px;
    left: 0;
`;
const ShowIssueDate = styled.span`
    min-width: 226px;
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    background: #f9f9f9;
    padding: 8px 9px;
    align-items: center;
    color: #707070;
    font-size: 12px;
    @media all and (max-width: 480px) {
        min-width: 145px;
    }
`;
const CertificateNameContainer = styled.div`
    font-size: 12px;
    color: #344054;
    margin-bottom: 5px;
`;
const IssueDateContainer = styled.div`
    width: 50%;
`;
const CertificateDateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`;
const CompanyContainer = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    input {
        font-size: 16px;
        min-width: 114.285714286%;
        transform: scale(0.875);
        padding: 10px 15px;
        transform-origin: left;
    }
`;
const IssueNameContainer = styled.div`
    font-size: 12px;
    color: #344054;
    margin-bottom: 5px;
`;
const CertificateSearchBox = styled.div`
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    background: #f9f9f9;
    margin-bottom: 20px;
    position: relative;
    input {
        font-size: 16px;
        min-width: 114.285714286%;
        transform: scale(0.875);
        padding: 10px 15px;
        transform-origin: left;
    }
`;
const FooterBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-radius: 0px 0px 12px 12px;
    background: #fff;
    box-shadow: 0px -4px 10px 7px rgba(0, 0, 0, 0.04);
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
