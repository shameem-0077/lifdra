import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PopupBar from "./PopupBar";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { AssessmentContext } from "../../../../../contexts/stores/AssessmentStore";
import { learnConfig } from "../../../../../../axiosConfig";
import RequestLoader from "../../../authentication/general/RequestLoader";
import ToggleButton from "../../../assessments/ToggleButton";

function mapStateToProps(state) {
  return {
    user_data: state.user_data,
  };
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
  idSpan: {
    color: "#0F9D58",
    fontFamily: "product_sansbold",
  },
  right: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  left: {
    textAlign: "left",
  },
  content: {
    fontSize: "20px",
    margin: "4px 0 22px",
    textAlign: "left",
    lineHeight: "40px",
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
  input_container: {
    width: "100%",
    background: "#fff",
    overflow: "auto",
    height: "180px",
    color: "#fff",
    padding: "10px",
  },
  input: {
    width: "100%",
    height: "180px",
    color: "rgb(80, 80, 80)",
    margin: "0px",
    fontSize: "16px",
  },
  bottom: {
    textAlign: "right",
    padding: "20px 0",
  },
};

const DescriptiveQuestion = ({
  onAssessmentCompletion,
  user_data,
  isImprovementTest,
  show_modal,
  subject_slug,
}) => {
  const inputEntry = useRef(null);
  const [value, setValue] = useState("");
  const [is_error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const { user_profile } = useSelector((state) => state);
  const [english, setEnglish] = useState(false);

  const { assessmentState, assessmentDispatch } = useContext(AssessmentContext);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      setError(false);
    }
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
    e.preventDefault();
    let { access_token } = user_data;
    if (value) {
      setLoading(true);
      if (isImprovementTest) {
        learnConfig
          .post(
            `assessments/submit-improvement-answer/${assessmentState.current_question.id}/`,
            {
              answer: value,
              student_day_pk: currentDayObject ? currentDayObject.id : "",
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            let { data, StatusCode } = response.data;
            let {
              is_new_lesson,
              is_new_skill,
              is_new_designation,
              question_type,
              is_assessment_completed,
            } = data;
            if (StatusCode === 6000) {
              if (question_type) {
                if (is_assessment_completed) {
                  assessmentDispatch({
                    type: "UPDATE_CURRENT_QUESTION",
                    current_question: {},
                  });
                  onAssessmentCompletion();
                } else if (question_type === "descriptive") {
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
              inputEntry.current.value = "";
              setLoading(false);
            } else if (StatusCode === 6001) {
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        learnConfig
          .post(
            `assessments/submit-answer-with-slug/${subject_slug}/${assessmentState.current_question.id}/`,
            {
              answer: value,
              student_day_pk: currentDayObject ? currentDayObject.day_pk : "",
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            let { data, StatusCode } = response.data;
            let {
              is_new_lesson,
              is_new_skill,
              is_new_designation,
              question_type,
              is_assessment_completed,
            } = data;
            if (StatusCode === 6000) {
              if (data?.is_new_day || data?.next_student_day_pk) {
                updateDaysLocal(data.next_student_day_pk, data.day_pk);
              }
              if (question_type) {
                if (is_assessment_completed) {
                  assessmentDispatch({
                    type: "UPDATE_CURRENT_QUESTION",
                    current_question: {},
                  });
                  onAssessmentCompletion();
                } else if (question_type === "descriptive") {
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
              inputEntry.current.value = "";
              setLoading(false);
            } else if (StatusCode === 6001) {
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    } else {
      setError(true);
      setErrorMessage("Answer cannot be empty.");
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

  useEffect(() => {
    let question = assessmentState.current_question;
    setQuestion(question);
  }, [assessmentState.current_question]);

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
              <ToggleButton english={english} setEnglish={setEnglish} />
              <English english={english}>English</English>
            </div>
          </TitleContainer>
          <ContentBox>
            <small className="name" style={styles.small}>
              Question Number {question.question_number}
            </small>
            <QTitle>
              {!english ? question.question : question.english_question}
            </QTitle>
            {is_error ? <p>{errorMessage}</p> : null}
            <form action="#" style={styles.input_container}>
              <textarea
                ref={inputEntry}
                onChange={onChangeHandler}
                style={styles.input}
              >
                {value}
              </textarea>
            </form>
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
                <Link to="#" style={styles.button} onClick={submitAnswer}>
                  Submit
                  <i
                    className="las la-long-arrow-alt-right"
                    style={styles.icon}
                  ></i>
                </Link>
              </div>
            )}
          </ContentBox>
          <div className="bottom" style={styles.bottom}>
            <PopupBar
              result={question.question_number}
              total={question.total_questions}
              type="descriptive"
              barColor="#069ef7"
            />
          </div>
        </ContentContainer>
      </ModalContentContainer>
    </div>
  );
};

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

// switching style ......

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
// switching style ......

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
  @media only screen and (max-width: 980px) {
    width: 85%;
    padding: 55px 50px;
  }
  @media only screen and (max-width: 1280px) {
    width: 80%;
  }
  @media only screen and (max-width: 1280px) {
    width: 90%;
    padding: 50px 30px;
  }
  @media only screen and (max-width: 480px) {
    width: 95%;
    padding: 30px 15px;
  }
`;

const ContentContainer = styled.div`
  width: 79%;
  @media only screen and (max-width: 1280px) {
    width: 100%;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f2f7fe;
  padding: 30px 34px;
  border-radius: 15px;
  @media only screen and (max-width: 640px) {
    padding: 20px;
  }
`;

const QTitle = styled.h3`
  font-size: 21px;
  text-align: left;
  line-height: 34px;
  font-weight: bold;
  @media (max-width: 980px) {
    font-size: 19px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 640px) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export default connect(mapStateToProps)(DescriptiveQuestion);
