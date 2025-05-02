import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../../assets/css/web/style.css";
import Footer from "../screens/steyp-landing-page/Footer";
import WebHeader from "../inludes/general/steyp-landing-page/WebHeader";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";

export default function PrivacyPolicy() {
  return (
    <>
      <TalropEdtechHelmet title="Privacy Policy" />

      <Container>
        <WebHeader />
        <Header>
          <Heading>Privacy Policy</Heading>
          <Date>
            Last updated:<Bold> 24 Mar 2023</Bold>
          </Date>
          <Description>
            By opting to use our Service, you acknowledge and consent to the
            collection and utilization of information in accordance with this
            policy. The Personal Information obtained through this process is
            intended solely for the purpose of providing and enhancing the
            Service. As stated in this Privacy Policy, we will not utilize or
            disclose your information to any third party unless otherwise
            specified.
          </Description>
          <Description className="second">
            For the sake of clarity, the terminology employed in this Privacy
            Policy holds the same definitions as those outlined in our Terms and
            Conditions, which can be found at &nbsp;
            <Url target="_blank" href="http://www.steyp.com">
              https://steyp.com/,
            </Url>
            &nbsp;except in cases where stated otherwise within this Privacy
            Policy.
          </Description>
          <Points>
            <Point>I. Information Collection and Use</Point>
            <Description>
              To provide an improved user experience with our Service, it may be
              necessary for us to request that you provide us with specific
              personally identifiable information, such as your name, phone
              number, and postal address. This information is collected with the
              sole purpose of contacting and identifying you.
            </Description>
          </Points>
          <Points>
            <Point>II. Cookies</Point>
            <Description>
              Cookies are small files that typically serve as anonymous and
              unique identifiers, which are sent to your browser from the
              website you are visiting, and subsequently stored on your
              computer's hard drive.
            </Description>
            <Description>
              Our website utilizes these "cookies" to gather information and
              enhance the quality of our Service. You have the option to accept
              or decline the use of these cookies, and can choose to be alerted
              whenever a cookie is being sent to your computer. Refusing to
              accept our cookies may restrict your ability to access certain
              aspects of our Service.
            </Description>
            <Description>
              For further details regarding cookies, please refer to the &nbsp;
              <Url
                target="_blank"
                href="https://en.wikipedia.org/wiki/HTTP_cookie"
              >
                "What Are Cookies"
              </Url>
              &nbsp;section.
            </Description>
          </Points>
          <Points>
            <Point>III. Service Providers</Point>
            <Description>
              As a service provider, we may engage the services of third-party
              companies and individuals to facilitate and provide our services
              to our clients. These parties may be contracted to perform
              specific tasks on our behalf or to provide service-related
              services, such as analyzing how our service is used.
            </Description>

            <Description>
              We would like to inform our users that these third parties may
              have access to your Personal Information as necessary to fulfill
              their assigned tasks. However, we ensure that such parties are
              obligated not to disclose or use the information for any other
              purpose than the tasks assigned to them on our behalf.
            </Description>
            <Description>
              We take data privacy and security very seriously and will only
              engage third-party service providers who can assure us of their
              ability to protect and handle personal information in accordance
              with applicable privacy laws and regulations.
            </Description>
          </Points>
          <Points>
            <Point>IV. Security</Point>
            <Description>
              We appreciate the trust you have placed in us by providing your
              Personal Information, and we strive to use commercially acceptable
              means to protect it. However, it is important to remember that no
              method of transmission over the internet or method of electronic
              storage can be guaranteed to be 100% secure and reliable. While we
              take appropriate measures to safeguard your information, we cannot
              guarantee its absolute security. We are committed to continuously
              reviewing and enhancing our security measures to mitigate any
              potential risks and ensure the highest level of protection for
              your Personal Information.
            </Description>
          </Points>
          <Points>
            <Point>V. Links to Other Sites</Point>
            <Description>
              Our Service may provide links to other websites for your
              convenience or to enhance your overall experience. Please note
              that these external sites are not operated by us, and we have no
              control over their content, privacy policies, or practices. We
              highly recommend that you review the Privacy Policy of any
              third-party website you visit through a link from our Service. We
              assume no responsibility for the content, privacy policies, or
              practices of any third-party sites or services.
            </Description>
          </Points>
          <Points>
            <Point>VI. Children's Privacy</Point>
            <Description>
              Our Services are not intended for use by individuals under the age
              of 13, and we do not knowingly collect personally identifiable
              information from children under 13 years of age. In the event that
              we discover personal information has been provided to us by a
              child under 13, we take immediate steps to delete the information
              from our servers. If you are a parent or guardian and believe that
              your child has provided personal information to us, please contact
              us so that we may take necessary action.
            </Description>
          </Points>
          <Points>
            <Point> VII. Changes to This Privacy Policy</Point>
            <Description>
              We may update our Privacy Policy periodically, and we recommend
              that you check this page regularly for any changes. We will post
              any updates to our Privacy Policy on this page and the changes
              will be effective immediately upon posting.
            </Description>
          </Points>

          <Points>
            <PointLast> Refund and Cancellation Policy</PointLast>
            <Description>
              Steyp does not offer refunds for any money paid to access our
              site, except in the case of annual membership payments. If a user
              requests a refund within 7 days of the annual membership charge
              being processed, we will provide a refund. We strive to ensure
              that our users are satisfied with their experience on our site and
              are committed to resolving any issues that may arise. If you have
              any questions or concerns about our refund policy, please do not
              hesitate to contact us.
            </Description>
          </Points>
        </Header>
        <Footer />
      </Container>
    </>
  );
}
const Container = styled.section`
  padding-top: 35px;
  @media all and (max-width: 768px) {
    padding-top: 25px;
  }
  @media all and (max-width: 480px) {
    padding-top: 0px;
  }
`;
const Header = styled.div`
  width: 85%;
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
const ReasonContainer = styled.div`
  padding-left: 16px;
  font-size: 17px;
  letter-spacing: 0.01rem;
  margin-bottom: 13px;
`;
const Reasons = styled.ul`
  padding: 0px 0 0px 15px;
  letter-spacing: 0.01rem;
  color: #868686;
`;
const Reason = styled.li`
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
  &refund {
    font-size: 40px;
  }
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
`;
const PointLast = styled.h3`
  font-family: gordita_medium;
  font-size: 30px;
  letter-spacing: 0.01rem;
  margin-bottom: 19px;
  color: #000;
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
`;
