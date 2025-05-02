import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { accountsConfig } from "../../../../../axiosConfig";
import Jdenticon from "react-jdenticon";
import RequestLoader from "../../../includes/authentication/general/RequestLoader";
import ToastModal from "../../../includes/general/modals/ToastModal";
import disVerified from "../../../../../assets/images/profile-screen/dis_verified_icon.svg";
import notApprovedIcon from "../../../../../assets/images/profile-screen/not-approved.svg";

function ProfileTop({ userProfileDetails, setReload, handleSocialMedia }) {
  const {
    user_profile,
    user_data: { access_token },
  } = useSelector((state) => state);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastCondition, setToastCondition] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  // Designation setup
  const [designation, setDesignation] = useState("");
  const [isDesignationLoading, setDesignationLoading] = useState(false);
  const [designationError, setDesignationError] = useState(null);
  const fileInputRef = useRef(null);
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("auto");
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    // Only update if userProfileDetails.designation exists
    if (userProfileDetails?.designation) {
      setDesignation(userProfileDetails.designation);
    }
  }, [userProfileDetails?.designation]);

  const uplodProfilePic = () => {
    fileInputRef.current.click();
  };

  const handleSubmitDesignation = async () => {
    setDesignationLoading(true);
    try {
      const formData = new FormData();
      formData.append("designation", designation); // Add designation to the form data

      const response = await accountsConfig.post(
        "api/v1/users/update-designation/",
        formData,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { status_code, message } = response.data;

      if (status_code === 6000) {
        setIsEditMode(false);
        setDesignationLoading(false);
        console.log("Designation updated successfully.");
      } else if (status_code === 6001) {
        setToastCondition("error");
        setToast(true);
        setDesignationLoading(false);
        console.log(`Error: ${message || "Failed to update designation."}`);
      }
    } catch (error) {
      setDesignationLoading(false);
      console.log(
        "Unable to update profile. Please check your data connection and try again."
      );
      console.error("Error updating designation:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      if (profileImage) {
        const compressedImage = await compressImage(profileImage); // Compress the image
        formData.append("photo", compressedImage);
      }

      const response = await accountsConfig.post(
        "api/v1/users/update-photo/",
        formData,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { StatusCode, message } = response.data;

      setLoading(false);

      if (StatusCode === 6000) {
        setProfileImage(null);
        setToastMessage(message?.message);
        setToastCondition("warning");
        setToast(true);
      } else {
        setProfileImage(null);
        setToastMessage(message?.message);
        setToastCondition("error");
        setToast(true);
      }
    } catch (error) {
      alert(
        "Unable to update profile. Please check your data connection and try again."
      );
      setProfileImage(null);
      console.error(error, "error");
      setLoading(false);
    }
  };

  const compressImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          // Set a maximum width or height for the compressed image
          const maxWidth = 800;
          const maxHeight = 800;

          // Calculate the new dimensions to maintain the aspect ratio
          let newWidth = img.width;
          let newHeight = img.height;

          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }

          if (img.height > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }

          // Create a canvas element to draw the compressed image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Convert the compressed image to a Blob
          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], imageFile.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.8 // Set the desired image quality (0.8 is just an example)
          );
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };
  useEffect(() => {
    // Update input width based on the span's width
    if (spanRef.current) {
      setInputWidth(`${spanRef.current.offsetWidth + 5}px`);
    }
  }, [designation]);

  const renderSelectedProfileImage = () => {
    return (
      <BackContainer src={profileImage}>
        <Overlay />
        <ModalContainer height={window?.innerHeight} src={profileImage}>
          <Heading>Upload Profile Picture</Heading>
          <hr />
          <CropContainer height={window?.innerHeight - 400}>
            {/* <ProfileBox> */}
            {profileImage && (
              <img src={URL.createObjectURL(profileImage)} alt="Profile" />
            )}
            {/* </ProfileBox> */}
          </CropContainer>
          <hr />

          <ButtonContainer>
            <ButtonCancel
              onClick={() => {
                setProfileImage(null);
              }}
            >
              Cancel
            </ButtonCancel>
            {!isLoading ? (
              <ButtonCrop
                onClick={() => {
                  handleSubmit();
                }}
              >
                Update
              </ButtonCrop>
            ) : (
              <ButtonCrop>
                {" "}
                <RequestLoader />{" "}
              </ButtonCrop>
            )}
          </ButtonContainer>
        </ModalContainer>
      </BackContainer>
    );
  };

  const renderSocialMedias = () => {
    return (
      <>
        {userProfileDetails?.social_media?.map((item) => (
          <MediaList href={item?.media_url} target="blank" key={item.id}>
            <Linkedin src={item?.media_logo?.logo} alt="linkedinImage" />
          </MediaList>
        ))}
        <AddButton onClick={handleSocialMedia}>
          <Add
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/add-icon.svg"
            alt="addImage"
          />
        </AddButton>
      </>
    );
  };

  return (
    <>
      <ToastModal
        isToast={isToast}
        setToast={setToast}
        toastCondition={toastCondition}
        toastMessage={toastMessage}
        setReload={setReload}
      />

      {renderSelectedProfileImage()}
      {userProfileDetails?.profile_pic?.status === "pending" ? (
        <VerifiedContent>
          <ErrorContainer>
            <img src={disVerified} alt="verification process Icon" />
          </ErrorContainer>
          <TextContainer>
            <VerifiedText>
              <b>The profile photo is being verified.</b> Once approved, the
              profile picture will be displayed.
            </VerifiedText>
          </TextContainer>
        </VerifiedContent>
      ) : userProfileDetails?.profile_pic?.status === "rejected" ? (
        <VerifiedContent className="notApproved">
          <ErrorContainer>
            <img src={notApprovedIcon} alt="verification process Icon" />
          </ErrorContainer>
          <TextContainer>
            <VerifiedText className="color">
              <b>
                Your most recent profile photo was rejected due to "
                {userProfileDetails?.profile_pic?.reason}".
              </b>{" "}
              Please re-upload a different image.
            </VerifiedText>
          </TextContainer>
        </VerifiedContent>
      ) : (
        ""
      )}
      <ProfileContainer>
        <div style={{ display: "flex", width: "100%" }}>
          <ProfileLeftContainer
            className={
              userProfileDetails?.profile_pic?.status === "pending"
                ? "active"
                : userProfileDetails?.profile_pic?.status === "rejected"
                ? "reject"
                : userProfileDetails?.profile_pic?.status === "approved"
                ? ""
                : ""
            }
          >
            <MyProfilePic>
              {user_profile?.photo ? (
                <ProfilePic src={user_profile?.photo} alt="proflepic" />
              ) : (
                <Jdenticon
                  size="100%"
                  value={user_profile?.name ? user_profile.name : "Name"}
                />
              )}
            </MyProfilePic>
            <CameraIcon onClick={uplodProfilePic}>
              <Icon
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/camera.svg"
                alt="cameraImage"
              />
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                multiple={false}
                onChange={(e) => setProfileImage(e.target.files[0])}
                ref={fileInputRef}
              />
            </CameraIcon>
          </ProfileLeftContainer>

          <ProfileRightContainer action={designation}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ProfileTopBox>
                <Skill>{user_profile?.name}</Skill>
                <FlexContainer
                  isHide={userProfileDetails?.social_media?.length <= 0}
                >
                  <Id>ID: #{user_profile?.user_id}</Id>
                </FlexContainer>
              </ProfileTopBox>
              {userProfileDetails?.designation && (
                <>
                  <DesignationContainer>
                    <Designationbox isEditMode={isEditMode}>
                      {isEditMode ? (
                        <input
                          style={{
                            width: inputWidth,
                            boxSizing: "content-box",
                          }}
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      ) : (
                        <Designation ref={spanRef} isEditMode={isEditMode}>
                          {designation}
                        </Designation>
                      )}
                    </Designationbox>
                    {isEditMode ? (
                      <SaveButton
                        onClick={() => {
                          handleSubmitDesignation();
                        }}
                      >
                        <img
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/15-11-2024/check-circle.svg"
                          alt="save icon"
                        />
                      </SaveButton>
                    ) : (
                      <EditButton onClick={handleEditButtonClick}>
                        <EditImg>
                          <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg"
                            alt="Edit"
                          />
                        </EditImg>
                      </EditButton>
                    )}
                  </DesignationContainer>
                </>
              )}
            </div>
            <BottomContainer
              isHide={userProfileDetails?.social_media?.length <= 0}
            >
              {userProfileDetails?.social_media?.length <= 0 ? (
                <AddButton onClick={handleSocialMedia}>
                  <Add
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/add-icon.svg"
                    alt="addImage"
                  />
                </AddButton>
              ) : (
                <SocialMediaContainer>
                  {renderSocialMedias()}
                </SocialMediaContainer>
              )}
            </BottomContainer>
          </ProfileRightContainer>
        </div>

        <SocialMediaContainer
          className="responsive"
          isHide={userProfileDetails?.social_media?.length <= 0}
        >
          {renderSocialMedias()}
        </SocialMediaContainer>
      </ProfileContainer>

      <ProfileCategory>
        <CategoryList exact to="/profile/">
          Profile
        </CategoryList>
        <CategoryList exact to="/profile/payment-history/">
          Payment history
        </CategoryList>
        <CategoryList exact to="/profile/devices/">
          Devices
        </CategoryList>
        <CategoryList exact to="/profile/setting/">
          Settings
        </CategoryList>
      </ProfileCategory>
    </>
  );
}
const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  /* transform: translateY(-29px); */
  flex-direction: column;
  width: 100%;

  flex-wrap: wrap;
  /* padding: 32px 0; */
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e8e8e8;
  @media (max-width: 768px) {
    padding-top: 0;
  }
  @media (max-width: 480px) {
    border-bottom: none;
    gap: 10px;
  }
  @media (max-width: 360px) {
    margin-bottom: 0;
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
  &.notApproved {
    border: 1px solid #fda29b;
    background: linear-gradient(0deg, #fffbfa, #fffbfa),
      linear-gradient(0deg, #fda29b, #fda29b);
  }
  @media all and (max-width: 480px) {
    padding: 5px 7px;
  }
`;
const MinText = styled.p`
  font-size: 14px;
  color: #b54708;
  &.color {
    color: #b42318;
  }
  @media all and (max-width: 1180px) {
    font-size: 13px;
  }
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const ErrorContainer = styled.div`
  min-width: 34px;
  max-width: 34px;
  margin-right: 8px;
  img {
    width: 100%;
    display: block;
  }
  /* @media all and (max-width: 1180px) {
        width: 30px;
    } */
  /* @media all and (max-width: 768px) {
        width: 49px;
    } */
  @media all and (max-width: 480px) {
    width: 30px;
  }
`;
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  /* @media all and (max-width: 768px) {
        flex-wrap: wrap;
    } */
`;
const VerifiedText = styled.span`
  font-size: 14px;
  font-family: "gordita_regular";
  display: block;
  color: #b54708;
  &.color {
    color: #b42318;
  }

  & b {
    font-family: "gordita_medium";
  }
  @media all and (max-width: 1180px) {
    font-size: 13px !important;
  }
  @media all and (max-width: 480px) {
    font-size: 13px !important;
  }
  /* @media all and (max-width: 360px) {
        font-size: 11px !important;
    } */
`;
const ProfileLeftContainer = styled.div`
  margin-right: 24px;
  position: relative;
  border-radius: 50%;
  height: fit-content;
  @media (max-width: 640px) {
    /* margin-bottom: 10px; */
  }
  @media (max-width: 380px) {
    margin: 0 15px 15px 0;
  }
  &.active {
    border: 4px solid #fec84b;
  }
  &.reject {
    border: 4px solid #d92d20;
  }
`;
const MyProfilePic = styled.div`
  min-width: 72px;
  max-width: 72px;
  overflow: hidden;
  border-radius: 50%;
  min-height: 72px;
  max-height: 72px;
  position: relative;
  border: 4px solid #fff;
  box-shadow: 0px 4px 6px -2px #10182808;
  box-shadow: 0px 12px 16px -4px #10182814;
  display: flex;

  /* @media (max-width: 980px) {
    min-width: 126px;
    max-width: 126px;
    min-height: 126px;
    max-height: 126px;
  } */
  /* @media (max-width: 768px){
     
    } */
  /* @media (max-width: 640px) {
    min-width: 116px;
    max-width: 116px;
    min-height: 116px;
    max-height: 116px;
  } */
`;
const ProfilePic = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;
const CameraIcon = styled.div`
  position: absolute;
  width: 32px;
  bottom: -4px;
  right: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 34px;
  }

  & input {
    display: none !important;
  }
`;
const Icon = styled.img`
  width: 100%;
  display: block;
`;
const ProfileRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ action }) => (action ? "24px" : "12px")};
  width: calc(100% - 170px);
  padding-bottom: 5px;
  @media (max-width: 640px) {
    /* width: calc(100% - 137px); */
    margin-top: 15px;
  }
  @media (max-width: 380px) {
    width: 100%;
  }
`;
const ProfileTopBox = styled.div`
  display: flex;
  gap: 10px;
  /* @media all and (max-width: 480px) {
    gap: 0;
  } */
`;
const Skill = styled.h2`
  font-size: 24px;
  font-family: "gordita_medium";
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const BottomContainer = styled.div`
  display: flex;
  /* align-items: center; */
  width: 100%;
  @media (max-width: 980px) {
    flex-wrap: wrap;
  }
  @media (max-width: 380px) {
    flex-wrap: ${({ isHide }) => (isHide ? "nowrap" : "wrap")};
  }
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 27%;
  div {
    background: #d1d1d6;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    margin-right: 10px;
  }
  @media (max-width: 1280px) {
    width: 35%;
  }
  @media (max-width: 1180px) {
    width: 40%;
  }
  @media (max-width: 1080px) {
    width: 42%;
  }
  /* @media (max-width: 980px) {
    margin-bottom: 15px;
  } */
  @media (max-width: 768px) {
    width: ${({ isHide }) => (isHide ? "auto" : "100%")};
    margin-right: ${({ isHide }) => (isHide ? "10px" : "0%")};
  }
  @media (max-width: 380px) {
    margin-bottom: 0;
  }
`;
const DesignationInput = styled.div`
  max-width: 800px;
  width: fit-content;
  padding: 4px 12px;
  border: 1px solid #cdd5df;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px #1018280d;
  input {
    width: 100%;
  }
`;
const SaveButton = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
    height: 20px;
    display: block;
  }
`;
const DesignationContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;
const EditButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Designationbox = styled.div`
  max-width: 800px;
  width: fit-content;
  padding: 4px 12px;
  padding-left: ${({ isEditMode }) => (isEditMode ? "12px" : "0px")} !important;
  border: ${({ isEditMode }) => (isEditMode ? "1px solid #cdd5df" : "none")};
  border-radius: 8px;
  box-shadow: ${({ isEditMode }) =>
    isEditMode ? "0px 1px 2px 0px #1018280d" : "none"};
  input {
    max-width: 800px !important;
    font-size: 1rem;
    font-family: "gordita_regular";
    font-weight: 600;
    border: none;
    outline: none;
  }
`;
const Designation = styled.p`
  color: #344054;
  font-size: ${({ isEditMode }) => (isEditMode ? "1rem" : "1.2rem")};
  font-family: "gordita_regular";
  font-weight: 600;
`;
const EditImg = styled.span`
  width: 20px;
  height: 20px;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  img {
    display: inline-block;
    width: 100%;
    height: 20px;
  }
`;
const ButtonText = styled.span`
  display: block;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #d0d5dd;
  border-radius: 6px;
  font-family: "gordita_medium";
  padding: 4px 10px;
  color: #344054;
`;
const Id = styled.span`
  display: block;
  font-size: 14px;
  color: #0fa76f;
  font-family: "gordita_medium";
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  &.responsive {
    display: none;
  }
  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
  @media (max-width: 640px) {
    display: none;

    &.responsive {
      display: ${({ isHide }) => (isHide ? "none" : "flex")};
      width: 100%;
      margin-top: 20px;

      @media (max-width: 480px) {
        margin-top: 10px;
      }
    }
  }
`;
const MediaList = styled.a`
  display: block;
  margin-right: 24px;
  width: 24px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 980px) {
    width: 24px;
    height: 24px;

    overflow: hidden;
    height: 24px;
    display: flex;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    margin-right: 18px;
  }
  @media (max-width: 480px) {
    /* width: 28px; */
    /* margin-bottom: 24px; */
  }
  @media (max-width: 360px) {
  }
`;

const Linkedin = styled.img`
  width: 100%;
  height: 24px;
  display: block;
  object-fit: cover;
`;
const AddButton = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  @media (max-width: 980px) {
    /* width: 25px;
        height: 25px; */
  }
`;
const Add = styled.img`
  width: 100%;
  display: block;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const ProfileCategory = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 20px 0px 10px 0px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  overflow-x: auto !important;
  white-space: nowrap;
  user-select: none;
  scroll-behavior: smooth;

  /* &::-webkit-scrollbar {
    display: none; 
  } */
  @media (max-width: 480px) {
    padding: 0px 0px 10px 0px;
  }
`;
const CategoryList = styled(NavLink)`
  flex: 0 0 auto; /* Prevent items from wrapping */
  scroll-snap-align: start;
  margin-right: 30px;
  color: #7b7b7b !important;
  font-family: "gordita_medium";
  font-size: 15px;
  outline: none !important;
  &.active {
    color: #15bf81;
    position: relative;
    &::after {
      content: "";
      background: #15bf81;
      height: 2px;
      width: 100%;
      position: absolute;
      bottom: -10px;
      left: 0;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 14px; 
  }
`;

// =====================
const BackContainer = styled.div`
  position: fixed;
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  opacity: ${({ src }) => (src ? "1" : "0")};
  visibility: ${({ src }) => (src ? "unset" : "hidden")};
`;
const Overlay = styled.div`
  background-color: rgba(43, 43, 43, 0.06);
  backdrop-filter: blur(4px);

  width: 100%;
  height: 100vh;
`;
const ModalContainer = styled.div`
  position: absolute;
  padding: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.4s ease-in-out;
  ${({ src }) => (src ? "scale(1,1)" : "scale(0,0)")};
  border-radius: 10px;
  overflow: scroll;
  background-color: #fff;
  width: 550px;
  max-height: ${({ height }) => (height ? `${height - 200}px` : "100vh")};
  padding: 20px;
  hr {
    display: inline-block;
    margin: 10px 0;
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
  }

  @media (max-width: 640px) {
    width: 440px;
  }
  @media all and (max-width: 480px) {
    width: 340px;
  }
  @media all and (max-width: 360px) {
    width: 305px;
    padding: 15px 40px;
  }
`;
const Heading = styled.h3`
  font-size: 22px;
  font-family: "gordita_medium";
  color: #0a0a0a;
  @media all and (max-width: 480px) {
    font-size: 18px;
  }
`;
const ProfileBox = styled.div`
  img {
    width: 100%;
    display: block;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ButtonCancel = styled.button`
  padding: 10px 40px;
  font-size: 14px;
  width: 156px;
  display: inline-block;
  color: #747474;
  border: 1px solid #747474;
  font-family: 'gordita_medium';
  border-radius: 6px;
  margin-right: 15px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    padding: 13px 27px;
  }
  @media all and (max-width: 480px) {
    padding: 10px 34px;
  }
  @media all and (max-width: 360px) {
    padding: 8px 16px;
  }
`;
const ButtonCrop = styled.button`
  /* padding: 10px 40px; */
  font-size: 14px;
  width: 156px;
  height: 46px;
  font-family: 'gordita_medium';
  display: inline-block;
  color: #fff;
  border: 1px solid #0fa76f;
  background-color: #0fa76f;
  border-radius: 6px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    padding: 13px 27px;
  }
  @media all and (max-width: 480px) {
    padding: 10px 34px;
  }
  @media all and (max-width: 360px) {
    padding: 8px 16px;
  }
`;
const CropContainer = styled.div`
  max-height: ${({ height }) => (height ? `${height}px` : "100vh")};
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    display: block;
  }
`;

export default ProfileTop;
