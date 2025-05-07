import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProfileRouteRegex, PostRouteRegex } from "./RouteRegexPattern";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import { toast } from "react-toastify";
import { serverConfig } from "../../../axiosConfig";

function PostCardContent({ item, isSinglePost }) {
  const navigate = useNavigate();
  const location = useLocation();
  const loginData = useUserStore((state) => state.loginData);
  const [isExpanded, setIsExpanded] = useState(isSinglePost);
  const words = item?.content?.split(/\s+/) || [];
  const isLongContent = words.length > 30;
  const truncatedContent = isLongContent
    ? words.slice(0, 24).join(" ") + "..."
    : item?.content;

  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");
  const [isLiked, setIsLiked] = useState(item.is_liked);
  const [likeCount, setLikeCount] = useState(item.likes_count);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + "px");
    }
  }, [item?.content]);

  const toggleContent = (slug) => {
    if (
      location.pathname.match(ProfileRouteRegex) ||
      location.pathname.match(PostRouteRegex)
    ) {
      navigate(`/feed/${slug}`);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleLike = () => {
    const { accessToken } = loginData;
    serverConfig
      .post(
        `communityapi/v1/posts/${item.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const { status_code } = response.data;
        if (status_code === 6000) {
          setIsLiked(!isLiked);
          setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComment = () => {
    navigate(`/community/post/${item.id}/`);
  };

  const renderContent = (text) => {
    const regex =
      /(\*[^*]+\*|_[^_]+_|`[^`]+`|(https?:\/\/[^\s]+|\b(?:www\.)?[a-z0-9-]+(?:\.[a-z]{2,})+(?:\/\S*)?)|[^*_`\s]+|\s+)/g;

    const parts = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, content] = match;
      if (fullMatch.startsWith("*") && fullMatch.endsWith("*")) {
        parts.push(
          <BoldText key={match.index}>{content.slice(1, -1)}</BoldText>
        );
      } else if (fullMatch.startsWith("_") && fullMatch.endsWith("_")) {
        parts.push(
          <ItalicText key={match.index}>{content.slice(1, -1)}</ItalicText>
        );
      } else if (fullMatch.startsWith("`") && fullMatch.endsWith("`")) {
        parts.push(
          <CodeText key={match.index}>{content.slice(1, -1)}</CodeText>
        );
      } else if (fullMatch.match(/^(https?:\/\/|www\.)/)) {
        let href = fullMatch;
        if (!href.startsWith("http")) {
          href = "http://" + href;
        }
        parts.push(
          <UrlText
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {fullMatch}
          </UrlText>
        );
      } else {
        parts.push(fullMatch);
      }
    }

    return parts;
  };

  return (
    <>
      <DescriptionWrapper
        isExpanded={isExpanded}
        contentHeight={contentHeight}
        isLongContent={isLongContent}
        style={
          {
            // maxHeight: isExpanded ? contentHeight : "96px",
            // opacity: isExpanded || !isLongContent ? 1 : 0.7,
            // marginBottom: "20px",
          }
        }
      >
        <Description ref={contentRef}>
          {renderContent(item?.content)}
        </Description>
      </DescriptionWrapper>
      {isLongContent && (
        <ShowMoreButton onClick={() => toggleContent(item?.slug)}>
          {isExpanded ? "View Less" : "View More"}
        </ShowMoreButton>
      )}
      <ActionContainer>
        <ActionButton onClick={handleLike}>
          <img
            src={
              isLiked
                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/like-filled.svg"
                : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/like.svg"
            }
            alt=""
          />
          <span>{likeCount}</span>
        </ActionButton>
        <ActionButton onClick={handleComment}>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/comment.svg"
            alt=""
          />
          <span>{item.comments_count}</span>
        </ActionButton>
      </ActionContainer>
    </>
  );
}

export default PostCardContent;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  max-height: ${(props) => (props.isExpanded ? props.contentHeight : "84px")};
  opacity: ${(props) => (props.isExpanded ? 1 : 0.7)};
  margin-bottom: 20px;

  @media all and (max-width: 580px) {
    max-height: ${(props) => (props.isExpanded ? props.contentHeight : "96px")};
  }
`;

const Description = styled.p`
  color: #202939;
  font-size: 16px;
  line-height: 28px;
  margin: 0;
  white-space: pre-line;
  @media all and (max-width: 580px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const UrlText = styled.a`
  color: #0fa76f;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #0c8456;
  }
`;

const BoldText = styled.span`
  font-family: "gordita_medium";
`;

const ItalicText = styled.em`
  font-style: italic;
`;

const CodeText = styled.code`
  background-color: #f4f4f4;
  border-radius: 3px;
  font-family: monospace;
  padding: 2px 4px;
  font-size: 14px;
`;

const ShowMoreButton = styled.button`
  color: #0fa76f;
  cursor: pointer;
  font-family: "gordita_medium";
  font-size: 14px;
  padding: 0;
  background: none;
  border: none;
  transition: color 0.3s ease;

  @media all and (max-width: 480px) {
    font-size: 12px;
  }

  &:hover {
    color: #0c8456;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    color: #697586;
    font-size: 14px;
  }
`;
