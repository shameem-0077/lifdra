import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/userStore";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";
import { serverConfig } from "../../../axiosConfig";
import { toast } from "react-toastify";
import moment from "moment";

function PostTop({ toast, isUpdate, setUpdate, setModal, isModal, generatePost, isPostId }) {
  const { loginData } = useUserStore();
  const { accessToken } = loginData;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.openModal) {
      setModal(true);
      generatePost();
    }
  }, [location]);

  const handleDelete = () => {
    serverConfig
      .delete(`communityapi/v1/posts/${data.id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { status_code } = response.data;
        if (status_code === 6000) {
          toast.success("Post deleted successfully");
          setPostData(postData.filter((item) => item.id !== data.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              {loginData?.photo ? (
                <img src={loginData?.photo} alt="Profile" />
              ) : (
                <Jdenticon value={loginData?.name} />
              )}
            </ProfileIcon>
          </ProfileLink>
          <CreateText>What's on your mind?</CreateText>
        </ProfileDiv>

        <SendIcon>
          <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/send.svg" alt="Send" />
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
