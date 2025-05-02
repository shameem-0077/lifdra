import React from "react";
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import styled from "styled-components";

import "../../../../assets/css/web.css";

function ScheduledMaintenance() {
  return (
    <Container className="wrapper">
      <Header>
        <ImageContainer>
          <LogoLink to="/">
            <Logo
              className="thumb"
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
              alt="Steyp-logo"
            />
          </LogoLink>
        </ImageContainer>
      </Header>
      <Content>
        <MaintenanceContainer>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-06-2024/maintenance.svg"
            alt="maintenance"
          />
        </MaintenanceContainer>
        <Heading>We are under scheduled maintenance</Heading>
        <h4>We will be right back online soon.</h4>
      </Content>
    </Container>
  );
}

export default ScheduledMaintenance;
const Container = styled.section`
  width: 85%;
  margin: 0 auto;
  max-width: 1325px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
`;
const ImageContainer = styled.h1`
  width: 100px;
  @media only screen and (max-width: 425px) {
    width: 85px;
  }
`;

const LogoLink = styled(Link)`
  display: block;
  cursor: pointer;
`;
const Logo = styled.img`
  display: block;
  width: 100%;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  h4 {
    font-family: "gordita_regular";
    font-size: 20px;
    color: #697586;
  }
  @media only screen and (max-width: 768px) {
    h4 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 425px) {
    h4 {
      font-size: 14px;
    }
  }
`;
const MaintenanceContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  @media only screen and (max-width: 768px) {
    width: 55%;
  }
`;
const Heading = styled.h1`
  font-family: "gordita_bold";
  font-size: 30px;
  text-transform: capitalize;
  margin: 10px 0;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
  @media only screen and (max-width: 425px) {
    font-size: 20px;
  }
`;
