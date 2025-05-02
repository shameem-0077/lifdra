import React from "react";
import styled from "styled-components";
import ModalLoader from "../ModalLoader";

export default function TokenCard({
  applyToken,
  setToken,
  token,
  isTokenLoading,
  isTokenError,
  setTokenErrorMessage,
  setTokenError,
  tokenErrorMessage,
}) {
  //Input values will be saved
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyToken();
    }
  };

  return (
    <Container>
      <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/gift.svg" />
      <Right>
        <ContentCard>
          <Title></Title>
          <Description></Description>
        </ContentCard>
        <RightRight>
          <BottomContainer>
            <ApplyField
              placeholder="Enter a referral code"
              onChange={(e) => {
                setToken(e.target.value);
                setTokenError(false);
                setTokenErrorMessage("");
              }}
              onKeyDown={handleKeyDown}
              value={token}
            />
            <Button onClick={applyToken}>
              {isTokenLoading ? (
                <ModalLoader />
              ) : (
                <>
                  Apply
                  <Arrow src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/right-arrow.svg" />
                </>
              )}
            </Button>
          </BottomContainer>
          {isTokenError && <Error>{tokenErrorMessage}</Error>}
        </RightRight>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/gift-card-bg.svg");
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7fcff;
  margin-top: 24px;
  padding: 24px 28px;
  border-radius: 10px;
  @media (max-width: 1440px) {
    justify-content: center;
  }
  @media (max-width: 640px) {
    padding: 29px 21px;
  }
`;
const Image = styled.img`
  display: block;
  width: 72px;
  @media (max-width: 1440px) {
    width: 99px;
    margin-right: 65px;
  }
  @media (max-width: 1280px) {
    margin-right: 35px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;
const ContentCard = styled.div`
  margin-left: 20px;
  @media (max-width: 1440px) {
    margin-left: 0;
  }
`;
const Title = styled.span`
  font-family: gordita_medium;
  font-size: 18px;
`;
const Description = styled.p`
  font-family: gordita_regular;
  color: #565656;
  font-size: 12px;
  width: 94%;
`;
const ApplyField = styled.input`
  background: #fff;
  height: 36px;
  display: block;
  border: 1px solid #5cd3a7;
  border-radius: 5px;
  margin-right: 12px;
  min-width: 380px;
  padding: 0 20px;
  text-align: center;
  font-family: gordita_medium;
  letter-spacing: 0.2em;
  font-size: 15px;
  &::placeholder {
    letter-spacing: 0.14em;
  }
  @media (max-width: 1440px) {
    width: 98%;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    min-width: unset;
  }
`;
const Error = styled.p`
  color: red;
  margin-top: 5px;
  font-size: 14px;
  position: absolute;
`;
const Button = styled.div`
  width: fit-content;
  min-width: 138px;
  background: #5dd3a7;
  padding: 0 34px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-family: gordita_medium;
  font-size: 15px;
  margin-left: auto;
  color: #fff;
  cursor: pointer;
  @media (max-width: 1440px) {
    margin-left: 0;
  }
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 10px;
    justify-content: center;
  }
`;
const Arrow = styled.img`
  display: block;
  width: 14px;
  margin-left: 16px;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1440px) {
    display: block;
  }
`;
const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1440px) {
    justify-content: space-between;
    margin-top: 15px;
  }
  @media (max-width: 640px) {
    display: block;
  }
`;
const RightRight = styled.div`
  position: relative;
`;
