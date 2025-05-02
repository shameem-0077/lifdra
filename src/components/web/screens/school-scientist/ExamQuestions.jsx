import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function ExamQuestions({
    selectedOption,
    setSelectedOption,
    setSelectedAnswer,
    selectedAnswer,
    examQuestion,
    totalQuestions,
    selectedLanguage,
    viewtotal,
    nextLoading,
}) {
    useEffect(() => {
        setSelectedOption(viewtotal.selected_option);
    }, [viewtotal]);

    const school_scientist_data = useSelector(
        (state) => state.school_scientist_data
    );
    return (
        <SectionContainer>
            <QuestionCount>
                Question{" "}
                {viewtotal?.order_id
                    ? viewtotal.order_id
                    : examQuestion.question_number}{" "}
                of {totalQuestions}{" "}
            </QuestionCount>
            <ExamQuestion>
                {school_scientist_data.selected_language === "english" &&
                    viewtotal?.english_question}
                {school_scientist_data.selected_language === "english" &&
                    examQuestion?.english_question}
                {school_scientist_data.selected_language !== "english" &&
                    viewtotal?.question}
                {school_scientist_data.selected_language !== "english" &&
                    examQuestion?.question}
            </ExamQuestion>
            {school_scientist_data.selected_language === "english" ? (
                <>
                    <Options
                        className={
                            // selectedOption === examQuestion?.english_option1 &&
                            selectedOption === "option1" && "active"
                        }
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option1");
                                setSelectedAnswer("option1");
                            }
                        }}
                    >
                        <Code>A</Code>{" "}
                        <Op>
                            {viewtotal?.english_option1
                                ? viewtotal?.english_option1
                                : examQuestion.english_option1}
                        </Op>
                    </Options>

                    <Options
                        className={
                            // selectedOption === examQuestion.english_option2 &&
                            selectedOption === "option2" && "active"
                        }
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option2");

                                setSelectedAnswer("option2");
                            }
                        }}
                    >
                        <Code>B</Code>{" "}
                        <Op>
                            {viewtotal?.english_option2
                                ? viewtotal?.english_option2
                                : examQuestion.english_option2}
                            {/* {examQuestion.english_option2} */}
                        </Op>
                    </Options>
                    <Options
                        className={
                            // selectedOption === examQuestion.english_option3 &&
                            selectedOption === "option3" && "active"
                        }
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option3");
                                setSelectedAnswer("option3");
                            }
                        }}
                    >
                        <Code>C</Code>{" "}
                        <Op>
                            {viewtotal?.english_option3
                                ? viewtotal?.english_option3
                                : examQuestion.english_option3}
                            {/* {examQuestion.english_option3} */}
                        </Op>
                    </Options>
                    <Options
                        className={
                            // selectedOption === examQuestion.english_option4 &&
                            selectedOption === "option4" && "active"
                        }
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option4");
                                setSelectedAnswer("option4");
                            }
                        }}
                    >
                        <Code>D</Code>{" "}
                        <Op>
                            {viewtotal?.english_option4
                                ? viewtotal?.english_option4
                                : examQuestion.english_option4}
                            {/* {examQuestion.english_option4} */}
                        </Op>
                    </Options>
                </>
            ) : (
                <>
                    <Options
                        className={
                            // selectedOption === examQuestion?.english_option1 &&
                            selectedOption === "option1" && "active"
                        }
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option1");
                                setSelectedAnswer("option1");
                            }
                        }}
                    >
                        <Code>A</Code>{" "}
                        <Op>
                            {viewtotal?.option1
                                ? viewtotal?.option1
                                : examQuestion.option1}
                        </Op>
                    </Options>
                    <Options
                        className={selectedOption === "option2" && "active"}
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option2");
                                setSelectedAnswer("option2");
                            }
                        }}
                    >
                        <Code>B</Code>{" "}
                        <Op>
                            {" "}
                            {viewtotal?.option2
                                ? viewtotal?.option2
                                : examQuestion.option2}
                        </Op>
                    </Options>
                    <Options
                        className={selectedOption === "option3" && "active"}
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option3");
                                setSelectedAnswer("option3");
                            }
                        }}
                    >
                        <Code>C</Code>{" "}
                        <Op>
                            {" "}
                            {viewtotal?.option3
                                ? viewtotal?.option3
                                : examQuestion.option3}
                        </Op>
                    </Options>
                    <Options
                        className={selectedOption === "option4" && "active"}
                        onClick={(e) => {
                            if (!nextLoading) {
                                setSelectedOption("option4");
                                setSelectedAnswer("option4");
                            }
                        }}
                    >
                        <Code>D</Code>{" "}
                        <Op>
                            {viewtotal?.option4
                                ? viewtotal?.option4
                                : examQuestion.option4}
                        </Op>
                    </Options>
                </>
            )}
        </SectionContainer>
    );
}

export default ExamQuestions;
const SectionContainer = styled.div``;
const QuestionCount = styled.p`
    font-family: "gordita_medium" !important;
    font-size: 20px;
    color: #747474;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        font-size: 19px;
    }
    @media all and (max-width: 768px) {
        font-size: 18px;
    }
    @media all and (max-width: 640px) {
        display: none;
    }
`;
const ExamQuestion = styled.p`
    width: 90%;
    max-width: 650px;
    font-size: 19px;
    color: #0a0a0a;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        font-size: 18px;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        font-size: 17px;
        width: 100%;
    }
`;
const Code = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: 30px;
    border-radius: 3px;
    border: 1px solid #747474;
    margin-right: 10px;
    font-family: "gordita_medium" !important;
    padding-top: 6px;
    @media all and (max-width: 768px) {
        min-width: 25px;
        min-height: 25px;
        font-size: 15px;
        padding-top: 3px;
    }
    @media all and (max-width: 480px) {
        min-width: 25px;
        min-height: 25px;
    }
`;
const Op = styled.p`
    color: #545454;
    font-family: "gordita_medium" !important;
    font-size: 16px;
    min-height: 24px;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Options = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    :last-child {
        margin-bottom: 0;
    }
    &.active {
        border: 1px solid #0fa76f;
        background-color: #0fa76f;
        color: #fff;
        ${Code} {
            border: 1px solid #fff;
            color: #fff;
        }
        ${Op} {
            color: #fff;
        }
    }
    @media all and (max-width: 480px) {
        padding: 0;
        padding-left: 15px;
        width: 100%;
        min-height: 50px;
    }
`;
