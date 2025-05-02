import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../assets/css/web/style.css";
import Footer from "./steyp-landing-page/Footer";
import AboutSpotlight from "../inludes/AboutSpotlight";
import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
import MammookkaBanner from "../inludes/general/steyp-landing-page/MammookkaBanner";
import Backborns from "../inludes/Backborns";
import OurTeam from "../inludes/OurTeam";
import $ from "jquery";
export default function AboutUs() {
    const [about, setAbout] = useState(false);
    useEffect(() => {
        Aos.init({
            duration: 2000,
        });
    }, []);

    useEffect(() => {
        $("body").addClass("flow-enabled");
        return () => {
            $("body").removeClass("flow-enabled");
        };
    }, []);
    useEffect(() => {
        setAbout(true);
    }, [about]);
    return (
        <>
            <Container className="wrapper">
                <WebHeader about={about} />
                <AboutSpotlight />
            </Container>
            {/* <MammookkaBanner /> */}
            {/* <Container className="wrapper">
                <Backborns />
                <OurTeam />
            </Container> */}
            <Footer />
        </>
    );
}
const Container = styled.div``;
