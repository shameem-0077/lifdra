import React from "react";
import styled, { css } from "styled-components";
import RequestLoader from "../authentication/general/RequestLoader";
import { verifedTick } from "../../../../assets/icons/styep 3.0/icons";

const MeetButton = ({
  condition,
  onClick,
  isButtonLoader,
  setButtonLoader,
  isRegistered,
}) => {
  console.log(condition);

  let variant;
  let buttonText;

  if (condition === "upcoming") {
    variant = "register";
    buttonText = "Register now";
  } else if (condition === "cancelled") {
    variant = "cancel";
    buttonText = "Meet Cancelled";
  } else if (condition === "started") {
    variant = "join";
    buttonText = "Join now";
  } else if (condition === "closed") {
    variant = "cancel";
    buttonText = "Registration closed";
  } else if (condition === "registrated") {
    variant = "registrated";
    buttonText = "Registration successful!";
  }

  return (
    <>
      <Button variant={variant} onClick={onClick}>
        {!isButtonLoader ? (
          <>
            <img
              style={condition === "registrated" ? {} : { display: "none" }}
              src={verifedTick}
              alt=""
            />
            <span>{buttonText}</span>
          </>
        ) : (
          <RequestLoader height={22} width={22} />
        )}
      </Button>
    </>
  );
};

export default MeetButton;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  font-family: "gordita_medium" !important;
  font-size: ${pxToRem(14)};

  /* font-weight: 600; */
  /* letter-spacing: 1px; */

  ${(props) => {
    if (props.variant === "register" || props.variant === "join") {
      return css`
        background-color: #0fa76f;
        color: white;
        border: 1px solid #0fa76f;
        border-radius: 8px;
        font-family: "gordita_regular" !important;
        font-size: ${pxToRem(14)};
        &:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transform: scale(1.02);
        }
      `;
    } else if (props.variant === "cancel") {
      return css`
        display: none;
      `;
    } else if (props.variant === "waiting") {
      return css`
        background-color: white;
        color: #0fa76f;
        border: 1px solid #6ee7b3;
      `;
    }
    // else if (props.variant === "join") {
    //   return `
    //     background-color: #0FA76F;
    //     color: white;
    //     cursor: pointer;
    //     `;
    //}
    else if (props.variant === "registrated") {
      return css`
        border-radius: 24px;
        border: 1px solid #abefc6;
        background-color: #ecfdf3;
        color: #067647;
        gap: 4px;
        cursor: not-allowed;
        img {
          display: block;
        }
        span {
          font-family: "gordita_medium" !important;
          font-size: ${pxToRem(12)};
        }
      `;
    }
  }}
`;
