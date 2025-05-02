import React from "react";
import styled, { keyframes } from "styled-components";

function PostLoader() {
  return (
    <DotSpinnerWrapper>
      {Array.from({ length: 8 }).map((_, index) => (
        <Dot key={index} />
      ))}
    </DotSpinnerWrapper>
  );
}

export default PostLoader;

const uibSize = "2.0rem";
const uibSpeed = "0.9s";
const uibColor = "#697586";

const pulse0112 = keyframes`
0%, 100% {
  transform: scale(0);
  opacity: 0.5;
}
50% {
  transform: scale(1);
  opacity: 1;
}
`;

const DotSpinnerWrapper = styled.div`
  --uib-size: ${uibSize};
  --uib-speed: ${uibSpeed};
  --uib-color: ${uibColor};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
`;

const Dot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 90%;
  width: 90%;

  &:before {
    content: "";
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: ${pulse0112} calc(var(--uib-speed) * 1.111) ease-in-out infinite;
  }

  &:nth-child(2) {
    transform: rotate(45deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.875);
    }
  }

  &:nth-child(3) {
    transform: rotate(90deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.75);
    }
  }

  &:nth-child(4) {
    transform: rotate(135deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.625);
    }
  }

  &:nth-child(5) {
    transform: rotate(180deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.5);
    }
  }

  &:nth-child(6) {
    transform: rotate(225deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.375);
    }
  }

  &:nth-child(7) {
    transform: rotate(270deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.25);
    }
  }

  &:nth-child(8) {
    transform: rotate(315deg);

    &:before {
      animation-delay: calc(var(--uib-speed) * -0.125);
    }
  }
`;
