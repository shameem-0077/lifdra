import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import useUserStore from "../../../store/userStore";

const PostCommentBox = forwardRef(({ onSubmit, parentAuthorName }, ref) => {
  const [content, setContent] = useState("");
  const userProfile = useUserStore((state) => state.userProfile);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content });
      setContent("");
    }
  };

  return (
    <Container>
      <FormDiv onSubmit={handleSubmit}>
        <ProfileDiv>
          <ProfileIcon>
            {userProfile?.photo ? (
              <img src={userProfile?.photo} alt="Profile" />
            ) : (
              <Jdenticon value={userProfile?.name} />
            )}
          </ProfileIcon>
        </ProfileDiv>

        <InputWrapper>
          {parentAuthorName && (
            <ParentAuthorName>@{parentAuthorName}</ParentAuthorName>
          )}
          <CommentInput
            ref={ref}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment"
          />
        </InputWrapper>
        <CommentDiv>
          <CommentBtn type="submit">Comment</CommentBtn>
          <CommentIcon type="submit">
            <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/send.svg" alt="Send" />
          </CommentIcon>
        </CommentDiv>
      </FormDiv>
    </Container>
  );
});

export default PostCommentBox;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
`;

const FormDiv = styled.form`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px #1018280d;

  @media (min-width: 768px) {
    padding: 10px 14px;
  }
`;

const ProfileDiv = styled.div`
  margin-right: 8px;
  flex-shrink: 0;
`;

const ProfileIcon = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (min-width: 768px) {
    height: 36px;
    width: 36px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 8px;
`;

const ParentAuthorName = styled.span`
  color: #697586;
  font-size: 12px;
  font-family: "gordita_medium";
  margin-right: 4px;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-right: 8px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const CommentInput = styled.input`
  color: #697586;
  font-size: 14px;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #a0aec0;
  }
`;

const CommentDiv = styled.div`
  flex-shrink: 0;
`;

const CommentBtn = styled.button`
  color: #059664;
  font-size: 12px;
  font-family: "gordita_medium";
  cursor: pointer;
  background: none;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ecfdf4;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const CommentIcon = styled.button`
  display: none;

  img {
    width: 100%;
    @media (min-width: 480px) {
      display: block;
    }
  }

  @media (max-width: 480px) {
    display: flex;
    transition: background-color 0.2s ease;
    padding: 6px 10px;
    border-radius: 4px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border: none;
    width: 40px;
    &:hover {
      background-color: #ecfdf4;
    }
  }
`;
