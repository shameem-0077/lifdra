import React, { useRef, useEffect } from "react";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import "../../../../assets/css/Style.css";
import "../../../../assets/css/web.css";
import WebHelmet from "../../../web/inludes/general/WebHelmet";
import SteypBottom from "./SteypBottom";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function TermsConditions() {
  const location = useLocation();
  const aboutRef = useRef(null);
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const refundRef = useRef(null);
  const contactRef = useRef(null);

  const executeScroll = (section) => {
    if (section === "refund") {
      scrollToRef(refundRef);
    } else if (section === "about") {
      scrollToRef(aboutRef);
    } else if (section === "privacy") {
      scrollToRef(privacyRef);
    } else if (section === "terms") {
      scrollToRef(termsRef);
    } else if (section === "contact") {
      scrollToRef(contactRef);
    }
  };

  useEffect(() => {
    let { search } = location;
    const values = queryString.parse(search);
    const section = values.s;
    executeScroll(section);
  }, []);
  return (
    <>
      <WebHelmet title="Terms & Conditions | Steyp" />
      <section id="privacy-policy">
        <section className="wrapper">
          <section className="top">
            <h1>
              <Link to="/">
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                  alt="Steyp"
                />
              </Link>
            </h1>
          </section>
          <div className="head" ref={aboutRef}>
            <h2>About Us</h2>
            <p className="p-i">
              Steyp Private Limited is an EdTech company, a beginning of the
              Digital University for Industry 4.0, where one can find the
              relevant courses to upgrade skills from the top experts and gear
              up for Industry 4.0, an initiative from Talrop.
            </p>
          </div>
          <div className="head" ref={termsRef}>
            <h2>Terms & Conditions</h2>
            <p className="p-i">
              These Website Standard Terms and Conditions written on this
              webpage shall manage your use of our website, Steyp.com accessible
              at &nbsp;
              <a href="https://steyp.com/">https://steyp.com/</a>.
            </p>
            <p className="p-i">
              These Terms will be applied fully and affect your use of this
              Website. By using this Website, you agreed to accept all terms and
              conditions written in here. You must not use this Website if you
              disagree with any of these Website Standard Terms and Conditions.
            </p>
          </div>
          <div className="item b-i">
            <h3 className="p-h">I. Intellectual Property Rights</h3>
            <p className="p-i">
              Other than the content you own, under these Terms, Steyp and/or
              its licensors own all the intellectual property rights and
              materials contained in this Website.
            </p>
            <p className="p-i">
              You are granted limited license only for purposes of viewing the
              material contained on this Website.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">II. Restrictions</h3>
            <p className="p-i">
              You are specifically restricted from all of the following:
            </p>
            <div className="p-i">
              <ul>
                <li>Publishing any Website material in any other media;</li>
                <li>
                  Selling, sublicensing and/or otherwise commercializing any
                  Website material;
                </li>
                <li>
                  Publicly performing and/or showing any Website material;
                </li>
                <li>
                  Using this Website in any way that is or may be damaging to
                  this Website;
                </li>
                <li>
                  Using this Website in any way that impacts user access to this
                  Website;
                </li>
                <li>
                  Using this Website contrary to applicable laws and regulations
                  or in any way may cause harm to the Website, or to any person
                  or business entity;
                </li>
                <li>
                  Engaging in any data mining, data harvesting, data extracting
                  or any other similar activity in relation to this Website;
                </li>
                <li>
                  Using this Website to engage in any advertising or marketing.
                </li>
              </ul>
            </div>
            <p className="p-i">
              Certain areas of this Website are restricted from being access by
              you and Steyp may further restrict access by you to any areas of
              this Website, at any time, in absolute discretion. Any user ID and
              password you may have for this Website are confidential and you
              must maintain confidentiality as well.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">III. No warranties</h3>
            <p className="p-i">
              This Website is provided "as is," with all faults, and Steyp
              express no representations or warranties, of any kind related to
              this Website or the materials contained on this Website. Also,
              nothing contained on this Website shall be interpreted as advising
              you.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">IV. Limitation of liability</h3>
            <p className="p-i">
              In no event shall Steyp, nor any of its officers, directors and
              employees, shall be held liable for anything arising out of or in
              any way connected with your use of this Website whether such
              liability is under contract. Steyp, including its officers,
              directors and employees shall not be held liable for any indirect,
              consequential or special liability arising out of or in any way
              related to your use of this Website.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">V. Severability</h3>
            <p className="p-i">
              If any provision of these Terms is found to be invalid under any
              applicable law, such provisions shall be deleted without affecting
              the remaining provisions herein.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">VI.Variation of Terms</h3>
            <p className="p-i">
              Steyp is permitted to revise these Terms at any time as it sees
              fit, and by using this Website you are expected to review these
              Terms on a regular basis.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">VII. Assignment</h3>
            <p className="p-i">
              The Steyp is allowed to assign, transfer, and subcontract its
              rights and/or obligations under these Terms without any
              notification. However, you are not allowed to assign, transfer or
              subcontract any of your rights and/or obligations under these
              Terms.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">VIII. Entire Agreement</h3>
            <p className="p-i">
              These Terms constitute the entire agreement between Steyp and you
              in relation to your use of this Website, and supersede all prior
              agreements and understandings.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">IX. Governing Law & Jurisdiction</h3>
            <p className="p-i">
              These Terms will be governed by and interpreted in accordance with
              the laws of the State of in, and you submit to the non-exclusive
              jurisdiction of the state and federal courts located in in for the
              resolution of any disputes.
            </p>
          </div>
          <div className="head" ref={privacyRef}>
            <h2>Privacy Policy</h2>
            <p className="p-i">
              If you choose to use our Service, then you agree to the collection
              and use of information in relation to this policy. The Personal
              Information that we collect is used for providing and improving
              the Service. We will not use or share your information with anyone
              except as described in this Privacy Policy.
            </p>
            <p className="p-i">
              The terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions, which is accessible at &nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://steyp.com/"
              >
                https://steyp.com/
              </a>
              &nbsp;unless otherwise defined in this Privacy Policy.
            </p>
          </div>
          <div className="item b-i">
            <h3 className="p-h">I. Information Collection and Use</h3>
            <p className="p-i">
              For a better experience, while using our Service, we may require
              you to provide us with certain personally identifiable
              information, including but not limited to your name, phone number,
              and postal address. The information that we collect will be used
              to contact or identify you.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">II. Cookies</h3>
            <p className="p-i">
              Cookies are files with a small amount of data that is commonly
              used as an anonymous unique identifier. These are sent to your
              browser from the website that you visit and are stored on your
              computer’s hard drive.
            </p>
            <p className="p-i">
              Our website uses these "cookies" to collect information and to
              improve our Service. You have the option to either accept or
              refuse these cookies and know when a cookie is being sent to your
              computer. If you choose to refuse our cookies, you may not be able
              to use some portions of our Service.
            </p>
            <p className="p-i">
              For more general information on cookies, please read
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/HTTP_cookie"
              >
                &nbsp; "What Are Cookies"
              </a>
              .
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">III. Service Providers</h3>
            <p className="p-i">
              We may employ third-party companies and individuals due to the
              following reasons:
            </p>
            <div className="p-i">
              <ul>
                <li>To facilitate our Service</li>
                <li>To provide the Service on our behalf</li>
                <li>To perform Service-related services</li>
                <li>To assist us in analyzing how our Service is used</li>
              </ul>
            </div>
            <p className="p-i">
              We want to inform our Service users that these third parties have
              access to your Personal Information. The reason is to perform the
              tasks assigned to them on our behalf. However, they are obligated
              not to disclose or use the information for any other purpose.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">IV. Security</h3>
            <p className="p-i">
              We value your trust in providing us your Personal Information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">V. Links to Other Sites</h3>
            <p className="p-i">
              Our Service may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by us. Therefore, we
              strongly advise you to review the Privacy Policy of these
              websites. We have no control over and assume no responsibility for
              the content, privacy policies or practices of any third-party
              sites or services.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">VI. Children's Privacy</h3>
            <p className="p-i">
              Our Services do not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from
              children under 13. In the case we discover that a child under 13
              has provided us with personal information, we immediately delete
              this from our servers. If you are a parent or guardian and you are
              aware that your child has provided us with personal information,
              please contact us so that we will be able to do the necessary
              actions.
            </p>
          </div>
          <div className="item  b-i">
            <h3 className="p-h">VII. Changes to This Privacy Policy</h3>
            <p className="p-i">
              We may update our Privacy Policy from time to time. Thus, we
              advise you to review this page periodically for any changes. We
              will notify you of any changes by posting the new Privacy Policy
              on this page. These changes are effective immediately after they
              are posted on this page.
            </p>
          </div>
          <div className="r-c" ref={refundRef} id="refund-cancellation">
            <h2>Refund and Cancellation Policy</h2>
            <p>
              Steyp does not offer a refund of the money that a user/subscriber
              would pay to access the site. Steyp offers refunds for annual
              membership payments if you contact us within 7 days after the
              charge has been processed.
            </p>
          </div>
        </section>
      </section>
      <div ref={contactRef}>
        <SteypBottom isTos={true} />
      </div>
    </>
  );
}
