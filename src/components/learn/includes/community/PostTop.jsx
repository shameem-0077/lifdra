import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { useHistory, useLocation, Link } from "react-router-dom";
import ProficPic from "../../../../assets/images/community/profile-pic.svg";
import CreatePostModal from "./create-post/CreatePostModal";
import { learnConfig } from "../../../../axiosConfig";

function PostTop({ toast, isUpdate, setUpdate, setModal, isModal, generatePost, isPostId }) {
  const { user_data, user_profile } = useSelector((state) => state);
  const { access_token } = user_data;

  // const [isPostId, setPostId] = useState("");

  const location = useLocation();
  const history = useHistory();

  // const generatePost = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("status", "on_draft");

  //     const response = await learnConfig.post(`/posts/create/`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     const { status_code, data } = response.data;
  //     if (status_code === 6000) {
  //       setPostId(data?.post_id);
  //     }
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  useEffect(() => {
    if (location.state && location.state.openModal) {
      setModal(true);
      generatePost();
    }
  }, [location]);

  return (
    <>
      <CreatePostModal
        setModal={setModal}
        isModal={isModal}
        isPostId={isPostId}
        toast={toast}
        setUpdate={setUpdate}
        isUpdate={isUpdate}
      />
      <CreatePostDiv
        onClick={() => {
          setModal(true);
          generatePost();
        }}
      >
        <ProfileDiv>
          <ProfileLink to={`/feed/profile`}>
            <ProfileIcon>
              {user_profile?.photo ? (
                <img src={user_profile?.photo} />
              ) : (
                <Jdenticon
                  // size={window.innerWidth > 1280 ? "47" : "45"}
                  value={user_profile?.name}
                />
              )}
            </ProfileIcon>
          </ProfileLink>
          <CreateText>What's on your mind?</CreateText>
        </ProfileDiv>

        <SendIcon>
          <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/send.svg" />
        </SendIcon>
      </CreatePostDiv>
    </>
  );
}

export default PostTop;

const CreatePostDiv = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 8px;
  border: 2px solid #e3e8ef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: text;
  @media all and (max-width: 440px) {
    display: none;
  }
`;

const ProfileIcon = styled.div`
  margin-right: 16px;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 2px solid #0fa76f;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
  }

  @media all and (max-width: 480px) {
    height: 42px;
    width: 42px;
  }
  @media all and (max-width: 360px) {
    margin-right: 10px;
  }
`;

const CreateText = styled.h4`
  margin-top: 4px;
  color: #697586;
  font-size: 1rem;

  @media all and (max-width: 360px) {
    font-size: 0.857rem;
  }
`;

const SendIcon = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  padding: 12px;
  background: #0fa76f;
  border-radius: 10px;

  img {
    display: block;
    width: 24px;
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2%)
      hue-rotate(71deg) brightness(101%) contrast(101%);

    @media all and (max-width: 480px) {
      width: 20px;
    }
  }

  @media all and (max-width: 480px) {
    height: 42px;
    width: 42px;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;

  @media all and (max-width: 480px) {
    width: 100%;
  }
`;

const ProfileLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
