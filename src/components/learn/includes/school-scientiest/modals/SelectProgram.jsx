import React from "react";
import styled from "styled-components";
function SelectProgram({ setProgramType, progamType, setHeadContent }) {
    return (
        <>
            <CheckBoxSection>
                <CheckboxContainer
                    className={progamType === "quiz" ? "active" : ""}
                    onClick={() => setProgramType("quiz")}
                >
                    <CheckboxInput>
                        {progamType === "quiz" ? (
                            <img
                                src={require("../../../../../assets/images/school-scientist/green-tick.svg")}
                                alt="Completed"
                            />
                        ) : (
                            <img
                                src={require("../../../../../assets/images/school-scientist/white-tick.svg")}
                                alt="Not Completed"
                            />
                        )}
                    </CheckboxInput>
                    <TextDiv>
                        <CheckboxTitle>Quiz</CheckboxTitle>
                        <CheckDisc>
                            We have a general round open for all students from
                            Junior-Senior categories
                        </CheckDisc>
                    </TextDiv>
                </CheckboxContainer>
                <CheckboxContainer
                    onClick={() => setProgramType("idea_pitching")}
                    className={progamType === "idea_pitching" ? "active" : ""}
                >
                    <CheckboxInput>
                        {progamType === "idea_pitching" ? (
                            <img
                                src={require("../../../../../assets/images/school-scientist/green-tick.svg")}
                                alt="Completed"
                            />
                        ) : (
                            <img
                                src={require("../../../../../assets/images/school-scientist/white-tick.svg")}
                                alt="Not Completed"
                            />
                        )}
                    </CheckboxInput>
                    <TextDiv>
                        <CheckboxTitle>Idea Pitching</CheckboxTitle>
                        <CheckDisc>
                            In the second round, students can attend in group
                            and pitch their ideas.
                        </CheckDisc>
                    </TextDiv>
                </CheckboxContainer>
                <CheckboxContainer
                    onClick={() => setProgramType("both")}
                    className={progamType === "both" ? "active" : ""}
                >
                    <CheckboxInput>
                        {progamType === "both" ? (
                            <img
                                src={require("../../../../../assets/images/school-scientist/green-tick.svg")}
                                alt="Completed"
                            />
                        ) : (
                            <img
                                src={require("../../../../../assets/images/school-scientist/white-tick.svg")}
                                alt="Not Completed"
                            />
                        )}
                    </CheckboxInput>
                    <TextDiv>
                        <CheckboxTitle>Both</CheckboxTitle>
                        <CheckDisc>
                            Select this option for attending both programmes
                        </CheckDisc>
                    </TextDiv>
                </CheckboxContainer>
            </CheckBoxSection>
            <Bottom>
                <ModalButton
                    onClick={() => {
                        setHeadContent("Enter your details");
                    }}
                >
                    Next
                </ModalButton>
            </Bottom>
        </>
    );
}

export default SelectProgram;

const TextDiv = styled.div``;
const CheckDisc = styled.p`
    color: #707070;
    font-size: 13px;
`;
const CheckboxContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #e7e7e7;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 24px;
    &.active {
        border: 1px solid #12a46f;
        background-color: #a1dbc663;
    }
`;

const CheckboxInput = styled.div`
    margin-right: 14px;
    width: 23px;

    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;

const CheckboxTitle = styled.span`
    font-size: 16px;
    color: #0a0a0a;
    font-weight: 600;
    margin-bottom: 14px;
`;

const CheckBoxSection = styled.div`
    padding: 24px 0;
`;
const Bottom = styled.div`
    display: flex;
    justify-content: end;
    font-weight: 600;
`;
const ModalButton = styled.button`
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    padding: 16px 44px;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
`;
