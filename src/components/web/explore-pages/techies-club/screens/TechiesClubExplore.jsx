import React from "react";
import styled from "styled-components";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import WebHeader from "../../../inludes/general/steyp-landing-page/WebHeader";
import Footer from "../../../screens/steyp-landing-page/Footer";
import Header from "../../general/Header";
import FAQSection from "./FAQSection";
import Membership from "./Membership";
import Spotlight from "./Spotlight";
import StudyMethods from "./StudyMethods";
import Syllabus from "./Syllabus";
import TechHeros from "./TechHeros";

const TechiesClubExplore = () => {
    return (
        <Container>
            {/* <Header /> */}
            <TalropEdtechHelmet title="Techies Club" />
            <WebHeader clubs={true} />
            <Spotlight />
            <TechHeros type="general" />
            <StudyMethods />
            <Syllabus />
            <Membership type="general" />
            <FAQSection type="general" />
            <Footer />
        </Container>
    );
};

export default TechiesClubExplore;

const Container = styled.div``;
