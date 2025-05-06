import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import AssessmentPopup from "../assessments/modals/AssessmentPopup";
import ObjectiveQuestion from "../assessments/modals/ObjectiveQuestion";
import DescriptiveQuestion from "../assessments/modals/DescriptiveQuestion";
import ChallengeQuestion from "../assessments/modals/ChallengeQuestion";
import { AssessmentContext } from "../../../../contexts/stores/AssessmentStore";
import ModalScreen from "../../general/ModalScreen";
import Loader from "../general/loaders/Loader";

const AssessmentPage = (props) => {
  const user_data = useSelector((state) => state.user_data);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);

  //States for assessment question
  const [showModal, setShowModal] = useState(false);
  const [descriptiveModal, setDescriptiveModal] = useState(false);
  const [objectiveModal, setObjectiveModal] = useState(false);
  const [challengeModal, setChallengeModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);
  const [nextSkillModal, setNextSkillModal] = useState(false);
  const [nextDesignationModal, setNextDesignationModal] = useState(false);
  const [successData, setSuccessData] = useState({});
  const [isNewDay, setNewDay] = useState(false);
  const [nextDayLink, setNextDayLink] = useState("");

  const toggleShowModal = (status) => {
    setShowModal(!showModal);
  };
  const { assessmentState, assessmentDispatch } = useContext(AssessmentContext);

  useEffect(() => {
    questionModal();
  }, [assessmentState.current_question.question_type]);

  //Modal based on assessment status
  const questionModal = () => {
    if (showModal) {
      setShowModal(false);
    }
    if (assessmentState.current_question.question_type === "objective") {
      toggleObjectiveModal();
    } else if (
      assessmentState.current_question.question_type === "descriptive"
    ) {
      if (objectiveModal) {
        toggleObjectiveModal();
      }
      toggleDescriptiveModal();
    } else if (assessmentState.current_question.question_type === "challenge") {
      if (objectiveModal) {
        toggleObjectiveModal();
      } else if (descriptiveModal) {
        toggleDescriptiveModal();
      }
      toggleChallengeModal();
    }
  };

  const toggleDescriptiveModal = (e) => {
    setDescriptiveModal((prev) => !prev);
  };
  const toggleObjectiveModal = (e) => {
    setObjectiveModal((prev) => !prev);
  };
  const toggleChallengeModal = (e) => {
    setChallengeModal((prev) => !prev);
  };

  const renderMessage = (data) => {
    if (data.is_new_day) {
      setSuccessData({
        successButtonText: "Go to dashboard",
        message: `You have successfully completed the current day `,
        successButtonLink: "/dashboard/",
        isNewDay: true,
        nextDayLink: `${
          data.is_new_practice
            ? `/practices/${data.practice_pk}/`
            : `topics/view/${data.next_topic_pk}`
        }`,
      });
      toggleShowSuccessModal(data);
    } else if (data.is_new_practice) {
      setSuccessData({
        successButtonText: "Go to practice",
        message: "You have unlocked the next practice",

        successButtonLink: `/practices/${data.practice_pk}/`,
      });
      toggleShowSuccessModal(data);
    } else if (data.is_new_skill) {
      setSuccessData({
        successButtonText: "Go to dashboard",

        message: `You have successfully completed and have mastered in skill-${data.next_skill} and your next skill have unlocked `,
        successButtonLink: "/dashboard/",
      });
      toggleShowSuccessModal(data);
    } else if (data.is_new_designation) {
      setSuccessData({
        successButtonText: "Go to dashboard",
        message: `You have successfully completed the Designation `,

        successButtonLink: "/dashboard/",
      });
      toggleShowSuccessModal(data);
    } else if (data.is_new_lesson) {
      setSuccessData({
        successButtonText: "Go to next lesson",
        message: "Congrats, You have completed current lesson.",
        successButtonLink: `topics/view/${data.next_topic_pk}`,
      });
      toggleShowSuccessModal(data);
    } else if (data.is_new_topic) {
      setSuccessData({
        successButtonText: "Go to topic",

        message: "You unlocked next topic",
        successButtonLink: `topics/view/${data.next_topic_pk}`,
      });
      toggleShowSuccessModal(data);
    }
  };

  const onAssessmentCompletion = (data) => {
    renderMessage(data);
  };

  const onSuccessModalClose = () => {
    setSuccessModal(false);
    setNextSkillModal(false);
    setNewDay(false);
    setNextDayLink("");
    setNextDesignationModal(false);
  };

  const toggleShowSuccessModal = (data) => {
    if (data.is_new_lesson || data.is_new_topic || data.is_new_practice) {
      setSuccessModal((prev) => !prev);
    } else if (data.is_new_skill) {
      setNextSkillModal((prev) => !prev);
    } else if (data.is_new_designation) {
      setNextDesignationModal((prev) => !prev);
    }
  };
  const history = useHistory();
  useEffect(() => {
    const fetchAssessment = () => {
      let { access_token } = user_data;

      learnConfig
        .get(`assessments/new-content/view/assessment/${id}/`, {
          headers: { Authorization: "Bearer " + access_token },
        })
        .then((response) => {
          const { StatusCode, data } = response.data;
          setLoading(false);
          if (StatusCode === 6000) {
            assessmentDispatch({
              type: "UPDATE_ASSESSMENT",
              assessment: data,
            });
            if (data.status === "attending") {
              sendCurrentQuestion();
            }
          } else if (StatusCode === 6001) {
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            if (error.response.status === 500) {
              history.push("/tech-schooling/500/");
            } else if (error.response.status === 403) {
              history.push("/tech-schooling/403/");
            } else if (error.response.status === 401) {
              history.push("/tech-schooling/401/");
            }
          }
        });
    };

    const sendCurrentQuestion = () => {
      let { access_token } = user_data;

      learnConfig
        .post(
          `assessments/new-content/send-current-question/${id}/`,
          {},
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((response) => {
          const { StatusCode, data } = response.data;

          if (StatusCode === 6000) {
            assessmentDispatch({
              type: "UPDATE_CURRENT_QUESTION",
              current_question: data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchAssessment();
  }, []);
  return (
    <>
      <AssessmentPopup
        handle_modal={toggleShowModal}
        show_modal={showModal}
        id={id}
      />
      <ObjectiveQuestion
        show_modal={objectiveModal}
        handle_modal={toggleShowModal}
        onAssessmentCompletion={onAssessmentCompletion}
        // subject_slug={slug}
      />
      <DescriptiveQuestion
        show_modal={descriptiveModal}
        handle_modal={toggleShowModal}
        onAssessmentCompletion={onAssessmentCompletion}
      />
      <ChallengeQuestion
        show_modal={challengeModal}
        handle_modal={toggleShowModal}
        onAssessmentCompletion={onAssessmentCompletion}
      />
      <ModalScreen
        show_modal={successModal}
        title="Congratulations"
        message={successData.message}
        redirect={false}
        successButtonText={successData.successButtonText}
        successButtonLink={successData.successButtonLink}
        onModalClose={onSuccessModalClose}
        isNewDay={successData.isNewDay}
        nextDayLink={successData.nextDayLink}
        image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
        subject_slug={props.subject_slug}
      />
      <ModalScreen
        show_modal={nextSkillModal}
        title="You are a master"
        message={successData.message}
        redirect={true}
        successButtonText={successData.successButtonText}
        successButtonLink={successData.successButtonLink}
        onModalClose={onSuccessModalClose}
        isNewDay={successData.isNewDay}
        nextDayLink={successData.nextDayLink}
        image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/skill_complete.png"
        subject_slug={props.subject_slug}
      />
      <ModalScreen
        show_modal={nextDesignationModal}
        title="Congratulations!"
        message={successData.message}
        redirect={true}
        successButtonText={successData.successButtonText}
        successButtonLink={successData.successButtonLink}
        onModalClose={onSuccessModalClose}
        isNewDay={isNewDay}
        nextDayLink={nextDayLink}
        image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/designation_completed.png"
        subject_slug={props.subject_slug}
      />
      <Container>
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <>
            <TopSection>
              <Title>Assessment Exam</Title>
              <Description>
                {assessmentState.assessment.description}
              </Description>
              {/* <Button onClick={toggleShowModal}>Start Exam</Button> */}
              <TimeAllot>
                <Label>Time allotted</Label>
                <Hour>
                  <Icon className="las la-stopwatch" />
                  <Time> {assessmentState.assessment.time_allotted} Hours</Time>
                </Hour>
              </TimeAllot>
            </TopSection>
            <BottomSection>
              <CardContainer>
                <Card>
                  <GraphSection>
                    <Graph>{assessmentState.assessment.objectives_count}</Graph>
                  </GraphSection>
                  <ContentSection>
                    <GraphTitle>Objective Questions</GraphTitle>
                  </ContentSection>
                </Card>
                <Card>
                  <GraphSection>
                    <Graph>
                      {assessmentState.assessment.descriptives_count}
                    </Graph>
                  </GraphSection>
                  <ContentSection>
                    <GraphTitle>Descriptive Questions</GraphTitle>
                  </ContentSection>
                </Card>
                <Card>
                  <GraphSection>
                    <Graph>{assessmentState.assessment.challenges_count}</Graph>
                  </GraphSection>
                  <ContentSection>
                    <GraphTitle>Challenge</GraphTitle>
                  </ContentSection>
                </Card>
              </CardContainer>
            </BottomSection>
          </>
        )}
      </Container>
    </>
  );
};

export default AssessmentPage;

const LoaderContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  position: relative;
  padding-bottom: 50px;
`;
const TopSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  padding-top: 150px;
  background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/assesmentexambg.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  padding-bottom: 90px;
  @media all and (max-width: 980px) {
    padding-top: 75px;
    padding-bottom: 50px;
    margin-top: 0px;
  }
  @media all and (max-width: 640px) {
    background: none;
    padding-top: 60px;
  }
  @media all and (max-width: 640px) {
    padding-top: 30px;
  }
`;
const Title = styled.h2`
  font-size: 29px;
  font-family: "gordita_medium";
  margin-bottom: 4px;
  @media all and (max-width: 980px) {
    margin-bottom: 0px;
  }
  @media all and (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
  @media all and (max-width: 360px) {
    font-size: 19px;
  }
`;
const Description = styled.p`
  font-size: 19px;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
  @media all and (max-width: 980px) {
    font-size: 17px;
    max-width: 400px;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    max-width: 320px;
    margin-bottom: 16px;
  }
  @media all and (max-width: 640px) {
    max-width: 500px;
  }
  @media all and (max-width: 360px) {
    font-size: 15px;
  }
`;
const Button = styled.span`
  cursor: pointer;
  display: inline-block;
  padding: 11px 45px;
  background-color: #3383ff;
  color: #ffffff;
  font-family: "gordita_medium";
  font-size: 17px;
  border-radius: 10px;
  box-shadow: 0 0px 9px rgb(33 150 243 / 53%);
  @media (max-width: 980px) {
    padding: 8px 40px;
    border-radius: 7px;
  }
  @media (max-width: 768px) {
    padding: 5px 25px;
    border-radius: 5px;
  }
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
`;

const TimeAllot = styled.div`
  width: 300px;
  position: absolute;
  top: 10px;
  right: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media all and (max-width: 1440px) {
    /* top: -62px; */
    left: 0px;
  }
  @media all and (max-width: 980px) {
    width: 205px;
    /* top: -45px; */
  }
  @media all and (max-width: 480px) {
    width: 115px;
  }
`;
const Label = styled.p`
  font-size: 20px;
  font-family: "gordita_medium";
  color: #000;
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const Hour = styled.div`
  margin-left: 20px;
  background-color: #3383ff;
  color: #fff;
  font-family: "baloo_paaji_2semibold";
  font-size: 18px;
  padding: 3px 20px;
  border-radius: 5px;
  box-shadow: 0 0px 10px 0 rgb(103 151 255 / 74%),
    0 12px 90px 0 rgba(103, 151, 255, 0.11);
  @media all and (max-width: 980px) {
    padding: 3px 8px;
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    margin: 0;
  }
`;
const Icon = styled.i``;
const Time = styled.span``;
const BottomSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const GraphSection = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #3383ff;

  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Graph = styled.p`
  font-size: 22px;
  font-family: "gordita_medium";
  color: #3383ff;
`;
const ContentSection = styled.div``;
const GraphTitle = styled.h3`
  font-family: "baloo_paaji_2semibold";
  @media all and (max-width: 980px) {
    font-size: 18px;
  }
  @media all and (max-width: 360px) {
    font-size: 16px;
  }
`;
const GraphDescription = styled.p`
  font-family: "gordita_medium";
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;
const Card = styled.div`
  width: 32%;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11),
    0 12px 90px 0 rgba(103, 151, 255, 0.11);
  padding: 20px;
  border-radius: 10px;
  transition: all 0.4s ease;

  &:hover {
    background-color: #3383ff;
    color: #fff;
  }
  &:hover ${GraphSection} {
    border-color: #fff;
  }
  &:hover ${Graph} {
    color: #fff;
  }
  &:hover ${GraphDescription} {
    color: #fff;
  }
  @media all and (max-width: 1200px) {
    width: 47%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  @media all and (max-width: 980px) {
    padding: 15px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    justify-content: center;
  }
`;
