import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

function ReviewQuestions({
  questionNumbers,
  setViewQuestions,
  completed,
  setComplted,
  viewtotal,
  examQuestion,
  totalQuestions,
  viewquestions,
}) {
  // const [isactive, setActive] = useState(false);
  const dispatch = useDispatch();
  const { school_scientist_data } = useSelector((state) => state);

  const selectedDivRef = useRef(null);

  useEffect(() => {
    if (selectedDivRef.current)
      selectedDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [questionNumbers, selectedDivRef]);

  return (
    <SectionContainer>
      <Title>Questions</Title>
      <QuestionCount>
        Question{" "}
        {viewtotal?.order_id
          ? viewtotal.order_id
          : examQuestion.question_number}{" "}
        of {totalQuestions}
      </QuestionCount>

      <QuestionNumbers>
        {school_scientist_data?.is_exam_completed?.is_assessment_completed
          ? questionNumbers.map((each) => (
              <Numberso
                key={each.id}
                ref={
                  school_scientist_data?.is_exam_completed
                    ?.is_assessment_completed &&
                  viewtotal?.order_id === each.order_id
                    ? selectedDivRef
                    : null
                }
                action={each.status}
                onClick={() => {
                  setViewQuestions(each.id);
                  school_scientist_data?.is_exam_completed
                    ?.is_assessment_completed &&
                    dispatch({
                      type: "UPDATE_SCHOOL_SCIENTIST_DATA",
                      school_scientist_data: {
                        ...school_scientist_data,
                        ongoing_question: each.id,
                      },
                    });
                }}
                className={
                  school_scientist_data?.is_exam_completed
                    ?.is_assessment_completed &&
                  viewtotal?.order_id === each.order_id &&
                  "current-active"
                }
              >
                <span>{each.order_id}</span>
              </Numberso>
            ))
          : questionNumbers.map((each) => (
              <Numbers
                ref={each.status === "attending" ? selectedDivRef : null}
                key={each.id}
                action={each.status}
                onClick={() => {
                  setViewQuestions(each.id);
                  school_scientist_data?.is_exam_completed
                    ?.is_assessment_completed &&
                    dispatch({
                      type: "UPDATE_SCHOOL_SCIENTIST_DATA",
                      school_scientist_data: {
                        ...school_scientist_data,
                        ongoing_question: each.id,
                      },
                    });
                }}
              >
                <span>{each.order_id}</span>
              </Numbers>
            ))}
      </QuestionNumbers>
    </SectionContainer>
  );
}

export default ReviewQuestions;
const SectionContainer = styled.div``;

const Title = styled.h3`
  font-size: 20px;
  font-family: "gordita_medium";
  color: #747474;
  margin-bottom: 13px;
  @media all and (max-width: 640px) {
    display: none;
  }
`;
const QuestionNumbers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  @media all and (max-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media all and (max-width: 640px) {
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Numberso = styled.div`
  border: ${({ action }) =>
    action === "completed"
      ? "1px solid #0fa76f"
      : action === "attending"
      ? "1px solid #0fa76f"
      : action === "pending"
      ? " 1px solid #d5d5d5"
      : ""};
  cursor: ${({ action }) =>
    action === "completed"
      ? "pointer"
      : action === "attending"
      ? "pointer"
      : action === "pending"
      ? "not-allowed"
      : ""};

  background-color: ${({ action }) =>
    action === "completed"
      ? "#fff"
      : action === "attending"
      ? "#0fa76f"
      : action === "pending"
      ? "#fff"
      : ""};

  color: ${({ action }) =>
    action === "completed"
      ? "#747474"
      : action === "attending"
      ? "#fff"
      : action === "pending"
      ? "#adadad"
      : ""};

  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
  &:hover {
    background-color: #0fa76f;
    color: #fff;
  }
  span {
    font-family: "gordita_medium";
    height: 17px;
    font-size: 17px;
  }
  @media all and (max-width: 980px) {
    span {
      font-size: 15px;
      height: 15px;
    }
  }
  @media all and (max-width: 640px) {
    min-width: 36px;
    max-width: 36px;
    border-radius: 5px;
  }
  &.current-active {
    background-color: #0fa76f;
    color: #fff;
  }
`;
const Numbers = styled.div`
  border: ${({ action }) =>
    action === "completed"
      ? "1px solid #0fa76f"
      : action === "attending"
      ? "1px solid #0fa76f"
      : action === "pending"
      ? " 1px solid #d5d5d5"
      : ""};
  cursor: ${({ action }) =>
    action === "completed"
      ? "not-allowed"
      : action === "attending"
      ? "pointer"
      : action === "pending"
      ? "not-allowed"
      : ""};

  background-color: ${({ action }) =>
    action === "completed"
      ? "#fff"
      : action === "attending"
      ? "#0fa76f"
      : action === "pending"
      ? "#fff"
      : ""};

  color: ${({ action }) =>
    action === "completed"
      ? "#747474"
      : action === "attending"
      ? "#fff"
      : action === "pending"
      ? "#adadad"
      : ""};

  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
  &.active {
    background-color: #0fa76f;
  }
  span {
    font-family: "gordita_medium";
    height: 17px;
    font-size: 17px;
  }
  @media all and (max-width: 980px) {
    span {
      font-size: 15px;
      height: 15px;
    }
  }
  @media all and (max-width: 640px) {
    min-width: 36px;
    max-width: 36px;
    border-radius: 5px;
  }
`;

const QuestionCount = styled.p`
  font-family: "gordita_medium" !important;
  font-size: 20px;
  color: #747474;
  margin-bottom: 20px;
  display: none;
  @media all and (max-width: 980px) {
    font-size: 19px;
  }
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
  @media all and (max-width: 640px) {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;
