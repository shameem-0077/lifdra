import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { serverConfig } from "../../../../axiosConfig";
import auth from "../../../routing/auth";
import RequestLoader from "../RequestLoader";
import ColorLogo from "../ColorLogo";
import TalropEdtechHelmet from "../../../general/helpers/TalropEdtechHelmet";
import TermsService from "../TermsService";

const LoginEnterPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_data, updateUserData } = useAuthStore();
  const navigationTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  const [formState, setFormState] = useState({
    password: "",
    error: { show: false, message: "" },
    isLoading: false,
    hide: true,
    nextPath: ""
  });

  useEffect(() => {
    const { search } = location;
    const values = queryString.parse(search);
    setFormState(prev => ({ ...prev, nextPath: values.next }));
  }, [location]);

  // Cleanup navigation timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handlePasswordShow = useCallback(() => {
    setFormState(prev => ({ ...prev, hide: !prev.hide }));
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }, []);

  const setUserDetails = useCallback(async (data) => {
    const userData = {
      access_token: data.response.access_token,
      refresh_token: data.response.refresh_token,
      name: data.name,
      is_verified: true,
      is_premium_user: data.is_premium_user,
      has_active_subscription: data.has_active_subscription,
    };
    
    updateUserData(userData);
    return "Success";
  }, [updateUserData]);

  const safeNavigate = useCallback((path) => {
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Set a new timeout for navigation
    navigationTimeoutRef.current = setTimeout(() => {
      navigate(path);
      isNavigatingRef.current = false;
    }, 100);
  }, [navigate]);

  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (isNavigatingRef.current) return;

    const { password } = formState;

    if (!password) {
      setFormState(prev => ({
        ...prev,
        error: { show: true, message: "This field cannot be left blank" }
      }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await serverConfig.post("/api/v1/users/login/verify/", {
        password,
        service: "learn",
        phone: user_data.phone,
        country: user_data.selectedCountry.web_code,
      });

      const { status_code, message } = response.data;

      if (status_code === 6000) {
        await auth.login(() => "Success");
        await setUserDetails(response.data);
        
        setFormState(prev => ({ ...prev, isLoading: false }));
        safeNavigate(formState.nextPath || "/feed/");
      } else if (status_code === 6001) {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          error: { show: true, message }
        }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: { show: true, message: "An error occurred, please try again later" }
      }));
    }
  }, [formState, user_data, safeNavigate, setUserDetails]);

  const handleLoginWithOTP = useCallback(async () => {
    if (isNavigatingRef.current) return;

    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await serverConfig.post("/api/v1/users/login/enter/otp/", {
        country: user_data.selectedCountry.web_code,
        service: "learn",
        phone: user_data.phone,
      });

      const { status_code, message } = response.data;

      if (status_code === 6000) {
        setFormState(prev => ({ ...prev, isLoading: false }));
        safeNavigate(`/auth/login/verify-otp/${formState.nextPath ? `?next=${formState.nextPath}` : ""}`);
      } else if (status_code === 6001) {
        setFormState(prev => ({
          ...prev,
          isLoading: false,
          error: { show: true, message }
        }));
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: { show: true, message: "An error occurred, please try again later" }
      }));
    }
  }, [user_data, safeNavigate, formState.nextPath]);

  const { hide, error, isLoading } = formState;

  return (
    <Container>
      <Logo
        alt="Talrop Logo"
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
      />

      <TalropEdtechHelmet title="Enter password" />
      <ColorLogo />
      <Content>
        <Shape
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
          alt="Decorative shape"
        />
        <Title className="g-medium">Password</Title>
        <Description className="g-medium">
          Enter your password for this account
        </Description>
        <InputContainer
          style={{ marginBottom: 0, borderColor: error.show && "#f46565" }}
        >
          <Icon
            alt={hide ? "Lock icon" : "Unlock icon"}
            src={hide
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
              : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
            }
          />
          <InputField
            className="g-medium"
            autoFocus
            style={{ paddingRight: 15 }}
            type={hide ? "password" : "text"}
            placeholder="Enter a password"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setFormState(prev => ({
                ...prev,
                password: e.target.value,
                error: { show: false, message: "" }
              }));
            }}
            value={formState.password}
            aria-label="Password"
          />
          <Icon
            onClick={handlePasswordShow}
            style={{ cursor: "pointer" }}
            src={hide
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
              : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
            }
            alt={hide ? "Show password" : "Hide password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePasswordShow();
              }
            }}
          />
        </InputContainer>

        <BottomRow style={{ justifyContent: error.show && "space-between" }}>
          {error.show && (
            <ErrorText className="g-medium" role="alert">
              {error.message}
            </ErrorText>
          )}
          <RowItem
            onClick={(e) => {
              e.preventDefault();
              handleLoginWithOTP();
            }}
            to="/auth/login/verify-otp/"
            className="g-medium"
          >
            Login with OTP
          </RowItem>
        </BottomRow>
      </Content>

      <BottomButton
        onClick={handleSubmit}
        className="g-medium white"
        disabled={isLoading || isNavigatingRef.current}
        aria-busy={isLoading}
      >
        {isLoading ? <RequestLoader /> : "Login"}
      </BottomButton>
      <Forgot to="/auth/reset/password/phone/enter/" className="g-medium">
        Forgot password?
      </Forgot>

      <TermsService />
    </Container>
  );
};

export default LoginEnterPassword;

const Container = styled.div`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  width: 40%;
  padding: 169px 53px 0 53px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 1100px) {
    width: 64%;
  }
  @media (max-width: 980px) {
    width: 100%;
    padding: 169px 49px 0;
  }
  @media (max-width: 640px) {
    padding: 169px 46px 0;
  }
  @media (max-width: 480px) {
    padding: 91px 34px 0;
    background-position-y: -37px;
  }
`;
const Logo = styled.img`
  display: none;
  @media (max-width: 640px) {
    display: none;
    width: 60px;
  }
`;
const Title = styled.h4`
  font-size: 25px;
  line-height: 1.4em;
  margin-top: 14px;
  @media (max-width: 640px) {
    font-size: 23px;
  }
  @media (max-width: 480px) {
    margin-top: 25px;
    font-size: 20px;
  }
`;
const Description = styled.p`
  margin: 18px 0 40px;
  width: 94%;
  font-size: 14px;
  @media (max-width: 480px) {
    width: 100%;
    font-size: 13px;
    margin-top: 7px;
  }
`;
const Content = styled.div``;
const InputContainer = styled.div`
  border: 1px solid;
  border-radius: 7px;
  padding: 15px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 17px;
  width: -webkit-fill-available;
  width: -moz-available;
  position: relative;
  @media (max-width: 480px) {
    margin-bottom: 10px;
    padding: 10px 12px;
    border-color: #5f6367;
  }
  /* &:focus-within {
        border-color: #5cc66a;
    } */
`;
const Icon = styled.img`
  max-width: 20px;
  max-height: 20px;
  display: block;
  @media (max-width: 480px) {
    max-width: 17px;
    max-height: 17px;
  }
`;
const InputField = styled.input`
  width: 100%;
  color: #000;
  font-size: 15px;
  padding-left: 15px;
  caret-color: #5cc66a;
  @media (max-width: 480px) {
    width: 106.666666667%;
    padding-left: 16px;
    font-size: 14px;
    transform: scale(0.9375);
    transform-origin: left top;
  }
`;
const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 9px;
  font-size: 15px;
`;
const RowItem = styled(Link)`
  font-size: 13px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const ErrorText = styled.span`
  font-size: 12px;
  color: #f46565;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const BottomButton = styled(Link)`
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  font-size: 14px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  min-height: 50px;
  @media (max-width: 480px) {
    height: 44px;
    font-size: 13px;
  }
`;
const Shape = styled.img`
  max-height: 29px;
  max-width: 29px;
  @media (max-width: 640px) {
    display: none;
  }
`;
const Forgot = styled(Link)`
  margin: 14px 0 70px;
  font-size: 14px;
  text-align: center;
  color: #5cc66a;
  @media (max-width: 640px) {
    margin: 20px 0 70px;
  }
  @media (max-width: 480px) {
    margin: 20px 0 40px;
    font-size: 13px;
  }
`;
