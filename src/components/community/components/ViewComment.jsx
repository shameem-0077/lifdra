import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Jdenticon from "react-jdenticon";
import { useSelector } from "react-redux";
import ViewReply from "./ViewReply";
import { serverConfig } from "../../../axiosConfig";
import PostCommentBox from "./PostCommentBox";
import PostLoader from "../../includes/community/PostLoader";
import OptionComments from "../modals/OptionComments";

function ViewComment({
  isCommentsData,
  isPostId,
  fetchComments,
  setCommentsData,
  isDelete,
  setDelete,
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

  const [showRepliesForId, setShowRepliesForId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isReplyData, setReplyData] = useState("");
  const [likeStatus, setLikeStatus] = useState({});
  const [isReplyBox, setReplyBox] = useState(null);
  const currentTime = moment();

  const commentInputRef = useRef(null);

  const toggleReplies = async (commentId) => {
    if (showRepliesForId === commentId) {
      setShowRepliesForId(null);
    } else {
      setShowRepliesForId(commentId);
      await fetchReplyComments(commentId);
    }
  };

  const handleReply = (commentId) => {
    if (isReplyBox === commentId) {
      setReplyBox(null);
    } else {
      setReplyBox(commentId);
    }
  };

  const handleModal = (commentId) => {
    if (isOptions === commentId) {
      setOptions(null);
    } else {
      setOptions(commentId);
    }
  };

  const fetchReplyComments = async (commentId) => {
    setReplyData("");
    setLoading(true);
    try {
      const response = await serverConfig.get(`api/v1/posts/comments/${isPostId}/`, {
        params: {
          reply_id: commentId,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const { status_code, data } = response.data;

      if (status_code === 6000) {
        setReplyData(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (content, commentId, authorname) => {
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
        fetchReplyComments();
        fetchComments();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async (commentId, initialLikesCount, isLiked) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [commentId]: {
        isLiked: !prevStatus[commentId]?.isLiked ?? !isLiked,
        count:
          prevStatus[commentId]?.isLiked ?? isLiked
            ? initialLikesCount - 1
            : initialLikesCount + 1,
      },
    }));

    try {
      await serverConfig.post(
        `api/v1/posts/like-comment/${commentId}/`,
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

  const handleCardClick = (e) => {
    if (!e.target.closest(".options-button")) {
      setOptions(null);
    }
  };

  return (
    <>
      <div onClick={handleCardClick}>
        {isCommentsData?.map((item) => (
          <Container key={item.id}>
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
                  <UserName>{item?.author?.name}</UserName>
                  <Time>
                    {moment.utc(item?.date_updated).fromNow(currentTime)} ago
                  </Time>
                </ProfileDiv>
              </ProfileLeft>
              <Options
                className="options-button"
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
              <Content>{item?.content}</Content>
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
              {item?.reply_comments_count > 0 ? (
                <>
                  <ViewReplyBtn onClick={() => toggleReplies(item?.id)}>
                    {showRepliesForId === item?.id
                      ? "Hide replies"
                      : "View replies"}
                  </ViewReplyBtn>
                  {showRepliesForId !== item?.id && (
                    <ReplyCount> ({item?.reply_comments_count})</ReplyCount>
                  )}
                  <RepliesContainer showReplies={showRepliesForId === item?.id}>
                    {showRepliesForId === item?.id &&
                      (isLoading ? (
                        <LoaderContainer>
                          <PostLoader />
                        </LoaderContainer>
                      ) : (
                        <ViewReply
                          commentId={item?.id}
                          isReplyData={isReplyData}
                          isPostId={isPostId}
                          onReplyAdded={() => fetchReplyComments(item?.id)}
                          parentAuthorName={item?.author?.name}
                          isOptions={isOptions}
                          setOptions={setOptions}
                          setReport={setReport}
                          isReport={isReport}
                          isCmtDel={isCmtDel}
                          setCmDel={setCmDel}
                          setSelectedId={setSelectedId}
                        />
                      ))}
                  </RepliesContainer>
                </>
              ) : (
                ""
              )}
              {isReplyBox === item?.id && (
                <PostCommentBox
                  ref={commentInputRef}
                  onSubmit={(content) =>
                    updateComment(content, item?.id, item?.author?.name)
                  }
                  parentAuthorName={item?.author?.name}
                />
              )}
            </ContentContainer>
          </Container>
        ))}
      </div>
    </>
  );
}

export default ViewComment;

const Container = styled.div`
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 24px;
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
  }
`;

const Content = styled.p`
  color: #121926;
  font-size: 14px;
  margin: 8px 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ContentContainer = styled.div`
  padding-left: 30px;
  width: 97%;
  margin: auto;
  border-left: 1px solid #e3e8ef;

  @media (max-width: 768px) {
    padding-left: 20px;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding-left: 15px;
    width: 93%;
  }
`;

const ViewReplyBtn = styled.button`
  color: #697586;
  font-size: 13px;
  cursor: pointer;
  font-family: "gordita_medium";
  background: none;
  border: none;
  padding: 0;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ReplyCount = styled.span`
  color: #697586;
  font-size: 13px;
  cursor: pointer;
  font-family: "gordita_medium";

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const slideDown = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    height: auto;
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
`;

const RepliesContainer = styled.div`
  max-height: ${(props) => (props.showReplies ? "1000px" : "0")};
  opacity: ${(props) => (props.showReplies ? "1" : "0")};
  overflow: hidden;
  animation: ${(props) => (props.showReplies ? slideDown : slideUp)} 0.5s
    ease-out;
`;

const LikeBtn = styled.span`
  color: #697586;
  font-size: 13px;
  font-family: "gordita_medium";
  cursor: pointer;
  margin-right: 24px;

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
  margin-right: 24px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 16px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 480px) {
    padding: 15px 0;
  }
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

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
`;
