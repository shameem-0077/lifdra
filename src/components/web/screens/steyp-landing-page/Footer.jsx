import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = (isSchool) => {
  const { user_profile } = useSelector((state) => state);
  const location = useLocation();
  // const programs = [
  //   { id: 1, name: "Tech Schooling", link: "/explore/tech-schooling/" },
  //   { id: 2, name: "Tech Degree", link: "/explore/tech-degree/" },
  //   { id: 3, name: "Tech Grad", link: "/explore/tech-grad/" },
  //   { id: 5, name: "Challenges", link: "/challenges/" },
  // ];
  // const programsTwo = [
  //   { id: 1, name: "School trchnology", link: "/school-trchnology/" },
  //   { id: 2, name: "Next gen kerala", link: "/next-gen-kerala" },
  //   { id: 3, name: "Tech @ school", link: "/tech/school/" },
  //   { id: 5, name: "Job sure campus", link: "/job-sure-campus/" },
  // ];
  // const company = [
  //   { id: 1, name: "About Us", link: "/about-us/" },
  //   { id: 2, name: "Contact Us", link: "/contact-us/" },
  //   { id: 3, name: "Home", link: "/home/" },
  //   { id: 4, name: "Nano degree", link: "/nano-degree/" },
  //   { id: 5, name: "Explore", link: "/explore/" },
  // ];

  return (
    <Cover>
      <Container className="wrapper">
        <LeftSection>
          <AddressContainer>
            <Logo to={user_profile?.user_id ? "/dashboard" : "/"}>
              <img
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                }
                alt=""
              />
            </Logo>
            <Address>
              Steyp Private Limited, <br />
              #208, 2nd Floor,
              <br /> HiLITE Platino,
              <br /> Shankar Nagar Road, Maradu,
              <br /> Kakkanad, Kerala,
              <br /> India - 682304
            </Address>
          </AddressContainer>
        </LeftSection>
        <RightSection>
          {/* <CompanyProgramSection>
            <FooterTitle>COMPANY</FooterTitle>
            {company.map((data) => (
              <FooterLinks key={data.id} to={data.link}>
                {data.name}
              </FooterLinks>
            ))}
          </CompanyProgramSection>
          <CompanyProgramSection>
            <FooterTitle>PROGRAMS</FooterTitle>
            {programs.map((data) => (
              <FooterLinks key={data.id} to={data.link}>
                {data.name}
              </FooterLinks>
            ))}
          </CompanyProgramSection>

          <CompanyProgramSection>
            {programsTwo.map((data) => (
              <FooterLinks key={data.id} to={data.link}>
                {data.name}
              </FooterLinks>
            ))}
          </CompanyProgramSection>
 */}
          <ProgramSection>
            <FooterTitle>Contact</FooterTitle>
            {location.pathname.includes("/school-scientist") ? (
              <>
                {" "}
                <PhoneLinks className="TAG">School Scientist</PhoneLinks>
                <PhoneLinks href="tel:+91 858 999 9302">
                  +91 858 999 9302
                </PhoneLinks>
                <MailLinks href="mailto:schoolscientist@steyp.com">
                  schoolscientist@steyp.com
                </MailLinks>
              </>
            ) : (
              <>
                <PhoneLinks href="tel:+91 858 999 8874">
                  +91 858 999 8874
                </PhoneLinks>
                <MailLinks href="mailto:hello@steyp.com">
                  hello@steyp.com
                </MailLinks>
              </>
            )}

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
                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx-color.svg"
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
          </ProgramSection>
        </RightSection>
      </Container>
      <BottomSection className="wrapper">
        <CopyRight to="/">
          © 2025, Steyp Private Limited. All rights reserved
        </CopyRight>
        <RightSide>
          <FooterLinks to="/terms-of-service/">Terms of Service</FooterLinks>
          <FooterLinks style={{ marginLeft: 20 }} to="/privacy-policy/">
            Privacy Policy
          </FooterLinks>
        </RightSide>
      </BottomSection>
    </Cover>
  );
};

export default Footer;

const Cover = styled.div`
  background-color: #000000;
  padding: 100px 0 50px;
  @media all and (max-width: 1100px) {
    padding: 80px 0 40px;
  }
  @media all and (max-width: 640px) {
    padding: 60px 0 25px;
  }
  @media all and (max-width: 480px) {
    padding: 60px 0 20px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 980px) {
  }
  @media all and (max-width: 640px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 980px) {
    max-width: 100%;
  }
`;
const RightSection = styled.div`
  display: flex;
  gap: 30px;
  @media all and (max-width: 640px) {
  }
  @media all and (max-width: 360px) {
  }
`;
const Logo = styled(Link)`
  width: 100px;
  display: block;
  filter: grayscale(1);
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 360px) {
    /* margin: 0 auto; */
  }
`;

const AddressContainer = styled.div``;

const Address = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-top: 30px;
  color: #aaaaaa;
  line-height: 28px;
  @media all and (max-width: 1100px) {
    font-size: 14px;
    margin-top: 20px;
  }
  @media all and (max-width: 360px) {
    /* text-align: center; */
  }
`;
const CopyRight = styled(Link)`
  font-size: 15px;
  color: #aaaaaa;
  font-family: gordita_regular;
  @media all and (max-width: 1100px) {
    font-size: 12px;
  }
  @media all and (max-width: 640px) {
    text-align: start;
  }
`;
const ProgramSection = styled.div`
  @media all and (max-width: 680px) {
    margin-bottom: 30px;
  }
`;

const CompanyProgramSection = styled.div`
  @media all and (max-width: 680px) {
    margin-bottom: 30px;
  }
`;

const CompanyProgramSectionTwo = styled.div`
  @media all and (max-width: 680px) {
    margin-top: 45px;
  }
`;

const FooterTitle = styled.h5`
  font-size: 16px;
  font-family: gordita_medium;
  margin-bottom: 20px;
  color: #8f8e8a;
  @media all and (max-width: 1100px) {
  }
  @media all and (max-width: 640px) {
    margin-bottom: 10px;
  }
  @media all and (max-width: 480px) {
  }
`;
const FooterLinks = styled(Link)`
  display: block;
  margin-bottom: 10px;
  color: #aaaaaa;
  font-family: gordita_regular;
  font-size: 15px;
  @media all and (max-width: 1100px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;
const PhoneLinks = styled.a`
  display: block;
  margin-bottom: 10px;
  color: #aaaaaa;
  font-family: gordita_regular;
  font-size: 15px;
  &.TAG {
    color: #fff;
  }
  @media all and (max-width: 1100px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;
const MailLinks = styled.a`
  display: block;
  margin-bottom: 10px;
  color: #aaaaaa;
  font-size: 15px;
  font-family: gordita_regular;
  @media all and (max-width: 1100px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
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

const BottomSection = styled.div`
  margin-top: 50px !important;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 640px) {
    margin-top: 30px !important;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  @media all and (max-width: 640px) {
    justify-content: space-between;
  }
`;
