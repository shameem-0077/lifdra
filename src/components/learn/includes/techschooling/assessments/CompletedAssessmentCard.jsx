import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CompletedAssessmentCard = ({ data, path, subject_slug }) => {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );

  let score = (data.total_score / data.maximum_score) * 10;

  return userSubscriptionType === "trial_end" ||
    userSubscriptionType === "expired_subscription" ? (
    <LockedCardContanier className="anim-fade">
      <SpecialWrapper>
        <ImageContainer>
          <Image src={data.image} alt="" />
        </ImageContainer>
        <ContentArea>
          <ContentTop>
            {data.auto_id < 10 ? (
              <HighLight>#0{data.auto_id}</HighLight>
            ) : (
              <HighLight>#{data.auto_id}</HighLight>
            )}
            {data.practice_score !== "Not scored" && (
              <StarLabel>
                {score <= 9 ? (
                  <H2>
                    0{Math.round((data.total_score / data.maximum_score) * 10)}
                    /10
                  </H2>
                ) : (
                  <H2>
                    {Math.round((data.total_score / data.maximum_score) * 10)}
                    /10
                  </H2>
                )}
                <StarIcon className="sc-fHxwqH jeMXkI las la-star" />
              </StarLabel>
            )}
          </ContentTop>
          <ContentTitle>{data.title}</ContentTitle>
        </ContentArea>
      </SpecialWrapper>
      <LockIcon className="las la-lock"></LockIcon>
    </LockedCardContanier>
  ) : (
    <CardContanier
      className="anim-fade"
      to={`/nanodegree/${subject_slug}/assessments/view/${data.id}/`}
    >
      <SpecialWrapper>
        <ImageContainer>
          <Image src={data.image} alt="" />
          {/* {data.status === "completed" && (
						<StarLabel>
							<StarIcon className="sc-fHxwqH jeMXkI las la-star" />
							{Math.round(
								(data.total_score / data.maximum_score) * 10
							)}
							/10
						</StarLabel>
					)} */}
        </ImageContainer>
        <ContentArea>
          <ContentTop>
            {data.auto_id < 10 ? (
              <HighLight>#0{data.auto_id}</HighLight>
            ) : (
              <HighLight>#{data.auto_id}</HighLight>
            )}
            {data.practice_score !== "Not scored" && (
              <StarLabel>
                {Math.round(score) < 10 ? (
                  <H2>0{Math.round(score)}</H2>
                ) : (
                  <H2>{Math.round(score)}</H2>
                )}
                <StarIcon className="sc-fHxwqH jeMXkI las la-star" />
              </StarLabel>
            )}
          </ContentTop>
          <ContentTitle>{data.title}</ContentTitle>
          {data.status === "completed"
            ? data.total_score < data.maximum_score && (
                <ButtonContainer path={path}>
                  {data.is_revaluation_available &&
                    (data.revaluation_status ? null : (
                      <RevaluationButton>
                        <RevaluationButtonLink
                          to={`/nanodegree/${subject_slug}/assessments/view/${data.id}/revaluation/`}
                        >
                          <RevaluationCoins>
                            <CoinCount>1</CoinCount>
                            <CoinIcon
                              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                              alt=""
                            />
                          </RevaluationCoins>
                          Apply for revaluation
                        </RevaluationButtonLink>
                      </RevaluationButton>
                    ))}
                  {data.is_improvement_available &&
                    (data.improvement_status ? null : (
                      <ImprovementButton>
                        <ImproveButtonLink
                          to={`/nanodegree/${subject_slug}/assessments/view/${data.id}/improvement/`}
                        >
                          <ImproveCoins>
                            <CoinCount>1</CoinCount>
                            <CoinIcon
                              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                              alt=""
                            />
                          </ImproveCoins>
                          Apply for improvement
                        </ImproveButtonLink>
                      </ImprovementButton>
                    ))}
                </ButtonContainer>
              )
            : data.status === "evaluating" && (
                <>
                  {score && score != "Not scored" ? (
                    ""
                  ) : (
                    <Description>
                      You have attended this assessment and is pending for
                      verification
                    </Description>
                  )}
                </>
              )}
        </ContentArea>
      </SpecialWrapper>
      {data.status === "completed" && data.total_score < data.maximum_score && (
        <NewButtonContainer path={path}>
          {data.is_revaluation_available &&
            (data.revaluation_status ? null : (
              <RevaluationButton>
                <RevaluationButtonLink
                  to={`/nanodegree/${subject_slug}/assessments/view/${data.id}/revaluation/`}
                >
                  <RevaluationCoins>
                    <CoinCount>1</CoinCount>
                    <CoinIcon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                      alt=""
                    />
                  </RevaluationCoins>
                  Apply for Revaluation
                </RevaluationButtonLink>
              </RevaluationButton>
            ))}
          {data.is_revaluation_available &&
            (data.revaluation_status ? null : (
              <ImprovementButton>
                <ImproveButtonLink
                  to={`/nanodegree/${subject_slug}/assessments/view/${data.id}/improvement/`}
                >
                  <ImproveCoins>
                    <CoinCount>1</CoinCount>
                    <CoinIcon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                      alt=""
                    />
                  </ImproveCoins>
                  Apply for Improvement
                </ImproveButtonLink>
              </ImprovementButton>
            ))}
        </NewButtonContainer>
      )}
    </CardContanier>
  );
};
export default CompletedAssessmentCard;

const SpecialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  background-color: #f9f9fb;
  border-radius: 6px;
  @media all and (max-width: 690px) {
    width: 100%;
  }
`;
const CardContanier = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f9f9fb;
  /* padding: 20px 10px 20px 0px; */
  margin-bottom: 10px;
  border-radius: 6px;
  &:last-child {
    margin-bottom: 0;
  }
  @media all and (max-width: 690px) {
    /* padding: 10px; */
    width: 100%;
    padding: 0;
    margin-bottom: 35px;
    display: block;
  }
  @media (max-width: 640px) {
    width: 100%;
    margin: 0 auto 30px;
  }
  @media all and (max-width: 400px) {
    width: 100%;
  }
  /* @media all and (max-width: 480px) {
        width: 100%;
    } */
`;
const LockedCardContanier = styled.div`
  cursor: not-allowed;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px 10px 20px 20px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 6px;

  @media all and (max-width: 690px) {
    padding: 10px;
  }
  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: rgba(255, 255, 255, 0.5);
  }
`;
const LockIcon = styled.i`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 22px;
`;
const ImageContainer = styled.div`
  position: relative;
  // margin-right: 20px;
  min-width: 42%;
  max-width: 42%;
  border-radius: 6px;
  overflow: hidden;
  /* @media all and (max-width: 1292px) {
        width: 40%;
    } */
  // min-width: 150px;
  @media all and (max-width: 690px) {
    min-width: 100%;
    max-width: 100%;
    margin: 0;
    /* margin-bottom: 20px; */
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const StarLabel = styled.span`
  display: flex;
  color: #e1b078;
  font-family: gordita_regular;
  font-size: 15px;
  border-radius: 30px;
  align-items: baseline;
`;
const StarIcon = styled.i`
  display: inline-block;
  /* margin-bottom: 5px; */
`;

const ContentArea = styled.div`
  width: 57%;
  padding: 15px;
  @media all and (max-width: 1550px) {
    /* width: 63%; */
  }
  @media all and (max-width: 690px) {
    width: 100%;
  }
`;
const ContentTitle = styled.h3`
  font-family: gordita_medium;
  font-size: 14px;
  max-width: 80%;
  line-height: 20px;
  /* @media all and (max-width: 1280px) {
		font-size: 16px;
	} */
  @media all and (max-width: 690px) {
    max-width: 500px;
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
`;
const HighLight = styled.span`
  display: block;
  color: #41ae76;
  font-family: gordita_medium;
  margin-bottom: 5px;
`;
const Description = styled.p`
  line-height: 1.2;
  font-family: gordita_regular;
  margin-top: 5px;
  font-style: italic;
  font-size: 12px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
  grid-gap: 10px;
  @media all and (max-width: 1620px) {
    display: none;
  }
  @media all and (max-width: 1000px) {
    display: flex;
    /* justify-content: center; */
  }
  @media all and (max-width: 530px) {
    display: block;
  }
`;
const NewButtonContainer = styled.div`
  width: 100%;
  display: none;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
  grid-gap: 10px;
  @media all and (max-width: 1620px) {
    display: flex;
    padding: 15px 0 15px 15px;
  }

  @media all and (max-width: 1000px) {
    display: none;
  }
`;
const RevaluationButton = styled.span`
  display: flex;
  justify-content: flex-start;
  border: 1px solid #089ef7;
  margin-right: 10px;
  border-radius: 30px;
  overflow: hidden;
  padding-right: 10px;
  @media all and (max-width: 980px) {
    padding-right: 10px;
    margin-bottom: 0;
  }
  @media (max-width: 764px) {
    margin-right: 5px;
  }
  @media (max-width: 695px) {
    margin-bottom: 10px;
    width: 70%;
    margin-right: 0;
  }
  @media all and (max-width: 690px) {
    width: 100%;
  }
`;
const RevaluationButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #089ef7;
  font-family: gordita_medium;

  @media (max-width: 1550px) {
    font-size: 12px;
  }
  @media (max-width: 1100px) {
    font-size: 11px;
  }
  @media all and (max-width: 1000px) {
    font-size: 12px;
  }
  @media all and (max-width: 730px) {
    font-size: 11px;
  }
  @media all and (max-width: 690px) {
    font-size: 12px;
  }
  @media (max-width: 530px) {
    width: 100%;
    // margin: 0 auto;
    margin-right: 0;
    font-size: 14px;
    // justify-content: center;
    /* font-size: 16px; */
  }
`;
const RevaluationCoins = styled.span`
  background: #089ef7;
  height: 100%;
  display: flex;
  padding: 5px 7px;
  align-items: center;
  margin-right: 5px;
  font-size: 16px;
  color: #e3df2f;
`;
const CoinCount = styled.span`
  margin-right: 5px;
  display: block;
  max-height: 17px;
`;
const CoinIcon = styled.img`
  display: inline-block;
  /* transform: translateY(-3px); */
`;
const ImprovementButton = styled.span`
  display: inline-block;
  border: 1px solid #399e59;
  border-radius: 30px;
  overflow: hidden;
  color: #399e59 !important;
  padding-right: 10px;
  @media (max-width: 695px) {
    width: 70%;
  }
  @media all and (max-width: 690px) {
    width: 100%;
  }
  /* @media (max-width: 530px) {
        width: 100%;
        font-size: 14px;
    } */
`;
const ImproveCoins = styled.span`
  background: #399e59;
  height: 100%;
  display: flex;
  padding: 5px 7px;
  align-items: center;
  margin-right: 5px;
  font-size: 16px;
  color: #e3df2f;
  // display: none;
`;
const ImproveButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: gordita_medium;
  font-size: 12px;
  color: #399e59;
  @media all and (max-width: 1550px) {
    font-size: 12px;
  }
  @media (max-width: 1100px) {
    font-size: 11px;
  }
  @media all and (max-width: 1000px) {
    font-size: 12px;
  }
  @media all and (max-width: 730px) {
    font-size: 11px;
  }
  @media all and (max-width: 690px) {
    font-size: 12px;
  }
  @media (max-width: 530px) {
    width: 100%;
    // margin: 0 auto;
    // justify-content: center;
    font-size: 14px;
  }
`;
const H2 = styled.span`
  font-family: gordita_regular;
  font-size: 15px;
  border-radius: 30px;
  align-items: baseline;
`;
const Label = styled.span`
  display: block;
  color: #a8a8a8;
  font-family: gordita_regular;
  font-size: 13px;
`;
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
