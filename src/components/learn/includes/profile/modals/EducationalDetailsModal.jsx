import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { accountsConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";
import GeneralModal from "../../general/modals/GeneralModal";

export default function EducationalDetailsModal({ isOffline }) {
    const {
        user_data: { access_token },
        selectedEditingMyProfileData,
        isNewUpdateModal,
    } = useSelector((state) => state);

    const { profileModalType } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [degreeDropDown, setDegreeDropDown] = useState(false);
    const [specialityDropDown, setSpecialityDropDown] = useState(false);
    const [isInstitutionDropDown, setInstitutionDropDown] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    const [selectedSpecialities, setSelectedSpecialities] = useState("");
    const [specialitiesSearchInput, setSpecialitiesSearchInput] = useState("");
    const [stateNameDrop, setStateNameDrop] = useState(false);
    const [selectedDate, handleDateChange] = useState("");
    const [selectedEndDate, handleEnddDateChange] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const classRef = useRef();
    const specialityRef = useRef();
    const [classDropPosition, setClassDropPosition] = useState("");
    const [specialityDropPosition, setSpecialityDropPosition] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isCurrentlyStudying, setCurrentlyStudying] = useState(false);
    const [specialities, setSpecialities] = useState([]);
    const [allSchools, setAllSchools] = useState([]);
    const [studentClass, setStudentClass] = useState([]);
    const [schoolsLoading, setSchoolsLoading] = useState(false);
    const [degreeLoading, setDegreeLoading] = useState(false);
    const [specialityLoading, setSpecialityLoading] = useState(false);
    const [newAddingCampus, setNewAddingCampus] = useState("");

    useEffect(() => {
        if (errorMessage)
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
    }, [errorMessage]);

    useEffect(() => {
        selectedEditingMyProfileData?.institute &&
            setSelectedSchool(selectedEditingMyProfileData?.institute);
        selectedEditingMyProfileData?.campus_name &&
            setNewAddingCampus(selectedEditingMyProfileData?.campus_name);
        selectedEditingMyProfileData?.student_class &&
            setSelectedDegree(selectedEditingMyProfileData?.student_class);
        selectedEditingMyProfileData?.speciality &&
            setSelectedSpecialities(selectedEditingMyProfileData?.speciality);
        selectedEditingMyProfileData?.start_date &&
            handleDateChange(
                new Date(selectedEditingMyProfileData?.start_date)
            );
        selectedEditingMyProfileData?.end_date &&
            handleEnddDateChange(
                new Date(selectedEditingMyProfileData?.end_date)
            );
        selectedEditingMyProfileData?.is_current &&
            setCurrentlyStudying(selectedEditingMyProfileData?.is_current);
        selectedEditingMyProfileData?.is_current &&
            setCurrentlyStudying(selectedEditingMyProfileData?.is_current);
    }, [selectedEditingMyProfileData]);

    useEffect(() => {
        if (classRef.current) {
            const classRefheight = classRef.current.clientHeight;
            setClassDropPosition(`${classRefheight + 2}px`);
        }
        if (specialityRef.current) {
            const specialitysRefheight = specialityRef.current.clientHeight;
            setSpecialityDropPosition(`${specialitysRefheight}px`);
        }
    }, [selectedDegree, selectedSpecialities]);

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

    const handleContainerClick = (event) => {
        event.stopPropagation();
        setInstitutionDropDown(!isInstitutionDropDown);
        setStateNameDrop(!stateNameDrop);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because months are zero-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    const today = new Date();

    const handleStartChangeDate = (date) => {
        handleDateChange(date);
    };
    const handleEndChangeDate = (date) => {
        handleEnddDateChange(date);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            switch (profileModalType) {
                case "date_of_birth":
                    break;

                default:
                    break;
            }
        }
    };

    const handleClose = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });

        dispatch({
            type: "UPDATE_MY_PROFILE_EDITING_DATA",
            selectedEditingMyProfileData: {},
        });

        setSelectedSchool("");
        setSelectedDegree("");
        setSelectedSpecialities("");
        handleDateChange("");
        handleEnddDateChange("");
        setCurrentlyStudying(false);
        setNewAddingCampus("");
    };

    // create new student academic history api //
    const addNewEducation = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (
            selectedSchool?.id &&
            selectedDegree?.id &&
            selectedDate &&
            (selectedEndDate || isCurrentlyStudying)
        ) {
            setLoading(true);

            const specialityId = ["Degree", "PG", "Diploma"]?.includes(
                selectedDegree.name
            )
                ? selectedSpecialities?.id
                : null;
            console.log("create-new-student-academic-history");

            accountsConfig
                .post(
                    "api/v1/users/create-new-student-academic-history/",
                    {
                        institute: selectedSchool?.id,
                        speciality: specialityId ? specialityId : null,
                        student_class: selectedDegree.id,
                        start_date:
                            selectedDate &&
                            Moment(selectedDate)?.format("YYYY-MM-DD"),
                        end_date: selectedEndDate
                            ? Moment(selectedEndDate)?.format("YYYY-MM-DD")
                            : null,
                        is_current: isCurrentlyStudying,
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
        } else if (!selectedSchool?.id && !newAddingCampus) {
            setErrorMessage("campus name is required");
        } else if (!selectedDegree?.id) {
            setErrorMessage("degree  is required");
        } else if (!selectedSpecialities?.id) {
            setErrorMessage("specialities is required");
        } else if (!selectedDate) {
            setErrorMessage("start date is required");
        }
    };

    const updateAcademicHistory = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (pointerValue) {
            setLoading(true);

            const specialityId = ["Degree", "PG", "Diploma"]?.includes(
                selectedDegree.name
            )
                ? selectedSpecialities?.id
                : "";

            accountsConfig
                .post(
                    `api/v1/users/update-academic-history/${selectedEditingMyProfileData?.id}/`,
                    {
                        institute: selectedSchool?.id,
                        speciality: specialityId ? specialityId : null,
                        student_class: selectedDegree?.id,
                        start_date:
                            selectedDate &&
                            Moment(selectedDate)?.format("YYYY-MM-DD"),
                        end_date: selectedEndDate
                            ? Moment(selectedEndDate)?.format("YYYY-MM-DD")
                            : null,
                        is_current: isCurrentlyStudying,
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
                        dispatch({
                            type: "UPDATE_MY_PROFILE_EDITING_DATA",
                            selectedEditingMyProfileData: {},
                        });
                    } else {
                        setErrorMessage(message?.message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    //--- schools List api ---//

    const getSchoolsList = (searchValue) => {
        setSchoolsLoading(true);
        accountsConfig
            .get(`api/v1/campuses/schools/?q=${searchValue}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setAllSchools(data);
                    setSchoolsLoading(false);
                } else {
                    setSchoolsLoading(false);
                    setAllSchools([]);
                }
            })
            .catch((error) => {
                setSchoolsLoading(false);
            });
    };

    //--- Student Class List api ----//

    const getStudentClassList = () => {
        setDegreeLoading(true);
        accountsConfig
            .get("api/v1/campuses/student-classes/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setStudentClass(data);
                    setDegreeLoading(false);
                } else {
                    setDegreeLoading(false);
                }
            })
            .catch((error) => {
                setDegreeLoading(false);
            });
    };

    //----- Student Specialities api -----//

    const getStudentSpecialities = (searchValue) => {
        setSpecialityLoading(true);

        accountsConfig
            .get(
                `api/v1/campuses/student-specialities/?q=${
                    searchValue ? searchValue : ""
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setSpecialities(data);
                    setSpecialityLoading(false);
                } else {
                    setSpecialities([]);
                    setSpecialityLoading(false);
                }
            })
            .catch((error) => {
                setSpecialityLoading(false);
            });
    };

    useEffect(() => {
        if (access_token) {
            getStudentClassList();
        }
    }, [access_token]);

    const addNewCampus = () => {
        if (pointerValue) {
            setLoading(true);
            const specialityId = ["Degree", "PG", "Diploma"]?.includes(
                selectedDegree.name
            )
                ? selectedSpecialities?.id
                : "";
            accountsConfig
                .post(
                    "api/v1/users/campus-verification/create/",
                    {
                        campus_name: newAddingCampus,
                        speciality: specialityId ? specialityId : null,
                        student_class: selectedDegree?.id,
                        start_date:
                            selectedDate &&
                            Moment(selectedDate)?.format("YYYY-MM-DD"),
                        end_date: selectedEndDate
                            ? Moment(selectedEndDate)?.format("YYYY-MM-DD")
                            : null,
                        is_current: isCurrentlyStudying,
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    const { StatusCode, message } = response.data;

                    if (StatusCode === 6000) {
                        handleSuccess();
                        setLoading(false);
                    } else {
                        setErrorMessage(message?.message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else if (!selectedSchool?.id && !newAddingCampus) {
            setErrorMessage("Campus name is required");
        } else if (!selectedDegree?.id) {
            setErrorMessage("Class / Degree is required");
        } else if (!selectedDate) {
            setErrorMessage("Start date is required");
        }
    };
    const editNewAddingCampus = () => {
        if (pointerValue) {
            setLoading(true);
            const specialityId = ["Degree", "PG", "Diploma"]?.includes(
                selectedDegree.name
            )
                ? selectedSpecialities?.id
                : "";
            accountsConfig
                .post(
                    `api/v1/users/campus-verification/update/${selectedEditingMyProfileData?.id}/`,
                    {
                        campus_name: selectedSchool?.id
                            ? selectedSchool?.id
                            : newAddingCampus,
                        speciality: specialityId ? specialityId : null,
                        student_class: selectedDegree?.id,
                        start_date:
                            selectedDate &&
                            Moment(selectedDate)?.format("YYYY-MM-DD"),
                        end_date: selectedEndDate
                            ? Moment(selectedEndDate)?.format("YYYY-MM-DD")
                            : null,
                        is_current: isCurrentlyStudying,
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    const { StatusCode, message } = response.data;

                    if (StatusCode === 6000) {
                        handleSuccess();
                        setLoading(false);
                    } else {
                        setErrorMessage(message?.message);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else if (!selectedSchool?.id && !newAddingCampus) {
            setErrorMessage("campus name is required");
        } else if (!selectedDegree?.id) {
            setErrorMessage("degree  is required");
        } else if (!selectedDate) {
            setErrorMessage("start date is required");
        }
    };

    const pointerValue = selectedEditingMyProfileData?.id
        ? selectedEditingMyProfileData?.campus_verification_status ===
          "approved"
            ? (selectedEditingMyProfileData?.institute?.id !==
                  selectedSchool?.id ||
                  selectedEditingMyProfileData?.student_class?.id !==
                      selectedDegree?.id ||
                  selectedEditingMyProfileData?.speciality?.id !==
                      specialities?.id ||
                  (selectedEditingMyProfileData?.start_date &&
                      Moment(selectedEditingMyProfileData?.start_date)?.format(
                          "YYYY-MM-DD"
                      ) !== Moment(selectedDate)?.format("YYYY-MM-DD")) ||
                  (selectedEditingMyProfileData?.end_date &&
                      Moment(selectedEditingMyProfileData?.end_date)?.format(
                          "YYYY-MM-DD"
                      ) !== Moment(selectedEndDate)?.format("YYYY-MM-DD")) ||
                  selectedEditingMyProfileData?.is_current !==
                      isCurrentlyStudying) &&
              selectedSchool?.id &&
              selectedDegree?.id &&
              selectedDate &&
              (selectedEndDate || isCurrentlyStudying)
            : (selectedEditingMyProfileData?.campus_name !== newAddingCampus ||
                  selectedEditingMyProfileData?.student_class?.id !==
                      selectedDegree?.id ||
                  selectedEditingMyProfileData?.speciality?.id !==
                      specialities?.id ||
                  (selectedEditingMyProfileData?.start_date &&
                      Moment(selectedEditingMyProfileData?.start_date)?.format(
                          "YYYY-MM-DD"
                      ) !== Moment(selectedDate)?.format("YYYY-MM-DD")) ||
                  (selectedEditingMyProfileData?.end_date &&
                      Moment(selectedEditingMyProfileData?.end_date)?.format(
                          "YYYY-MM-DD"
                      ) !== Moment(selectedEndDate)?.format("YYYY-MM-DD")) ||
                  selectedEditingMyProfileData?.is_current !==
                      isCurrentlyStudying) &&
              (selectedSchool?.id || newAddingCampus) &&
              selectedDegree?.id &&
              selectedDate &&
              (selectedEndDate || isCurrentlyStudying)
        : (selectedSchool?.id || newAddingCampus) &&
          selectedDegree?.id &&
          selectedDate &&
          (selectedEndDate || isCurrentlyStudying);

    const [innerHeight, setInnerHeight] = useState("");

    useEffect(() => {
        if (!innerHeight) {
            setInnerHeight(window?.innerHeight);
        }
    }, []);

    const InputcontainerRef = useRef(null);
    const InputSpecialityref = useRef(null);

    return (
        <>
            <Modal height={innerHeight}>
                <TitleBox>
                    <TitleLeft>
                        <Titles>Add education details</Titles>
                        <SubTitle>Add your education details</SubTitle>
                    </TitleLeft>
                    <CloseDiv onClick={handleClose}>
                        <img
                            src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                            alt="Close"
                        />
                    </CloseDiv>
                </TitleBox>
                <MiddleBox height={innerHeight - 180}>
                    <SchoolNameContainer>
                        School / College name*
                    </SchoolNameContainer>
                    <SchoolNameMainBox ref={InputcontainerRef}>
                        <SelectedContainer
                            className={
                                isInstitutionDropDown
                                    ? "active school"
                                    : "school"
                            }
                        >
                            <SelectedSchool>
                                <SchoolContainer
                                    selected={
                                        selectedSchool?.name
                                            ? selectedSchool?.name
                                            : newAddingCampus
                                    }
                                >
                                    {!selectedSchool && !searchInput && (
                                        <SearchIconContainer
                                        // onClick={handleContainerClick}
                                        >
                                            <img
                                                src={require("../../../../../assets/images/myprofile/search.svg")}
                                                alt=""
                                            />
                                        </SearchIconContainer>
                                    )}
                                    <InputContainer>
                                        <input
                                            type="text"
                                            placeholder="Search your campus name"
                                            value={
                                                selectedSchool?.name
                                                    ? selectedSchool?.name
                                                    : newAddingCampus
                                                    ? newAddingCampus
                                                    : searchInput
                                            }
                                            onChange={(e) => {
                                                setSelectedSchool("");
                                                setNewAddingCampus("");
                                                getSchoolsList(e.target.value);
                                                setSearchInput(e.target.value);
                                                setErrorMessage("");
                                            }}
                                        />
                                    </InputContainer>
                                </SchoolContainer>
                            </SelectedSchool>
                            <DownArrowContainer
                                onClick={(e) => {
                                    e.preventDefault();
                                    setInstitutionDropDown(
                                        !isInstitutionDropDown
                                    );
                                    setDegreeDropDown(false);
                                    setSpecialityDropDown(false);
                                }}
                                className={
                                    (isInstitutionDropDown || searchInput) &&
                                    "flip"
                                }
                            ></DownArrowContainer>
                        </SelectedContainer>
                        {newAddingCampus && (
                            <VerificationProcess>
                                Your campus is under verification
                            </VerificationProcess>
                        )}
                        {(isInstitutionDropDown || searchInput) && (
                            <GeneralModal
                                selectedOption={selectedSchool}
                                setSelectedOption={setSelectedSchool}
                                listSourses={allSchools}
                                setDropDown={setInstitutionDropDown}
                                setQsearchValue={setSearchInput}
                                dropLoading={schoolsLoading}
                                qSearchValue={searchInput}
                                setNewAddingCampus={setNewAddingCampus}
                                addNew={
                                    selectedEditingMyProfileData?.id &&
                                    selectedEditingMyProfileData?.campus_verification_status ===
                                        "approved"
                                        ? false
                                        : true
                                }
                                InputcontainerRef={InputcontainerRef}
                            />
                        )}
                    </SchoolNameMainBox>
                    <SchoolNameContainer>Class / Degree*</SchoolNameContainer>
                    <SchoolNameMainBox>
                        <SelectedContainer
                            className={degreeDropDown && "active"}
                            onClick={(e) => {
                                e.preventDefault();
                                setDegreeDropDown(!degreeDropDown);
                                setInstitutionDropDown(false);
                                setSpecialityDropDown(false);
                                setErrorMessage("");
                            }}
                        >
                            <SelectedSchool ref={classRef}>
                                {selectedDegree?.name ? (
                                    <SchoolLabel>
                                        <span>{selectedDegree.name}</span>
                                    </SchoolLabel>
                                ) : (
                                    "Select your Class / Degree"
                                )}
                            </SelectedSchool>
                            <DownArrowContainer
                                className={degreeDropDown ? "flip" : ""}
                            >
                                <img
                                    src={require("../../../../../assets/images/myprofile/down.svg")}
                                    alt=""
                                />
                            </DownArrowContainer>
                        </SelectedContainer>

                        {degreeDropDown && (
                            <GeneralModal
                                selectedOption={selectedDegree}
                                setSelectedOption={setSelectedDegree}
                                listSourses={studentClass}
                                topPosition={classDropPosition}
                                setDropDown={setDegreeDropDown}
                                dropLoading={degreeLoading}
                            />
                        )}
                    </SchoolNameMainBox>
                    {selectedDegree &&
                        ["Degree", "PG", "Diploma"]?.includes(
                            selectedDegree.name
                        ) && (
                            <div>
                                <SchoolNameContainer>
                                    Select Speciality
                                </SchoolNameContainer>
                                <SchoolNameMainBox ref={InputSpecialityref}>
                                    <SelectedContainer
                                        ref={specialityRef}
                                        className={
                                            specialityDropDown && "active"
                                        }
                                    >
                                        <SelectedSchool
                                            selected={
                                                selectedSpecialities?.name
                                            }
                                        >
                                            <input
                                                type="text"
                                                placeholder="eg: Computer Science"
                                                value={
                                                    selectedSpecialities?.name
                                                        ? selectedSpecialities?.name
                                                        : specialitiesSearchInput
                                                }
                                                onChange={(e) => {
                                                    setSpecialitiesSearchInput(
                                                        e.target.value
                                                    );
                                                    getStudentSpecialities(
                                                        e.target.value
                                                    );
                                                    setSelectedSpecialities("");
                                                    setErrorMessage("");
                                                }}
                                            />
                                        </SelectedSchool>
                                    </SelectedContainer>

                                    {specialitiesSearchInput && (
                                        <GeneralModal
                                            selectedOption={
                                                selectedSpecialities
                                            }
                                            setSelectedOption={
                                                setSelectedSpecialities
                                            }
                                            listSourses={specialities}
                                            topPosition={specialityDropPosition}
                                            setQsearchValue={
                                                setSpecialitiesSearchInput
                                            }
                                            dropLoading={specialityLoading}
                                            InputcontainerRef={
                                                InputSpecialityref
                                            }
                                        />
                                    )}
                                </SchoolNameMainBox>
                            </div>
                        )}
                    <MiddleBottom>
                        <DateLabel>
                            <StartDateLabel>Start date*</StartDateLabel>
                            <EndDateLabel>End date</EndDateLabel>
                        </DateLabel>
                        <BotomContainer>
                            <DateContainer>
                                <DateOnly>
                                    <StartDateContainer>
                                        <ShowStartDate
                                            selecteddate={selectedDate}
                                        >
                                            <span>
                                                {selectedDate
                                                    ? formatDate(selectedDate)
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
                                                        value={selectedDate}
                                                        onChange={(e) => {
                                                            handleStartChangeDate(
                                                                e
                                                            );
                                                            setErrorMessage("");
                                                        }}
                                                        format="dd-MM-yyyy"
                                                        // maxDate={new Date()}
                                                        maxDate={
                                                            selectedEndDate
                                                                ? selectedEndDate
                                                                : today
                                                        }
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </DatePickerCover>
                                        </ShowStartDate>
                                    </StartDateContainer>
                                    <EndDateContainer>
                                        <ShowStartDate
                                            selecteddate={selectedEndDate}
                                        >
                                            <span>
                                                {selectedEndDate
                                                    ? formatDate(
                                                          selectedEndDate
                                                      )
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
                                                        value={selectedEndDate}
                                                        onChange={(e) => {
                                                            handleEndChangeDate(
                                                                e
                                                            );
                                                            setCurrentlyStudying(
                                                                false
                                                            );
                                                        }}
                                                        format="dd-MM-yyyy"
                                                        maxDate={today}
                                                        minDate={
                                                            selectedDate
                                                                ? selectedDate
                                                                : false
                                                        }
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </DatePickerCover>
                                        </ShowStartDate>
                                    </EndDateContainer>
                                </DateOnly>
                                <CheckStudy>
                                    <CheckLabel>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                setCurrentlyStudying(
                                                    e.target.checked
                                                );
                                                handleEnddDateChange("");
                                            }}
                                            id="checkbox"
                                            checked={isCurrentlyStudying}
                                        />
                                        <label htmlFor="checkbox">
                                            I currently study here
                                        </label>
                                    </CheckLabel>
                                </CheckStudy>
                            </DateContainer>
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        </BotomContainer>
                    </MiddleBottom>
                </MiddleBox>
                <FooterBox>
                    <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                    <SaveBtn
                        onClick={() => {
                            if (
                                selectedEditingMyProfileData?.id &&
                                !selectedEditingMyProfileData?.campus_name &&
                                !newAddingCampus
                            ) {
                                updateAcademicHistory();
                            } else if (
                                selectedEditingMyProfileData?.id &&
                                selectedEditingMyProfileData?.campus_name &&
                                (newAddingCampus || selectedSchool?.id)
                            ) {
                                editNewAddingCampus();
                            } else if (
                                !selectedEditingMyProfileData?.id &&
                                newAddingCampus
                            ) {
                                addNewCampus();
                            } else {
                                addNewEducation();
                            }
                        }}
                        pointerValue={pointerValue}
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
    margin: 0 auto;
    max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
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

    & .MuiInput-underline:after {
        display: none !important;
    }
`;
const DateOnly = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 640px) {
        margin-bottom: 12px;
    }
`;
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px;
    border-bottom: 1px solid #eaecf0;
    display: flex;
    align-items: center;
`;
const DateLabel = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2px;
`;
const BotomContainer = styled.div`
    display: flex;
    align-items: center;
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
const Email = styled.input`
    font-size: 12px;
    font-family: "gordita_medium";
    color: #727171;
    flex: 1;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const SchoolNameContainer = styled.span`
    font-size: 12px;
    color: #344054;
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
        padding: 0px 5px 0px 10px;
    }
`;
const SchoolSearchBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--base-white, #fff);
`;
const SchoolContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
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
const SelectedSchool = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    min-height: 43px;
    padding: 7px 0px 7px 0px;
    color: #979191;

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
const SearchIconContainer = styled.span`
    display: inline-block;
    min-width: 15px;
    margin-right: 10px;
    img {
        width: 100%;
        display: block;
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
const VerificationProcess = styled.span`
    color: #b54708;
    font-size: 13px;
    margin-top: 6px;
    position: absolute;
    top: 44px;
    bottom: 0;
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
const DatePickerCover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
const MiddleBox = styled.div`
    padding: 25px;
    max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
    overflow-y: scroll;
    overflow-x: hidden;
`;
const MiddleBottom = styled.div``;
const DateContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    @media all and (max-width: 640px) {
        flex-wrap: wrap;
    }
`;
const CheckStudy = styled.div``;
const StartDateContainer = styled.div`
    margin-right: 10px;
    position: relative;
    font-size: 12px;
`;
const StartDateLabel = styled.h6`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
    margin-right: 95px;
    @media all and (max-width: 480px) {
        margin-right: 70px;
    }
`;
const ShowStartDate = styled.span`
    text-align: center;
    min-width: 140px;
    min-height: 40px;
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    background: #f9f9f9;
    padding: 10px 4px;
    align-items: center;
    color: ${({ selecteddate }) => {
        return selecteddate !== "" ? "#545454" : "#707070";
    }};
    font-family: ${({ selecteddate }) =>
        selecteddate !== "" ? "gordita_medium" : "gordita_regular"};
    font-size: 12px;
    & span {
        padding-top: 3px;
        display: block;
        color: inherit;
        font-family: inherit;
    }
    @media all and (max-width: 480px) {
        min-width: 115px;
    }
`;
const EndDateContainer = styled.div`
    position: relative;
    margin-right: 10px;
    ::before {
    }
    input {
        border-radius: 8px;
        border: 1px solid #d9d9d9;
        background: #f9f9f9;
        display: flex;
        padding: 10px 4px;
        align-items: center;
        color: #707070;
    }
`;
const EndDateLabel = styled.h6`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
`;
const CheckLabel = styled.span`
    color: #344054;
    display: flex;
    input {
        margin: 0 5px 3px 0;
    }

    & label {
        cursor: pointer;
        font-size: 13px;
        font-family: gordita_medium;
    }
`;
const ErrorMessage = styled.span`
    font-size: 14px;
    color: red;
    font-family: "gordita_regular";
    position: absolute;
    bottom: 95px;
    display: block;
    right: 27px;

    @media (max-width: 640px) {
        font-size: 13px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
const ErrorText = styled.span`
    color: #b54708;
    font-size: 13px;
    margin-top: 6px;
    position: absolute;
    top: 44px;
    bottom: 0;
    display: block;
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
    cursor: ${({ pointerValue }) => (pointerValue ? "pointer" : "not-allowed")};
    background: ${({ pointerValue }) =>
        pointerValue
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
const InputContainer = styled.div`
    width: calc(100% - 15px);
`;
