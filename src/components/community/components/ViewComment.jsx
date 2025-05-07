import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Jdenticon from "react-jdenticon";
import useUserStore from "../../../store/userStore";
import ViewReply from "./ViewReply";
import { serverConfig } from "../../../axiosConfig";
import PostCommentBox from "./PostCommentBox";
import PostLoader from "../components/PostLoader";
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
  const loginData = useUserStore((state) => state.loginData);
  const { accessToken } = loginData;

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
          Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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
                    <Jdenticon value={item?.author?.name} />
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
              ) : null}
              {isReplyBox === item?.id && (
                <ReplyBoxContainer>
                  <PostCommentBox
                    ref={commentInputRef}
                    onSubmit={(content) =>
                      updateComment(content, item?.id, item?.author?.name)
                    }
                    parentAuthorName={item?.author?.name}
                  />
                </ReplyBoxContainer>
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
  padding: 16px 0;
  border-bottom: 1px solid #e3e8ef;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #202939;
`;

const Time = styled.span`
  font-size: 12px;
  color: #697586;
`;

const Options = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ContentContainer = styled.div`
  margin-left: 40px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #202939;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

const LikeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #697586;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }
`;

const ReplyBtn = styled(LikeBtn)``;

const ViewReplyBtn = styled(LikeBtn)`
  color: #0fa76f;
  font-family: "gordita_medium";
`;

const ReplyCount = styled.span`
  font-size: 12px;
  color: #697586;
`;

const RepliesContainer = styled.div`
  margin-top: 16px;
  display: ${(props) => (props.showReplies ? "block" : "none")};
`;

const ReplyBoxContainer = styled.div`
  margin-top: 16px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;
