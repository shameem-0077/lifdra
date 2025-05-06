import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import UserProfile from "./UserProfile";
import PostCardContent from "./PostCardContent";
import VideoPlayer from "../../applications/video-player/src/VideoPlayer";
import PostActions from "./PostActions";
import OgImageViewer from "./OgImageViewer";
import MultiImageViewer from "./MultiImageViewer";
import PostCardSkeleton from "./PostCardSkeleton";
import ViewModal from "./ViewModal";
import OptionModal from "../modals/OptionModal";
import {
  ProfileRouteRegex,
  SavedRouteRegex,
  PostRouteRegex,
} from "../../includes/community/RouteRegexPattern";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { serverConfig } from "../../../axiosConfig";
import PostTop from "./PostTop";

function PostCard({
  item,
  isDelete,
  setDelete,
  setSelectedId,
  toast,
  setFollowCount,
  setReport,
  isReport,
  isOptions,
  setOptions,
  setCmDel,
  isCmtDel,
  deletionUpdate,
  setDeletionUpdate,
  selectedComment,
  setSelectedComment,
  isSinglePost,
  setPostData,
  postData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_data } = useSelector((state) => state);

  const [imageAttachments, setImageAttachments] = useState([]);
  const [videoAttachment, setVideoAttachment] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [urlAttachments, setUrlAttachments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const currentTime = moment();

  if (location.pathname.match(SavedRouteRegex)) {
    item = item?.post;
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get("post");

    if (postId) {
      const element = document.getElementById(postId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (item?.attachments && Array?.isArray(item?.attachments)) {
      const images = [];
      let video = null;
      let ogUrl = null;
      let thumbnail = null;

      for (const attachment of item?.attachments) {
        switch (attachment?.type) {
          case "photo":
            images.push(attachment?.attachment);
            break;
          case "video":
            if (!video) {
              thumbnail = attachment?.video_thumbnail;
              video = attachment?.attachment;
            }
            break;
          case "link":
            if (!ogUrl) {
              ogUrl = attachment;
            }
            break;
        }
      }
      setUrlAttachments(ogUrl);
      setImageAttachments(images);
      setVideoThumbnail(thumbnail);
      setVideoAttachment(video);
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [location, item]);

  const handleImageClick = (slug) => {
    if (
      location.pathname.match(ProfileRouteRegex) ||
      location.pathname.match(PostRouteRegex)
    ) {
      navigate(`/feed/${slug}`);
    } else {
      setModal(true);
    }
  };

  const handleCardClick = (e) => {
    if (!e.target.closest(".options-button")) {
      setOpen(false);
    }
  };

  const formatTime = (dateUpdated) => {
    const now = moment();
    const updatedTime = moment.utc(dateUpdated);
    const duration = moment.duration(now.diff(updatedTime));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (years > 0) {
      return `${years} y`;
    } else if (months > 0) {
      return `${months} mo`;
    } else if (days > 0) {
      return `${days} d`;
    } else if (hours > 0) {
      return `${hours} h`;
    } else if (minutes > 0) {
      return `${minutes} m`;
    } else {
      return `${seconds} s`;
    }
  };

  const handleDelete = () => {
    const { access_token } = user_data;
    serverConfig
      .delete(`communityapi/v1/posts/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code } = response.data;
        if (status_code === 6000) {
          toast.success("Post deleted successfully");
          setPostData(postData.filter((item) => item.id !== this.props.item.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ViewModal
        setSelectedId={setSelectedId}
        isModal={isModal}
        setModal={setModal}
        item={item}
        setCmDel={setCmDel}
        isCmtDel={isCmtDel}
        setReport={setReport}
        setOptions={setOptions}
        isOptions={isOptions}
      />
      <MainContainer id={item?.id}>
        <OptionModal
          setOpen={setOpen}
          isOpen={isOpen}
          item={item}
          isDelete={isDelete}
          setDelete={setDelete}
          setSelectedId={setSelectedId}
          toast={toast}
          setReport={setReport}
        />
        <div onClick={handleCardClick}>
          {!isLoaded ? (
            <PostCardSkeleton />
          ) : (
            <FadeInContent>
              <Container>
                <CardTopSection>
                  <LeftTop>
                    <UserProfile
                      item={item}
                      setFollowCount={setFollowCount}
                      time={formatTime(item?.date_updated)}
                    />
                  </LeftTop>
                  <RightTop>
                    {/* <Time>
                      {formatTime(item?.date_updated)}
                    </Time> */}
                    <Options
                      className="options-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!isOpen);
                      }}
                    >
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-11-2024/dots-vertical.svg"
                        alt="Options"
                      />
                    </Options>
                  </RightTop>
                </CardTopSection>
                <CardContentSection>
                  <PostCardContent isSinglePost={isSinglePost} item={item} />
                  <MediaSection>
                    {videoAttachment ? (
                      <VideoPlayer
                        style={{ borderRadius: "8px" }}
                        source={videoAttachment}
                        cover={videoThumbnail}
                      />
                    ) : imageAttachments?.length > 0 ? (
                      <ImageViewContainer
                        onClick={() => handleImageClick(item?.slug)}
                      >
                        <MultiImageViewer
                          images={imageAttachments}
                          item={item}
                        />
                      </ImageViewContainer>
                    ) : urlAttachments ? (
                      <ImageViewContainer>
                        <OgImageViewer urlAttachments={urlAttachments} />
                      </ImageViewContainer>
                    ) : null}
                  </MediaSection>
                </CardContentSection>
              </Container>
              <ActionSection>
                <PostActions
                  item={item}
                  setReport={setReport}
                  isReport={isReport}
                  setSelectedId={setSelectedId}
                  setOptions={setOptions}
                  isOptions={isOptions}
                  isCmtDel={isCmtDel}
                  setCmDel={setCmDel}
                  deletionUpdate={deletionUpdate}
                  setDeletionUpdate={setDeletionUpdate}
                  selectedComment={selectedComment}
                  setSelectedComment={setSelectedComment}
                  isSinglePost={isSinglePost}
                />
              </ActionSection>
            </FadeInContent>
          )}
        </div>
      </MainContainer>
    </>
  );
}

export default PostCard;

const MainContainer = styled.div`
  border: 1.6px solid #eef2f6;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  @media all and (max-width: 768px) {
    margin-bottom: 24px;
  }
  @media all and (max-width: 480px) {
    border-radius: 0;
  }
`;

const FadeInContent = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  background: #fcfcfd;
  padding: 16px;

  @media all and (max-width: 768px) {
    padding: 24px;
  }
  @media all and (max-width: 480px) {
    padding: 10px;
  }
  /* @media all and (max-width: 360px) {
    padding: 10px;
  } */
`;

const CardTopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;

  @media all and (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }
  @media all and (max-width: 580px) {
    margin-bottom: 16px;
  }
`;

const LeftTop = styled.div`
  width: 94%;
`;

const RightTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  /* margin-top: 12px; */

  @media all and (max-width: 768px) {
    margin-top: 0;
  }
`;

const Time = styled.span`
  color: #9aa4b2;
  line-height: unset;
  padding-top: 4px;
  font-size: 0.857rem;
`;

const Options = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  img {
    width: 100%;

    display: block;
  }
  @media all and (max-width: 768px) {
    /* margin-top: 8px; */
  }
`;

const CardContentSection = styled.div``;

const MediaSection = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;

  @media all and (max-width: 768px) {
    margin-top: 24px;
  }
`;

const ActionSection = styled.div`
  background-color: #fcfcfd;
  border-top: 1px solid #eef2f6;
`;

const ImageViewContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
`;
