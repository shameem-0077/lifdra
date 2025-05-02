import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import LogouteLoader from "../../../learn/includes/authentication/general/LogouteLoader";

function ExamPageHeader({
  selectedLanguage,
  setSelectedLanguage,
  isExamPage,
  isInstructionPage,
}) {
  const sc_data = localStorage.getItem("school_scientist_data");
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const school_scientist_data = useSelector(
    (state) => state.school_scientist_data
  );

  return (
    <HeaderContainer>
      <Wrapper>
        <h1>
          {/* <LogoContent to="/school-scientist">
						<LogoImage
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
							alt="Logo"
						/>
					</LogoContent> */}
          <LogoContent to="/">
            <LogoImage
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
              alt="Logo"
            />
          </LogoContent>
        </h1>
        {sc_data &&
        (location.pathname === "/school-scientist/exam/completed/" ||
          location.pathname === "/school-scientist/exam/expired/" ||
          location.pathname === "/school-scientist/exam/certificate/") ? (
          <ButtonContinerTwo
            onClick={() => {
              setLoading(true);
              localStorage.removeItem("school_scientist_data");
              setTimeout(() => {
                window.location.href = "/";
              }, 1400);
            }}
          >
            {isLoading ? (
              <LogouteLoader />
            ) : (
              <>
                <LogoutImgContiner>
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/Logout.svg"
                    alt=""
                  />
                </LogoutImgContiner>
                <a> Logout</a>
              </>
            )}
          </ButtonContinerTwo>
        ) : (
          ""
        )}

        {isExamPage && (
          <LanguageBox>
            <PrimaryLanguage
              className={`mal ${
                school_scientist_data.selected_language === "malayalam" &&
                "active"
              }`}
            >
              മ
            </PrimaryLanguage>
            <Switch
              onClick={(e) => {
                setSelectedLanguage(
                  school_scientist_data.selected_language === "malayalam"
                    ? "english"
                    : "malayalam"
                );
              }}
            >
              <Ball
                active={
                  school_scientist_data.selected_language === "english"
                    ? true
                    : false
                }
              ></Ball>
            </Switch>
            <PrimaryLanguage
              className={`${
                school_scientist_data.selected_language === "english" &&
                "active"
              }`}
            >
              Eng
            </PrimaryLanguage>
          </LanguageBox>
        )}
        {isInstructionPage && (
          <LanguageBox>
            <PrimaryLanguage
              className={`mal ${selectedLanguage === "malayalam" && "active"}`}
            >
              മ
            </PrimaryLanguage>
            <Switch
              onClick={(e) => {
                setSelectedLanguage(
                  selectedLanguage === "malayalam" ? "english" : "malayalam"
                );
              }}
            >
              <Ball
                active={selectedLanguage === "english" ? true : false}
              ></Ball>
            </Switch>
            <PrimaryLanguage
              className={`${selectedLanguage === "english" && "active"}`}
            >
              Eng
            </PrimaryLanguage>
          </LanguageBox>
        )}
      </Wrapper>
    </HeaderContainer>
  );
}

export default ExamPageHeader;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  z-index: 99;
  background: rgb(249, 249, 251);
  height: 100px;
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb;
  @media all and (max-width: 640px) {
    height: 90px;
  }
  @media all and (max-width: 480px) {
    height: 85px;
  }
  @media all and (max-width: 360px) {
    height: 80px;
  }
`;
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    max-height: 50px;
    /* display: flex;
        justify-content: space-between; */
  }
  @media all and (max-width: 640px) {
    display: flex;
    justify-content: space-between;
    h1 {
      max-height: 40px;
    }
  }
  @media all and (max-width: 480px) {
    h1 {
      max-height: 36px;
    }
  }
  @media all and (max-width: 360px) {
    h1 {
      max-height: 32px;
    }
  }
`;
const LogoContent = styled(Link)`
  display: inline-block;
  width: 120px;
  @media all and (max-width: 640px) {
    width: 95px;
  }
  @media all and (max-width: 480px) {
    width: 90px;
  }
  @media all and (max-width: 360px) {
    width: 80px;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  display: block;
`;

const LanguageBox = styled.div`
  display: none;
  align-items: center;
  @media all and (max-width: 640px) {
    display: flex;
  }
`;
const PrimaryLanguage = styled.p`
  height: 17px;
  color: #9e9e9e;
  font-family: "gordita_medium";
  font-weight: 600;

  &.active {
    color: #0fa76f;
  }
  &.mal {
    font-family: "fml-indulekharegular" !important;
    font-size: 26px;
    height: 34px;
  }
`;
const Switch = styled.span`
  display: inline-block;
  width: 35px;
  height: 20px;
  background-color: #0fa76f;
  /* color: #0fa76f; */
  border-radius: 30px;
  position: relative;
  margin: 0 10px;
`;
const Ball = styled.span`
  display: inline-block;
  transition: 200ms ease all;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ active }) => (active ? "15px" : "5px")};
`;
const ButtonContinerTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 180px;
  height: 49px;
  border: 1px solid #e02b1d;
  border-radius: 6px;
  cursor: pointer;
  @media all and (max-width: 768px) {
    width: 137px;
    height: 36px;
  }
  @media all and (max-width: 480px) {
    border: none;
    width: 17px;
    height: 30px;
  }
  a {
    font-size: 16px;
    text-align: center;
    font-family: "gordita_regular";
    color: #e02b1d;
    @media all and (max-width: 980px) {
      font-size: 16px;
    }
    @media all and (max-width: 768px) {
      font-size: 14px;
    }
    @media all and (max-width: 480px) {
      display: none;
    }
  }
`;
const LogoutImgContiner = styled.div`
  cursor: pointer;
  img {
  }
`;
