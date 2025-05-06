import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AnimationLoader from "./DropLoader";
import plus from "../../../../../assets/images/profile-screen/plus.svg";
import { Hidden } from "@material-ui/core";

export default function GeneralModal({
    selectedOption,
    setSelectedOption,
    listSourses,
    selectedOptionType,
    isSearch,
    topPosition,
    searchInput,
    setSearchInput,
    setDropDown,
    setQsearchValue,
    dropLoading,
    qSearchValue,
    isName,
    setNewAddingCampus,
    addNew,
    clearOtherState,
    localbodysearchInput,
    wardSearchInput,
    stateSearchInput,
    districtSearchInput,
    languageDrop,
    relationDropDown,
    InputcontainerRef,
}) {
    const containerRef = useRef(null);
    const [parentHeight, setParentHeight] = useState("");
    const [parentTop, setParentTop] = useState("");
    const [isModalOverflowed, setModalOverflowed] = useState(false);

    // function for set the selected option
    const renderSelectOption = (listSourse) => {
        if (selectedOptionType === "array") {
            if (selectedOption?.some((item) => item.id === listSourse.id)) {
                setSelectedOption(
                    selectedOption.filter((item) => item.id !== listSourse.id)
                );
            } else {
                setSelectedOption([
                    ...selectedOption,
                    { ...listSourse, isNew: true },
                ]);
            }
        } else {
            if (isName) {
                setSelectedOption(listSourse?.name);
            } else {
                setSelectedOption(listSourse);
            }
            if (clearOtherState) {
                clearOtherState();
            }
            if (setDropDown) {
                setDropDown(false);
            }
            if (setQsearchValue) {
                setQsearchValue("");
            }
        }
    };

    const getCurrentList = () => {
        if (searchInput) {
            return listSourses?.filter((listSourse) =>
                listSourse?.name
                    ?.toLowerCase()
                    ?.includes(searchInput.toLowerCase())
            );
        } else {
            return listSourses;
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                if (InputcontainerRef) {
                    if (!InputcontainerRef.current.contains(event.target)) {
                        if (setDropDown) {
                            setDropDown(false);
                        }
                        if (setQsearchValue) {
                            setQsearchValue("");
                        }
                        if (setSearchInput) {
                            setSearchInput("");
                        }
                    }
                } else {
                    if (setDropDown) {
                        setDropDown(false);
                    }
                    if (setQsearchValue) {
                        setQsearchValue("");
                    }
                    if (setSearchInput) {
                        setSearchInput("");
                    }
                }
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const parentTopValue =
            containerRef?.current?.getBoundingClientRect()?.top;
        const parentHeightValue = containerRef?.current?.clientHeight;
        setParentHeight(parentHeightValue);
        setParentTop(parentTopValue);

        if (window?.innerHeight < parentTopValue + parentHeightValue) {
            setModalOverflowed(true);
        }
    }, []);

    return (
        <SelectContainer
            className={
                localbodysearchInput ||
                wardSearchInput ||
                stateSearchInput ||
                districtSearchInput ||
                languageDrop ||
                relationDropDown
                    ? "active"
                    : ""
            }
            topPosition={isModalOverflowed ? `-${parentHeight}px` : topPosition}
            isSearch={isSearch}
            ref={containerRef}
        >
            {isSearch && (
                <SkillNameBoxContainer>
                    <SkillNameBox>
                        <SearchIconContainer>
                            <SearchIcon
                                src={require("../../../../../assets/images/myprofile/search.svg")}
                                alt=""
                            />
                        </SearchIconContainer>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </SkillNameBox>
                </SkillNameBoxContainer>
            )}

            {dropLoading ? (
                <AnimationLoader height={50} width={50} />
            ) : (
                <>
                    {getCurrentList()?.length > 0 ? (
                        getCurrentList().map((listSourse) => (
                            <SelectedCard
                                key={listSourse.id}
                                onClick={() => {
                                    renderSelectOption(listSourse);
                                }}
                                isSelected={
                                    selectedOptionType === "array"
                                        ? selectedOption.some(
                                              (item) =>
                                                  item.id === listSourse.id
                                          )
                                        : isName
                                        ? selectedOption === listSourse.name
                                        : selectedOption.id === listSourse.id
                                }
                            >
                                <Title>{listSourse?.name}</Title>
                                {selectedOptionType === "array"
                                    ? selectedOption?.some(
                                          (item) => item.id === listSourse.id
                                      ) && (
                                          <CheckImg
                                              src={require("../../../../../assets/images/job-desk/success-tick.svg")}
                                              alt="Check"
                                          />
                                      )
                                    : isName
                                    ? selectedOption === listSourse?.name && (
                                          <CheckImg
                                              src={require("../../../../../assets/images/job-desk/success-tick.svg")}
                                              alt="Check"
                                          />
                                      )
                                    : selectedOption?.id === listSourse?.id && (
                                          <CheckImg
                                              src={require("../../../../../assets/images/job-desk/success-tick.svg")}
                                              alt="Check"
                                          />
                                      )}
                            </SelectedCard>
                        ))
                    ) : addNew ? (
                        <AddCampus
                            onClick={() => {
                                if (setQsearchValue) {
                                    if (setNewAddingCampus) {
                                        setNewAddingCampus(qSearchValue);
                                        setTimeout(() => {
                                            setQsearchValue("");
                                        }, 100);
                                    }
                                }
                            }}
                        >
                            <AddContainer>
                                <AddButton>
                                    <img src={plus} alt="plusIcon" />
                                </AddButton>
                                <AddText>Add</AddText>
                                <Paragraph>
                                    "<span>{qSearchValue}</span>" as your campus
                                    {/* <SearchValue>"{qSearchValue}"</SearchValue>
                                    <Paragraph>as your campus</Paragraph> */}
                                </Paragraph>
                            </AddContainer>
                        </AddCampus>
                    ) : (
                        <NoData>No data found</NoData>
                    )}
                </>
            )}
        </SelectContainer>
    );
}

const SelectContainer = styled.div`
    background: #fff;
    box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03),
        0px 20px 24px -4px rgba(16, 24, 40, 0.08);
    /* border-radius: 4px; */
    min-width: 300px;
    width: 100%;
    position: absolute;
    left: 0px;
    top: ${({ topPosition }) => (topPosition ? topPosition : "45px")};
    padding: ${({ isSearch }) => !isSearch && " 6px 0"};
    z-index: 10;
    max-height: 274px;
    overflow-y: scroll;
    /* &.active {
        overflow-y: hidden;
    } */

    @media (max-width: 480px) {
        min-width: 100%;
        max-width: 100%;
    }
`;
const SelectedCard = styled.div`
    background-color: ${(props) => (props.isSelected ? "#eaf8ed" : "#ffff")};
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 15px 8px 15px;
    margin-bottom: 3px;
    font-family: "gordita_medium";
    justify-content: space-between;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: #eaf8ed;
    }
`;
const CheckImg = styled.img`
    display: block;
    width: 16px;
    margin-bottom: 2px;
`;
const Title = styled.p`
    font-size: 16px;
    font-family: "Gordita_medium" !important;

    &::first-letter {
        text-transform: uppercase;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
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

        font-size: 16px;
        /* min-width: 114.285714286%; */
        min-width: 105.33333333333331%;
        transform: scale(0.875);
        transform-origin: left;
    }
`;
const SearchIconContainer = styled.div`
    min-width: 17px;
    margin: 0 10px 3px 0;
`;
const SearchIcon = styled.img`
    width: 100%;
    display: block;
`;

const SkillNameBoxContainer = styled.div`
    padding: 10px 10px 5px;
    position: sticky;
    top: 0;
    background-color: #fff;
`;
const NoData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
`;
const AddCampus = styled.div`
    position: sticky;
    bottom: -10px;
    background-color: #fff;
    color: #000;
    padding: 13px 12px;
    text-decoration: none;
    border-radius: 0px 0px 5px 5px;
    z-index: 999;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px dotted #d9d9d9;
`;
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 360px) {
        flex-wrap: wrap;
    }
`;
const AddButton = styled.div`
    min-width: 16px;
    margin-right: 6px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        width: 15px;
    }
`;
const AddText = styled.span`
    color: #12a46f;
    font-size: 16px;
    font-family: "gordita_medium";
    padding-top: 3px;
    margin-right: 5px;
    display: block;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
`;
const SearchContainer = styled.div``;
const SearchValue = styled.span`
    margin-right: 5px;
    font-family: "gordita_medium";
    font-size: 14px;
    display: block;
    color: #000000;
    padding-top: 3px;
`;
const Paragraph = styled.p`
    padding-top: 3px;
    font-size: 14px;
    color: #707070;
    overflow-wrap: anywhere;

    & span {
        margin-right: 5px;
        font-family: "gordita_medium";
        font-size: 14px;
        display: inline;
        color: #000000;
        padding-top: 3px;
    }
    @media all and (max-width: 640px) {
        font-size: 13px;
    }
`;
