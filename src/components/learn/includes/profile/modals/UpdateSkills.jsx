import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";
import GeneralModal from "../../general/modals/GeneralModal";

export default function UpdateSkills({ userProfileDetails, isOffline }) {
    const {
        user_data: { access_token },
        isNewUpdateModal,
    } = useSelector((state) => state);

    const handleClose = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
    };

    const dispatch = useDispatch();
    const [isSkillsDropDown, setSkillsDropDown] = useState(false);
    const [codingLangDropPosition, setCodingLangDropPosition] = useState("");
    const [skillDropPosition, setSkillDropPosition] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [isLanguagesDropDown, setLanguagesDropDown] = useState(false);
    const [allProgrammingLanguages, setAllProgrammingLanguages] = useState([]);
    const [selectedProgrammingLanguages, setSelectedProgrammingLanguages] =
        useState([]);

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [skillsLoading, setSkillsLoading] = useState(false);
    const [languagesLoading, setLanguagesLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const codingLangRef = useRef();
    const skillsRef = useRef();

    useEffect(() => {
        if (
            userProfileDetails?.programming_languages &&
            userProfileDetails?.technology_skills &&
            isNewUpdateModal
        ) {
            setSelectedProgrammingLanguages(
                userProfileDetails?.programming_languages
            );
            setSelectedSkills(userProfileDetails?.technology_skills);
        }
    }, [userProfileDetails?.programming_languages, isNewUpdateModal]);

    useEffect(() => {
        if (codingLangRef.current) {
            const codingRefheight = codingLangRef.current.clientHeight;
            setCodingLangDropPosition(`${codingRefheight + 3}px`);
        }
        if (skillsRef.current) {
            const skillsRefheight = skillsRef.current.clientHeight;
            setSkillDropPosition(`${skillsRefheight + 2}px`);
        }
    }, [selectedSkills, selectedProgrammingLanguages]);

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

    const handleSkillDeselect = (skill) => {
        setSelectedSkills((prevSelectedSkills) =>
            prevSelectedSkills.filter(
                (selectedSkill) => selectedSkill.id !== skill.id
            )
        );
    };

    const handleCodeDeselect = (code) => {
        setSelectedProgrammingLanguages((prevSelectedCodes) =>
            prevSelectedCodes.filter(
                (selectedCode) => selectedCode.id !== code.id
            )
        );
    };

    //--------- Technology Skills list ----------//
    const getTechnologySkills = () => {
        setSkillsLoading(true);

        serverConfig
            .get("general/technology-skills/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setAllSkills(data);
                    setSkillsLoading(false);
                } else {
                    setSkillsLoading(false);
                }
            })
            .catch((error) => {
                setSkillsLoading(false);
            });
    };

    const getProgrammingLanguages = () => {
        setLanguagesLoading(true);

        serverConfig
            .get("general/programming-languages/", {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setAllProgrammingLanguages(data);
                    setLanguagesLoading(false);
                } else {
                    setLanguagesLoading(false);
                }
            })
            .catch((error) => {
                setLanguagesLoading(false);
            });
    };

    useEffect(() => {
        if (access_token) {
            getTechnologySkills();
            getProgrammingLanguages();
        }
    }, [access_token]);

    //--------- Create New Programming Languages --------//
    const updateSkills = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else if (
            (selectedProgrammingLanguages?.length > 0 ||
                selectedSkills?.length > 0) &&
            (!isCodingLanguagesNotChanged || !isTechnologyNotChanged)
        ) {
            setLoading(true);
            const languageNames = selectedProgrammingLanguages.map(
                (lang) => lang.name
            );
            const skillNames = selectedSkills.map((skill) => skill.name);
            serverConfig
                .post(
                    "general/add-new-skills/",
                    {
                        languages: JSON.stringify(languageNames),
                        skills: JSON.stringify(skillNames),
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                )
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        handleSuccess();
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const [innerHeight, setInnerHeight] = useState("");

    useEffect(() => {
        if (!innerHeight) {
            setInnerHeight(window?.innerHeight);
        }
    }, []);

    function areListsEqual(list1, list2) {
        // Check if the lists have the same length
        if (list1?.length !== list2?.length) {
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
    const isCodingLanguagesNotChanged = areListsEqual(
        userProfileDetails?.programming_languages,
        selectedProgrammingLanguages
    );
    const isTechnologyNotChanged = areListsEqual(
        userProfileDetails?.technology_skills,
        selectedSkills
    );

    return (
        <>
            <Modal height={innerHeight}>
                <TitleBox>
                    <TitleLeft>
                        <TitleDiv>
                            <Titles>Coding languages/Technologies</Titles>
                            <CloseDiv onClick={handleClose}>
                                <img
                                    src={require("../../../../../assets/icons/new-updates/x-close.svg")}
                                    alt=""
                                />
                            </CloseDiv>
                        </TitleDiv>
                        <SubTitle>
                            Edit your skills and coding languages known to you
                        </SubTitle>
                    </TitleLeft>
                </TitleBox>
                <MiddleBox>
                    <Skill>
                        <SkillsNameContainer>Skills</SkillsNameContainer>
                        <SkillsNameMain>
                            <SelectedSkillContainer
                                className={isSkillsDropDown && "active"}
                                onClick={() => {
                                    setSkillsDropDown(!isSkillsDropDown);
                                }}
                            >
                                <SelectedSkills ref={skillsRef}>
                                    {selectedSkills?.length > 0
                                        ? selectedSkills.map((skill, index) => (
                                              <SkillsLabel key={index}>
                                                  <span>{skill?.name}</span>

                                                  <button
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleSkillDeselect(
                                                              skill
                                                          );
                                                      }}
                                                  >
                                                      <img
                                                          src={require("../../../../../assets/icons/new-updates/close.svg")}
                                                          alt="Close Icon"
                                                      />
                                                  </button>
                                              </SkillsLabel>
                                          ))
                                        : "Select skills"}
                                </SelectedSkills>
                                <DownArrowContainer
                                    onClick={(e) => {
                                        setSkillsDropDown(!isSkillsDropDown);
                                        setLanguagesDropDown(false);
                                    }}
                                    className={isSkillsDropDown && "flip"}
                                >
                                    <img
                                        src={require("../../../../../assets/images/myprofile/down.svg")}
                                        alt=""
                                    />
                                </DownArrowContainer>
                            </SelectedSkillContainer>

                            {isSkillsDropDown && (
                                <GeneralModal
                                    selectedOption={selectedSkills}
                                    setSelectedOption={setSelectedSkills}
                                    selectedOptionType={"array"}
                                    listSourses={allSkills}
                                    isSearch={true}
                                    topPosition={skillDropPosition}
                                    searchInput={searchInput}
                                    setSearchInput={setSearchInput}
                                    dropLoading={skillsLoading}
                                    setDropDown={setSkillsDropDown}
                                />
                            )}
                        </SkillsNameMain>
                    </Skill>
                    <Coding>
                        <CodingNameContainer>
                            Coding languages/Technologies
                        </CodingNameContainer>
                        <CodingNameMain>
                            <SelectedCodeContainer
                                className={isLanguagesDropDown && "active"}
                                onClick={() => {
                                    setLanguagesDropDown(!isLanguagesDropDown);
                                }}
                            >
                                <SelectedCodes
                                    ref={codingLangRef}
                                    isSelected={
                                        selectedProgrammingLanguages?.length > 0
                                    }
                                >
                                    {selectedProgrammingLanguages?.length > 0
                                        ? selectedProgrammingLanguages.map(
                                              (code, index) => (
                                                  <CodesLabel key={index}>
                                                      <span>{code.name}</span>
                                                      <button
                                                          onClick={(e) => {
                                                              e.stopPropagation();

                                                              handleCodeDeselect(
                                                                  code
                                                              );
                                                          }}
                                                      >
                                                          <img
                                                              src={require("../../../../../assets/icons/new-updates/close.svg")}
                                                              alt="Close Icon"
                                                          />
                                                      </button>
                                                  </CodesLabel>
                                              )
                                          )
                                        : "Select coding languages"}
                                </SelectedCodes>
                                <DownArrowContainer
                                    onClick={(e) => {
                                        setLanguagesDropDown(
                                            !isLanguagesDropDown
                                        );
                                        setSkillsDropDown(false);
                                    }}
                                    className={isLanguagesDropDown && "flip"}
                                >
                                    <img
                                        src={require("../../../../../assets/images/myprofile/down.svg")}
                                        alt=""
                                    />
                                </DownArrowContainer>
                            </SelectedCodeContainer>

                            {isLanguagesDropDown && (
                                <GeneralModal
                                    selectedOption={
                                        selectedProgrammingLanguages
                                    }
                                    setSelectedOption={
                                        setSelectedProgrammingLanguages
                                    }
                                    selectedOptionType={"array"}
                                    listSourses={allProgrammingLanguages}
                                    isSearch={true}
                                    topPosition={codingLangDropPosition}
                                    searchInput={searchInput}
                                    setSearchInput={setSearchInput}
                                    dropLoading={languagesLoading}
                                    setDropDown={setLanguagesDropDown}
                                />
                            )}
                        </CodingNameMain>
                    </Coding>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </MiddleBox>

                <FooterBox>
                    <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                    <SaveBtn
                        onClick={updateSkills}
                        pointerValue={
                            // selectedProgrammingLanguages?.length > 0 ||
                            // selectedSkills?.length > 0 ||
                            // !isCodingLanguagesNotChanged ||
                            // !isTechnologyNotChanged
                            (selectedProgrammingLanguages?.length > 0 ||
                                selectedSkills?.length > 0) &&
                            (!isCodingLanguagesNotChanged ||
                                !isTechnologyNotChanged)
                        }
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
`;
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px;
    border-bottom: 1px solid #eaecf0;
    width: 100%;
`;
const TitleLeft = styled.div`
    width: 100%;
`;
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
    @media (max-width: 640px) {
        width: 20px;
    }
    img {
        width: 100%;
        display: block;
    }
`;
const MiddleBox = styled.div`
    padding: 25px;
    max-height: 272px;
    min-height: 200px;
    /* overflow-y: scroll; */
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
const Skill = styled.div``;
const SkillsNameContainer = styled.span`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
`;
const SkillsNameMain = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    position: relative;

    input {
        width: 100%;
    }
`;
const CodeNameBox = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 10px 15px;
    background: var(--base-white, #fff);
    width: 100%;
    display: flex;
    align-items: center;
    input {
        flex: 1;
        width: 100%;
    }
`;
const SelectedSkillContainer = styled.div`
    border: 1px solid #d9d9d9;
    position: relative;
    padding: 0px 40px 0 15px;
    min-height: 45px;
    width: 100%;
    border-radius: 8px;
    position: relative;
    background: #fff;
    /* box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.08); */
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.active {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-color: #12a46f;
    }
`;
const SelectedSkills = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    min-height: 43px;
    padding: 7px 0px;
    font-family: ${({ isSelected }) =>
        isSelected ? "gordita_medium" : "gordita_regular"};
    font-size: 12px;
    max-height: 85px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const SkillsLabel = styled.div`
    display: flex;
    align-items: center;
    background-color: #ecfdf3;
    padding: 5px;
    border-radius: 8px;
    span {
        color: #027a48;
        margin-right: 10px;
        font-size: 13px;
        font-family: gordita_medium;
    }
    button {
        display: inline-block;
        width: 15px;
        cursor: pointer;
        img {
            width: 100%;
            display: block;
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
const DropdownContentt = styled.div`
    overflow-y: scroll;
    max-height: 300px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.08);
    height: 0;
    position: absolute;
    top: ${({ codingLangDropPosition }) =>
        codingLangDropPosition ? codingLangDropPosition : "44px"};
    z-index: 2;
    &.active {
        height: auto;
    }
`;

const DropdownContent = styled.div`
    overflow-y: scroll;
    max-height: 300px;
    width: 100%;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.08);
    height: 0;
    transition: 200ms ease-in linear;
    border-radius: 8px;
    position: absolute;
    top: ${({ skillDropPosition }) =>
        skillDropPosition ? skillDropPosition : "44px"};
    z-index: 2;
    &.active {
        height: auto;
    }
`;
const SkillsSearchBox = styled.div`
    border-radius: 8px;
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #ffff;
    padding: 10px;
    input {
        width: 85%;
    }
`;

const SkillNameBox = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    input {
        flex: 1;
        width: 100%;
    }
`;
const SearchIconContainer = styled.span`
    display: inline-block;
    width: 15px;
    margin-right: 10px;
    img {
        width: 100%;
        display: block;
    }
`;
const SearchIcon = styled.img`
    width: 100%;
    display: block;
`;
const DropDownOption = styled.span`
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    &:hover {
        background: #e4f8ed;
    }
`;
const GreenTickDiv = styled.div`
    width: 20px;
`;
const GreenTick = styled.img`
    display: block;
    width: 100%;
`;
const Coding = styled.div``;
// const Container = styled.div``;
const CodingNameContainer = styled.span`
    color: #344054;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
`;
const ErrorMessage = styled.span`
    font-size: 14px;
    color: red;
    font-family: "gordita_regular";
    position: absolute;
    bottom: 93px;
    right: 30px;

    @media (max-width: 640px) {
        font-size: 13px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
const CodingNameMain = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    position: relative;

    input {
        width: 100%;
    }
`;
const SelectedCodeContainer = styled.div`
    border: 1px solid #d9d9d9;
    position: relative;
    padding: 0px 40px 0 15px;
    min-height: 45px;
    width: 100%;
    border-radius: 8px;
    background: #fff;
    /* box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.08); */
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.active {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-color: #12a46f;
    }
`;
const SelectedCodes = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 10px;
    flex-wrap: wrap;
    width: 100%;
    min-height: 43px;
    padding: 7px 0px;
    font-family: ${({ isSelected }) =>
        isSelected ? "gordita_medium" : "gordita_regular"};
    font-size: 12px;
    max-height: 85px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const CodesLabel = styled.div`
    display: flex;
    align-items: center;
    background: #e8eefb;
    padding: 5px;
    border-radius: 8px;
    & span {
        color: #3437ca;
        margin-right: 10px;
        font-size: 13px;
        font-family: gordita_medium;
    }
    & button {
        display: inline-block;
        width: 15px;
        cursor: pointer;
        img {
            width: 100%;
            display: block;
        }
    }
`;
const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;
