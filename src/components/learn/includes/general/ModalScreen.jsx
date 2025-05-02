import React, { useEffect, useState } from "react";
import colors from "../../../../Colors";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import RequestLoader from "../authentication/general/RequestLoader";
import { useDispatch, useSelector } from "react-redux";
import { learnConfig } from "../../../../axiosConfig";
import $ from "jquery";
import { useHistory } from "react-router-dom";

const ModalScreen = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user_data } = useSelector((state) => state);

  useEffect(() => {
    if (props.show_modal) {
      dispatch({
        type: "UPDATE_CURRENT_DAY",
        current_day_id: "",
      });
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [props.show_modal]);
  const styles = {
    modalContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      background: "rgba(177, 177, 177, 0.8)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContentContainer: {
      background: "#fff",
      width: "50%",
      textAlign: "center",
      padding: "50px",
      borderRadius: "20px",
      border: "1px solid",
      borderColor: colors.white,
    },
    imageBox: {
      width: "20%",
      margin: "0 auto",
    },
    image: {
      display: "block",
      width: "100%",
    },
    contentBox: {
      margin: "30px 0",
    },
    title: {
      marginBottom: "20px",
      fontSize: "25px",
    },
    message: {
      width: "73%",

      margin: "0 auto",
      color: "#999",
      fontSize: "18px",
    },
    submitBox: {
      marginTop: "20px",
    },
    cancelButtonText: {
      display: "inline-block",
      padding: "10px 50px",
      background: "#fff",
      color: colors.blueGrey700,
      borderRadius: "40px",
      border: "1px solid",
      borderColor: colors.blueGrey700,
      cursor: "pointer",
    },
    successButtonTextOne: {
      display: "inline-block",
      padding: "10px 50px",
      background: colors.green,
      color: "#fff",
      borderRadius: "40px",
      marginRight: "20px",
      cursor: "pointer",
    },
    successButtonTextTwo: {
      display: "inline-block",
      padding: "10px 50px",
      background: colors.green,
      color: "#fff",
      borderRadius: "40px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    AOS.init({
      duration: 400,
    });
  }, []);
  const [dayByDayData, setDayByDayData] = useState(null);
  const [currentDayObject, setCurrentDayObject] = useState(null);

  useEffect(() => {
    // try {
    const storedData = JSON.parse(localStorage.getItem("day_by_day"));

    // console.log(storedData.find((item) => item.program === props.subject_slug));
    if (props.subject_slug) {
      const program_data = storedData?.find(
        (item) => item.program === props.subject_slug
      );

      if (program_data) {
        setDayByDayData(program_data["days"]);
      }
    }
  }, []);

  useEffect(() => {
    if (dayByDayData) {
      try {
        const foundDayObject = Object.values(dayByDayData?.student_days).find(
          (day) => day.is_current_day
        );
        setCurrentDayObject(foundDayObject);
      } catch (error) {
        console.error("Error finding current day object:", error);
      }
    }
  }, [dayByDayData]);

  const renderDayModal = () => {
    return (
      <div className="modalContainer" style={styles.modalContainer}>
        <ModalContentContainer data-aos="fade-up" style={{ maxWidth: 600 }}>
          <Cover>
            <Vector>
              <img
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-06-2022/poper.svg"
                }
                alt=""
              />
            </Vector>
            <Title>Congratulations</Title>
            <Description>
              You have completed your&nbsp;
              <span>{currentDayObject.day_number}</span>&nbsp;day.
            </Description>
            <ButtonCover>
              <NextDayButton
                onClick={(e) => {
                  localStorage.removeItem("day_by_day");
                  props.onModalClose();
                  history.push(
                    `/nanodegree/${props.subject_slug}/daily-syllabus/`
                  );
                }}
              >
                Go to dashboard
              </NextDayButton>{" "}
              <DashBoardButton
                to={props.nextDayLink}
                onClick={(e) => {
                  props.onModalClose();
                }}
              >
                Go to next day
              </DashBoardButton>
            </ButtonCover>
          </Cover>
          <Decor>
            <img
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-06-2022/decor.svg"
              }
              alt=""
            />
          </Decor>
          <Cross
            onClick={(e) => {
              props.onModalClose();
            }}
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-06-2022/cross.svg"
            }
          />
        </ModalContentContainer>
      </div>
    );
  };
  const Vector = styled.div`
    width: 120px;
    margin: 0 auto;
    margin-bottom: 20px;
    img {
      display: block;
      width: 100%;
    }
    @media all and (max-width: 480px) {
      width: 100px;
    }
  `;

  const Title = styled.h2`
    font-family: gordita_medium;
    font-size: 22px;
    color: #2d2d2d;
    margin-bottom: 10px;
  `;
  const Description = styled.p`
    margin-bottom: 40px;
    span {
      font-family: gordita_medium;
      font-size: inherit;
    }
  `;
  const ButtonCover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 480px) {
      display: flex;
      flex-wrap: wrap;
    }
  `;

  const DashBoardButton = styled(Link)`
    font-size: 15px;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #10a483;
    font-family: gordita_medium;
    border: 2px solid #10a483;
    border-radius: 5px;

    @media all and (max-width: 480px) {
      width: 100%;
    }
    &:hover {
      opacity: 0.8;
      transition: 0.3s;
    }
  `;

  const NextDayButton = styled.button`
    font-size: 15px;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    margin-right: 30px;
    align-items: center;
    background-color: #10a483;
    color: #fff;
    border-radius: 5px;
    font-family: gordita_medium;
    cursor: pointer;
    @media all and (max-width: 480px) {
      width: 100%;
      margin-right: 0px;
      margin-bottom: 20px;
    }
    &:hover {
      opacity: 0.8;
      transition: 0.3s;
    }
  `;

  const Decor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    img {
      display: block;
      width: 95%;
    }
  `;
  const Cover = styled.div`
    position: relative;
    z-index: 2;
  `;
  const Cross = styled.img`
    position: absolute;
    width: 15px;
    top: 40px;
    right: 40px;
    display: block;
    z-index: 9;
    cursor: pointer;
  `;
  const renderSuccessButton = () => {
    if (props.successButtonLink === "show_success_modal") {
      return props.butttonLoading ? (
        <SuccessButton>
          <RequestLoader />
        </SuccessButton>
      ) : (
        <SuccessButton
          onClick={(e) => {
            props.isImprovement
              ? props.onModalClose && props.onModalClose("show_success_modal")
              : !props.isImprovement && props.markasComplete();
          }}
        >
          {props.successButtonText}
        </SuccessButton>
      );
    } else {
      return (
        <Link
          to={props.successButtonLink}
          onClick={(e) => {
            props.onModalClose();
          }}
        >
          <span style={styles.successButtonTextTwo}>
            {props.successButtonText}
          </span>
        </Link>
      );
    }
  };
  const renderDesignationModal = () => {
    return (
      <div className="modalContainer" style={styles.modalContainer}>
        <ModalContentBox data-aos="fade-up">
          <Heading>Congratulations!</Heading>
          <Content>You are successfully completed your profresssion</Content>
        </ModalContentBox>
      </div>
    );
  };

  const ModalContentBox = styled.div`
    background: rgb(255, 255, 255);
    width: 50%;
    text-align: center;
    padding: 50px 30px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  `;

  return (
    // !props.show_modal && renderDesignationModal()
    props.show_modal &&
    (props.isNewDay ? (
      renderDayModal()
    ) : (
      // : props.isNewDesignation ? (
      //     renderDesignationModal()
      // )
      <div className="modalContainer" style={styles.modalContainer}>
        <ModalContentContainer data-aos="fade-up">
          <div className="imageBox" style={styles.imageBox}>
            <img src={props.image} alt="" style={styles.image} />
          </div>
          <ContentBox>
            <Heading>{props.title}</Heading>
            <Content>{props.message}</Content>
          </ContentBox>
          <ButtonContainer className="submitBox">
            {renderSuccessButton()}
            {props.cancelButtonText === "No" && (
              <CancelButton
                onClick={(e) => {
                  props.onModalClose && props.onModalClose(e);
                }}
              >
                {props.cancelButtonText}
              </CancelButton>
            )}
          </ButtonContainer>
        </ModalContentContainer>
      </div>
    ))
  );
};

const ModalContentContainer = styled.div`
  background: rgb(255, 255, 255);
  width: 50%;
  text-align: center;
  padding: 50px 0;
  border-radius: 10px;
  /* border: 1px solid rgb(255, 255, 255); */
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    display: block;
    left: 0;
    bottom: 4px;
    background-color: #5ac78b;
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    display: block;
    left: 0;
    bottom: -1px;
    background-color: #459e7b;
  }
  @media (max-width: 1280px) {
    width: 59%;
  }
  @media (max-width: 1100px) {
    width: 65%;
  }
  @media (max-width: 980px) {
    width: 69%;
  }
  @media (max-width: 880px) {
    width: 76%;
  }
  @media (max-width: 764px) {
    width: 87%;
  }
  @media (max-width: 640px) {
    width: 96%;
    padding: 46px 0;
  }
  @media (max-width: 480px) {
    padding: 40px 24px;
    width: 97%;
  }
`;
const ContentBox = styled.div`
  margin: 30px 0px;
  @media (max-width: 480px) {
    margin: 21px 0px;
  }
`;
const Content = styled.div`
  width: 52%;
  margin: 0 auto;
  color: #999;
  font-size: 16px;
  line-height: 28px;
  font-family: gordita_regular;
  @media (max-width: 1440px) {
    width: 65%;
    font-size: 14px;
  }
  @media (max-width: 980px) {
    width: 64%;
    /* font-size: 15px; */
  }
  @media (max-width: 540px) {
    width: 70%;
    /* font-size: 14px;
        line-height: 22px; */
  }
  @media (max-width: 480px) {
    width: 83%;
    line-height: 20px;
  }
  @media (max-width: 360px) {
    width: 94%;
  }
`;
const Heading = styled.div`
  margin-bottom: 11px;
  font-size: 22px;
  /* line-height: 31px; */
  font-family: gordita_medium;
  @media (max-width: 1440px) {
    margin-bottom: 13px;
    font-size: 24px;
  }
  @media (max-width: 980px) {
    font-size: 22px;
    margin-bottom: 11px;
  }
  @media (max-width: 980px) {
    margin-bottom: 6px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
    margin-bottom: 3px;
  }
  @media (max-width: 540px) {
    font-size: 19px;
    margin-bottom: 2px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
    line-height: 27px;
  }
  @media (max-width: 360px) {
    font-size: 16px;
  }
`;
const SuccessButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 42px;
  min-width: 137px;
  background: rgb(76, 175, 80);
  color: rgb(255, 255, 255);
  border-radius: 40px;
  margin-right: 20px;
  border: 1px solid rgb(76, 175, 80);
  cursor: pointer;
  font-size: 14px;
  font-family: gordita_regular;
  @media (max-width: 1440px) {
    height: 43px;
    min-width: 123px;
  }
  @media (max-width: 980px) {
    font-size: 14px;
  }
  @media (max-width: 640px) {
    margin-right: 12px;
    min-width: 118px;
  }
  @media (max-width: 480px) {
    height: 39px;
    min-width: 114px;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CancelButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 41px;
  min-width: 137px;
  background: rgb(255, 255, 255);
  color: rgb(69, 90, 100);
  border-radius: 40px;
  border: 1px solid rgb(69, 90, 100);
  cursor: pointer;
  font-family: gordita_regular;
  font-size: 14px;
  @media (max-width: 1440px) {
    height: 42px;
    min-width: 123px;
  }
  @media (max-width: 980px) {
    font-size: 14px;
    padding: 11px 41px;
  }
  @media (max-width: 640px) {
    min-width: 118px;
  }
  @media (max-width: 480px) {
    height: 38px;
    min-width: 114px;
  }
`;

export default ModalScreen;
