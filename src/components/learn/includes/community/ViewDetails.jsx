import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import PostCardContent from "./PostCardContent";
import ModalActions from "./ModalActions";
import ModalHeaderDetails from "./ModalHeaderDetails";
import { serverConfig } from "../../../../axiosConfig";

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
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;

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
            Authorization: `Bearer ${access_token}`,
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
          {user_data?.pk !== item?.author?.id ? (
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

const FollowButton = styled.button`
  padding: 0 8px;
  background: #059664;
  border-radius: 4px;
  height: 26px;
  font-size: 11px;
  width: fit-content;
  color: #ffffff;
  cursor: pointer;
  font-family: "gordita_medium";
  transition: transform 0.2s ease-in-out, background 0.3s, color 0.3s,
    border 0.3s;

  :hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.isActive &&
    `
    border: 1px solid #cdd5df;
    background: #ffffff;
    color: #364152;
  `}

  @media (min-width: 375px) {
    padding: 0 9px;
    height: 28px;
    font-size: 12px;
  }

  @media (min-width: 768px) {
    padding: 0 10px;
    border-radius: 6px;
    height: 30px;
    font-size: 13px;
  }

  @media (min-width: 1024px) {
    padding: 0 12px;
    border-radius: 8px;
    height: 34px;
    font-size: 14px;
  }

  @media (min-width: 1440px) {
    padding: 0 14px;
    height: 36px;
    font-size: 15px;
  }

  @media (min-width: 2560px) {
    padding: 0 16px;
    border-radius: 10px;
    height: 40px;
    font-size: 16px;
  }
`;
