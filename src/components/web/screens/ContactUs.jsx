import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../assets/css/web/style.css";
import Footer from "./steyp-landing-page/Footer";
import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
import { serverConfig } from "../../../axiosConfig";
import { useSelector } from "react-redux";
import CountrySelector from "../../learn/includes/authentication/general/CountrySelector";
import CartLoader from "../../merchandise/includes/loaders/CartLoader";
import { useHistory } from "react-router-dom";
import ContactUsOptModal from "../inludes/general/steyp-landing-page/modal/ContactUsOtpModal";
import ContactFormSuccessModal from "../inludes/general/steyp-landing-page/modal/ContactFormSuccessModal";

export default function ContactUs() {
    const [about, setAbout] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [mobile, setMobile] = useState("");
    const [info, setInfo] = useState("");
    const [countryselector, setCountryselector] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const user_data = useSelector((state) => state.user_data);
    const { access_token } = user_data;
    const [isError, setIsError] = useState(false);
    const [isToast, setToast] = useState(false);
    const [isOtpModal, setOtpModal] = useState(false);
    const [isFormSuccessModal, setFormSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessModal, setSuccessModal] = useState(false);
    const [toastType, setToastType] = useState([
        {
            value: "success",
            type: "success",
        },
        {
            value: "failed",
            type: "failed",
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 3000);
    }, [isToast]);
    const history = useHistory();

    const [errors, setErrors] = useState({
        name: false,
        mail: false,
        info: false,
        mobile: false,
    });
    const handleShow = () => {
        setCountryselector((prevValue) => !prevValue);
    };

    const onSelectHandler = (selected) => {
        setSelectedCountry(selected);
    };

    useEffect(() => {
        setAbout(true);
        Aos.init({
            duration: 2000,
        });
    }, []);

    const onNameChange = (e) => {
        const re = /^[a-zA-Z\. ]*$/;
        if (e.target.value === "" || re.test(e.target.value))
            setName(e.target.value);
        setErrors(" ");
    };

    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setMobile(e.target.value);
            setErrors("");
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        setLoading(true);

        let isError = false;
        setToast(false);
        setErrors({
            name: false,
            mail: false,
            info: false,
            mobile: false,
        });
        if (!name) {
            setErrors((prev) => ({ ...prev, name: true }));
            isError = true;
            setLoading(false);
        }
        if (!mail) {
            setErrors((prev) => ({ ...prev, mail: true }));
            isError = true;
            setLoading(false);
        }
        if (!mobile) {
            setErrors((prev) => ({ ...prev, mobile: true }));
            isError = true;
            setLoading(false);
        }
        if (!info) {
            setErrors((prev) => ({ ...prev, info: true }));
            isError = true;
            setLoading(false);
        }

        if (!isError) {
            serverConfig

                .post(
                    `web/submit/contact-enquiry/`,
                    {
                        name: name,
                        email: mail,
                        query: info,
                        country: selectedCountry.web_code,
                        phone: mobile,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setToast(true);
                        setLoading(false);
                        if (response.data.is_verified) {
                            history.push("/contact-us/");
                            setMobile("");
                            setLoading(false);
                        } else {
                            setOtpModal(true);
                            setLoading(false);
                        }
                    } else if (status_code === 6001) {
                        setIsError(true);
                        setToast(true);
                        setLoading(false);
                        setErrorMessage(data.message);
                    } else {
                        setIsError(true);
                        setToast(true);
                        setToastType();
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setIsError(true);
                    setToastType();
                    setToast(true);
                    setLoading(false);
                });
        }
    };
    const ref = useRef();

    return (
        <>
            <ContactFormSuccessModal
                isSuccess={isFormSuccessModal}
                setSuccess={setFormSuccessModal}
                setMobile={setMobile}
                setName={setName}
                setMail={setMail}
                setInfo={setInfo}
            />
            <CountrySelector
                show={countryselector}
                handleClick={handleShow}
                onSelectHandler={onSelectHandler}
                selectedCountry={selectedCountry}
            />
            <ContactUsOptModal
                isOtpModal={isOtpModal}
                setOtpModal={setOtpModal}
                selectedCountry={selectedCountry}
                mobile={mobile}
                setMobile={setMobile}
                setSuccessModal={setSuccessModal}
                setFormSuccessModal={setFormSuccessModal}
            />
            <WebHeader about={about} />
            <Container className="wrapper">
                <Toast toastType={toastType} isError={isError} active={isToast}>
                    <IconContainer>
                        {isError ? (
                            <Icon
                                src={require("../../../assets/images/web/cross.svg")}
                                alt="image"
                            />
                        ) : (
                            <Icon
                                src={require("../../../assets/images/web/checked.svg")}
                                alt="image"
                            />
                        )}
                    </IconContainer>
                    <ToastText isError={isError}>
                        {isError
                            ? "An error occured, please try again"
                            : "Successfully sent"}
                    </ToastText>
                </Toast>
                <Contents>
                    <Left data-aos="fade-right">
                        <ImageContainer>
                            <Image
                                src={require("../../../assets/images/web/background-prime.png")}
                                alt="back"
                            />
                        </ImageContainer>
                        <ImageContainerResponse>
                            <Image
                                src={require("../../../assets/images/web/background-prime.png")}
                                alt="back"
                            />
                        </ImageContainerResponse>
                        <Heading>Contact Us</Heading>
                        <Para>
                            Have any questions? We'd love to hear from you.
                        </Para>
                        <ResponsiveTop>
                            <ContactImageContainer>
                                <ContactImage
                                    src={require("../../../assets/images/web/contactus.svg")}
                                    alt="Image"
                                />
                            </ContactImageContainer>
                        </ResponsiveTop>
                        <FormContainer onSubmit={sendMessage}>
                            <Field>
                                {errors.name ? (
                                    <ErrorText className="b-medium">
                                        This field is required
                                    </ErrorText>
                                ) : null}
                                <Mandatory>
                                    <Label>Full Name</Label>
                                    <Star>*</Star>
                                </Mandatory>

                                <InputField
                                    type="text"
                                    placeholder="Enter your name"
                                    id="name"
                                    value={name}
                                    onChange={onNameChange}
                                />
                            </Field>
                            <Field>
                                {errors.mail ? (
                                    <ErrorText className="b-medium">
                                        This field is required
                                    </ErrorText>
                                ) : null}
                                <Mandatory>
                                    <Label>Email</Label>
                                    <Star>*</Star>
                                </Mandatory>
                                <InputField
                                    placeholder="Enter your email"
                                    className="form"
                                    type="email"
                                    onChange={(e) => {
                                        setMail(e.target.value);
                                    }}
                                    value={mail}
                                />
                            </Field>
                            <Field>
                                {errors.mobile ? (
                                    <ErrorText className="b-medium">
                                        This field is required
                                    </ErrorText>
                                ) : null}
                                <Mandatory>
                                    <Label>Phone Number </Label>
                                    <Star>*</Star>
                                </Mandatory>
                                <NumberDiv>
                                    <Flag
                                        onClick={() =>
                                            setCountryselector(!countryselector)
                                        }
                                    >
                                        <img
                                            src={selectedCountry.flag}
                                            alt={selectedCountry.name}
                                        />
                                    </Flag>
                                    <CountryArrow
                                        onClick={() =>
                                            setCountryselector(!countryselector)
                                        }
                                    >
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                                            alt="Arrow"
                                        />
                                    </CountryArrow>
                                    <Code>{selectedCountry.phone_code}</Code>
                                    <NumberInput
                                        type="tel"
                                        placeholder="Enter phone number"
                                        id="number"
                                        value={mobile}
                                        maxLength="14"
                                        onChange={onChange}
                                    />
                                </NumberDiv>
                            </Field>
                            <Field>
                                {errors.info ? (
                                    <ErrorText className="b-medium">
                                        This field is required
                                    </ErrorText>
                                ) : null}
                                <Mandatory>
                                    <Label>How can we help you?</Label>
                                    <Star>*</Star>
                                </Mandatory>

                                <Area>
                                    <Input
                                        className="areas"
                                        onChange={(e) => {
                                            setInfo(e.target.value);
                                        }}
                                        type="textarea"
                                        placeholder="I would like to know about..."
                                        value={info}
                                    >
                                        {info}
                                    </Input>
                                </Area>
                            </Field>
                            <ButtonContainer>
                                <Button type="submit">
                                    {isLoading ? (
                                        <CartLoader />
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </ButtonContainer>
                        </FormContainer>
                    </Left>
                    <Right data-aos="fade-left">
                        <TransitionContainer>
                            <Top>
                                <ContactImageContainer>
                                    <ContactImage
                                        src={require("../../../assets/images/web/contactus.svg")}
                                        alt="Image"
                                    />
                                </ContactImageContainer>
                            </Top>
                            <Bottom>
                                <AddressContainer>
                                    <AddressLabel>Address</AddressLabel>
                                    <Address>
                                        Steyp Private Limited, <br />
                                        #208, 2nd Floor,
                                        <br /> HiLITE Platino,
                                        <br /> Shankar Nagar Road, Maradu,
                                        <br /> Kakkanad, Kerala,
                                        <br /> India - 682304
                                    </Address>
                                </AddressContainer>
                                <ContactContainer>
                                    <AddressLabel>Connect Now</AddressLabel>
                                    <PhoneLinks href="tel:+91 858 999 8874">
                                        +91 858 999 8874
                                    </PhoneLinks>
                                    <MailLinks href="mailto:hello@steyp.com">
                                        hello@steyp.com
                                    </MailLinks>
                                    <SocialMedia>
                                        <SocialLinks
                                            target="_blank"
                                            href="https://www.instagram.com/steypworld/"
                                        >
                                            <img
                                                className="prime
                                "
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/instagram-color.svg"
                                                }
                                                alt=""
                                            />
                                            <img
                                                className="secondry"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/instagram.svg"
                                                }
                                                alt=""
                                            />
                                        </SocialLinks>
                                        <SocialLinks
                                            target="_blank"
                                            href="https://www.facebook.com/steypworld/"
                                        >
                                            <img
                                                className="prime"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/facebook-color.svg"
                                                }
                                                alt=""
                                            />
                                            <img
                                                className="secondry"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/facebook.svg"
                                                }
                                                alt=""
                                            />
                                        </SocialLinks>
                                        <SocialLinks
                                            target="_blank"
                                            href="https://twitter.com/steypworld/"
                                        >
                                            <img
                                                className="prime"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx-black.svg"
                                                }
                                                alt=""
                                            />
                                            <img
                                                className="secondry"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx.svg"
                                                }
                                                alt=""
                                            />
                                        </SocialLinks>
                                        <SocialLinks
                                            target="_blank"
                                            href="https://www.linkedin.com/company/steyp/"
                                        >
                                            <img
                                                className="prime"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/linkedin-color.svg"
                                                }
                                                alt=""
                                            />
                                            <img
                                                className="secondry"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/linkedin.svg"
                                                }
                                                alt=""
                                            />
                                        </SocialLinks>
                                        <SocialLinks
                                            target="_blank"
                                            href="https://www.youtube.com/c/steyp/"
                                        >
                                            <img
                                                className="prime"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/youtube-color.svg"
                                                }
                                                alt=""
                                            />
                                            <img
                                                className="secondry"
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/youtube.svg"
                                                }
                                                alt=""
                                            />
                                        </SocialLinks>
                                    </SocialMedia>
                                </ContactContainer>
                            </Bottom>
                        </TransitionContainer>
                    </Right>
                </Contents>
            </Container>
            <Footer />
        </>
    );
}

const IconContainer = styled.div`
    width: 28px;
    margin-right: 10px;
    @media all and (max-width: 480px) {
        width: 21px;
    }
`;
const Icon = styled.img`
    width: 100%;
    display: block;
`;
const Toast = styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transform: translateX(50%);
    padding: 13px 25px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    z-index: 501;
    right: 50%;
    bottom: ${(props) => (props.active ? "66px" : "66px")};
    display: ${(props) => (props.active ? "flex" : "none")};
    transition: all 0.2s ease;
    font-size: 17px;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    @media all and (max-width: 360px) {
        bottom: ${(props) => (props.active ? "-249px" : "-249px")};
    }
`;
const P = styled.p`
    color: red;
    font-size: 16px;
    text-align: right;
`;
const ToastText = styled.span`
    transform: translateY(2px);
    color: ${(props) => (props.isError ? "#ff4106" : " #4aa76f")};
    font-size: 21px;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
const Mandatory = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    font-family: baloo_paaji_2semibold;
`;
const ErrorText = styled.span`
    font-size: 14px;
    position: absolute;
    left: 0;
    color: #f46565;
    bottom: -25px;
    @media (max-width: 480px) {
        font-size: 13px;
        bottom: -26px;
    }
`;
const Star = styled.div`
    margin-left: 10px;
    color: red;
    font-size: 17px;
    height: 24px;
`;

const Container = styled.div``;
const ResponsiveTop = styled.div`
    margin-bottom: 60px;
    display: none;
    @media all and (max-width: 980px) {
        display: block;
        width: 81%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 35px;
    }
`;
const TransitionContainer = styled.div`
    transform: translateY(51px);
    @media all and (max-width: 980px) {
        transform: translateY(0px);
    }
`;
const Contents = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 35px;
    padding-bottom: 46px;
    @media all and (max-width: 980px) {
        flex-direction: column;
        padding-top: 0px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 30px;
    }
`;
const ImageContainer = styled.div`
    position: absolute;
    opacity: 0.8;
    z-index: -1;
    width: 245px;
    top: -40px;
    left: -120px;
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const ImageContainerResponse = styled.div`
    display: none;
    @media all and (max-width: 980px) {
        z-index: -1;
        display: block;
        width: 300px;
        transform: translateY(63%);
    }
    @media all and (max-width: 480px) {
        width: 240px;
        transform: translateY(71%);
    }
`;
const Image = styled.img`
    width: 100%;
    display: block;
`;
const Left = styled.div`
    width: 48%;
    position: relative;
    @media all and (max-width: 980px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -70px;
    }
`;
const Heading = styled.h2`
    font-size: 36px;
    font-family: gordita_medium;
    color: #212121;
    margin-bottom: 6px;
    @media all and (max-width: 980px) {
        text-align: center;
    }
    @media all and (max-width: 480px) {
        font-size: 30px;
    }
`;
const Para = styled.p`
    letter-spacing: 0.01rem;
    margin-bottom: 35px;
    color: #868686;
    line-height: 1.8;
    font-size: 15px;
    @media all and (max-width: 980px) {
        text-align: center;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
        font-size: 15px;
    }
`;
const FormContainer = styled.form`
    border: 2.5px solid #f3f0f0;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    @media all and (max-width: 1050px) {
        padding: 25px;
    }
    @media all and (max-width: 980px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        padding: 29px 12px;
    }
`;
const Field = styled.div`
    margin-bottom: 34px;
    color: #696969;
    position: relative;
`;
const Label = styled.div`
    margin-bottom: 4px;
    font-family: "gordita_medium";
    font-size: 16px;
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const InputField = styled.input`
    border: 2.5px solid #f3f0f0;
    color: rgb(0 0 0);
    padding: 9px 12px;
    background: #f9f9f9;
    border-radius: 10px;
    font-size: 15px;
    width: 100%;
    @media all and (max-width: 480px) {
        padding: 6px 8px;
        font-size: 14px;
    }
`;

const Area = styled.div``;
const Input = styled.textarea`
    border: 2.5px solid #f3f0f0;
    padding: 9px 12px;
    background: #f9f9f9;
    border-radius: 10px;
    font-size: 15px;
    max-width: 100%;
    min-width: 100%;
    min-height: 135px;
    max-height: 135px;
    color: rgb(0 0 0);
    @media all and (max-width: 480px) {
        padding: 6px 8px;
        font-size: 14px;
    }
`;
const Button = styled.button`
    padding: 10px 12px;
    background: #118a48bf;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: "gordita_medium";
    font-size: 15px;
    cursor: pointer;
    width: 136px;
    height: 41px;
    @media all and (max-width: 480px) {
        padding: 9px 10px;
        font-size: 14px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Right = styled.div`
    width: 48%;
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;
const Top = styled.div`
    text-align: center;
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const ContactImageContainer = styled.div`
    width: 66%;
    margin: 0 auto;
    @media all and (max-width: 480px) {
        width: 81%;
    }
`;
const ContactImage = styled.img`
    display: block;
    width: 100%;
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    @media all and (max-width: 1100px) {
        justify-content: space-between;
    }
    @media all and (max-width: 980px) {
        justify-content: space-evenly;
    }
    @media all and (max-width: 540px) {
        flex-direction: column;
    }
`;
const AddressContainer = styled.div`
    width: 255px;
    @media all and (max-width: 980px) {
        margin-right: 11px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 15px;
        margin-right: 0px;
    }
    @media all and (max-width: 540px) {
        margin-bottom: 27px;
    }
`;
const AddressLabel = styled.div`
    font-family: "gordita_medium";
    margin-bottom: 15px;
    @media all and (max-width: 4640px) {
        margin-bottom: 11px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 8px;
    }
`;
const Address = styled.div`
    color: #07a78abf;
    font-size: 14px;
    line-height: 1.9;
    @media all and (max-width: 980px) {
        line-height: 2.3;
    }
    @media all and (max-width: 640px) {
        line-height: 1.9;
    }
`;
const ContactContainer = styled.div`
    width: 34%;
    display: flex;
    flex-direction: column;
    @media all and (max-width: 1100px) {
    }
    @media all and (max-width: 980px) {
        width: 24%;
    }
    @media all and (max-width: 640px) {
        width: 30%;
    }
    @media all and (max-width: 540px) {
        width: 100%;
    }
`;
const PhoneLinks = styled.a`
    color: #07a78abf;
    font-size: 14px;
    display: block;
    margin-bottom: 6px;
    line-height: 1.9;
    font-family: gordita_regular;
`;
const MailLinks = styled.a`
    color: #07a78abf;
    font-size: 14px;
    display: block;
    font-family: gordita_regular;
    @media all and (max-width: 902px) {
        margin-top: 11px;
    }
    @media all and (max-width: 640px) {
        margin-top: 4px;
    }
    @media all and (max-width: 540px) {
        margin-top: 0px;
    }
`;
const SocialMedia = styled.span`
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    @media all and (max-width: 1100px) {
        margin-top: 20px;
    }
`;
const SocialLinks = styled.a`
    display: block;
    margin-right: 15px;
    height: 20px;
    .prime {
        display: none;
    }
    &:hover {
        .prime {
            display: block;
        }
        .secondry {
            display: none;
        }
    }

    img {
        display: block;
        height: 100%;
    }
    &:last-child {
        margin-right: 0;
    }
    @media all and (max-width: 1100px) {
        height: 16px;
    }
    @media all and (max-width: 640px) {
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
    }
`;
const NumberDiv = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    border: 2.5px solid #f3f0f0;
    border-radius: 10px !important;
    background: #f9f9f9;
    font-size: 15px;
    width: 100%;
    height: 44px;
    padding: 0px 21px;
    margin-bottom: 20px;

    @media all and (max-width: 640px) {
        width: 100%;
        height: 40px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
        font-size: 12px;
        padding: 0px 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
        padding: 0px 5px;
    }
`;
const Flag = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;
    & img {
        width: 100%;
        display: block;
        object-fit: cover;
        height: 100%;
    }
`;
const CountryArrow = styled.div`
    width: 8px;
    transform: rotate(90deg);
    margin-right: 10px;
    cursor: pointer;
    & img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 360px) {
        width: 7px;
    }
`;
const Code = styled.span`
    font-size: 16px;
    margin-right: 10px;
`;
const NumberInput = styled.input`
    width: calc(100% - 100px);
    height: 100%;
    font-family: "gordita_Regular";

    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
