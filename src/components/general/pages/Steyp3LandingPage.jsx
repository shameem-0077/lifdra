import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../../assets/css/web/style.css";
import Footer from "../pages/SteypFooter";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";
import Header from "../conponents/Header";

import Spotlight from "../conponents/Spotlight";
import Bento from "../conponents/Bento";
import TechRevolution from "../conponents/TechRevolution";
import IndustrialKnowledge from "../conponents/IndustrialKnowledge";
import MobailNavManu from "../conponents/MobailNavManu";

function Steyp3LandingPage(props) {
  return (
    <>
      <TalropEdtechHelmet />
      <Container id="landing-page">
        <Header {...props} />

        <WebsiteContainer>
          <Spotlight />
          <Bento />
          <IndustrialKnowledge />
          <TechRevolution />
        </WebsiteContainer>
        <Footer />
        <MobailNavManu />
      </Container>
    </>
  );
}

export default Steyp3LandingPage;
const Container = styled.div`
  /* margin-top: 100px; */
  @media all and (max-width: 768px) {
    padding-top: 20px;
  }
  @media all and (max-width: 480px) {
    padding-top: 0px;
  }

  @media all and (max-width: 480px) {
    margin-top: 0px;
  }

  .active {
    margin-top: 0;
  }
`;

const WebsiteContainer = styled.section`
  padding: 84px 48px 0;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  @media all and (max-width: 1023px) {
    padding: 84px 16px 0;
  }
`;
