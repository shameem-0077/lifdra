import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import queryString from "query-string";
import { primeprogramsConfig } from "../../../../axiosConfig";
import { useHistory, useLocation } from "react-router-dom";
import { getDateStr } from "../../../helpers/functions";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import { useDispatch, useSelector } from "react-redux";

function PrimeProgramsCertificate() {
  const history = useHistory();
  const location = useLocation();
  const [certId, setCertId] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const { divMainClass } = useSelector((state) => state);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const updateActiveMenu = (active_menu) =>
    dispatch({
      type: "ACTIVE_MENU",
      active_menu: active_menu,
    });

  const download = function () {
    let link = document.createElement("a");
    const kebabCase = (string) =>
      string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
    link.download = `${certificateDetails.student_name}-${certId}-${kebabCase(
      certificateDetails.course_name
    )}-certificate.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleCopy = (elem_id) => {
    const elem = document.getElementById(elem_id);
    if (elem_id === "certificateURL")
      elem.parentElement.parentElement.classList.add("show");
    else elem.parentElement.classList.add("show");

    elem.focus();
    elem.setSelectionRange(0, 99999);
    elem.select();
    document.execCommand("copy");
    setTimeout(function () {
      if (elem_id === "certificateURL")
        elem.parentElement.parentElement.classList.remove("show");
      elem.parentElement.classList.remove("show");
    }, 2000);
  };

  useEffect(() => {
    const { search } = location;
    const values = queryString.parse(search);
    const id = values.id;
    setCertId(id);
    const getCertificateDetails = () => {
      primeprogramsConfig
        .get(`certifications/certificate/${id}/`)
        .then((response) => {
          setLoading(false);
          const { data, StatusCode } = response.data;
          if (StatusCode === 6000) {
            setCertificateDetails(data);
          } else {
            history.push(`/prime-programs/`);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    };

    getCertificateDetails();
    updateActiveMenu("prime-programs");
  }, []);

  useEffect(() => {
    const generateLink = function () {
      html2canvas(document.getElementById(`certificate`), {
        scale: 8,
        useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
        ignoreElements: (element) => {
          if (element.tagName === "svg") {
            return true;
          }
          if (
            element.tagName === "IMG" &&
            !element.className.includes(`certificate-download-##`)
          ) {
            return true;
          } else {
            return false;
          }
        },
      })
        .then((canvas) => {
          const link = canvas.toDataURL();
          setImageUrl(link);
        })
        .catch((error) => {
          console.log(error, "err");
        });
    };

    if (!isLoading && Object.keys(certificateDetails).length > 0)
      generateLink();
  }, [isLoading, Object.keys(certificateDetails).length]);

  return (
    <div id="main" className={divMainClass}>
      <TalropEdtechHelmet title="Certificate - Prime Programs" />
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <MainContainer>
          <Container>
            <LeftContainer>
              <Header>
                <MainHeading>Certificate</MainHeading>
                <Issue>
                  Issued{" "}
                  <IssueDate>
                    {getDateStr(certificateDetails.issued_date)}
                  </IssueDate>
                </Issue>
              </Header>
              <Description>
                You've completed the program{" "}
                <span> '{certificateDetails.course_name}' </span> and have been
                verified by
                <span> Steyp </span> authorities.
              </Description>
              <CourseDetailsContainer>
                <CourseLeft>
                  <CourseLabel>Course</CourseLabel>
                  <marquee behavior="" direction="horizontal">
                    <CourseContent className="course-header">
                      {certificateDetails.course_name}
                    </CourseContent>
                  </marquee>
                </CourseLeft>
                <CourseRight>
                  <CourseLeftContainer>
                    <CourseLabel>Started</CourseLabel>
                    <CourseContent>
                      {getDateStr(certificateDetails.start_date)}
                    </CourseContent>
                  </CourseLeftContainer>
                  <CourseRightContainer>
                    <CourseLabel>Completed</CourseLabel>
                    <CourseContent>
                      {getDateStr(certificateDetails.completed_date)}
                    </CourseContent>
                  </CourseRightContainer>
                </CourseRight>
              </CourseDetailsContainer>
              <IdContainer>
                <IdLabel>Certificate ID</IdLabel>
                <IdUrlContainer>
                  <Input id="certificateId" value={certId} readOnly />
                  <CopyButton onClick={() => handleCopy("certificateId")}>
                    <img
                      // src={require("../../../../assets/images/prime-program/certificate/copy_icon.svg")}
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/copy_icon.svg
                                            "
                      alt="Image"
                    />
                    <ButtonText>Copy ID</ButtonText>
                    <ToolTipContainer x-placement="right">
                      <ToolTip>Copied!</ToolTip>
                    </ToolTipContainer>
                  </CopyButton>
                </IdUrlContainer>
              </IdContainer>
              <IdContainer>
                <IdLabel>Certificate URL</IdLabel>
                <UrlContainer>
                  <UrlInput>
                    <UrlImage>
                      <img
                        // src={require("../../../../assets/images/prime-program/certificate/Url_icon.svg")}
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/Url_icon.svg
                                                "
                        alt="Url"
                      />
                    </UrlImage>
                    <UrlText
                      id="certificateURL"
                      readOnly={true}
                      type="url"
                      value={window.location.href}
                    />
                  </UrlInput>
                  <CopyButton onClick={() => handleCopy("certificateURL")}>
                    <img
                      // src={require("../../../../assets/images/prime-program/certificate/copy_icon.svg")}
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/copy_icon.svg"
                      alt="Copy"
                    />
                    <ButtonText>Copy Link</ButtonText>
                    <ToolTipContainer x-placement="right">
                      <ToolTip>Copied!</ToolTip>
                    </ToolTipContainer>
                  </CopyButton>
                </UrlContainer>
              </IdContainer>
            </LeftContainer>
            <RightContainer>
              {/* {imageUrl ? (
                                <CertWrapper>
                                    <GenratedImage
                                        src={imageUrl}
                                        alt="Certificate"
                                    />
                                </CertWrapper>
                            ) : ( */}
              <Certificate
                onmousedown="event.preventDefault ? event.preventDefault() : event.returnValue = false"
                id="certificate"
                className="certificate-download-##"
              >
                <RotatedData className="certificate-download-##">
                  Issued on {getDateStr(certificateDetails.issued_date)} &nbsp;
                  &nbsp; &nbsp; &nbsp;Certificate URL: {window.location.href}
                </RotatedData>
                <CertificateData className="certificate-download-##">
                  <CertificateAchievement className="certificate-download-##">
                    Certificate of Achievement
                  </CertificateAchievement>
                  <CertificateID className="certificate-download-##">
                    Certificate ID: {certId}
                  </CertificateID>
                  <CertificateName className="certificate-download-##">
                    {certificateDetails.student_name}
                  </CertificateName>
                  <CompletedText className="certificate-download-##">
                    has completed the following program <br /> in
                  </CompletedText>
                  <CourseDetailsText className="certificate-download-##">
                    {certificateDetails.course_name}
                  </CourseDetailsText>
                  <StudentDescription className="certificate-download-##">
                    This is to certify that
                    <span>
                      &nbsp;
                      {certificateDetails.student_name}
                      &nbsp;
                    </span>{" "}
                    has successfully completed the program in
                    <span>
                      &nbsp;
                      {certificateDetails.course_name}
                      &nbsp;
                    </span>
                    started on
                    <span>
                      &nbsp;
                      {getDateStr(certificateDetails.start_date)} &nbsp;
                    </span>
                    and completed on
                    <span>
                      &nbsp;
                      {getDateStr(certificateDetails.completed_date)}
                      .&nbsp;
                    </span>
                  </StudentDescription>
                  <WishText className="certificate-download-##">
                    We wish you the best of luck with your future endeavors.
                  </WishText>
                  <Signature
                    className="certificate-download-##"
                    src={require("../../../../assets/images/prime-program/certificate/signature.svg")}
                    // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/signature.svg
                    // "
                    alt="Image"
                  />
                  <Seal
                    className="certificate-download-##"
                    src={require("../../../../assets/images/prime-program/certificate/steyp-seal.png")}
                    alt="Image"
                  />
                  <CeoName className="certificate-download-##">Sobir N</CeoName>
                  <Designation className="certificate-download-##">
                    Founder & CEO, Steyp{" "}
                  </Designation>
                  <WebUrlSteyp className="certificate-download-##">
                    www.steyp.com
                  </WebUrlSteyp>
                  <SteypLogo
                    className="certificate-download-##"
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                    }
                    alt="Logo"
                  />
                </CertificateData>

                <CertificateImage
                  className="certificate-download-##"
                  src={require("../../../../assets/images/prime-program/certificate/certificate.svg")}
                  // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/certificate.svg
                  // "
                  alt="Image"
                />
              </Certificate>
              {/* )} */}
              {imageUrl && (
                <DownloadButton onClick={download}>
                  Download Certificate &nbsp;&nbsp;
                  <img
                    src={require("../../../../assets/images/prime-program/certificate/download_icon.svg")}
                    alt="Image"
                  />
                </DownloadButton>
              )}
            </RightContainer>
          </Container>
        </MainContainer>
      )}
    </div>
  );
}

export default PrimeProgramsCertificate;

const LoaderContainer = styled.div`
  min-height: 700px;
  display: flex;
  align-items: center;
`;
const MainContainer = styled.div`
  min-height: calc(100vh - 170px);
  margin: 25px 10px;
  background-color: #f9f9fb;
  border-radius: 5px;
  padding: 25px;
  position: relative;
  @media (max-width: 768px) {
    margin: 25px 0 0 0;
  }
  @media (max-width: 590px) {
    padding: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  grid-gap: 30px;
  min-height: inherit;
  background-color: #fff;
  border-radius: 5px;
  padding: 35px;
  @media (max-width: 1170px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
  @media (max-width: 640px) {
    padding: 25px;
  }
  @media (max-width: 480px) {
    padding: 15px;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: calc(100% - 450px); */
  /* margin-right: 30px; */
  @media (max-width: 1170px) {
    width: 100%;
    margin-bottom: 50px;
    margin-right: 0;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  @media (max-width: 480px) {
    margin-bottom: 25px;
  }
`;
const MainHeading = styled.h3`
  font-size: 24px;
  font-family: "gordita_medium";
  @media (max-width: 1200px) {
    font-size: 23px;
  }
  @media (max-width: 1170px) {
    font-size: 24px;
  }
  @media (max-width: 768px) {
    font-size: 22px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
const Issue = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  font-family: "gordita_medium";
  @media (max-width: 1200px) {
    font-size: 19px;
  }
  @media (max-width: 1170px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 19px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const IssueDate = styled.p`
  font-size: 16px;
  font-family: "gordita_regular";
  font-style: italic;
  color: #3f3f3f;
  margin-bottom: -2px;
  margin-left: 8px;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
    margin-left: 5px;
  }
`;

const Description = styled.p`
  width: 80%;
  font-size: 16px;
  text-align: left;
  color: #3f3f3f;
  font-family: "gordita_medium";
  margin-bottom: 15px;
  span {
    font-family: "gordita_medium";
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 590px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    padding: 13px;
    font-size: 13px;
  }
`;
const CourseDetailsContainer = styled.div`
  border: 1px dashed #0fa7709a;
  background-color: #e8f6f1;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 590px) {
    flex-direction: column;
    justify-content: center;
  }
  @media (max-width: 889px) {
    flex-direction: column;
  }
`;
const CourseLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 52%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 889px) {
    justify-content: space-between;
    width: 100%;
  }
`;
const CourseRight = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 360px) {
    flex-direction: column;
  }
  @media (max-width: 889px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const CourseLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const CourseRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CourseLabel = styled.p`
  margin-right: 8px;
  font-size: 16px;
  font-family: "gordita_medium";
  color: #3f3f3f;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 670px) {
    font-size: 14px;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
const CourseWrapper = styled.div`
  width: 61%;
`;
const CourseContent = styled.p`
  font-size: 17px;
  font-family: "gordita_medium";
  color: #0fa76f;
  font-style: italic;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
  @media (max-width: 1170px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 670px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;
const IdLabel = styled.h6`
  font-size: 17px;
  font-family: "gordita_medium";
  margin-bottom: 10px;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
  @media (max-width: 1170px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const ToolTipContainer = styled.div`
  position: absolute;
  will-change: transform;
  top: 57px;
  transition: opacity 0.15s linear;
  opacity: 0;
  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 0;
    height: 0;
    margin-top: -6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #000;
    transform: rotate(90deg);
  }
  @media (max-width: 480px) {
    top: 45px;
  }
`;
const IdUrlContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
  &.show ${ToolTipContainer} {
    opacity: 0.9;
  }
`;
const Arrow = styled.div`
  position: absolute;
  display: block;
  left: 0;
  width: 0.4rem;
  height: 0.8rem;
  top: 7px;
  &:before {
    position: absolute;
    margin-top: -3px;
    content: "";
    border-width: 5px 5px 5px 0;
    border-right-color: #000;
  }
`;
const ToolTip = styled.div`
  position: relative;
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 0.25rem;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const Input = styled.input`
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #f9f9fb;
  padding: 10px;
  color: #3f3f3f;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  &:focus {
    color: #495057;
    border-color: #70f9b5;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(9 225 118 / 25%);
  }
`;
const CopyButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0fa76f;
  padding: 8px 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  img {
    width: 15px;
  }
  @media (max-width: 480px) {
    img {
      width: 12px;
    }
  }
`;
const ButtonText = styled.div`
  color: #fff;
  font-size: 16px;
  font-family: "gordita_medium";
  margin-left: 5px;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const UrlContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
  &.show ${ToolTipContainer} {
    opacity: 0.9;
  }
`;
const UrlInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #f9f9fb;
  color: #3f3f3f;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const UrlImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eaeaea;
  height: 100%;
  padding: 16px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  img {
    width: 15px;
  }
  @media (max-width: 480px) {
    padding: 14px;

    img {
      width: 12px;
    }
  }
`;

const UrlText = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: #f9f9fb;
  color: #3f3f3f;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  &:focus {
    color: #495057;
    border-color: #70f9b5;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(9 225 118 / 25%);
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CertWrapper = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0px 16px 24px;
  @media (max-width: 1170px) {
    width: 420px;
    height: 594px;
    margin: 0 auto;
  }
  @media (max-width: 580px) {
    width: 233px;
    height: 330px;
  }
`;
const GenratedImage = styled.img`
  display: block;
  width: 100%;
`;
const Certificate = styled.div`
  width: 420px;
  height: 594px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
  background-color: #fff;
  position: relative;
  @media (max-width: 1170px) {
    margin: 0 auto;
  }
  @media (max-width: 580px) {
    width: 233px;
    height: 330px;
  }
`;

const CertificateImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;
const RotatedData = styled.div`
  position: absolute;
  font-size: 42%;
  color: #1a987c;
  font-family: "carlitoregular";
  transform: rotate(90deg) translate(100%, 0);
  transform-origin: 100% 0;
  top: 4%;
  right: 3%;
  z-index: 1;
  @media (max-width: 580px) {
    font-size: 25%;
  }
`;

const CertificateData = styled.div`
  position: absolute;
  width: 80%;
  top: 27%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CertificateAchievement = styled.p`
  text-align: center;
  font-size: 68%;
  color: #1a987c;
  font-family: "century_gothicbold";
  margin-bottom: 2%;
  @media (max-width: 580px) {
    font-size: 38%;
  }
  @media (max-width: 380px) {
    font-size: 28%;
  }
`;
const CertificateID = styled.p`
  text-align: center;
  font-size: 60%;
  color: #1a987c;
  font-family: "carlitoregular";
  @media (max-width: 580px) {
    font-size: 30%;
  }
`;
const CertificateName = styled.p`
  text-align: center;
  font-size: 117%;
  color: #18484c;
  font-family: "century_gothicbold";
  @media (max-width: 580px) {
    font-size: 80%;
  }
`;
const CompletedText = styled.p`
  text-align: center;
  font-size: 60%;
  color: #1a987c;
  font-family: "carlitoregular";
  @media (max-width: 580px) {
    font-size: 30%;
  }
`;
const CourseDetailsText = styled.p`
  text-align: center;
  font-size: 77%;
  color: #18484c;
  font-family: "carlitobold";
  margin-bottom: 2%;
  @media (max-width: 580px) {
    font-size: 60%;
  }
`;
const StudentDescription = styled.p`
  text-align: center;
  font-size: 60%;
  color: #1a987c;
  font-family: "carlitoregular";
  margin-bottom: 2%;
  span {
    font-family: "carlitobold";
    sup {
      vertical-align: super;
      font-size: x-small;
    }
  }
  @media (max-width: 580px) {
    font-size: 30%;
    span {
      font-family: "carlitobold";
      sup {
        vertical-align: super;
        font-size: 4px;
      }
    }
  }
  @media (max-width: 580px) {
    font-size: 30%;
    span {
      font-family: "carlitobold";
      sup {
        vertical-align: super;
        font-size: 4px;
      }
    }
  }
  @media (max-width: 380px) {
    span {
      sup {
        font-size: 2px;
      }
    }
  }
`;
const WishText = styled.p`
  text-align: center;
  font-size: 60%;
  color: #1a987c;
  font-family: "carlitoregular";
  margin-bottom: 4%;
  @media (max-width: 580px) {
    font-size: 30%;
  }
`;
const Signature = styled.img`
  width: 20%;
  display: block;
  @media (max-width: 580px) {
    font-size: 15%;
  }
`;
const Seal = styled.img`
  width: 10%;
  position: absolute;
  bottom: 28%;
  right: 34%;
  display: block;
  @media (max-width: 580px) {
    font-size: 15%;
  }
`;
const CeoName = styled.p`
  text-align: center;
  font-size: 55%;
  color: #18484c;
  font-family: "carlitobold";
  @media (max-width: 580px) {
    font-size: 30%;
  }
`;
const Designation = styled.p`
  text-align: center;
  font-size: 40%;
  color: #1a987c;
  font-family: "carlitoregular";
  margin-bottom: 2%;
  @media (max-width: 580px) {
    font-size: 20%;
    margin-bottom: 1%;
  }
`;
const WebUrlSteyp = styled.p`
  text-align: center;
  font-size: 50%;
  color: #18484c;
  font-family: "carlitoregular";
  margin-bottom: 2%;
  @media (max-width: 580px) {
    font-size: 30%;
  }
`;
const SteypLogo = styled.img`
  width: 27%;
  display: block;
  /* @media (max-width: 580px) {
        font-size: 20%;
    } */
`;

const DownloadButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  background-color: #0fa76f;
  font-family: "gordita_medium";
  margin: 40px auto 0;
  cursor: pointer;
  padding: 10px 15px;
  transition: 0.5s ease;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
