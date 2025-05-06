import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import TermsService from "../general/TermsService";
import { connect } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RequestLoader from "../general/RequestLoader";
import ColorLogo from "../general/ColorLogo";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

// Function used to get values from redux react
function mapStatetoProps(state) {
  return {
    user_data: state.user_data,
    signup_data: state.signup_data,
  };
}

// Function used to update values from redux react
function mapDispatchtoProps(dispatch) {
  return {
    updateUserData: (user_data) =>
      dispatch({
        type: "UPDATE_USER_DATA",
        user_data: user_data,
      }),
    updateSignupData: (signup_data) =>
      dispatch({
        type: "UPDATE_SIGNUP_DATA",
        signup_data: signup_data,
      }),
  };
}

const SetPassword = (props) => {
  const history = useHistory();
  const [hide, setHide] = useState(true);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
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
    let { signup_data } = props;
    setPassword(signup_data.password);
    if (signup_data.password) {
      validatePassword(signup_data.password);
    }
  }, []);

  const onChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    setError(false);
  };

  //Input values will be saved
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    let { user_data, signup_data } = props;

    if (password) {
      if (!(signup_data.password === password)) {
        setLoading(true);

        //password, service and authorization is passed to the url
        accountsConfig
          .post("/authentication/signup/set/password/", {
            password: password,
            service: "learn",
            phone: user_data.phone,
            country: user_data.selectedCountry.web_code,
          })
          .then((response) => {
            //From response.data the message and statuscode  will be taken.
            let {
              StatusCode,
              message,
              is_premium_user,
              has_active_subscription,
              learn_student_token,
            } = response.data;
            if (StatusCode === 6000) {
              setLoading(false);
              //When status code reads true it will redirect to the next page.
              history.push("/feed/");
              user_data = {
                ...user_data,
                is_premium_user,
                has_active_subscription,
                ...learn_student_token,
                is_verified: true,
              };
              props.updateUserData(user_data);
              props.updateSignupData({
                ...signup_data,
                password: password,
              });
            } else if (StatusCode === 6001) {
              //When status is invalid error message will be saved in setState.
              setLoading(false);
              setError(true);
              setErrorMessage(message);
            }
          })
          .catch((error) => {
            //Saved error message will be shown.
            setLoading(false);
            setError(true);
            setErrorMessage("An error occurred, please try again later");
          });
      } else {
        history.push("/auth/join/enter/referral-code/");
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
    <Container>
      <TalropEdtechHelmet title="Set password" />
      <Logo
        alt=""
        src={
          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
        }
      />
      <ColorLogo />
      <Content>
        <Shape
          src={
            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
          }
          alt=""
        />
        <Title className="g-medium">
          A strong password will secure your account
        </Title>
        <Description className="g-medium">
          Follow the simple steps to create a strong password for your account.
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
              alt=""
              src={
                hide
                  ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
                  : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/unlock.svg"
              }
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
            />
            {error && (
              <ErrorText className="g-medium">{error_message}</ErrorText>
            )}
          </InputContainer>
          <PasswordRules>{renderRules}</PasswordRules>
        </MiddleContainer>
      </Content>
      <BottomButton
        onClick={onSubmit}
        to="/auth/join/enter/referral-code/"
        className="g-medium white"
      >
        {isLoading ? <RequestLoader /> : "Confirm"}
      </BottomButton>
      <BottomRow className="g-medium">
        Already have an account?
        <RowItem to="/auth/login/" className="g-medium">
          Login
        </RowItem>
      </BottomRow>
      <TermsService />
    </Container>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SetPassword);

const Container = styled.div`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
  background-repeat: no-repeat;
  background-size: contain;
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
  margin: 15px 0 20px;
  width: 94%;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 13px;
    width: 100%;
  }
`;
const Content = styled.div`
  position: relative;
`;
const InputContainer = styled.div`
  position: relative;
  border: 1px solid #2f3337;
  border-radius: 7px;
  padding: 15px 18px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  color: #000;
  font-size: 17px;
  width: -webkit-fill-available;
  width: -moz-available;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    margin-bottom: 10px;
    padding: 10px 12px;
    border-color: #5f6367;
  }
  /* &:focus-within {
        border-color: #5cc66a;
    } */
`;
const InputBottom = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
`;
const Resend = styled.span`
  font-size: 14px;
`;
const Icon = styled.img`
  max-width: 20px;
  max-height: 20px;
  display: block;
  @media (max-width: 480px) {
    max-width: 20px;
    max-height: 20px;
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
  justify-content: center;
  align-items: center;
  margin: 14px 0 70px;
  font-size: 14px;
  @media (max-width: 640px) {
    margin: 20px 0 70px;
  }
  @media (max-width: 480px) {
    margin: 20px 0 40px;
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
const MiddleContainer = styled.div``;
const ErrorText = styled.span`
  position: absolute;
  font-size: 12px;
  left: 0;
  color: #f46565;
  bottom: -26px;
`;
const Desclimer = styled.span`
  color: #4d4e4e;
  display: block;
  font-size: 14px;
  margin-top: 35px;
`;
const BottomButton = styled(Link)`
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  min-height: 50px;
  font-size: 15px;
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
