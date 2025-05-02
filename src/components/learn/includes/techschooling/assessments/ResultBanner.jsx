import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AssessmentContext } from "../../../../contexts/stores/AssessmentStore";

const numberOfStars = [1, 2, 3, 4, 5, 8, 7, 8, 9, 10];
const scoreBand = [
  {
    min_score: 0,
    max_score: 0,
    message: "Struggle hard! The best time is yet to come.",
  },
  {
    min_score: 1,
    max_score: 1,
    message: "Keep trying! It will make you outshine one day.",
  },
  {
    min_score: 2,
    max_score: 5,
    message: "Great! Try harder for the next time.",
  },
  {
    min_score: 6,
    max_score: 7,
    message: "Good luck! You will excel one day.",
  },
  {
    min_score: 8,
    max_score: 9,
    message: "Amazing job! Keep it up.",
  },
  {
    min_score: 10,
    max_score: 10,
    message: "Excellent! Keep up the base.",
  },
];

export default function ResultBanner({
  score,
  improvementPage,
  revaluationPage,
  subject_slug,
}) {
  const { id } = useParams();

  const { assessmentState } = useContext(AssessmentContext);

  const renderMessage = () => {
    if (score) {
      const data = scoreBand.find((item) => {
        if (item.min_score <= score && item.max_score >= score) {
          return item;
        }
      });
      return data.message;
    } else {
      return null;
    }
  };

  return (
    <Results show={score}>
      <VictoryBox
        style={{
          display: score <= 5 && "none",
        }}
      >
        <StarBox>
          <Stars>
            {numberOfStars.map((item) => {
              return (
                <Star
                  key={item}
                  alt=""
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/star.svg"
                  show={score}
                />
              );
            })}
          </Stars>
          <NoStars>
            {numberOfStars.map((item) => {
              return (
                <NoStar
                  key={item}
                  alt=""
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/star_grey.svg"
                  show={score}
                />
              );
            })}
          </NoStars>
        </StarBox>

        <Marks>
          {score}
          /10
        </Marks>
        <Trophy src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/trophy_win.svg" />
        <Greet>{renderMessage()}</Greet>
      </VictoryBox>
      <NoVictoryBox
        style={{
          display: score > 5 && "none",
        }}
      >
        <StarBox>
          <Stars>
            {numberOfStars.map((item) => {
              return (
                <Star
                  key={item}
                  alt=""
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/star_grey.svg"
                  show={score}
                />
              );
            })}
          </Stars>
          <NoStars>
            {numberOfStars.map((item) => {
              return (
                <NoStar
                  key={item}
                  alt=""
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/star_stroke.svg"
                  show={score}
                />
              );
            })}
          </NoStars>
        </StarBox>

        <LessMarks>
          {score}
          /10
        </LessMarks>
        <FallenTrophy src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/trophy_lost.svg" />
        <Wish>{renderMessage()}</Wish>

        {!assessmentState.assessment.has_applied_for_certification ? (
          <>
            <Improve>
              You can revise the marks and do the revaluation and if you want to
              increase the marks, you can do the improvement
            </Improve>
            <ApplyBox>
              {!revaluationPage &&
                Object.keys(assessmentState.revaluation).length === 0 && (
                  <RevalBox>
                    <RevalCoin>1 coin will be deducted</RevalCoin>
                    <RevalButton to={`/nanodegree/${subject_slug}/assessments/view/${id}/revaluation/`}>
                      Apply for revaluation
                    </RevalButton>
                  </RevalBox>
                )}
              {!improvementPage &&
                Object.keys(assessmentState.improvement).length === 0 && (
                  <ImproveBox>
                    <ImproveCoin>1 coin will be deducted</ImproveCoin>
                    <ImproveButton to={`/nanodegree/${subject_slug}/assessments/view/${id}/improvement/`}>
                      Apply for improvement
                    </ImproveButton>
                  </ImproveBox>
                )}
            </ApplyBox>
          </>
        ) : (
          <Improve>
            Sorry! You can't apply for this improvement/revaluation as you have
            already applied for certificate.
          </Improve>
        )}
      </NoVictoryBox>
    </Results>
  );
}

const Results = styled.div`
  background: ${(props) =>
    props.show <= 4
      ? `url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/background_gray.svg")`
      : `url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/background.svg")`};
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  width: 100%;
  @media all and (max-width: 640px) {
    padding: 45px 0px;
  }
`;

const VictoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StarBox = styled.div`
  position: relative;
  width: 200px;
  height: 30px;
`;

const Stars = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: absolute;
  left: 0;
  top: 0;
`;
const NoStars = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: absolute;
  right: 0;
  top: 0;
`;

const Star = styled.img`
  width: 20px;
  position: relative;
  &&:nth-child(1) {
    left: 5px;
    top: 50px;
    display: ${(props) => (props.show >= 1 ? "block" : "none")};
  }
  &&:nth-child(2) {
    left: -3px;
    top: 31px;
    display: ${(props) => (props.show >= 2 ? "block" : "none")};
  }
  &&:nth-child(3) {
    left: -5px;
    top: 15px;
    display: ${(props) => (props.show >= 3 ? "block" : "none")};
  }
  &&:nth-child(4) {
    left: -5px;
    top: 2px;
    display: ${(props) => (props.show >= 4 ? "block" : "none")};
  }
  &&:nth-child(5) {
    left: -2px;
    top: -4px;
    display: ${(props) => (props.show >= 5 ? "block" : "none")};
  }
  &&:nth-child(6) {
    left: 2px;
    top: -4px;
    display: ${(props) => (props.show >= 6 ? "block" : "none")};
  }
  &&:nth-child(7) {
    left: 5px;
    top: 2px;
    display: ${(props) => (props.show >= 7 ? "block" : "none")};
  }
  &&:nth-child(8) {
    left: 5px;
    top: 15px;
    display: ${(props) => (props.show >= 8 ? "block" : "none")};
  }
  &&:nth-child(9) {
    left: 3px;
    top: 31px;
    display: ${(props) => (props.show >= 9 ? "block" : "none")};
  }
  &&:nth-child(10) {
    right: 5px;
    top: 50px;
    display: ${(props) => (props.show >= 10 ? "block" : "none")};
  }
`;
const NoStar = styled.img`
  display: block;
  width: 20px;
  position: relative;
  &&:nth-child(1) {
    left: 5px;
    top: 50px;
    display: ${(props) => (props.show <= 0 ? "block" : "none")};
  }
  &&:nth-child(2) {
    left: -3px;
    top: 31px;
    display: ${(props) => (props.show <= 1 ? "block" : "none")};
  }
  &&:nth-child(3) {
    left: -5px;
    top: 15px;
    display: ${(props) => (props.show <= 2 ? "block" : "none")};
  }
  &&:nth-child(4) {
    left: -5px;
    top: 2px;
    display: ${(props) => (props.show <= 3 ? "block" : "none")};
  }
  &&:nth-child(5) {
    left: -2px;
    top: -4px;
    display: ${(props) => (props.show <= 4 ? "block" : "none")};
  }
  &&:nth-child(6) {
    left: 2px;
    top: -4px;
    display: ${(props) => (props.show <= 5 ? "block" : "none")};
  }
  &&:nth-child(7) {
    left: 5px;
    top: 2px;
    display: ${(props) => (props.show <= 6 ? "block" : "none")};
  }
  &&:nth-child(8) {
    left: 5px;
    top: 15px;
    display: ${(props) => (props.show <= 7 ? "block" : "none")};
  }
  &&:nth-child(9) {
    left: 3px;
    top: 31px;
    display: ${(props) => (props.show <= 8 ? "block" : "none")};
  }
  &&:nth-child(10) {
    right: 5px;
    top: 50px;
    display: ${(props) => (props.show <= 9 ? "block" : "none")};
  }
`;

const Marks = styled.span`
  font-size: 33px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 8px;
  color: #ffcd00;
`;
const Trophy = styled.img`
  display: block;
  width: 120px;
`;

const Greet = styled.span`
  font-size: 46px;
  color: #ffcd00;
  /* font-weight: bold; */
  text-align: center;
  margin-top: 10px;
  font-family: gordita_medium;
  @media all and (max-width: 640px) {
    font-size: 28px;
  }
  @media all and (max-width: 360px) {
    font-size: 24px;
  }
`;
const NoVictoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LessMarks = styled.span`
  color: #9e9e9e;
  font-size: 33px;
  font-weight: bold;
  display: inline-block;
`;

const FallenTrophy = styled.img`
  width: 140px;
  display: block;
`;

const Wish = styled.p`
  font-size: 33px;
  color: #535353;
  text-align: center;
  font-family: gordita_regular;
  @media all and (max-width: 640px) {
    font-size: 26px;
  }
  @media all and (max-width: 360px) {
    font-size: 22px;
  }
`;

const Improve = styled.p`
  text-align: center;
  color: black;
  font-weight: bold;
  width: 65%;
  font-size: 13px;
  margin-top: 5px;
  @media all and (max-width: 980px) {
    width: 380px;
  }
  @media all and (max-width: 640px) {
    font-size: 11px;
    width: 100%;
  }
  @media all and (max-width: 360px) {
    font-size: 10px;
  }
`;

const ApplyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  @media all and (max-width: 360px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const RevalBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media all and (max-width: 360px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const RevalCoin = styled.span`
  font-size: 12px;
  color: #9e9e9e;
  font-weight: bold;
  margin-bottom: 3px;
  @media all and (max-width: 640px) {
    font-size: 10px;
  }
  @media all and (max-width: 360px) {
    font-size: 9px;
  }
`;

const RevalButton = styled(Link)`
  font-family: "gordita_medium";
  padding: 8px 20px;
  font-weight: bold;
  font-size: 15px;
  color: white;
  background: #059ef7;
  border-radius: 4px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media all and (max-width: 640px) {
    font-size: 12px;
    width: 150px;
    padding: 8px 8px;
  } */
  @media all and (max-width: 640px) {
    font-size: 12px;
    width: 150px;
    padding: 8px 0;
  }
  @media all and (max-width: 480px) {
    /* width: 135px; */
  }
  @media all and (max-width: 360px) {
    /* width: 170px; */
  }
`;

const ImproveBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
  @media all and (max-width: 480px) {
    margin-left: 10px;
  }
  @media all and (max-width: 360px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const ImproveCoin = styled.span`
  font-size: 12px;
  color: #9e9e9e;
  font-weight: bold;
  margin-bottom: 3px;
  @media all and (max-width: 640px) {
    font-size: 10px;
  }
  @media all and (max-width: 360px) {
    font-size: 9px;
  }
`;

const ImproveButton = styled(Link)`
  font-family: "gordita_medium";
  padding: 8px 20px;
  font-weight: bold;
  font-size: 15px;
  color: white;
  background: #15bf81;
  border-radius: 4px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 640px) {
    font-size: 12px;
    padding: 8px 8px;
  }
`;
