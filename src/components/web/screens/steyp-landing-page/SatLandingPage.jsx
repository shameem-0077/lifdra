import React, { lazy, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../../../../assets/css/web/style.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import WebHeader from "../../inludes/general/steyp-landing-page/WebHeader";
import SatSpotlight from "./SatSpotlight";
import Eligibility from "./Eligibility";
import WhoCanJoin from "./WhoCanJoin";
import SatTestimonials from "./SatTestimonials";
import NewIntroduction from "./NewIntroduction";
import Footer from "./Footer";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import Restriction from "../steyp-landing-page/Restriction";
import Selection from "../steyp-landing-page/Selection";
import EligibilityFormModal from "../../inludes/EligibilityFormModal";
import EligibilityConfirmModal from "../../inludes/EligibilityConfirmModal";
import ResponseModal from "../../inludes/ResponseModal";
import Sat from "./Sat";
import Students from "./Students";
import CourseLibary from "../../explore-pages/prime-program/screens/CourseLibary";
// import SatIntroduction from "./SatIntroduction";
import SatCourseLibrary from "./SatCourseLibrary";
import { manageConfig } from "../../../../axiosConfig";
import { useSelector } from "react-redux";
import SatCampusModal from "../../inludes/SatCampusModal";
import NewSpotling from "./sat/NewSpotling";
import EngineeringProgram from "./sat/EngineeringProgram";

const SatLandingPage = () => {
    const user_data = useSelector((state) => state.user_data);

    const [name, setName] = useState(user_data.name ? user_data.name : "");
    const [phone, setPhone] = useState(user_data.phone ? user_data.phone : "");
    const [selectedClass, setSelectedClass] = useState("");
    const [studentType, setStudentType] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [nameError, setnameError] = useState(false);
    const [phoneError, setphoneError] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState("");
    const [isFormModal, setFormModal] = useState(false);
    const [isConfirmModal, setConfirmModal] = useState(false);
    const [isCampusModal, setCampusModal] = useState(false);
    const [isResponseModal, setResponseModal] = useState(false);

    const introducingRef = useRef(null);
    const executeScroll = () => introducingRef.current.scrollIntoView();

    useEffect(() => {
        Aos.init({
            duration: 2000,
            disable: "mobile",
        });
    }, []);

    const submitData = () => {
        let { access_token } = user_data;
        setLoading(true);
        manageConfig
            .post(
                `web/eligility-enquiry/enter/
				`,
                {
                    name: name,
                    country: selectedCountry.web_code,
                    phone: phone,
                    category: studentType,
                    class: selectedClass,
                    district: selectedDistrict,
                },
                {
                    headers: {
                        Authorization: "Bearer " + access_token,
                    },
                }
            )
            .then((response) => {
                const { StatusCode, data, message } = response.data;
                if (StatusCode === 6000) {
                    if (data.is_verified) {
                        setLoading(false);
                        setFormModal(false);
                        setResponseModal(true);
                    } else {
                        setLoading(false);
                        setFormModal(false);
                        setConfirmModal(true);
                    }
                } else if (StatusCode === 6001) {
                    if (name === "") {
                        setnameError(true);
                    }
                    if (phone === "") {
                        setphoneError(true);
                    }
                    setErrorMessage(data.message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setName("");
                setPhone("");
                setSelectedClass("");
                setStudentType("");
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <Container id="landing-page">
            <TalropEdtechHelmet title="Sat" />
            <WebHeader isSat />
            <SatSpotlight
                executeScroll={executeScroll}
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            {/* <NewSpotling /> */}
            {/* <EngineeringProgram /> */}
            <NewIntroduction introducingRef={introducingRef} />
            <Sat
                isFormModal={isFormModal}
                setFormModal={setFormModal}
                isCampusModal={isCampusModal}
                setCampusModal={setCampusModal}
            />
            {/* <SatIntroduction
				isFormModal={isFormModal}
				setFormModal={setFormModal}
			/> */}
            <Students isFormModal={isFormModal} setFormModal={setFormModal} />
            <WhoCanJoin isFormModal={isFormModal} setFormModal={setFormModal} />
            <Eligibility
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            <Selection isFormModal={isFormModal} setFormModal={setFormModal} />
            <Restriction
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            {/* <SatCourseLibrary /> */}

            <SatTestimonials
                title="What our students say about us"
                program=""
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            <SatCampusModal
                isCampusModal={isCampusModal}
                setCampusModal={setCampusModal}
                setFormModal={setFormModal}
            />

            <EligibilityFormModal
                setCampusModal={setCampusModal}
                isFormModal={isFormModal}
                setFormModal={setFormModal}
                setConfirmModal={setConfirmModal}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                studentType={studentType}
                setStudentType={setStudentType}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                submitData={submitData}
                isLoading={isLoading}
                setLoading={setLoading}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                nameError={nameError}
                setnameError={setnameError}
                setphoneError={setphoneError}
                phoneError={phoneError}
            />
            <EligibilityConfirmModal
                isFormModal={isFormModal}
                setFormModal={setFormModal}
                isConfirmModal={isConfirmModal}
                setConfirmModal={setConfirmModal}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                studentType={studentType}
                setStudentType={setStudentType}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setResponseModal={setResponseModal}
                otp={otp}
                setOtp={setOtp}
                submitData={submitData}
                isLoading={isLoading}
                setLoading={setLoading}
                otpErrorMessage={otpErrorMessage}
                setOtpErrorMessage={setOtpErrorMessage}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                setSelectedDistrict={setSelectedDistrict}
            />
            <ResponseModal
                isFormModal={isFormModal}
                setFormModal={setFormModal}
                isConfirmModal={isConfirmModal}
                setConfirmModal={setConfirmModal}
                isResponseModal={isResponseModal}
                setResponseModal={setResponseModal}
            />

            <Footer />
        </Container>
    );
};

export default SatLandingPage;

const Container = styled.section`
    margin-top: 100px;
    @media all and (max-width: 480px) {
        margin-top: 80px;
    }
`;
