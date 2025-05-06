import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PracticeWorkshopThumnail from "../practices/PracticeWorkshopThumnail";
import EmptyWorkshopThumnail from "../practices/EmptyWorkshopThumnail";
import EmptyStarRatingCard from "../practices/EmptyStarRatingCard";
import StarRatingCard from "../practices/StarRatingCard";
import PracticeInstruction from "../practices/PracticeInstruction";
import PracticeAssets from "../practices/PracticeAssets";
import ActivityCard from "../practices/ActivityCard";
import EmptyActivityCard from "../practices/EmptyActivityCard";
import { PracticeContext } from "../../../../contexts/stores/PracticeStore";

import { serverConfig } from "../../../../../axiosConfig";
import { findObjectFromArray } from "../../../../helpers/functions";
import EnrollPopup from "../general/EnrollPopup";
import Loader from "../general/loaders/Loader";
import TalropTechSchoolingHelmet from "../../../../helpers/TalropTechSchoolingHelmet";
import ModalScreen from "../../general/ModalScreen";
import PracticeFileUpload from "../../practices/PracticeFileUpload";
import EvaluationCard from "../practices/EvaluationCard";

function mapStatetoProps(state) {
  return {
    user_data: state.user_data,
    user_profile: state.user_profile,
  };
}

const PracticePage = (props) => {
  const { id } = useParams();
  const activitiesRef = useRef(null);
  const dispatch = useDispatch();

  const [isActivities, setIsActivities] = useState(false);

  const { practiceState, practiceDispatch } = useContext(PracticeContext);
  const [practice, setPractice] = useState(true);
  const [workshop, setWorkshop] = useState(true);

  const [isPracticeAssetLoading, setPracticeAssetLoading] = useState(true);
  const [isPracticeActivitiesLoading, setPracticeActivitiesLoading] =
    useState(true);
  const [isPracticeScoreLoading, setPracticeScoreLoading] = useState(true);

  const [uploadModalVisible, setUploadModal] = useState(false);
  const [message, setMessage] = useState("default text");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");

  const [uploadSuccessModal, setUploadSuccessModal] = useState(false);

  const [nextWorkshop, setNextWorkshop] = useState("");

  useEffect(() => {
    // fetchPracticeAsset();
    // fetchPracticeActivities();
    // fetchPracticeScore();
    fetchPractice();
  }, []);

  const handleClickOutside = (event) => {
    if (
      activitiesRef.current &&
      !activitiesRef.current.contains(event.target)
    ) {
      if (isActivities) {
        handleActivityShow();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [isActivities]);

  // useEffect(() => {
  //     if (
  //         !isPracticeAssetLoading &&
  //         !isPracticeActivitiesLoading &&
  //         !isPracticeScoreLoading
  //     ) {
  //         if (isLoading) {
  //             practiceDispatch({
  //                 type: "TOGGLE_LOADING",
  //             });
  //         }
  //     }
  // }, [
  //     isPracticeAssetLoading,
  //     isPracticeActivitiesLoading,
  //     isPracticeScoreLoading,
  // ]);

  //Fetching datas from API
  // const fetchPracticeAsset = () => {
  //     let { user_data } = props;
  //     let { access_token } = user_data;
  //     learnConfig
  //         .get(`/practices/new-content/view/practice/${id}/`, {
  //             headers: { Authorization: "Bearer " + access_token },
  //         })
  //         .then((response) => {
  //             const { StatusCode, data } = response.data;
  //             if (StatusCode === 6000) {
  //                 practiceDispatch({
  //                     type: "UPDATE_PRACTICE_ASSETS",
  //                     practice_assets: data,
  //                 });
  //                 setPracticeAssetLoading(false);
  //             } else if (StatusCode === 6001) {
  //                 setPracticeAssetLoading(false);
  //             }
  //         })
  //         .catch((error) => {
  //             setPracticeAssetLoading(false);
  //         });
  // };

  // const fetchPracticeScore = () => {
  //     let { user_data } = props;
  //     let { access_token } = user_data;
  //     learnConfig
  //         .get(`/practices/practice-score/${id}/`, {
  //             headers: { Authorization: "Bearer " + access_token },
  //         })
  //         .then((response) => {
  //             const { StatusCode, data } = response.data;
  //             if (StatusCode === 6000) {
  //                 practiceDispatch({
  //                     type: "UPDATE_PRACTICE_SCORE",
  //                     practice_score: data,
  //                 });
  //                 setPracticeScoreLoading(false);
  //             } else if (StatusCode === 6001) {
  //                 setPracticeScoreLoading(false);
  //             }
  //         })
  //         .catch((error) => {
  //             setPracticeScoreLoading(false);
  //         });
  // };

  //For fetching activities from API
  // const fetchPracticeActivities = () => {
  //     let { user_data } = props;
  //     let { access_token } = user_data;
  //     learnConfig
  //         .get(`/practices/practice-activities/${id}/`, {
  //             headers: { Authorization: "Bearer " + access_token },
  //         })
  //         .then((response) => {
  //             const { StatusCode, data } = response.data;
  //             if (StatusCode === 6000) {
  //                 let activities = data;
  //                 let { activities_base } = practiceState;
  //                 let response = [];

  //                 // Combining base activities with activitites fetched from backend
  //                 activities.forEach((activity) => {
  //                     let base_activity = findObjectFromArray(
  //                         activities_base,
  //                         "activity_type",
  //                         activity.activity_type
  //                     );
  //                     response.push({
  //                         ...activity,
  //                         ...base_activity,
  //                     });
  //                 });

  //                 let practice_activities = response;
  //                 practiceDispatch({
  //                     type: "UPDATE_PRACTICE_ACTIVITIES",
  //                     practice_activities: practice_activities,
  //                 });
  //                 setPracticeActivitiesLoading(false);
  //             } else {
  //                 setPracticeActivitiesLoading(false);
  //             }
  //         })
  //         .catch((error) => {
  //             setPracticeActivitiesLoading(false);
  //         });
  // };

  const handleActivityShow = () => {
    setIsActivities((prevValve) => !prevValve);
  };

  const handleUpload = () => {
    setUploadModal((prev) => !prev);
  };

  const onModalClose = () => {
    setUploadError(false);
    setUploadModal(false);
    setUploadSuccessModal(false);
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

  // For appending data to formdata object and POST to API
  const [uploading, setUploading] = useState(false);
  const onClickHandler = (selectedFile) => {
    let { user_data } = props;
    let { access_token } = user_data;
    // let { practice_activities } = practiceState;
    if (selectedFile && message) {
      setUploadLoading(true);
      const data = new FormData();
      data.append("attachment", selectedFile);
      data.append("message", message);
      data.append(
        "student_day_pk",
        currentDayObject ? currentDayObject.id : ""
      );
      learnConfig
        .post(
          `/practices/nanodegree/upload-practice/${props.subject_slug}/${id}/`,
          data,
          {
            headers: {
              Authorization: "Bearer " + access_token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const { StatusCode, message, data } = response.data;
          if (StatusCode === 6000) {
            if (data?.is_new_day || data?.next_student_day_pk) {
              updateDaysLocal(data.next_student_day_pk, data.day_pk);
            }
            const { workshop_topic_pk } = data;
            setNextWorkshop(workshop_topic_pk);
            onUploadSuccess();
            setUploading(false);
            // practice_activities.push({
            //     activity_type: "practice_uploaded",
            //     icon_name: "check-circle",
            //     status: "success",
            //     color: "rgb(86, 192, 129)",
            //     title: "Practice uploaded",
            //     is_star_needed: false,
            //     // is_need_uploading_file: true,
            //     border_radius: "5px",
            //     date_added: new Date(),
            //     // uploaded_file: selectedFile,
            //     // uploaded_file_name: selectedFile.name,
            // });
            // practiceDispatch({
            //     type: "UPDATE_PRACTICE_ACTIVITIES",
            //     practice_activities: practice_activities,
            // });
            // practiceDispatch({
            //     type: "UPDATE_PRACTICE",
            //     practice: {
            //         ...practice,
            //         status: "evaluating",
            //     },
            // });
            setUploadLoading(false);

            // setTimeout(() => {
            //     fetchPracticeActivities();
            // }, 500);
          } else if (StatusCode === 6001) {
            setUploadError(true);
            setUploadErrorMessage(message);
            setUploadLoading(false);
          }
        })
        .catch((error) => {
          setUploadError(true);
          setUploadErrorMessage("An error occured, please try later");
          setUploadLoading(false);
        });
    } else if (!selectedFile) {
      setUploadError(true);
      setUploadErrorMessage("Choose a file and continue");
    } else {
      setUploadError(true);
      setUploadErrorMessage("Message field should not be left blank");
    }
  };

  const onUploadSuccess = () => {
    setUploadSuccessModal((prev) => !prev);
    setUploadModal(false);
  };

  const [is_modal_active, setModalActive] = useState(false);

  const handleEnrollModal = () => {
    setModalActive((prev) => !prev);
  };
  const history = useHistory();
  const fetchPractice = () => {
    let { user_data } = props;
    let { access_token } = user_data;

    learnConfig
      .get(`/practices/new-content/view/practice/${id}/`, {
        headers: { Authorization: "Bearer " + access_token },
      })
      .then((response) => {
        const { StatusCode, data, workshop_data } = response.data;
        if (StatusCode === 6000) {
          setPractice(data);
          setWorkshop(workshop_data);
        } else if (StatusCode === 6001) {
        }
      })
      .catch((error) => {
        dispatch({
          type: "UPDATE_ERROR",
          error: error,
          errorMessage: "Server error, please try again",
        });
      });
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
    const program = existingData.find(
      (item) => item.program === props.subject_slug
    );

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

  return (
    <>
      <EnrollPopup
        is_active={is_modal_active}
        setModalActive={setModalActive}
        isVideoOnlyModal={true}
        image={practice.image}
        video_url={practice.playlist}
      />
      {/* {isLoading ? (
                <Container>
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                </Container>
            ) : ( */}
      <Container>
        <TalropTechSchoolingHelmet title={`${practice.title}`} />
        <ModalScreen
          successButtonText="Go to workshop"
          show_modal={uploadSuccessModal}
          title="Practice completed"
          image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
          onModalClose={onModalClose}
          message="You have successfully uploaded your practice"
          redirect={true}
          successButtonLink={`/tech-schooling/new-content/skills/${id}/workshops/`}
          subject_slug={props.subject_slug}
        />
        <PracticeFileUpload
          show_modal={uploadModalVisible}
          toggleModal={handleUpload}
          onModalClose={onModalClose}
          takeMessage={setMessage}
          onClickHandler={onClickHandler}
          uploadLoading={uploadLoading}
          isUploadError={isUploadError}
          uploadErrorMessage={uploadErrorMessage}
          id={practice.order_id}
          title={practice.title}
          uploading={uploading}
        />

        <Top>
          <ButtonContainer>
            <Button onClick={handleActivityShow}>
              <Icon className="las la-bars m-r-5"></Icon> Activities
            </Button>
          </ButtonContainer>
        </Top>

        <MainContainer>
          <LeftContainer>
            {practice.status === "pending" ? (
              // <EmptyStarRatingCard />
              <></>
            ) : practice.status === "completed" ? (
              <StarRatingCard
                title="Your star for this practice"
                // data={practice_score}
                name={props.user_data.name}
              />
            ) : (
              <EvaluationCard />
            )}

            {/* <WorkshopContainer>
                            {workshop ? (
                                <PracticeWorkshopThumnail
                                    practice_status={practice.status}
                                    data={workshop}
                                />
                            ) : (
                                <EmptyWorkshopThumnail />
                            )}
                        </WorkshopContainer> */}
          </LeftContainer>

          <MiddleContainer>
            <PracticeInstruction
              onClick={handleEnrollModal}
              handleUpload={handleUpload}
              practice={practice}
            />

            {/* <AssetsContainer>
                            <Title>{practice.title}</Title>
                            <AssetsCardContainer>
                                    {practice_assets.map((data, index) => (
                                        <PracticeAssets
                                            index={index}
                                            data={data}
                                        />
                                    ))}
                                </AssetsCardContainer>
                        </AssetsContainer> */}
          </MiddleContainer>

          <RightContainer
            ref={activitiesRef}
            className={isActivities ? "active" : ""}
          >
            <ActivityContainer>
              <ActivityTitle>Activities</ActivityTitle>
              {/* {practice_activities.length > 0 ? (
                                    practice_activities.map(
                                        (practice_activity) => (
                                            <ActivityCard
                                                key={practice_activity.title}
                                                data={practice_activity}
                                            />
                                        )
                                    )
                                ) : (
                                    <EmptyActivityCard
                                        name={props.user_profile.name}
                                    />
                                )} */}
            </ActivityContainer>
          </RightContainer>
        </MainContainer>
      </Container>
      {/* )} */}
    </>
  );
};

export default connect(mapStatetoProps)(PracticePage);

const Container = styled.div`
  margin-top: 20px;
`;
const LoaderContainer = styled.div`
  min-height: 560px;
  display: flex;
  align-items: center;
`;
const MainContainer = styled.div`
  // position:relative;
  display: grid;
  grid-template-columns: 2fr 4fr 3fr;
  grid-gap: 70px;
  margin-top: 10px;
  @media all and (max-width: 1440px) {
    grid-template-columns: 1fr 2fr;
  }
  @media all and (max-width: 980px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media all and (max-width: 640px) {
    margin-top: 10px;
  }
`;
const LeftContainer = styled.div`
  order: 1;
  @media all and (max-width: 980px) {
    order: 2;
    width: 100%;
    margin-top: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
  @media all and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const WorkshopContainer = styled.div`
  margin-top: 30px;
  @media all and (max-width: 980px) {
    margin-top: 0;
  }
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  @media all and (max-width: 640px) {
    margin-bottom: 10px;
  }
`;
const MiddleContainer = styled.div`
  order: 2;
  width: 100%;
  @media all and (max-width: 980px) {
    order: 1;
  }
`;
const AssetsContainer = styled.div`
  margin-top: 50px;
  @media all and (max-width: 480px) {
    margin-top: 30px;
  }
`;
const AssetsCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  @media all and (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
  @media all and (max-width: 360px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
const RightContainer = styled.div`
  order: 3;
  @media all and (max-width: 1440px) {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #f8f9fd;
    right: -400px;
    width: 90%;
    max-width: 400px;
    transition: all 0.4s ease-in-out;
    z-index: 9999;
    &.active {
      right: 0;
    }
  }
`;
const ActivityContainer = styled.div`
  background-color: #f8f9fd;
  padding: 40px 30px 30px;
`;
const ActivityTitle = styled.h2`
  margin-bottom: 20px;
  font-family: gordita_regular;
  color: blue;
`;
const Top = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ButtonContainer = styled.div`
  -webkit-box-pack: end;
  justify-content: flex-end;
  display: none;
  // margin-right: 20px;
  @media all and (max-width: 1440px) {
    display: flex;
    cursor: pointer;
  }
`;
const Button = styled.span`
  cursor: pointer;
  background-color: orange;
  color: rgb(255, 255, 255);
  padding: 9px 21px;
  border-radius: 24px;
  min-width: 125px;

  display: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-family: gordita_regular;
  font-size: 12px;
  @media all and (max-width: 1440px) {
    display: flex;
    align-items: center;
  }
  @media all and (max-width: 640px) {
    /* font-size: 14px; */
    padding: 7px 10px;
  }
`;

const Icon = styled.i``;
