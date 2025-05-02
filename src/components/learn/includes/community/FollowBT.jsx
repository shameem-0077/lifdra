import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function FollowBT({ setFollow, isFollow, autherId, updateFollow, type }) {
  const [isShaking, setIsShaking] = useState(false);
  const user_profile = useSelector((state) => state.user_profile);

  const handleFollowClick = (id) => {
    const newIsFollow = !isFollow;
    setFollow(newIsFollow);
    updateFollow(id);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  if (user_profile.id === autherId) {
    return null;
  }

  return (
    <>
      {type === "tertiary" && (
        <>
          {" "}
          <TertiaryFollowButton
            onClick={() => handleFollowClick(autherId)}
            isActive={isFollow}
            isFollow={isFollow}
            type={type}
          >
            {!isFollow && (
              <>
                <TertiaryFollowIcon
                  className={isShaking ? "grow" : ""}
                  isFollow={isFollow}
                >
                  <img
                    src={
                      isFollow
                        ? ""
                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-09-2024/plus_icon.svg"
                    }
                    alt="Icon"
                  />
                </TertiaryFollowIcon>
              </>
            )}
            <span className={isShaking ? "textShake" : ""}>
              {isFollow ? "Following" : "Follow"}
            </span>
          </TertiaryFollowButton>
        </>
      )}
      {type === "primary" && (
        <>
          <FollowButton
            onClick={() => handleFollowClick(autherId)}
            isActive={isFollow}
            isFollow={isFollow}
          >
            <FollowIcon className={isShaking ? "grow" : ""}>
              <img
                src={
                  isFollow
                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/tick-followicon.svg"
                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-09-2024/plus_icon.svg"
                }
                alt="Icon"
              />
            </FollowIcon>
            <span className={isShaking ? "textShake" : ""}>
              {isFollow ? "Following" : "Follow"}
            </span>
          </FollowButton>
        </>
      )}
    </>
  );
}

export default FollowBT;

const FollowButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${(props) => (props.isActive ? "#ffffff" : "#059664")};
  border-radius: 10px;
  height: 30px;
  font-size: 12px;
  width: ${(props) => (props.isFollow ? "120px" : "100px")};
  transition: transform 0.2s ease-in-out, background 0.3s ease, color 0.3s ease,
    border 0.3s ease, width 0.3s ease;
  width: ${(props) => (props.isFollow ? "120px" : "100px")};
  color: ${(props) => (props.isActive ? "#364152" : "#ffffff")};
  cursor: pointer;
  font-family: "gordita_medium";

  span {
    line-height: unset;
    word-wrap: unset;
    font-size: 14px;
  }

  &.textShake {
    animation: textShake 0.6s ease-in-out;
  }

  @keyframes textShake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-2px);
    }
  }

  ${(props) =>
    props.isActive &&
    `
    border: 1px solid #cdd5df;
    background: #ffffff;
    color: #364152;
  `}

  :hover {
    opacity: 0.9;
  }

  @media all and (min-width: 768px) {
    padding: 8px 12px;
    border-radius: 10px;
    height: 34px;
  }
`;

const FollowIcon = styled.div`
  width: 20px;
  height: 20px;
  transition: transform 0.5s ease;

  &.grow {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    display: block;
  }
`;

const TertiaryFollowButton = styled.button`
  display: flex;
  /* padding: 8px 0px; */
  align-items: center;
  gap: 4px;
  font-size: 12px;
  transition: transform 0.2s ease-in-out, color 0.3s ease, opacity 0.3s ease;
  color: ${(props) => (props.isFollow ? "#364152" : "#047853")};
  cursor: pointer;

  span {
    line-height: unset;
    word-wrap: unset;
    font-size: 14px;
    font-weight: 600;
    font-family: "gordita_regular";
    transition: color 0.3s ease;
  }

  @media all and (max-width: 480px) {
    span {
      /* display: none; */
    }
  }

  :hover {
    transform: scale(1.05); /* Slight scale effect on hover */
  }
`;

const TertiaryFollowIcon = styled.div`
  width: 20px;
  height: 20px;
  transition: transform 0.5s ease;

  img {
    width: 100%;
    display: block;
    filter: ${({ isFollow }) =>
      isFollow
        ? "invert(100%)"
        : "brightness(0) saturate(100%) invert(17%) sepia(90%) saturate(6143%) hue-rotate(164deg) brightness(94%) contrast(97%)"};
    -webkit-filter: ${({ isFollow }) =>
      isFollow
        ? "invert(100%)"
        : "brightness(0) saturate(100%) invert(17%) sepia(90%) saturate(6143%) hue-rotate(164deg) brightness(94%) contrast(97%)"};
    -moz-filter: ${({ isFollow }) =>
      isFollow
        ? "invert(100%)"
        : "brightness(0) saturate(100%) invert(17%) sepia(90%) saturate(6143%) hue-rotate(164deg) brightness(94%) contrast(97%)"};
    -o-filter: ${({ isFollow }) =>
      isFollow
        ? "invert(100%)"
        : "brightness(0) saturate(100%) invert(17%) sepia(90%) saturate(6143%) hue-rotate(164deg) brightness(94%) contrast(97%)"};
    -ms-filter: ${({ isFollow }) =>
      isFollow
        ? "invert(100%)"
        : "brightness(0) saturate(100%) invert(17%) sepia(90%) saturate(6143%) hue-rotate(164deg) brightness(94%) contrast(97%)"};
  }
`;
