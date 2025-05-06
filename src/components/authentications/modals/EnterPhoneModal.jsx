import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import queryString from "query-string";
import TermsService from "../components/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../components/RequestLoader";
import FlagDropDown from "../components/FlagDropDown";
import CountrySelector from "../components/CountrySelector";
import { serverConfig } from "../../../axiosConfig";
import { useAuthStore } from "../../../store/authStore";
import ReCAPTCHA from "react-google-recaptcha";

const EnterPhoneModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef(null);
  const { user_data, updateUserData, signup_data, updateSignupData, nextPath, updateNextPath } = useAuthStore();

  // Default country data
  const defaultCountryData = {
    web_code: "IN",
    phone_code: "+91",
    phone_number_length: 10,
    name: "India"
  };

  //storing selcted country to state
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryData);
  const [countryselector, setCountryselector] = useState(false);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [selecteddistrict, setSelectedDistrict] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => {
    setCountryselector((prevValue) => !prevValue);
  };

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (signup_data) {
      setPhone(signup_data.phone);
    }
    let { search } = location;
    const values = queryString.parse(search);
    const phone = values.phone;
    setPhone(phone);
    setSelectedDistrict(values.token);
  }, [signup_data, location]);

  //Validating the function of entering the phone number
  const onChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
      setError(false);
    }
  };

  //Preventing "Enter" key function while entering any keys
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(null, phone);
    } else if (e.keyCode === 69) {
      e.preventDefault();
    }
  };

  const onSubmit = async (e) => {
    e && e.preventDefault();

    if (phone) {
      if (!(signup_data?.phone === phone)) {
        setLoading(true);
        let token;
        try {
          const response = await serverConfig.post("/api/v1/users/signup/enter/phone/", {
            country: selectedCountry.web_code,
            service: "learn",
            phone: phone,
            "g-recaptcha-response": token,
          });

          const { status_code, message } = response.data;
          if (status_code === 6000) {
            setLoading(false);
            navigate(`${location.pathname}?action=verify-otp${nextPath ? `&next=${nextPath}` : ""}`);
            let user_data = {
              phone,
              selectedCountry,
            };
            updateUserData(user_data);
            updateSignupData({
              ...signup_data,
              phone: phone,
              country: selectedCountry.web_code,
              otp: null,
              name: null,
              password: null,
              selecteddistrict: selecteddistrict,
            });
          } else if (status_code === 6001) {
            setError(true);
            setErrorMessage(message);
            setLoading(false);
          }
        } catch (error) {
          setError(true);
          setErrorMessage("An error occurred, please try again later");
          setLoading(false);
        }
      } else {
        navigate(`${location.pathname}?action=verify-otp`);
      }
    } else {
      setError(true);
      setErrorMessage("This field cannot be left blank");
    }
  };

  const onSelectHandler = (selected) => {
    setSelectedCountry(selected);
    updateUserData({ selectedCountry: selected });
  };

  return (
    <Container className="container">
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={handleClose}
        ></CloseIcon>

        <ItemContainer bg="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg">
          <CountrySelector
            show={countryselector}
            handleClick={handleShow}
            onSelectHandler={onSelectHandler}
            selectedCountry={selectedCountry}
          />
          <Content>
            <>
              <Shape src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg" />
              <Title className="g-medium">
                Steyp is a Community-First Digital University Platform
              </Title>
              <Description className="g-medium">
                Community-First Digital University platform for students,
                engineers, and scientists to explore, learn, and collaborate.
              </Description>
            </>
            <MiddleContainer>
              <FlagDropDown
                handleClick={handleShow}
                selectedCountry={selectedCountry}
              />
              <InputContainer
                className="g-medium"
                style={{
                  borderColor: error ? "#f32e2f" : "#2f3337",
                }}
              >
                <Icon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/phone.svg" />
                {selectedCountry && selectedCountry.phone_code}
                <InputField
                  maxLength={selectedCountry.phone_number_length}
                  autoFocus
                  className="g-medium"
                  placeholder="Enter your phone number"
                  onKeyDown={handleKeyDown}
                  onChange={onChange}
                  value={phone}
                />
                {error && (
                  <ErrorText className="g-medium">
                    {error_message}
                  </ErrorText>
                )}
              </InputContainer>
            </MiddleContainer>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc"
              size="invisible"
              badge="bottomleft"
            />
            <BottomButton
              className="g-medium white"
              onClick={(e) => onSubmit(e, phone)}
              to={`${location.pathname}?action=verify-otp`}
            >
              {isLoading ? (
                <RequestLoader />
              ) : (
                <>
                  {location.pathname.includes("/tech-schooling/")
                    ? "Continue "
                    : "Join Now!"}
                </>
              )}
            </BottomButton>
            <BottomRow className="g-medium">
              Already have an account?
              <RowItem
                to={`${location.pathname}?action=login`}
                className="g-medium"
              >
                Login
              </RowItem>
            </BottomRow>
          </Content>
          <TermsService />
        </ItemContainer>
      </JoinNow>
    </Container>
  );
};

export default EnterPhoneModal;

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
  background-image: url(${(props) => props.bg});
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
  justify-content: space-between;
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
  width: 100%;
  color: #000;
  font-size: 16 !important;
  padding-left: 15px;
  caret-color: #5cc66a;
  font-family: "gordita_regular";

  @media (max-width: 480px) {
    width: 106.666666667%;
    padding-left: 10.66667px;

    transform: scale(0.9375);
    transform-origin: left top;
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
  @media (max-width: 480px) {
    font-size: 12px;
    bottom: -26px;
  }
`;
const BottomButton = styled(Link)`
  cursor: pointer;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  display: block;
  border-radius: 6px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  min-height: 50px;
  font-size: 15px;
  @media (max-width: 640px) {
    height: 50px;
  }
  @media (max-width: 480px) {
    height: 44px;
    font-size: 14px;
  }
`;
const Shape = styled.img`
  max-height: 29px;
  max-width: 29px;
  @media (max-width: 640px) {
    display: none;
  }
`;
