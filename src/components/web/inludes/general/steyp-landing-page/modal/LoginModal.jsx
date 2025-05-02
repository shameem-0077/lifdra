import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import { accountsConfig } from "../../../../../axiosConfig";
import { setCredentials } from "../../../../../store/slices/authSlice";

const LoginModal = ({ isModal, setModal }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModal) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [isModal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    accountsConfig
      .post("/authentication/login/", formData)
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          dispatch(setCredentials(data));
          setModal(false);
          const searchParams = new URLSearchParams(location.search);
          const next = searchParams.get("next");
          if (next) {
            navigate(next);
          } else {
            navigate("/feed");
          }
        } else {
          setError(true);
          setErrorMessage(data.message || "Login failed");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.response?.data?.message || "Login failed");
        setLoading(false);
      });
  };

  return (
    <BackContainer>
      <Overlay onClick={() => setModal(false)}></Overlay>
      <Modal>
        <Close onClick={() => setModal(false)}>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/close.svg"
            alt=""
          />
        </Close>
        <Cover>
          <Heading>Login</Heading>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <ReCAPTCHA
              sitekey="your-recaptcha-site-key"
              onChange={(value) => setRecaptchaValue(value)}
            />
            <Button type="submit" disabled={isLoading || !recaptchaValue}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>
          <SignUp>
            Don't have an account?{" "}
            <Link to={`${location.pathname}?action=register`}>Sign up</Link>
          </SignUp>
        </Cover>
      </Modal>
    </BackContainer>
  );
};

export default LoginModal;

const BackContainer = styled.div`
  position: fixed;
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
`;

const Modal = styled.div`
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9px;
  position: absolute;
  width: 400px;
  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Close = styled.span`
  display: block;
  width: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const Cover = styled.div`
  padding: 40px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-family: gordita_medium;
  color: #000;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #15bf81;
  }
`;

const Button = styled.button`
  background: #15bf81;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-family: gordita_medium;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SignUp = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  a {
    color: #15bf81;
    text-decoration: none;
    font-family: gordita_medium;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  text-align: center;
`; 