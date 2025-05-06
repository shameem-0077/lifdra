import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PostCommentBox from "./PostCommentBox";
import { useSelector } from "react-redux";
import ViewComment from "./ViewComment";
import { serverConfig } from "../../../axiosConfig";
import PostLoader from "./PostLoader";
import { tr } from "date-fns/locale";

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
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;
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
            Authorization: `Bearer ${access_token}`,
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
            Authorization: `Bearer ${access_token}`,
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
          Authorization: `Bearer ${access_token}`,
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
                  <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/message-circle-02.svg" />
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
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ActionLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    /* margin-bottom: 10px; */
  }
`;

const ActionRight = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  @media all and (max-width: 480px) {
    display: none;
  }
  @media (max-width: 480px) {
    padding: 0;
    padding-left: 8px;
  }
`;

const LickCountBox = styled.div`
  display: none;
  @media all and (max-width: 480px) {
    display: block;
  }
`;
const CommentCountBox = styled.div`
  display: none;
  @media all and (max-width: 480px) {
    display: block;
  }
`;

const LikeCount = styled.h5`
  color: #757575;
  font-size: 14px;
  font-family: "gordita_medium";
  margin-right: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-right: 10px;
  }
`;

const CommentCount = styled.h5`
  color: #757575;
  font-size: 14px;
  font-family: "gordita_medium";
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LikBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const LikeBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  margin-right: 24px;
  padding: 8px 12px;
  border-radius: 8px;
  /* ${(props) =>
    props.isActive &&
    `
    transform: scale(1.1);
    transition: transform 0.2s ease;
  `} */
  :hover {
    background: #ecfdf4;
    color: #4caf50;
  }

  @media (max-width: 768px) {
    margin-right: 16px;
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    margin-right: 0;
    padding: 4px 8px;
  }
`;

const CommentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentBtn = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  :hover {
    background: #ecfdf4;
    color: #4caf50;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
  }
`;

const LikeIcon = styled.div`
  width: 16.25px;
  height: 16.25px;
  margin-right: 4px;
  img {
    width: 100%;
    display: block;
  }
  &.grow {
    animation: pulse 0.4s ease-in-out; /* Apply pulse animation */
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

const CommentIcon = styled.div`
  width: 16.25px;
  height: 16.25px;
  margin-right: 4px;
  img {
    width: 100%;
    display: block;
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

const LikeText = styled.span`
  color: ${(props) => (props.isActive ? "#4caf50" : "#697586")};
  font-size: 14px;
  font-family: "gordita_medium";
  transition: color 0.2s ease;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const CommentText = styled.span`
  color: #697586;
  font-size: 14px;
  font-family: "gordita_medium";

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const LoadMoreButton = styled.button`
  color: #697586;
  border: none;
  cursor: pointer;
  font-family: "gordita_medium";
  font-size: 14px;
  margin-top: 20px;
  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 16px;
  }
`;
