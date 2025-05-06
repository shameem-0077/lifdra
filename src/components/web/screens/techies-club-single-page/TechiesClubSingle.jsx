import React, { lazy, useEffect, useState } from "react";
import styled from "styled-components";
import Aos from "aos";
import "../../../../assets/css/web/style.css";
import "aos/dist/aos.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";

import AreYouInterested from "../../inludes/general/steyp-landing-page/AreYouInterested";
import WebHeader from "../../inludes/general/steyp-landing-page/WebHeader";
import SatTestimonials from "../steyp-landing-page/SatTestimonials";
import AssociatedCampus from "./AssociatedCampus";
import Learnings from "./Learnings";
import Offers from "./Offers";
import Spotlight from "./Spotlight";
import ParentsTestimonial from "../general/ParentsTestimonial";
import Footer from "../steyp-landing-page/Footer";
import MemberShipFee from "../general/MemberShipFee";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import TechSchoolingMembershipFee from "./TechSchoolingMembershipFee";
import EligibilityFormModal from "../../inludes/EligibilityFormModal";
import EligibilityConfirmModal from "../../inludes/EligibilityConfirmModal";
import ResponseModal from "../../inludes/ResponseModal";

const TechiesClubSingle = () => {
  const { user_profile } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

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

  const submitData = () => {
    let { access_token } = user_profile;
    setLoading(true);
    serverConfig
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
        const { status_code, data, message } = response.data;
        if (status_code === 6000) {
          if (data.is_verified) {
            setLoading(false);
            setFormModal(false);
            setResponseModal(true);
          } else {
            setLoading(false);
            setFormModal(false);
            setConfirmModal(true);
          }
        } else if (status_code === 6001) {
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
        setLoading(false);
      });
  };
  //form
  useEffect(() => {
    Aos.init({
      duration: 2000,
      disable: "mobile",
    });
  }, []);

  const weOffer = [
    {
      id: 4,
      title: "Steyp's Aptitude Test (SAT)",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/tech-schooling.svg",
      description:
        "SAT assesses the aptitude ability of the student to get eligible and become engineer through Steyp's program. Steyp filters the students and chooses who is ready and capable to become Engineers.",
    },
    {
      id: 2,
      title: "Monitor Progress Anytime",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/academic-mentoring.svg",
      description:
        "Through Steyp's edtech platform learning goals can be set and parents can monitor the progress of their children in real-time.",
    },
    {
      id: 3,
      title: "Learn In-Demand Skills",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/time-slot-selection.svg",
      description:
        "This program will enable students to develop website to mobile applications on their own.",
    },
  ];

  // 7 pillars data
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
      description: "Assistance by dedicated Students Relationship Managers.",
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
        "Apply and concrete yourself in the industry, with workshops conducted by expert engineers.",
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
      description: "Earn certificates on successfully completing a profession.",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/certification.png",
    },
  ];
  return (
    <Container className="web">
      <TalropEdtechHelmet title="Tech Schooling" />
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

      <WebHeader />
      <Spotlight
        title="Tech Schooling"
        description="A premium program for"
        addon="to become Future Engineers and Tech Scientists"
        type="School"
        extra={
          <>
            ( 5<sup>th</sup> Std to 12<sup>th</sup> Std )
          </>
        }
      />
      <Offers data={weOffer} />
      <Learnings
        data={learning}
        description="Our specially designed seven-pillar learning system ensures proper training and individual mentoring for students."
      />
      <Cover>
        <AssociatedCampus type="techies_club" />
      </Cover>
      <AreYouInterested isFormModal={isFormModal} setFormModal={setFormModal} />
      <SatTestimonials
        title="Happy Students"
        program="techies_club"
        isFormModal={isFormModal}
        setFormModal={setFormModal}
      />
      <ParentsTestimonial program="techies_club" />
      <TechSchoolingMembershipFee />
      {/* <MemberShipFee type="School" /> */}
      <Footer />
    </Container>
  );
};

export default TechiesClubSingle;

const Container = styled.section`
  margin-top: 90px;
`;
const Cover = styled.div`
  @media all and (max-width: 480px) {
    margin-top: 30px;
  }
`;
