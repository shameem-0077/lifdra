import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import ProfilePicNew from "../../../../assets/images/profile/profile-pic.svg";
import UploadProfilePicture from "./modals/UploadProfilePicture";

function ProfileDetails() {
  const user_profile = useSelector((state) => state.user_profile);
  const user_data = useSelector((state) => state.user_data);
  const [charCount, setCharCount] = useState(10);
  const [userEmailID, setUserEmailID] = useState(user_profile.email);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const width = window.innerWidth;

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }

  useEffect(() => {
    if (width <= 500) {
      setCharCount(15);
    } else if (width <= 768) {
      setCharCount(30);
    } else if (width <= 980) {
      setCharCount(10);
    } else if (width <= 1120) {
      setCharCount(40);
    } else if (width <= 1200) {
      setCharCount(15);
    } else if (width > 1200) {
      setCharCount(40);
    }
  }, []);

  const truncate = (str) => {
    if (str) {
      return str.length > charCount ? str.substring(charCount, 0) + "..." : str;
    }

    return " - ";
  };
  const trimedEmail = (email, char) => {
    let emailName = "";
    let emailID = "";
    let extension = "";
    let index = null;
    index = email.indexOf(char);
    emailName = email.slice(0, index);
    extension = email.slice(index, email.length);
    emailID = truncate(emailName) + extension;
    return emailID;
  };

  const handleUpload = () => {
    dispatch({
      type: "TOGGLE_STUDENT_UPLOAD_MODAL",
    });
  };

  const handleEmailSubmit = (email) => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
    dispatch({
      type: "UPDATE_PROFILE_MODAL",
      profileModalType: "email",
    });
  };

  const handleGender = () => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
    dispatch({
      type: "UPDATE_PROFILE_MODAL",
      profileModalType: "gender",
    });
  };

  const handleCategory = () => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
    dispatch({
      type: "UPDATE_PROFILE_MODAL",
      profileModalType: "student_category",
    });
  };

  const handleDOBUpdate = () => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
    dispatch({
      type: "UPDATE_PROFILE_MODAL",
      profileModalType: "date_of_birth",
    });
  };

  const handleNameUpdate = () => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
    dispatch({
      type: "UPDATE_PROFILE_MODAL",
      profileModalType: "name",
    });
  };
  const handleNewUpdatesModal = () => {
    dispatch({
      type: "TOGGLE_NEW_UPDATES_MODAL",
    });
    dispatch({
      type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
      newUpdatesModalType: "education_details",
    });
  };

  // ======== image crop ========

  const [src, setSrc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========INPUT ONCHANGE ==============

  const MAX_WIDTH = 400; // maximum dimension
  const TARGET_FILESIZE = 16400; // target filesize in bytes

  const resizeImage = (image) => {
    const canvas = document.createElement("canvas");
    let width = image.width;
    let height = image.height;

    // scale down the image to fit within the maximum dimension
    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_WIDTH) {
        width *= MAX_WIDTH / height;
        height = MAX_WIDTH;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);

    let quality = 0.9; // initial quality
    let resizedImage = canvas.toDataURL("image/jpeg", quality);

    // adjust quality until file size is within target range
    while (resizedImage.length > TARGET_FILESIZE && quality > 0) {
      quality -= 0.05; // decrease quality by 5%
      resizedImage = canvas.toDataURL("image/jpeg", quality);
    }

    return resizedImage;
  };

  const onSelectFile = useCallback(async (e) => {
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Selected file is not an image");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.src = event.target.result;

      image.onload = () => {
        // resize image and reduce file size
        const resizedImage = resizeImage(image);

        setSrc(resizedImage);
      };
    };

    reader.readAsDataURL(files[0]);
  }, []);

  //   ============= uplod profile ==============
  const uplodProfilePic = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <UploadProfilePicture src={src} setSrc={setSrc} />
      <Container>
        <ProfilePic>
          {user_profile.photo ? (
            <UpdateProfile>
              <img src={user_profile.photo} alt="Profile picture" />
            </UpdateProfile>
          ) : (
            <UpdateProfile>
              <Jdenticon
                size="100%"
                value={user_profile ? user_profile.name : "Name"}
              />
            </UpdateProfile>
          )}
          {user_profile?.subscription_active_event_type === "trial" ? (
            ""
          ) : (
            <PicAdd onClick={uplodProfilePic}>
              <img src={`${ProfilePicNew}`} alt="Profile Add" />
            </PicAdd>
          )}
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => onSelectFile(e)}
            ref={fileInputRef}
          />
        </ProfilePic>
        <NameRow>
          <UserName>{user_profile.name}</UserName>
          <EditIcon
            onClick={handleNameUpdate}
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/editicon.svg"
            alt="Icon"
          />
        </NameRow>
        <p>{errorMessage && errorMessage}</p>
        <UserId>ID : {user_profile.user_id}</UserId>
        <Details>
          <UserDetailCards onClick={handleEmailSubmit} className="active">
            <Left>
              <Icon
                // src={require("../../../../assets/images/profile/mail.svg")}
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/mail.svg
                                "
                alt="Icons"
              />
              <span>
                <h3 className="email">
                  {user_profile.email
                    ? trimedEmail(user_profile.email, "@")
                    : "Add Email"}
                </h3>
                <p>Email ID</p>
              </span>
            </Left>
            <Right>
              <Arrow
                // src={require("../../../../assets/images/profile/arrow.svg")}
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                "
                alt="arrow"
              />
            </Right>
          </UserDetailCards>
          <UserDetailCards>
            <Left>
              <Icon
                // src={require("../../../../assets/images/profile/phone.svg")}
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/phone.svg
                                "
                alt="Icons"
              />
              <span>
                <h3>{user_profile.phone}</h3>
                <p>Mobile number</p>
              </span>
            </Left>
          </UserDetailCards>
          {user_data.signup_type === "tech_schooling" && (
            <>
              <UserDetailCards onClick={handleGender} className="active">
                <Left>
                  <Icon
                    // src={require("../../../../assets/images/profile/gender2.svg")}
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/gender2.svg
                                "
                    alt="Icons"
                  />
                  <span>
                    <h3>
                      {user_profile.gender ? user_profile.gender : "Add Gender"}
                    </h3>
                    <p>Gender</p>
                  </span>
                </Left>
                <Right>
                  <Arrow
                    // src={require("../../../../assets/images/profile/arrow.svg")}
                    // alt=""
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                "
                    alt="arrow"
                  />
                </Right>
              </UserDetailCards>
              <UserDetailCards onClick={handleDOBUpdate} className="active">
                <Left>
                  <Icon
                    // src={require("../../../../assets/images/profile/dob.svg")}
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/dob.svg
                                "
                    alt="Icons"
                  />
                  <span>
                    <h3>
                      {user_profile.dob
                        ? formatDate(user_profile.dob)
                        : "Add date of birth"}
                    </h3>
                    <p>Date of Birth</p>
                  </span>
                </Left>
                <Right>
                  <Arrow
                    // src={require("../../../../assets/images/profile/arrow.svg")}
                    // alt=""
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                "
                    alt="arrow"
                  />
                </Right>
              </UserDetailCards>
              <UserDetailCards
                onClick={user_profile.student_category ? null : handleCategory}
                className={
                  user_profile.student_category ? "already selected" : "active"
                }
              >
                <Left>
                  <Icon
                    // src={require("../../../../assets/images/profile/category.svg")}
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/category.svg
                                "
                    alt="Icons"
                  />
                  <span>
                    <h3>
                      {user_profile.student_category
                        ? user_profile.student_category
                        : "Add Category"}
                    </h3>
                    <p>Category</p>
                  </span>
                </Left>
                {user_profile.student_category ? null : (
                  <Right className="alreadySelected">
                    <Arrow
                      // src={require("../../../../assets/images/profile/arrow.svg")}
                      // alt=""
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                "
                      alt="arrow"
                    />
                  </Right>
                )}
              </UserDetailCards>
              {/* <UserDetailCards
                                className={
                                    user_profile.campus_verification_status ===
                                        "approved" ||
                                    user_profile.campus_verification_status ===
                                        "pending"
                                        ? null
                                        : "active"
                                }
                                onClick={
                                    user_profile.campus_verification_status ===
                                        "approved" ||
                                    user_profile.campus_verification_status ===
                                        "pending"
                                        ? null
                                        : handleUpload
                                }
                            >
                                <Left>
                                    <Icon
                                        // src={require("../../../../assets/images/profile/campus.svg")}
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/campus.svg
                                "
                                        alt="Icons"
                                    />
                                    <span>
                                        <h3>
                                            {user_profile.campus_verification_status ===
                                                "approved" &&
                                            user_profile.campus_name
                                                ? user_profile.campus_name
                                                : user_profile.campus_verification_status ===
                                                  "pending"
                                                ? "Verfication Pending"
                                                : "Add Campus"}
                                        </h3>
                                        <p>Campus</p>
                                    </span>
                                </Left>
                                {user_profile.campus_verification_status ===
                                    "approved" ||
                                user_profile.campus_verification_status ===
                                    "pending" ? null : (
                                    <Right>
                                        <Arrow
                                            // src={require("../../../../assets/images/profile/arrow.svg")}
                                            // alt=""
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                    "
                                            alt="arrow"
                                        />
                                    </Right>
                                )}
                            </UserDetailCards> */}
              {user_profile.campus_verification_status === "approved" &&
                user_profile.campus_name && (
                  <UserDetailCards className="approved">
                    <Left>
                      <Icon
                        // src={require("../../../../assets/images/profile/campus.svg")}
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/campus.svg
                                "
                        alt="Icons"
                      />
                      <span>
                        <h3>{user_profile.campus_name}</h3>
                        <p>Campus</p>
                      </span>
                    </Left>
                    {user_profile.campus_verification_status === "approved" ||
                    user_profile.campus_verification_status ===
                      "pending" ? null : (
                      <Right>
                        <Arrow
                          // src={require("../../../../assets/images/profile/arrow.svg")}
                          // alt=""
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/arrow.svg
                                    "
                          alt="arrow"
                        />
                      </Right>
                    )}
                  </UserDetailCards>
                )}
              <UserDetailCards className="uploadId">
                <Left>
                  <Icon
                    // src={require("../../../../assets/images/profile/upload.svg")}
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/upload.svg
                                "
                    alt="Icons"
                  />
                  <span>
                    <h3
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {user_profile.campus_verification_status === "not_applied"
                        ? "Not Applied"
                        : user_profile.campus_verification_status}
                    </h3>
                    <p>ID card verfication</p>
                  </span>
                </Left>
                <Right>
                  {user_profile.campus_verification_status === "approved" ||
                  user_profile.campus_verification_status ===
                    "pending" ? null : (
                    <Button
                      onClick={
                        user_profile.campus_verification_status ===
                          "approved" ||
                        user_profile.campus_verification_status === "pending"
                          ? null
                          : handleUpload
                      }
                    >
                      Upload ID Card
                    </Button>
                  )}
                </Right>
              </UserDetailCards>
            </>
          )}
        </Details>
      </Container>
    </>
  );
}

export default ProfileDetails;

const Container = styled.div`
  padding: 20px 20px 20px 0;
  border-right: 1px solid #eeebeb;
  @media all and (max-width: 1120px) {
    border: none;
  }
  @media all and (max-width: 980px) {
    border-right: 1px solid #eeebeb;
  }
  @media all and (max-width: 768px) {
    border: none;
  }
  @media all and (max-width: 360px) {
    padding: 0;
  }
`;
const UpdateProfile = styled.div`
  width: 75%;
  overflow: hidden;
  max-width: 150px;
  min-width: 150px;
  max-height: 150px;
  min-height: 150px;
  border-radius: 50%;
  border: 7px solid #f8f8f8;
  /* overflow: hidden; */
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin: 0 auto;
  margin-bottom: 15px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 480px) {
    max-width: 120px;
    min-width: 120px;
    max-height: 120px;
    min-height: 120px;
  }
`;
const ProfilePic = styled.div`
  position: relative;

  input {
    display: none;
  }
`;
const PicAdd = styled.div`
  position: absolute;
  background-color: #56c082;
  cursor: pointer;
  /* display: inline-block; */
  bottom: 16%;
  right: 27%;
  padding: 5px;
  border-radius: 50%;
  @media all and (max-width: 1280px) {
    bottom: 12%;
    right: 21%;
  }
  @media all and (max-width: 1120px) {
    bottom: 12%;
    right: 38%;
  }
  @media all and (max-width: 980px) {
    bottom: 12%;
    right: 25%;
  }
  @media all and (max-width: 768px) {
    bottom: 12%;
    right: 38%;
  }
  @media all and (max-width: 640px) {
    bottom: 12%;
    right: 33%;
  }
  @media all and (max-width: 480px) {
    bottom: 12%;
    right: 33%;
  }
  @media all and (max-width: 360px) {
    bottom: 12%;
    right: 28%;
  }

  img {
    width: 100%;
    display: block;
  }
`;
const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserName = styled.h2`
  font-size: 18px;
  font-family: "gordita_medium";
  text-align: center;
  color: #333333;
  text-transform: capitalize;
  margin: 0 !important;
`;
const EditIcon = styled.img`
  cursor: pointer;
  display: block;
  min-width: 15px;
  margin-left: 13px;
`;
const UserId = styled.h4`
  font-size: 16px;
  font-family: "gordita_medium";
  text-align: center;
  color: #15bf81;
  margin-top: 7px;
`;

const Details = styled.div`
  margin-top: 20px;
`;

const UserDetailCards = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #eeebeb;
  transition: 0.2s;
  &.active {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  &.uploadId {
    /* @media all and (max-width: 440px) {
            display: grid !important;
            grid-template-columns: 1fr !important;
        } */
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  span {
    margin-left: 15px;
    flex: 1;
    font-family: "gordita_medium";
    overflow: hidden;
    text-overflow: ellipsis;
    h3 {
      font-size: 14px;
      font-family: "gordita_medium";
      word-wrap: break-word;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
      flex: 1;
      text-transform: capitalize;
      @media all and (max-width: 400px) {
        font-size: 14px;
      }
      @media all and (max-width: 330px) {
        font-size: 13px;
      }
      &.email {
        text-transform: none !important;
      }
    }
    p {
      font-size: 13px;
      font-family: "gordita_regular";
      @media all and (max-width: 400px) {
        font-size: 12px;
      }
    }
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Button = styled.span`
  display: block;
  width: 120px;
  font-size: 13px;
  font-family: "gordita_medium";
  height: 35px;
  border-radius: 5px;
  color: #fff;
  background-color: #15bf81;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media all and (max-width: 440px) {
    /* margin-top: 20px;
        margin-left: 40px; */
    width: 100px;
    font-size: 12px;
  }
`;
const Icon = styled.img`
  display: block;
  width: 25px;
`;
const Arrow = styled.img`
  display: block;
  width: 10px;
`;
