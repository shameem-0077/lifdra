import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function VacationFAQSection() {
    const [faq, setFaq] = useState([
        {
            id: 1,
            question: "വെക്കേഷൻ പ്രോഗ്രാം സർട്ടിഫിക്കറ്റ് ലഭ്യമാണോ?",
            answer: "Steyp-ന്റെ വെക്കേഷൻ കോഴ്സിൽ പങ്കെടുക്കുന്ന എല്ലാ വിദ്യാർഥികൾക്കും സർട്ടിഫയ്ഡ് സർട്ടിഫിക്കറ്റ് ലഭിക്കുന്നതാണ്. Steyp-ന്റെ പ്ലാറ്റ്ഫോംമിൽ നിന്ന് വിദ്യാർത്ഥിക്ക് തന്നെ Dowload ചെയ്ത് എടുക്കാവുന്നതാണ്.",
        },
        {
            id: 2,
            question: "രണ്ട് മാസം മാത്രമാണോ ഈ പ്രോഗ്രാമിന്റെ കാലാവധി?",
            answer: "രണ്ട് മാസം മാത്രമല്ല താല്പര്യമെങ്കിൽ തുടർന്നും നിങ്ങൾക്ക് പഠിക്കാൻ കഴിയുന്ന രീതിയിലാണ് വെക്കേഷൻ പ്ലാൻ സ്‌റ്റെയ്‌പ് ഒരിക്കിയിട്ടുള്ളത്.",
        },
        {
            id: 3,
            question: "ഏതു സമയത്തും ക്ലാസ്സ് Attend ചെയ്യാൻ സാധിക്കുമോ?",
            answer: "Individual Learning System ആണ് Steyp പ്ലാറ്റ്ഫോമിൽ ഒരുക്കിയിരിക്കുന്നത്‌. കുട്ടികൾ ഏതു സമയത്താണോ ഫ്രീ ആകുന്നത് ആ സമയത്ത് ക്ലാസ്സുകൾ കാണാവുന്നതാണ്. അക്കാദമിക്സിനൊപ്പം തന്നെ കുട്ടികൾക്ക് ഈ പ്രോഗ്രാം പൂർത്തിയാക്കാൻ സാധിക്കും.",
        },
        {
            id: 4,
            question: "വെക്കേഷൻ പ്രോഗ്രാമിന്റെ പഠനരീതി എങ്ങനെയാണ്?",
            answer: "സ്റ്റെയ്‌പിന്റെ വെക്കേഷൻ പ്രോഗ്രാമിൽ കുട്ടികൾ വന്ന് പഠിക്കേണ്ടതില്ല. ഓരോ കുട്ടിക്കും Complete  ഓൺലൈനായി Steyp-ന്റെ പ്ലാറ്റ്ഫോമിലൂടെ ഈ പ്രോഗ്രാം പൂർത്തിയാക്കാൻ സാധിക്കും.",
        },
        {
            id: 5,
            question:
                "രണ്ട് മാസത്തിന്റെ ഉള്ളിൽ പൂർത്തിയാക്കാൻ പറ്റുന്ന പ്രോഗ്രാമാണോ?",
            answer: "രണ്ട് മാസം കൊണ്ട് Web Development പൂർത്തിയാക്കാൻ സാധിക്കും. തുടർന്ന് പഠിക്കാൻ ആഗ്രഹിക്കുന്നവർക്ക് ഒരു വർഷം വരെ ഫീസ് അടച്ചു പഠിക്കാവുന്നതാണ്.",
        },
        {
            id: 6,
            question: "വെക്കേഷൻ പ്രോഗ്രാം സർട്ടിഫിക്കറ്റ് ലഭ്യമാണോ?",
            answer: "60 ദിവസത്തെ കോഴ്സ് പൂർത്തീകരിക്കുമ്പോൾ വിദ്യാർഥികൾക്ക് വെക്കേഷൻ കോഴ്സ്  കംപ്ലീഷൻ സർട്ടിഫിക്കറ്റ് ലഭിക്കുന്നതാണ്.",
        },
        {
            id: 7,
            question: "എങ്ങനെയാണ് Doubt Clear ചെയ്യാൻ സാധിക്കുക?",
            answer: "പ്ലാറ്റ്ഫോം സംബന്ധമായും പഠന സംബന്ധമായുമുള്ള ഏത് സംശയങ്ങൾക്കും ഉത്തരം നൽകാൻ 24×7 എഞ്ചിനീയേഴ്സിന്റെ സഹായം ലഭ്യമാണ്.",
        },
        {
            id: 8,
            question: "എങ്ങനെയാണ് പെയ്മെന്റ് ചെയ്യാൻ സാധിക്കുക?",
            answer: "സ്റ്റെപ് 1: www.steyp.com വെബ്സൈറ്റ് വഴി ലോഗിൻ ചെയ്യുക.\n\n സ്റ്റെപ് 2: ലോഗിൻ ചെയ്തതിനുശേഷം vacation program തിരഞ്ഞെടുക്കുക.\n\n സ്റ്റെപ് 3: Vacation program തിരഞ്ഞെടുത്തതിനുശേഷം Credit card, Debit card, Net banking, UPI എന്നിവയിലേതെങ്കിലും മാർഗ്ഗം ഉപയോഗപ്പെടുത്തി Payment ചെയ്യാവുന്നതാണ്.",
        },

        {
            id: 9,
            question: "Refund പോളിസി നിങ്ങൾ നൽകുന്നുണ്ടോ?",
            answer: "ഉണ്ട്. അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്ത് ആദ്യത്തെ പെയ്മെന്റിന് ശേഷമുള്ള ഏഴ് ദിവസത്തിനുള്ളിലാണ് Refund ലഭ്യമാവുക.",
        },
        {
            id: 10,
            question: "Certificate-ന് Value ഉണ്ടോ?",
            answer: "ഉണ്ട്. ഓരോ കുട്ടിക്കും പ്രോഗ്രാം കഴിയുമ്പോൾ പ്രൊഫഷണൽ അച്ചീവ്മെന്റ് സർട്ടിഫിക്കറ്റാണ് നൽകുന്നത്. ഓൺലൈനായി കുട്ടിക്ക് സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ് ചെയ്തെടുക്കാവുന്നതാണ്.",
        },
    ]);
    const [selectedFaq, setSelectedFaq] = useState("");
    return (
        <Contaniner className="wrapper">
            <Title>
                <span>Frequently</span>
                <br />
                Asked Questions
            </Title>
            <FaqContainer>
                {/* <QuestionType>General</QuestionType> */}
                {faq.map((data) => (
                    <FaqCard
                        onClick={() =>
                            setSelectedFaq(
                                data.id === selectedFaq ? "" : data.id
                            )
                        }
                        className={data.id === selectedFaq && "active"}
                    >
                        <FaqQuestionCard>
                            <Question>{data.question}</Question>
                            <Arrow
                                className={data.id === selectedFaq && "active"}
                            >
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/down-arrow.svg"
                                    }
                                />
                            </Arrow>
                        </FaqQuestionCard>
                        <Answer className={data.id === selectedFaq && "active"}>
                            {data.answer}
                        </Answer>
                    </FaqCard>
                ))}
            </FaqContainer>
        </Contaniner>
    );
}

export default VacationFAQSection;

const Contaniner = styled.div`
    padding: 150px 0;
    @media all and (max-width: 1280px) {
        padding: 60px 0 120px;
    }
    @media all and (max-width: 768px) {
        padding: 100px 0 80px;
    }
    @media all and (max-width: 768px) {
        padding: 80px 0 60px;
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    color: #2d2d2d;
    text-align: center;
    margin-bottom: 80px;
    font-size: 34px;
    span {
        color: #2334a7;
    }
    @media all and (max-width: 1280px) {
        margin-bottom: 50px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 20px;
        font-size: 26px;
    }
`;

const FaqContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;
const QuestionType = styled.h4`
    font-family: gordita_medium;
    color: #2d2d2d;
    font-size: 20px;
    margin-bottom: 20px;
    @media all and (max-width: 480px) {
        font-size: 18px;
    }
`;
const FaqCard = styled.div`
    background-color: #f4f5fa;
    padding: 0 30px;

    border-radius: 8px;
    min-height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &.active {
        background-color: #e7eaf7;

        padding-bottom: 20px;
    }
    :last-child {
        margin-bottom: 0;
    }
`;
const FaqQuestionCard = styled.div`
    min-height: 60px;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Question = styled.h3`
    font-size: 18px;
    font-family: gordita_medium;
    padding: 10px 0;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;

const Arrow = styled.span`
    display: block;
    width: 18px;
    min-width: 18px;
    margin-left: 10px;
    transition: all 0.3s;
    img {
        display: block;
        width: 100%;
    }
    &.active {
        transform: rotate(180deg);
    }
`;

const Answer = styled.p`
    font-size: 16px;
    color: #7d7e82;
    overflow-y: scroll;
    height: 0px;
    white-space: pre-line;
    /* max-height: 150px; */
    margin-right: -20px;
    transition: all 0.3s;
    &::-webkit-scrollbar {
        display: none;
    }
    &.active {
        height: auto;
        padding: 10px 0;
        background: #e7eaf7;
    }
    @media all and (max-width: 460px) {
        font-size: 13px;
    }
`;

const AnswerLink = styled(Link)``;
