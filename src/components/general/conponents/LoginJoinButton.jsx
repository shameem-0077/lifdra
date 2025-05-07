import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";

function LoginJoinButton() {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useUserStore();

  const handleClick = () => {
    if (loginData?.accessToken) {
      navigate("/feed/");
    } else {
      navigate("/?action=login");
    }
  };

  return (
    <Button onClick={handleClick}>
      {loginData?.accessToken ? "Go to Feed" : "Login / Join"}
    </Button>
  );
}

export default LoginJoinButton;

const Button = styled.button`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-family: gordita_medium;
  font-size: 15px;
  height: 44px;
  padding: 0 20px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 38px;
    padding: 0 15px;
  }
`;
