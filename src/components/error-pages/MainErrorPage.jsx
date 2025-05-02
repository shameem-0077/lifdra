import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";

function MainErrorPage() {
  const { errorState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.key) {
      dispatch({ type: "RESET_ERROR" });
    }
  }, [location.pathname]);

  return (
    <>
      {errorState.errorData.status === 404 ? (
        <Outer>
          <TalropEdtechHelmet title="Page Not Found" />
          <Container>
            <InnerContainer>
              <ImageContainer>
                <Image
                  alt="Error 404"
                  // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/error-pages/image-404.png"
                  src={require("../../assets/images/404.svg")}
                />
              </ImageContainer>
              <Title>Page not found</Title>
              <Text>
                You seems to have clicked on a broken link or entered a URL that
                doesn't exist on this site.
              </Text>
              <Button to="/feed/">Go to Dashboard</Button>
            </InnerContainer>
          </Container>
        </Outer>
      ) : errorState.errorData.status === 500 ? (
        <Outer>
          <TalropEdtechHelmet title="Internal Server Error" />
          <Container>
            <InnerContainer>
              <ImageContainer>
                <Image
                  src={require("../../assets/images/error-500.svg")}
                  alt="Error 500"
                />
              </ImageContainer>
              <Title>Internal Server Error</Title>

              <Text>Sorry, Something went wrong</Text>

              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </Button>
            </InnerContainer>
          </Container>
        </Outer>
      ) : errorState.errorData.status === 401 ? (
        <Outer>
          <TalropEdtechHelmet title="Unauthorised Access" />
          <Container>
            <InnerContainer>
              <ImageContainer>
                <Image
                  src={require("../../assets/images/error-401.svg")}
                  alt="Error 401"
                />
              </ImageContainer>

              <Title>Unauthorised Access</Title>
              <Text>Authorisation Failed, Please Login to Continue</Text>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  window.location = "/";
                }}
              >
                Login Again
              </Button>
            </InnerContainer>
          </Container>
        </Outer>
      ) : errorState.errorData.status === 403 ? (
        <Outer>
          <TalropEdtechHelmet title="Page Forbidden" />
          <Container>
            <InnerContainer>
              <ImageContainer>
                <Image
                  src={require("../../assets/images/error-403.svg")}
                  alt="Error 403"
                />
              </ImageContainer>
              <Title>Forbidden Error</Title>

              <Text>Forbidden page.</Text>

              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </Button>
            </InnerContainer>
          </Container>
        </Outer>
      ) : null}
    </>
  );
}

export default MainErrorPage;

const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  /* padding-top: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh !important;
  padding-right: unset !important;
  padding-bottom: unset !important;
  @media all and (max-width: 768px) {
    padding-top: 0px;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 43%;
  @media (max-width: 1440px) {
    width: 43%;
  }
  @media (max-width: 840px) {
    min-width: 200px;
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Title = styled.h3`
  font-size: 24px;
  color: #363636;
  font-family: "gordita_medium";

  @media only screen and (max-width: 640px) {
    font-size: 21px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
const Text = styled.p`
  font-size: 16px;
  color: #6ca1ad;
  width: 68%;
  text-align: center;
  margin: 5px 0 19px;
  font-family: "gordita_regular";
  @media only screen and (max-width: 1280px) {
    width: 71%;
  }
  @media only screen and (max-width: 480px) {
    width: 94%;
  }
`;
const Button = styled(Link)`
  font-family: "gordita_regular";
  text-align: center;
  font-size: 16px;
  background-color: #56c082;
  color: #fff;
  border-radius: 6px;
  padding: 9px 28px;
  @media only screen and (max-width: 480px) {
    font-size: 15px;
    padding: 7px 20px;
  }
`;
