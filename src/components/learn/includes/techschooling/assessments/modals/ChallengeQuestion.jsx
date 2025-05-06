import React, { useContext, useEffect, useRef, useState } from "react";
import AssetDownloadCard from "../../../general/AssetDownloadCard";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { AssessmentContext } from "../../../../../contexts/stores/AssessmentStore";
import { serverConfig } from "../../../../../../axiosConfig";
import RequestLoader from "../../../authentication/general/RequestLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  idSpan: {
    color: "#0F9D58",
    fontWeight: "bold",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  left: {
    textAlign: "left",
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
    alignSelf: "flex-end",
    cursor: "pointer",
    marginTop: "20px",
  },
  icon: {
    fontSize: "30px",
    marginLeft: "7px",
  },
  input_containor: {
    width: "100%",
    background: "#fff",
    overflow: "auto",
    height: "15vh",
    color: "#fff",
    padding: "10px",
  },
  input: {
    width: "100%",
    height: "15vh",
    color: "#a5a5a5",
    margin: "0px",
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "50px 0",
    alignItems: "flex-start",
  },
  uploadIcon: {
    marginLeft: "20px",
  },
  uploadFile: {
    marginLeft: "5px",
    fontSize: "17px",
  },
  inputfile: {
    visibility: "hidden",
    position: "absolute",
  },
  button_icon: {
    fontSize: "25px",
    marginRight: "10px",
  },
};

const ChallengeQuestion = ({
  user_data,
  show_modal,
  onAssessmentCompletion,
  isImprovementTest,
  subject_slug,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_profile } = useSelector((state) => state);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isBasicLoading, setBasicLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState({});

  const middleContainer = useRef(null);

  const { assessmentState, assessmentDispatch } = useContext(AssessmentContext);

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const truncate = (str) => {
    const extension = str.split(".").pop();
    return str.length > 29 ? str.substring(0, 19) + "..." + extension : str;
  };

  useEffect(() => {
    if (selectedFile) {
      setErrorMessage("");
    }
  }, [selectedFile]);

  const sendRequest = (e) => {
    if (selectedFile) {
      submitAnswer();
    } else {
      setErrorMessage("Please choose a file");
    }
  };

  const updateProfessionStatus = (bool) => {
    dispatch({
      type: "UPDATE_PROFESSION_STATUS",
      bool: bool,
    });
  };
  const updateNextProfession = (bool) => {
    dispatch({
      type: "UPDATE_NEXT_DESIGNATION",
      nextDesignation: bool,
    });
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

    const data = new FormData();
    data.append("attachment", selectedFile);
    data.append("student_day_pk", currentDayObject ? currentDayObject.id : "");

    setBasicLoading(true);

    if (!isBasicLoading) {
      if (isImprovementTest) {
        learnConfig
          .post(
            `assessments/submit-improvement-answer/${assessmentState.current_question.id}/`,
            data,

            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            let { data, StatusCode } = response.data;
            let { question_type, is_assessment_completed } = data;
            if (StatusCode === 6000) {
              if (is_assessment_completed) {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: "",
                });
                onAssessmentCompletion(data);
                setBasicLoading(false);
              } else if (question_type) {
                if (question_type === "challenge") {
                  assessmentDispatch({
                    type: "UPDATE_CURRENT_QUESTION",
                    current_question: data,
                  });
                  setSelectedFile("");
                  middleContainer.current.scrollTo(0, 0);
                } else {
                  setBasicLoading(false);
                }
              }
            } else if (StatusCode === 6001) {
              setErrorMessage(data.title);
            }
            setBasicLoading(false);
          })
          .catch((error) => {
            setBasicLoading(false);
            setErrorMessage("An error occured, please try again later");
          });
      } else {
        learnConfig
          .post(
            `assessments/submit-answer-with-slug/${subject_slug}/${assessmentState.current_question.id}/`,
            data,
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
              if (is_assessment_completed) {
                assessmentDispatch({
                  type: "UPDATE_CURRENT_QUESTION",
                  current_question: "",
                });
                onAssessmentCompletion(data);
                setBasicLoading(false);
              } else if (question_type) {
                if (question_type === "challenge") {
                  assessmentDispatch({
                    type: "UPDATE_CURRENT_QUESTION",
                    current_question: data,
                  });
                  setSelectedFile("");
                  middleContainer.current.scrollTo(0, 0);
                } else {
                  setBasicLoading(false);
                }
              } else if (is_new_lesson) {
                navigate(`/nanodegree/${subject_slug}/daily-syllabus/`);
              } else if (is_new_skill) {
                navigate(`/nanodegree/${subject_slug}/daily-syllabus/`);
              } else if (is_new_designation) {
                updateProfessionStatus(true);
                updateNextProfession({
                  pk: data.upcoming_designation_pk,
                  name: data.upcoming_designation_name,
                });
                navigate(`/nanodegree/${subject_slug}/daily-syllabus/`);
              }
            } else if (StatusCode === 6001) {
              setErrorMessage(data.title);
            }
            setBasicLoading(false);
          })
          .catch((error) => {
            setBasicLoading(false);
            setErrorMessage("An error occured, please try again later");
          });
      }
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

  const renderAttachment = (attachment) => {
    return (
      <AssetDownloadCard
        title="Challenge asset"
        size="236.54"
        icon="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
        item_link={attachment}
      />
    );
  };

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
          </TitleContainer>
          <MiddleBox ref={middleContainer} className="middle">
            <Qno>Question Number {question.question_number}</Qno>
            <QTitle>{question.question}</QTitle>
            {question.description && (
              <QDescription>{question.description}</QDescription>
            )}
            {question.attachment && (
              <div className="cards" style={styles.downloadCard}>
                <AssetsGrid>{renderAttachment(question.attachment)}</AssetsGrid>
              </div>
            )}
            <BottomBox>
              <UploadTitle>
                Upload your file as soon as you complete the challenge
              </UploadTitle>
              <Label htmlFor="file-upload">
                <UploadButton className="button" to="">
                  <i
                    className="las la-paperclip"
                    style={styles.button_icon}
                  ></i>
                  Choose file
                </UploadButton>
                <input
                  accept=".zip,.rar"
                  style={styles.inputfile}
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={(event) => {
                    onChangeHandler(event);
                  }}
                />
                <span
                  style={{
                    marginLeft: 20,
                  }}
                >
                  {selectedFile ? truncate(selectedFile.name) : null}
                </span>
              </Label>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              {isBasicLoading ? (
                <SubmitButton>
                  <RequestLoader />
                </SubmitButton>
              ) : (
                <SubmitButton onClick={sendRequest}>
                  Submit
                  <i
                    className="las la-long-arrow-alt-right"
                    style={styles.icon}
                  ></i>
                </SubmitButton>
              )}
            </BottomBox>
          </MiddleBox>
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

const UploadButton = styled.a`
  cursor: pointer;
  background-color: rgb(47, 81, 199);
  color: rgb(255, 255, 255);
  font-family: "gordita_medium";
  display: flex;
  padding: 11px 19px;
  border-radius: 8px;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1800px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 1550px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.span`
  font-size: 15px;
  color: #f46565;
  margin-top: 10px;
  margin-bottom: -10px;
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

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 480px) {
    display: block;
    width: 100%;
  }
`;

// const Time = styled.span`
//     font-size: 22px;
//    font-family: "gordita_medium";
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
  @media only screen and (max-width: 980px) {
    width: 85%;
    padding: 55px 50px;
  }
  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
  @media only screen and (max-width: 480px) {
    width: 98%;
    padding: 10px;
  }
`;

const ContentContainer = styled.div`
  width: 79%;
  @media only screen and (max-width: 980px) {
    width: 90%;
  }
  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const AssetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  @media only screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MiddleBox = styled.div`
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f2f7fe;
  padding: 30px;
  border-radius: 15px;
  overflow: scroll;
  height: max-content;
  @media only screen and (max-width: 980px) {
    padding: 20px;
  }
  @media only screen and (max-width: 640px) {
    padding: 15px;
  }
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 50px 0px;
  align-items: flex-start;
  @media only screen and (max-width: 980px) {
    margin: 20px 0 0;
  }
  @media only screen and (max-width: 640px) {
    margin: 10px 0 0;
  }
`;

const Qno = styled.small`
  color: #717277;
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
  }
  @media only screen and (max-width: 640px) {
    font-size: 17px;
    line-height: 22px;
  }
`;

const QDescription = styled.p`
  text-align: left;
  margin: 20px 0;
`;

const UploadTitle = styled.h4`
  margin-bottom: 20px;
  @media only screen and (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 17px;
  }
`;

const SubmitButton = styled.span`
  width: 100%;
  background-color: rgb(23, 71, 76);
  color: rgb(255, 255, 255);
  height: 48px;
  border-radius: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  cursor: pointer;
  margin-top: 20px;
  @media only screen and (max-width: 480px) {
    margin-top: unset;
    padding: 5px 15px;
    margin-top: 10px;
  }
`;

export default connect(mapStateToProps)(ChallengeQuestion);
