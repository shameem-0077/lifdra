import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import TermsService from "../TermsService";
import { connect, useSelector } from "react-redux";
import queryString from "query-string";
import { serverConfig } from "../../../../axiosConfig";
import auth from "../../../routing/auth";
import RequestLoader from "../RequestLoader";
import ColorLogo from "../ColorLogo";
import TalropEdtechHelmet from "../../../general/helpers/TalropEdtechHelmet";

// Function used to update values from redux react
function mapDispatchtoProps(dispatch) {
  return {
    updateUserData: (user_data) =>
      dispatch({
        type: "UPDATE_USER_DATA",
        user_data: user_data,
      }),
  };
}

// Function used to get values from redux react
function mapStatetoProps(state) {
  return {
    user_data: state.user_data,
    nextPath: state.nextPath,
  };
}

const LoginEnterPassword = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [password, setPassword] = useState("");

  const handlePasswordShow = () => {
    setHide(!hide);
  };
  const [nextPath, setNextPath] = useState("");

  useEffect(() => {
    let { search } = props.location;
    const values = queryString.parse(search);
    setNextPath(values.next);
  }, []);

  //Preventing "Enter" key function
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  //access_token and refresh_token will be saved in the redux store
  const setUserDetails = async (data) => {
    let promise = new Promise((res, rej) => {
      let user_data = {
        access_token: data.response.access_token,
        refresh_token: data.response.refresh_token,
        name: data.name,
        is_verified: true,
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

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    //Phone number is taken as user data from redux store
    let { user_data } = props;
    if (password) {
      //After submission of userdata loading will starts.
      setLoading(true);
      //password, service and phone is passed to the url
      serverConfig
        .post("/api/v1/users/login/verify/", {
          password: password,
          service: "learn",
          phone: user_data.phone,
          country: user_data.selectedCountry.web_code,
        })
        .then((response) => {
          //From response.data the message and status_code  will be taken.
          const { status_code, message } = response.data;
          if (status_code === 6000) {
            //When status code reads true it will redirect to the next page.
            auth.login(() => {
              return "Success";
            });

            setUserDetails(response.data).then((resp) => {
              setLoading(false);
              if (nextPath) {
                navigate(nextPath);
              } else {
                navigate("/feed/");
              }
            });
          } else if (status_code === 6001) {
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
      setError(true);
      setErrorMessage("This field cannot be left blank");
    }
  };

  const loginWithOtp = () => {
    let { user_data } = props;
    setLoading(true);
    //Country, service and phone is passed to the url
    serverConfig
      .post("/api/v1/users/login/enter/otp/", {
        country: user_data.selectedCountry.web_code,
        service: "learn",
        phone: user_data.phone,
      })
      .then((response) => {
        //From response.data the message and status_code  will be taken.
        const { status_code, message } = response.data;
        if (status_code === 6000) {
          setLoading(false);
          navigate(`/auth/login/verify-otp/${nextPath ? `?next=${nextPath}` : ""}`);
          //When status code reads true it will redirect to the next page.
        } else if (status_code === 6001) {
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
  };

  return (
    <Container>
      <Logo
        alt=""
        src={
          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
        }
      ></Logo>

      <TalropEdtechHelmet title="Enter password" />
      <ColorLogo />
      <Content>
        <Shape
          src={
            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
          }
          alt=""
        />
        <Title className="g-medium">Password </Title>
        <Description className="g-medium">
          Enter your password for this account
        </Description>
        <InputContainer
          style={{ marginBottom: 0, borderColor: error && "#f46565" }}
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
            className="g-medium"
            autoFocus
            style={{ paddingRight: 15 }}
            type={hide ? "password" : "text"}
            placeholder="Enter a password"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            value={password}
          />
          <Icon
            onClick={handlePasswordShow}
            style={{ cursor: "pointer" }}
            src={
              hide
                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/hide.svg"
                : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/eye.svg"
            }
            alt=""
          />
        </InputContainer>

        <BottomRow style={{ justifyContent: error && "space-between" }}>
          {error && <ErrorText className="g-medium">{error_message}</ErrorText>}
          <RowItem
            onClick={(e) => {
              e.preventDefault();
              loginWithOtp();
            }}
            to="/auth/login/verify-otp/"
            className="g-medium"
          >
            Login with OTP
          </RowItem>
        </BottomRow>
      </Content>

      <BottomButton
        onClick={onSubmit}
        // to="/tech-schooling/"
        to="/feed/"
        className="g-medium white"
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

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginEnterPassword);

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
