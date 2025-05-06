import React, { useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import ButtonLoader from "../../../../general/loaders/ButtonLoader";
import RequestLoader from "../../../../authentications/components/RequestLoader";
import { useAuthStore } from "../../../../../store/authStore";

function CommentDelModal({
  isCmtDel,
  setCmDel,
  item,
  isSelectedId,
  deletionUpdate,
  setOptions,
  toast,
}) {
  const { user_data } = useAuthStore();
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setCmDel(!isCmtDel);
    setOptions(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await serverConfig.post(
        `api/v1/posts/delete-comment/${isSelectedId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status_code, message } = response.data;
      if (status_code === 6000) {
        setCmDel(false);
        deletionUpdate();
        setOptions(false);
        setLoading(false);
        toast.success(message?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setLoading(false);
        toast.warn(message?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setLoading(false);
      toast.warning("Deleting comment unsuccessful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <Backdrop isVisible={isCmtDel} />
      <Container isVisible={isCmtDel}>
        <InnerContainer>
          <ContentSection>
            <TopSection>
              <LeftTop>
                <Heading>Delete comment</Heading>
              </LeftTop>
              <RightTop>
                <CloseButton onClick={() => setCmDel(false)}>
                  <img
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                    }
                    alt="close"
                  />
                </CloseButton>
              </RightTop>
            </TopSection>
            <Desc>
              Are you sure you want to permanently remove this comment from your
              profile
            </Desc>
            <BottomSection>
              <ListItem>
                <Items>
                  <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                </Items>
                <Items>
                  <DeleteBtn onClick={handleSubmit}>
                    {isLoading ? <RequestLoader height={24} /> : "Delete"}
                  </DeleteBtn>
                </Items>
              </ListItem>
            </BottomSection>
          </ContentSection>
        </InnerContainer>
      </Container>
    </>
  );
}

export default CommentDelModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 2000;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 2001;
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
const InnerContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  transition: 0.5s;
  z-index: 101;

  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    width: 700px;
  }
  @media (max-width: 768px) {
    width: 560px;
  }
  @media (max-width: 640px) {
    width: 440px;
  }
  @media (max-width: 480px) {
    width: 350px;
  }
  @media (max-width: 360px) {
    width: 305px;
  }
`;
const ContentSection = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  padding: 24px;
`;

const ImgContainer = styled.div`
  img {
    width: 100%;
    aspect-ratio: auto;
    display: block;
  }
`;
const CloseButton = styled.div`
  height: 18px;
  width: 18px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 15px;
    height: 15px;
  }
  @media all and (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
  @media all and (max-width: 360px) {
    width: 10px;
    height: 10px;
  }
`;
const TopSection = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
`;
const LeftTop = styled.div``;
const RightTop = styled.div``;
const Heading = styled.h2`
  font-size: 18px;
`;
const Desc = styled.p`
  font-size: 14px;
  color: #475467;
`;
const BottomSection = styled.div`
  margin-top: 32px;
`;
const ListItem = styled.ul`
  display: flex;
  justify-content: end;
`;
const Items = styled.li`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;
const CancelBtn = styled.button`
  padding: 10px 18px 10px 18px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #9aa4b2;
  color: #364152;
  font-size: 16px;
  font-family: "gordita_medium";
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  padding: 10px 18px 10px 18px;
  border-radius: 6px;
  min-width: 100px;
  background: #d92d20;
  border: 1px solid #d92d20;
  color: #ffffff;
  font-size: 16px;
  font-family: "gordita_medium";
  cursor: pointer;
`;
