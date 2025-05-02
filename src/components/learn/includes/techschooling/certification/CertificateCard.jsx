import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";
import InterviewModal from "./InterviewModal";
import Loader from "../general/loaders/Loader";
import Lottie from "react-lottie";
import ButtonLoader from "../../../../../assets/lotties/modal/buttonloader.json";

function CertificateCard({ subject_slug }) {
  const [isModal, setModal] = useState(false);
  const user_data = useSelector((state) => state.user_data);
  const [certificateDatas, setCertificateDatas] = useState([]);
  const [selectedDesignationPK, setSelectedDesignationPK] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [IsButtonLoading, setisButtonLoading] = useState(false);

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ButtonLoader,
    rendererSettings: {},
  };

  const getDateStrWithoutReplace = (value) => {
    let date = new Date(value);
    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()];
    let date_str = date.getDate() + " " + month + " " + date.getFullYear();
    return date_str;
  };

  useEffect(() => {
    let { access_token } = user_data;

    learnConfig
      .get(`/certifications/completed-designations/${subject_slug}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        let { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setCertificateDatas(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : certificateDatas.length > 0 ? (
        <MainContainer>
          <InterviewModal
            designationPK={selectedDesignationPK}
            isModal={isModal}
            setModal={setModal}
            setIsApplied={setIsApplied}
            isApplied={isApplied}
          />
          {certificateDatas.map((data) => (
            <CertificateContainer key={data.id}>
              <CourseContainer>
                <CourseImg src={data.image} alt="Profession" />
              </CourseContainer>
              <StagesContainer>
                <StageCard>
                  <RightInnerCardLeft>
                    <RightInnerLeftTop>
                      <Left>
                        <CardTitle>
                          {data.designation_name} Certification
                        </CardTitle>
                        <CourseCompleteText>
                          You have completed your course. Now you can apply for
                          a certificate.
                        </CourseCompleteText>
                        {!data.is_eligible && (
                          <NotEligibleText>
                            Sorry! You can't apply for your certificate as the
                            Practice / Assessment evaluation is processing
                          </NotEligibleText>
                        )}
                      </Left>
                      <Top>
                        <CardTitle>
                          {data.designation_name} Certification
                        </CardTitle>
                      </Top>
                      <Right>
                        <CourseCompleteTextTwo>
                          You have completed your course. Now you can apply for
                          a certificate.
                        </CourseCompleteTextTwo>
                        {data.is_issued && (
                          <Score>
                            <div>
                              <ScoreNum>{data.rating}</ScoreNum>
                              <Star
                                src={require("../../../../../assets/images/certificate/star.svg")}
                                alt="image"
                              />
                            </div>
                            <ScoreText>Total Score</ScoreText>
                          </Score>
                        )}
                      </Right>
                    </RightInnerLeftTop>
                    {downloadError && (
                      <NotEligibleTextTwo>
                        Something went wrong! Please try Again
                      </NotEligibleTextTwo>
                    )}
                    {!data.is_eligible && (
                      <NotEligibleTextTwo>
                        Sorry! You can't apply for your certificate as the
                        Practice / Assessment evaluation is processing
                      </NotEligibleTextTwo>
                    )}
                    <RightInnerLeftBottom>
                      <IssueDate>
                        <DateLeft>
                          <DateText>Started</DateText>
                          <DateNum>
                            {getDateStrWithoutReplace(data.date_added)}
                          </DateNum>
                        </DateLeft>
                        <DateRight>
                          <DateText>Completed</DateText>
                          <DateNum>
                            {getDateStrWithoutReplace(data.date_updated)}
                          </DateNum>
                        </DateRight>
                      </IssueDate>
                    </RightInnerLeftBottom>
                  </RightInnerCardLeft>

                  {data.is_issued ? (
                    <RightInnerCardRightDownload>
                      <ScoreRight>
                        <div>
                          <ScoreNum>{data.rating}</ScoreNum>
                          <Star
                            src={require("../../../../../assets/images/certificate/star.svg")}
                            alt="image"
                          />
                        </div>

                        <ScoreText>Total Score</ScoreText>
                      </ScoreRight>

                      <DownloadButton
                        to={`/nanodegree/${subject_slug}/certification/${data.certificate_id}`}
                      >
                        View Certificate
                      </DownloadButton>
                    </RightInnerCardRightDownload>
                  ) : (
                    <RightInnerCardRight>
                      {data.is_eligible &&
                      ((data.designation_pk === selectedDesignationPK &&
                        isApplied) ||
                        data.is_applied) ? (
                        <ProcessButton>
                          Verification on process
                          <div>
                            <img
                              src={require("../../../../../assets/images/certificate/clock.svg")}
                              alt="image"
                            />
                          </div>
                        </ProcessButton>
                      ) : data.is_eligible ? (
                        <CardButton
                          onClick={() => {
                            setModal(true);
                            setSelectedDesignationPK(data.designation_pk);
                          }}
                        >
                          Apply Certificate
                        </CardButton>
                      ) : (
                        <GreyButton>Apply Certificate</GreyButton>
                      )}
                    </RightInnerCardRight>
                  )}
                </StageCard>
              </StagesContainer>
            </CertificateContainer>
          ))}
        </MainContainer>
      ) : (
        <EmptyContainer>
          <EmptyImage
            src={require("../../../../../assets/images/certificate/emptyPage.svg")}
          />
          <EmptyHead> Not Eligible</EmptyHead>
          <EmptyDescription>
            Oops! please complete your designation as soon as possible.
          </EmptyDescription>
        </EmptyContainer>
      )}
    </>
  );
}

export default CertificateCard;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 240px);
  width: 100%;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 230px);
  width: 100%;
`;
const EmptyImage = styled.img`
  width: 375px;
  @media all and (max-width: 840px) {
    width: 320px;
  }
  @media all and (max-width: 580px) {
    width: 280px;
  }
  @media all and (max-width: 380px) {
    width: 95%;
  }
`;
const EmptyHead = styled.h6`
  font-size: 20px;
  color: #393838;
  font-family: "baloo_paaji_2semiBold";
  margin-top: -50px;
  margin-bottom: 5px;
  @media all and (max-width: 840px) {
    font-size: 18px;
    margin-top: -50px;
  }
  @media all and (max-width: 580px) {
    font-size: 16px;
    margin-top: -50px;
  }
  @media all and (max-width: 380px) {
    margin-top: -40px;
  }
`;
const EmptyDescription = styled.p`
  width: 90%;
  text-align: center;
  font-size: 16px;
  @media all and (max-width: 840px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;

const MainContainer = styled.div`
  transition: 0.4s;
  @media all and (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  @media all and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  @media all and (max-width: 480px) {
    margin: -5px;
  }
`;
const CertificateContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 25px;
  height: 270px;
  border: 1px solid #e0e0e0;
  border-radius: 9px;
  background-color: #fff;
  margin-bottom: 25px;
  :last-child {
    margin-bottom: unset;
  }
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 20px;
    margin-bottom: unset;
  }
  @media all and (max-width: 840px) {
    padding: 15px;
  }
  @media all and (max-width: 768px) {
    padding: 25px;
  }
  @media all and (max-width: 580px) {
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const CourseContainer = styled.div`
  width: 300px;
  margin-right: 25px;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  @media all and (max-width: 1200px) {
    width: 100%;
    margin-right: unset;
    margin-bottom: 20px;
    height: auto;
  }
  @media all and (max-width: 840px) {
    margin-bottom: 15px;
  }
  @media all and (max-width: 768px) {
    margin-bottom: 25px;
  }
  @media all and (max-width: 580px) {
    margin-bottom: 20px;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 15px;
  }
`;
const CourseImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const StagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 300px);
  height: 100%;
  @media all and (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
`;

const StageCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #f9f9fb;
  border: 1px solid #e0e0e0;
  padding: 25px;
  border-radius: 6px;
  position: relative;
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  @media all and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  @media all and (max-width: 768px) {
    height: auto;
    width: 100%;
    padding: 25px;
  }
  @media all and (max-width: 580px) {
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const RightInnerCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @media all and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
const RightInnerLeftTop = styled.div`
  display: block;
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media all and (max-width: 840px) {
  }
  @media all and (max-width: 768px) {
    flex-direction: column;
  }
  @media all and (max-width: 580px) {
    flex-direction: column;
  }
  @media all and (max-width: 580px) {
  }
`;

const Left = styled.div`
  width: 100%;
  @media all and (max-width: 1200px) {
    display: none;
  }
`;

const Top = styled.div`
  display: none;
  @media all and (max-width: 1200px) {
    display: block;
    width: 100%;
  }
`;
const Right = styled.div`
  display: none;
  @media all and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  @media all and (max-width: 768px) {
    justify-content: space-between;
  }
  @media all and (max-width: 580px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  @media all and (max-width: 440px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
const CardTitle = styled.h5`
  font-size: 18px;
  color: #393838;
  font-family: "baloo_paaji_2semiBold";
  line-height: 1.3em;
  margin-bottom: 5px;
  @media all and (max-width: 900px) {
    font-size: 16px;
  }
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
  @media all and (max-width: 380px) {
    font-size: 14px;
  }
`;
const CourseCompleteText = styled.p`
  font-size: 15px;
  font-family: "gordita_medium";
  color: #6a6a6a;
  line-height: 1.3em;
  width: 85%;

  @media all and (max-width: 1200px) {
    font-size: 14px;
    width: 68%;
  }
  @media all and (max-width: 900px) {
    font-size: 13px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
    width: auto;
  }
`;
const CourseCompleteTextTwo = styled.p`
  display: none;
  font-family: "gordita_medium";
  color: #6a6a6a;
  line-height: 1.3em;
  @media all and (max-width: 1200px) {
    font-size: 14px;
    width: auto;
    display: block;
  }
  @media all and (max-width: 580px) {
    font-size: 14px;
    display: block;
  }

  @media all and (max-width: 440px) {
    width: 100%;
    /* font-size: 13px; */
  }
  @media all and (max-width: 380px) {
    font-size: 13px;
  }
`;
const NotEligibleText = styled.p`
  font-size: 15px;
  font-family: "gordita_medium";
  color: #e71f1f;
  line-height: 1.3em;
  width: 85%;
  margin-top: 10px;
  @media all and (max-width: 1200px) {
    display: none;
  }
`;
const NotEligibleTextTwo = styled.p`
  display: none;
  font-size: 15px;
  font-family: "gordita_medium";
  color: #e71f1f;
  line-height: 1.3em;
  width: 85%;
  margin-top: 10px;
  @media all and (max-width: 1200px) {
    display: block;
    font-size: 14px;
    width: 100%;
  }
  @media all and (max-width: 900px) {
    font-size: 13px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
`;

const RightInnerLeftBottom = styled.div`
  display: flex;
  @media all and (max-width: 1200px) {
    margin: 20px 0;
  }
  @media all and (max-width: 980px) {
    justify-content: space-between;
  }
`;
const IssueDate = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.3em;
  padding: 10px;
  min-height: 42px;
  border: 2px dashed #10a770;
  background-color: #e7fff6;
  border-radius: 5px;
  @media all and (max-width: 1200px) {
    width: 100%;
    justify-content: space-between;
  }
  @media all and (max-width: 980px) {
    justify-content: space-around;
  }
  @media all and (max-width: 440px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;
const DateLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media all and (max-width: 980px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: unset;
  }
  @media all and (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: unset;
  }
  @media all and (max-width: 560px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: unset;
  }
  @media all and (max-width: 440px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: unset;
  }
`;
const DateRight = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 980px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media all and (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: unset;
  }
  @media all and (max-width: 560px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: unset;
  }
  @media all and (max-width: 440px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: unset;
  }
`;

const DateText = styled.p`
  font-size: 14px;
  color: #6a6a6a;
  font-family: "baloo_paaji_2semiBold";
  margin-right: 5px;
  line-height: 1.3em;
  @media all and (max-width: 980px) {
    margin-right: unset;
    text-align: left;
  }
  @media all and (max-width: 768px) {
    margin-right: 5px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
  @media all and (max-width: 380px) {
    font-size: 12px;
  }
`;
const DateNum = styled.p`
  font-size: 14px;
  font-family: "baloo_paaji_2semiBold";
  color: #10a770;
  font-style: italic;
  line-height: 1.3em;
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
  @media all and (max-width: 380px) {
    font-size: 12px;
  }
`;

const RightInnerCardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media all and (max-width: 1200px) {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media all and (max-width: 768px) {
    display: block;
    width: 100%;
    height: auto;
  }
`;
const RightInnerCardRightDownload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  @media all and (max-width: 1200px) {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media all and (max-width: 768px) {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "gordita_medium";
  color: #fff;
  background-color: #0fa76f;
  /* padding: 8px 12px; */

  border-radius: 5px;
  width: 230px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  @media all and (max-width: 1200px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
  @media all and (max-width: 440px) {
    font-size: 14px;
  }
`;
const DownloadButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "gordita_medium";
  color: #fff;
  background-color: #0fa76f;
  /* padding: 8px 12px; */
  border-radius: 5px;
  width: 230px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  div {
    margin: 0 0 0 5px !important;
  }
  @media all and (max-width: 1200px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
  @media all and (max-width: 440px) {
    font-size: 14px;
  }
`;
const GreyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "gordita_medium";
  color: #fff;
  background-color: #bbbbbb;
  /* padding: 8px 12px; */
  border-radius: 5px;
  width: 230px;
  height: 40px;

  text-align: center;
  cursor: not-allowed;
  @media all and (max-width: 1200px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
  @media all and (max-width: 440px) {
    font-size: 14px;
  }
`;

const ProcessButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "gordita_medium";
  color: #f5ad08;
  background-color: #fffaef;
  border: 2px dashed #f5ad08;
  /* padding: 8px 12px; */
  border-radius: 5px;
  width: 230px;
  height: 40px;

  text-align: center;
  cursor: not-allowed;
  div {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    img {
      display: block;
      width: 17px;
      height: 17px;
    }
  }
  @media all and (max-width: 1200px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
  @media all and (max-width: 440px) {
    font-size: 14px;
  }
`;

const Score = styled.div`
  text-align: center;
  @media all and (max-width: 1200px) {
    width: 200px;
  }
  @media all and (max-width: 768px) {
    width: 180px;
  }
  @media all and (max-width: 440px) {
    width: 100%;
    margin-top: 10px;
  }
`;
const ScoreRight = styled.div`
  text-align: center;
  margin-bottom: 15px;
  @media all and (max-width: 1200px) {
    display: none;
  }
`;
const ScoreNum = styled.div`
  font-size: 45px;
  font-family: "gordita_medium";
  color: #f8c146;
  margin-right: 5px;
  display: inline-block;
  line-height: 1em;
  @media all and (max-width: 1200px) {
    font-size: 30px;
  }
  @media all and (max-width: 900px) {
    font-size: 26px;
  }
  @media all and (max-width: 768px) {
    font-size: 30px;
  }
  @media all and (max-width: 480px) {
    font-size: 28px;
  }
`;
const Star = styled.img`
  width: 29px;
  height: 29px;
  @media all and (max-width: 1200px) {
    width: 20px;
    height: 20px;
  }
  @media all and (max-width: 900px) {
    width: 16px;
    height: 16px;
  }
  @media all and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
  @media all and (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;
const ScoreText = styled.p`
  font-size: 14px;
  font-family: "baloo_paaji_2semibold";
  color: #6a6a6a;
  @media all and (max-width: 900px) {
    font-size: 13px;
  }
  @media all and (max-width: 860px) {
    font-size: 12px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;
