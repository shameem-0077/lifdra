import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import { useSelector } from "react-redux";
import CountrySelector from "../../learn/includes/authentication/general/CountrySelector";
import DistrictModal from "./DistrictModal";
import RequestLoader from "../../learn/includes/authentication/general/RequestLoader";

export default function EligibilityFormModal({
  setConfirmModal,
  isFormModal,
  setFormModal,
  name,
  setName,
  phone,
  setPhone,
  selectedClass,
  setSelectedClass,
  studentType,
  setStudentType,
  selectedCountry,
  setSelectedCountry,
  isLoading,
  setLoading,
  errorMessage,
  setErrorMessage,
  selectedDistrict,
  setSelectedDistrict,
  submitData,
  nameError,
  phoneError,
}) {
  const [countryselector, setCountryselector] = useState(false);
  const [districtSelector, setDistrictSelector] = useState(false);

  const handleShow = () => {
    setCountryselector((prevValue) => !prevValue);
  };

  const user_data = useSelector((state) => state.user_data);

  const onSelectHandler = (selected) => {
    setSelectedCountry(selected);
  };

  useEffect(() => {
    if (isFormModal) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [isFormModal]);
  return (
    <>
      <Overlay className={isFormModal ? "active" : ""}></Overlay>
      <Container className={isFormModal ? "active" : ""}>
        <FormContainer>
          <DistrictModal
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            districtSelector={districtSelector}
            setDistrictSelector={setDistrictSelector}
          />
          <CountrySelector
            show={countryselector}
            handleClick={handleShow}
            onSelectHandler={onSelectHandler}
            selectedCountry={selectedCountry}
          />

          <TopHead>
            <H5>Registration Form</H5>
            <Close
              onClick={() => {
                setFormModal(false);
                // setName("");
                // setPhone("");
                setSelectedClass("");
                setStudentType("");
                setSelectedDistrict("");
                setErrorMessage("");
              }}
            >
              <img
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/close.svg"
                }
                alt="Close"
              />
            </Close>
          </TopHead>
          <Bottom>
            <Main>
              <NameContainer>
                <Label for="full-name">Full Name</Label>
                {/* {auth.isAuthenticated ? (
									<InputDiv>
										<Input
											type="text"
											id="full-name"
											placeholder="Enter name"
											onChange={(e) =>
												setName(e.target.value)
											}
											value={user_data.name}
										/>
									</InputDiv>
								) : ( */}
                <InputDiv>
                  <Input
                    type="text"
                    id="full-name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputDiv>
                {/* )} */}
                {nameError && <p>This field is required</p>}
              </NameContainer>
              <MobileContainer>
                <NumberDiv className="mobile-container">
                  <Label for="phone-number" className="absolute">
                    Phone Number
                  </Label>
                  <FlagContainer
                    onClick={() => setCountryselector(!countryselector)}
                  >
                    <Flag>
                      <img src={selectedCountry.flag} alt="India" />
                    </Flag>
                    <Arrow
                      src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                      }
                      alt="Down Arrow"
                    />
                  </FlagContainer>
                  <CountryCode>{selectedCountry.phone_code}</CountryCode>
                  {/* {auth.isAuthenticated ? (
										<Input
											type="number"
											id="phone-number"
											placeholder="Enter phone number"
											className="phone"
											value={user_data.phone}
											onChange={(e) =>
												setPhone(e.target.value)
											}
										/>
									) : ( */}
                  <Input
                    type="number"
                    id="phone-number"
                    placeholder="Enter phone number"
                    className="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrorMessage("");
                    }}
                  />
                  {/* )} */}

                  {nameError ? (
                    <p>This field is required</p>
                  ) : (
                    <p>{errorMessage}</p>
                  )}
                  {(phone != "" && phone?.length < 10) ||
                  (phone != "" && phone?.length > 10) ? (
                    <p className="invalid">Invalid number</p>
                  ) : (
                    <p>{errorMessage}</p>
                  )}
                </NumberDiv>

                <NumberDiv
                  className="mobile-container district"
                  onClick={() => setDistrictSelector(true)}
                >
                  <Label for="district" className="absolute">
                    District
                  </Label>
                  {selectedDistrict !== ""
                    ? selectedDistrict
                    : "Choose District"}
                  <Arrow
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                    }
                    alt="Down Arrow"
                  />
                </NumberDiv>
              </MobileContainer>

              <Label for="">I am a</Label>
              <StudentDiv>
                <ClassLi
                  className="radio class-div"
                  onClick={() => setStudentType("school")}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span class="radio"></span>
                  <span class="label">School Student</span>
                </ClassLi>
                <ClassLi
                  className="radio class-div"
                  onClick={() => {
                    setStudentType("college");
                    setSelectedClass("");
                  }}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span class="radio"></span>
                  <span class="label">College Student</span>
                </ClassLi>
                <ClassLi
                  className="radio class-div"
                  onClick={() => setStudentType("graduates")}
                >
                  <input type="radio" name="student" value={studentType} />
                  <span class="radio"></span>
                  <span class="label">Graduate</span>
                </ClassLi>
              </StudentDiv>

              {studentType === "school" ? (
                <>
                  <Label for="">Which class are you in?</Label>
                  <ClassUl>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="5th"
                        onClick={() => setSelectedClass("5")}
                      />
                      <span class="radio"></span>
                      <span class="label">5th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="6th"
                        onClick={() => setSelectedClass("6")}
                      />
                      <span class="radio"></span>
                      <span class="label">6th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="7th"
                        onClick={() => setSelectedClass("7")}
                      />
                      <span class="radio"></span>
                      <span class="label">7th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="8th"
                        onClick={() => setSelectedClass("8")}
                      />
                      <span class="radio"></span>
                      <span class="label">8th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="9th"
                        onClick={() => setSelectedClass("9")}
                      />
                      <span class="radio"></span>
                      <span class="label">9th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="10th"
                        onClick={() => setSelectedClass("10")}
                      />
                      <span class="radio"></span>
                      <span class="label">10th</span>
                    </ClassLi>
                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="+1"
                        onClick={() => setSelectedClass("11")}
                      />
                      <span class="radio"></span>
                      <span class="label">+1</span>
                    </ClassLi>

                    <ClassLi className="radio">
                      <input
                        type="radio"
                        name="student_class"
                        value="+2"
                        onClick={() => setSelectedClass("12")}
                      />
                      <span class="radio"></span>
                      <span class="label">+2</span>
                    </ClassLi>
                  </ClassUl>
                </>
              ) : (
                ""
              )}
            </Main>

            <ButtonConatiner>
              <Cancel
                onClick={() => {
                  setFormModal(false);
                  setName("");
                  setPhone("");
                  setSelectedClass("");
                  setStudentType("");
                  setSelectedDistrict("");
                  setErrorMessage("");
                }}
              >
                Cancel
              </Cancel>
              {(name !== "" &&
                phone !== "" &&
                selectedDistrict !== "" &&
                studentType === "school" &&
                selectedClass !== "") ||
              (name !== "" &&
                phone !== "" &&
                selectedDistrict !== "" &&
                studentType === "college") ||
              (name !== "" &&
                phone !== "" &&
                selectedDistrict !== "" &&
                studentType === "graduates") ? (
                <Verify
                  onClick={() => {
                    submitData();
                  }}
                >
                  {isLoading ? <RequestLoader /> : "Verify"}
                </Verify>
              ) : (
                <Verify className="disabled">Verify</Verify>
              )}

              {(phone != "" && phone?.length < 10) ||
              (phone != "" && phone?.length > 10) ? (
                <p>Invalid number</p>
              ) : (
                <p>{errorMessage}</p>
              )}
            </ButtonConatiner>
          </Bottom>
          <LightBanner></LightBanner>
          <DarkBanner></DarkBanner>
        </FormContainer>
      </Container>
    </>
  );
}
const Main = styled.div`
  @media all and (max-width: 768px) {
    max-height: 400px;
    overflow-y: scroll;
  }
`;
const NameContainer = styled.div`
  position: relative;
  p {
    position: absolute;
    top: 79px;
    font-size: 14px;
    color: red;
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  /* transform: scale(0);
	transition: ease-in-out 0.5s; */
  transition: ease-in-out 0.2s;
  &.active {
    /* transform: scale(1); */
    opacity: 1;
    visibility: visible;
  }
`;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
  &.active {
    display: block;
  }
`;
const FormContainer = styled.div`
  position: fixed;
  z-index: 1001;
  transform: scale(0);
  width: 750px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 50px 50px 55px 50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  overflow: none;

  &.active {
    transform: scale(1);
  }
  @media all and (max-width: 980px) {
    width: 75%;
  }
  @media all and (max-width: 640px) {
    width: 91%;
    padding: 36px 21px;
  }
  @media all and (max-width: 480px) {
    width: 91%;
    padding: 35px 21px;
    transform: translate(-50%, -12%);
  }
`;
const TopHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 2px solid #ededed;
  @media all and (max-width: 480px) {
    padding-bottom: 7px;
    margin-bottom: 23px;
  }
`;
const H5 = styled.h5`
  font-size: 21px;
  font-family: gordita_medium;
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
`;
const Close = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 640px) {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;
const Bottom = styled.div``;
const Label = styled.label`
  font-size: 17px;
  font-family: "gordita_regular";
  color: #6e6e6e;
  margin-bottom: 3px;
  cursor: pointer;
  &.absolute {
    position: absolute;
    left: 0;
    top: -22px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
`;
const InputDiv = styled.div`
  width: 100%;
  border: 1px solid #e3e3e3;
  padding: 13px 15px;
  border-radius: 10px;
  background: #f4f4f44d;
  margin-bottom: 50px;
  position: relative;
  p {
    position: absolute;
    bottom: 0px;
    left: 0;
    color: red;
    font-size: 14px;
    font-family: gordita_regular;
    @media all and (max-width: 480px) {
      bottom: -23px;
      left: 0;
      color: red;
      font-size: 12px;
    }
  }
  @media all and (max-width: 480px) {
    padding: 8px 15px;
    margin-bottom: 40px;
  }
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 17px;
  font-family: gordita_regular;
  color: #1c1c1c;
  @media all and (max-width: 768px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const NumberDiv = styled.div`
  width: 100%;
  border: 1px solid #e3e3e3;
  padding: 13px 15px;
  border-radius: 10px;
  background: #f4f4f44d;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  position: relative;
  p {
    position: absolute;
    bottom: -19px;
    left: 0;
    color: red;
    font-size: 14px;
    font-family: gordita_regular;
    @media all and (max-width: 480px) {
      bottom: -46px;
      left: 0;
      color: red;
      font-size: 12px;
    }
    /* &.invalid {
		position: absolute;
		bottom: -19px;
		left: 110px !important;
		color: red;
		font-size: 14px;
		font-family: gordita_regular;
		@media all and (max-width: 480px) {
			bottom: -46px;
			right: 0;
			color: red;
			font-size: 12px;
		} */
  }

  @media all and (max-width: 480px) {
    padding: 8px 15px;
    margin-bottom: 21px;
  }
  &.mobile-container {
    font-family: gordita_regular;
    width: 49%;
    @media all and (max-width: 768px) {
      width: 100%;
      &:first-child {
        margin-bottom: 45px;
      }
    }
  }
  &.district {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
`;
const FlagContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Flag = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  & img {
    width: 100%;
    display: block;
    height: 100%;
  }
  @media all and (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;
const Arrow = styled.img`
  width: 6px;
  transform: rotate(90deg);
  margin-right: 10px;
  @media all and (max-width: 480px) {
    width: 6px;
  }
`;
const CountryCode = styled.span`
  color: #1c1c1c;
  margin-right: 5px;
  @media all and (max-width: 768px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const StudentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;
const ClassDiv = styled.div`
  width: 48%;
  border: 1px solid #e3e3e3;
  height: 60px;
  border-radius: 5px;
  display: flex;
  padding: 20px;
  align-items: center;
  cursor: pointer;
  & label {
    font-family: gordita_regular;
    margin-right: 0;
  }
  @media all and (max-width: 980px) {
    padding: 0;
    justify-content: center;
  }
  @media all and (max-width: 768px) {
    width: 100%;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const Radio = styled.input`
  margin: 0px 5px 5px 0;
`;
const ButtonConatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-top: 20px;

  p {
    position: absolute;
    top: 0px;
    font-size: 12px;
    color: red;
    @media all and (max-width: 480px) {
      /* bottom: 0;
			left: -5px; */
    }
  }
`;
const Cancel = styled.div`
  min-height: 58px;
  width: 29%;
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #2d2d2d;
  font-family: gordita_regular;
  background: #fcfcfc;
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  margin-right: 20px;
  @media all and (max-width: 768px) {
    width: 35%;
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    width: 30%;
    padding: 5px;
    min-height: 35px;
    max-height: 35px;
  }
`;
const Verify = styled.div`
  min-height: 58px;
  width: 29%;
  padding: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background: transparent linear-gradient(114deg, #0fa76f 0%, #0f9ea7 100%) 0%
    0% no-repeat padding-box;
  border-radius: 6px;
  font-family: gordita_regular;
  @media all and (max-width: 768px) {
    width: 35%;
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    width: 30%;
    padding: 5px;
    min-height: 35px;
    max-height: 35px;
  }
  &.disabled {
    filter: contrast(0.5);
    cursor: not-allowed;
  }
`;
const ClassUl = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 10px;
  flex-wrap: wrap;
  @media all and (max-width: 640px) {
    margin-bottom: 24px;
  }
  @media all and (max-width: 480px) {
    grid-gap: 24px;
  }
  & label.radio {
    @media all and (max-width: 980px) {
      margin-bottom: 15px;
    }
    @media all and (max-width: 480px) {
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }
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
      height: 18px;
      width: 18px;
      top: 0px;
    }
    &::after {
      content: "";
      position: absolute;
      opacity: 0;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4ca473;
      @media all and (max-width: 480px) {
        top: 2px;
        left: 2px;
        width: 10px;
        height: 10px;
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
    width: 30%;
    border: 1px solid #e3e3e3;
    background: #f4f4f44d;
    border-radius: 10px;
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
      width: 33%;
      & span.label {
        font-size: 12px;
      }
    }
    @media all and (max-width: 768px) {
      & span.label {
        font-size: 15px;
      }
      width: 49%;
      margin-bottom: 15px;
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
      justify-content: left;
      padding: 15px 0 15px 39px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
const LightBanner = styled.div`
  position: absolute;
  width: 100%;
  height: 7px;
  left: 0;
  bottom: 7px;
  background: #6dce9f;
`;
const DarkBanner = styled.div`
  position: absolute;
  width: 100%;
  height: 7px;
  left: 0;
  bottom: 0;
  background: #529f7b;
`;
const MobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const District = styled.div``;
