import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LoginJoinButton({ onSubscribe }) {
  return (
    <ButtonContainer>
      <LoginButton
        onClick={() => {
          onSubscribe();
        }}
      >
        Login
      </LoginButton>
      <RegisterButton to="/?action=phone">Join Now</RegisterButton>
    </ButtonContainer>
  );
}

export default LoginJoinButton;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: ${pxToRem(20)};
`;

const LoginButton = styled.button`
  cursor: pointer;
  color: #000;
  font-size: ${pxToRem(14)};
  font-family: "gordita_medium";
`;

const RegisterButton = styled(Link)`
  cursor: pointer;
  color: #000;
  font-size: ${pxToRem(14)};
  font-family: "gordita_medium";
  padding: 12px 20px;
  background: #064e38;
  width: max-content;
  border-radius: ${pxToRem(40)};
  color: #fff;
  @media all and (max-width: 768px) {
    padding: 8px 16px;
  }
  @media all and (max-width: 360px) {
    padding: 8px 10px;
  }
`;
