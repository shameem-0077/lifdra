import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";
import { connect } from "react-redux";
import error404Image from "../../assets/images/404.svg";

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
  };
}

const Error404 = (props) => {
  return (
    <>
      <Outer>
        <TalropEdtechHelmet title="Page Not Found" />
        <Container>
          <InnerContainer>
            <ImageContainer>
              <Image
                alt="Error 404"
                // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/error-pages/image-404.png"
                src={error404Image}
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
    </>
  );
};

export default connect(mapStateToProps)(Error404);
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
  min-height: calc(100vh - 100px);
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
