import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import queryString from "query-string";
import TermsService from "../../../authentications/components/TermsService";
import OtpCard from "../../../../authentications/components/OtpCard";
import { connect, useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import auth from "../../../../routing/auth";
import ColorLogo from "../../../../authentications/components/ColorLogo";

import RequestLoader from "../../../../authentications/components/RequestLoader";
import TalropEdtechHelmet from "../../../../general/helpers/TalropEdtechHelmet";
import OtpIssue from "../../../../authentications/components/OtpIssue";

function mapDispatchToProps(dispatch) {
  return {
    updateUserData: (user_data) =>
      dispatch({
        type: "UPDATE_USER_DATA",
        user_data: user_data,
      }),
  };
}

function mapStateToProps(state) {
  return {
    user_data: state.user_data,
  };
}

const LoginWithOtp = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isResendLoading, setResendLoading] = useState(false);
  const [isResendSuccess, setResendSuccess] = useState(null);
  const [otp, setOtp] = useState("");
  const [nextPath, setNextPath] = useState("");

  useEffect(() => {
    let { search } = props.location;
    const values = queryString.parse(search);
    setNextPath(values.next);
  }, []);

  //Entering otp values will read in the set state, after it occupies 4 value it will call submit function
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
      setTimeout(() => {
        res("Success");
      }, 1000);
    });
    let result = await promise;
    return result;
  };

  const onSubmit = (e, otp_value) => {
    if (e) {
      e.preventDefault();
    }
    //Phone number is taken as user data from redux store
    let { user_data } = props;
    const otpNumber = otp_value ? otp_value : otp;
    if (otpNumber) {
      //After submission of user data loading will starts.
      setLoading(true);

      //user_data, service and otp is passed to the url
      serverConfig
        .post("/authentication/login/verify/otp/", {
          otp: otpNumber,
          service: "learn",
          phone: user_data.phone,
          country: user_data.selectedCountry.web_code,
        })

        .then((response) => {
          //From response.data the message and status code  will be taken.
          const { status_code, message } = response.data;
          if (status_code === 6000) {
            //stopped the loading function
            setUserDetails(response.data).then((resp) => {
              auth.login(() => {
                return "Success";
              });
              setLoading(false);
              if (nextPath) {
                navigate(nextPath);
              } else {
                navigate("/feed/");
              }
            });
            setLoading(false);
          } else if (status_code === 6001) {
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
  };

  // function used to resend otp.
  const onResend = () => {
    //Phone number is taken as user data from redux store
    let { user_data } = props;
    //After submission of user data loading will starts.
    setResendLoading(true);

    //user_data, service and country is passed through the url
    serverConfig
      .post("/authentication/login/resend/otp/", {
        country: user_data.selectedCountry.web_code,
        service: "learn",
        phone: user_data.phone,
      })

      .then((response) => {
        //From response.data the message and status code  will be taken.
        const { status_code, message } = response.data;
        if (status_code === 6000) {
          //stopped the loading function
          setResendLoading(false);
          setResendSuccess(true);
        } else if (status_code === 6001) {
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
    <Container>
      <TalropEdtechHelmet title="Enter OTP" />
      <ColorLogo />
      <Content>
        <Shape
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
          alt=""
        />
        <Title className="g-medium">A One Time Password has been sent!</Title>
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
      </Content>
      <BottomButton
        onClick={onSubmit}
        className="g-medium white"
        to="/feed/"
      >
        {isLoading ? <RequestLoader /> : "Login"}
      </BottomButton>
      <TermsService />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithOtp);

const Container = styled.div`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 40%;
  padding: 0 53px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  @media (max-width: 480px) {
    font-family: unset;
    width: 100%;
  }
`;
const Content = styled.div`
  position: relative;
`;
const Disclaimer = styled.span`
  color: #4d4e4e;
  display: block;
  font-size: 13px;
  margin-top: 35px;
`;
const BottomButton = styled(Link)`
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  height: 58px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px 0 108px;
  color: #fff;
  font-size: 14px;
  min-height: 50px;
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
