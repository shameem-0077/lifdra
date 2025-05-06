import React, { useCallback, useState, useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TermsService from "../general/TermsService";
import RequestLoader from "../general/RequestLoader";
import FlagDropDown from "../general/FlagDropDown";
import CountrySelector from "../general/CountrySelector";
import { serverConfig } from "../../../../../axiosConfig";
import SignupLoader from "../../general/loaders/SignupLoader";
import { useAuthStore } from "../../../../../store/authStore";

// Constants
const DEFAULT_COUNTRY = {
  name: "India",
  phone_code: "91",
  number_length: 10,
  web_code: "IN",
  selected: false,
  country_code: "IND",
  flag: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/flags/india.svg",
};

const PHONE_REGEX = /^[0-9\b]+$/;

function LoginModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const updateUserData = useAuthStore((state) => state.updateUserData);

  // State management
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [countryselector, setCountryselector] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [isLoading, setLoading] = useState(false);

  // Memoize country details to prevent unnecessary re-renders
  const countryDetails = useMemo(() => [DEFAULT_COUNTRY], []);

  // Handlers
  const handleClose = useCallback(() => {
    navigate(location.pathname);
  }, [navigate, location.pathname]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    } else if (e.keyCode === 69) {
      e.preventDefault();
    }
  }, []);

  const handlePhoneChange = useCallback((e) => {
    setError({ show: false, message: "" });
    const value = e.target.value;
    if (value === "" || PHONE_REGEX.test(value)) {
      setPhone(value);
    }
  }, []);

  const handleCountrySelect = useCallback((selected) => {
    setSelectedCountry(selected);
    updateUserData({ selectedCountry: selected });
    setCountryselector(false); // Close selector after selection
  }, [updateUserData]);

  const toggleCountrySelector = useCallback(() => {
    setCountryselector(prev => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    if (!phone) {
      setError({ show: true, message: "This field cannot be empty." });
      return;
    }

    setLoading(true);
    try {
      const response = await serverConfig.post("/api/v1/users/login/enter/", {
        country: selectedCountry.web_code,
        service: "learn",
        phone: phone,
      });

      const { status_code, message } = response.data;
      if (status_code === 6000) {
        navigate(`${location.pathname}?action=password`);
        setLoading(false);
        updateUserData({ phone, selectedCountry });
      } else {
        // Handle error message that could be an object
        const errorMessage = typeof message === 'object' ? message.message || message.title : message;
        setError({ show: true, message: errorMessage || "An error occurred" });
        setLoading(false);
        if (errorMessage === "User not found") {
          navigate(`${location.pathname}?action=phone${phone ? `&phone=${phone}` : ""}`);
        }
      }
    } catch (error) {
      // Handle error message that could be an object
      const errorMessage = error.response?.data?.message;
      const formattedMessage = typeof errorMessage === 'object' ? errorMessage.message || errorMessage.title : errorMessage;
      setError({ 
        show: true, 
        message: formattedMessage || "An error occurred, please try again later" 
      });
      setLoading(false);
    }
  }, [phone, selectedCountry, navigate, location.pathname, updateUserData]);

  if (!location.search.includes("action=login")) {
    return null;
  }

  return (
    <Container>
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={handleClose}
        />
        <ItemContainer>
          <CountrySelector
            show={countryselector}
            handleClick={toggleCountrySelector}
            onSelectHandler={handleCountrySelect}
            selectedCountry={selectedCountry}
            country_details={countryDetails}
          />
          <Content>
            <Title className="g-medium">Login to your account</Title>
            <Description className="g-medium">
              Enter your registered phone number
            </Description>
            <MiddleContainer>
              {!selectedCountry ? (
                <LoaderContainer>
                  <SignupLoader />
                </LoaderContainer>
              ) : (
                <>
                  <FlagDropDown
                    handleClick={toggleCountrySelector}
                    selectedCountry={selectedCountry}
                  />
                  <InputContainer
                    className="b-medium"
                    style={{
                      borderColor: error.show ? "#f32e2f" : "#2f3337",
                    }}
                  >
                    <Icon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg"
                      alt=""
                    />
                    {`${selectedCountry.phone_code}`}
                    <InputField
                      autoFocus
                      type="text"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handleKeyDown}
                      maxLength={selectedCountry.number_length}
                    />
                  </InputContainer>
                </>
              )}
            </MiddleContainer>
            {error.show && error.message && (
              <ErrorText className="b-medium">
                {typeof error.message === 'object' ? error.message.message || error.message.title : error.message}
              </ErrorText>
            )}
            <BottomButton
              onClick={handleLogin}
              className="g-medium white"
            >
              {isLoading ? <RequestLoader /> : "Continue"}
            </BottomButton>
            <Forgot
              to={`${location.pathname}?action=signup`}
              className="g-medium"
            >
              Don't have an account? Sign up
            </Forgot>
          </Content>
          <TermsService />
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default LoginModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5000;
`;
const CloseIcon = styled.span`
  font-size: 34px;
  color: #ff9800;
  position: absolute;
  left: -42px;
  top: 11px;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 30px;
    left: -38px;
  }
  @media (max-width: 400px) {
    left: 9px;
    top: 11px;
    z-index: 5000;
  }
`;
const JoinNow = styled.div`
  z-index: 500;
  background: #fff;
  width: 600px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  animation: slide-box 0.4s ease;
  @keyframes slide-box {
    0% {
      right: -600px;
    }
    100% {
      right: 0;
    }
  }
  @media (max-width: 640px) {
    width: 428px;
  }
  @media (max-width: 480px) {
    width: 359px;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const ItemContainer = styled.div`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  @media (max-width: 980px) {
    background-position-y: -106px;
  }
  @media (max-width: 640px) {
    padding: 0 29px;
    background-position-y: -79px;
  }
  @media (max-width: 380px) {
    padding: 0 22px;
    background-position-y: -79px;
  }
`;
const Content = styled.div`
  padding-top: 125px;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 640px) {
    padding-top: 52px;
  }
`;
const Title = styled.h4`
  font-size: 25px;
  line-height: 1.4em;
  margin-top: 14px;
  @media (max-width: 640px) {
    font-size: 23px;
    margin-top: 0;
  }
  @media (max-width: 480px) {
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
  }
`;
const InputContainer = styled.div`
  position: relative;
  border: 1px solid;
  border-radius: 7px;
  padding: 15px 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000;
  font-size: 17px;
  margin-left: 10px;
  width: -webkit-fill-available;
  width: -moz-available;
  @media (max-width: 640px) {
    padding: 8px 13px;
  }
  @media (max-width: 480px) {
    padding: 8px 8px;
    border-color: #5f6367;
    font-size: 15px;
  }
  @media (max-width: 380px) {
    font-size: 14px;
    min-height: 40px;
  }
  &:focus-within {
    border-color: #5cc66a;
  }
`;
const Icon = styled.img`
  max-width: 17px;
  max-height: 17px;
  margin-right: 12px;
  display: block;
  @media (max-width: 480px) {
    display: none;
  }
`;
const InputField = styled.input`
  width: 81%;
  color: #000;
  font-size: 17px;
  padding-left: 5px;
  caret-color: #5cc66a;
  @media (max-width: 640px) {
    width: 70%;
  }
  @media (max-width: 480px) {
    width: 80%;
    font-size: 16px;
  }
  @media (max-width: 380px) {
    font-size: 14px;
  }
`;
const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0 70px;
  font-size: 14px;
  @media (max-width: 640px) {
    margin: 20px 0 10px 0;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const RowItem = styled(Link)`
  color: #5cc66a;
  font-size: 14px;
  margin-left: 7px;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const LoaderContainer = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const MiddleContainer = styled.div`
  display: flex;
  position: relative;
`;
const ErrorText = styled.span`
  font-size: 13px;
  position: absolute;
  left: 0;
  color: #f46565;
  bottom: -27px;
  display: block;
  width: 100%;
  text-align: left;
  @media (max-width: 480px) {
    font-size: 12px;
    bottom: -26px;
  }
`;
const BottomButton = styled.button`
  cursor: pointer;
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  min-height: 50px;
  border: none;
  width: 100%;
  @media (max-width: 640px) {
    height: 50px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
    height: 44px;
  }
`;
const Forgot = styled(Link)`
  color: #5cc66a;
  font-size: 14px;
  margin-top: 14px;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
