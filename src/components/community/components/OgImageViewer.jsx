import React from "react";
import styled from "styled-components";

function OgImageViewer({ urlAttachments }) {
  return (
    <OuterContainer
      href={urlAttachments?.website_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container>
        {urlAttachments?.og_image ? (
          <>
            <ImageContainer>
              <img src={urlAttachments?.og_image} alt="OG:IMAGE" />
            </ImageContainer>
          </>
        ) : (
          ""
        )}

        <ImageBottomContainer>
          <Title>{urlAttachments?.title}</Title>
          <Url>{urlAttachments?.website_url}</Url>
          {!urlAttachments?.og_image ? (
            <MetaDesc>{urlAttachments?.meta_description}</MetaDesc>
          ) : (
            ""
          )}
        </ImageBottomContainer>
      </Container>
    </OuterContainer>
  );
}

export default OgImageViewer;

const OuterContainer = styled.a`
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: block;
  background: #f8fafc;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Container = styled.div`
  cursor: pointer;
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 300px;
    object-fit: cover;

    @media (min-width: 768px) {
      max-height: 400px;
    }

    @media (min-width: 1440px) {
      max-height: 500px;
    }

    @media (min-width: 2560px) {
      max-height: 600px;
    }
  }
`;

const ImageBottomContainer = styled.div`
  padding: 12px 8px;

  @media (min-width: 768px) {
    padding: 16px 12px;
  }

  @media (min-width: 1440px) {
    padding: 20px 16px;
  }
`;

const Title = styled.h3`
  margin-bottom: 8px;
  color: #202939;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (min-width: 480px) {
    font-size: 14px;
  }
`;

const Url = styled.span`
  color: #9aa4b2;
  font-size: 14px;
  @media (min-width: 480px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }

  @media (min-width: 2560px) {
    font-size: 20px;
  }
`;
const MetaDesc = styled.p`
  color: #545454;
  font-size: 14px;
  margin-top: 6px;
  @media (min-width: 480px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1440px) {
    font-size: 16px;
  }

  @media (min-width: 2560px) {
    font-size: 18px;
  }
`;
