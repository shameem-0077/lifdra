import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "../../community/components/UserProfile";
import PostCardContent from "../../community/components/PostCardContent";
import PostCardSkeleton from "../../community/components/PostCardSkeleton";
import { Link, useLocation } from "react-router-dom";
import OptionModal from "../../community/modals/OptionModal";
import ViewModal from "../../community/components/ViewModal";
import VideoPlayer from "../../applications/video-player/src/VideoPlayer";
import { SavedRouteRegex } from "../../community/components/RouteRegexPattern";
import MultiImageViewer from "../../community/components/MultiImageViewer";
import OgImageViewer from "../../community/components/OgImageViewer";
import { serverConfig } from "../../../axiosConfig";
import { useSelector } from "react-redux";
import PostActions from "../../community/components/PostActions";

const SearchPostCard = ({
  item,
  isLoading,
  isDelete,
  setDelete,
  setSelectedId,
  setReport,
  isReport,
  isOptions,
  setOptions,
  setCmDel,
  isCmtDel,
  deletionUpdate,
  setDeletionUpdate,
  toast,
}) => {
  const location = useLocation();
  const [imageAttachments, setImageAttachments] = useState([]);
  const [videoAttachment, setVideoAttachment] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [urlAttachments, setUrlAttachments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [followCount, setFollowCount] = useState({
    follow: 0,
    follower: 0,
  });



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

    if (item?.attachments && Array.isArray(item.attachments)) {
      const images = [];
      let video = null;
      let ogUrl = null;
      let thumbnail = null;

      for (const attachment of item.attachments) {
        switch (attachment.type) {
          case "photo":
            images.push(attachment.attachment);
            break;
          case "video":
            if (!video) {
              thumbnail = attachment.video_thumbnail;
              video = attachment.attachment;
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

  const handleCardClick = (e) => {
    if (!e.target.closest(".options-button")) {
      setOpen(false);
    }
  };

  const handleImageClick = () => {
    setModal(true);
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

      <MainContainer id={item?.id} onClick={handleCardClick}>
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
        <div>
          {isLoading ? (
            <PostCardSkeleton />
          ) : (
            <FadeInContent>
              <Container>
                <CardTopSection>
                  <LeftTop>
                    <UserProfile item={item} setFollowCount={setFollowCount}/>
                  </LeftTop>
                  <RightTop>
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
                  <PostCardContent item={item} />
                  <MediaSection>
                    {videoAttachment ? (
                      <VideoPlayer
                        style={{ borderRadius: "8px" }}
                        source={videoAttachment}
                        cover={videoThumbnail}
                      />
                    ) : imageAttachments.length > 0 ? (
                      <ImageViewContainer onClick={() => handleImageClick()}>
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
                />
              </ActionSection>
            </FadeInContent>
          )}
        </div>
      </MainContainer>
    </>
  );
};

export default SearchPostCard;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

// const MainContainer = styled.div`
//   display: flex;
//   gap: 16px;
//   h5 {
//     padding: 16px;

//     font-family: "gordita_medium";
//     font-size: ${pxToRem(16)};
//     color: #202939;
//   }
// `;

const ImgContainer = styled.div`
  max-width: 106px;
  max-height: 56px;
  border-radius: 8px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

//===================================================

const MainContainer = styled.div`
  border: 1.6px solid #eef2f6;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media all and (max-width: 768px) {
    margin-bottom: 24px;
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
  margin-top: 0px;

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
  // padding: 3px;
  width: 24px;
  cursor: pointer;
  // img {
  //   width: 100%;
  //   // height: 24px;
  //   display: block;
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
