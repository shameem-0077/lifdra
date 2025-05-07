import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TermsService from "../components/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../components/RequestLoader";
import { serverConfig } from "../../../axiosConfig";
import OtpCard from "../components/OtpCard";
import OtpIssue from "../components/OtpIssue";
import ReCAPTCHA from "react-google-recaptcha";

const EnterOTPModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef(null);
  const { user_data, updateUserData, signup_data, updateSignupData, nextPath } = useAuthStore();

  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isResendLoading, setResendLoading] = useState(false);
  const [isResendSuccess, setResendSuccess] = useState(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (signup_data?.otp) {
      setOtp(signup_data.otp);
    }
  }, [signup_data]);

  //Entering otp values will read in the setstate, after it occupies 4 value it will call submit function
  const onChange = (e) => {
    const length = e.target.value.toString().length;
    const otp_value = e.target.value;
    if (length <= 6) {
      setError(false);
      setOtp(otp_value);
      if (length === 4) {
        onSubmit(null, otp_value);
      }
    }
  };

  //Preventing "Enter" key function while entering any keys
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    } else if (e.keyCode === 69) {
      e.preventDefault();
    }
  };

  //access_token and refresh_token will be saved in the store
  const setUserDetails = (data) => {
    let user_data = {
      ...data,
    };
    updateUserData(user_data);
  };

  const onSubmit = async (e, otp_value) => {
    if (e) {
      e.preventDefault();
    }

    const otpNumber = otp_value ? otp_value : otp;
    if (user_data?.phone) {
      if (otpNumber) {
        if (!(signup_data?.otp === otpNumber)) {
          setLoading(true);
          try {
            const response = await serverConfig.post("/api/v1/users/signup/verify/phone/", {
              otp: otpNumber,
              service: "learn",
              phone: user_data.phone,
              country: user_data.selectedCountry.web_code,
            });

            const { status_code, message } = response.data;
            if (status_code === 6000) {
              setLoading(false);
              navigate(`${location.pathname}?action=name${nextPath ? `&next=${nextPath}` : ""}`);
              setUserDetails(response.data);
              updateUserData(user_data);
              updateSignupData({
                ...signup_data,
                otp: otpNumber,
                name: null,
                password: null,
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
          navigate(`${location.pathname}?action=name`);
        }
      } else {
        setError(true);
        setErrorMessage("This field cannot be left blank");
      }
    } else {
      setError(true);
      setErrorMessage("Phone is missing, redirecting");
      setTimeout(() => {
        navigate(`${location.pathname}?action=login`);
      }, 1100);
    }
  };

  // function used to resend otp.
  const onResend = async () => {
    setResendLoading(true);
    try {
      const token = await recaptchaRef.current.executeAsync();
      const response = await serverConfig.post("/api/v1/users/signup/resend/otp/", {
        country: user_data.selectedCountry.web_code,
        service: "learn",
        phone: user_data.phone,
        "g-recaptcha-response": token,
      });

      const { status_code } = response.data;
      if (status_code === 6000) {
        setResendLoading(false);
        setResendSuccess(true);
        updateUserData(user_data);
      } else if (status_code === 6001) {
        setResendLoading(false);
        setResendSuccess(false);
      }
    } catch (error) {
      setResendLoading(false);
      setResendSuccess(false);
    }
  };

  return (
    <Container className="container">
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={() => navigate(-1)}
        ></CloseIcon>
        <ItemContainer bg="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg">
          <Content>
            <Title className="b-medium">
              A One Time Password has been sent!
            </Title>
            <Description className="b-medium">
              Please enter the six-digit number which has been sent to the
              registered mobile number.
            </Description>
            <OtpCard
              error={error}
              error_message={error_message}
              handleKeyDown={handleKeyDown}
              onChange={onChange}
              otp={otp}
              onResend={onResend}
              isResendSuccess={isResendSuccess}
              isResendLoading={isResendLoading}
            />
            <OtpIssue />
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld-4_ohAAAAAPmNLvidUquNeF7UYZXz4AiGzWdc"
              size="invisible"
              badge="bottomleft"
            />
            <BottomButton
              onClick={onSubmit}
              className="b-medium white"
              to={`${location.pathname}?action=name`}
            >
              {isLoading ? <RequestLoader /> : "Verify"}
            </BottomButton>
            <BottomRow className="b-medium">
              Already have an account?
              <RowItem
                to={`${location.pathname}?action=login`}
                className="b-medium"
              >
                Login
              </RowItem>
            </BottomRow>
          </Content>
        </ItemContainer>
      </JoinNow>
    </Container>
  );
};

export default EnterOTPModal;

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
  background: url(${(props) => props.bg});
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
  font-size: 27px;
  line-height: 1.4em;
  margin-top: 14px;
  @media (max-width: 640px) {
    font-size: 25px;
    margin-top: 0;
  }
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
const Description = styled.p`
  margin: 18px 0 40px;
  width: 94%;
  @media (max-width: 640px) {
    margin: 10px 0 30px;
  }
  @media (max-width: 480px) {
    font-family: unset;
    width: 100%;
  }
`;
const Desclimer = styled.span`
  color: #4d4e4e;
  display: block;
  font-size: 14px;
  margin-top: 35px;
`;
const BottomButton = styled(Link)`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  display: block;
  border-radius: 6px;
  min-height: 58px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px 0 20px;
  color: #fff;
  min-height: 50px;
  @media (max-width: 640px) {
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    min-height: 44px;
    font-size: 15px;
  }
`;
const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0 70px;
  font-size: 15px;
  @media (max-width: 640px) {
    margin: 20px 0 10px 0;
  }
  @media (max-width: 480px) {
    font-size: 14px;
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
const Shape = styled.img`
  max-height: 29px;
  max-width: 29px;
  @media (max-width: 640px) {
    display: none;
  }
`;
