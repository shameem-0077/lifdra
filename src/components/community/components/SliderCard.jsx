import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import moment from "moment";
import PlayButtonIcon from "../../../assets/icons/new-updates/play_button.svg";
import { toast } from "react-toastify";
import { serverConfig } from "../../../axiosConfig";

const SliderCard = ({ index, card }) => {
  const {
    id,
    author,
    date_updated,
    content,
    likes_count,
    comments_count,
    attachments,
    is_liked,
  } = card;

  const navigate = useNavigate();
  const location = useLocation();
  const { user_profile } = useSelector((state) => state);

  const [thumnail, setThumbnail] = useState({
    thumbnail: "",
    attachment_type: "",
  });

  const get_thumbnail = () => {
    if (attachments && attachments.length > 0) {
      const first_attachment = attachments[0];
      const first_attachment_type = first_attachment?.type;

      if (first_attachment_type === "photo") {
        return [first_attachment?.attachment, first_attachment_type];
      } else if (first_attachment_type === "video") {
        const thumbnail = first_attachment?.video_thumbnail
          ? first_attachment?.video_thumbnail
          : "https://i.vimeocdn.com/video/983103940_200x150.jpg";
        return [thumbnail, first_attachment_type];
      }
    }
    return [null, null];
  };

  useEffect(() => {
    const [thumbnail, attachmentType] = get_thumbnail();
    setThumbnail({
      thumbnail: thumbnail,
      attachment_type: attachmentType,
    });
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleDelete = () => {
    const { access_token } = user_profile;
    serverConfig
      .delete(`communityapi/v1/posts/${id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code } = response.data;
        if (status_code === 6000) {
          toast.success("Post deleted successfully");
          navigate("/feed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CardContainer
      onClick={() =>
        navigate(
          user_profile?.user_id == author?.user_id
            ? `/feed/post?post=${id}`
            : `/feed/post/${author?.username}?post=${id}`
        )
      }
    >
      <UpdatedTime>
        {moment(date_updated).fromNow()} 
      </UpdatedTime>
      {thumnail.thumbnail ? (
        <>
          <DescriptionDiv>
            <Description>{truncateText(content, 5)}</Description>
          </DescriptionDiv>
          <ImageDiv>
            <Image src={thumnail.thumbnail} alt="Card" />
            {thumnail.attachment_type == "video" && (
              <PlayIcon>
                <Image src={PlayButtonIcon} alt="playbutton" />
              </PlayIcon>
            )}
          </ImageDiv>
        </>
      ) : (
        <DescriptionDiv>
          <Description>{content}</Description>
        </DescriptionDiv>
      )}

      <ActionContainer>
        <LikeBtn>
          <LikeIcon>
            <img
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/thumbs-up.svg"
              }
            />
          </LikeIcon>
          <LikeCount>{likes_count}</LikeCount>
        </LikeBtn>

        <CommentBtn>
          <CommentIcon>
            <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-06-2024/message-circle-02.svg" />
          </CommentIcon>
          <CommentCount>{comments_count}</CommentCount>
        </CommentBtn>

        <DeleteBtn onClick={handleDelete}>
          <DeleteIcon>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/delete.svg"
              alt="Delete"
            />
          </DeleteIcon>
        </DeleteBtn>
      </ActionContainer>
    </CardContainer>
  );
};

export default SliderCard;

const CardContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;

  height: 250px;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #e3e8ef; */
  box-shadow: 0 1px 1rem -4px #e3e8ef;
  background: #ffffff;
  border-radius: 8px;
  transition: all 500ms ease-in-out;

  animation: ${({ animation }) =>
    animation &&
    css`
      ${animation} 1s linear
    `};
  &:hover {
    box-shadow: 0 4px 1rem -4px #e3e8ef;
    transform: translateY(-3px);
  }
`;

const ImageDiv = styled.div`
  width: 100%;
  min-height: 140px;
  max-height: 140px;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const DescriptionDiv = styled.div`
  width: 100%;
  height: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Description = styled.p`
  /* height: 130px; */
  font-size: 14px;
  padding: 5px 12px;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: start;
  padding: 12px 16px 12px 16px;
  width: 100%;
`;
const LikeBtn = styled.div`
  display: flex;
  border-radius: 8px;
  align-items: unset;
  margin-right: 12px;
`;
const LikeIcon = styled.div`
  width: 16.25px;
  height: 16.25px;
  margin-right: 4px;
  img {
    width: 100%;
    display: block;
  }
`;
const LikeText = styled.span`
  color: ${(props) => (props.isActive ? "#4caf50" : "#697586")};
  font-size: 14px;
  font-family: "gordita_medium";
  transition: color 0.2s ease;
`;
const LikeCount = styled.span`
  color: #475464;
  font-size: 15px;
  /* font-family: "gordita_medium"; */
`;
const CommentCount = styled.span`
  color: #475464;
  font-size: 15px;
  /* font-family: "gordita_medium"; */
`;
const CommentIcon = styled.div`
  width: 16.25px;
  height: 16.25px;
  margin-right: 4px;
  img {
    width: 100%;
    display: block;
  }
`;
const CommentBtn = styled.div`
  display: flex;

  border-radius: 8px;
  align-items: unset;
`;

const UpdatedTime = styled.p`
  width: 100%;
  font-size: 12px;
  padding: 12px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayIcon = styled.span`
  position: absolute;
  color: #fff;
  font-size: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 12px;
  img {
    width: 20px;
    height: 20px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteIcon = styled.div`
  width: 16.25px;
  height: 16.25px;
  img {
    width: 100%;
    display: block;
  }
`;
