import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";

import animationData from "../../../../assets/lotties/modal/tick.json";
import LoadinganimationData from "../../../../assets/lotties/modal/loading_lottie.json";
import { accountsConfig, communityConfig } from "../../../../axiosConfig";

export default function SubscriptionDiscountModal({ handleIdUploadModal }) {
    const isStudentUploadModal = useSelector(
        (state) => state.isStudentUploadModal
    );
    const user_data = useSelector((state) => state.user_data);
    const user_profile = useSelector((state) => state.user_profile);
    const campus_data = useSelector((state) => state.campus_data);
    const dispatch = useDispatch();

    const [modalType, setModalType] = useState("student");

    //states for filter
    const [isSearch, setSearch] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [selectedCampus, setSelectedCampus] = useState("");
    const [isDropList, setDropList] = useState(false);
    const [newCampus, setNewCampus] = useState("");

    const [idFrontSideFile, setIdfrontSideFile] = useState("");

    const [idFrontSideName, setIdfrontSideName] = useState("");

    const [idBackSideFile, setIdBackSideFile] = useState("");
    const [idBackSideName, setIdBackSideName] = useState("");

    //api fetching states

    const [is_loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "Error Occured . Please Try Again"
    );

    const [instruction] = useState([
        {
            id: 1,
            message:
                " ID card should have the same name as provided in the platform",
        },
        {
            id: 2,
            message:
                " Image format  of ID card should be png, jpg, pdf or jpeg",
        },
        {
            id: 3,
            message:
                " ID card should have the same campus name which you entered",
        },
        {
            id: 4,
            message: " Maximum file size should be less than 5 MB",
        },
    ]);

    useEffect(() => {
        campusSearch();
    }, [searchTerm]);

    const truncate = (str) => {
        if (str) {
            return str.length > 30 ? str.substring(30, 0) + "..." : str;
        }
    };

    const campusSearch = () => {
        if (user_data && searchTerm) {
            let { access_token } = user_data;
            // setLoading(true);
            communityConfig
                .get(`campuses/search-campuses/?q=${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setSearchResults(data);
                        setLoading(false);
                        setError(false);
                    } else if (StatusCode === 6001) {
                        setLoading(false);
                        setError(true);
                        setErrorMessage("An error occurred");
                    }
                })
                .catch((error) => {
                    setError(true);
                    setLoading(false);
                    setErrorMessage("");
                });
        }
    };

    const fetchProfile = () => {
        let { access_token } = user_data;
        accountsConfig
            .get("/api/v1/users/profile/", {
                params: {
                    response_type: "minimal",
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    updateUserProfile(data);
                } else {
                }
            })
            .catch((error) => {});
    };

    const applyStudentId = () => {
        let { access_token } = user_data;
        setLoading(true);

        if (idFrontSideFile) {
            const formData = new FormData();
            formData.append("campus_id_front_side", idFrontSideFile);

            user_profile.student_category !== "Graduates" &&
                formData.append("campus_name", campus_data.name);

            formData.append("campus_id_back_side", idBackSideFile);

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
                        fetchProfile();
                        setModalType("success");
                        setLoading(false);
                        dispatch({
                            type: "UPDATE_SUBSCRIPTION_DISCOUNT_STATUS",
                            subscriptionDiscountStatus: "pending",
                        });
                    } else if (StatusCode === 6001) {
                        setLoading(false);
                        setError(true);
                        setErrorMessage(data.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setError(true);
                });
        } else {
            setErrorMessage("Upload Student Id");
            setError(true);
            setLoading(false);
        }
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {},
    };
    const LoaderOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadinganimationData,
        rendererSettings: {},
    };

    const modal = useRef(null);

    // id frond section input function
    const frontHandleFileChange = (e) => {
        if (e.target.name === "selectedFile") {
            if (e.target.files.length > 0) {
                setIdfrontSideFile(e.target.files[0]);
                setIdfrontSideName(e.target.files[0].name);
            }
        }
    };

    // id back section input function
    const backHandleFileChange = (e) => {
        if (e.target.name === "selectedback-File") {
            if (e.target.files.length > 0) {
                setIdBackSideFile(e.target.files[0]);
                setIdBackSideName(e.target.files[0].name);
            }
        }
    };

    const updateUserProfile = (user_profile) => {
        dispatch({
            type: "UPDATE_USER_PROFILE",
            user_profile: user_profile,
        });
    };

    const updateCampusData = (campus_data) => {
        dispatch({
            type: "UPDATE_CAMPUS_DATA",
            campus_data: campus_data,
        });
    };
    const updateGraduteCampusData = (campus_data) => {
        dispatch({
            type: "UPDATE_CAMPUS_DATA",
            campus_data: (campus_data.name = ""),
        });
    };

    return (
        <BackContainer
            style={{ transform: isStudentUploadModal && "scale(1,1)" }}
        >
            <Overlay onClick={handleIdUploadModal}></Overlay>

            <Modal
                ref={modal}
                modalType={modalType}
                bgimg="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/background.svg"
                type={"heelo"}
            >
                {modalType === "student" ? (
                    <ModalContent modalType={modalType}>
                        <LeftSection>
                            {user_profile?.student_category === "Graduates" ? (
                                <Title>Are you a Graduate / Other ?</Title>
                            ) : (
                                <Title>
                                    Are you a {user_profile?.student_category}{" "}
                                    student ?
                                </Title>
                            )}
                            <Description>
                                If so, please upload your ID card for
                                verification
                            </Description>
                            <ButtonContainer>
                                <NoButton onClick={handleIdUploadModal}>
                                    No, I am not
                                </NoButton>
                                <YesButton
                                    onClick={() =>
                                        setModalType(
                                            user_profile.student_category ===
                                                "Graduates"
                                                ? "upload_id"
                                                : "add_campus"
                                        )
                                    }
                                >
                                    Yes, I am
                                </YesButton>
                            </ButtonContainer>
                        </LeftSection>

                        <RightSection>
                            <ImageCover>
                                <SubscriptionImage
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/person.svg"
                                    alt=""
                                />
                            </ImageCover>
                        </RightSection>
                    </ModalContent>
                ) : modalType === "add_campus" ? (
                    <ModalContent modalType={modalType}>
                        <Title>Add Campus </Title>
                        <Description modalType={modalType}>
                            Select your campus by entering campus name or campus
                            code
                        </Description>
                        <SearchSection id="search-di">
                            <SearchIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/search.svg"
                                alt=""
                            />
                            <SearchBar
                                placeholder="Search campus"
                                type="text"
                                id="search"
                                value={
                                    selectedCampus && isSearch === false
                                        ? selectedCampus.name
                                        : newCampus && isSearch === false
                                        ? newCampus
                                        : searchTerm
                                }
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setDropList(true);
                                }}
                                onClick={() => (
                                    setSearch(true),
                                    setSelectedCampus(""),
                                    setNewCampus("")
                                )}
                            />
                        </SearchSection>

                        <Search>
                            {isDropList &&
                            searchTerm.length > 0 &&
                            searchResults.length > 0 ? (
                                <SearchResult>
                                    {searchResults.map((data, index) => (
                                        <SearchResultCard
                                            onClick={() => {
                                                setSelectedCampus(data);
                                                setSearchTerm(data.name);
                                                setSearch(false);
                                                setSearchResults("");
                                                setDropList(false);
                                                localStorage.setItem(
                                                    "campus_data",
                                                    JSON.stringify(
                                                        data.name
                                                            ? data.name
                                                            : ""
                                                    )
                                                );
                                                let campus_value =
                                                    localStorage.getItem(
                                                        campus_data
                                                    );
                                                updateCampusData({
                                                    ...campus_data,
                                                    name: data.name,
                                                });
                                            }}
                                        >
                                            {data.photo ? (
                                                <CampusImage>
                                                    <Image
                                                        src={data.photo}
                                                        alt=""
                                                    />
                                                </CampusImage>
                                            ) : (
                                                <CampusIcon>
                                                    <Icon
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/green-campus.svg"
                                                        alt=""
                                                    />
                                                </CampusIcon>
                                            )}
                                            <CampusDetails>
                                                <CampusId>
                                                    {data.token_code}
                                                </CampusId>
                                                <CampusName>
                                                    {data.name}
                                                    {data.sub_area && ", "}
                                                    {data.sub_area}
                                                </CampusName>
                                            </CampusDetails>
                                        </SearchResultCard>
                                    ))}
                                </SearchResult>
                            ) : searchResults == 0 &&
                              selectedCampus == 0 &&
                              searchTerm &&
                              newCampus.length <= 0 ? (
                                <SearchResult>
                                    <AddResultCard>
                                        <Section>
                                            <CampusIcon>
                                                <Icon
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/green-campus.svg"
                                                    alt=""
                                                />
                                            </CampusIcon>
                                            <CampusName
                                                style={{ marginLeft: "10px" }}
                                            >
                                                {searchTerm}
                                            </CampusName>
                                        </Section>
                                        <AddButton
                                            onClick={() => {
                                                setNewCampus(searchTerm);
                                                updateCampusData({
                                                    ...campus_data,
                                                    name: searchTerm
                                                        ? searchTerm
                                                        : "",
                                                });
                                            }}
                                        >
                                            <Plus>
                                                <AddIcon
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/plus.svg"
                                                    alt=""
                                                />
                                            </Plus>
                                            Add
                                        </AddButton>
                                    </AddResultCard>
                                </SearchResult>
                            ) : null}
                        </Search>
                        <CampusButtonContainer>
                            <NoButton
                                onClick={() => setModalType("student")}
                                type={"second"}
                            >
                                Back
                            </NoButton>
                            <YesButton
                                onClick={() =>
                                    selectedCampus || newCampus
                                        ? setModalType("upload_id")
                                        : setError(true)
                                }
                            >
                                Continue
                            </YesButton>
                        </CampusButtonContainer>
                        {/* {isError && searchTerm ? <Error>{errorMessage}</Error> : null} */}
                    </ModalContent>
                ) : modalType === "upload_id" ? (
                    <ModalContent modalType={modalType}>
                        <Title>Upload ID card </Title>
                        <FileUploadSection>
                            <FrontSection>
                                <UploadLabel>Front page</UploadLabel>
                                <UploadSection>
                                    <UploadLeft>
                                        <FolderIcon>
                                            <Icon
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/folder-icon.svg"
                                                alt=""
                                            />
                                        </FolderIcon>
                                        <Cover>
                                            {idFrontSideFile &&
                                            idFrontSideName ? (
                                                <Formats>
                                                    {truncate(idFrontSideName)}
                                                </Formats>
                                            ) : (
                                                <>
                                                    <Label>File format</Label>
                                                    <Formats>
                                                        pdf / jpeg / png
                                                    </Formats>
                                                </>
                                            )}
                                        </Cover>
                                    </UploadLeft>
                                    <UploadRight>
                                        <input
                                            type="file"
                                            id="front-file-upload"
                                            name="selectedFile"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) =>
                                                frontHandleFileChange(event)
                                            }
                                        />
                                        <UploadButton htmlFor="front-file-upload">
                                            {idFrontSideFile && idFrontSideName
                                                ? "Change"
                                                : "Upload"}
                                        </UploadButton>
                                        <ChoseLabel>
                                            {idFrontSideFile && idFrontSideName
                                                ? null
                                                : " No file chosen"}
                                        </ChoseLabel>
                                    </UploadRight>
                                </UploadSection>
                            </FrontSection>

                            <BackSection>
                                <UploadLabel>
                                    Back page ( optional )
                                </UploadLabel>
                                <UploadSection>
                                    <UploadLeft>
                                        <FolderIcon>
                                            <Icon
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/folder-icon.svg"
                                                alt=""
                                            />
                                        </FolderIcon>
                                        <Cover>
                                            {idBackSideFile &&
                                            idBackSideName ? (
                                                <Formats>
                                                    {truncate(idBackSideName)}
                                                </Formats>
                                            ) : (
                                                <>
                                                    <Label>File format</Label>
                                                    <Formats>
                                                        pdf / jpeg / png
                                                    </Formats>
                                                </>
                                            )}
                                        </Cover>
                                    </UploadLeft>
                                    <UploadRight>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            id="back-file-upload"
                                            name="selectedback-File"
                                            hidden
                                            onChange={(event) =>
                                                backHandleFileChange(event)
                                            }
                                        />
                                        <UploadButton htmlFor="back-file-upload">
                                            {idBackSideFile && idBackSideName
                                                ? "Change"
                                                : "Upload"}
                                        </UploadButton>
                                        <ChoseLabel>
                                            {idBackSideFile && idBackSideName
                                                ? null
                                                : " No file chosen"}
                                        </ChoseLabel>
                                    </UploadRight>
                                </UploadSection>
                                {isError ? <Error>{errorMessage}</Error> : null}
                            </BackSection>

                            <Instrution>
                                {instruction.map((data) => (
                                    <InstrutionCard>
                                        <BgCover>
                                            <InstrutionImage
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/right-arrow.svg"
                                                alt=""
                                            />
                                        </BgCover>
                                        <InstractionsText>
                                            {data.message}
                                        </InstractionsText>
                                    </InstrutionCard>
                                ))}
                            </Instrution>
                        </FileUploadSection>
                        <UploadButtonContainer>
                            <NoButton
                                style={{ marginBottom: 8 }}
                                onClick={() =>
                                    setModalType(
                                        user_profile.student_category ===
                                            "Graduates"
                                            ? "student"
                                            : "add_campus"
                                    )
                                }
                                type={"second"}
                            >
                                Back
                            </NoButton>
                            {is_loading ? (
                                <YesButton>
                                    <Lottie
                                        options={LoaderOptions}
                                        height={"100%"}
                                    />
                                </YesButton>
                            ) : (
                                <YesButton onClick={applyStudentId}>
                                    Continue
                                </YesButton>
                            )}
                        </UploadButtonContainer>
                    </ModalContent>
                ) : modalType === "success" ? (
                    <ModalContent modalType={modalType}>
                        <SuccesCard>
                            <SuccessIcon>
                                <Lottie
                                    options={defaultOptions}
                                    height={"100%"}
                                    width={"100%"}
                                />
                            </SuccessIcon>
                            <SuccessTitle>
                                You have applied for student plan
                            </SuccessTitle>
                            <SuccessLabel>
                                Your application for the student plan is being
                                processed
                            </SuccessLabel>
                            <ContinueButton
                                onClick={() => {
                                    handleIdUploadModal();
                                    setModalType("");
                                }}
                            >
                                Continue
                            </ContinueButton>
                        </SuccesCard>
                    </ModalContent>
                ) : null}
            </Modal>
        </BackContainer>
    );
}
//overall model styles
const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    transform: scale(0, 0);
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Modal = styled.div`
    width: 650px;
    max-height: 127vh;
    margin: 0 auto;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px 40px;
    border-radius: 10px;
    transition: 0.5s;
    z-index: 101;
    /* background-image: url(${(props) =>
        props.modalType === "success" ? "none" : props.bgimg}); */
    background-repeat: no-repeat;
    background-size: cover;
    background-repeat: no-repeat;

    @media all and (max-width: 980px) {
        padding: 30px 40px;
        width: 650px;
    }
    @media all and (max-width: 768px) {
        padding: 30px 40px;
        width: 550px;
    }
    @media all and (max-width: 640px) {
        width: 400px;
        padding: 20px 30px;
    }
    @media all and (max-width: 480px) {
        width: 370px;
        padding: 27px 25px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;
const ModalContent = styled.div`
    position: relative;
    display: ${(props) => (props.modalType === "student" ? "grid" : null)};
    grid-template-columns: 2fr 1fr;
    transition: 0.5s;
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media all and (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;
// students styless
const LeftSection = styled.div``;

const Title = styled.h3`
    font-size: 24px;
    font-family: gordita_medium;
    @media all and (max-width: 768px) {
        font-size: 20px;
        line-height: 1.4em;
        margin-bottom: 10px;
    }
`;
const Description = styled.p`
    font-family: gordita_medium;
    font-size: 14px;
    color: #5c6260;
    max-width: ${(props) =>
        props.modalType === "addCampus" ? "330px" : "100%"};
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    margin-top: 30px;
    @media all and (max-width: 480px) {
        grid-template-columns: 1fr;
        grid-row-gap: 8px;
        margin-top: 17px;
    }
`;

const NoButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border: 2px solid #4ba870;
    color: #4ba870;
    border-radius: 5px;
    text-align: "center";
    font-family: gordita_medium;
    font-size: 14px;
    cursor: pointer;
    min-width: 200px;
    margin-right: ${(props) => (props.type === "second" ? "30px" : null)};
    @media all and (max-width: 768px) {
        min-width: 140px;
        height: 38px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        min-width: 100px;
        margin-right: 0;
    }
`;
const YesButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border: 2px solid #4ba870;
    background-color: #4ba870;
    color: #fff;
    border-radius: 5px;
    text-align: "center";
    font-family: gordita_medium;
    font-size: 14px;
    cursor: pointer;
    min-width: 200px;
    max-width: 200px;
    margin-right: ${(props) => (props.type === "second" ? "30px" : null)};
    @media all and (max-width: 768px) {
        min-width: 140px;
        max-width: 140px;
        height: 38px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
    }
`;
const RightSection = styled.div`
    position: relative;
    @media all and (max-width: 640px) {
        display: none;
    }
`;
const ImageCover = styled.div`
    position: absolute;
    top: -95px;
    width: 100%;
    right: 0;
    @media all and (max-width: 640px) {
        display: none;
    }
`;
const SubscriptionImage = styled.img`
    width: 100%;
`;

// add_campus styless
const SearchSection = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 20px;
    border-radius: 5px;
    margin-top: 30px;
    box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
    position: relative;
    @media all and (max-width: 640px) {
        height: 40px;
    }
`;
const SearchIcon = styled.img`
    width: 20px;
    margin-right: 20px;
    @media all and (max-width: 480px) {
        width: 15px;
        margin-right: 10px;
    }
`;
const SearchBar = styled.input`
    flex: 1;
    color: #525252;
    position: relative;
    background: transparent;
    font-family: "baloo_paaji_2semibold";
    font-size: 16px;
    &::placeholder {
        color: #afafaf;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
`;
const Search = styled.div`
    position: relative;
    margin-top: 5px;
    background-color: #fff;
    border-radius: 5px;
`;
const CampusButtonContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    @media all and (max-width: 480px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 8px;
    } ;
`;
const SearchResult = styled.div`
    width: 100%;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
    padding: 20px;
    max-height: 250px;
    overflow-y: scroll;
`;
const SearchResultCard = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    &:last-child {
        margin-bottom: 0;
    }
    &:hover {
        background-color: #edf9f5;
    }
`;
const AddResultCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CampusImage = styled.div`
    width: 70px;
    margin-right: 20px;
    @media all and (max-width: 640px) {
        width: 40px;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const Image = styled.img`
    width: 100%;
`;
const CampusIcon = styled.div`
    margin-right: 20px;
`;
const CampusDetails = styled.div``;
const CampusId = styled.h4`
    font-size: 16px;
    font-family: "baloo_paaji_2semibold";
    color: #50b585;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
`;
const CampusName = styled.h4`
    font-size: 16px;
    font-family: "baloo_paaji_2semibold";
    color: #787878;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
`;

const AddButton = styled.span`
    display: flex;
    align-items: center;
    color: #5bc66a;
    font-size: 14px;
    font-family: "baloo_paaji_2semibold";
    line-height: 14px;
    cursor: pointer;
`;
const Plus = styled.span`
    width: 16px;
    display: block;
    margin-right: 10px;
`;
const AddIcon = styled.img`
    width: 100%;
`;
const Section = styled.div`
    display: flex;
    align-items: center;
`;
// upload_id styless
const UploadSection = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px dashed #7dd1b1;
    border-radius: 8px;
    padding: 25px 20px;
    margin-bottom: 25px;
    &:last-child {
        margin-bottom: 25px;
    }
    @media alla and (max-width: 640px) {
        padding: 20px 15px;
        margin-bottom: 20px;
    }
`;
const UploadLabel = styled.h3`
    font-size: 19px;
    font-family: gordita_medium;
    margin-top: 15px;
`;
const UploadLeft = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 360px) {
        display: block;
    }
`;
const Cover = styled.div``;
const UploadRight = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;
const FolderIcon = styled.div`
    width: 60px;
    margin-right: 10px;
    @media all and (max-width: 640px) {
        width: 50px;
    }
    @media all and (max-width: 480px) {
        margin-right: 5px;
    }
`;
const Icon = styled.img`
    width: 100%;
`;
const Label = styled.p`
    font-size: 16px;
    font-family: gordita_medium;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const Formats = styled.h3`
    font-size: 14px;
    font-family: gordita_medium;
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 10px;
    }
`;
const UploadButton = styled.label`
    cursor: pointer;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: #cdf2e4;
    color: #4ba870;
    border: 2px solid #4ba870;
    border-radius: 5px;
    font-family: gordita_medium;
    margin-bottom: 10px;
    font-size: 13px;
    @media all and (max-width: 640px) {
        font-size: 12px;
        width: 70px;
        height: 25px;
    }
`;
const ChoseLabel = styled.p`
    color: #333333;
    font-size: 14px;
    width: 100%;
    text-align: right;
    font-family: gordita_regular;
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const FrontSection = styled.div`
    position: relative;
`;
const BackSection = styled.div`
    position: relative;
`;
const Instrution = styled.div`
    padding-top: 20px;
`;
const InstrutionCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;
const BgCover = styled.div`
    width: 15px;
    height: 15px;
    min-width: 15px;
    border-radius: 50%;
    background-color: #4ba870;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
`;
const InstrutionImage = styled.img`
    width: 7px;
`;
const InstractionsText = styled.p`
    color: #000;
    font-family: gordita_regular;
    font-size: 13px;
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
`;
const FileUploadSection = styled.div`
    position: relative;
    max-height: 68vh;
    overflow-y: scroll;
    ::-webkit-scrollbar-track {
        background: none;
    }
`;
const UploadButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    @media (max-width: 480px) {
        flex-wrap: wrap;
    }
`;

// sucess modal style
const SuccesCard = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const SuccessIcon = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
    margin: 0 auto;
    background-color: #fff;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -115px;
    margin: 0 auto;
    @media all and (max-width: 480px) {
        width: 100px;
        height: 100px;
        top: -65px;
    }
`;
const SuccessTitle = styled.h3`
    text-align: center;
    font-size: 26px;
    font-family: gordita_medium;
    margin-top: 60px;
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const SuccessLabel = styled.p`
    font-size: 16px;
    text-align: center;
    font-family: gordita_medium;
    color: #3c4852;
    max-width: 350px;
    max-width: 420px;
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const ContinueButton = styled.span`
    width: 100%;
    height: 50px;
    background-color: #4ba870;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "baloo_paaji_2semibold";
    margin-top: 30px;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
`;

const Error = styled.p`
    color: red;
    font-size: 10px;
    font-family: gordita_regular;
    position: absolute;
    bottom: -35px;
    padding-top: 5px;
`;
