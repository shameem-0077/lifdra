import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FlagDropDown from "../../authentication/general/FlagDropDown";
import CountrySelector from "../../authentication/general/CountrySelector";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { accountsConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";
import GeneralModal from "../../general/modals/GeneralModal";
import Moment from "moment";

export default function AddAddionalDetails({ userProfileDetails }) {
  const {
    user_data: { access_token },
    user_data,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [languageDrop, setLanguageDrop] = useState(false);
  const [localbodyType, setLocalbodyType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [genderNameDrop, setGenderNameDrop] = useState(false);
  const [countryselector, setCountryselector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedLocalBody, setSelectedLocalBody] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [stateSearchInput, setStateSearchInput] = useState("");
  const [districtSearchInput, setDistrictSearchInput] = useState("");
  const [localbodysearchInput, setLocalbodySearchInput] = useState("");
  const [wardSearchInput, setWardSearchInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedDate, handleDateChange] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [localbodyLoading, setlocalbodyLoading] = useState(false);
  const [wardLoading, setwardLoading] = useState(false);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [languageRefHeight, seLlanguageRefHeight] = useState("");
  const today = new Date();

  const languageRef = useRef();

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleChangeDate = (date) => {
    handleDateChange(date);
  };

  useEffect(() => {
    userProfileDetails?.phone
      ? setPhone(userProfileDetails?.phone)
      : user_data?.phone
      ? setPhone(user_data?.phone)
      : setPhone("");
    userProfileDetails?.state && setSelectedState(userProfileDetails?.state);
    userProfileDetails?.district &&
      setSelectedDistrict(userProfileDetails?.district);
    userProfileDetails?.localbody?.type &&
      setLocalbodyType(userProfileDetails?.localbody?.type);
    userProfileDetails?.localbody &&
      setSelectedLocalBody(userProfileDetails?.localbody);
    userProfileDetails?.ward && setSelectedWard(userProfileDetails?.ward);
    userProfileDetails?.gender && setSelectedGender(userProfileDetails?.gender);
    userProfileDetails?.dob &&
      handleDateChange(new Date(userProfileDetails?.dob));
    userProfileDetails?.languages &&
      setSelectedLanguage(userProfileDetails?.languages);
  }, []);

  useEffect(() => {
    if (languageRef.current) {
      const height = languageRef.current.clientHeight;
      seLlanguageRefHeight(`${height}px`);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (access_token) {
      getAllLanguages();
    }
  }, [access_token]);

  const [districts, setDistricts] = useState([]);
  const genders = [
    {
      id: 1,
      name: "male",
    },
    {
      id: 2,
      name: "female",
    },
    {
      id: 3,
      name: "others",
    },
  ];
  const [states, setStates] = useState([]);

  const handleShow = () => {
    setCountryselector((prevValue) => !prevValue);
  };

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
  const handleClose = () => {
    dispatch({
      type: "TOGGLE_NEW_UPDATES_MODAL",
    });
  };

  const handleLanguageDeSelect = (language) => {
    setSelectedLanguage((prevLanguage) =>
      prevLanguage.filter((item) => item.id !== language.id)
    );
  };

  const [wards, setWards] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allLocalbodies, setAllLocalbodies] = useState([]);

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

  const getAllLanguages = () => {
    setLanguagesLoading(true);
    accountsConfig
      .get("general/all-languages/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setAllLanguages(data);
          setLanguagesLoading(false);
        } else {
          setLanguagesLoading(false);
        }
      })
      .catch((error) => {
        setLanguagesLoading(false);
      });
  };
  //--- Add additional information ---//

  const addAdditionalInfo = () => {
    if (
      userProfileDetails?.state?.id !== selectedState?.id ||
      userProfileDetails?.district?.id !== selectedDistrict?.id ||
      userProfileDetails?.localbody?.id !== selectedLocalBody?.id ||
      userProfileDetails?.ward?.id !== selectedWard?.id ||
      userProfileDetails?.gender !== selectedGender ||
      userProfileDetails?.dob !== Moment(selectedDate)?.format("YYYY-MM-DD") ||
      !isLanguagesNotChanged
    ) {
      setLoading(true);

      const languagesNameList = selectedLanguage.map((lang) => lang?.name);

      accountsConfig
        .post(
          "api/v1/users/add-additional-info/",
          {
            state: selectedState?.id ? selectedState?.id : null,
            temp_district: selectedDistrict?.id ? selectedDistrict?.id : null,
            temp_ward: selectedWard?.id ? selectedWard?.id : null,
            temp_localbody: selectedLocalBody?.id
              ? selectedLocalBody?.id
              : null,
            languages: JSON.stringify(languagesNameList),
            gender: selectedGender,
            dob: selectedDate && Moment(selectedDate)?.format("YYYY-MM-DD"),
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((response) => {
          setLoading(false);
          const { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            handleSuccess();
          } else {
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  //--- district List api ---//

  const getDistrictList = (searchValue) => {
    setDistrictLoading(true);

    accountsConfig
      .get(`general/list-districts/`, {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { q: searchValue, state: selectedState?.id },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setDistricts(data);
          setDistrictLoading(false);
        } else {
          setDistrictLoading(false);
        }
      })
      .catch((error) => {
        setDistrictLoading(false);
      });
  };

  //--- List State api ---//

  const getStateList = (searchValue) => {
    setStateLoading(true);

    accountsConfig
      .get(`general/list-states/?q=${searchValue ? searchValue : ""}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setStates(data);
          setStateLoading(false);
        } else {
          setStateLoading(false);
        }
      })
      .catch((error) => {
        setStateLoading(false);
      });
  };

  //--- Local bodies list api ---//

  const getLocalBodies = (searchValue) => {
    setlocalbodyLoading(true);

    accountsConfig
      .get(`general/list-localbodies/`, {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          type: localbodyType,
          q: searchValue,
          district: selectedDistrict?.id,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setAllLocalbodies(data);
          setlocalbodyLoading(false);
        } else {
          setlocalbodyLoading(false);
        }
      })
      .catch((error) => {
        setlocalbodyLoading(false);
      });
  };

  //--- Ward List api ---//

  const getWardList = (searchValue) => {
    setwardLoading(true);

    accountsConfig
      .get("general/list-wards/", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { q: searchValue, localbody: selectedLocalBody?.id },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setWards(data);
          setwardLoading(false);
        } else {
          setwardLoading(false);
        }
      })
      .catch((error) => {
        setwardLoading(false);
      });
  };

  const clearWhenSelectState = () => {
    setSelectedDistrict("");
    setLocalbodyType("");
    setSelectedLocalBody("");
    setSelectedWard("");
  };

  const clearWhenSelectDistrict = () => {
    setLocalbodyType("");
    setSelectedLocalBody("");
    setSelectedWard("");
  };

  const clearWhenSelectLocalbodyType = () => {
    setSelectedLocalBody("");
    setSelectedWard("");
  };

  const clearWhenSelectLocalbody = () => {
    setSelectedWard("");
  };

  function areListsEqual(list1, list2) {
    // Check if the lists have the same length
    if (list1.length !== list2.length) {
      return false;
    }

    // Iterate through the elements of list1
    for (let i = 0; i < list1.length; i++) {
      const item1 = list1[i];
      const item2 = list2[i];

      // Compare individual properties of each item
      if (item1.id !== item2.id || item1.name !== item2.name) {
        return false; // Lists are not equal
      }
    }

    return true; // Lists are equal
  }

  const isLanguagesNotChanged = areListsEqual(
    userProfileDetails?.languages,
    selectedLanguage
  );

  const renderSetLocalBodyType = (type) => {
    setLocalbodyType(type);
    clearWhenSelectLocalbodyType();
  };

  const [innerHeight, setInnerHeight] = useState("");

  useEffect(() => {
    if (!innerHeight) {
      setInnerHeight(window?.innerHeight);
    }
  }, []);

  const InputStateRef = useRef(null);
  const InputDistrictRef = useRef(null);
  const InputLocalBodyRef = useRef(null);
  const InputWardRef = useRef(null);

  return (
    <>
      <Modal height={innerHeight}>
        <CountrySelector
          show={countryselector}
          handleClick={handleShow}
          onSelectHandler={onSelectHandler}
          selectedCountry={selectedCountry}
        />

        <TitleBox>
          <TitleLeft>
            <Titles>Add additional info</Titles>
            <SubTitle>Edit your additional details</SubTitle>
          </TitleLeft>
          <CloseDiv onClick={handleClose}>
            <img
              src={require("../../../../../assets/icons/new-updates/x-close.svg")}
              alt=""
            />
          </CloseDiv>
        </TitleBox>

        <MiddleBox height={innerHeight - 180}>
          <PhoneNameContainer>Phone number</PhoneNameContainer>
          <PhoneBox>
            <>
              <FlagDropDown
                selectedCountry={selectedCountry}
                additional_info={true}
                isArrowIcon={false}
                Responsive={true}
              />

              <InputContainer className="g-medium">
                {selectedCountry && selectedCountry?.phone_code}{" "}
                {phone ? phone : "---"}
              </InputContainer>
            </>
            <VerifiedButton>
              <TickText>Verified</TickText>
              <TickContainer>
                <Tick
                  src={require("../../../../../assets/images/myprofile/tick.svg")}
                  alt=""
                />
              </TickContainer>
            </VerifiedButton>
          </PhoneBox>
          <StateNameContainer>State</StateNameContainer>
          <StateNameMainBox ref={InputStateRef}>
            <SelectedContainer>
              <SelectedState selected={selectedState?.name}>
                <input
                  type="text"
                  placeholder="Search your state"
                  value={
                    selectedState?.name ? selectedState?.name : stateSearchInput
                  }
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) {
                      setSelectedState("");
                      getStateList(e.target.value);
                      setStateSearchInput(e.target.value);
                    }
                  }}
                />
              </SelectedState>
            </SelectedContainer>

            {stateSearchInput && (
              <GeneralModal
                selectedOption={selectedState}
                setSelectedOption={setSelectedState}
                listSourses={states}
                setQsearchValue={setStateSearchInput}
                dropLoading={stateLoading}
                clearOtherState={clearWhenSelectState}
                stateSearchInput={stateSearchInput}
                InputcontainerRef={InputStateRef}
              />
            )}
          </StateNameMainBox>

          <DistrictNameContainer>District</DistrictNameContainer>
          <DistrictNameMainBox ref={InputDistrictRef}>
            <SelectedContainer>
              <SelectedDistrict selected={selectedDistrict?.name}>
                <input
                  type="text"
                  placeholder="Search your district"
                  value={
                    selectedDistrict?.name
                      ? selectedDistrict?.name
                      : districtSearchInput
                  }
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
                      setSelectedDistrict("");
                      getDistrictList(e.target.value);
                      setDistrictSearchInput(e.target.value);
                    }
                  }}
                />
              </SelectedDistrict>
            </SelectedContainer>

            {districtSearchInput && (
              <GeneralModal
                selectedOption={selectedDistrict}
                setSelectedOption={setSelectedDistrict}
                listSourses={districts}
                setQsearchValue={setDistrictSearchInput}
                dropLoading={districtLoading}
                clearOtherState={clearWhenSelectDistrict}
                districtSearchInput={districtSearchInput}
                InputcontainerRef={InputDistrictRef}
              />
            )}
          </DistrictNameMainBox>
          <WardNameContainer>Languages known</WardNameContainer>
          <LocalBodyNameMainBox>
            <SelectedContainer
              className={languageDrop && "active"}
              onClick={() => setLanguageDrop(!languageDrop)}
            >
              <SelectedLocalBody ref={languageRef}>
                {selectedLanguage.length > 0
                  ? selectedLanguage.map((language, index) => (
                      <SchoolLabel key={index}>
                        <span>{language?.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleLanguageDeSelect(language);
                          }}
                        >
                          <img
                            src={require("../../../../../assets/icons/new-updates/close.svg")}
                            alt="Close Icon"
                          />
                        </button>
                      </SchoolLabel>
                    ))
                  : "Select language"}
              </SelectedLocalBody>
              <DownArrowContainer
                onClick={(e) => {
                  e.preventDefault();
                  setLanguageDrop(!languageDrop);
                }}
                className={languageDrop && "flip"}
              >
                <img
                  src={require("../../../../../assets/images/myprofile/down.svg")}
                  alt=""
                />
              </DownArrowContainer>
            </SelectedContainer>

            {languageDrop && (
              <GeneralModal
                selectedOption={selectedLanguage}
                setSelectedOption={setSelectedLanguage}
                listSourses={allLanguages}
                setDropDown={setLanguageDrop}
                selectedOptionType={"array"}
                dropLoading={languagesLoading}
                topPosition={languageRefHeight}
                languageDrop={languageDrop}
              />
            )}
          </LocalBodyNameMainBox>

          <LocalBodyName>Local body</LocalBodyName>
          <Container>
            <RadioLabel
              onClick={() => renderSetLocalBodyType("grama_panchayat")}
            >
              <RadioButton>
                {localbodyType === "grama_panchayat" ? (
                  <img
                    src={require("../../../../../assets/icons/new-updates/checked.svg")}
                    alt="Checked"
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/icons/new-updates/un-checked.svg")}
                    alt="Un checked"
                  />
                )}
              </RadioButton>
              <ButtonLabel>Panchayat</ButtonLabel>
            </RadioLabel>

            <RadioLabel onClick={() => renderSetLocalBodyType("municipality")}>
              <RadioButton>
                {localbodyType === "municipality" ? (
                  <img
                    src={require("../../../../../assets/icons/new-updates/checked.svg")}
                    alt="Checked"
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/icons/new-updates/un-checked.svg")}
                    alt="Un checked"
                  />
                )}
              </RadioButton>
              <ButtonLabel>Municipality</ButtonLabel>
            </RadioLabel>
            <RadioLabel onClick={() => renderSetLocalBodyType("corporation")}>
              <RadioButton>
                {localbodyType === "corporation" ? (
                  <img
                    src={require("../../../../../assets/icons/new-updates/checked.svg")}
                    alt="Checked"
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/icons/new-updates/un-checked.svg")}
                    alt="Un checked"
                  />
                )}
              </RadioButton>
              <ButtonLabel>Corporation</ButtonLabel>
            </RadioLabel>
          </Container>
          <LocalBodyNameMainBox ref={InputLocalBodyRef}>
            <SelectedContainer>
              <SelectedLocalBody selected={selectedLocalBody?.name}>
                <input
                  type="text"
                  placeholder="Search your local body"
                  value={
                    selectedLocalBody?.name
                      ? selectedLocalBody?.name
                      : localbodysearchInput
                  }
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) {
                      setSelectedLocalBody("");
                      getLocalBodies(e.target.value);
                      setLocalbodySearchInput(e.target.value);
                    }
                  }}
                />
              </SelectedLocalBody>
            </SelectedContainer>

            {localbodysearchInput && (
              <GeneralModal
                selectedOption={selectedLocalBody}
                setSelectedOption={setSelectedLocalBody}
                listSourses={allLocalbodies}
                setQsearchValue={setLocalbodySearchInput}
                dropLoading={localbodyLoading}
                clearOtherState={clearWhenSelectLocalbody}
                localbodysearchInput={localbodysearchInput}
                InputcontainerRef={InputLocalBodyRef}
              />
            )}
          </LocalBodyNameMainBox>

          <WardNameContainer>Ward</WardNameContainer>
          <LocalBodyNameMainBox ref={InputWardRef}>
            <SelectedContainer>
              <SelectedWard selected={selectedWard?.name}>
                <input
                  type="text"
                  placeholder="Search your ward"
                  value={
                    selectedWard?.name ? selectedWard?.name : wardSearchInput
                  }
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) {
                      setSelectedWard("");
                      getWardList(e.target.value);
                      setWardSearchInput(e.target.value);
                    }
                  }}
                />
              </SelectedWard>
            </SelectedContainer>

            {wardSearchInput && (
              <GeneralModal
                selectedOption={selectedWard}
                setSelectedOption={setSelectedWard}
                listSourses={wards}
                setQsearchValue={setWardSearchInput}
                dropLoading={wardLoading}
                wardSearchInput={wardSearchInput}
                InputcontainerRef={InputLocalBodyRef}
              />
            )}
          </LocalBodyNameMainBox>
          <GenderNameContainer>Gender</GenderNameContainer>

          <GenderNameMainBox>
            <SelectedContainer
              className={genderNameDrop && "active"}
              onClick={() => setGenderNameDrop(!genderNameDrop)}
            >
              <SelectedGender>
                {selectedGender ? (
                  <GenderLabel>
                    <span>{selectedGender}</span>
                  </GenderLabel>
                ) : (
                  "Select your gender"
                )}
              </SelectedGender>
              <DownArrowContainer
                onClick={(e) => {
                  e.preventDefault();
                  setGenderNameDrop(!genderNameDrop);
                }}
                className={genderNameDrop && "flip"}
              >
                <img
                  src={require("../../../../../assets/images/myprofile/down.svg")}
                  alt=""
                />
              </DownArrowContainer>
            </SelectedContainer>

            {genderNameDrop && (
              <GeneralModal
                selectedOption={selectedGender}
                setSelectedOption={setSelectedGender}
                listSourses={genders}
                setDropDown={setGenderNameDrop}
                isName={true}
              />
            )}
          </GenderNameMainBox>

          <BirthNameContainer>Date of birth</BirthNameContainer>
          <StartDateContainer>
            <ShowStartDate selecteddate={selectedDate}>
              <span>
                {selectedDate ? formatDate(selectedDate) : "DD-MM-YY"}
              </span>
              <DatePickerCover>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    error={false}
                    label={null}
                    onKeyDown={(e) => {
                      handleKeyDown();
                    }}
                    value={selectedDate}
                    onChange={(e) => {
                      handleChangeDate(e);
                    }}
                    format="dd-MM-yyyy"
                    maxDate={today}
                  />
                </MuiPickersUtilsProvider>
              </DatePickerCover>
            </ShowStartDate>
          </StartDateContainer>
        </MiddleBox>
        
        <BottomBox>
          <FooterBox>
            <Group>
              <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
              <SaveBtn
                onClick={addAdditionalInfo}
                pointerValue={
                  userProfileDetails?.state?.id !== selectedState?.id ||
                  userProfileDetails?.district?.id !== selectedDistrict?.id ||
                  userProfileDetails?.localbody?.id !== selectedLocalBody?.id ||
                  userProfileDetails?.ward?.id !== selectedWard?.id ||
                  userProfileDetails?.gender !== selectedGender ||
                  userProfileDetails?.dob !==
                    Moment(selectedDate)?.format("YYYY-MM-DD") ||
                  !isLanguagesNotChanged
                }
              >
                {isLoading ? <RequestLoader height={24} /> : "Save"}
              </SaveBtn>
            </Group>
          </FooterBox>
        </BottomBox>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  width: 550px;
  max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
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
    width: 370px;
  }
  @media all and (max-width: 400px) {
    width: 340px;
  }
  @media all and (max-width: 360px) {
    width: 300px;
  }
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
  border-radius: 10px 10px 0px 0px;
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
  max-height: calc(75vh - 200px);
  overflow-x: hidden;
  overflow-y: ${({ isModal }) => (isModal ? "hidden" : "scroll")};
  max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #eaecf0; /* Change thumb (draggable part) color */
  }
  @media all and (max-width: 360px) {
    padding: 25px 17px;
  }
`;

const FooterBox = styled.div`
  padding: 20px 25px;
  width: 100%;
  border-radius: 0px 0px 12px 12px;
  background: #fff;
  box-shadow: 0px -4px 10px 7px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  /* @media all and (max-width: 400px) {
        padding: 15px;
    } */
`;
const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 10px;
  width: 100%;
  /* @media all and (max-width: 400px) {
        flex-direction: column;
    } */
`;
const SaveBtn = styled.span`
  text-align: center;
  padding: 10px 20px;
  min-width: 48%;
  border-radius: 7px;
  background: linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #fff;
  font-family: "gordita_medium";
  cursor: ${({ pointerValue }) => (pointerValue ? "pointer" : "not-allowed")};
  background: ${({ pointerValue }) =>
    pointerValue
      ? "linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%)"
      : "grey"};

  font-size: 16px;
  min-height: 44px;
`;
const CancelBtn = styled.span`
  text-align: center;
  padding: 10px 20px;
  min-width: 48%;
  color: #344054;
  border-radius: 7px;
  cursor: pointer;
  border: 1px solid #d0d5dd;
  font-family: "gordita_medium";
  font-size: 16px;
  min-height: 44px;
`;
const PhoneNameContainer = styled.div`
  font-size: 12px;
  color: #344054;
  margin-bottom: 5px;
`;
const PhoneBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  background: #f9f9f9;
  width: 100%;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  position: relative;
  border-radius: 7px;
  padding: 12px 4px 8px 4px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-left: 10px;
  width: -webkit-fill-available;
  width: -moz-available;
  &.g-medium {
    font-family: "gordita_medium";
    color: #667085;
    font-size: 16px;
  }
  @media (max-width: 640px) {
    /* padding: 8px 13px; */
  }
  @media (max-width: 480px) {
    /* padding: 8px 8px; */
    border-color: #5f6367;
    font-size: 15px;
  }
  @media (max-width: 380px) {
    font-size: 14px;
  }
  &:focus-within {
    border-color: #5cc66a;
  }
`;
const ErrorText = styled.span`
  font-size: 13px;
  position: absolute;
  left: 0;
  color: #f46565;
  bottom: -27px;
  @media (max-width: 480px) {
    font-size: 12px;
    bottom: -26px;
  }
`;
const VerifiedButton = styled.button`
  display: flex;
  padding: 2px 6px 2px 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  border: 1.5px solid var(--success-600, #039855);
  width: 20%;
  height: 24px;
  @media all and (max-width: 640px) {
    padding: 0px 4px 0px 6px;
    display: none;
  }
`;
const TickText = styled.h6`
  font-size: 12px;
  color: #027a48;
  font-family: gordita_medium;
  margin-right: 4px;
  padding-top: 3px;
  @media all and (max-width: 640px) {
    font-size: 11px;
    line-height: 13px;
    margin-right: 2px;
  }
  @media all and (max-width: 640px) {
    font-size: 9px;
    line-height: 13px;
    margin-right: 0px;
  }
`;
const TickContainer = styled.span`
  display: inline-block;
  width: 12px;
`;
const Tick = styled.img`
  display: block;
  width: 100%;
`;
const StateNameContainer = styled.div`
  color: #344054;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
`;
const GenderNameContainer = styled.div`
  color: #344054;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
`;
const StateNameMainBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    width: 100%;
  }
`;
const GenderNameMainBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
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
  padding: 0px 30px 0 10px;
  min-height: 45px;
  width: 100%;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 12px;
    color: #101828;
    display: block;
    margin-right: 2px;
    padding-top: 2px;
  }
`;
const SelectedWard = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 43px;
  padding: 7px 0px;
  color: #979090;
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
const SelectedState = styled.div`
  font-size: 12px;
  width: 100%;
  input {
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
const SelectedGender = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 43px;
  font-size: 12px;
  /* overflow-y: scroll; */
  padding: 7px 0px;
  color: #979090;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SchoolLabel = styled.div`
  display: flex;
  align-items: center;
  background-color: #ecfdf3;
  padding: 5px;
  border-radius: 8px;
  border: 0.5px solid #9be6a1;

  span {
    font-size: 14px;
    color: #101828;
    margin-right: 10px;
  }
  button {
    display: inline-block;
    width: 13px;
    cursor: pointer;
    img {
      width: 100%;
      display: block;
    }
  }
`;
const DownArrowContainer = styled.span`
  position: absolute;
  cursor: pointer;
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
const DistrictNameContainer = styled.div`
  color: #344054;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
`;
const DistrictNameMainBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    width: 100%;
  }
`;

const SelectedDistrict = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 43px;
  font-size: 12px;
  /* overflow-y: scroll; */
  padding: 7px 0px;
  &::-webkit-scrollbar {
    display: none;
  }

  input {
    flex: 1;
    width: 100%;
    display: inline-block;
    padding-top: 4px;
    font-size: 14px;
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
const LocalBodyName = styled.div`
  color: #344054;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 10px;
`;
const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media all and (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  @media all and (max-width: 640px) {
    justify-content: space-between;
  }
  @media all and (max-width: 400px) {
    margin-bottom: 8px;
  }
`;
const RadioButton = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  cursor: pointer;
  img {
    width: 100%;
    display: block;
  }
`;
const ButtonLabel = styled.h6`
  color: var(--gray-700, #344054);
  cursor: pointer;
  font-size: 12px;
  margin-right: 20px;
  padding-top: 4px;
`;
const LocalBodyNameMainBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    width: 100%;
  }
`;
const GenderLabel = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  span {
    font-size: 14px;
    color: #545454;
    font-family: "gordita_medium";
    &::first-letter {
      text-transform: uppercase;
    }
  }
  button {
    display: inline-block;
    width: 15px;
    img {
      width: 100%;
      display: block;
    }
  }
`;
const SelectedLocalBody = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  min-height: 43px;
  padding: 7px 0px;
  color: #979090;
  max-height: 88px;
  /* overflow-y: scroll; */
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
const WardNameContainer = styled.span`
  font-size: 12px;
  color: #344054;
`;
const BirthNameContainer = styled.span`
  font-size: 12px;
  color: #344054;
`;
const StartDateContainer = styled.div`
  margin-right: 20px;
  position: relative;
  font-size: 12px;
  width: 100%;
`;
const ShowStartDate = styled.span`
  /* text-align: center; */
  min-height: 40px;
  min-width: 100%;
  display: inline-block;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #f9f9f9;
  padding: 10px;
  align-items: center;
  color: #707070;
  font-size: 12px;

  color: ${({ selecteddate }) => (selecteddate !== "" ? "#545454" : "#707070")};
  font-family: ${({ selecteddate }) =>
    selecteddate !== "" ? "gordita_medium" : "gordita_regular"};

  & span {
    color: inherit;
    font-family: inherit;
  }
`;
const BottomBox = styled.div`
  /* position: sticky; */
  bottom: 0;
  z-index: 2;
`;
const DatePickerCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & .MuiInput-underline::after {
    display: none;
  }
`;
