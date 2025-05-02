import React, { useState, useRef } from "react";
import styled from "styled-components";
import TermsService from "../general/TermsService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RequestLoader from "../general/RequestLoader";
import { connect } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import OtpCard from "../general/OtpCard";
import auth from "../../../../routing/auth";
import OtpIssue from "../general/OtpIssue";
import ReCAPTCHA from "react-google-recaptcha";
import { Timestamp, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth as firebaseAuth } from "../../../../../firebase";
import { signInWithCustomToken } from "firebase/auth";

function mapDispatchtoProps(dispatch) {
  return {
    updateUserData: (user_data) =>
      dispatch({
        type: "UPDATE_USER_DATA",
        user_data: user_data,
      }),
    updateUserProfile: (user_profile) =>
      dispatch({
        type: "UPDATE_USER_PROFILE",
        user_profile: user_profile,
      }),
  };
}

function mapStatetoProps(state) {
  return {
    user_data: state.user_data,
  };
}

function LoginWithOTPModal(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef(null);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isResendLoading, setResendLoading] = useState(false);
  const [isResendSuccess, setResendSuccess] = useState(null);
  const [otp, setOtp] = useState("");

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
  const setUserDetails = async (data) => {
    let promise = new Promise((res, rej) => {
      let user_data = {
        access_token: data.learn_student_token.access_token,
        refresh_token: data.learn_student_token.refresh_token,
        is_verified: true,
        name: data.name,
        is_premium_user: data.is_premium_user,
        has_active_subscription: data.has_active_subscription,
      };
      props.updateUserData(user_data);
      firebaseAuthenticate(
        user_data,
        data.name,
        data.learn_student_token.access_token
      );

      fetchProfile(data.learn_student_token.access_token);
      setTimeout(() => {
        res("Success");
      }, 1000);
    });
    let result = await promise;
    return result;
  };

  const fetchProfile = (access_token) => {
    accountsConfig
      .get("/api/v1/users/profile/", {
        params: {
          response_type: "minimal",
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          props.updateUserProfile(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  const firebaseAuthenticate = (user_data, name, access_token) => {
    accountsConfig
      .get("/api/v1/users/firebase/auth/login/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        const token = data.token;
        signInWithCustomToken(firebaseAuth, token)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const roomId = user?.uid + user?.uid.split("").reverse().join("");

            const data = {
              ...user_data,
              uid: user.uid,
              roomId: roomId,
            };

            props.updateUserData(data);

            async function getUser() {
              const currentToken = localStorage.getItem("currentToken");
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                updateDoc(doc(db, "users", user.uid), {
                  isOnline: true,
                });
              } else {
                setDoc(doc(db, "users", user.uid), {
                  name,
                  username: "",
                  uid: user.uid,
                  createdAt: Timestamp.fromDate(new Date()),
                  lastMessageTime: Timestamp.fromDate(new Date()),
                  isOnline: true,
                  isTyping: false,
                  isStudent: true,
                  isNew: true,
                  activeDeviceToken: currentToken,
                });
              }
            }

            getUser();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
      });
  };

  const onSubmit = (e, otp_value) => {
    if (e) {
      e.preventDefault();
    }
    //Phone number is taken as user data from redux store
    let { user_data } = props;
    const otpNumber = otp_value ? otp_value : otp;
    if (user_data.phone) {
      if (otpNumber) {
        //After submission of userdata loading will starts.
        setLoading(true);

        //user_data, service and otp is passed to the url
        accountsConfig
          .post("/authentication/login/verify/otp/", {
            otp: otpNumber,
            service: "learn",
            country: user_data.selectedCountry.web_code,
            phone: user_data.phone,
          })

          .then((response) => {
            //From response.data the message and statuscode  will be taken.
            const { StatusCode, message, signup_type } = response.data;
            if (StatusCode === 6000) {
              //stopped the loading function
              setUserDetails(response.data).then((resp) => {
                auth.login(() => {
                  return "Success";
                });
                setLoading(false);
                if (props.nextPath) {
                  navigate(props.nextPath);
                } else {
                  navigate("/feed/");
                }
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
    const token = await recaptchaRef.current.executeAsync();

    //user_data, service and country is passed through the url
    accountsConfig
      .post("/authentication/login/resend/otp/", {
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
        <ItemContainer>
          <Content>
            <Title className="g-medium">
              A One Time Password has been sent!
            </Title>
            <Description className="g-medium">
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
              // to="/tech-schooling/"
              to="/feed/"
            >
              {isLoading ? <RequestLoader /> : "Login"}
            </BottomButton>
          </Content>

          <TermsService />
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginWithOTPModal);

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
const Desclimer = styled.span`
  color: #4d4e4e;
  display: block;
  font-size: 13px;
  margin-top: 35px;
  span.action {
    color: #5cc66a;
    cursor: pointer;
  }
`;
const BottomButton = styled(Link)`
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  min-height: 58px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px 0 108px;
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
const Shape = styled.img`
  max-height: 29px;
  max-width: 29px;
  @media (max-width: 640px) {
    display: none;
  }
`;
