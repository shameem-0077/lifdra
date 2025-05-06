import React, { useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";
import ButtonLoader from "../../general/loaders/ButtonLoader";
import RequestLoader from "../../authentications/components/RequestLoader";
import { useAuthStore } from "../../../store/authStore";

function UnfollowModal({
  openModal,
  setOpenModal,
  item,
  setFollowCount,
  followCount,
  setIsFollow,
  isFollow,
}) {
  const { user_data } = useAuthStore();
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const updateFollow = async (id) => {
    try {
      const response = await serverConfig.post(
        `/api/v1/users/follow-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        }
      );
      const { status_code, data, message } = response.data;
      if (status_code === 6000) {
        if (message?.message === "Followed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follower: prevCount.follower + 1,
          }));
          setIsFollow(true);
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follower: prevCount.follower - 1,
          }));
          handleClose();
          setIsFollow(false);
        }
      }
    } catch (error) {
      console.error("Error updating follow:", error);
      setIsFollow(!isFollow);
    }
  };

  return (
    <>
      <Backdrop isVisible={openModal} />
      <Container isVisible={openModal}>
        <InnerContainer>
          <ContentSection>
            <TopSection>
              <LeftTop>
                <Heading>Unfollow {item?.name}</Heading>
              </LeftTop>
              <RightTop>
                <CloseButton onClick={() => setOpenModal(false)}>
                  <img
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                    }
                    alt="close"
                  />
                </CloseButton>
              </RightTop>
            </TopSection>
            <Desc>
              Stop seeing posts from {item?.name} on your feed. {item?.name}{" "}
              won't be notified that you've unfollowed.
            </Desc>
            <BottomSection>
              <ListItem>
                <Items>
                  <CancelBtn onClick={() => updateFollow(item?.id)}>
                    Unfollow
                  </CancelBtn>
                </Items>
                <Items>
                  <DeleteBtn
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    {isLoading ? <RequestLoader height={24} /> : "Cancel"}
                  </DeleteBtn>
                </Items>
              </ListItem>
            </BottomSection>
          </ContentSection>
        </InnerContainer>
      </Container>
    </>
  );
}

export default UnfollowModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const InnerContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  transition: 0.5s;
  z-index: 101;

  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    width: 700px;
  }
  @media (max-width: 768px) {
    width: 560px;
  }
  @media (max-width: 640px) {
    width: 440px;
  }
  @media (max-width: 480px) {
    width: 350px;
  }
  @media (max-width: 360px) {
    width: 305px;
  }
`;
const ContentSection = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  padding: 24px;
`;

const ImgContainer = styled.div`
  img {
    width: 100%;
    aspect-ratio: auto;
    display: block;
  }
`;
const CloseButton = styled.div`
  height: 18px;
  width: 18px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 15px;
    height: 15px;
  }
  @media all and (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
  @media all and (max-width: 360px) {
    width: 10px;
    height: 10px;
  }
`;
const TopSection = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
`;
const LeftTop = styled.div``;
const RightTop = styled.div``;
const Heading = styled.h2`
  font-size: 18px;
`;
const Desc = styled.p`
  font-size: 14px;
  color: #475467;
`;
const BottomSection = styled.div`
  margin-top: 32px;
`;
const ListItem = styled.ul`
  display: flex;
  justify-content: end;
`;
const Items = styled.li`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;
const CancelBtn = styled.button`
  padding: 10px 18px 10px 18px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #9aa4b2;
  color: #364152;
  font-size: 16px;
  font-family: "gordita_medium";
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  padding: 10px 18px 10px 18px;
  border-radius: 6px;
  min-width: 100px;
  background: #059664;
  border: 1px solid #059664;
  color: #ffffff;
  font-size: 16px;
  font-family: "gordita_medium";
  cursor: pointer;
`;
