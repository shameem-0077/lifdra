import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import queryString from "query-string";
import { serverConfig } from "../../../../../axiosConfig";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getDateStr } from "../../../../helpers/functions";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import Loader from "../general/loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import ButtonLoader from "../../../../../assets/lotties/modal/buttonloader.json";

function CertificateSinglePage() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const user_data = useSelector((state) => state.user_data);
  const [isLoading, setLoading] = useState(true);
  const { divMainClass } = useSelector((state) => state);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [IsButtonLoading, setisButtonLoading] = useState(false);
  const [isFirst, setFirst] = useState(true);
  const [isSecond, setSecond] = useState(false);
  const [certificateDatas, setCertificateDatas] = useState([]);
  const [certificateSkillsData, setCertificateSkillsData] = useState([]);
  const [obtainedScore, setobtainedScore] = useState(0);
  const [downloadError, setDownloadError] = useState(false);

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ButtonLoader,
    rendererSettings: {},
  };

  const handleCopy = (elem_id) => {
    const elem = document.getElementById(elem_id);
    elem.parentElement.parentElement.classList.add("show");

    elem.focus();
    elem.setSelectionRange(0, 99999);
    elem.select();
    document.execCommand("copy");
    setTimeout(function () {
      elem.parentElement.parentElement.classList.remove("show");
    }, 2000);
  };

  useEffect(() => {
    learnConfig
      .get(`/certifications/get-certificate-detail/${id}/`)
      .then((response) => {
        let { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setCertificateDatas(data.certificate_data);
          setCertificateSkillsData(data.certificate_details_data);
          setobtainedScore(data.certificate_data.certificate_obtained_score);
          setLoading(false);
        } else {
          setLoading(false);
          dispatch({
            type: "UPDATE_ERROR",
            error: {
              response: { status: 404 },
            },
          });
        }
      })
      .catch((error) => {});
  }, []);

  const downloadCertificate = (certificateId, designationName) => {
    setisButtonLoading(true);
    learnConfig
      .get(`/certifications/get-certificate/${certificateId}/`, {
        responseType: "blob",
      })
      .then((response) => {
        let { StatusCode } = response.data;
        if (StatusCode === 6001) {
          setDownloadError(true);
          setisButtonLoading(false);
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${designationName}-certificate.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();
          setisButtonLoading(false);
          setDownloadError(false);
        }
        setisButtonLoading(false);
      })
      .catch((error) => {
        setDownloadError(true);
        setisButtonLoading(false);
      });
  };

  const rated_stars = [...Array(obtainedScore)].map((index) => (
    <Stars key={index}>
      <img
        src={require("../../../../../assets/images/certificate/star-filled.svg")}
      />
    </Stars>
  ));
  const stars = [...Array(10 - obtainedScore)].map((index) => (
    <Stars key={index}>
      <img
        src={require("../../../../../assets/images/certificate/star-plain.svg")}
      />
    </Stars>
  ));

  return (
    // <div id="main" className={divMainClass}>
    <>
      <TalropEdtechHelmet title="Certificate - Tech Schooling" />
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
                  Issued
                  <IssueDate>
                    {certificateDatas.issued_time_stamp &&
                      getDateStr(certificateDatas.issued_time_stamp)}
                  </IssueDate>
                </Issue>
              </Header>
              <Description>
                You've completed the profession
                <span> '{certificateDatas.designation_name}' </span> and have
                been verified by
                <span> Steyp </span> authorities.
              </Description>
              <CourseDetailsContainer>
                <CourseLeft>
                  <CourseLabel>Course</CourseLabel>
                  <CourseContent className="course-header">
                    {certificateDatas.designation_name}
                  </CourseContent>
                </CourseLeft>
                <CourseRight>
                  <CourseLeftContainer>
                    <CourseLabel>Started</CourseLabel>
                    <CourseContent>
                      {certificateDatas.designation_start_time_stamp &&
                        getDateStr(
                          certificateDatas.designation_start_time_stamp
                        )}
                    </CourseContent>
                  </CourseLeftContainer>
                  <CourseRightContainer>
                    <CourseLabel>Completed</CourseLabel>
                    <CourseContent>
                      {certificateDatas.designation_completed_time_stamp &&
                        getDateStr(
                          certificateDatas.designation_completed_time_stamp
                        )}
                    </CourseContent>
                  </CourseRightContainer>
                </CourseRight>
              </CourseDetailsContainer>
              <IdContainer>
                <IdLabel>Certificate ID</IdLabel>

                <IdUrlContainer>
                  <UrlInput>
                    <UrlImage>
                      <img
                        src={require("../../../../../assets/images/certificate/certificate-icon.svg")}
                        alt="Image"
                      />
                    </UrlImage>
                    <UrlText
                      id="certificateId"
                      value={certificateDatas.certificate_id}
                      readOnly
                    />
                  </UrlInput>
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
                        alt="Image"
                      />
                    </UrlImage>
                    <UrlText
                      id="certificateURL"
                      readOnly={true}
                      type="url"
                      value={certificateDatas.certificate_url}
                    />
                  </UrlInput>
                  <CopyButton onClick={() => handleCopy("certificateURL")}>
                    <img
                      // src={require("../../../../assets/images/prime-program/certificate/copy_icon.svg")}
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/copy_icon.svg"
                      alt="Image"
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
              {isFirst && !isSecond ? (
                <Certificate
                  onClick={() => {
                    setFirst(false);
                    setSecond(true);
                  }}
                >
                  <RotatedData>
                    Issued on
                    {certificateDatas.issued_time_stamp &&
                      getDateStr(certificateDatas.issued_time_stamp)}
                    &nbsp; &nbsp; &nbsp; &nbsp;Certificate URL:
                    {certificateDatas.certificate_url}
                  </RotatedData>
                  <CertificateData>
                    <CertificateAchievement>
                      Certificate of Achievement
                    </CertificateAchievement>
                    <CertificateID>
                      Certificate ID: {certificateDatas.certificate_id}
                    </CertificateID>
                    <CertificateName>
                      {certificateDatas.student_name}
                    </CertificateName>
                    <CompletedText>
                      has completed the following profession <br /> in
                    </CompletedText>
                    <CourseDetailsText>
                      {certificateDatas.designation_name}
                    </CourseDetailsText>
                    <ScoreText>
                      {certificateDatas.certificate_obtained_score}
                      /10
                    </ScoreText>
                    <StarRatingMainScore>
                      {rated_stars}
                      {stars}
                    </StarRatingMainScore>
                    <StudentDescription>
                      This is to certify that
                      <span>
                        &nbsp;
                        {certificateDatas.terms_of_address}
                        .&nbsp;
                        {certificateDatas.student_name}
                        &nbsp;
                      </span>
                      has successfully <br />
                      completed the profession in
                      <span>
                        &nbsp;
                        {certificateDatas.designation_name}
                        &nbsp;
                      </span>
                      started on
                      <span>
                        &nbsp;
                        {certificateDatas.designation_start_time_stamp &&
                          getDateStr(
                            certificateDatas.designation_start_time_stamp
                          )}
                        &nbsp;
                      </span>
                      <br />
                      and completed on
                      <span>
                        &nbsp;
                        {certificateDatas.designation_completed_time_stamp &&
                          getDateStr(
                            certificateDatas.designation_completed_time_stamp
                          )}
                        .&nbsp;
                      </span>
                    </StudentDescription>
                    <WishText>
                      We wish you the best for your future endeavors.
                    </WishText>
                    <Signature
                      src={require("../../../../../assets/images/prime-program/certificate/signature.svg")}
                      // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/signature.svg
                      // "
                      alt="Image"
                    />
                    <Seal
                      src={require("../../../../../assets/images/prime-program/certificate/steyp-seal.png")}
                      alt="Image"
                    />
                    <CeoName>Sobir Najumudeen</CeoName>
                    <Designation>Founder & CEO, Steyp </Designation>
                    <WebUrlSteyp>www.steyp.com</WebUrlSteyp>
                    <SteypLogo
                      src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                      }
                      alt="Logo"
                    />
                  </CertificateData>

                  <CertificateImage
                    src={require("../../../../../assets/images/certificate/certificatebg.svg")}
                    // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/certificate.svg
                    // "
                    alt="Image"
                  />
                </Certificate>
              ) : (
                <Certificate
                  onClick={() => {
                    setFirst(true);
                    setSecond(false);
                  }}
                >
                  <RotatedData>
                    Issued on
                    {certificateDatas.issued_time_stamp &&
                      getDateStr(certificateDatas.issued_time_stamp)}
                    &nbsp; &nbsp; &nbsp; &nbsp;Certificate URL:
                    {certificateDatas.certificate_url}
                  </RotatedData>
                  <CertificateData>
                    <ScoreCardName>Scorecard</ScoreCardName>
                    <CompletedText>
                      (Based on Practices and Assessments)
                    </CompletedText>
                    <CourseDetailsText>
                      {certificateDatas.designation_name}
                    </CourseDetailsText>
                    <ScoreText>
                      {certificateDatas.certificate_obtained_score}
                      /10
                    </ScoreText>
                    <StarRatingMainScore>
                      {rated_stars}
                      {stars}
                    </StarRatingMainScore>
                    <ScoreSheet>
                      {certificateSkillsData.map((data, index) => (
                        <SkillContainer key={index}>
                          <SkillNameContainer>
                            {data.skill_name}
                          </SkillNameContainer>
                          <SkillRatingContainer>
                            {[...Array(data.skill_obtained_score)].map(
                              (index) => (
                                <Stars key={index}>
                                  <img
                                    src={require("../../../../../assets/images/certificate/star-filled.svg")}
                                  />
                                </Stars>
                              )
                            )}
                            {[...Array(10 - data.skill_obtained_score)].map(
                              (index) => (
                                <Stars key={index}>
                                  <img
                                    src={require("../../../../../assets/images/certificate/star-plain.svg")}
                                  />
                                </Stars>
                              )
                            )}
                          </SkillRatingContainer>
                          <SkillScoreContainer>
                            {data.skill_obtained_score}
                            /10
                          </SkillScoreContainer>
                        </SkillContainer>
                      ))}
                    </ScoreSheet>
                  </CertificateData>

                  <SkillSteypLogo
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                    }
                    alt="Logo"
                  />
                  <SkillWebUrlSteyp>www.steyp.com</SkillWebUrlSteyp>
                  <SkillMailSteyp>hello@steyp.com</SkillMailSteyp>

                  <CertificateImage
                    src={require("../../../../../assets/images/certificate/certificatebg.svg")}
                    // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/certificate.svg
                    // "
                    alt="Image"
                  />
                </Certificate>
              )}
              <SlideDot>
                {isFirst ? (
                  <Normal
                    onClick={() => {
                      setFirst(true);
                      setSecond(false);
                    }}
                    isFirst={isFirst}
                    isSecond={isSecond}
                  />
                ) : (
                  <Filled
                    onClick={() => {
                      setFirst(true);
                      setSecond(false);
                    }}
                  />
                )}

                {isSecond ? (
                  <Normal
                    className="last"
                    onClick={() => {
                      setFirst(false);
                      setSecond(true);
                    }}
                    isFirst={isFirst}
                    isSecond={isSecond}
                  />
                ) : (
                  <Filled
                    className="last"
                    onClick={() => {
                      setFirst(false);
                      setSecond(true);
                    }}
                  />
                )}
              </SlideDot>

              {!IsButtonLoading ? (
                <DownloadButton
                  onClick={() =>
                    downloadCertificate(
                      certificateDatas.certificate_id,
                      certificateDatas.designation_name
                    )
                  }
                >
                  Download Certificate
                </DownloadButton>
              ) : (
                <DownloadButton>
                  <span>Generating</span>
                  <Lottie
                    options={lottieDefaultOptions}
                    height={25}
                    width={25}
                  />
                </DownloadButton>
              )}
              {downloadError && (
                <DownloadError>
                  Downloading Failed! Please try again.
                </DownloadError>
              )}
            </RightContainer>
          </Container>
        </MainContainer>
      )}
    </>
  );
}

export default CertificateSinglePage;

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
  @media all and (max-width: 768px) {
    margin: 25px 0 0 0;
  }
  @media all and (max-width: 590px) {
    padding: 15px;
  }
  @media all and (max-width: 480px) {
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
  @media all and (max-width: 1170px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
  @media all and (max-width: 640px) {
    padding: 25px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: calc(100% - 450px); */
  /* margin-right: 30px; */
  @media all and (max-width: 1170px) {
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
  @media all and (max-width: 480px) {
    margin-bottom: 25px;
  }
`;
const MainHeading = styled.h3`
  font-size: 24px;
  font-family: "baloo_paaji_2semiBold";
  @media all and (max-width: 1200px) {
    font-size: 23px;
  }
  @media all and (max-width: 1170px) {
    font-size: 24px;
  }
  @media all and (max-width: 768px) {
    font-size: 22px;
  }
  @media all and (max-width: 480px) {
    font-size: 20px;
  }
`;
const Issue = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  font-family: "gordita_medium";
  @media all and (max-width: 1200px) {
    font-size: 19px;
  }
  @media all and (max-width: 1170px) {
    font-size: 20px;
  }
  @media all and (max-width: 768px) {
    font-size: 19px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
`;
const IssueDate = styled.p`
  font-size: 16px;
  font-family: "baloo_paaji_2regular";
  font-style: italic;
  color: #3f3f3f;
  margin-bottom: -2px;
  margin-left: 8px;
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
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
    font-family: "baloo_paaji_2semibold";
  }
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 590px) {
    width: 100%;
  }
  @media all and (max-width: 480px) {
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
  @media all and (max-width: 1280px) {
    flex-direction: column;
  }
  @media all and (max-width: 1170px) {
    flex-direction: row;
  }
  @media all and (max-width: 889px) {
    flex-direction: column;
  }
  @media all and (max-width: 590px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const CourseLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media all and (max-width: 1280px) {
    width: auto;
  }
  @media all and (max-width: 1170px) {
    width: 40%;
  }
  @media all and (max-width: 889px) {
    width: auto;
  }
`;
const CourseRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media all and (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const CourseLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  @media all and (max-width: 400px) {
    margin-right: unset;
  }
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
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 670px) {
    font-size: 14px;
  }
  @media all and (max-width: 640px) {
    font-size: 13px;
  }
`;
const CourseWrapper = styled.div`
  width: 61%;
`;
const CourseContent = styled.p`
  font-size: 17px;
  font-family: "baloo_paaji_2semibold";
  color: #0fa76f;
  font-style: italic;
  @media all and (max-width: 1200px) {
    font-size: 16px;
  }
  @media all and (max-width: 1170px) {
    font-size: 17px;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
  }
  @media all and (max-width: 670px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
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
  @media all and (max-width: 1200px) {
    font-size: 16px;
  }
  @media all and (max-width: 1170px) {
    font-size: 17px;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
  }
  @media all and (max-width: 640px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
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
  @media all and (max-width: 480px) {
    top: 45px;
  }
`;
const IdUrlContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  @media all and (max-width: 580px) {
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
  @media all and (max-width: 480px) {
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
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
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
  @media all and (max-width: 480px) {
    img {
      width: 12px;
    }
  }
`;
const ButtonText = styled.div`
  color: #fff;
  font-size: 16px;
  font-family: "baloo_paaji_2semibold";
  margin-left: 5px;
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;

const UrlContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  @media all and (max-width: 580px) {
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
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
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
  @media all and (max-width: 480px) {
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
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
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
  align-items: center;
`;
const CertificateView = styled.div`
  /* border: 1px solid red; */
  height: 90%;
  box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
`;
const SlideDot = styled.div`
  margin-top: 10px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Normal = styled.div`
  display: block;
  border-radius: 100px;
  border: 2px solid #d3d3d3;
  width: ${(props) => (props.isFirst || props.isSecond ? "22px" : "12px")};
  height: 12px;
  margin-right: 7px;
  cursor: pointer;
  background-color: #d3d3d3;
  transition: ease 0.4s;

  &.last {
    margin-right: unset;
  }
  &:hover {
    border: 2px solid #d3d3d3;
  }
`;
const Filled = styled.div`
  display: block;
  border-radius: 100px;
  border: 2px solid #d3d3d3;
  width: 12px;
  height: 12px;
  margin-right: 7px;
  cursor: pointer;
  background-color: unset;
  transition: ease 0.4s;
  &.last {
    margin-right: unset;
  }
  &:hover {
    border: 2px solid #d3d3d3;
  }
`;

const DownloadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  background-color: #0fa76f;
  font-family: "baloo_paaji_2semibold";
  margin: 30px auto 10px;
  cursor: pointer;
  width: 200px;
  padding: 10px 15px;
  transition: 0.5s ease;
  div {
    margin: 0 0 0 5px !important;
  }
  @media all and (max-width: 1200px) {
    font-size: 15px;
  }
  @media all and (max-width: 1170px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    font-size: 13px;
  }
`;

const CertWrapper = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0px 16px 24px;
  @media all and (max-width: 1170px) {
    width: 420px;
    height: 594px;
    margin: 0 auto;
  }
  @media all and (max-width: 580px) {
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
  background-color: #fff;
  position: relative;
  transition: ease 0.4s;
  cursor: pointer;
  @media all and (max-width: 1170px) {
    margin: 0 auto;
  }
  @media all and (max-width: 580px) {
    width: 233px;
    height: 330px;
  }
  @media all and (max-width: 400px) {
    width: 200px;
    height: 283px;
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
  font-size: 7px;
  color: #1a987c;
  font-family: "carlitoregular";
  transform: rotate(90deg) translate(100%, 0);
  transform-origin: 100% 0;
  top: 4%;
  right: 3%;
  z-index: 1;
  @media all and (max-width: 580px) {
    font-size: 4px;
  }
  @media all and (max-width: 400px) {
    font-size: 3px;
  }
`;

const CertificateData = styled.div`
  position: absolute;
  width: 80%;
  top: 22%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CertificateAchievement = styled.p`
  text-align: center;
  font-size: 13px;
  color: #1a987c;
  font-family: "carlitobold";
  margin-bottom: 5px;
  @media all and (max-width: 580px) {
    font-size: 7px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 400px) {
    font-size: 6px;
    margin-bottom: 1px;
  }
`;
const CertificateID = styled.p`
  text-align: center;
  font-size: 10px;
  color: #1a987c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    font-size: 5px;
  }
  @media all and (max-width: 400px) {
    font-size: 4px;
  }
`;
const CertificateName = styled.p`
  text-align: center;
  font-size: 20px;
  color: #18484c;
  font-family: "carlitobold";
  @media all and (max-width: 580px) {
    font-size: 13px;
  }
  @media all and (max-width: 400px) {
    font-size: 12px;
  }
`;
const ScoreCardName = styled.p`
  text-align: center;
  font-size: 18px;
  color: #18484c;
  font-family: "carlitobold";
  margin-top: -5px;
  @media all and (max-width: 580px) {
    font-size: 11px;
  }
  @media all and (max-width: 400px) {
    font-size: 10px;
  }
`;
const CompletedText = styled.p`
  text-align: center;
  font-size: 10px;
  color: #1a987c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
  }
`;
const CourseDetailsText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #18484c;
  font-family: "carlitobold";
  text-transform: uppercase;
  @media all and (max-width: 580px) {
    font-size: 8px;
  }
  @media all and (max-width: 400px) {
    font-size: 7px;
  }
`;
const ScoreText = styled.p`
  text-align: center;
  font-size: 12px;
  color: #1a987c;
  font-family: "carlitobold";
  @media all and (max-width: 580px) {
    font-size: 10px;
  }
  @media all and (max-width: 400px) {
    font-size: 9px;
  }
`;
const ScoreSheet = styled.div`
  margin-top: 15px;
  width: 100%;
  max-height: 217px;
  display: flex;
  flex-direction: column;
  @media all and (max-width: 580px) {
    margin-top: 10px;
    max-height: 115px;
  }
  @media all and (max-width: 400px) {
    max-height: 100px;
  }
`;
const SkillContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: unset;
  }
  @media all and (max-width: 580px) {
    margin-bottom: 5px;
  }
  @media all and (max-width: 400px) {
    margin-bottom: 4px;
  }
`;
const SkillNameContainer = styled.div`
  width: calc(100% - 190px);
  font-size: 10px;
  color: #18484c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    width: calc(100% - 90px);
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
  }
`;
const SkillRatingContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SkillScoreContainer = styled.div`
  margin-right: 10px;
  width: 40px;
  text-align: right;
  font-size: 10px;
  color: #1a987c;
  font-family: "carlitobold";
  @media all and (max-width: 580px) {
    width: 22px;
    margin-right: 5px;
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    width: 20px;
    margin-right: 4px;
    font-size: 5px;
  }
`;

const StarRatingMainScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Stars = styled.div`
  width: 11px;
  height: 11px;
  margin-right: 5px;
  &:last-child {
    margin-right: unset;
  }
  img {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  @media all and (max-width: 580px) {
    width: 5px !important;
    height: 5px !important;
    margin-right: 3px;
  }
  @media all and (max-width: 400px) {
    width: 4px !important;
    height: 4px !important;
    margin-right: 2px;
  }
`;
const StudentDescription = styled.p`
  text-align: center;
  font-size: 10px;
  color: #1a987c;
  font-family: "carlitoregular";
  margin: 15px 0 7px 0;
  span {
    font-family: "carlitobold";
    sup {
      vertical-align: super;
      font-size: x-small;
    }
  }
  @media all and (max-width: 580px) {
    margin: 8px 0 5px 0;

    font-size: 6px;
    span {
      font-family: "carlitobold";
      sup {
        vertical-align: super;
        font-size: 4px;
      }
    }
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
    margin: 7px 0 3px 0;

    span {
      sup {
        font-size: 2px;
      }
    }
  }
`;
const WishText = styled.p`
  text-align: center;
  font-size: 10px;
  color: #1a987c;
  font-family: "carlitoregular";
  margin-bottom: 5%;
  @media all and (max-width: 580px) {
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
  }
`;
const Signature = styled.img`
  width: 21%;
  display: block;
  @media all and (max-width: 400px) {
    width: 19%;
  }
`;
const Seal = styled.img`
  width: 11%;
  position: absolute;
  bottom: 22%;
  right: 35%;
  display: block;
  transform: rotate(-10deg);
  @media all and (max-width: 580px) {
    width: 10%;
  }
  @media all and (max-width: 400px) {
    width: 9%;
  }
`;
const CeoName = styled.p`
  text-align: center;
  font-size: 10px;
  color: #18484c;
  font-family: "carlitobold";
  @media all and (max-width: 580px) {
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
  }
`;
const Designation = styled.p`
  text-align: center;
  font-size: 8px;
  color: #1a987c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    font-size: 4px;
  }
  @media all and (max-width: 400px) {
    font-size: 3px;
  }
`;
const WebUrlSteyp = styled.p`
  text-align: center;
  font-size: 8px;
  color: #18484c;
  font-family: "carlitoregular";
  margin-bottom: 2%;
  @media all and (max-width: 580px) {
    font-size: 5px;
  }
  @media all and (max-width: 400px) {
    font-size: 4px;
  }
`;
const SkillMailSteyp = styled.p`
  position: absolute;
  z-index: 10;
  bottom: 4%;
  right: 10%;
  text-align: center;
  font-size: 10px;
  color: #18484c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    font-size: 5px;
  }
  @media all and (max-width: 400px) {
    font-size: 4px;
  }
`;
const SkillWebUrlSteyp = styled.p`
  position: absolute;
  z-index: 10;
  bottom: 4%;
  left: 10%;
  text-align: center;
  font-size: 10px;
  color: #18484c;
  font-family: "carlitoregular";
  @media all and (max-width: 580px) {
    font-size: 6px;
  }
  @media all and (max-width: 400px) {
    font-size: 5px;
  }
`;
const SteypLogo = styled.img`
  width: 95px;
  display: block;
  object-fit: contain;

  @media all and (max-width: 580px) {
    width: 45px;
  }
  @media all and (max-width: 400px) {
    width: 40px;
  }
`;
const SkillSteypLogo = styled.img`
  position: absolute;
  z-index: 20;
  bottom: 87px;
  width: 95px;
  display: block;
  object-fit: contain;
  @media all and (max-width: 580px) {
    width: 45px;
    bottom: 45px;
  }
  @media all and (max-width: 400px) {
    width: 40px;
    bottom: 40px;
  }
`;
const DownloadError = styled.div`
  font-size: 16px;
  color: #ff2d2d;
  text-align: center;
  @media all and (max-width: 580px) {
    font-size: 15px;
  }
  @media all and (max-width: 400px) {
    font-size: 14px;
  }
`;
