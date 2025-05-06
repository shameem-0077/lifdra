import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import TermsService from "./TermsService";
import { connect } from "react-redux";
import { serverConfig, serverConfig } from "../../../axiosConfig";
import auth from "../../routing/auth";
import RequestLoader from "./RequestLoader";
import ColorLogo from "./ColorLogo";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";

// Function used to get values from redux react
function mapStatetoProps(state) {
  return {
    user_data: state.user_data,
    signup_data: state.signup_data,
  };
}

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
    toggleSignupUser: (bool) =>
      dispatch({
        type: "TOGGLE_SIGNUP_USER",
        bool: bool,
      }),
  };
}

const EnterReferral = (props) => {
  const history = useHistory();

  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [referralCode, setRefferalCode] = useState("");

  let { user_data, updateUserData, toggleSignupUser } = props;

  useEffect(() => {
    let { signup_data } = props;
    if (signup_data.referralcode) {
      setRefferalCode(signup_data.referralcode);
    }
  }, []);

  //Input values will be saved
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  //Input changes will be saved
  const onChange = (e) => {
    setRefferalCode(e.target.value);
    setError(false);
  };

  const setUserDetails = (has_active_subscription) => {
    let { user_data, updateUserData, toggleSignupUser } = props;
    user_data = {
      ...user_data,
      is_verified: true,
      has_active_subscription: has_active_subscription,
    };

    // Function used to update values from redux react
    updateUserData(user_data);
    props.updateSignupData({});
    auth.login(() => {
      return "Success";
    });
    setTimeout(() => {
      history.push("/feed/");
      // history.push("/tech-schooling/");
      setLoading(false);
    }, 1000);
  };

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    let { user_data } = props;
    let { access_token } = user_data;
    setLoading(true);
    if (referralCode) {
      serverConfig
        .post(
          "/tokens/apply-token/",
          {
            referral_code: referralCode.trim(),
            service: "learn",
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          //From response.data the message and status_code  will be taken.
          const { status_code, data } = response.data;
          if (status_code === 6000) {
            setUserDetails(data.has_active_subscription);
          } else if (status_code === 6001) {
            //When status is invalid error message will be saved in setState.
            setError(true);
            setErrorMessage(data.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          setErrorMessage("An error occurred, please try again later");
          //Saved error message will be shown.
          setError(true);
          setLoading(false);
        });
    } else {
      setUserDetails();
    }
  };

  return (
    <Container>
      <TalropEdtechHelmet title="Enter referral" />
      <Logo
        alt=""
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
      ></Logo>
      <ColorLogo />
      <Content>
        <Shape
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
          alt=""
        />
        <Title className="g-medium">Enter a referral code</Title>
        <Description className="g-medium">
          Please enter a referral code given by your friend
        </Description>
        <InputContainer
          className="g-medium"
          style={{ borderColor: error ? "#f32e2f" : "#2f3337" }}
        >
          <Icon
            alt=""
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/coupon.svg"
          />
          <InputField
            autoFocus
            className="g-medium"
            placeholder="Enter a referral code"
            onKeyDown={handleKeyDown}
            onChange={onChange}
            value={referralCode}
          />
          {error && <ErrorText className="g-medium">{error_message}</ErrorText>}
        </InputContainer>
      </Content>

      <BottomButton
        onClick={onSubmit}
        // to="/dashboard/"
        to="/tech-schooling/"
        className="g-medium white"
      >
        {isLoading ? <RequestLoader /> : "Submit"}
      </BottomButton>
      <BottomRow className="g-medium">
        Don't you have a referral code
        <RowItem
          onClick={(e) => {
            e.preventDefault();
            setUserDetails();
          }}
          // to="/dashboard/"
          to="/tech-schooling/"
          className="g-medium"
        >
          Skip for now
        </RowItem>
      </BottomRow>
      <TermsService />
    </Container>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(EnterReferral);

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
  margin: 18px 0 40px;
  width: 94%;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 13px;
    width: 100%;
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
  margin-left: 10px;
  width: -webkit-fill-available;
  width: -moz-available;
  position: relative;
  @media (max-width: 480px) {
    margin-bottom: 10px;
    padding: 10px 12px;
    border-color: #5f6367;
  }
  &:focus-within {
    border-color: #5cc66a;
  }
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
const MiddleContainer = styled.div`
  display: flex;
  position: relative;
`;
const ErrorText = styled.span`
  font-size: 12px;
  position: absolute;
  left: 0;
  color: #f46565;
  bottom: -26px;
`;
const BottomButton = styled(Link)`
  background: #5cc66a;
  display: block;
  border-radius: 6px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  font-size: 15px;
  min-height: 50px;
  @media (max-width: 480px) {
    height: 44px;
    font-size: 14px;
    margin-top: 5px;
  }
`;
const Shape = styled.img`
  max-height: 29px;
  max-width: 29px;
  @media (max-width: 640px) {
    display: none;
  }
`;
