import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import LinkIcon from "../../../../assets/images/tech-update/reference.svg";
import LinkIconTwo from "../../../../assets/images/tech-update/refrence-image.svg";

export default function TechUpdatesReferenceItem({ referance }) {
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength) + "...";
  }

  return (
    <ReferenceList
      key={referance.id}
      href={referance.url}
      target="_blank"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={hovered ? "hovered" : ""}
    >
      <IconDiv>
        <IconImg>
          <img src={hovered ? LinkIconTwo : LinkIcon} alt="image" />
        </IconImg>
      </IconDiv>
      <ReferenceNameDiv>
        <ReferenceLinkName>
          {truncateString(referance.title, 35)}
        </ReferenceLinkName>
      </ReferenceNameDiv>
    </ReferenceList>
  );
}

const ReferenceList = styled.a`
  display: flex;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  align-items: center;
  margin-bottom: 14px;

  width: 48%;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  @media all and (max-width: 1380px) {
    margin-bottom: 20px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
  /* @media all and (max-width: 480px) {
        margin-bottom: 20px;
        width: 100%;
        flex-direction: column;
    } */
`;
const IconDiv = styled.div`
  margin: 0px 5px;
  width: 7%;
  @media all and (max-width: 1080px) {
    width: 10%;
  }
  @media all and (max-width: 768px) {
    width: 5%;
  }
  @media all and (max-width: 640px) {
    width: 6%;
  }
  @media all and (max-width: 480px) {
    width: 8%;
  }
  @media all and (max-width: 360px) {
    width: 9%;
  }
`;
const IconImg = styled.div`
  /* width: 90%; */
  img {
    display: block;
    width: 100%;
  }
`;
const ReferenceNameDiv = styled.div`
  border-radius: 6px;
  width: 100%;
  background: #f9fdf6;
  padding: 15px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background: #f2f2f2;
  }
`;
const ReferenceLinkName = styled.h4`
  color: #01080c;
  font-size: 15px;

  @media all and (max-width: 980px) {
    font-size: 12px;
  }
`;
