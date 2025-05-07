import React, { useState } from "react";
import styled from "styled-components";
import useUserStore from "../../../store/userStore";
import UserProfile from "./UserProfile";
import PostCardContent from "./PostCardContent";
import ModalActions from "./ModalActions";
import ModalHeaderDetails from "./ModalHeaderDetails";
import { serverConfig } from "../../../axiosConfig";

function ViewDetails({
  item,
  setModal,
  isModal,
  setCmtResport,
  isCmtReport,
  isReport,
  setReport,
  setSelectedId,
  setOptions,
  isOptions,
  isCmtDel,
  setCmDel,
  setFollowCount,
}) {
  const loginData = useUserStore((state) => state.loginData);
  const { accessToken, pk } = loginData;

  const [isFollow, setFollow] = useState(item?.author?.is_following || false);

  const handleFollowClick = (id) => {
    const newIsFollow = !isFollow;
    setFollow(newIsFollow);

    updateFollow(id);
  };

  const updateFollow = async (id) => {
    try {
      const response = await serverConfig.post(
        `/api/v1/users/follow-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { status_code, data, message } = response.data;
      if (status_code === 6000) {
        if (message?.message === "Followed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow + 1,
          }));
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow - 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setFollow(!isFollow);
    }
  };

  return (
    <Container>
      <TopView>
        <ModalHeaderDetails item={item} isModal={isModal} />
        <RightTop>
          {pk !== item?.author?.id ? (
            <FollowButton
              onClick={() => handleFollowClick(item?.author?.id)}
              isActive={isFollow}
            >
              {isFollow ? "Following" : "Follow"}
            </FollowButton>
          ) : null}
          <CloseButton onClick={() => setModal(false)}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
              alt="close"
            />
          </CloseButton>
        </RightTop>
      </TopView>
      <Scrollview>
        <ContentSection>
          <PostCardContent item={item} />
        </ContentSection>
        <ActionSection>
          <ModalActions
            item={item}
            isModal={isModal}
            setCmtResport={setCmtResport}
            isCmtReport={isCmtReport}
            isReport={isReport}
            setReport={setReport}
            setSelectedId={setSelectedId}
            setOptions={setOptions}
            isOptions={isOptions}
            isCmtDel={isCmtDel}
            setCmDel={setCmDel}
          />
        </ActionSection>
      </Scrollview>
    </Container>
  );
}

export default ViewDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
`;

const TopView = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;

  @media (min-width: 375px) {
    padding: 14px;
  }

  @media (min-width: 768px) {
    padding: 20px 24px;
  }

  @media (min-width: 1024px) {
    padding: 24px 32px;
  }

  @media (min-width: 1440px) {
    padding: 28px 36px;
  }

  @media (min-width: 2560px) {
    padding: 32px 40px;
  }
`;

const RightTop = styled.div`
  display: flex;
  align-items: center;
`;

const FollowButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isActive ? '#E5E7EB' : '#F3F4F6'};
  color: ${props => props.isActive ? '#374151' : '#4B5563'};
  border: 1px solid ${props => props.isActive ? '#D1D5DB' : '#E5E7EB'};

  &:hover {
    background: ${props => props.isActive ? '#D1D5DB' : '#E5E7EB'};
  }
`;

const CloseButton = styled.div`
  height: 14px;
  width: 14px;
  margin-left: 12px;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }

  @media (min-width: 375px) {
    height: 16px;
    width: 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 1024px) {
    height: 20px;
    width: 20px;
  }

  @media (min-width: 1440px) {
    height: 22px;
    width: 22px;
  }

  @media (min-width: 2560px) {
    height: 24px;
    width: 24px;
  }
`;

const Scrollview = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eaecf0;

  @media (min-width: 375px) {
    padding: 14px;
  }

  @media (min-width: 768px) {
    padding: 20px 24px;
  }

  @media (min-width: 1024px) {
    padding: 24px 32px;
  }

  @media (min-width: 1440px) {
    padding: 28px 36px;
  }

  @media (min-width: 2560px) {
    padding: 32px 40px;
  }
`;

const ActionSection = styled.div`
  padding: 10px 12px 0px 12px;

  @media (min-width: 375px) {
    padding: 11px 14px 0px 14px;
  }

  @media (min-width: 768px) {
    padding: 12px 24px 0px 24px;
  }

  @media (min-width: 1024px) {
    padding: 12px 32px 0px 32px;
  }

  @media (min-width: 1440px) {
    padding: 14px 36px 0px 36px;
  }

  @media (min-width: 2560px) {
    padding: 16px 40px 0px 40px;
  }
`;
