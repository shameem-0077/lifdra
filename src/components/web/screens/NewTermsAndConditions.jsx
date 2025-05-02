import React from "react";
import styled from "styled-components";
import "../../../assets/css/web/style.css";
import Footer from "./steyp-landing-page/Footer";
import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";

export default function NewTermsAndConditions() {
  return (
    <>
      <TalropEdtechHelmet title="Terms & Conditions" />

      <MainHeader>
        <WebHeader />
        <Container>
          <Header>
            <Heading>Terms & Conditions</Heading>
            <Date>
              Last updated:<Bold> 24 Mar 2023</Bold>
            </Date>
            <Description>
              The Website Standard Terms and Conditions, presented on this
              webpage, shall govern and regulate the use of our website,
              Steyp.com, which is accessible at&nbsp;
              <Url target="_blank" href="http://www.steyp.com">
                https://steyp.com/.
              </Url>
            </Description>
            <Description className="second">
              These Terms shall be fully applicable and substantially impact the
              use of this Website. By accessing this Website, you hereby
              acknowledge and agree to abide by all the terms and conditions set
              forth in this document. If you disagree with any of the Website
              Standard Terms and Conditions, you must not proceed to use this
              Website.
            </Description>
            <Points>
              <Point>I. Intellectual Property Rights</Point>
              <Description>
                The materials contained on this Website, except for the content
                owned by the user, are exclusively owned by Steyp and/or its
                licensors, and are protected by the applicable intellectual
                property laws. By using this Website, you are granted a limited
                license to access and view the material contained on this
                Website, solely for non-commercial and personal use. Any
                unauthorized use, reproduction, or distribution of the materials
                on this Website is strictly prohibited, and may be subject to
                legal action.
              </Description>
            </Points>
            <Points>
              <Point>II. Restrictions</Point>
              <Description>
                As a user of this website, it is important to adhere to the
                following restrictions:
              </Description>
              <RestrictionContainer className="p-i">
                <Restrictions>
                  <Restriction>
                    You are prohibited from publishing any website material on
                    any other media without prior permission from the website
                    owners.
                  </Restriction>
                  <Restriction>
                    Selling, sublicensing, or otherwise commercializing any
                    website material is strictly forbidden.
                  </Restriction>
                  <Restriction>
                    Publicly performing or displaying any website material is
                    also prohibited.
                  </Restriction>
                  <Restriction>
                    Any use of this website that may cause damage to its
                    functionality or reputation is strictly forbidden.
                  </Restriction>
                  <Restriction>
                    Additionally, any use of this website that impacts user
                    access to the site is also prohibited.
                  </Restriction>
                  <Restriction>
                    It is prohibited to use this website in a manner that
                    violates any applicable laws and regulations or that may
                    cause harm to the website, any person, or any business
                    entity.
                  </Restriction>
                  <Restriction>
                    Engaging in any data mining, data harvesting, data
                    extracting, or any similar activity in relation to this
                    website is strictly prohibited.
                  </Restriction>
                  <Restriction>
                    Using this website for any advertising or marketing purposes
                    is also forbidden.
                  </Restriction>
                </Restrictions>
              </RestrictionContainer>
              <Description>
                Please note that certain areas of this website may be restricted
                from access by you. Steyp reserves the right to further limit
                your access to any areas of this website, at any time and at
                their absolute discretion. It is essential to maintain the
                confidentiality of any user ID and password that you may have
                for this website.
              </Description>
            </Points>
            <Points>
              <Point>III. No warranties</Point>
              <Description>
                This website is provided "as is," without any guarantees or
                warranties. Steyp makes no representations or warranties of any
                kind, and nothing on this website should be interpreted as
                advice. Steyp disclaims all liability for any damages or losses
                resulting from the use of this website or any information or
                materials contained on this website.
              </Description>
            </Points>
            <Points>
              <Point>IV. Limitation of liability</Point>
              <Description>
                Please be advised that Steyp, its officers, directors, and
                employees shall not be held liable for any damages arising out
                of or in connection with your use of this website, whether such
                liability is under contract or otherwise. This includes but is
                not limited to indirect, consequential, or special liability
                arising out of or in any way related to your use of this
                website. We hope this clarification helps to mitigate any
                confusion regarding the limitations of liability associated with
                using this website.
              </Description>
            </Points>
            <Points>
              <Point>V. Severability</Point>
              <Description>
                If any provision of these Terms is found to be invalid under any
                applicable law, such provisions shall be deleted without
                affecting the remaining provisions herein.
              </Description>
            </Points>
            <Points>
              <Point>VI.Variation of Terms</Point>
              <Description>
                Steyp reserves the right to modify these Terms at any given
                time, and it is expected that you, as a user of this Website,
                will regularly review these Terms.
              </Description>
            </Points>
            <Points>
              <Point>VII. Assignment</Point>
              <Description>
                Steyp has the right to assign, transfer, or subcontract its
                rights and/or obligations under these Terms without prior
                notification. However, you, as the user, are not authorized to
                assign, transfer, or subcontract any of your rights and/or
                obligations under these Terms.
              </Description>
            </Points>
            <Points>
              <Point>VIII. Entire Agreement</Point>
              <Description>
                These Terms represent the complete agreement between Steyp and
                you with regards to your use of this Website, and they prevail
                over any prior agreements and understandings that may have
                existed.
              </Description>
            </Points>
            <Points>
              <Point> IX. Governing Law & Jurisdiction</Point>
              <Description>
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Kerala and you agree to submit to
                the non-exclusive jurisdiction of the state and federal courts
                located in Kerala for the purpose of resolving any disputes that
                may arise.
              </Description>
            </Points>
          </Header>
          <Footer />
        </Container>
      </MainHeader>
    </>
  );
}

const MainHeader = styled.section`
  padding-top: 35px;
  @media all and (max-width: 768px) {
    padding-top: 20px;
  }
  @media all and (max-width: 480px) {
    padding-top: 0px;
  }
`;
const Container = styled.section`
  padding-top: 35px;
  @media all and (max-width: 768px) {
    padding-top: 25px;
  }
  @media all and (max-width: 480px) {
    padding-top: 20px;
  }
`;
const Header = styled.div`
  width: 85%;
  max-width: 980px;
  margin: 0 auto;
  margin-bottom: 75px;
  @media all and (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const Heading = styled.h2`
  font-size: 36px;
  font-family: gordita_medium;
  color: #212121;
  margin-bottom: 65px;
  letter-spacing: 0.01rem;
  @media all and (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 35px;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 25px;
    font-size: 25px;
    text-align: center;
  }
`;
const Date = styled.p`
  font-size: 15px;
  letter-spacing: 0.01rem;
  margin-bottom: 30px;
  color: #868686;
`;
const Bold = styled.div`
  display: inline;
  font-size: 16px;
  letter-spacing: 0.01rem;
  color: #4e4e4e;
`;
const Description = styled.div`
  font-size: 15px;
  letter-spacing: 0.01rem;
  margin-bottom: 30px;
  color: #868686;
  line-height: 1.8;
`;
const RestrictionContainer = styled.div`
  padding-left: 16px;
  font-size: 17px;
  letter-spacing: 0.01rem;
  margin-bottom: 13px;
`;
const Restrictions = styled.ul`
  padding: 0px 0 0px 15px;
  letter-spacing: 0.01rem;
  color: #868686;
`;
const Restriction = styled.li`
  list-style: disc;
  font-size: 15px;
  letter-spacing: 0.01rem;
  color: #6b6b6b;
  margin-bottom: 8px;
  line-height: 1.7rem;
`;

const Url = styled.a`
  display: inline-block;
  color: #4e4e4e;
`;
const Points = styled.div`
  margin-top: 60px !important;
  @media all and (max-width: 480px) {
    margin-top: 40px !important;
  }
`;
const Point = styled.h3`
  font-size: 24px;
  letter-spacing: 0.01rem;
  margin-bottom: 19px;
  color: #000;
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
`;
