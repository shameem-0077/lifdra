import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { AssessmentContext } from "../../../../../contexts/stores/AssessmentStore";
import { serverConfig } from "../../../../../../axiosConfig";
import PopupBar from "./PopupBar";
import RequestLoader from "../../../authentication/general/RequestLoader";
import ToggleButton from "../../assessments/ToggleButton";

function mapStateToProps(state) {
  return { user_data: state.user_data };
}

const styles = {
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    background: "rgba(90, 125, 119, 0.8)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    margin: "20px 0",
  },
  content_container: {
    width: "70%",
  },
  idSpan: {
    color: "#0F9D58",
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  left: {
    textAlign: "left",
  },
  middle: {
    marginTop: "3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#f2f7fe",
    padding: "30px 34px",
    borderRadius: "15px",
  },
  content: {
    fontSize: "20px",
    margin: "4px 0 22px",
    textAlign: "left",
    lineHeight: "30px",
  },
  small: {
    color: "#717277",
  },
  button_container: {
    marginTop: "30px",
    width: "100%",
  },
  button: {
    backgroundColor: "#17474c",
    color: "#fff",
    height: "48px",
    borderRadius: "8px",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "30px",
    marginLeft: "7px",
  },
  bottom: {
    textAlign: "right",
    padding: "20px 0",
  },
  check_box: {
    height: "30px",
    width: "20px",
  },
};

const ObjectiveQuestion = ({
  user_data,
  isImprovementTest,
  onAssessmentCompletion,
  show_modal,
  subject_slug,
}) => {
  const { assessmentState, assessmentDispatch } = useContext(AssessmentContext);

  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const { user_profile } = useSelector((state) => state);
  const [english, setEnglish] = useState(false);

  const onSelectOption = (e, option) => {
    setSelectedOption(option);
  };

  const [dayByDayData, setDayByDayData] = useState(null);
  const [currentDayObject, setCurrentDayObject] = useState(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("day_by_day");
      if (storedData) {
        setDayByDayData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error(
        "Error retrieving day_by_day data from localStorage:",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (dayByDayData) {
      try {
        const foundDayObject = Object.values(dayByDayData).find(
          (day) => day.is_current_day
        );
        setCurrentDayObject(foundDayObject);
      } catch (error) {
        console.error("Error finding current day object:", error);
      }
    }
  }, [dayByDayData]);

  const submitAnswer = (e) => {
    let { access_token } = user_data;
    setLoading(true);
    if (isImprovementTest) {
      serverConfig
        .post(
          `assessments/submit-improvement-answer/${assessmentState.current_question.id}/`,
          {
            selected_option: selectedOption,
            student_day_pk: currentDayObject ? currentDayObject.id : "",
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          let { data, status_code } = response.data;
          let {
            is_new_lesson,
            is_new_skill,
            is_new_designation,
            question_type,
            is_assessment_completed,
          } = data;
          if (status_code === 6000) {
            if (question_type) {
              if (is_assessment_completed) {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: {},
                });
              } else if (question_type === "objective") {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: data,
                });
              } else {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: data,
                });
              }
            } else if (is_new_lesson) {
            } else if (is_new_skill) {
            } else if (is_new_designation) {
            }
            setSelectedOption("");
            setLoading(false);
          } else if (status_code === 6001) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      serverConfig
        .post(
          `assessments/submit-answer-with-slug/${subject_slug}/${assessmentState.current_question.id}/`,
          {
            selected_option: selectedOption,
            student_day_pk: currentDayObject ? currentDayObject.day_pk : "",
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          let { data, status_code } = response.data;
          let {
            is_new_lesson,
            is_new_skill,
            is_new_designation,
            question_type,
            is_assessment_completed,
          } = data;
          if (status_code === 6000) {
            if (data?.is_new_day || data?.next_student_day_pk) {
              updateDaysLocal(data.next_student_day_pk, data.day_pk);
            }
            if (question_type) {
              if (is_assessment_completed) {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: {},
                });
              } else if (question_type === "objective") {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: data,
                });
              } else {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: data,
                });
              }
            } else if (is_new_lesson) {
            } else if (is_new_skill) {
            } else if (is_new_designation) {
            }
            setSelectedOption("");
            setLoading(false);
          } else if (status_code === 6001) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  // Retrieve the existing data from local storage
  const existingData = JSON.parse(localStorage.getItem("day_by_day")) || [];

  // Update the previous object's properties
  if (existingData.length > 0) {
    const previousObject = existingData[existingData.length - 1];
    previousObject.is_completed = true;
    previousObject.is_current_day = false;
  }

  // Function to handle button click
  const updateDaysLocal = (next_student_day_pk, day_pk) => {
    // Locate the correct program within existingData using props.subject_slug
    const program = existingData.find((item) => item.program === subject_slug);

    if (program) {
      // Check if there are existing student days
      const studentDays = program.days.student_days;

      // Update the last day's completion status if there's at least one day
      if (studentDays.length > 0) {
        const lastDay = studentDays[studentDays.length - 1];
        lastDay.is_completed = true;
        lastDay.is_current_day = false;
      }

      // Create a new day object with incremented day_number
      const newObject = {
        day_number: studentDays.length + 1, // Correctly increment day_number based on current length
        day_pk: day_pk,
        id: next_student_day_pk,
        is_completed: false,
        is_current_day: true,
      };

      // Add the new object to the student_days array of the found program
      studentDays.push(newObject);

      // Update the local storage with the modified data
      localStorage.setItem("day_by_day", JSON.stringify(existingData));
    } else {
      console.error("Program not found in existing data");
    }
  };

  const checkOptionLength = (question) => {
    if (question.question_type === "objective") {
      if (
        question.option1 &&
        question.option2 &&
        question.option3 &&
        question.option4
      ) {
        if (question.option1.length > 20) {
          return true;
        } else if (question.option2.length > 20) {
          return true;
        } else if (question.option3.length > 20) {
          return true;
        } else if (question.option4.length > 20) {
          return true;
        }
      }
      return false;
    }
    return null;
  };

  useEffect(() => {
    let question = assessmentState.current_question;
    setQuestion(question);
  }, [assessmentState.current_question]);
  // useEffect(() => {
  //     console.log(english);
  // }, [english]);

  return !show_modal ? null : (
    <div className="modalContainer" style={styles.modalContainer}>
      <ModalContentContainer
        className="modalContentContainer"
        style={styles.modalContentContainer}
      >
        <ContentContainer>
          <TitleContainer>
            <div className="left" style={styles.left}>
              <Title>
                <span style={styles.idSpan}>
                  #{assessmentState.assessment.auto_id}
                </span>{" "}
                | {assessmentState.assessment.title}
              </Title>
            </div>
            <div div className="right" style={styles.right}>
              {/* <Tag>Improvement</Tag> */}
              {/* <Time className="time">00:00:00</Time> */}
              <Malayalam english={english}>Malayalam</Malayalam>
              <ToggleButton setEnglish={setEnglish} />
              <English english={english}>English</English>
            </div>
          </TitleContainer>
          <MiddleContainer>
            <small className="name" style={styles.small}>
              Question Number {question.question_number}
            </small>
            <h3 style={styles.content}>
              {!english ? question.question : question.english_question}
            </h3>
            <AnswerContainer isLargeOption={checkOptionLength(question)}>
              <HoverText
                className="answer-box"
                onClick={(e) => {
                  onSelectOption(e, "option1");
                }}
              >
                <AnswerOption>
                  {!english ? question.option1 : question.english_option1}
                </AnswerOption>
                <CheckBox checked={selectedOption === "option1" ? true : false}>
                  {selectedOption === "option1" && (
                    <CheckIcon className="las la-check" />
                  )}
                </CheckBox>
              </HoverText>
              <HoverText
                className="answer-box"
                onClick={(e) => {
                  onSelectOption(e, "option2");
                }}
              >
                <AnswerOption>
                  {!english ? question.option2 : question.english_option2}
                </AnswerOption>
                <CheckBox checked={selectedOption === "option2" ? true : false}>
                  {selectedOption === "option2" && (
                    <CheckIcon className="las la-check" />
                  )}
                </CheckBox>
              </HoverText>

              <HoverText
                className="answer-box"
                onClick={(e) => {
                  onSelectOption(e, "option3");
                }}
              >
                <AnswerOption>
                  {!english ? question.option3 : question.english_option3}
                </AnswerOption>
                <CheckBox checked={selectedOption === "option3" ? true : false}>
                  {selectedOption === "option3" && (
                    <CheckIcon className="las la-check" />
                  )}
                </CheckBox>
              </HoverText>
              <HoverText
                className="answer-box"
                onClick={(e) => {
                  onSelectOption(e, "option4");
                }}
              >
                <AnswerOption>
                  {!english ? question.option4 : question.english_option4}
                </AnswerOption>
                <CheckBox checked={selectedOption === "option4" ? true : false}>
                  {selectedOption === "option4" && (
                    <CheckIcon className="las la-check" />
                  )}
                </CheckBox>
              </HoverText>
            </AnswerContainer>
            {isLoading ? (
              <div className="button-container" style={styles.button_container}>
                <Link
                  style={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <RequestLoader />
                </Link>
              </div>
            ) : (
              <div className="button-container" style={styles.button_container}>
                <Link
                  style={styles.button}
                  onClick={(e) => {
                    e.preventDefault();

                    selectedOption.length > 0 && submitAnswer(e);
                  }}
                >
                  Submit
                  <i
                    className="las la-long-arrow-alt-right"
                    style={styles.icon}
                  ></i>
                </Link>
              </div>
            )}
          </MiddleContainer>
          <div className="bottom" style={styles.bottom}>
            <PopupBar
              result={question.question_number}
              total={question.total_questions}
              barColor="#069ef7"
            />
          </div>
        </ContentContainer>
      </ModalContentContainer>
    </div>
  );
};

// switching style..

const Malayalam = styled.span`
  font-size: 16px;
  margin-right: 10px;
  color: ${({ english }) => !english && "#4fbe79"};
`;
const English = styled.span`
  font-size: 16px;
  margin-left: 30px;
  color: ${({ english }) => english && "#4fbe79"};
`;
// switching style..

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  grid-gap: 2em;
  @media only screen and (max-width: 640px) {
    grid-gap: 5px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Title = styled.h3`
  font-family: "gordita_medium";
  font-size: 25px;
  margin-bottom: 20px;
  line-height: 40px;
  @media only screen and (max-width: 1500px) {
    font-size: 23px;
  }
  @media only screen and (max-width: 1450px) {
    font-size: 21px;
  }
  @media only screen and (max-width: 768px) {
    margin-bottom: unset;
  }
`;
// const Time = styled.span`
//     font-size: 22px;
//     font-family: product_sansbold;
//     color: #008000;
//     @media only screen and (max-width: 1500px) {
//         font-size: 20px;
//     }
//     @media only screen and (max-width: 1450px) {
//         font-size: 18px;
//     }
// `;
// const Tag = styled.span`
//     border-radius: 20px;
//     border: 1px solid #e4e4e4;
//     font-size: 15px;
//     overflow: hidden;
//     margin-right: 10px;
//     margin: 10px 0;
//     padding: 7px 20px;
//     color: #069ef7;
//     background: #d9f1fe;
//     font-style: italic;
//     @media only screen and (max-width: 1500px) {
//         font-size: 14;
//     }
//     @media only screen and (max-width: 1450px) {
//         font-size: 13px;
//     }
// `;
const ModalContentContainer = styled.div`
  background: #fff;
  width: 75%;
  text-align: center;
  padding: 75px 50px;
  border-radius: 5px;
  border: 1px solid;
  border-color: #fff;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1280px) {
    padding: 50px 30px;
  }
  @media only screen and (max-width: 1280px) {
    width: 80%;
  }
  @media only screen and (max-width: 640px) {
    width: 90%;
    overflow-y: scroll;
    padding: 30px 15px;
  }
  @media only screen and (max-width: 360px) {
    width: 95%;
    padding: 20px 10px;
  }
`;
const ContentContainer = styled.div`
  width: 70%;
  @media only screen and (max-width: 1280px) {
    width: 100%;
  }
`;

const AnswerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.isLargeOption ? "1" : "2")},
    1fr
  );
  row-gap: 1em;
  column-gap: 1em;
  grid-auto-rows: min-content;
  @media only screen and (max-width: 640px) {
    display: block;
  }
`;

const HoverText = styled.div`
  color: #000;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  :hover {
    color: #fff;
    cursor: pointer;
    background: mediumseagreen;
  }
`;

const CheckBox = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${(props) => (props.checked ? "#fff" : "#999")};
`;

const MiddleContainer = styled.div`
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(242, 247, 254);
  padding: 30px 34px;
  border-radius: 15px;
  @media only screen and (max-width: 640px) {
    padding: 15px;
  }
`;
const CheckIcon = styled.small``;

const AnswerOption = styled.h3`
  text-align: left;
  word-break: break-all;
  @media only screen and (max-width: 480px) {
    width: 80%;
  }
`;

export default connect(mapStateToProps)(ObjectiveQuestion);
