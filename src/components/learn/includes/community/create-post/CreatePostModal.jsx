import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import Preview from "./ModalPreview";
import Jdenticon from "react-jdenticon";
import { learnConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";
import DiscardModal from "../modals/DiscardModal";
import FormattedTextarea from "./FormattedTextarea";
import UrlPreviewCard from "./UrlPreviewCard";

function CreatePostModal({
  isModal,
  setModal,
  isPostId,
  toast,
  setUpdate,
  isUpdate,
}) {
  const { user_profile, user_data } = useSelector((state) => state);
  const { access_token } = user_data;
  const textareaRef = useRef(null);

  const [media, setMedia] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [attachmentIds, setAttachmentIds] = useState([]);
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAttachmentPending, setIsAttachmentPending] = useState(false);
  const [urlMetadata, setUrlMetadata] = useState(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  useEffect(() => {
    setHasUnsavedChanges(description.trim().length > 0 || media.length > 0);
  }, [description, media]);

  const openMediaDialog = (type) => {
    if (mediaType && mediaType !== type) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = type === "image";
    fileInput.accept = type === "image" ? "image/*" : "video/*";
    fileInput.addEventListener("change", (event) =>
      handleMediaUpload(event, type)
    );
    fileInput.click();
  };

  // --------------------- Clear state -------

  const handleClean = () => {
    setMedia("");
    setDescription("");
    setMediaUrls([]);
    setUrlMetadata("");
  };

  const uploadAttachment = async (file, type) => {
    setIsAttachmentPending(true);
    try {
      const formData = new FormData();
      formData.append("status", "published");
      formData.append("type", type === "image" ? "photo" : "video");

      if (type === "image") {
        formData.append("photo", file, file.name);
      } else if (type === "video") {
        formData.append("video", file, file.name);
      }

      const response = await learnConfig.post(
        `/posts/upload-attachment/${isPostId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status_code, data } = response.data;
      if (status_code === 6000) {
        return data.id;
      }
    } catch (error) {
      console.error("Error uploading attachment:", error);
    } finally {
      setIsAttachmentPending(false);
    }
    return null;
  };

  const handleMediaUpload = async (event, type) => {
    const files = Array.from(event.target.files);

    if (type === "image") {
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setMedia((prevMedia) => [...prevMedia, ...files]);
      setMediaUrls((prevUrls) => [...prevUrls, ...newUrls]);
      setMediaType("image");

      const ids = [];
      for (const file of files) {
        const id = await uploadAttachment(file, "image");
        if (id) ids.push(id);
      }
      setAttachmentIds((prevIds) => [...prevIds, ...ids]);
    } else if (type === "video") {
      if (files.length > 0) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        setMedia([file]);
        setMediaUrls([url]);
        setMediaType("video");

        const id = await uploadAttachment(file, "video");
        if (id) setAttachmentIds([id]);
      }
    }
  };

  const handleDescriptionChange = (newValue) => {
    setDescription(newValue);
    detectAndFetchUrlMetadata(newValue);
  };

  const detectAndFetchUrlMetadata = async (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (urls && urls.length > 0) {
      const lastUrl = urls[urls.length - 1];
      try {
        const response = await learnConfig.get(
          `/general/get-link-data/?link=${encodeURIComponent(lastUrl)}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const metadata = response.data;
        setUrlMetadata(metadata?.data);
      } catch (error) {
        console.error("Error fetching URL metadata:", error);
        setUrlMetadata(null);
      }
    } else {
      setUrlMetadata(null);
    }
  };

  const handleRemoveMedia = async (index) => {
    const updatedMedia = [...media];
    const updatedMediaUrls = [...mediaUrls];
    const updatedAttachmentIds = [...attachmentIds];

    const removedAttachmentId = updatedAttachmentIds[index];

    updatedMedia.splice(index, 1);
    updatedMediaUrls.splice(index, 1);
    updatedAttachmentIds.splice(index, 1);

    setMedia(updatedMedia);
    setMediaUrls(updatedMediaUrls);
    setAttachmentIds(updatedAttachmentIds);

    if (updatedMedia.length === 0) {
      setMediaType(null);
    }

    if (removedAttachmentId) {
      try {
        const response = await learnConfig.post(
          `/posts/delete-attachment/${isPostId}/${removedAttachmentId}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.data.status_code === 6000) {
        } else {
        }
      } catch (error) {}
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("status", "published");
      formData.append("content", description);

      const response = await learnConfig.post(
        `/posts/edit/${isPostId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status_code, data } = response.data;
      if (status_code === 6000) {
        setModal(false);
        setHasUnsavedChanges(false);
        toast.success("Post created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setUpdate(!isUpdate);
        handleClean();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.warn("Post creating failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasUnsavedChanges(description.trim().length > 0 || media.length > 0);
  }, [description, media]);

  useEffect(() => {
    setIsSubmitEnabled(
      (description.trim().length > 0 || media.length > 0) &&
        !isAttachmentPending
    );
  }, [description, media, isAttachmentPending]);

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true);
    } else {
      setModal(false);
      setUrlMetadata("");
    }
  };

  const handleDiscardChanges = () => {
    setModal(false);
    setShowDiscardModal(false);
    setHasUnsavedChanges(false);
    setDescription("");
    setMedia([]);
    setMediaUrls([]);
    setMediaType("");
    setAttachmentIds([]);
    setUrlMetadata("");
  };

  return (
    <>
      <Backdrop isVisible={isModal} />
      <Container isVisible={isModal}>
        <Overlay>
          <InnerContainer>
            <CloseButton onClick={handleCloseModal}>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                alt="close"
              />
            </CloseButton>

            <ContentSection>
              <DetailsSec>
                <ProfileIcon>
                  {user_profile.photo ? (
                    <ProfilePic
                      src={user_profile.photo}
                      alt={user_profile.name}
                    />
                  ) : (
                    <PromImgWrap>
                      <Jdenticon value={user_profile.name} />
                    </PromImgWrap>
                  )}
                </ProfileIcon>
                <ProfileDiv>
                  <UserName>{user_profile?.name ?? "--"}</UserName>
                  <UserProgram>{user_profile?.designation ?? "--"}</UserProgram>
                </ProfileDiv>
              </DetailsSec>
              <TopDiv>
                <TextDiv>
                  <FormattedTextarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Write a post...."
                  />
                </TextDiv>
                {urlMetadata && <UrlPreviewCard metadata={urlMetadata} />}
                {isAttachmentPending ? (
                  <LoaderContainer>
                    <LoaderSpinner />
                  </LoaderContainer>
                ) : (
                  <Preview
                    images={
                      mediaType === "image"
                        ? mediaUrls.map((url, index) => ({
                            preview: url,
                            id: attachmentIds[index],
                          }))
                        : []
                    }
                    videos={
                      mediaType === "video"
                        ? [{ preview: mediaUrls[0], id: attachmentIds[0] }]
                        : []
                    }
                    onRemoveImage={handleRemoveMedia}
                    onRemoveVideo={handleRemoveMedia}
                  />
                )}
              </TopDiv>
              <BottomSection>
                <Buttondiv>
                  <MediaButton
                    onClick={() => openMediaDialog("image")}
                    disabled={mediaType === "video" || isAttachmentPending}
                    isDisabled={mediaType === "video" || isAttachmentPending}
                  >
                    <img
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-11-2024/image.svg"
                      alt="Upload Image"
                    />
                  </MediaButton>
                  <MediaButton
                    onClick={() => openMediaDialog("video")}
                    disabled={mediaType === "image" || isAttachmentPending}
                    isDisabled={mediaType === "image" || isAttachmentPending}
                  >
                    <img
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-11-2024/video-uploadicon.svg"
                      alt="Upload Video"
                    />
                  </MediaButton>
                </Buttondiv>
                <PostBtn
                  onClick={handleSubmit}
                  disabled={
                    !isSubmitEnabled || isLoading || isAttachmentPending
                  }
                  isDisabled={
                    !isSubmitEnabled || isLoading || isAttachmentPending
                  }
                >
                  {isLoading ? <RequestLoader height={24} /> : "Post"}
                </PostBtn>
              </BottomSection>
            </ContentSection>
          </InnerContainer>
        </Overlay>
      </Container>
      <DiscardModal
        isDelete={showDiscardModal}
        setDelete={setShowDiscardModal}
        onDeleteSuccess={handleDiscardChanges}
        setModal={setModal}
      />
    </>
  );
}

export default CreatePostModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100dvh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100dvh;
`;

const InnerContainer = styled.div`
  width: 45vw;
  height: 60dvh;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    width: 700px;
  }
  @media (max-width: 768px) {
    max-width: 560px;

    width: 100%;
  }

  @media (max-width: 560px) {
    width: 100%;
    height: 100dvh;
  }
`;

const ContentSection = styled.div`
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media all and (max-width: 440px) {
    border-radius: unset;
    height: calc(100% - 80px);
  }
`;

const TopDiv = styled.div`
  padding: 0px 24px 20px 24px;
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100% - 150px);
  scrollbar-width: thin;
  scrollbar-color: rgba(205, 213, 223, 1) #f1f1f1;
  /* For WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(238, 242, 246, 1);
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const TextDiv = styled.form`
  margin-top: 24px;
`;

const TextArea = styled.textarea`
  resize: none;
  font-size: 18px;
  width: 100%;
  overflow: hidden;
  min-height: 50px;
  box-sizing: border-box;
`;

const Buttondiv = styled.div`
  display: flex;
  align-items: center;
`;

const MediaButton = styled.button`
  width: 29px;
  height: 29px;
  margin-right: 24px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  background-color: transparent;
  border: none;
  padding: 0;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  transition: opacity 0.3s ease;
  &:last-child {
    margin-right: 0;
  }
  img {
    display: block;
    width: 100%;
  }
`;

const CloseButton = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  right: 33px;
  top: 22px;

  img {
    display: block;
    width: 100%;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1.27px solid #e3e8ef;
  background: #ffffff;
  border-radius: 0 0 10px 10px;
`;

const PostBtn = styled.button`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  font-size: 20px;
  font-family: "gordita_medium";
  border-radius: 8px;
  padding: 13px 22px 13px 22px;
  color:${(props) => (props.isDisabled ? "#364152" : "#ffff")} ;
  background: ${(props) => (props.isDisabled ? "#eef2f6" : "#059664")};
  border: 1px solid #cdd5df;
  box-shadow: 0px 1px 2px 0px #1018280d;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;
const DetailsSec = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px 5px 24px;
`;

const ProfileIcon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 2.53px solid rgba(15, 167, 111, 1);
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;

const PromImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfileDiv = styled.div`
  margin: 0 16px;
`;

const UserName = styled.h2`
  color: #364152;
  font-size: 18px;
  text-overflow: ellipsis;
  font-family: "gordita_medium";
  margin: 0 !important;
`;

const UserProgram = styled.h4`
  color: #737376;
  font-size: 14px;
  margin: 0 !important;
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #059664;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;
