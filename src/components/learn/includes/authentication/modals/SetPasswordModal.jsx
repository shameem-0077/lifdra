import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import { serverConfig } from "../../../../../axiosConfig";
import { useAuthStore } from "../../../../../store/authStore";

function SetPasswordModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_data, updateUserData, signup_data, updateSignupData, updateUserProfile } = useAuthStore();

  const [hide, setHide] = useState(true);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValidation, setPasswordValidation] = useState(null);
  const [password_rules, setPasswordRules] = useState([
    {
      key: "character",
      status: false,
      text: "Should contain at least 8 characters",
    },
    {
      key: "small_letter",
      status: false,
      text: "Should contain a lowercase (small) letter (a -z)",
    },
    {
      key: "capital_letter",
      status: false,
      text: "Should contain a uppercase (capital) letter (A - Z)",
    },
    {
      key: "number",
      status: false,
      text: "Should contain at least one number (0-9)",
    },
    {
      key: "symbol",
      status: false,
      text: "Should contain at least one symbol ($,@,#,%,!,*,?,&)",
    },
  ]);

  const validatePassword = (string) => {
    let rules_array = password_rules;
    let isSmallLetterOkay = /[a-z]/.test(string);
    let isCapitalLetterOkay = /[A-Z]/.test(string);
    let isNumberOkay = /\d/.test(string);
    let isSymbolOkay = /[$@#%!*?&]/.test(string);
    let isCharacterOkay = string.length >= 8;
    let isPasswordValidation =
      string.length > 0
        ? isSmallLetterOkay &&
          isCapitalLetterOkay &&
          isNumberOkay &&
          isSymbolOkay &&
          isCharacterOkay
          ? false
          : true
        : null;
    setPasswordValidation(isPasswordValidation);
    rules_array.find((item) => item.key === "character").status =
      isCharacterOkay;
    rules_array.find((item) => item.key === "small_letter").status =
      isSmallLetterOkay;
    rules_array.find((item) => item.key === "capital_letter").status =
      isCapitalLetterOkay;
    rules_array.find((item) => item.key === "number").status = isNumberOkay;
    rules_array.find((item) => item.key === "symbol").status = isSymbolOkay;
  };

  useEffect(() => {
    setPassword(signup_data?.password || '');
    if (signup_data?.password) {
      validatePassword(signup_data.password);
    }
  }, [signup_data]);

  const onChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    setError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const setUserDetails = async (user_data) => {
    let promise = new Promise((res, rej) => {
      updateUserData(user_data);
      setTimeout(() => {
        res("Success");
      }, 1000);
      navigate("/feed/");
    });
    let result = await promise;
    return result;
  };

  const fetchProfile = (user_data, access_token) => {
    serverConfig
      .get("/api/v1/users/profile/", {
        params: {
          response_type: "minimal",
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          updateUserData({
            access_token: access_token,
            ...user_data,
          });
          updateUserProfile(data);
          navigate("/feed/");
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  };

  const onSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (password) {
      if (!(signup_data?.password === password)) {
        setLoading(true);

        try {
          const response = await serverConfig.post(
            "/api/v1/users/signup/set/password/",
            {
              password: password,
              service: "learn",
              phone: user_data?.phone,
              country: user_data?.selectedCountry?.web_code || "IN",
            }
          );

          const {
            status_code,
            message,
            is_premium_user,
            has_active_subscription,
            learn_student_token,
          } = response.data;

          if (status_code === 6000) {
            setLoading(false);
            let new_user_data = {
              ...user_data,
              is_premium_user,
              has_active_subscription,
              is_verified: true,
              signup_type: "other",
              access_token: response?.data?.learn_student_token?.access_token,
              ...learn_student_token,
            };
            
            await setUserDetails(new_user_data);
            updateSignupData({
              ...signup_data,
              password: password,
            });
            fetchProfile(new_user_data, learn_student_token.access_token);
          } else {
            setLoading(false);
            setError(true);
            setErrorMessage(message);
          }
        } catch (error) {
          console.error('API error:', error);
          setLoading(false);
          setError(true);
          setErrorMessage("An error occurred, please try again later");
        }
      } else {
        navigate(`${location.pathname}?action=set-password`);
      }
    } else {
      setError(true);
      setErrorMessage("This field cannot be left blank");
    }
  };

  const handlePasswordShow = () => {
    setHide(!hide);
  };

  const default_icon =
    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-round.svg";
  const check_icon =
    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg";

  const renderRules = password_rules.map((item, index) => (
    <RuleItem key={index}>
      <RuleImage src={item.status ? check_icon : default_icon} />
      <RuleText
        className="b-medium"
        style={{ color: item.status && "#46cb7a" }}
      >
        {item.text}
      </RuleText>
    </RuleItem>
  ));

  return (
    <Container className="container">
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={() => navigate(-1)}
        ></CloseIcon>
        <ItemContainer>
          <>
            <Content>
              <Shape
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
                alt=""
              />
              <Title className="g-medium">
                A strong password will secure your account
              </Title>
              <Description className="g-medium">
                Follow the simple steps to create a strong password for your
                account.
              </Description>
              <MiddleContainer>
                <InputContainer
                  style={{
                    marginBottom: 0,
                    borderColor: isPasswordValidation
                      ? "#f46565"
                      : error
                      ? "#f46565"
                      : isPasswordValidation === false
                      ? "#5cc66a"
                      : "#2f3337",
                  }}
                >
                  <Icon
                    src={
                      hide
                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
                    }
                    alt=""
                  />
                  <InputField
                    autoFocus
                    className="g-medium"
                    style={{ paddingRight: 15 }}
                    type={hide ? "password" : "text"}
                    placeholder="Enter a password"
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    value={password}
                  />
                  <Icon
                    onClick={handlePasswordShow}
                    style={{ cursor: "pointer" }}
                    src={
                      hide
                        ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
                        : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
                    }
                    alt=""
                  />
                  {error && (
                    <ErrorText className="g-medium">{error_message}</ErrorText>
                  )}
                </InputContainer>
                <PasswordRules>{renderRules}</PasswordRules>
                <BottomButton
                  onClick={onSubmit}
                  className="g-medium white"
                >
                  {isLoading ? <RequestLoader /> : "Confirm"}
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
              </MiddleContainer>
            </Content>
          </>
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default SetPasswordModal;

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
  @media (max-width: 640px) {
    margin: 10px 0px 30px;
  }
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
  width: -webkit-fill-available;
  width: -moz-available;
  @media (max-width: 480px) {
    padding: 8px 13px;
    border-color: #5f6367;
    font-size: 15px;
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
  font-size: 15px;
  padding-left: 15px;
  caret-color: #5cc66a;
  @media (max-width: 480px) {
    width: 106.666666667%;
    padding-left: 10.66667px;
    font-size: 14px;
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
  font-size: 15px;
  margin-left: 7px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const MiddleContainer = styled.div``;
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
  font-size: 14px;
  min-height: 50px;
  @media (max-width: 640px) {
    margin-top: 20px;
  }
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
const PasswordRules = styled.div`
  margin: 32px 0 30px;
`;
const RuleItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const RuleImage = styled.img`
  display: block;
  width: 15px;
  margin-right: 8px;
`;
const RuleText = styled.span`
  font-size: 14px;
  display: block;
  transform: translateY(2px);
  color: #868686;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
