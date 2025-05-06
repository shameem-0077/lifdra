import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../axiosConfig";
import PostLoader from "./PostLoader";
import PostCommentBox from "./PostCommentBox";
import ViewComment from "./ViewComment";

function ModalActions({
  item,
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
}) {
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;

  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(item?.is_liked || false);
  const [likeCount, setLikeCount] = useState(item?.likes_count || 0);
  const [commentCount, setCommentCount] = useState(item?.comments_count || 0);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isCommentsData, setCommentsData] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setIsLiked(item?.is_liked || false);
    setLikeCount(item?.likes_count || 0);
  }, [item]);

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));
    updateLikeCount(item);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      fetchComments();
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
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModal) {
      fetchComments();
    }
  }, [isModal]);

  const handleLoadMore = () => {
    fetchComments(true);
  };

  return (
    <Container>
      <ActionContainer>
        <ActionLeft>
          <ActionButton onClick={handleLikeClick} isActive={isLiked}>
            <ActionIcon>
              <img
                src={
                  isLiked
                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/like-green.svg"
                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/thumbs-up.svg"
                }
                alt="Like"
              />
            </ActionIcon>
            <ActionText isActive={isLiked}>Like</ActionText>
          </ActionButton>
          <ActionButton>
            <ActionIcon>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/message-circle-02.svg"
                alt="Comment"
              />
            </ActionIcon>
            <ActionText>Comment</ActionText>
          </ActionButton>
        </ActionLeft>
        <ActionRight>
          <CountText>
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </CountText>
          <CountText>
            {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
          </CountText>
        </ActionRight>
      </ActionContainer>
      <InnerContainer>
        <PostCommentBox onSubmit={updateComment} />
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
    </Container>
  );
}

export default ModalActions;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const InnerContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const ActionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #ecfdf4;
  }

  ${(props) =>
    props.isActive &&
    `
    transform: scale(1.05);
  `}
`;

const ActionIcon = styled.div`
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const ActionText = styled.span`
  color: ${(props) => (props.isActive ? "#4caf50" : "#697586")};
  font-size: 14px;
  font-family: "gordita_medium";
  transition: color 0.2s ease;
`;

const CountText = styled.span`
  color: #757575;
  font-size: 14px;
  font-family: "gordita_medium";
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
  background: none;
  cursor: pointer;
  font-family: "gordita_medium";
  font-size: 14px;
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
