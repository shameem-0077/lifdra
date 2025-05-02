import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CompletedPracticeCard = ({ data, path, subject_slug }) => {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );

  return userSubscriptionType === "trial_end" ||
    userSubscriptionType === "expired_subscription" ? (
    <LockedCardContanier className="anim-fade">
      <SpecialWrapper>
        <ImageContainer>
          <Image src={data.image} alt="" />
          {/* {data.practice_score !== "Not scored" && (
                        <StarLabel>
                            {data.practice_score}
                            <StarIcon className="sc-fHxwqH jeMXkI las la-star" />
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
                {data.practice_score < 10 && data.practice_score !== 0 ? (
                  <H2>0{data.practice_score}</H2>
                ) : (
                  <H2>{data.practice_score}</H2>
                )}
                {/* {data.practice_score} */}
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
      to={`/nanodegree/${subject_slug}/practices/view/${data.id}/`}
    >
      <SpecialWrapper>
        <ImageContainer>
          <Image src={data.image} alt="" />
          {/* {data.practice_score !== "Not scored" && (
						<StarLabel>
							{data.practice_score}
							<StarIcon className="sc-fHxwqH jeMXkI las la-star" />
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
                {data.practice_score < 10 && data.practice_score !== 0 ? (
                  <H2>0{data.practice_score}</H2>
                ) : (
                  <H2>{data.practice_score}</H2>
                )}
                <StarIcon className="sc-fHxwqH jeMXkI las la-star" />
              </StarLabel>
            )}
          </ContentTop>
          <ContentTitle>{data.title}</ContentTitle>
          <Label>
            {data.designation} / {data.skill}
          </Label>

          {data.status === "completed"
            ? data.practice_score < 10 && (
                <ButtonContainer path={path}>
                  {data.is_revaluation_enabled &&
                    data.is_revaluation_available &&
                    (data.revaluation_status ? null : (
                      <RecheckButton>
                        <RecheckButtonLink
                          to={`/nanodegree/${subject_slug}/practices/view/${data.id}/revaluation/`}
                        >
                          <RecheakCoins>
                            <CoinCount>1</CoinCount>
                            <CoinIcon
                              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                              alt=""
                            />
                          </RecheakCoins>
                          Apply for revaluation
                        </RecheckButtonLink>
                      </RecheckButton>
                    ))}
                  {data.is_improvement_enabled &&
                    data.is_improvement_available &&
                    (data.improvement_status ? null : (
                      <ImporvementButton>
                        <ImproveButtonLink
                          to={`/nanodegree/${subject_slug}/practices/view/${data.id}/improvement/`}
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
                      </ImporvementButton>
                    ))}
                </ButtonContainer>
              )
            : data.status === "evaluating" && (
                <Description>
                  You have attended this practice and is pending for
                  verification
                </Description>
              )}
        </ContentArea>
      </SpecialWrapper>
      {/* {data.status === "completed" && data.practice_score < 10 && ( */}
      {data.status === "completed" &&
        data.practice_score < 10 &&
        data.is_revaluation_available &&
        (data.revaluation_status ? null : (
          <NewButtonContainer path={path}>
            {data.is_revaluation_available &&
              (data.revaluation_status ? null : (
                <RecheckButton>
                  <RecheckButtonLink
                    to={`/nanodegree/${subject_slug}/practices/view/${data.id}/revaluation/`}
                  >
                    <RecheakCoins>
                      <CoinCount>1</CoinCount>
                      <CoinIcon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/coin.svg"
                        alt=""
                      />
                    </RecheakCoins>
                    Apply for Revaluation
                  </RecheckButtonLink>
                </RecheckButton>
              ))}
            {data.is_revaluation_available &&
              (data.revaluation_status ? null : (
                <ImporvementButton>
                  <ImproveButtonLink
                    to={`/nanodegree/${subject_slug}/practices/view/${data.id}/improvement/`}
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
                </ImporvementButton>
              ))}
          </NewButtonContainer>
        ))}
    </CardContanier>
  );
};
export default CompletedPracticeCard;

const SpecialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 8px;
`;
const CardContanier = styled(Link)`
  background-color: #f9f9fb;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* margin-bottom: 20px; */
  border-radius: 7px;
  position: relative;
  flex-direction: column;
  @media all and (max-width: 690px) {
    padding: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
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
  border-radius: 7px;
  position: relative;
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
  width: 41%;
  border-radius: 6px;
  overflow: hidden;
  @media all and (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;
const StarLabel = styled.span`
  /* position: absolute; */
  /* top: 10px;
	right: 10px; */
  /* padding: 5px 15px 3px; */
  /* background-color: #dbc900; */
  display: flex;
  padding: 5px 15px 3px;
  /* background-color: #dbc900; */
  color: #dba665;
  font-family: gordita_regular;
  font-size: 16px;
  border-radius: 30px;
  align-items: baseline;
`;
const H2 = styled.span`
  font-family: gordita_regular;
  font-size: 15px;
  border-radius: 30px;
  align-items: baseline;
`;
const StarIcon = styled.i`
  display: inline-block;
  font-size: 17px;
  /* margin-right: 2px; */
  /* transform: translateY(-3px); */
`;

const ContentArea = styled.div`
  width: 58%;
  padding: 14px;
  @media all and (max-width: 1550px) {
    /* width: 68%; */
  }
  @media all and (max-width: 768px) {
    width: 100%;
    padding: 10px 10px 0px 10px;
  }
`;
const ContentTitle = styled.h3`
  font-family: gordita_medium;
  font-size: 14px;
  max-width: 100%;
  color: #4d4d4d;
  line-height: 20px;
  margin-bottom: 10px;
  /* @media all and (max-width: 1280px) {
		font-size: 18px;
	} */
  @media all and (max-width: 768px) {
    max-width: 500px;
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
`;
const HighLight = styled.span`
  display: inline-block;
  color: #41ae76;
  font-family: gordita_medium;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Description = styled.p`
  line-height: 1.2;
  font-family: gordita_regular;
  margin-top: 5px;
  font-style: italic;
  font-size: 14px;
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
    /* display: flex; */
    justify-content: center;
  }
  @media all and (max-width: 530px) {
    /* display: block; */
  }
`;
const NewButtonContainer = styled.div`
  width: 100%;
  display: none;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
  @media all and (max-width: 1620px) {
    display: flex;
    padding: 15px 0 15px 15px;
  }

  @media all and (max-width: 1000px) {
    /* display: none; */
    padding: 0px 0 15px 4px;
  }
  @media all and (max-width: 980px) {
    /* display: none; */
    /* padding: 15px 0 15px 15px;
        position: absolute;
        left: 41%;
        bottom: 0; */
  }
  @media all and (max-width: 768px) {
    /* position: unset;
        width: 49%; */
  }
  @media all and (max-width: 640px) {
    /* width: 60%; */
  }
  @media all and (max-width: 480px) {
    /* width: 96%; */
  }
`;
const RecheckButton = styled.span`
  display: flex;
  justify-content: flex-start;
  border: 1px solid #089ef7;
  margin-right: 10px;
  border-radius: 30px;
  overflow: hidden;
  padding-right: 10px;

  @media all and (max-width: 1000px) {
    /* margin-bottom: 10px; */
  }
  @media all and (max-width: 980px) {
    padding-right: 10px;
    /* margin-bottom: 10px; */
  }
  @media all and (max-width: 768px) {
    /* margin-bottom: 10px; */
    margin-right: 0;
    width: 90%;
  }
  @media all and (max-width: 640px) {
  }
  @media (max-width: 530px) {
    /* width: 100%; */
    display: inline-block;
    margin-right: 0;
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    margin-bottom: 10px;
    margin-right: 0;
    width: 100%;
  }
`;
const RecheckButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #089ef7;
  font-family: gordita_medium;
  @media (max-width: 1550px) {
    font-size: 12px;
  }
  @media (max-width: 1280px) {
    font-size: 10px;
  }
  /* @media all and (max-width: 1000px) {
		font-size: 12px;
	} */
  @media all and (max-width: 730px) {
    font-size: 11px;
  }
  /* @media all and (max-width: 690px) {
        font-size: 12px;
    }
    @media (max-width: 530px) {
        width: 100%;
        margin-right: 0;
        font-size: 14px;
    } */
`;
const RecheakCoins = styled.span`
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
  /* transform: translateY(-2px); */
`;
const ImporvementButton = styled.span`
  display: inline-block;
  border: 1px solid #399e59;
  border-radius: 30px;
  overflow: hidden;
  color: #399e59 !important;
  padding-right: 10px;

  /* @media (max-width: 530px) {
		width: 100%;
		font-size: 14px;
	} */
  /* @media all and (max-width: 1130px) {
		margin-top: 10px;
	} */
  @media all and (max-width: 1020px) {
    margin-top: 0;
  }
  @media all and (max-width: 768px) {
    width: 90%;
    margin-top: 10px;
  }
  @media all and (max-width: 530px) {
    margin-top: 0px;
  }
  @media all and (max-width: 480px) {
    width: 100%;
  }
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
  @media (max-width: 1280px) {
    font-size: 10px;
  }
  /* @media all and (max-width: 1000px) {
		font-size: 12px;
	} */
  @media all and (max-width: 730px) {
    font-size: 11px;
  }
  /* @media all and (max-width: 690px) {
        font-size: 12px;
    }
    @media (max-width: 530px) {
        width: 100%;
        font-size: 14px;
    } */
`;
const Label = styled.span`
  display: block;
  color: #a8a8a8;
  font-family: gordita_regular;
  font-size: 13px;
  @media all and (max-width: 800px) {
    margin-bottom: 30px;
  }
  @media all and (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
