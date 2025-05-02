import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TermsService from "../general/TermsService";
import { connect, useSelector, useDispatch } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import auth from "../../../../routing/auth";
import RequestLoader from "../general/RequestLoader";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

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

function EnterTrialDistrict(props) {
  const navigate = useNavigate();
  let { updateUserData } = props;

  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [districtSelector, setDistrictSelector] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const dispatch = useDispatch();

  const { signup_data, is_trialSuccess } = useSelector((state) => state);

  useEffect(() => {
    let { signup_data } = props;
    if (signup_data.selecteddistrict) {
      setSelectedDistrict(signup_data.selecteddistrict);
    }
  }, []);

  //Distric Selector

  const districts = [
    {
      id: 1,
      name: "Thiruvananthapuram",
    },
    {
      id: 2,
      name: "Kollam",
    },
    {
      id: 3,
      name: "Pathanamthitta",
    },
    {
      id: 4,
      name: "Alappuzha",
    },
    {
      id: 5,
      name: "Kottayam",
    },
    {
      id: 6,
      name: "Idukki",
    },
    {
      id: 7,
      name: "Ernakulam",
    },
    {
      id: 8,
      name: "Thrissur",
    },
    {
      id: 9,
      name: "Palakkad",
    },
    {
      id: 10,
      name: "Malappuram",
    },
    {
      id: 11,
      name: "Kozhikode",
    },
    {
      id: 12,
      name: "Wayanad",
    },
    {
      id: 13,
      name: "Kannur",
    },
    {
      id: 14,
      name: "Kasaragod",
    },
  ];

  //Input values will be saved
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  //Input changes will be saved
  const onChange = (e) => {
    setSelectedDistrict(e.target.value);
    setError(false);
  };

  const setUserDetails = (has_active_subscription) => {
    let { user_data, updateUserData } = props;
    user_data = {
      ...user_data,
      is_verified: true,
      has_active_subscription: has_active_subscription,
    };
    updateUserData(user_data);
    props.updateSignupData({});
    auth.login(() => {
      return "Success";
    });
  };

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    let { user_data } = props;
    let { access_token } = user_data;

    setLoading(true);
    if (selectedDistrict) {
      accountsConfig
        .post(
          "/api/v1/users/set/district/",
          { district: selectedDistrict },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )

        .then((response) => {
          //From response.data the message and statuscode  will be taken.
          const { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            setUserDetails(data.has_active_subscription);
            dispatch({
              type: "TOGGLE_IS_TEIALSUCCESS_UPDATE",
              is_trialSuccess: !is_trialSuccess,
            });
          } else if (StatusCode === 6001) {
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
    <Container className="container">
      <TalropEdtechHelmet title="Enter District" />
      <JoinNow>
        <CloseIcon
          title="Close"
          className="las la-times-circle"
          onClick={props.closeModal}
        ></CloseIcon>

        <ItemContainer bg="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/decorator.svg">
          <Content>
            <Shape
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/shape.svg"
              alt=""
            />
            <Title className="g-medium">Enter your district</Title>
            <Description className="g-medium">
              Please select your district
            </Description>
            <District className={selectedDistrict !== "" ? "district" : ""}>
              <DistrictDiv onClick={() => setDistrictSelector(true)}>
                {selectedDistrict !== "" ? selectedDistrict : "Select district"}

                <Arrow>
                  <img
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                    }
                    alt="Down Arrow"
                  />
                </Arrow>
              </DistrictDiv>

              <ModalContainer>
                <SubContainer className={districtSelector ? "active" : ""}>
                  <List>
                    {districts.map((district) => (
                      <DisctrictContainer
                        key={district.id}
                        onClick={() => {
                          setSelectedDistrict(district.name);
                          setDistrictSelector(false);
                        }}
                        className={
                          selectedDistrict === district.name ? "active" : ""
                        }
                        value={selectedDistrict}
                        onKeyDown={handleKeyDown}
                        onChange={onChange}
                      >
                        {district.name}
                      </DisctrictContainer>
                    ))}
                  </List>
                </SubContainer>
              </ModalContainer>
            </District>
            <BottomButton to="" onClick={onSubmit}>
              {isLoading ? <RequestLoader /> : "Submit"}
            </BottomButton>
          </Content>
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(EnterTrialDistrict);

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
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5000;
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

const BottomButton = styled(Link)`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  display: block;
  border-radius: 6px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 15px;
  min-height: 50px;
  font-family: gordita_medium !important;
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
const SingleName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  color: #000;
  font-family: gordita_regular;
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
  &.active {
    background-color: #f0fff4;
  }
  :hover {
    background-color: #f0fff4;
  }
`;
const District = styled.div`
  background: #f4f4f44d;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  position: relative;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9e9e9e;
  font-size: 16px;
  padding: 0 15px;
  max-height: 55px;
  min-height: 55px;
  font-family: "gordita_regular";
  &.district {
    color: #000;
  }
  @media all and (max-width: 1280px) {
    max-height: 55px;
    width: 100%;
    min-height: 55px;
  }

  @media all and (max-width: 980px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }

  @media all and (max-width: 480px) {
    width: 100%;
    margin-bottom: 50px;
    padding: 15px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
  &.active {
    border: 2px solid #12a46f;
  }
`;
const Label = styled.label`
  letter-spacing: 0.14px;
  color: #000;
  opacity: 0.8;
  font-size: 15px;
  font-family: "gordita_regular";
  position: absolute;
  left: 0;
  top: -30px;
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;
const DistrictDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
  max-height: 55px;
  width: 100%;
  min-height: 55px;
  text-transform: capitalize;
`;
const Arrow = styled.div`
  width: 13px;
  height: 13px;
  transform: rotate(90deg);
  & img {
    width: 100%;
    display: block;
    height: 100%;
  }
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  z-index: 111;
`;

const SubContainer = styled.div`
  background: rgb(255 255 255);
  border: 1px solid #e1e1e1;
  border-radius: 7px;
  padding: 15px;
  overflow-y: scroll;
  border-radius: 8px;
  height: 200px;
  display: none;

  &::-webkit-scrollbar {
    display: none;
  }
  &.active {
    display: block;
  }
`;
const List = styled.div``;
const DisctrictContainer = styled.div`
  display: flex;

  justify-content: space-between;
  padding: 10px 12px;
  color: #000;
  cursor: pointer;
  font-family: gordita_regular;
  text-transform: capitalize;
  scroll-behavior: smooth;
  border-radius: 5px;
  &:hover {
    color: rgb(66, 200, 112);
    background: #e4f8ed;
  }
  &.active {
    color: rgb(66, 200, 112);
    background: #e4f8ed;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const Checked = styled.img`
  width: 17px;
`;
