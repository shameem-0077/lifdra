import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import LeftArrow from "../../../../assets/images/school-scientist/left-arrow.svg";
import ArrowRight from "../../../../assets/images/school-scientist/arrow-right.svg";
import LineImage from "../../../../assets/images/school-scientist/bend-para.svg";
import RegisterBg from "../../../../assets/images/school-scientist/scientist-bg.png";
import OTPModal from "../../inludes/steyp-landing-page/school-scientist/OtpModal";
import SuccessModal from "../../inludes/steyp-landing-page/school-scientist/SuccessModal";
import { useSelector } from "react-redux";

function Register({ today, setProgarm }) {
    const [detailModal, setDetailModal] = useState(false);
    const [isOtpModal, setOtpModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [viewPhone, setViewPhone] = useState("");
    const history = useHistory();
    const { school_scientist_data } = useSelector((state) => state);

    return (
        <Cover>
            <OTPModal
                isOtpModal={isOtpModal}
                setOtpModal={setOtpModal}
                viewPhone={viewPhone}
                setSuccessModal={setSuccessModal}
            />
            <SuccessModal
                successModal={successModal}
                setSuccessModal={setSuccessModal}
            />
            <WrapperContainer className="wrapper">
                <SubContaienr>
                    <Left>
                        <BoyImage>
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/school-boy.png"
                                alt="Scientist Boy"
                            />
                        </BoyImage>
                    </Left>
                    <Right>
                        <Heading>Become a School Greenovator</Heading>
                        <Para>
                            A great opportunity for you to become an engineer
                            and scientist while being at school. Don't miss it!
                        </Para>
                        <Span>Register now to participate</Span>
                        {/* <BottomSection
              to={
                school_scientist_data.is_verified &&
                school_scientist_data.exam_status === "pending" &&
                today === "29-01-2023"
                  ? "/school-scientist/exam/start/"
                  : school_scientist_data.is_verified &&
                    school_scientist_data.exam_status === "attending" &&
                    today === "29-01-2023"
                  ? "/school-scientist/exam/questions/"
                  : "/school-scientist/apply/"
              }
            >
              <Button>
                {school_scientist_data.is_verified &&
                school_scientist_data.exam_status === "pending" &&
                today === "29-01-2023"
                  ? "Start Exam"
                  : school_scientist_data.is_verified &&
                    school_scientist_data.exam_status === "attending" &&
                    today === "29-01-2023"
                  ? "Continue Exam"
                  : "Register Now"}
              </Button>
              <ButtonImage>
                <img src={ArrowRight} alt="Arrow" />
              </ButtonImage>
            </BottomSection> */}
                        <BottomSection
                            // to={"/school-scientist/"}
                            onClick={() => {
                                setProgarm(true);
                            }}
                        >
                            <Button>Register Now</Button>
                            <ButtonImage>
                                <img src={ArrowRight} alt="Arrow" />
                            </ButtonImage>
                        </BottomSection>
                    </Right>
                </SubContaienr>
            </WrapperContainer>
        </Cover>
    );
}

export default Register;
const Cover = styled.div`
    background-size: 90%;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/Become-a-school-scientist.svg");
    background-position-x: 41px;
    background-repeat: no-repeat;
    background-position-y: -170px;
    @media all and (max-width: 1380px) {
        background-size: cover;
    }
    @media all and (max-width: 980px) {
        padding: 60px 0px;
        padding-top: 0;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
`;
const WrapperContainer = styled.div``;
const SubContaienr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 90px;
    padding-top: 20px;
    @media all and (max-width: 1080px) {
        padding: 55px;
    }
    @media all and (max-width: 980px) {
        display: block;
    }
    @media all and (max-width: 640px) {
        padding: 10px;
    }
`;
const Left = styled.div`
    width: 54%;
    @media all and (max-width: 980px) {
        width: 45%;
        margin-bottom: 30px;
    }
    @media all and (max-width: 640px) {
        width: 60%;
    }
    @media all and (max-width: 480px) {
        width: 80%;
        margin-bottom: 25px;
    }
`;
const BoyImage = styled.div`
    width: 65%;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1380px) {
        width: 70%;
    }
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;
const Right = styled.div`
    width: 48%;
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;
const Heading = styled.h3`
    color: #023a7f;
    font-family: "gordita_medium";
    font-size: 28px;
    margin-bottom: 15px;
    margin-right: 5px;
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const Para = styled.p`
    color: #747474;
    font-size: 16px;
    margin-bottom: 10px;
`;
const Span = styled.span`
    color: #e7be15;
    display: inline-block;
    font-size: 18px;
    font-family: "gordita_medium";
    margin-bottom: 30px;
    @media all and (max-width: 480px) {
        margin-bottom: 25px;
    }
`;
const BottomSection = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    width: 34%;
    padding: 5px 5px 5px 25px;
    background: #e7be15;
    border: 1px solid #e7be15;
    border-radius: 30px;
    position: relative;
    @media all and (max-width: 1380px) {
        width: 38%;
    }
    @media all and (max-width: 1280px) {
        width: 48%;
    }
    @media all and (max-width: 980px) {
        width: 32%;
    }
    @media all and (max-width: 768px) {
        width: 38%;
    }
    @media all and (max-width: 640px) {
        width: 43%;
    }
    @media all and (max-width: 480px) {
        width: 56%;
    }
    @media all and (max-width: 360px) {
        width: 64%;
    }
    &::before {
        content: "";
        background: url(${LeftArrow});
        position: absolute;
        width: 60px;
        height: 52px;
        display: inline-block;
        background-repeat: no-repeat;
    }
    ::after {
        content: "";
        position: absolute;
        background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/arrow-blue.svg");
        background-repeat: no-repeat;
        right: -83%;
        width: 100px;
        background-size: 70%;
        top: -46%;
        height: 100px;

        @media all and (max-width: 1080px) {
            background-size: 70%;
            right: -80%;
        }
        @media all and (max-width: 980px) {
            background-size: 70%;
            right: -81%;
        }
        @media all and (max-width: 640px) {
            right: -82%;
        }
        @media all and (max-width: 480px) {
            display: none;
        }
    }
`;
const Button = styled.button`
    color: #fff;
    font-family: "gordita_medium";
    cursor: pointer;
`;
const ButtonImage = styled.div`
    width: 35px;
    height: 35px;
    padding: 13px;
    align-items: center;
    display: flex;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 100%;
        display: block;
    }
`;
