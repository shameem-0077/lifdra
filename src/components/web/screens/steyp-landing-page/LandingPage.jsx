import React, { lazy, useEffect } from "react";
import styled from "styled-components";
import "../../../../assets/css/web/style.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import WebHeader from "../../inludes/general/steyp-landing-page/WebHeader";
import Spotlight from "../steyp-landing-page/Spotlight";
import TechiesClub from "./TechiesClub";
import TechiesHub from "./TechiesHub";
import TechiesDegree from "./TechiesDegree";
import Challenges from "./Challenges";
import AssociatedCompanies from "./AssociatedCompanies";
import AssociatedCampus from "./AssociatedCampus";
import Testimonials from "./Testimonials";
import Introduction from "./Introduction";
import Footer from "./Footer";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import CourseLibary from "../../explore-pages/prime-program/screens/CourseLibary";
import ParentApp from "./ParentApp";
import AreYouInterested from "../../inludes/general/steyp-landing-page/AreYouInterested";
import MammookkaBanner from "../../inludes/general/steyp-landing-page/MammookkaBanner";

const LandingPage = () => {
    useEffect(() => {
        Aos.init({
            duration: 2000,
            disable: "mobile",
        });
    }, []);
    return (
        <Container id="landing-page">
            <TalropEdtechHelmet title="" />
            <WebHeader />
            <Spotlight />
            <Introduction />
            <TechiesClub />
            <TechiesHub />
            <TechiesDegree />
            {/* <PrimeProgrammes /> */}
            {/* <CourseLibary isSteyp={true} /> */}
            <Challenges />
            {/* <MammookkaBanner /> */}
            {/* <AreYouInterested /> */}
            <AssociatedCompanies />
            <AssociatedCampus type="" />
            <ParentApp />
            <Testimonials title="What our students say about us" program="" />
            <Footer />
        </Container>
    );
};

export default LandingPage;

const Container = styled.section`
    margin-top: 100px;
    @media all and (max-width: 480px) {
        margin-top: 80px;
    }
`;
