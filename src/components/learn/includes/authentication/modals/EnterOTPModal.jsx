import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import { accountsConfig } from "../../../../../axiosConfig";
import OtpCard from "../general/OtpCard";
import { connect, useSelector } from "react-redux";
import OtpIssue from "../general/OtpIssue";
import ReCAPTCHA from "react-google-recaptcha";

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

function EnterOTPModal(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef(null);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isResendLoading, setResendLoading] = useState(false);
  const [isResendSuccess, setResendSuccess] = useState(null);
  const [otp, setOtp] = useState("");

  const { signup_data } = useSelector((state) => state);

  useEffect(() => {
    if (signup_data.otp) {
      setOtp(signup_data.otp);
    }
  }, [Object.keys(signup_data).length]);

  //Entering otp values will read in the setstate, after it occupies 4 value it will call submit function
  const onChange = (e) => {
    const length = e.target.value.toString().length;
    const otp_value = e.target.value;
    if (length <= 4) {
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

  //access_token and refresh_token will be saved in the redux store
  const setUserDetails = (data) => {
    let { user_data } = props;
    user_data = {
      ...data,
    };
    props.updateUserData(user_data);
  };

  const onSubmit = (e, otp_value) => {
    if (e) {
      e.preventDefault();
    }

    //Phone number is taken as user data from redux store
    let { user_data, signup_data } = props;
    const otpNumber = otp_value ? otp_value : otp;
    if (user_data.phone) {
      if (otpNumber) {
        if (!(signup_data.otp === otpNumber)) {
          //After submission of userdata loading will starts.
          setLoading(true);
          //user_data, service and otp is passed to the url
          accountsConfig
            .post("/authentication/signup/verify/phone/", {
              otp: otpNumber,
              service: "learn",
              phone: user_data.phone,
              country: user_data.selectedCountry.web_code,
            })
            .then((response) => {
              //From response.data the message and statuscode  will be taken.
              const { StatusCode, message } = response.data;
              if (StatusCode === 6000) {
                //stopped the loading function
                setLoading(false);
                //When status code reads true it will redirect to the next page.
                navigate(`${location.pathname}?action=name${props.nextPath ? `&next=${props.nextPath}` : ""}`);
                //setUserDetails will be called from response.data
                setUserDetails(response.data);
                props.updateUserData(user_data);
                props.updateSignupData({
                  ...signup_data,
                  otp: otpNumber,
                  name: null,
                  password: null,
                });
              } else if (StatusCode === 6001) {
                //When status is invalid error message will be saved in setState.
                setError(true);
                setErrorMessage(message);
                setLoading(false);
              }
            })
            .catch((error) => {
              //Saved error message will be shown.
              setError(true);
              setErrorMessage("An error occurred, please try again later");
              setLoading(false);
            });
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
    //Phone number is taken as user data from redux store
    let { user_data } = props;
    //After submission of userdata loading will starts.
    setResendLoading(true);

    //user_data, service and country is passed through the url
    const token = await recaptchaRef.current.executeAsync();
    accountsConfig
      .post("/authentication/signup/resend/otp/", {
        country: user_data.selectedCountry.web_code,
        service: "learn",
        phone: user_data.phone,
        "g-recaptcha-response": token,
      })

      .then((response) => {
        //From response.data the message and statuscode  will be taken.
        const { StatusCode, message } = response.data;
        if (StatusCode === 6000) {
          //stopped the loading function
          setResendLoading(false);
          setResendSuccess(true);
          props.updateUserData(user_data);
        } else if (StatusCode === 6001) {
          //When status is invalid error message will be saved in setState.
          setResendLoading(false);
          setResendSuccess(false);
        }
      })
      .catch((error) => {
        //Saved error message will be shown.
        setResendLoading(false);
        setResendSuccess(false);
      });
  };

  return (
    <Container className="container">
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={props.closeModal}
        ></CloseIcon>
        <ItemContainer bg="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg">
          <Content>
            <Title className="b-medium">
              A One Time Password has been sent!
            </Title>
            <Description className="b-medium">
              Please enter the four-digit number which has been sent to the
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
              //This ref can be used to call captcha related functions in case you need.
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
          {/* <TermsService /> */}
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(EnterOTPModal);

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
