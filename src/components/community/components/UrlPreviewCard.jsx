import React from "react";
import styled from "styled-components";

const UrlPreviewCard = ({ metadata }) => {
  if (!metadata) return null;

  return (
    <Card>
      {metadata.og_image && (
        <ImgDiv>
          <Image src={metadata.og_image} alt={metadata.title} />
        </ImgDiv>
      )}
      <Content>
        <Title>{metadata.title}</Title>
        <Url>{metadata.website_url}</Url>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const Url = styled.a`
  font-size: 14px;
  color: rgba(15, 167, 111, 1);
  text-decoration: none;
`;

const ImgDiv = styled.div`
  max-width: 120px;
  object-fit: contain;
`;

export default UrlPreviewCard;
