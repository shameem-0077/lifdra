import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Jdenticon from "react-jdenticon";
import ProfileModal from "../../includes/profile/ProfileModal";
import { accountsConfig, learnConfig } from "../../../../axiosConfig";
import CountCardComponent from "../../includes/profile/CountCardComponent";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import SubscriptionStatus from "./SubscriptionStatus";
import ReferCard from "../../includes/profile/version-2.0/ReferCard";
import html2canvas from "html2canvas";
import IdCard from "./IdCard";
import AllReferals from "./AllReferals";

function mapStateToProps(state) {
  return { user_profile: state.user_profile, user_data: state.user_data };
}
function mapDispatchtoProps(dispatch) {
  return {
    updateUserProfile: (user_profile) =>
      dispatch({
        type: "UPDATE_USER_PROFILE",
        user_profile: user_profile,
      }),
    updateActiveProfileMenu: (active_profile_menu) =>
      dispatch({
        type: "ACTIVE_PROFILE_MENU",
        active_profile_menu: active_profile_menu,
      }),
  };
}

function ProfilePage({
  user_profile,
  user_data,
  updateUserProfile,
  updateActiveProfileMenu,
}) {
  useEffect(() => {
    updateActiveProfileMenu("Profile");
    fetchProfile();
    // fetchReferals();
    fetchSupportCount();
    fetchPracticeCount();
    fetchAssessmentCount();
    fetchWorkshopCount();
    // fetchPromotions();
  }, []);

  const [profile, setProfile] = useState({});
  // const [referral, setReferral] = useState({});
  const [support_count, setSupportCount] = useState(0);
  const [practice_count, setPracticeCount] = useState(0);
  const [workshop_count, setWorkshopCount] = useState(0);
  const [assessment_count, setAssessmentCount] = useState(0);
  // const [promotions, setPromotions] = useState({});

  const fetchProfile = () => {
    let { access_token } = user_data;
    accountsConfig
      .get("/api/v1/users/profile/", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setProfile(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  const fetchSupportCount = () => {
    let { access_token } = user_data;

    learnConfig
      .get("/support/support-count/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setSupportCount(data.support_count);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {});
  };

  const fetchPracticeCount = () => {
    let { access_token } = user_data;

    learnConfig
      .get("practices/student-attended-practice-count/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setPracticeCount(data.practice_count);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAssessmentCount = () => {
    let { access_token } = user_data;

    learnConfig
      .get("assessments/student-attended-assessment-count/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setAssessmentCount(data.assessment_count);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {});
  };

  const fetchWorkshopCount = () => {
    let { access_token } = user_data;

    learnConfig
      .get("workshops/student-attended-workshop-count/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setWorkshopCount(data.workshop_count);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {});
  };

  // Not used now
  // const fetchPromotions = () => {
  //     let { access_token } = user_data;
  //     learnConfig
  //         .get("/promotions/student-promotion/count/", {
  //             headers: { Authorization: `Bearer ${access_token}` },
  //         })
  //         .then((response) => {
  //             const { StatusCode, data, message } = response.data;
  //             if (StatusCode === 6000) {
  //                 setPromotions(data);
  //             }
  //         })
  //         .catch((error) => {});
  // };

  const [isModal, setModal] = useState(false);

  const [selectedModal, setSelectedModal] = useState("");

  const handleModal = (status) => {
    setModal((prev) => !prev);
    if (status === "success") {
      setSuccessModal(false);
      setSelectedModal("");
    }
  };

  const handleEmailSubmit = (email) => {
    changeEmail(email);
  };

  const handleNameSubmit = (email) => {
    changeName(email);
  };

  const handleNameUpdate = () => {
    setSelectedModal(nameModal);
    handleModal();
  };

  const handleEmailUpdate = () => {
    setSelectedModal(emailModal);
    handleModal();
  };

  const [succesModal, setSuccessModal] = useState(false);

  const handleSuccessModal = (otp) => {
    verifyOtp(otp);
  };

  // Variables for post requests
  const [emailData, setEmailData] = useState({
    is_error: false,
    error_message: "",
    isLoading: false,
  });
  const [nameData, setNameData] = useState({
    is_error: false,
    error_message: "",
    isLoading: false,
  });

  // Api post requests
  const changeEmail = (email) => {
    let { access_token } = user_data;
    if (!email) {
      setEmailData({
        is_error: true,
        error_message: "This field cannot be left blank",
        isLoading: false,
      });
    } else if (profile.email === email) {
      setEmailData({
        is_error: true,
        error_message: "This is your existing email",
        isLoading: false,
      });
    } else {
      setEmailData({
        is_error: false,
        error_message: "",
        isLoading: true,
      });
      accountsConfig
        .post(
          "/api/v1/users/set-email/",
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const { StatusCode, data } = response.data;
          let { message } = data;
          if (StatusCode === 6000) {
            setEmailData({
              is_error: false,
              error_message: "",
              isLoading: false,
            });
            setSelectedModal(otpModal);
          } else {
            setEmailData({
              is_error: true,
              error_message: message,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          setEmailData({
            is_error: true,
            error_message: "An error occurred. Please try again later",
            isLoading: false,
          });
        });
    }
  };

  const verifyOtp = (otp) => {
    let { access_token } = user_data;
    if (!otp) {
      setEmailData({
        is_error: true,
        error_message: "This field cannot be left blank",
        isLoading: false,
      });
    } else {
      setEmailData({
        is_error: false,
        error_message: "",
        isLoading: true,
      });
      accountsConfig
        .post(
          "/api/v1/users/verify-email/",
          {
            otp: otp,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const { StatusCode, data } = response.data;
          let { message } = data;
          if (StatusCode === 6000) {
            setEmailData({
              is_error: false,
              error_message: "",
              isLoading: false,
            });
            setSuccessMessage("You have successfully updated your email");
            fetchProfile();
            setSuccessModal((prev) => !prev);
          } else {
            setEmailData({
              is_error: true,
              error_message: message,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          setEmailData({
            is_error: true,
            error_message: "An error occurred. Please try again later",
            isLoading: false,
          });
        });
    }
  };

  const changeName = (name) => {
    let { access_token } = user_data;
    if (!name) {
      setNameData({
        is_error: true,
        error_message: "This field cannot be left blank",
        isLoading: false,
      });
    } else if (profile.name === name) {
      setNameData({
        is_error: true,
        error_message: "This is your existing name",
        isLoading: false,
      });
    } else {
      setNameData({
        is_error: false,
        error_message: "",
        isLoading: true,
      });
      accountsConfig
        .post(
          `/api/v1/users/update-name/`,
          { name: name },
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        )
        .then((response) => {
          const { StatusCode, message } = response.data;
          if (StatusCode === 6000) {
            setNameData({
              is_error: false,
              error_message: "",
              isLoading: false,
            });
            setSuccessMessage("You have successfully updated your name");
            let user_profile_new = {
              ...user_profile,
              name: name,
            };
            updateUserProfile(user_profile_new);
            fetchProfile();
            setSuccessModal((prev) => !prev);
          } else if (StatusCode === 6001) {
            setNameData({
              is_error: true,
              error_message: message,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          setNameData({
            is_error: true,
            error_message: "An error occurred. Please try again later",
            isLoading: false,
          });
        });
    }
  };
  // initialise form datas
  useEffect(() => {
    setEmailModal({
      title: "Enter your email address",
      description:
        "Connect with us now to verify your email address and more about your latest updates",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/email-update.svg",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/mail.svg",
      button_text: "Continue",
      placeholder: "Enter your email",
      value: profile.email,
      submit_action: handleEmailSubmit,
    });
    setNameModal({
      type: "name",
      title: "Enter your name",
      description: "",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/email-update.svg",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/profile.svg",
      button_text: "Update",
      placeholder: "Enter your name",
      value: profile.name,
      submit_action: handleNameSubmit,
    });
  }, [profile]);
  const [emailModal, setEmailModal] = useState({});
  const [nameModal, setNameModal] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [otpModal] = useState({
    title: "Enter the OTP",
    description: "Otp is sent to your email address",
    image:
      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/phone-update.svg",
    icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/mail.svg",
    button_text: "Update",
    placeholder: "Enter OTP",
    value: "",
    submit_action: handleSuccessModal,
  });

  const generateIdCard = (val) => {
    html2canvas(document.getElementById(`your-id-${val}`), {
      scale: 8,
      useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
      ignoreElements: (element) => {
        if (element.tagName === "svg") {
          return true;
        }
        if (
          element.tagName === "IMG" &&
          !element.className.includes(`id-download-##`)
        ) {
          return true;
        } else {
          return false;
        }
      },
    })
      .then((canvas) => {
        let link = document.createElement("a");
        link.download = "Steyp ID Card.png";
        link.href = canvas.toDataURL();
        link.click();
      })
      .catch((error) => {
        console.log(error, "err");
      });
  };

  return (
    <>
      <ProfileModal
        isModal={isModal}
        selectedModal={selectedModal}
        handleModal={handleModal}
        succesModal={succesModal}
        successMessage={successMessage}
        statusData={selectedModal === nameModal ? nameData : emailData}
      />
      <TalropEdtechHelmet title="Profile" />
      <>
        <ProfileTop>
          <Cover></Cover>
          <Top>
            <PromImgWrap>
              {user_profile.photo ? (
                <ProfileImage
                  src={user_profile.photo}
                  alt={user_profile.name}
                />
              ) : (
                <Jdenticon
                  size={window.innerWidth > 1280 ? "170" : "133"}
                  value={user_profile.name}
                />
              )}
            </PromImgWrap>
            <TopName>
              <NameRow>
                <Name>{user_profile.name}</Name>
                <NameEdit onClick={handleNameUpdate}>
                  Update Name
                  <EditIcons>
                    <EditIcon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/editicon.svg
                                            "
                      alt="editicon"
                    />
                  </EditIcons>
                </NameEdit>
              </NameRow>
              <DetailRow>
                <DetailLeft>
                  <IconContainer>
                    <Icon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/greenphone.svg
                                            "
                      alt="icon"
                    />
                  </IconContainer>

                  <Detail>{user_profile.phone}</Detail>
                </DetailLeft>
              </DetailRow>
              <DetailRow>
                <DetailLeft>
                  <IconContainer>
                    <Icon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/greenmail.svg
                                            "
                      alt="icon"
                    />
                  </IconContainer>
                  {!profile.email ? (
                    <Edit onClick={handleEmailUpdate}>
                      Add Email
                      <EditIcons>
                        <EditIcon
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/editicon.svg
                                                    "
                          alt="editicon"
                        />
                      </EditIcons>
                    </Edit>
                  ) : (
                    <Detail>{profile.email}</Detail>
                  )}
                </DetailLeft>
                {profile.email && (
                  <Edit onClick={handleEmailUpdate}>
                    Update Email
                    <EditIcons>
                      <EditIcon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/editicon.svg
                                                "
                        alt="editicon"
                      />
                    </EditIcons>
                  </Edit>
                )}
              </DetailRow>
            </TopName>
          </Top>
        </ProfileTop>
        <Contents>
          <LeftBox>
            <Inner className="responsive-top-id">
              <IdContains>
                <YourId>Your Steyp ID Card</YourId>
                <Identity id="your-id-1">
                  <IdCard />
                </Identity>
                <Download onClick={() => generateIdCard(1)} id="download-btn">
                  Download ID Card
                </Download>
              </IdContains>
            </Inner>
            <StatusContainer className="responsive-status">
              <SubscriptionStatus />
            </StatusContainer>
            <CountCardLeftSide className="responsive-count">
              <CountCardComponent
                assessment_count={assessment_count}
                practice_count={practice_count}
                support_count={support_count}
                workshop_count={workshop_count}
              />
            </CountCardLeftSide>
            <ScrollContainer id="scroller">
              {/* <SubscriptionStatus /> */}
              <PaddingContainer>
                <Refer>
                  <ReferTitle>Refer a friend</ReferTitle>
                  <ReferDetails>
                    You can refer upto 10 friends and earn 10 coins for each
                    referral.
                  </ReferDetails>
                  <HowWorks>
                    <i className="las la-exclamation-circle"></i> How it works?
                  </HowWorks>
                  <div>
                    <WorkStructure>
                      <StepIconWrap>
                        <StepIcon
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/invite.svg"
                          alt="icon"
                        />
                      </StepIconWrap>
                      <div>
                        <StepText>Invite your friend</StepText>
                        <StepDetail>Just share your link</StepDetail>
                      </div>
                    </WorkStructure>
                    <WorkStructure>
                      <StepIconWrap>
                        <StepIcon
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/join.svg"
                          alt="icon"
                        />
                      </StepIconWrap>
                      <div>
                        <StepText>They join in Steyp</StepText>
                        <StepDetail>Join and subscribe a package</StepDetail>
                      </div>
                    </WorkStructure>
                    <WorkStructure>
                      <StepIconWrap>
                        <StepIcon
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/verification.svg"
                          alt="icon"
                        />
                      </StepIconWrap>
                      <div>
                        <StepText>Upload Id card</StepText>
                        <StepDetail>
                          Upload your student id card for discounts
                        </StepDetail>
                      </div>
                    </WorkStructure>
                    <WorkStructure>
                      <StepIconWrapLast>
                        <StepIcon
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/medal.svg"
                          alt="icon"
                        />
                      </StepIconWrapLast>
                      <div>
                        <StepText>Referral reward</StepText>
                        <StepDetail>
                          You will get coins for subscribed referral
                        </StepDetail>
                      </div>
                    </WorkStructure>
                  </div>
                </Refer>
              </PaddingContainer>
              <ReferCard
                user_profile={user_profile}
                is_profile={true}
                description="Refer a friend and get a chance to buy merchandise from Steyp"
              />

              <AllReferals />

              {/* <ReferStatus /> */}

              {/* <CountCardProfileSide>
                                <CountCardComponent
                                    assessment_count={assessment_count}
                                    practice_count={practice_count}
                                    support_count={support_count}
                                    workshop_count={workshop_count}
                                />
                            </CountCardProfileSide> */}
            </ScrollContainer>
          </LeftBox>
          <LaPaddingContainer>
            <RightBox>
              <StatusContainer>
                <SubscriptionStatus />
              </StatusContainer>
              <BannerContainer>{/* <ProfileBanner /> */}</BannerContainer>
              {/* <MiddleCards>
                                <MiddleCard>
                                    <Round>{profile.answers_in_qaspot}</Round>
                                    <MiddleCardLAbel>My Answers in QASpot</MiddleCardLAbel>
                                </MiddleCard>
                                <MiddleCard>
                                    <Round style={{ background: "#75a3f4" }}>
                                        {profile.question_in_qaspot}
                                    </Round>
                                    <MiddleCardLAbel>My Questions in QASpot</MiddleCardLAbel>
                                </MiddleCard>
                                <MiddleCard>
                                    <Round style={{ background: "#f0ae4e" }}>
                                        {profile.claim_request}
                                    </Round>
                                    <MiddleCardLAbel>My Claim Requests</MiddleCardLAbel>
                                </MiddleCard> */}
              {/* </MiddleCards> */}
              {/* <SharingBonus>
                                <SharingBonusLeft>
                                    <BonusText>Sharing Bonus</BonusText>
                                    <ReferDescription>
                                        Share the links in the{" "}
                                        <PromotionPanel to="/promotions/">
                                            promotion panel
                                        </PromotionPanel>{" "}
                                        to your friends and earn coins on each click on your link.
                                    </ReferDescription>
                                    <ReferBottomNote>
                                        1 more coin will credit after{" "}
                                        {50 - (promotions.total_promotions % 50)} clicks
                                    </ReferBottomNote>
                                </SharingBonusLeft>
                                <SharingBonusRight>
                                    <ShareCountCard>
                                        <ShareCount
                                            style={{
                                                background: "#d0f0f0",
                                                color: "#5fcc70",
                                            }}
                                        >
                                            {promotions.total_promotions}
                                        </ShareCount>
                                        <ShareCountLabel>Total clicks</ShareCountLabel>
                                    </ShareCountCard>
                                    <ShareCountCard>
                                        <ShareCount>
                                            {promotions.coins_credited
                                                ? promotions.coins_credited
                                                : 0}
                                        </ShareCount>
                                        <ShareCountLabel>Coins credited</ShareCountLabel>
                                    </ShareCountCard>
                                </SharingBonusRight>
                            </SharingBonus> */}
              <CountCardLeftSide>
                <CountCardComponent
                  assessment_count={assessment_count}
                  practice_count={practice_count}
                  support_count={support_count}
                  workshop_count={workshop_count}
                />
              </CountCardLeftSide>
              <Inner className="responsive-id">
                <IdContains>
                  <YourId>Your Steyp ID Card</YourId>
                  <Identity id="your-id-2">
                    <IdCard />
                  </Identity>
                  <Download onClick={() => generateIdCard(2)} id="download-btn">
                    Download ID Card
                  </Download>
                </IdContains>
              </Inner>
            </RightBox>
          </LaPaddingContainer>
          <Inner>
            <IdContains>
              <YourId>Your Steyp ID Card</YourId>
              <Identity id="your-id-3">
                <IdCard />
              </Identity>
              <Download onClick={() => generateIdCard(3)} id="download-btn">
                Download ID Card
              </Download>
            </IdContains>
          </Inner>
        </Contents>
      </>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProfilePage);

const Identity = styled.div``;

const Inner = styled.div`
  @media all and (max-width: 1280px) {
    display: none;
  }
  &.responsive-id {
    display: none;
    @media all and (max-width: 1280px) {
      display: block;
    }
    @media all and (max-width: 640px) {
      display: none;
    }
  }
  &.responsive-top-id {
    display: none;

    @media all and (max-width: 640px) {
      display: block;
    }
  }
`;
const StatusContainer = styled.div`
  @media all and (max-width: 640px) {
    display: none;
  }
  &.responsive-status {
    display: none;

    @media all and (max-width: 640px) {
      display: block;
      margin-top: 20px;
    }
  }
`;
const Download = styled.span`
  cursor: pointer;
  display: block;
  background-color: #0fa76f;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  padding: 7px;
  font-size: 18px;
  font-family: "gordita_medium";
  margin-top: 18px;
`;
const ProfileTop = styled.div`
  border: 1px solid #cecbcb;
  border-radius: 9px;
`;

const Cover = styled.div`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/cover.jpg");
  display: block;
  width: 100%;
  height: 148px;
  border-radius: 10px;
`;
const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.7fr 1fr;
  grid-gap: 0.6em;
  @media (max-width: 1440px) {
    grid-template-columns: 1fr 1.7fr 1fr;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 2fr 2fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const LeftBox = styled.div`
  margin-top: 20px;
`;
const ScrollContainer = styled.div`
  max-height: 800px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 980px) {
    max-height: 1000px;
  }
  @media (max-width: 640px) {
    overflow-y: unset;
    max-height: 0;
  }
  // @media all and (max-width: 1280px) {
  //     max-height: 1030px;
  // }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 17px 24px 17px;
  // transform: translateY(-45px);
  margin-top: -34px;
  align-items: center;
  // padding: 0 15px;
  @media all and (max-width: 560px) {
    padding: 0px 7px 7px 7px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const PromImgWrap = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 10px;

  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  @media (max-width: 1280px) {
    height: 133px;
    width: 133px;
  }
`;
const ProfileImage = styled.img`
  display: block;
  width: 100%;
`;
const TopName = styled.div`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  width: 82%;
  @media all and (max-width: 560px) {
    width: 100%;
  }
`;
const NameRow = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  // margin: 18px 0 30px;
  margin-top: 38px;
  margin-bottom: 5px;
  position: relative;
  @media all and (max-width: 560px) {
    margin-top: 13px;
  }
`;
const Name = styled.span`
  font-family: "baloo_paaji_2semibold";
  font-size: 26px;
  // width: 80%;
  margin-right: 9px;
  line-height: 1.4;
  @media (max-width: 1440px) {
    font-size: 24px;
  }
  @media (max-width: 1080px) {
    font-size: 19px;
  }
  @media all and (max-width: 560px) {
    font-size: 20px;
  }
  @media all and (max-width: 420px) {
    font-size: 16px;
  }
`;
const NameEdit = styled.span`
  cursor: pointer;
  color: #176edc;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  @media all and (max-width: 660px) {
    width: 35%;
  }
  @media all and (max-width: 560px) {
    font-size: 13px;
  }

  @media all and (max-width: 420px) {
    width: 42%;
  }
`;
const EditIcons = styled.div`
  width: 15px;
  margin-left: 5px;
`;

const EditIcon = styled.img`
  width: 100%;
  display: block;
`;
const Edit = styled.span`
  color: #176edc;
  font-size: 14px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media all and (max-width: 560px) {
    font-size: 13px;
  }
`;
const DetailRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const DetailLeft = styled.div`
  display: flex;
  align-items: center;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // min-width: 15px;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 50% 50%;
  border: 1px solid #0fa76f;
  padding: 6px;
  @media all and (max-width: 560px) {
    margin-right: 6px;
  }
  @media all and (max-width: 480px) {
    width: 19px;
    height: 19px;
    padding: 4px;
  }
`;
const Icon = styled.img`
  width: 100%;
  display: block;
`;
const Detail = styled.span`
  font-size: 17px;
  display: block;
  @media (max-width: 1280px) {
    font-size: 16px;
  }
  @media all and (max-width: 560px) {
    font-size: 13px;
  }
`;
const Refer = styled.div`
  // margin-top: 20px;
  padding: 15px 15px;
  margin-bottom: 20px;
  background-color: #ecf6fe;
  border-radius: 5px;
  @media all and (max-width: 640px) {
    margin-top: 20px;
  }
`;
const ReferTitle = styled.span`
  display: block;
  font-family: "baloo_paaji_2semibold";
  font-size: 18px;
`;
const ReferDetails = styled.span`
  font-size: 15px;
  display: block;
  line-height: 1.4rem;
  // width: 77%;
  margin-top: 6px;
`;
const HowWorks = styled.span`
  color: #6f6bfa;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin: 20px 0px 22px;
  i {
    margin-right: 7px;
  }
`;
const WorkStructure = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 17px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const StepIconWrap = styled.div`
  background: #fff;
  z-index: 15;
  height: 43px;
  width: 43px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  margin-right: 17px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    border: 1px dashed #989898;
    bottom: -40px;
    height: 37px;
  }
`;
const StepIconWrapLast = styled.div`
  background: #fff;
  z-index: 15;
  height: 43px;
  width: 43px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  margin-right: 17px;
`;
const StepIcon = styled.img``;
const StepText = styled.span`
  font-family: "baloo_paaji_2semibold";
  font-size: 15px;
  margin-bottom: 4px;
  display: block;
  letter-spacing: 0.005rem;
`;
const StepDetail = styled.span`
  color: #8a8a8a;
  font-size: 12px;
  display: block;
  letter-spacing: 0.005rem;
`;
const RightBox = styled.div`
  padding-top: 20px;
  @media (max-width: 640px) {
    padding-top: 0;
  }
`;
const CountCardLeftSide = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
  &.responsive-count {
    display: none;
    @media (max-width: 640px) {
      display: block;
    }
  }
`;
const PaddingContainer = styled.div``;
const LaPaddingContainer = styled.div``;
const BannerContainer = styled.div``;

const IdContains = styled.div`
  padding: 20px 10px;
  margin-top: 20px;
  background: #ecf6fe;
  border-radius: 5px;
`;
const YourId = styled.h2`
  font-family: "baloo_paaji_2semibold";
  font-size: 19px;
  margin-bottom: 5px;
`;
