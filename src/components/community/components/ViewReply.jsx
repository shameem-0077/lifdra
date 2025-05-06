import React, { useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import Jdenticon from "react-jdenticon";
import { useSelector } from "react-redux";
import PostCommentBox from "./PostCommentBox";
import { serverConfig } from "../../../axiosConfig";
import PropTypes from "prop-types";
import OptionComments from "../modals/OptionComments";

function ViewReply({
  isReplyData,
  isPostId,
  commentId,
  onReplyAdded,
  parentAuthorName,
  setOptions,
  isOptions,
  setReport,
  isReport,
  setSelectedId,
  setCmDel,
  isCmtDel,
}) {
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;

  const [isReplyBox, setReplyBox] = useState(null);
  const commentInputRef = useRef(null);
  const [likeStatus, setLikeStatus] = useState({});
  const currentTime = moment();

  const handleReply = (replyId) => {
    if (isReplyBox === replyId) {
      setReplyBox(null);
    } else {
      setReplyBox(replyId);
    }
  };

  const handleModal = (commentId) => {
    if (isOptions === commentId) {
      setOptions(null);
    } else {
      setOptions(commentId);
    }
  };

  const handleLike = async (replyId, initialLikesCount, isLiked) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [replyId]: {
        isLiked: !prevStatus[replyId]?.isLiked ?? !isLiked,
        count:
          prevStatus[replyId]?.isLiked ?? isLiked
            ? initialLikesCount - 1
            : initialLikesCount + 1,
      },
    }));

    try {
      await serverConfig.post(
        `api/v1/posts/like-comment/${replyId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const updateComment = async (content, authorname) => {
    try {
      const formData = new FormData();
      formData.append("content", content?.content);
      formData.append("parent", commentId);
      formData.append("reply_mention", authorname);

      const response = await serverConfig.post(
        `api/v1/posts/create-comment/${isPostId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status_code } = response.data;

      if (status_code === 6000) {
        setReplyBox(null);
        if (onReplyAdded) {
          onReplyAdded();
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      {Object.entries(isReplyData || {}).map(([key, item]) => (
        <Container key={key}>
          <ProfileContainer>
            <ProfileLeft>
              <ProfileIcon>
                {item?.author?.photo ? (
                  <img src={item?.author?.photo} alt="Profile" />
                ) : (
                  <Jdenticon
                    // size={window.innerWidth > 1280 ? "47" : "45"}
                    value={item?.author?.name}
                  />
                )}
              </ProfileIcon>
              <ProfileDiv>
                <UserName>{item?.author?.name ?? "--"}</UserName>
                <Time>
                  {moment.utc(item?.date_updated).fromNow(currentTime)} ago
                </Time>
              </ProfileDiv>
            </ProfileLeft>
            <Options
              onClick={(e) => {
                e.stopPropagation();
                handleModal(item?.id);
              }}
            >
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/dots.svg"
                alt="Options"
              />
            </Options>
            {isOptions === item?.id && (
              <OptionComments
                isOptions={isOptions}
                setOptions={setOptions}
                setReport={setReport}
                isReport={isReport}
                item={item}
                isCmtDel={isCmtDel}
                setCmDel={setCmDel}
                setSelectedId={setSelectedId}
              />
            )}
          </ProfileContainer>
          <ContentContainer>
            <ContentSection>
              <ParentAuthorName>@{item?.reply_mention}</ParentAuthorName>
              <Content>{item?.content}</Content>
            </ContentSection>
            <LikeBtn
              onClick={() =>
                handleLike(item?.id, item?.likes_count, item?.is_liked)
              }
              style={{
                color:
                  likeStatus[item.id]?.isLiked ?? item?.is_liked
                    ? "#0FA76F"
                    : "inherit",
              }}
            >
              Like{" "}
              {(likeStatus[item?.id]?.count ?? item?.likes_count) > 0 &&
                `(${likeStatus[item?.id]?.count ?? item?.likes_count})`}
            </LikeBtn>
            <ReplyBtn onClick={() => handleReply(item?.id)}>Reply</ReplyBtn>
            {isReplyBox === item?.id && (
              <PostCommentBox
                ref={commentInputRef}
                onSubmit={(content) =>
                  updateComment(content, item?.author?.name)
                }
                parentAuthorName={item?.author?.name}
              />
            )}
          </ContentContainer>
        </Container>
      ))}
    </>
  );
}

ViewReply.propTypes = {
  isReplyData: PropTypes.object,
  isPostId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  onReplyAdded: PropTypes.func,
  parentAuthorName: PropTypes.string.isRequired,
};

export default ViewReply;

const Content = styled.p`
  color: #121926;
  font-size: 14px;
  margin: 8px 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ContentContainer = styled.div`
  width: 92%;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 88%;
  }
`;

const Container = styled.div`
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const ProfileIcon = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    display: inline-block;
  }

  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`;

const UserName = styled.h2`
  color: #364152;
  font-size: 14px;
  font-family: "gordita_medium";
  margin: 0 !important;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ProfileDiv = styled.div`
  margin: 0 16px;

  @media (max-width: 480px) {
    margin: 0 12px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
`;

const Time = styled.span`
  color: #9aa4b2;
  font-size: 13px;
  margin-right: 8px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 6px;
  }
`;

const LikeBtn = styled.span`
  color: #697586;
  font-size: 13px;
  font-family: "gordita_medium";
  cursor: pointer;
  margin-right: 32px;

  @media (max-width: 768px) {
    margin-right: 24px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 16px;
  }
`;

const ReplyBtn = styled.span`
  color: #697586;
  font-size: 13px;
  font-family: "gordita_medium";
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ParentAuthorName = styled.span`
  color: #697586;
  font-size: 13px;
  font-family: "gordita_medium";
  margin-right: 12px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 8px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Options = styled.span`
  padding: 8px;
  cursor: pointer;

  img {
    width: 100%;
    display: block;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;
