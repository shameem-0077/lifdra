import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { serverConfig, serverConfig } from "../../../../axiosConfig";
import { Link, useParams } from "react-router-dom";
import Jdenticon from "react-jdenticon";
import ResponseModal from "../../includes/profile/modals/ResponseModal";
import CartLoader from "../../../merchandise/includes/loaders/CartLoader";

const AdmissionForm = () => {
  //form statess
  const [isPreviewModal, setPreviewModal] = useState(false);
  const user_profile = useSelector((state) => state.user_profile);
  const campus_data = useSelector((state) => state.campus_data);
  const dispatch = useDispatch();
  const { id } = useParams();

  //states for filter
  const [isSearch, setSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [isDropList, setDropList] = useState(false);
  const [newCampus, setNewCampus] = useState("");
  // const [is_loading, setLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isBackError, setBackError] = useState(false);
  const [isResponseModal, setResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Error Occured . Please Try Again"
  );

  useEffect(() => {
    campusSearch();
  }, [searchTerm]);
  const campusSearch = () => {
    if (user_data && searchTerm) {
      let { access_token } = user_data;
      // setLoading(true);
      serverConfig
        .get(`campuses/search-campuses/?q=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          const { status_code, data } = response.data;
          if (status_code === 6000) {
            setSearchResults(data);
            setLoading(false);
            setError(false);
          } else if (status_code === 6001) {
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

  const updateCampusData = (campus_data) => {
    dispatch({
      type: "UPDATE_CAMPUS_DATA",
      campus_data: campus_data,
    });
  };

  //error states
  const [isError, setError] = useState(false);
  const [email, setEmail] = useState(
    user_profile.email ? user_profile.email : ""
  );
  const [phone, setPhone] = useState(user_profile.phone);
  const [idCardFront, setIdCardFront] = useState("");
  const [idCardFrontName, setIdCardFrontName] = useState("");
  const [idCardBackName, setIdCardBackName] = useState("");
  const [idCardBack, setIdCardBack] = useState("");
  const [height, setHeight] = useState(window.innerHeight);

  //function
  const user_data = useSelector((state) => state.user_data);
  const [selectedGender, setSelectedGender] = useState(
    user_profile.gender ? user_profile.gender : ""
  );
  const [name, setName] = useState(user_profile.name);

  const handleIDFront = (e) => {
    if (e.target.name === "idcardFront") {
      if (e.target.files.length > 0) {
        setIdCardFront(e.target.files[0]);
        setIdCardFrontName(e.target.files[0].name);
      }
    }
  };
  const handleIDBack = (e) => {
    if (e.target.name === "idcardBack") {
      if (e.target.files.length > 0) {
        setIdCardBack(e.target.files[0]);
        setIdCardBackName(e.target.files[0].name);
      }
    }
  };

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  window.addEventListener("resize", handleResize);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const [successTitle, setSuccessTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("");

  const [gender] = useState([
    {
      id: 1,
      title: "Male",
      type: "male",
    },
    {
      id: 2,
      title: "Female",
      type: "female",
    },
    {
      id: 3,
      title: "Rather not say",
      type: "others",
    },
  ]);
  //to clear error on open
  useEffect(() => {
    setError(false);
    setBackError(false);
  }, [isPreviewModal]);

  const submitForm = () => {
    let { access_token } = user_data;
    setLoading(true);

    if (email && selectedGender) {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("gender", selectedGender);
      // if (idCardFront) {
      //     formData.append("campus_id_front_side", idCardFront);
      // } else {
      //     formData.append("campus_id_front_side", null);
      // }
      formData.append("campus_id_front_side", idCardFront);

      if (campus_data?.name) {
        user_profile.student_category !== "Graduates" &&
          formData.append("campus_name", campus_data.name);
      } else {
        formData.append("campus_name", null);
      }
      // if (campus_data?.name) {
      //     user_profile.student_category !== "Graduates" &&
      //         formData.append("campus_name", campus_data.name);
      // }

      formData.append("campus_id_back_side", idCardBack);

      serverConfig
        .post("/api/v1/users/campus-verification/create/", formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { status_code, data } = response.data;
          if (status_code === 6000) {
            setLoading(false);
            setError(false);
            setResponseModal(true);
            setBackError(false);
            setResponseType("success");
            setSuccessTitle("You've successfully updated your profile.");
          } else if (status_code === 6001) {
            setLoading(false);
            setError(false);
            setBackError(true);
            setResponseModal(true);
            setResponseType("failed");
            setErrorTitle(data.message);
          }
        })
        .catch((error) => {
          setLoading(false);

          setError(true);
          setBackError(true);
          setResponseModal(true);
        });
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const { divMainClass } = useSelector((state) => state);
  return (
    <Main id="main" className={divMainClass}>
      <ResponseModal
        isResponseModal={isResponseModal}
        setResponseModal={setResponseModal}
        responseType={responseType}
        setResponseType={setResponseType}
        successTitle={successTitle}
        setSuccessTitle={setSuccessTitle}
        isBackError={isBackError}
        setBackError={setBackError}
        errorTitle={errorTitle}
      />
      <CoverContainer height={height}>
        <Container height={height}>
          <TitleSection>
            <Title>Admission Form</Title>
          </TitleSection>
          <FormCover>
            <FormSection height={height}>
              <LeftSection>
                <SectionTitle>Personal Data</SectionTitle>
                <ProfilePic>
                  <Jdenticon size="120px" value={name ? name : "Name"} />
                </ProfilePic>

                <Form>
                  <InputName for="name">
                    Full Name<small>*</small>
                  </InputName>
                  <br />
                  <Cover>
                    <InputSection
                      className="editable"
                      name="name"
                      placeholder="Enter your  name"
                      type="text"
                      value={user_profile.name}
                      onKeyDown={handleKeyDown}
                      required
                    ></InputSection>
                    {/* {isError ? (
                                            <ErrorMessage className="firsst">
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : null} */}
                  </Cover>
                  <InputName for="phone">
                    Phone Number<small>*</small>
                  </InputName>
                  <br />
                  <Cover>
                    <InputSection
                      className="editable"
                      name="phone"
                      placeholder="Enter your  phone number"
                      type="text"
                      value={user_profile.phone}
                      onKeyDown={handleKeyDown}
                      required
                    ></InputSection>
                    {/* {isError ? (
                                            <ErrorMessage className="firsst">
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : null} */}
                  </Cover>
                  <InputName for="email">
                    Email<small>*</small>
                  </InputName>
                  <br />
                  <Cover>
                    <InputSection
                      name="email"
                      placeholder="Enter your  email"
                      type="text"
                      value={email}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></InputSection>
                    {isError && email === "" ? (
                      <ErrorMessage className="firsst">
                        This field can't be empty
                      </ErrorMessage>
                    ) : null}
                  </Cover>
                  <Cover>
                    <InputName for="gender">
                      Gender<small>*</small>
                    </InputName>
                    <RadioContainer name="gender">
                      {gender.map((data) => (
                        <Gender
                          onClick={() => setSelectedGender(data.type)}
                          className={selectedGender === data.type && "active"}
                        >
                          <span
                            className={selectedGender === data.type && "active"}
                          >
                            <small
                              className={
                                selectedGender === data.type && "active"
                              }
                            ></small>
                          </span>{" "}
                          <p>{data.title}</p>
                        </Gender>
                      ))}
                    </RadioContainer>
                    {isError && selectedGender === "" ? (
                      <ErrorMessage className="second">
                        This field can't be empty
                      </ErrorMessage>
                    ) : null}
                  </Cover>
                  {/* {isError ? (
                                        <ErrorMessage className="firsst">
                                            This field can't be empty
                                        </ErrorMessage>
                                    ) : null} */}
                </Form>
              </LeftSection>

              <RightSection>
                <SectionTitle>Educational Data</SectionTitle>
                <Form>
                  <InputName for="institute">Institute</InputName>
                  <br />
                  <Cover>
                    <InputSection
                      placeholder="Search Institute"
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
                        setSearch(true), setSelectedCampus(""), setNewCampus("")
                      )}
                    ></InputSection>
                    {/* {isError && selectedCampus === "" ? (
                                            <ErrorMessage className="firsst">
                                                This field can't be empty
                                            </ErrorMessage>
                                        ) : null} */}
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
                                  JSON.stringify(data.name ? data.name : "")
                                );
                                let campus_value =
                                  localStorage.getItem(campus_data);
                                updateCampusData({
                                  ...campus_data,
                                  name: data.name,
                                });
                              }}
                            >
                              {data.photo ? (
                                <CampusImage>
                                  <Image src={data.photo} alt="" />
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
                                <CampusId>{data.token_code}</CampusId>
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
                        <SearchResult
                          onClick={() => {
                            setSelectedCampus(searchTerm);
                            updateCampusData({
                              ...campus_data,
                              name: searchTerm ? searchTerm : "",
                            });
                          }}
                        >
                          <AddResultCard>
                            <Section>
                              <CampusIcon>
                                <Icon
                                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription-modal/green-campus.svg"
                                  alt=""
                                />
                              </CampusIcon>
                              <CampusName
                                style={{
                                  marginLeft: "10px",
                                }}
                              >
                                {searchTerm}
                              </CampusName>
                            </Section>
                            <AddButton
                            // onClick={() => {
                            //     setSelectedCampus(
                            //         searchTerm
                            //     );
                            //     updateCampusData(
                            //         {
                            //             ...campus_data,
                            //             name: searchTerm
                            //                 ? searchTerm
                            //                 : "",
                            //         }
                            //     );
                            // }}
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
                  </Cover>

                  <UploadIdCardSection>
                    <IdCardLeftSection>
                      <UploadTitle>Upload ID card</UploadTitle>

                      <p>Upload your valid ID card</p>
                    </IdCardLeftSection>
                    <div>
                      {" "}
                      <InputName for="idcardFront">
                        Front Side of ID Card
                      </InputName>
                      <Cover>
                        <DragSection
                          style={{
                            paddingRight: "50px",
                          }}
                          placeholder="Drag or Choose file"
                          type="file"
                          id="idcardFront"
                          name="idcardFront"
                          accept="application/image"
                          hidden
                          onKeyDown={handleKeyDown}
                          onChange={(e) => {
                            handleIDFront(e);
                          }}
                        />
                        <Icon>
                          <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/upload.svg"
                            alt=""
                          />
                        </Icon>
                        {/* {isError &&
                                                idCardFront === "" ? (
                                                    <ErrorMessage>
                                                        This field can't be
                                                        empty
                                                    </ErrorMessage>
                                                ) : null} */}
                        {isBackError && (
                          <ErrorMessage>
                            {" "}
                            {/* ID card already applied */}
                          </ErrorMessage>
                        )}
                      </Cover>
                      <InputName for="idcardBack">
                        Back Side of ID Card
                      </InputName>
                      <Cover>
                        <DragSection
                          style={{
                            paddingRight: "50px",
                          }}
                          placeholder="Drag or Choose file"
                          type="file"
                          id="idcardBack"
                          name="idcardBack"
                          accept="application/image"
                          hidden
                          onKeyDown={handleKeyDown}
                          onChange={(e) => {
                            handleIDBack(e);
                          }}
                        />
                        <Icon>
                          <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/upload.svg"
                            alt=""
                          />
                        </Icon>
                      </Cover>
                    </div>
                  </UploadIdCardSection>
                </Form>
              </RightSection>
            </FormSection>
          </FormCover>
          <ButtonSection>
            <Submit onClick={submitForm}>
              {isLoading ? <CartLoader /> : "Submit"}
            </Submit>
          </ButtonSection>
        </Container>
      </CoverContainer>
    </Main>
  );
};

export default AdmissionForm;
//serach tags
const Main = styled.div``;
const Search = styled.div`
  position: relative;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 5px;
`;
const SearchResult = styled.div`
  z-index: 2;
  width: 100%;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
  padding: 20px;
  max-height: 250px;
  overflow-y: scroll;
  top: -33px;
  left: 0px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #f1eded;
  border-top: 0px solid;
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
const AddResultCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
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

//form styles

const CoverContainer = styled.div`
  padding-top: 20px;
  // padding: 86px 7px 0px 79px;
  // min-height: ${(props) => props.height + "px"};
  overflow-y: hidden;

  @media all and (max-width: 1550px) {
    // overflow-y: scroll;
    // padding: 86px 7px 0px 79px;
  }
  @media all and (max-width: 1100px) {
    // padding: 86px 15px 0px 20px;
  }
  // @media all and (max-width: 768px) {
  //     padding: 86px 1px 0px 10px;
  //     overflow-y: scroll;
  // }
`;
const Container = styled.div`
  padding-bottom: 0;
  // max-height: ${(props) => props.height - 70 + "px"};
  overflow-y: scroll;
  @media all and (max-width: 768px) {
    // max-height: ${(props) => props.height - 60 + "px"};
  }
`;
const TitleSection = styled.div`
  height: 70px;
  background-color: #f9f9fb;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  @media all and (max-width: 420px) {
    height: unset;
    padding: 12px 0px 9px 17px;
  }
`;

const Title = styled.h2`
  font-family: "gordita_medium";
  font-size: 24px;
  @media all and (max-width: 420px) {
    font-size: 21px;
  }
`;
const FormCover = styled.div`
  background-color: #f9f9fb;
  padding: 20px;
  margin-top: 20px;
  padding-bottom: 0;

  @media all and (max-width: 420px) {
    padding: 14px 9px;
  }
`;
const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  border-radius: 5px;
  padding-bottom: 0;
  margin-right: -5px;
  overflow-y: scroll;
  max-height: ${(props) => props.height - 280 + "px"};
  &::-webkit-scrollbar {
    width: 5px;
    margin-left: 10px;
    border: none;
  }
  &::-webkit-scrollbar-track {
    background: #f9f9fb;
  }
  &::-webkit-scrollbar-thumb {
    background: #4ba870;
    border-radius: 3px;
  }
  @media all and (max-width: 768px) {
    max-height: ${(props) => props.height - 270 + "px"};
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  background-color: #fff;
  border: 1px solid#e7e6e6;
  // padding: 30px;
  padding: 30px 30px 55px;
  border-radius: 5px;
  margin-bottom: 20px;
  @media all and (max-width: 420px) {
    padding: 13px 13px 30px 13px;
    margin-bottom: 0px;
  }
`;
const RightSection = styled.div`
  background-color: #fff;
  border: 1px solid#e7e6e6;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
  @media all and (max-width: 480px) {
    margin-bottom: 0px;
  }
  @media all and (max-width: 420px) {
    padding: 13px 13px 0px 13px;
  }
`;
const SectionTitle = styled.h3`
  font-family: "gordita_medium";
  font-size: 18px;
`;
const ProfilePic = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
  padding: 5px;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 20px;

  position: relative;
  img {
    display: block;
    width: 100%;
    border-radius: 50%;
  }
`;
const EditButton = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  img {
    display: block;
    width: 100%;
  }
`;
const Form = styled.form`
  margin-top: 30px;
  @media all and (max-width: 420px) {
    margin-top: 20px;
  }
`;
const InputName = styled.label`
  font-size: 15px;
  margin-bottom: 10px;
  color: #777676;
  font-family: gordita_regular;
  @media all and (max-width: 980px) {
    font-size: 14px;
  }
`;

const InputSection = styled.input`
  flex: 1;
  color: #000;
  width: 100%;
  padding: 0 20px;
  height: 50px;
  border: 1px solid#e7e6e6;
  border-radius: 5px !important;
  background: #f9f9f9;
  font-size: 14px;
  font-family: gordita_regular;
  margin-bottom: 25px;
  &::placeholder {
    font-size: 14px;
    color: #acacac;
  }
  &.editable {
    caret-color: transparent;
  }
  @media all and (max-width: 980px) {
    height: 40px;
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
const ErrorMessage = styled.p`
  position: absolute;
  bottom: -22px;
  left: 0;
  font-size: 12px;
  font-family: gordita_regular;
  color: red;
  &.firsst {
    bottom: 2px;
  }
  &.second {
    bottom: -22px;
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
const ButtonSection = styled.div`
  height: 120px;
  background-color: #f9f9fb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  @media all and (max-width: 480px) {
    height: 78px;
  }
`;

const SkipNow = styled(Link)`
  width: 150px;
  padding: 13px 0px 10px 0px;
  background-color: #f9f9f9;
  color: #616060;
  font-family: gordita_medium;
  border: 1px solid#e7e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  @media all and (max-width: 980px) {
    height: 40px;
    font-size: 14px;
    width: 120px;
    padding: 13px 0px 11px 0px;
  }
  @media all and (max-width: 420px) {
    margin-left: 19px;
  }
`;
const Submit = styled.span`
  width: 150px;
  padding: 13px 0px 10px 0px;
  margin-left: 18px;
  background-color: #4ba870;
  color: #fff;
  font-family: gordita_medium;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  height: 41px;
  @media all and (max-width: 980px) {
    height: 40px;
    font-size: 14px;
    width: 120px;
    padding: 13px 0px 11px 0px;
  }
  @media all and (max-width: 420px) {
    margin-left: 19px;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
`;

const Gender = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 30px;
  margin-top: 10px;

  span {
    width: 18px;
    height: 18px;
    min-width: 18px;
    min-height: 18px;
    border: 2px solid #e7e6e6;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      border: 2px solid #4ba870;
    }
  }
  small {
    width: 10px;
    height: 10px;
    min-width: 10px;
    min-height: 10px;
    display: block;
    border-radius: 50%;
    background-color: #fff;
    &.active {
      background-color: #4ba870;
    }
  }
  p {
    font-family: gordita_regular;
    font-size: 12px;
    transform: translateY(3px);
  }

  @media all and (max-width: 420px) {
    margin-top: 5px;
  }
`;
const UploadIdCardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  padding-top: 20px;
  @media all and (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  @media all and (max-width: 768px) {
    padding-top: 28px;
  }
`;
const IdCardLeftSection = styled.div`
  p {
    font-size: 12px;
    color: #2d2d2d;
    font-family: gordita_regular;
  }
  div {
    margin-left: 2px;
    color: #50d284;
    display: inline;
    font-family: "gordita_medium";
  }
`;
const UploadTitle = styled.h4`
  font-size: 15px;
  font-family: gordita_regular;
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
  font-family: gordita_regular;
  position: relative;
  margin-bottom: 25px;
  color: #acacac;
  &::placeholder {
    font-size: 14px;
    color: #acacac;
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
  @media all and (max-width: 980px) {
    height: 40px;
    margin-bottom: 25px;
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
