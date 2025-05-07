import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PostCommentBox from "./PostCommentBox";
import ViewComment from "./ViewComment";
import { serverConfig } from "../../../axiosConfig";
import PostLoader from "./PostLoader";
import useUserStore from "../../../store/userStore";

function PostActions({
  item,
  setCmtResport,
  isCmtReport,
  isReport,
  setReport,
  setSelectedId,
  setOptions,
  isOptions,
  isCmtDel,
  setCmDel,
  deletionUpdate,
  setDeletionUpdate,
  selectedComment,
  setSelectedComment,
}) {
  const loginData = useUserStore((state) => state.loginData);
  const { accessToken } = loginData;
  const commentInputRef = useRef(null);
  const [isLiked, setIsLiked] = useState(item?.is_liked || false);
  const [likeCount, setLikeCount] = useState(item?.likes_count || 0);
  const [commentCount, setCommentCount] = useState(item?.comments_count || 0);
  const [isLoading, setLoading] = useState(false);
  const [isCommentsData, setCommentsData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLike, setLike] = useState(false);

  useEffect(() => {
    setIsLiked(item?.is_liked || false);
    setLikeCount(item?.likes_count || 0);
  }, [item]);

  const toggleComments = () => {
    if (selectedComment === item?.id) {
      setSelectedComment(null);
    } else {
      setSelectedComment(item?.id);
      fetchComments();
    }
  };

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));
    updateLikeCount(item);
    // Trigger the grow animation
    setLike(true);

    setTimeout(() => {
      setLike(false);
    }, 400);
  };

  const updateLikeCount = async (item) => {
    try {
      await serverConfig.post(
        `api/v1/posts/like/${item?.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating like:", error);
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    }
  };

  const updateComment = async ({ content }) => {
    setCommentCount((prevCount) => prevCount + 1);
    try {
      const formData = new FormData();
      formData.append("content", content);

      const response = await serverConfig.post(
        `api/v1/posts/create-comment/${item?.id}/`,
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
        fetchComments();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const fetchComments = async (loadMore = false) => {
    setLoading(true);
    try {
      const response = await serverConfig.get(`api/v1/posts/comments/${item?.id}/`, {
        params: {
          page: loadMore ? page + 1 : 1,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { status_code, data, pagination_data } = response.data;

      if (status_code === 6000) {
        setCommentsData(loadMore ? [...isCommentsData, ...data] : data);
        setPagination(pagination_data);
        setPage(loadMore ? page + 1 : 1);
        setDeletionUpdate(false);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deletionUpdate) {
      fetchComments();
    }
  }, [deletionUpdate]);

  const handleLoadMore = () => {
    fetchComments(true);
  };

  return (
    <>
      <Container>
        <ActionContainer>
          <ActionLeft>
            <LikBox>
              <LikeBtn onClick={handleLikeClick} isActive={isLiked}>
                <LikeIcon className={isLiked && "grow"}>
                  <img
                    src={
                      isLiked
                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/like-green.svg"
                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/thumbs-up.svg"
                    }
                    alt={isLiked ? "Liked" : "Like"}
                  />
                </LikeIcon>
                <LikeText isActive={isLiked}>Like</LikeText>
              </LikeBtn>
              <LickCountBox>
                <LikeCount>{likeCount}</LikeCount>
              </LickCountBox>
            </LikBox>
            <CommentBox>
              <CommentBtn onClick={toggleComments}>
                <CommentIcon>
                  <img 
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/message-circle-02.svg"
                    alt="Comment"
                  />
                </CommentIcon>
                <CommentText>Comment</CommentText>
              </CommentBtn>
              <CommentCountBox>
                <CommentCount>{commentCount}</CommentCount>
              </CommentCountBox>
            </CommentBox>
          </ActionLeft>
          <ActionRight>
            <LikeCount>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </LikeCount>
            <CommentCount onClick={toggleComments}>
              {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
            </CommentCount>
          </ActionRight>
        </ActionContainer>
        {selectedComment === item?.id && (
          <>
            <InnerContainer>
              <PostCommentBox ref={commentInputRef} onSubmit={updateComment} />
              {isLoading && page === 1 ? (
                <LoaderContainer>
                  <PostLoader />
                </LoaderContainer>
              ) : (
                <ViewComment
                  isCommentsData={isCommentsData}
                  fetchComments={fetchComments}
                  setCommentsData={setCommentsData}
                  isPostId={item?.id}
                  setCmtResport={setCmtResport}
                  isCmtReport={isCmtReport}
                  setReport={setReport}
                  isReport={isReport}
                  setSelectedId={setSelectedId}
                  setOptions={setOptions}
                  isOptions={isOptions}
                  isCmtDel={isCmtDel}
                  setCmDel={setCmDel}
                />
              )}
              {pagination && pagination.has_next_page && (
                <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
                  {isLoading ? "" : "Load More Comments"}
                </LoadMoreButton>
              )}
            </InnerContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default PostActions;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 2560px) {
    max-width: 2000px;
  }
`;

const InnerContainer = styled.div`
  padding: 0 24px 24px 24px;

  @media (max-width: 768px) {
    padding: 0 16px 16px 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px 12px 12px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

const ActionLeft = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ActionRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #6b7280;
  font-size: 14px;

  @media (max-width: 768px) {
    gap: 12px;
    font-size: 12px;
  }
`;

const LikBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const LikeIcon = styled.div`
  &.grow {
    animation: grow 0.4s ease-in-out;
  }

  @keyframes grow {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const LikeText = styled.span`
  color: ${(props) => (props.isActive ? "#059669" : "#6b7280")};
  font-size: 14px;
  font-weight: 500;
`;

const LickCountBox = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const CommentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentText = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`;

const CommentCountBox = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const LikeCount = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCount = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 6px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #e5e7eb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
