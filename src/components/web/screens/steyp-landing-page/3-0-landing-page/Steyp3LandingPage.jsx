import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../../../../assets/css/web/style.css";
import WebHeader from "../../../inludes/general/steyp-landing-page/WebHeader";
import Footer from "../Footer";
import TrialSpotlight from "../sat/TrialSpotlight";
import JobDesk from "../new-landing-page/JobDesk";
import SatSection from "../new-landing-page/SatSection";
import BrandAmbassador from "../new-landing-page/BrandAmbassador";
import EngineeringProgram from "../new-landing-page/EngineeringProgram";
import OurSyllabus from "../new-landing-page/OurSyllabus";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import Header from "../../../../learn/includes/general/Header";

import Spotlight from "./Spotlight";
import Bento from "./Bento";
import TechRevolution from "./TechRevolution";
import IndustrialKnowledge from "./IndustrialKnowledge";
import MobailNavManu from "../../../../learn/includes/general/MobailNavManu";

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
