import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import plus from "../../../../../assets/images/profile-screen/plus.svg";
import textbook from "../../../../../assets/images/profile-screen/textbook.svg";
import badge from "../../../../../assets/images/profile-screen/badge.svg";
import shareicon from "../../../../../assets/images/profile-screen/share.svg";
import profileIcon from "../../../../../assets/images/profile-screen/about-me.svg";
import skillImage from "../../../../../assets/images/profile-screen/skills.svg";
import eductionIcon from "../../../../../assets/images/profile-screen/educaton.svg";
import certificateicon from "../../../../../assets/images/profile-screen/certification.svg";
import guardiansImage from "../../../../../assets/images/profile-screen/gurdians.svg";
import { parseISO, format } from "date-fns";
import disVerified from "../../../../../assets/images/profile-screen/dis_verified_icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import NewUpdatesProfileModal from "../../../includes/profile/modals/NewUpdatesProfileModal";
import ProfileTop from "./ProfileTop";
import Moment from "moment";
import RouteLoading from "../../../../routing/RouteLoading";
import $ from "jquery";
import EducationalDetailsModal from "../../../includes/profile/modals/EducationalDetailsModal";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import ConfirmDeleteModal from "../../../includes/general/modals/ConfirmDeleteModal";
import ToastModal from "../../../includes/general/modals/ToastModal";
import lineShadow from "../../../../../assets/images/profile-screen/line-sahdow.png";
import Loader from "../../../includes/techschooling/general/loaders/Loader";

function MyProfile({ userProfileDetails, isLoading }) {
  const {
    user_data: { access_token },
    isNewUpdateModal,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  // const [userProfileDetails, setUserProfileDetails] = useState({});
  // const [isLoading, setLoading] = useState(true);

  const [isReload, setReload] = useState(false);
  const [academicDetailsPage, setacademicDetailsPage] = useState(3);
  const [certificatePage, setcertificatePage] = useState(3);
  const [isModal, setModal] = useState(false);
  const [selectedid, setSelectedId] = useState("");
  const [isOptionModal, setOptionModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [toastCondition, setToastCondition] = useState("");
  const [isDeleted, setDeleted] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationHeading, setConfirmationHeading] = useState("");
  const [deleteCondition, setDeleteCondition] = useState("");

  //---verified campus delete api---//

  const verifiedDeleteCampus = () => {
    setDeleteLoading(true);
    accountsConfig
      .post(
        `api/v1/users/delete-academic-history/${selectedid}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
      .catch((error) => {});
  };

  //---unverified campus delete---//
  const unVerifiedDeleteCampus = () => {
    setDeleteLoading(true);
    accountsConfig
      .post(
        `api/v1/users/campus-verification/delete/${selectedid}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
      .catch((error) => {});
  };

  //---certificate delete api---//
  const studentCertificateDelete = () => {
    setDeleteLoading(true);
    accountsConfig
      .post(
        `api/v1/users/delete-student-certificate/${selectedid}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
      .catch((error) => {});
  };

  function formatDate(date) {
    if (!date) return "---";

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "do MMMM yyyy");

    return formattedDate;
  }

  // useEffect(() => {
  //     if (access_token) {
  //         getMyProfileDetails();
  //     }
  // }, [access_token, isReload]);

  const handleModal = (type) => {
    dispatch({
      type: "TOGGLE_NEW_UPDATES_MODAL",
    });
    dispatch({
      type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
      newUpdatesModalType: type,
    });
  };

  const handleEditStudentData = (editingData, type) => {
    dispatch({
      type: "UPDATE_MY_PROFILE_EDITING_DATA",
      selectedEditingMyProfileData: editingData,
    });
    handleModal(type);
  };
  useEffect(() => {
    if (handleModal) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [handleModal]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (isModal || isOptionModal) {
      function handleClickOutside(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          if (setModal) {
            setModal(false);
          }
          if (setOptionModal) {
            setOptionModal(false);
          }
        }
      }

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isModal, isOptionModal]);

  //---- subscription plan ----//
  const renderSubscriptionDetails = () => {
    return (
      <SubscriptionContainer>
        <Tech>
          <TechSubscription>
            {userProfileDetails?.program?.name}
          </TechSubscription>
        </Tech>
        <Joining>
          <TimeParagraph>
            Your subscription started on{" "}
            <StartDate>
              {userProfileDetails?.subscription_data?.start_timestamp &&
                formatDate(
                  Moment(
                    userProfileDetails?.subscription_data?.start_timestamp
                  )?.format("YYYY-MM-DD")
                )}
            </StartDate>{" "}
            and will end on{" "}
            <span>
              {userProfileDetails?.subscription_data?.end_timestamp &&
                formatDate(
                  Moment(
                    userProfileDetails?.subscription_data?.end_timestamp
                  )?.format("YYYY-MM-DD")
                )}
            </span>
          </TimeParagraph>
          <hr />
          <JoinedHeading>Joined date</JoinedHeading>
          <JoinedDate>
            {" "}
            {userProfileDetails?.subscription_data?.start_timestamp &&
              formatDate(
                Moment(
                  userProfileDetails?.subscription_data?.start_timestamp
                )?.format("YYYY-MM-DD")
              )}
          </JoinedDate>
        </Joining>
      </SubscriptionContainer>
    );
  };

  //---- Education Details ----//

  const renderOptionsModal = (item) => {
    return (
      <BackContainer ref={containerRef} className={isModal ? "active" : ""}>
        <Items>
          <ListItems
            onClick={() => {
              setModal(false);
              handleEditStudentData(item, "education_details");
            }}
          >
            <EyeContainer>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                alt="EditImage"
              />
            </EyeContainer>
            <span>Edit</span>
          </ListItems>
          <ListItems
            onClick={() => {
              setDeleteModal(true);
              setModal(false);
            }}
          >
            <DownLoadContainer>
              <img
                src={require("../../../../../assets/images/profile-screen/delete.svg")}
              />
            </DownLoadContainer>
            <span>Delete</span>
          </ListItems>
        </Items>
      </BackContainer>
    );
  };

  //---- Certificate details ----//

  const certificateOptionsModal = (certificate) => {
    return (
      <BackContainer
        ref={containerRef}
        className={isOptionModal ? "active" : ""}
      >
        <Items>
          <ListItems
            onClick={() => {
              handleEditStudentData(certificate, "add_certificates");
              setOptionModal(false);
            }}
          >
            <EyeContainer>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                alt="EditImage"
              />
            </EyeContainer>
            <span>Edit</span>
          </ListItems>
          <ListItems
            onClick={() => {
              setDeleteModal(true);
              setOptionModal(false);
            }}
          >
            <DownLoadContainer>
              <img
                src={require("../../../../../assets/images/profile-screen/delete.svg")}
              />
            </DownLoadContainer>
            <span>Delete</span>
          </ListItems>
        </Items>
      </BackContainer>
    );
  };

  return (
    <>
      <TalropEdtechHelmet title="Profile " />

      {isDeleteModal && (
        <ConfirmDeleteModal
          onDelete={
            deleteCondition === "certificate"
              ? studentCertificateDelete
              : deleteCondition === "unverified_campus"
              ? unVerifiedDeleteCampus
              : verifiedDeleteCampus
          }
          isLoading={isDeleteLoading}
          setDeleteModal={setDeleteModal}
          text={confirmationText}
          heading={confirmationHeading}
        />
      )}

      <ToastModal
        isToast={isDeleted}
        setToast={setDeleted}
        toastCondition={toastCondition}
        toastMessage={toastErrorMessage}
      />

      {isLoading ? (
        // <RouteLoading isInnerRouter={true} />
        <Loader />
      ) : (
        <>
          <Profile>
            <ProfileBottom>
              {/* {window.innerWidth <= 980 && renderSubscriptionDetails()} */}
              <BottomLeft>
                {/* Conditions for add and show about me */}
                {userProfileDetails?.about_me ? (
                  <About>
                    <Edited>
                      <Heading>About me</Heading>
                      <EditContainer onClick={() => handleModal("about_me")}>
                        <img
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                          alt="EditImage"
                        />
                      </EditContainer>
                    </Edited>
                    <Content>{userProfileDetails?.about_me}</Content>
                  </About>
                ) : (
                  <ListContainer>
                    <Heading className="add-details">About me</Heading>
                    <ProfileIconContainer>
                      <ProfileIcon src={profileIcon} alt="profileIcon" />
                    </ProfileIconContainer>
                    <SmallParagraph>
                      Describe yourself briefly, including who you are, what you
                      like, and what you have to offer.
                    </SmallParagraph>
                    <AddDetails onClick={() => handleModal("about_me")}>
                      Add Bio
                    </AddDetails>
                  </ListContainer>
                )}

                {/* Conditions for add and show programming_languages and technology_skills */}

                {userProfileDetails?.programming_languages?.length > 0 ||
                userProfileDetails?.technology_skills?.length > 0 ? (
                  <Skills>
                    <div>
                      {userProfileDetails?.technology_skills?.length > 0 && (
                        <>
                          <Heading className="skills">Skills</Heading>
                          <SkillsCategory>
                            {userProfileDetails?.technology_skills?.map(
                              (item, index) => (
                                <SkillsList key={index}>
                                  {item?.name}
                                </SkillsList>
                              )
                            )}
                          </SkillsCategory>
                        </>
                      )}
                      {userProfileDetails?.programming_languages?.length >
                        0 && (
                        <>
                          <Heading className="skills">
                            Coding languages/Technologies
                          </Heading>
                          <Languages>
                            {userProfileDetails?.programming_languages?.map(
                              (item, index) => (
                                <LanguageList key={index}>
                                  {item?.name}
                                </LanguageList>
                              )
                            )}
                          </Languages>
                        </>
                      )}
                    </div>
                    <EditContainer onClick={() => handleModal("update_skills")}>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                        alt="EditImage"
                      />
                    </EditContainer>
                  </Skills>
                ) : (
                  <ListContainer>
                    <Heading className="add-details">
                      Skills and coding languages
                    </Heading>
                    <ProfileIconContainer>
                      <ProfileIcon src={skillImage} alt="skillsIcon" />
                    </ProfileIconContainer>
                    <SmallParagraph>
                      Tell us about your coding skills and coding languages you
                      know
                    </SmallParagraph>
                    <AddDetails onClick={() => handleModal("update_skills")}>
                      Add Skills
                    </AddDetails>
                  </ListContainer>
                )}

                {/* Conditions for add and show education details */}

                {userProfileDetails?.academic_history?.length > 0 ? (
                  <Education>
                    <SubContainer>
                      <Heading>Education</Heading>
                      <ButtonContainer
                        onClick={() => handleModal("education_details")}
                      >
                        <PlusContainer>
                          <Plus src={plus} alt="addImage" />
                        </PlusContainer>
                        <AddText>Add new</AddText>
                      </ButtonContainer>
                    </SubContainer>
                    {userProfileDetails?.academic_history
                      ?.slice(0, academicDetailsPage)
                      ?.map((item, index) => (
                        <InstituteLogoContainer key={index}>
                          <div>
                            {isModal &&
                              selectedid === item.id &&
                              renderOptionsModal(item)}
                            {item?.campus_name && (
                              <VerifiedContent>
                                <ErrorContainer>
                                  <img
                                    src={disVerified}
                                    alt="verification process Icon"
                                  />
                                </ErrorContainer>
                                <TextContainer>
                                  <VerifiedText>
                                    This campus is being verified.
                                    {/* {""}
                                                                        <MiniText>
                                                                            Once
                                                                            approved,
                                                                            the
                                                                            campus
                                                                            will
                                                                            be
                                                                            displayed.
                                                                        </MiniText> */}
                                  </VerifiedText>
                                </TextContainer>
                              </VerifiedContent>
                            )}
                            <LogoContainer>
                              <InstituteLogo
                                src={
                                  item?.institute?.logo
                                    ? item?.institute?.logo
                                    : textbook
                                }
                                alt="textbookImage"
                              />
                            </LogoContainer>
                            <SubHeadingText>
                              {item?.speciality?.name
                                ? item?.speciality?.name
                                : item?.student_class?.name}
                            </SubHeadingText>
                            <SubParagraph>
                              {item?.campus_name
                                ? item?.campus_name
                                : item?.institute?.name}
                            </SubParagraph>
                            <SubParagraph className="flex">
                              {item?.start_date &&
                                formatDate(
                                  Moment(item?.start_date)?.format("YYYY-MM-DD")
                                )}

                              {item?.is_current ? (
                                " - Present"
                              ) : item?.end_date ? (
                                <>
                                  {" - "}
                                  {formatDate(
                                    Moment(item.end_date)?.format("YYYY-MM-DD")
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </SubParagraph>
                          </div>
                          <Common>
                            <img
                              src={require("../../../../../assets/images/profile-screen/doticon.svg")}
                              onClick={() => {
                                if (!isDeleted) {
                                  setSelectedId(item.id);
                                  setConfirmationHeading("Delete Campus");
                                  setConfirmationText(
                                    "Are you sure you want to delete campus? This action cannot be undone"
                                  );
                                  setDeleteCondition(
                                    item?.campus_name
                                      ? "unverified_campus"
                                      : "campus"
                                  );

                                  setModal(!isModal);
                                }
                              }}
                            />
                          </Common>
                        </InstituteLogoContainer>
                      ))}
                    {userProfileDetails?.academic_history?.length >
                      academicDetailsPage && (
                      <MoreDetails
                        className="double"
                        onClick={() =>
                          setacademicDetailsPage(academicDetailsPage + 3)
                        }
                      >
                        View more
                      </MoreDetails>
                    )}
                  </Education>
                ) : (
                  <ListContainer>
                    <Heading className="add-details">Education</Heading>
                    <ProfileIconContainer>
                      <ProfileIcon src={eductionIcon} alt="eductionIcon" />
                    </ProfileIconContainer>
                    <SmallParagraph>
                      Share your educational qualification information, such as
                      your university and your schooling
                    </SmallParagraph>
                    <AddDetails
                      onClick={() => handleModal("education_details")}
                    >
                      Add Education
                    </AddDetails>
                  </ListContainer>
                )}

                {/* Conditions for add and show certificates and  details */}

                {userProfileDetails?.certificates?.length > 0 ? (
                  <Certifications>
                    <FlexContainer>
                      <Heading>Certifications</Heading>
                      <AddContainer
                        onClick={() => handleModal("add_certificates")}
                      >
                        <AddIconContainer>
                          <AddIcon src={plus} alt="addImage" />
                        </AddIconContainer>
                        <NewText>Add new</NewText>
                      </AddContainer>
                    </FlexContainer>
                    {userProfileDetails?.certificates
                      ?.slice(0, certificatePage)
                      ?.map((certificate, index) => (
                        <MainContent key={index}>
                          <BothContainer>
                            {isOptionModal &&
                              selectedid === certificate.id &&
                              certificateOptionsModal(certificate)}
                            <LeftContainer>
                              <Logo
                                src={
                                  certificate?.logo ? certificate?.logo : badge
                                }
                                alt="Logo"
                              />
                            </LeftContainer>
                            <RightContainer>
                              <Heading>{certificate.name}</Heading>
                              <SmallText>{certificate.issued_by}</SmallText>
                              <Date>
                                <span>
                                  Issued on {""}
                                  {certificate.issued_date &&
                                    formatDate(
                                      Moment(certificate.issued_date)?.format(
                                        "YYYY-MM-DD"
                                      )
                                    )}
                                </span>
                                {certificate?.valid_till ? (
                                  <span className="expiry">
                                    Expired on {""}
                                    {formatDate(
                                      Moment(certificate.valid_till)?.format(
                                        "YYYY-MM-DD"
                                      )
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Date>
                              <span>
                                Certificate ID: {certificate.certificate_id}
                              </span>
                              {certificate.link && (
                                <ViewButtonContainer
                                  href={certificate.link}
                                  target="blank"
                                >
                                  <ViewButton>View certificate</ViewButton>
                                  <ViewContainer>
                                    <View src={shareicon} alt="Icon" />
                                  </ViewContainer>
                                </ViewButtonContainer>
                              )}
                            </RightContainer>
                          </BothContainer>
                          <Common>
                            <img
                              src={require("../../../../../assets/images/profile-screen/doticon.svg")}
                              onClick={() => {
                                if (!isDeleted) {
                                  setSelectedId(certificate.id);
                                  setConfirmationHeading("Delete Certificate");
                                  setConfirmationText(
                                    "Are you sure you want to delete certificate? This action cannot be undone"
                                  );
                                  setDeleteCondition("certificate");

                                  setOptionModal(!isOptionModal);
                                }
                              }}
                            />
                          </Common>
                        </MainContent>
                      ))}

                    {userProfileDetails?.certificates?.length >
                      certificatePage && (
                      <More
                        onClick={() => setcertificatePage(certificatePage + 3)}
                      >
                        View more
                      </More>
                    )}
                  </Certifications>
                ) : (
                  <ListContainer className="certification">
                    <Heading className="add-details">Certification</Heading>
                    <ProfileIconContainer>
                      <ProfileIcon
                        src={certificateicon}
                        alt="certificateicon"
                      />
                    </ProfileIconContainer>
                    <SmallParagraph>
                      Show off your certifications and let others know what
                      you're capable of.
                    </SmallParagraph>
                    <AddDetails onClick={() => handleModal("add_certificates")}>
                      Add Certification
                    </AddDetails>
                  </ListContainer>
                )}
              </BottomLeft>

              <BottomRight>
                {/* {window.innerWidth > 980 && renderSubscriptionDetails()} */}
                <Information>
                  <Edited>
                    <Heading>Additional info</Heading>
                    <EditContainer
                      onClick={() => handleModal("add_additional_details")}
                    >
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                        alt="EditImage"
                      />
                    </EditContainer>
                  </Edited>

                  <Details>
                    <Info>Phone number</Info>
                    <MainText>
                      {userProfileDetails?.country?.phone_code}{" "}
                      {userProfileDetails?.phone
                        ? userProfileDetails?.phone
                        : "---"}
                    </MainText>
                  </Details>

                  <Details>
                    <Info>State</Info>
                    <MainText>
                      {userProfileDetails?.state
                        ? userProfileDetails?.state?.name
                        : "---"}
                    </MainText>
                  </Details>

                  <Details>
                    <Info>District</Info>
                    <FlagConteiner>
                      <MainText>
                        {userProfileDetails?.district ? (
                          <div className="div">
                            {/* {userProfileDetails?.country?.flag && (
                              <FlagIcon>
                                <Flag
                                  src={userProfileDetails?.country?.flag}
                                  alt="flagImage"
                                />
                              </FlagIcon>
                            )} */}
                            <DistricName>
                              {userProfileDetails?.district?.name}
                              {", "}
                              {userProfileDetails?.country?.name}
                            </DistricName>
                          </div>
                        ) : (
                          "---"
                        )}
                      </MainText>
                    </FlagConteiner>
                  </Details>

                  <Details>
                    <Info>Local body</Info>
                    <MainText>
                      {userProfileDetails?.localbody
                        ? userProfileDetails?.localbody?.name
                        : "---"}
                    </MainText>
                  </Details>

                  <div style={{ borderBottom: "1px solid #EAECF0", paddingBottom:'24px', marginBottom:'24px' }}>
                    <Details>
                      <Info>Ward</Info>
                      <MainText>
                        {userProfileDetails?.ward
                          ? userProfileDetails?.ward?.name
                          : "---"}
                      </MainText>
                    </Details>
                  </div>

                  <Details>
                    <Info>Gender</Info>
                    <MainText>
                      {userProfileDetails?.gender
                        ? userProfileDetails?.gender
                        : "---"}
                    </MainText>
                  </Details>

                  <Details>
                    <Info>Date of birth</Info>
                    <MainText>
                      {userProfileDetails?.dob
                        ? formatDate(userProfileDetails?.dob)
                        : "---"}
                    </MainText>
                  </Details>

                  <Details>
                    <Info>Languages known</Info>
                    <MainText>
                      {userProfileDetails?.languages?.length > 0
                        ? userProfileDetails?.languages?.map((item, index) => (
                            <span key={index} className="language">
                              {item.name}
                              {index !==
                                userProfileDetails?.languages?.length - 1 &&
                                ", "}
                            </span>
                          ))
                        : "---"}
                    </MainText>
                  </Details>
                </Information>
                {userProfileDetails?.guardians?.length > 0 ? (
                  <GardianInfo>
                    <Edited>
                      <Heading>Guardians info</Heading>
                      <EditContainer
                        onClick={() => handleModal("edit_guardians_info")}
                      >
                        <AddIcon src={plus} alt="addImage" />
                      </EditContainer>
                    </Edited>
                    {userProfileDetails?.guardians.map((guardian, index) => (
                      <GuardianContainer className="container" key={index}>
                        <ParentInfo>
                          <ListContent>
                            <GardianHeading>
                              {guardian?.relation === "grand_father"
                                ? "Grand Father"
                                : guardian?.relation === "grand_mother"
                                ? "Grand Mother"
                                : guardian?.relation}
                            </GardianHeading>
                            <EditContainer
                              onClick={() =>
                                handleEditStudentData(
                                  guardian,
                                  "edit_guardians_info"
                                )
                              }
                            >
                              <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                                alt="EditImage"
                              />
                            </EditContainer>
                          </ListContent>

                          <ListContent>
                            <GardianText>
                              {guardian?.name}{" "}
                              {/* - 
                                                                (
                                                                {
                                                                    guardian?.relation
                                                                }
                                                                ) */}
                            </GardianText>
                            {guardian?.is_primary && (
                              <PrimaryButton>Primary</PrimaryButton>
                            )}
                          </ListContent>
                        </ParentInfo>
                        <GardianDetails>
                          <GardianHeading className="bottom">
                            Phone number
                          </GardianHeading>
                          <GardianText>
                            {guardian?.country?.phone_code} {guardian?.phone}
                          </GardianText>
                        </GardianDetails>
                      </GuardianContainer>
                    ))}
                  </GardianInfo>
                ) : (
                  <ListContainer className="info">
                    <Heading className="add-details">Guardians info</Heading>
                    <AdditionalContainer>
                      <InfoIcon src={guardiansImage} alt="gurdians" />
                    </AdditionalContainer>
                    <Paragraph>
                      Please provide us with the details of your guardians.
                    </Paragraph>
                    <AddContent
                      onClick={() => handleModal("edit_guardians_info")}
                    >
                      Add Guardian
                    </AddContent>
                  </ListContainer>
                )}
              </BottomRight>
            </ProfileBottom>
          </Profile>
        </>
      )}
    </>
  );
}

const Profile = styled.div`
  padding: 15px 0 0 0;
`;
const ProfileBottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 980px) {
    flex-wrap: wrap;
  }
`;
const BottomLeft = styled.div`
  width: calc(66% - 15px);
  @media (max-width: 980px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;
const About = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 15px;
`;
const FlexEdit = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SubHeading = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  font-family: "gordita_medium";
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const Content = styled.p`
  font-size: 16px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  font-family: "gordita_regular" !important;
  display: block;
  width: 100%;
  white-space: break-spaces;

  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    /* font-size: 12px; */
  }
`;
const Skills = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 15px;

  display: flex;
  justify-content: space-between;

  overflow-wrap: break-word;
  word-break: break-all;
`;
const SkillText = styled.h5`
  font-size: 16px;
  font-family: "gordita_medium";
  margin-bottom: 8px;
`;
const SkillsCategory = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;
const SkillsList = styled.li`
  margin: 0 7px 7px 0;
  font-size: 15px;
  border: 2px solid #cdd5df;
  padding: 4px 13px 4px 13px;
  border-radius: 16px;
  color: #202939;
  font-family: "gordita_medium";
  padding-top: 6px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }

  /* @media (max-width: 420px) {
        font-size: 10px;
        padding: 5px;
        margin-bottom: 10px;
    } */
`;
const Languages = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const LanguageList = styled.li`
  margin: 0 7px 7px 0;
  font-size: 14px;
  border: 2px solid #cdd5df;
  padding: 6px 13px 4px 13px;
  border-radius: 16px;
  color: #202939;
  font-family: "gordita_medium";
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;
const Education = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 15px;

  span {
    font-size: 14px;
    font-family: "gordita_medium";
  }
`;
const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const EducationText = styled.h3`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #101828;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const PlusContainer = styled.div`
  margin-right: 6px;
  width: 20px;
  @media (max-width: 640px) {
    width: 18px;
  }
`;
const Plus = styled.img`
  display: block;
  width: 100%;
`;
const AddText = styled.h3`
  font-size: 16px;
  font-family: "gordita_medium";
  padding-top: 4px;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
const InstituteLogoContainer = styled.div`
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  overflow-wrap: break-word;
  word-break: break-all;
  position: relative;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0px;
  }
`;
const MoreDetails = styled.span`
  font-size: 14px;
  display: block;
  color: #60c183;
  cursor: pointer;
  &.double {
    border-bottom: ${({ isborder }) => isborder && "1px solid #eaecf0"};
    padding-bottom: ${({ isborder }) => isborder && "20px"};
  }
`;
const Container = styled.div`
  width: 216px;
  margin-bottom: 12px;
  @media (max-width: 640px) {
    width: 200px;
  }
`;
const SchoolLogoContainer = styled.div`
  width: 209px;
  margin-bottom: 12px;
  @media (max-width: 640px) {
    width: 200px;
  }
`;
const LogoContainer = styled.div`
  width: 48px;
  margin-bottom: 12px;
  @media (max-width: 640px) {
    width: 43px;
  }
`;
const VerifiedContent = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(0deg, #fffcf5, #fffcf5),
    linear-gradient(0deg, #fec84b, #fec84b);
  border: 1px solid #fec84b;
  margin-bottom: 12px;
  border-radius: 8px;
  padding: 5px 22px;
  /* width: 100%; */
  @media all and (max-width: 480px) {
    /* width: 100%; */
    padding: 5px 7px;
  }
`;
const MinText = styled.p``;
const ErrorContainer = styled.div`
  min-width: 34px;
  width: 34px;
  margin-right: 8px;
  img {
    width: 100%;
    display: block;
  }
  /* @media all and (max-width: 1180px) {
        width: 30px;
    }
    @media all and (max-width: 768px) {
        width: 49px;
    } */
  @media all and (max-width: 480px) {
    min-width: 25px;
    width: 25px;
  }
`;
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const VerifiedText = styled.div`
  display: inline;
  font-size: 14px;
  font-family: "gordita_medium";
  margin-right: 5px;
  color: #b54708;
  @media all and (max-width: 1180px) {
    font-size: 13px !important;
  }
  @media all and (max-width: 360px) {
    font-size: 11px !important;
  }
`;
const MiniText = styled.span`
  font-size: 14px;
  color: #b54708;
  font-family: "gordita_regular" !important;
  @media all and (max-width: 1180px) {
    font-size: 12px;
  }
  @media all and (max-width: 480px) {
    display: none;
  }
`;

const InstituteLogo = styled.img`
  display: block;
  width: 100%;
`;
const SubHeadingText = styled.h4`
  font-size: 16px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  margin-bottom: 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 13px;
  }
`;
const SubParagraph = styled.p`
  font-size: 14px;
  font-family: "gordita_regular";
  margin-bottom: 5px;
  color: rgba(45, 45, 45, 1);
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  &.flex {
    color: #707070;
    font-size: 14px;
    font-family: "gordita_regular";
    overflow-wrap: break-word;
    word-break: break-all;
    word-break: normal;
  }

  span {
    display: block;
    color: rgba(112, 112, 112, 1);
    font-family: "gordita_regular";
    margin-bottom: 20px;
  }
  @media (max-width: 360px) {
    font-size: 13px;
  }
`;
const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  overflow-wrap: break-word;
  word-break: break-all;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0px;
  }
`;
const BothContainer = styled.div`
  display: flex;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const Certifications = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
`;
const More = styled.span`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #60c183;
  display: block;
  cursor: pointer;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const CertificationText = styled.h3`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #101828;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AddIconContainer = styled.div`
  margin-right: 6px;
  width: 20px;
  @media (max-width: 640px) {
    width: 18px;
  }
`;
const AddIcon = styled.img`
  width: 100%;
  display: block;
`;
const NewText = styled.h3`
  font-size: 16px;
  font-family: "gordita_medium";
  padding-top: 4px;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
const LeftContainer = styled.div`
  margin-right: 15px;
`;
const Logo = styled.img``;
const RightContainer = styled.div`
  span {
    font-size: 14px;
    color: #707070;
    margin-bottom: 12px;
    display: block;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
const Heading = styled.h4`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  @media (max-width: 640px) {
    font-size: 15px;
  }

  &.skills {
    margin-bottom: 10px;
    @media (max-width: 360px) {
      font-size: 13px;
    }
  }
  &.add-details {
    margin-bottom: 30px;
  }
`;
const SmallText = styled.h5``;
const Date = styled.p`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #707070;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;

  & span {
    margin: 0;
    display: inline-block;

    &:last-child {
      position: relative;

      @media all and (max-width: 545px) {
        &:last-child {
          margin-left: 0;
        }
      }
    }
    &.expiry {
      margin-left: 20px;
    }
    &.expiry::before {
      content: "";
      width: 6px;
      height: 6px;
      background: #999292;
      position: absolute;
      border-radius: 50%;
      left: -12px;
      top: 44%;
      transform: translateY(-50%);
      @media all and (max-width: 545px) {
        display: none;
      }
    }
  }
`;
const ViewButtonContainer = styled.a`
  border: 1px solid #475467;
  padding: 6px;
  border-radius: 16px;
  cursor: pointer;
  width: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ViewButton = styled.a`
  color: #475467;
  font-size: 14px;
  font-family: "gordita_medium";
  margin-right: 4px;
  padding-top: 2px;
`;
const ViewContainer = styled.div`
  width: 12px;
`;
const View = styled.img`
  width: 100%;
  display: block;
`;
const BottomRight = styled.div`
  width: 34%;
  @media (max-width: 980px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
`;
const SubscriptionContainer = styled.div`
  background: #f8fbf4;
  background-image: url(${lineShadow});
  background-repeat: no-repeat;
  background-position: right top;
  margin-bottom: 15px;
  border-radius: 8px;
  @media (max-width: 1080px) {
    width: 100%;
  }
  hr {
    border: 1px solid #eef2e8;
    margin-bottom: 16px;
  }
`;
const Tech = styled.div`
  padding-top: 20px;
`;
const TechSubscription = styled.h2`
  font-size: 19px;
  color: #fff;
  font-family: gordita_medium;
  background: #62d291;
  padding: 8px 23px;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const Joining = styled.div`
  padding: 23px;
`;
const TimeParagraph = styled.p`
  font-size: 16px;
  font-family: gordita_regular;
  color: #3f3f46;
  margin-bottom: 16px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  span {
    color: #d92d20;
    display: inline-block;
    font-size: 16px;
    font-family: gordita_medium;
    @media (max-width: 640px) {
      font-size: 15px;
    }
    @media (max-width: 360px) {
      font-size: 14px;
    }
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;
const StartDate = styled.span`
  color: #3f3f46 !important;
  font-size: 16px;
  display: inline-block;
  font-family: gordita_medium;
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;
const JoinedHeading = styled.span`
  display: block;
  color: #3f3f46;
  font-size: 14px;
  font-family: gordita_regular;
`;
const JoinedDate = styled.span`
  color: #3f3f46;
  font-size: 16px;
  display: inline-block;
  font-family: gordita_medium;
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;
const Information = styled.div`
  background: #f8fbf4;
  padding: 24px;
  margin-bottom: 15px;

  list-style: none;
  @media (max-width: 980px) {
    width: calc(50% - 7.5px);
    margin-bottom: 0;
  }
  @media (max-width: 640px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;
const Edited = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const MainHeading = styled.h3`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #101828;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const Details = styled.li`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Info = styled.span`
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
`;
const FlagConteiner = styled.div`
  display: flex;
  align-items: center;
`;
const FlagIcon = styled.div`
  border-radius: 50%;
  margin-right: 5px;
  width: 25px;
  border-radius: 50%;
  overflow: hidden;
  height: 25px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`;
const DistricName = styled.span`
  color: #3f3f46;
  font-size: 16px;
  font-family: "gordita_medium";
  padding-top: 6px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const Flag = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
`;
const MainText = styled.h4`
  color: #3f3f46;
  font-size: 16px;
  font-family: "gordita_medium";
  & .div {
    display: flex;
    align-items: center;
  }
  & .language {
    color: #3f3f46;
    font-size: 16px;
    font-family: "gordita_medium";
  }
  &::first-letter {
    text-transform: capitalize;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const GardianInfo = styled.div`
  background: #f8fbf4;
  padding: 24px;
  @media (max-width: 980px) {
    width: calc(50% - 7.5px);
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;
const GuardianContainer = styled.div`
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  word-break: break-all;

  &:last-child {
    border-bottom: none;
  }
`;
const ParentInfo = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ListContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const GardianHeading = styled.span`
  font-size: 14px;
  display: block;
  &.bottom {
    margin-bottom: 8px;
  }

  &::first-letter {
    text-transform: uppercase;
  }
`;
const GardianText = styled.h4`
  color: #3f3f46;
  font-size: 16px;
  font-family: "gordita_medium";
  overflow-wrap: break-word; /* Allow word breaks */
  max-width: calc(100% - 73px);
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const PrimaryButton = styled.span`
  color: #027a48;
  display: block;
  background: #c9ede0;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: "gordita_medium";
`;
const GardianDetails = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
    &::after {
      display: none;
    }
  }

  &::after {
    border: 0.5px solid #eaecf0;
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
const EditContainer = styled.div`
  min-width: 20px;
  max-width: 20px;
  cursor: pointer;
  display: block;
  height: 20px;
  margin-left: 10px;

  img {
    width: 100%;
    display: block;
  }

  @media (max-width: 980px) {
    &.responsive {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;
const Common = styled.div`
  min-width: 23px;
  max-width: 23px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const ListContainer = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 15px;

  &.info {
    background: #f8fbf4;
    margin-bottom: 0;

    @media (max-width: 980px) {
      width: calc(50% - 7.5px);
    }
    @media (max-width: 640px) {
      width: 100%;
    }
  }
  &.certification {
    margin-bottom: 0;
  }
`;
const ProfileIconContainer = styled.div`
  width: 69px;
  margin: 0 auto 24px;
`;
const ProfileIcon = styled.img`
  width: 100%;
  display: block;
`;
const SmallParagraph = styled.p`
  color: #2d2d2d;
  font-family: "gordita_regular";
  font-size: 14px;
  text-align: center;
  width: 49%;
  margin: 0 auto 24px;
  @media (max-width: 980px) {
    width: 100%;
  }
`;
const AddDetails = styled.button`
  display: block;
  margin: 0 auto;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  padding: 8px 12px;
  color: white;
  font-size: 14px;
  font-family: "gordita_medium";
  border-radius: 6px;
  cursor: pointer;
  @media (max-width: 360px) {
    padding: 8px 19px;
  }
`;

const Subheading = styled.h3`
  color: #101828;
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 40px;
`;
const AdditionalContainer = styled.div`
  width: 69px;
  margin: 0 auto 24px;
`;
const InfoIcon = styled.img`
  width: 100%;
  display: block;
`;
const Paragraph = styled.p`
  color: #2d2d2d;
  font-size: 14px;
  font-family: "gordita_regular";
  text-align: center;
  width: 90%;
  margin: 0 auto 24px;
`;
const AddContent = styled.button`
  display: block;
  margin: 0 auto;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  padding: 8px 12px;
  color: white;
  font-size: 14px;
  font-family: "gordita_medium";
  border-radius: 6px;
  cursor: pointer;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BackContainer = styled.div`
  transition: 0.5s;
  transform: scale(0);
  z-index: 1000;
  position: absolute;
  transition-delay: 0.8s;
  right: 5px;
  top: 25px;
  width: 119px;
  max-height: 90vh;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: 5px;

  &.active {
    animation: ${fadeIn} 0.3s ease-in-out;
    transform: scale(1);
  }
`;

const Items = styled.ul``;
const ListItems = styled.li`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: "gordita_medium";
  padding: 12px 13px;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
  &:last-child {
    color: #b54708;
  }
  span {
    font-size: 13px;
    padding-top: 2px;
    display: block;
    font-family: "gordita_medium";
  }
`;
const EyeContainer = styled.div`
  width: 18px;
  margin-right: 5px;
  img {
    display: block;
    width: 100%;
  }
`;
const DownLoadContainer = styled.div`
  width: 18px;
  margin-right: 5px;
  img {
    display: block;
    width: 100%;
  }
`;
export default MyProfile;
