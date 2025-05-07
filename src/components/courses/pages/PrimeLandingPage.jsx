import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";
import WebHeader from "../../web/inludes/general/steyp-landing-page/WebHeader";
import Footer from "../../web/screens/steyp-landing-page/Footer";
import CourseLibary from "./CourseLibary";
import DescriptionSections from "./DescriptionSections";
import OurCourse from "./OurCourse";
import Pricing from "./Pricing";
import PrimeSpotlight from "./PrimeSpotlight";
import PrimeProgramFAQ from "./PrimeProgramFAQ";
import SubscriptionBanner from "./SubscriptionBanner";
import PrimeSubcribeModal from "../../web/explore-pages/prime-program/Modals/PrimeSubcribeModal";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import useUserStore from "../../../store/userStore";

// import Header from "../../general/Header";

function PrimeLandingPage() {
    const location = useLocation();
    const { user_profile } = useAuthStore();
    const [action, setAction] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        setAction("");
        navigate(location.pathname);
    };

    useEffect(() => {
        if (user_profile) {
            if (user_profile.prime_program_subscription) {
                if (
                    user_profile.prime_program_subscription.is_subscription &&
                    !user_profile.prime_program_subscription.is_expired
                ) {
                    navigate(`/prime-programs/courses/`);
                }
            }
        }
    }, []);

    useEffect(() => {
        let { search } = location;
        const values = queryString.parse(search);
        const action = values.action;
        setAction(action);
    }, [location.search]);

    return (
        <Container>
            <PrimeSubcribeModal action={action} closeModal={closeModal} />
            <TalropEdtechHelmet title="Prime Programs" />
            <WebHeader />
            <PrimeSpotlight />
            <DescriptionSections
                img_right={false}
                bgc={"#fff"}
                section={"learn"}
                image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/course.png"
            />
            <CourseLibary />
            <DescriptionSections
                img_right={false}
                bgc={"#fff"}
                section={"pricing"}
                image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/price.png"
                points={[
                    { point: "Well-curated courses" },
                    { point: " Minimal cost" },
                ]}
            />
            <DescriptionSections
                img_right={true}
                bgc={"#F7FBF6"}
                section={"limits"}
                image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/limits.png"
                points={[
                    { point: "Unlimited learning hours" },
                    { point: "Learn as many courses" },
                ]}
            />
            <DescriptionSections
                img_right={false}
                bgc={"#fff"}
                section={"future_course"}
                image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/future.svg"
                points={[
                    { point: "Access to newly added courses" },
                    { point: "No extra charge" },
                ]}
            />
            {/* <About /> */}
            <Pricing />
            <OurCourse />
            <SubscriptionBanner />
            <PrimeProgramFAQ />
            <Footer />
        </Container>
    );
}

export default PrimeLandingPage;

const Container = styled.div``;
