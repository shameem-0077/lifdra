import React, { useState } from "react";
import { useAuthStore } from "../../../../../store/authStore";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import ButtonLoader from "../../../../general/loaders/ButtonLoader";
import RequestLoader from "../../authentication/general/RequestLoader";

function DiscardModal({
  isDelete,
  setDelete,
  item,
  isSelectedId,
  onDeleteSuccess,
  setModal,
}) {
  const { user_data } = useAuthStore();
  const { access_token } = user_data;
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setDelete(!isDelete);
  };

  return (
    <>
      <Backdrop isVisible={isDelete} />
      <Container isVisible={isDelete}>
        <InnerContainer>
          <ContentSection>
            <TopSection>
              <LeftTop>
                <Heading>Discard changes</Heading>
              </LeftTop>
              <RightTop>
                <CloseButton onClick={() => setDelete(false)}>
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
              Are you sure you want to discard the changes you have made?
            </Desc>
            <BottomSection>
              <ListItem>
                <Items>
                  <CancelBtn onClick={handleClose}>Continue Writing</CancelBtn>
                </Items>
                <Items>
                  <DeleteBtn
                    onClick={() => {
                      onDeleteSuccess();
                      setDelete(false);
                    }}
                  >
                    {isLoading ? <RequestLoader height={24} /> : "Discard"}
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

export default DiscardModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
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

const InnerContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  transition: 0.5s;
  z-index: 101;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const ContentSection = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  padding: 24px;

  @media (max-width: 480px) {
    padding: 16px;
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
  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;

const TopSection = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftTop = styled.div``;
const RightTop = styled.div``;

const Heading = styled.h2`
  font-size: 18px;
  color: rgba(16, 24, 40, 1);
  font-family: "gordita_medium";

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Desc = styled.p`
  font-size: 14px;
  color: #475467;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const BottomSection = styled.div`
  margin-top: 32px;

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

const ListItem = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Items = styled.li`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ButtonBase = styled.button`
  padding: 11px 18px;
  border-radius: 6px;
  font-size: 16px;
  font-family: "gordita_medium";
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 16px;
  }
`;

const CancelBtn = styled(ButtonBase)`
  background: #ffffff;
  border: 1px solid #9aa4b2;
  color: rgba(52, 64, 84, 1);

  &:hover {
    background: #f5f5f5;
  }
`;

const DeleteBtn = styled(ButtonBase)`
  background: #059664;
  border: 1px solid #059664;
  color: #ffffff;
  min-width: 100px;

  &:hover {
    background: #048257;
  }
`;
