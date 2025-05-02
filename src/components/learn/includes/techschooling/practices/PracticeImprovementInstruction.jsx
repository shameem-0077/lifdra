import React from "react";
import styled from "styled-components";

const PracticeImprovementInstruction = ({
  onClick,
  improvement,
  handleUpload,
}) => {
  return (
    <Container>
      <ButtonContainer>
        <Title>Practice instruction</Title>
        {improvement.status === "applied" && (
          <UploadButton onClick={handleUpload}>Upload</UploadButton>
        )}
      </ButtonContainer>
      <VideoCard onClick={onClick} bg_image={improvement.image}>
        <PlayIcon>
          <Icon className="las la-play-circle"></Icon>
        </PlayIcon>
        <VideoTitle>{improvement.title}</VideoTitle>
      </VideoCard>
      <Description>{improvement.description}</Description>
    </Container>
  );
};

export default PracticeImprovementInstruction;
const Container = styled.div``;
const Title = styled.h2`
  font-size: 22px;
  font-family: gordita_regular;
  @media all and (max-width: 360px) {
    font-size: 18px;
  }
`;
const VideoCard = styled.div`
  background-image: url(${(props) => props.bg_image});
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
  padding: 180px 20px 20px;
  border-radius: 20px;
  overflow: hidden;
  padding-bottom: 20px;
  margin-bottom: 20px;
  background-position: center center;
  cursor: pointer;
`;
const PlayIcon = styled.span`
  display: block;
`;
const Icon = styled.i`
  color: #fff;
  font-size: 30px;
`;
const VideoTitle = styled.h5`
  color: #fff;
  font-size: 20px;
  font-family: gordita_medium;
`;
const Description = styled.p`
  font-family: gordita_regular;
`;
const ButtonContainer = styled.div`
  -webkit-box-pack: end;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;
`;
const UploadButton = styled.span`
  background-color: #157ee7;
  color: rgb(255, 255, 255);
  padding: 12px 30px;
  border-radius: 26px;
  display: flex;
  font-size: 16px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-right: 10px;
  font-family: gordita_regular;
  @media all and (max-width: 1440px) {
    align-items: center;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
    padding: 6px 15px;
  }
`;
