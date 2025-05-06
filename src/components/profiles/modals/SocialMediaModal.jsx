import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { serverConfig } from "../../../axiosConfig";
import SignupLoader from "../../techschooling/general/loaders/SignupLoader";
import RequestLoader from "../../authentications/components/RequestLoader";

function SocialMediaModal({ isOffline }) {
  const {
    user_data: { access_token },
    isNewUpdateModal,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [allSocialMedias, setAllSocialMedias] = useState([]);
  const [mySocialMedias, setMySocialMedias] = useState([]);
  const [isButtonLoader, setButtonLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    dispatch({
      type: "TOGGLE_NEW_UPDATES_MODAL",
    });
  };

  useEffect(() => {
    if (errorMessage)
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
  }, [errorMessage]);

  const handleChange = (socialMediaId, newValue) => {
    if (mySocialMedias.some((item) => item.media === socialMediaId)) {
      const updatedSocialMedias = mySocialMedias.map((item) =>
        item.media === socialMediaId ? { ...item, username: newValue } : item
      );
      setMySocialMedias(updatedSocialMedias);
    } else {
      setMySocialMedias([
        ...mySocialMedias,
        { media: socialMediaId, username: newValue },
      ]);
    }
  };

  const getAllSocialMedias = () => {
    setLoading(true);
    serverConfig
      .get("api/v1/users/social-medias/", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setAllSocialMedias(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const addNewSocialMedia = () => {
    if (isOffline) {
      setErrorMessage("Check your network connection");
    } else if (mySocialMedias.some((item) => item?.username === "")) {
      setErrorMessage("Enter a valid username");
    } else if (mySocialMedias.some((item) => item?.username?.length >= 50)) {
      setErrorMessage("Enter a valid username");
    } else {
      setButtonLoader(true);
      serverConfig
        .post(
          "api/v1/users/add-new-social-media/",
          { social_profiles: JSON.stringify(mySocialMedias) },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((response) => {
          const { status_code, data, message } = response.data;
          setButtonLoader(false);

          if (status_code === 6000) {
            handleSuccess();
          } else {
            setErrorMessage(message?.message);
          }
        })
        .catch(() => {
          setButtonLoader(false);
        });
    }
  };

  const handleSuccess = () => {
    dispatch({
      type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
      newUpdatesModalType: "success",
    });
  };

  useEffect(() => {
    if (access_token) {
      getAllSocialMedias();
    }
  }, [access_token]);

  useEffect(() => {
    if (isNewUpdateModal) {
      setMySocialMedias([]);
    }
  }, [isNewUpdateModal]);

  const mySocialMediasHasUsername = mySocialMedias.some((socialMedia) => {
    return (
      socialMedia.hasOwnProperty("username") && socialMedia.username !== ""
    );
  });

  // console.log("mySocialMedias", mySocialMedias);

  const [innerHeight, setInnerHeight] = useState("");

  useEffect(() => {
    if (!innerHeight) {
      setInnerHeight(window?.innerHeight);
    }
  }, []);

  return (
    <>
      <Modal height={innerHeight}>
        <TitleBox>
          <TitleLeft>
            <Titles>Link your social media account</Titles>
            <SubTitle>Share your professional social media accounts</SubTitle>
          </TitleLeft>
          <CloseDiv onClick={handleClose}>
            <img
              src={require("../../../../../assets/icons/new-updates/x-close.svg")}
              alt=""
            />
          </CloseDiv>
        </TitleBox>
        <MiddleBox height={innerHeight - 180}>
          <MainContainer>
            <Container>
              {isLoading ? (
                <SignupLoader />
              ) : (
                <Middle>
                  {allSocialMedias.map((socialMedia) => (
                    <InputContainer>
                      <Company>
                        <CompanyImage>
                          <img alt="" src={socialMedia?.logo} />
                        </CompanyImage>
                        <CompanyLink>{socialMedia?.url}</CompanyLink>
                      </Company>

                      <div className="div">
                        <input
                          type="text"
                          value={
                            mySocialMedias.find(
                              (item) => item.media === socialMedia?.id
                            )?.username === undefined
                              ? socialMedia.username
                              : mySocialMedias.find(
                                  (item) => item.media === socialMedia?.id
                                )?.username
                          }
                          onChange={(e) =>
                            handleChange(socialMedia.id, e.target.value)
                          }
                          placeholder={
                            window?.innerWidth <= 480 && socialMedia?.url
                          }
                        />
                      </div>
                    </InputContainer>
                  ))}
                </Middle>
              )}
            </Container>
          </MainContainer>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </MiddleBox>
        <FooterBox>
          <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
          <SaveBtn
            onClick={mySocialMediasHasUsername && addNewSocialMedia}
            mySocialMediasHasUsername={mySocialMediasHasUsername}
          >
            {isButtonLoader ? <RequestLoader height={24} /> : "Save"}
          </SaveBtn>
        </FooterBox>
      </Modal>
    </>
  );
}

export default SocialMediaModal;

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
    width: 90%;
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
  padding: 27px 27px 20px 27px;
  border-bottom: 1px solid #eaecf0;
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
  max-height: ${({ height }) => (height ? `${height - 100}px` : "600px")};
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
`;
const FooterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 0px 0px 12px 12px;
  background: #fff;
  box-shadow: 0px -4px 10px 7px rgba(0, 0, 0, 0.04);
`;
const SaveBtn = styled.span`
  text-align: center;
  padding: 10px 20px;
  border-radius: 7px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #fff;
  font-family: "gordita_medium";
  min-width: 48%;
  font-size: 16px;
  min-height: 44px;
  cursor: ${({ mySocialMediasHasUsername }) =>
    mySocialMediasHasUsername ? "pointer" : "not-allowed"};
  background: ${({ mySocialMediasHasUsername }) =>
    mySocialMediasHasUsername
      ? "linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%)"
      : "grey"};
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
const MainContainer = styled.div`
  width: 100%;
`;
const Container = styled.div`
  border-radius: 10px;
  background: #fff;
  width: 100%;
  padding: 30px;
`;
const Middle = styled.div``;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;

  & .div {
    width: 40%;
    padding: 6px;
    border: 1px solid #d4d4d4;
    border-top-right-radius: 5px;
    background: #ebebeb;
    border-bottom-right-radius: 5px;

    @media all and (max-width: 480px) {
      width: calc(100% - 37px);
    }
  }
  input {
    font-size: 16px;
    min-width: 100%;
    max-width: 100%;
    transform: scale(1);
    transform-origin: left;

    @media all and (max-width: 640px) {
      font-size: 16px;
      min-width: 114.285714286%;
      transform: scale(0.875);
      transform-origin: left;
    }
  }
  @media all and (max-width: 480px) {
    font-size: 9px;
  }
`;
const ErrorMessage = styled.span`
  font-size: 14px;
  color: red;
  font-family: "gordita_regular";
  position: absolute;
  bottom: 15px;
  right: 40px;

  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;
const Company = styled.div`
  padding: 6px;
  display: flex;
  width: 60%;
  align-items: center;
  border: 1px solid #d4d4d4;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;

  @media all and (max-width: 480px) {
    width: initial;
    padding: 6px 8px;
  }
`;
const CompanyImage = styled.div`
  margin-right: 10px;
  min-width: 20px;
  max-width: 20px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    min-width: 15px;
    max-width: 15px;
  }
  @media all and (max-width: 480px) {
    min-width: 20px;
    max-width: 20px;
    margin-right: 0;
  }
`;
const CompanyLink = styled.span`
  display: block;
  font-size: 13px;
  color: #808080;
  font-family: "gordita_medium";

  @media all and (max-width: 480px) {
    display: none;
  }
`;
