import React from "react";
import styled from "styled-components";
import "../../../../../assets/css/web/style.css";
import WebHeader from "../../../inludes/general/steyp-landing-page/WebHeader";
import Footer from "../Footer";
import TrialSpotlight from "../sat/TrialSpotlight";
import JobDesk from "./JobDesk";
import SatSection from "./SatSection";
import BrandAmbassador from "./BrandAmbassador";
import EngineeringProgram from "./EngineeringProgram";
import OurSyllabus from "./OurSyllabus";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

function SteypLandingPage() {
  return (
    <>
      <TalropEdtechHelmet />
      <Container id="landing-page">
        {/* <ScholarshipBanner /> */}
        {/* <Banner /> */}
        <WebHeader isSat />
        {/* <ScholarshipBannerMobile /> */}

        {/* <NewSpotling /> */}
        <TrialSpotlight />
        <SatSection />
        <JobDesk />
        {/* <Intenship /> */}
        <EngineeringProgram />
        {/* <BrandAmbassador /> */}
        <OurSyllabus />
        {/* <SteypTestimonial program="techies_degree" /> */}
        {/* <Testimonial /> */}
        <Footer />
      </Container>
    </>
  );
}

export default SteypLandingPage;
const Container = styled.div`
  /* margin-top: 100px; */
  padding-top: 35px;
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
