import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RequestLoader from "../components/RequestLoader";
import { connect, useSelector } from "react-redux";
import { serverConfig } from "../../../axiosConfig";

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

function EnterNameModal(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("Member at Steyp");

  const { signup_data } = useSelector((state) => state);

  useEffect(() => {
    setName(signup_data.name);
  }, [Object.keys(signup_data).length]);

  //Validating the function of entering the name
  const onChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z, " "]/gi, "");
    setName(value);
    setError(false);
  };

  const onDesignationChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^A-Za-z, " "]/gi, "");
    setDesignation(value);
    setError(false);
  };

  //Input values will be saved
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const setUserDetails = () => {
    let { user_data } = props;
    user_data = {
      ...user_data,
      name: name,
      country: signup_data.country,
    };
    props.updateUserData(user_data);
  };

  const onSubmit = (e) => {
    setLoading(true);
    e && e.preventDefault();

    //Phone number is taken as user data from redux store
    let { user_data, signup_data } = props;
    // access token will be saved
    //  && gender && userCategory
    if (name && designation) {
      //After submission of user data loading will starts.
      if (!(signup_data.name === name)) {
        setLoading(true);

        //name, service and authorization is passed through the url
        accountsConfig
          .post("api/v1/users/signup/set/name/", {
            name: name,
            service: "learn",
            phone: user_data.phone,
            country: signup_data.country,
            designation: designation,
          })

          .then((response) => {
            //From response.data the message and status code  will be taken.
            const { StatusCode, message } = response.data;
            if (StatusCode === 6000) {
              setLoading(false);
              //When status code reads true it will redirect to the next page.
              navigate({
                pathname: location.pathname,
                search: `action=set-password${
                  props.nextPath ? `&next=${props.nextPath}` : ""
                }`,
              });
              setUserDetails();
              props.updateSignupData({
                ...signup_data,
                name: name,
                password: null,
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
        navigate({
          pathname: location.pathname,
          search: "action=set-password",
        });
      }
    } else {
      setError(true);
      setLoading(false);
      setErrorMessage("This field cannot be left blank");
    }
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
            <Title className="b-medium">Complete your profile</Title>
            <Description className="b-medium">Enter your full name</Description>
            <InputContainer
              className="b-medium"
              style={{
                borderColor: error && !name ? "#f32e2f" : "#c3c3c3",
              }}
            >
              <Icon
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/person.svg"
                alt=""
              />
              <InputField
                autoFocus
                className="b-medium"
                placeholder="Enter your name"
                onKeyDown={handleKeyDown}
                value={name}
                onChange={onChange}
              />
              {error && !name && (
                <ErrorText className="b-medium">{error_message}</ErrorText>
              )}
            </InputContainer>

            <Description className="b-medium">
              Enter your designation
            </Description>

            <InputContainer
              className="b-medium"
              style={{
                borderColor: error && !name ? "#f32e2f" : "#c3c3c3",
              }}
            >
              <Icon
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/person.svg"
                alt=""
              />
              <InputField
                autoFocus
                className="b-medium"
                placeholder="Enter your designation"
                onKeyDown={handleKeyDown}
                value={designation}
                onChange={onDesignationChange}
              />
              {error && !name && (
                <ErrorText className="b-medium">{error_message}</ErrorText>
              )}
            </InputContainer>

            {/* <StudentDiv>
                <ClassLi
                  className="radio class-div"
                  onClick={() => setStudentType("tech-schooling")}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span className="radio"></span>
                  <span className="label">School Student</span>
                </ClassLi>
                <ClassLi
                  className="radio class-div"
                  onClick={() => {
                    setStudentType("tech-degree");
                    // setSelectedClass("");
                  }}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span className="radio"></span>
                  <span className="label">College Student</span>
                </ClassLi> */}
            {/* <ClassLi
                  className="radio class-div"
                  onClick={() => setStudentType("tech-grad")}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span class="radio"></span>
                  <span class="label">Graduate</span>
                </ClassLi> */}
            {/* {error && !studentType && (
                  <StudentDivError className="b-medium">
                    {error_message}
                  </StudentDivError>
                )}
              </StudentDiv> */}
            <BottomButton to={""} className="b-medium white" onClick={onSubmit}>
              {isLoading ? <RequestLoader /> : "Next"}
            </BottomButton>
          </Content>
        </ItemContainer>
      </JoinNow>
    </Container>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(EnterNameModal);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
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
  background-size: 85%;
  background-position-x: right;
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
    background-position-y: -50px;
    background-size: 100%;
  }
`;

const Content = styled.div`
  padding-top: 100px;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 980px) {
    padding-top: 125px;
  }
  @media (max-width: 640px) {
    padding-top: 52px;
  }
`;
const Title = styled.h4`
  font-size: 22px;
  line-height: 1.4em;
  margin-top: 14px;
  @media (max-width: 640px) {
    font-size: 25px;
    margin-top: 0;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
const Description = styled.p`
  margin: 13px 0 20px;
  width: 94%;
  @media (max-width: 480px) {
    width: 100%;
    font-size: 15px;
    margin: 5px 0 25px;
  }
`;
const InputContainer = styled.div`
  position: relative;
  border: 2px solid #e3e3e3;
  border-radius: 7px;
  padding: 15px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 17px;
  /* margin-bottom: 30px; */
  width: -webkit-fill-available;
  width: -moz-available;
  @media (max-width: 480px) {
    padding: 8px 13px;
    border-color: #5f6367;
    font-size: 15px;
  }
  &:focus-within {
    border-color: #56c082;
  }
  &:hover {
    border: 2px solid #56c082 !important;
  }
  @media (max-width: 480px) {
    margin-bottom: 20px;
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
  caret-color: #56c082;
  @media (max-width: 480px) {
    width: 106.666666667%;
    padding-left: 10.66667px;
    font-size: 14px;
    transform: scale(0.9375);
    transform-origin: left top;
  }
`;

const ErrorText = styled.span`
  font-size: 14px;
  position: absolute;
  left: 0;
  color: #f46565;
  bottom: -27px;
  @media (max-width: 480px) {
    font-size: 13px;
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
  margin-top: 20px;
  color: #fff;
  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
    margin-bottom: 20px;
  }
`;
const ScrollBar = styled.div`
  max-height: 65vh;
  overflow-y: scroll;
  margin-right: -7px;
  padding-right: 7px;
`;

const Label = styled.label`
  font-size: 22px;
  font-family: "gordita_regular";
  color: #545454;
  margin-bottom: 8px;
  &.absolute {
    position: absolute;
    left: 0;
    top: -22px;
  }
  @media all and (max-width: 480px) {
    font-size: 17px;
  }
`;

const StudentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const ClassLi = styled.label`
  position: relative;
  cursor: pointer;
  padding-left: 28px;
  font-size: 16px;
  font-family: gordita_medium;
  color: #2d2d2d;
  cursor: pointer;
  margin-right: 20px;
  @media all and (max-width: 480px) {
    margin-right: 6px;
    padding-left: 26px;
    font-size: 15px;
  }

  & span {
    color: #2d2d2d;
    font-size: 16px;
    font-family: gordita_regular;
    @media all and (max-width: 480px) {
      font-size: 15px;
    }
  }
  & input {
    position: absolute;
    cursor: pointer;
    height: 0;
    width: 0;
    left: -2000px;
  }
  & .radio {
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid #9d9d9d;
    height: 20px;
    width: 20px;
    background: #fff;
    border-radius: 50%;
    margin-top: -2px;
    @media all and (max-width: 480px) {
      height: 17px;
      width: 17px;
      top: 0px;
    }
    &::after {
      content: "";
      position: absolute;
      opacity: 0;
      top: 18%;
      left: 20%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4ca473;
      @media all and (max-width: 480px) {
        top: 2px;
        left: 2px;
        width: 9px;
        height: 9px;
      }
    }
  }
  & input:checked ~ .radio {
    background-color: #fff;
    border: 2px solid #4ca473;
  }
  & input:checked ~ .radio::after {
    opacity: 1;
  }
  & input:checked ~ .label {
    opacity: 1;
  }

  &.class-div {
    width: 48%;
    /* margin-bottom: 10px; */
    border: 2px solid #e3e3e3;
    background: #f4f4f44d;
    border-radius: 7px;
    display: flex;
    padding: 13px 0 13px 40px;
    align-items: center;
    cursor: pointer;
    margin-right: 0;
    & label {
      font-family: gordita_regular;
      margin-right: 0;
    }
    & span.radio {
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
    }
    @media all and (max-width: 980px) {
      width: 48%;
      & span.label {
        font-size: 12px;
      }
    }
    @media all and (max-width: 768px) {
      & span.label {
        font-size: 15px;
      }
      width: 49%;
      /* margin-bottom: 15px; */
      padding: 15px 0 15px 45px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    @media all and (max-width: 640px) {
      justify-content: left;
    }
    @media all and (max-width: 480px) {
      width: 100%;
      margin-bottom: 8px;
      justify-content: left;
      padding: 8px 0 8px 39px;
      & span.label {
        font-size: 14px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
const StudentDivError = styled.span`
  font-size: 14px;
  /* position: absolute;
  left: 0; */
  color: #f46565;
  margin-top: 6px;
  @media (max-width: 480px) {
    font-size: 13px;
    margin-top: 0px;
  }
`;
