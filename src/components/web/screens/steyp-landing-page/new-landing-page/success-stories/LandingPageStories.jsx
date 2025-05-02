import React, { useEffect, useState } from "react";
import WebHeader from "../../../../inludes/general/steyp-landing-page/WebHeader";
import styled from "styled-components";
import Aos from "aos";
import $ from "jquery";
import StoriesSpotlight from "../../../../inludes/steyp-landing-page/new-landing-page/success-stories/StoriesSpotlight";
import "aos/dist/aos.css";
import "../../../../../../assets/css/web/style.css";
import StudentStories from "../../../../inludes/steyp-landing-page/new-landing-page/success-stories/StudentStories";
import HowToCode from "../../../../inludes/steyp-landing-page/new-landing-page/success-stories/HowToCode";
import SteypMedia from "../../../../inludes/steyp-landing-page/new-landing-page/success-stories/SteypMedia";
import Customers from "../../../../inludes/steyp-landing-page/new-landing-page/success-stories/Customers";
import Footer from "../../Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { learnConfig } from "../../../../../../axiosConfig";
import RouteLoading from "../../../../../routing/RouteLoading";

function LandingPageStories() {
    const [about, setAbout] = useState(false);
    const [media, setMedia] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [testimonial, setTestimonial] = useState([]);
    const [story, setStory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        $("body").addClass("flow-enabled");
        return () => {
            $("body").removeClass("flow-enabled");
        };
    }, []);
    useEffect(() => {
        setAbout(true);
    }, [about]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiEndpoints = [
                    "promotions/success-stories/?story_type=in_media",
                    "promotions/success-stories/?story_type=featured",
                    "promotions/success-stories/?story_type=testimonial",
                    "promotions/success-stories/?story_type=story",
                ];

                const responsePromises = apiEndpoints.map(async (endpoint) => {
                    try {
                        const response = await learnConfig.get(endpoint);
                        return response.data;
                    } catch (error) {
                        console.log(error);
                        return { StatusCode: 0, data: [] };
                    }
                });

                const responses = await Promise.allSettled(responsePromises);

                responses.forEach((response, index) => {
                    setLoading(true);
                    const { StatusCode, data } = response.value;
                    if (StatusCode === 6000) {
                        switch (index) {
                            case 0:
                                setMedia(data);
                                break;
                            case 1:
                                setFeatured(data);
                                break;
                            case 2:
                                setTestimonial(data);
                                break;
                            case 3:
                                setStory(data);
                                break;
                            default:
                                setLoading(false);
                                break;
                        }
                    }
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            {loading ? (
                <Cover>
                    <RouteLoading />
                </Cover>
            ) : (
                <>
                    <WebHeader about={about} />
                    <StoriesSpotlight featured={featured} />
                    <StudentStories story={story} />
                    <HowToCode testimonial={testimonial} />
                    <SteypMedia media={media} />
                    <Customers />
                    <Footer />
                </>
            )}
        </Container>
    );
}

export default LandingPageStories;

const Container = styled.div`
    overflow-x: hidden;
`;

const Cover = styled.div`
    height: 100vh;
`;
