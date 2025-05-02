import React, { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import WebHeader from "../../../inludes/general/steyp-landing-page/WebHeader";
import Footer from "../../../screens/steyp-landing-page/Footer";
import TechHeros from "./TechHeros";
import VacationSpotlight from "./VacationSpotlight";
import VacationStudyMethods from "./VacationStudyMethods";
import VacationPricing from "./VacationPricing";
import VacationFAQSection from "./VacationFaqSection";
import VacationSyllabus from "./VacationSyllabus";

function VacationLandingPage() {
    useEffect(() => {
        Aos.init({
            duration: 2000,
            disable: "mobile",
        });
    }, []);

    return (
        <Container>
            <TalropEdtechHelmet title="Vacation program" />
            <WebHeader clubs={true} />
            <VacationSpotlight />
            <TechHeros type="vacation" />
            <VacationStudyMethods />
            <VacationSyllabus />
            <VacationPricing />
            <VacationFAQSection />
            <Footer />
        </Container>
    );
}

export default VacationLandingPage;

const Container = styled.div``;
