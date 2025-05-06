import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";
import RequestLoader from "../../learn/includes/authentication/general/RequestLoader";
import SurveySuccessModal from "./SurveySuccessModal";

const QuestionOption = ({ item, option, clickFunction, isErroMsg }) => {
  return item[`option${option}`] === null ? null : (
    <AnswerDiv
      onClick={() => {
        clickFunction(item.id, `option${option}`);
      }}
    >
      <BorderRound>
        <BgRound
          className={item.selectedOption === `option${option}` ? "active" : ""}
        ></BgRound>
      </BorderRound>
      <Answer>{item[`option${option}`]}</Answer>
    </AnswerDiv>
  );
};

const QuestionBox = ({ item, clickFunction, onChange, isErroMsg, answer }) => {
  const options = [1, 2, 3, 4];
  return (
    <BottomConatainer key={item.id}>
      <QuestionDiv>
        <Number>
          {/* <P> */}
          {item.order_id < 10 && "0"}
          {item.order_id}
          {/* </P> */}
        </Number>
        <Question>{item.question}</Question>
      </QuestionDiv>
      {item.option1 === null ? (
        <InputContainer
          className={isErroMsg && !item.answer ? "error-active" : ""}
        >
          <input
            type="text"
            onChange={(e) => onChange(item.id, e.target.value)}
            placeholder="Your answer"
            value={item.answer}
          />
          <ErrorMessage className="error">This field is required</ErrorMessage>
        </InputContainer>
      ) : (
        <AnswerContainer
          className={isErroMsg && !item.selectedOption ? "error-active" : ""}
        >
          {options.map((option) => (
            <QuestionOption
              key={`${item.id}${option}`}
              item={item}
              option={option}
              clickFunction={clickFunction}
              isErroMsg={isErroMsg}
            />
          ))}
          <ErrorMessage className="error">This field is required</ErrorMessage>
        </AnswerContainer>
      )}
    </BottomConatainer>
  );
};

function SurveyQustions() {
  const [surveyData, setSurveyData] = useState([]);
  const [ispk, setPk] = useState();
  const [isSuccessModal, setSuccessModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isErroMsg, setErrorMsg] = useState(false);
  const [answer, setAnswer] = useState("");

  // useEffect(() => {
  //     console.log(surveyData, "changed");
  // }, [surveyData]);

  useEffect(() => {
    const fetchdata = () => {
      serverConfig
        .get("surveys/questions/")
        .then(function (response) {
          let { status_code, data, survey } = response.data;

          if (status_code === 6000) {
            setSurveyData(data);
            setPk(survey);
          }
        })
        .catch(function (error) {});
    };
    fetchdata();
  }, []);

  const clickFunction = (itemId, selectedOption) => {
    setSurveyData((prev) => {
      const questionIndex = prev.findIndex((item) => item.id === itemId);
      let newArray = [...prev];
      newArray[questionIndex].selectedOption = selectedOption;
      return newArray;
    });
  };

  const onChange = (itemId, answer) => {
    setAnswer(answer);
    setSurveyData((prev) => {
      const questionIndex = prev.findIndex((item) => item.id === itemId);
      let newArray = [...prev];
      newArray[questionIndex].answer = answer;
      return newArray;
    });
  };

  const submitAnswers = () => {
    const answers = surveyData.map((item) => {
      setLoading(true);
      setErrorMsg(true);
      return {
        question: item.id,
        answer:
          item.question_type === "objective"
            ? item.selectedOption
            : item.answer,
      };
    });
    serverConfig
      .post(`surveys/submit-answer/${ispk}/`, {
        survey_list: answers,
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setSuccessModal(true);
          setLoading(false);
          clearForm();
          setErrorMsg(false);
        } else if (status_code === 6001) {
          // clearForm();
          setLoading(false);
          // setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearForm = () => {
    setSurveyData((prev) => {
      let newArray = [...prev];
      for (const key in newArray) {
        delete newArray[key].selectedOption;
        newArray[key].answer = "";
      }
      return newArray;
    });
  };

  return (
    <MainContainer>
      <WrapperContainer>
        <TopDiv>
          <B>Questions List</B>
          <B>10</B>
        </TopDiv>
        {surveyData.map((item) => (
          <QuestionBox
            key={item.id}
            item={item}
            clickFunction={clickFunction}
            onChange={onChange}
            isErroMsg={isErroMsg}
            answer={answer}
          />
        ))}

        <ButtonContainer>
          <ButtonClear onClick={() => clearForm()}>Clear form</ButtonClear>
          <Button onClick={() => submitAnswers()}>
            {isLoading ? <RequestLoader /> : "Submit"}
          </Button>
        </ButtonContainer>
      </WrapperContainer>
      <SurveySuccessModal
        setSuccessModal={setSuccessModal}
        isSuccessModal={isSuccessModal}
      />
    </MainContainer>
  );
}

export default SurveyQustions;

const MainContainer = styled.div`
  padding: 50px 0px;
`;
const WrapperContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;
const TopDiv = styled.div`
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 40px; */
`;
const BottomConatainer = styled.div`
  padding: 60px 0px;
  border-bottom: 1px solid #e6e6e6;
  @media all and (max-width: 1050px) {
    padding: 35px 0;
  }
  @media all and (max-width: 480px) {
    padding: 25px 0px;
  }
`;

const InputContainer = styled.div`
  padding: 20px 50px;
  position: relative;
  &.error-active {
    .error {
      display: block;
    }
  }
  @media all and (max-width: 1280px) {
    padding: 40px 49px 10px 50px;
  }
  @media all and (max-width: 768px) {
    padding: 40px 0px 10px 35px;
  }
  @media all and (max-width: 480px) {
    padding: 20px 0px 10px 35px;
  }
  input {
    width: 100%;
    background: #f5f5f5;
    height: 36px;
    /* max-height: 100px; */
    font-size: 16px;
    padding: 20px;
    border-radius: 5px !important;
    border: 1px solid #f5f5f5;
    @media all and (max-width: 980px) {
      font-size: 14px;
    }
    @media all and (max-width: 360px) {
      padding: 18px 10px;
    }
    ::placeholder {
      color: #bebebe;
    }
    :hover {
      border: 1px solid #48ad50;
      border-radius: 6px;
    }
    :focus {
      border: 1px solid #48ad50;
      border-radius: 6px;
    }
  }
`;
const AnswerContainer = styled.div`
  padding: 20px 50px;
  position: relative;
  @media all and (max-width: 1280px) {
    padding: 40px 49px 10px 50px;
  }
  @media all and (max-width: 768px) {
    padding: 40px 0px 10px 35px;
  }
  @media all and (max-width: 480px) {
    padding: 25px 0px 10px 30px;
  }
  &.error-active {
    .error {
      display: block;
    }
  }
`;
const QuestionDiv = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
  @media all and (max-width: 1280px) {
  }
  //    padding: 40px 49px 10px 50px;
`;
const AnswerDiv = styled.div`
  font-size: 20px;
  font-family: "gordita_regular";
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Answer = styled.p`
  font-size: 22px;
  @media all and (max-width: 1280px) {
    font-size: 18px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
    width: 100%;
  }
`;
const BorderRound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4ca473;
  min-width: 23px;
  min-height: 23px;
  border-radius: 50%;
  margin-right: 10px;
  padding: 2px;
  @media all and (max-width: 1280px) {
    min-width: 20px;
    min-height: 20px;
    align-items: baseline;
  }
  @media all and (max-width: 360px) {
    min-width: 16px;
    min-height: 16px;
  }
  /* transform: translateY(-1px); */
`;
const BgRound = styled.div`
  width: 15px;
  height: 15px;
  padding: 9px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.4s ease;
  @media all and (max-width: 1280px) {
    padding: 6px;
  }
  @media all and (max-width: 360px) {
    width: 10px;
    height: 10px;
    padding: 0px;
  }
  &.active {
    background-color: #5aa970;
  }
`;
const P = styled.h6``;
const Number = styled.span`
  max-width: 40px;
  max-height: 40px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50px;
  padding-top: 1px;
  background: #18484c;
  color: #fff;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 1280px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
  @media all and (max-width: 980px) {
    font-size: 14px;
  }
`;
const Question = styled.b`
  margin-left: 10px;
  width: 80%;
  font-size: 24px;
  color: #393e3c;
  @media all and (max-width: 1280px) {
    font-size: 18px;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
    width: 90%;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
    width: 100%;
  }
  /* font-family: gordita_medium !important; */
`;
const B = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  color: #282828;
  font-family: "gordita_medium" !important;
  @media all and (max-width: 1050px) {
    margin-bottom: 20px;
  }
  @media all and (max-width: 980px) {
    margin-bottom: 16px;
    font-size: 16px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 40px;
  @media all and (max-width: 480px) {
    justify-content: center;
  }
`;
const Button = styled.div`
  width: 140px;
  height: 45px;
  display: flex;
  background: #4ca473;
  color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  @media all and (max-width: 980px) {
    width: 130px;
    height: 40px;
  }
  @media all and (max-width: 640px) {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
  @media all and (max-width: 360px) {
    width: 100px;
    height: 30px;
  }
`;
const ButtonClear = styled.div`
  margin-right: 15px;
  width: 140px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid #4ca473;
  font-size: 16px;
  cursor: pointer;
  @media all and (max-width: 980px) {
    width: 130px;
    height: 40px;
  }
  @media all and (max-width: 640px) {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
  @media all and (max-width: 360px) {
    width: 100px;
    height: 30px;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  display: none;
  text-align: right;
  position: absolute;
  /* bottom: -22px; */
  left: 0;
  bottom: -30px;

  &.error-active {
    display: block;
  }
`;
