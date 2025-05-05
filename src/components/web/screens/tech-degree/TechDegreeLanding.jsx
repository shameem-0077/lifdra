import React, { lazy, useEffect, useState } from "react";
import "../../../../assets/css/web/style.css";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";

import AreYouInterested from "../../inludes/general/steyp-landing-page/AreYouInterested";
import WebHeader from "../../inludes/general/steyp-landing-page/WebHeader";
import AssociatedCompanies from "../steyp-landing-page/AssociatedCompanies";
import Footer from "../steyp-landing-page/Footer";
import Testimonials from "../steyp-landing-page/SatTestimonials";
import Learnings from "../techies-club-single-page/Learnings";
import Offers from "../techies-club-single-page/Offers";
import Spotlight from "../techies-club-single-page/Spotlight";
// import TechDegreeMembershipFee from "./TechDegreeMembershipFee";
import TechDegreeForm from "../../inludes/general/steyp-landing-page/modal/TechDegreeForm";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import TechGradeMembershipFee from "./TechGradeMembershipFee";
import EligibilityFormModal from "../../inludes/EligibilityFormModal";
import EligibilityConfirmModal from "../../inludes/EligibilityConfirmModal";
import ResponseModal from "../../inludes/ResponseModal";
import { useSelector } from "react-redux";
import { manageConfig } from "../../../../axiosConfig";

const TechDegreeLanding = () => {
    const { user_profile } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState(user_profile?.name ? user_profile.name : "");
    const [phone, setPhone] = useState(user_profile?.phone ? user_profile.phone : "");
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
    const [isResponseModal, setResponseModal] = useState(false);

    const handleModal = () => {
        if (user_profile?.user_id) {
            navigate("/dashboard");
        } else {
            navigate({
                pathname: location.pathname,
                search: `action=login`,
            });
        }
    };

    const submitData = () => {
        let { access_token } = user_profile;
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
    useEffect(() => {
        Aos.init({
            duration: 2000,
            disable: "mobile",
        });
    }, []);

    const topics = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/training.svg",
            title: "Full Stack Development ",
            description: `Imparting all the required skills for developing websites, web applications, mobile applications, ERP, etc. to work proficiently in real-world projects.`,
        },

        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/rocket.svg",
            title: "Tech Entrepreneurship ",
            description: `Provides training to students, to co-found tech startups and become future Tech Entrepreneurs.
            `,
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/green-rocket.svg",
            title: "Soft Skills Development ",
            description: `Building a resume, giving mock interviews and developing soft skills required for working as part of a company.`,
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/25-09-2021/offline-training.svg",
            title: "Offline Internship",
            description: `Providing offline internships through our centres across Kerala.
            `,
        },
        {
            id: 5,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/placement.svg",
            title: "Placement Assurance",
            description: `Assured placement in our associate companies based on the qualification and performance of the candidates.`,
        },
    ];
    const learning = [
        {
            id: 1,
            title: "E-Learning",
            description:
                "Learning is made as easy as it can get. Learn whenever, wherever.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/e-learning.png",
        },
        {
            id: 2,
            title: "Support",
            description:
                "Support for doubts and queries, because asking is learning.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/support.png",
        },
        {
            id: 3,
            title: "Followup",
            description:
                "Assistance by dedicated Students Relationship Managers.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/followup.png",
        },
        {
            id: 4,
            title: "Practice",
            description:
                "To polish skills and become industry ready, timely pratice is provided ",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/practice.png",
        },
        {
            id: 5,
            title: "Workshop",
            description:
                "Apply and concrete yourself in theindustry, with workshops conducted by expert engineers.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/workshop.png",
        },
        {
            id: 6,
            title: "Assessment",
            description:
                "Evaluate and know where you stand with regular assessments. ",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/assesments.png",
        },
        {
            id: 7,
            title: "Certification",
            description:
                "Earn certificates on successfully completing a profession.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/certification.png",
        },
        {
            id: 8,
            title: "Placement Assurance",
            description:
                "Assured placement in our associate companies based on the qualification and performance of the candidates.",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/placement.png",
        },
    ];
    return (
        <Container className="web">
            <TalropEdtechHelmet title="Tech Grad" />
            <WebHeader isTechDegree={true} />
            <EligibilityFormModal
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

            <TechDegreeForm />
            <Spotlight
                title="Tech Grad"
                description="A six-month full-time internship program for "
                type="Graduates"
            />
            <Offers data={topics} />
            <Learnings
                data={learning}
                description="Our specially designed  learning system ensures proper training and individual mentoring for students."
            />
            <Testimonials
                title="Happy Students"
                program="techies_degree"
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            <AreYouInterested
                isFormModal={isFormModal}
                setFormModal={setFormModal}
            />
            <AssociatedCompanies />
            {/* <TechDegreeMembershipFee /> */}
            <TechGradeMembershipFee />
            <Footer />
        </Container>
    );
};

export default TechDegreeLanding;
const Container = styled.div`
    margin-top: 90px;
`;
