import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FAQSection({ type }) {
    const [faq, setFaq] = useState([
        {
            id: 1,
            question: "ടെക്ക് സ്ക്കൂളിങ്ങിന്റെ പഠനരീതി എങ്ങനെയാണ്?",
            answer: "ടെക്ക് സ്ക്കൂളിങ്ങിൽ കുട്ടികൾ വന്ന് പഠിക്കേണ്ടതില്ല. ഓരോ കുട്ടിക്കും Complete ഓൺലൈനായി Steyp-ന്റെ പ്ലാറ്റ്ഫോമിലൂടെ ഈ പ്രോഗ്രാം പൂർത്തിയാക്കാൻ സാധിക്കും.",
        },
        {
            id: 2,
            question:
                "ടെക്ക് സ്ക്കൂളിങ്ങിന്റെ ഒന്നാം വർഷ സിലബസിൽ എന്തൊക്കെയാണ് ഉൾപ്പെടുത്തിയിരിക്കുന്നത്?",
            answer: "വെബ്സൈറ്റ് ഡെവൽപ്പ്മെന്റിന്റെ അടിസ്ഥാനമായ HTML മുതൽ മൊബൈൽ ആപ്ലിക്കേഷൻ ഡെവലപ്മെന്റ് വരെയുള്ള സിലബസാണ് ടെക്ക് സ്ക്കൂളിങ്ങിൽ ഒരുക്കിയിരിക്കുന്നത്. വെബ്സൈറ്റ് ഡെവലപ്മെന്റ്, വെബ് ആപ്ലിക്കേഷൻ ഡെവലപ്മെന്റ്, മൊബൈൽ ആപ്ലിക്കേഷൻ ഡെവലപ്മെന്റ് എന്നീ പ്രൊഫഷനുകളിൽ സ്കിൽ നേടാൻ ടെക്കീസ് ക്ലബ്ബിലൂടെ സാധിക്കും.",
        },
        {
            id: 3,
            question:
                "ടെക്ക് സ്ക്കൂളിങ്ങിൽ  അംഗമാകുന്നതിനുള്ള  കുറഞ്ഞ  പ്രായപരിധി എത്രയാണ്?",
            answer: "അഞ്ചാം ക്ലാസ്സ്  മുതൽ പന്ത്രണ്ടാം ക്ലാസ്സ് വരെയുള്ള കുട്ടികൾക്കാണ് ടെക്ക് സ്ക്കൂളിങ്ങിന്റെ പ്രോഗ്രാം തയ്യാറാക്കിയിരിക്കുന്നത്. 10 വയസ്സ് മുതലുള്ള ഏതൊരു കുട്ടിക്കും ടെക്ക് സ്ക്കൂളിങ്ങിൽ ജോയിൻ ചെയ്യാവുന്നതാണ്.",
        },
        {
            id: 4,
            question: "ടെക്ക് സ്ക്കൂളിങ്ങിൽ എങ്ങനെ പഠിക്കാം?",
            answer: "നിങ്ങൾ ഇഷ്ടപ്പെടുന്ന സമയത്ത് ഇഷ്ടപ്പെടുന്ന സ്ഥലത്തിരുന്ന് ഓൺലൈനായിട്ടുതന്നെ നിങ്ങളുടെ ഇഷ്ടമുള്ള Device-ലൂടെ പഠിക്കാൻ സാധിക്കും. മൊബൈൽ, ടാബ്ലെറ്റ്, ലാപ്ടോപ്, ഡെസ്ക്ടോപ്പ് എന്നിങ്ങനെ ഏത് ഡിവൈസുകൾ ഉപയോഗിച്ചും ടെക്ക് സ്ക്കൂളിങ്ങിൽ പഠനം നടത്താം. എന്നാൽ പ്രാക്ടീസ് ചെയ്തു പഠിക്കാനായി ഡെസ്ക്ടോപ് കമ്പ്യൂട്ടർ അല്ലെങ്കിൽ ലാപ്ടോപ് ആവശ്യമാണ്.",
        },
        {
            id: 5,
            question:
                "ടെക്ക് സ്ക്കൂളിങ്ങിൽ കുട്ടികളുടെ പഠന നിലവാരം വിലയിരുത്തുന്നത് എങ്ങനെയാണ്?",
            answer: "വിദ്യാർത്ഥികൾക്ക് കൃത്യമായ ഇടവേളകളിൽ പ്രാക്ടീസ്, വർക്ക്ഷോപ്പ്, അസ്സെസ്സ്മെന്റ് എന്നിവ ഉണ്ടായിരിക്കുന്നതാണ്. വിദഗ്‌ദ്ധരായ എൻജിനീയർമാരുടെ നേതൃത്വത്തിൽ ഇത് വിശകലനം ചെയ്താണ് ഓരോ കുട്ടിയുടെയും പഠന നിലവാരം വിലയിരുത്തുന്നത്.",
        },
        {
            id: 6,
            question: "Practice, Workshop, Assessment എന്നിവ എങ്ങനെയാണ്?",
            answer: "ടെക്ക് സ്ക്കൂളിങ്ങിൽ കൃത്യമായ ഇടവേളകളിൽ പഠിച്ച കാര്യങ്ങൾ ചെയ്തു നോക്കുന്നതിനു വേണ്ടി Practice ഉണ്ടായിരിക്കുന്നതാണ്. Practice എങ്ങനെയായിരിക്കണം ചെയ്യേണ്ടത് എന്ന് വിശദമാക്കുന്ന ഒരു വീഡിയോ Workshop Section-ൽ ലഭ്യമാണ്.  കൃത്യമായ ഇടവേളകളിൽ Assessment ഉണ്ടായിരിക്കുന്നതാണ്.",
        },
        {
            id: 7,
            question: "ഏതു സമയത്തും ക്ലാസ്സ്   Attend ചെയ്യാൻ സാധിക്കുമോ?",
            answer: "Individual Learning System ആണ് Steyp പ്ലാറ്റ്ഫോമിൽ ഒരുക്കിയിരിക്കുന്നത്‌. കുട്ടികൾ ഏതു സമയത്താണോ ഫ്രീ ആകുന്നത് ആ സമയത്ത് ക്ലാസ്സുകൾ കാണാവുന്നതാണ്. അക്കാദമിക്സിനൊപ്പം തന്നെ കുട്ടികൾക്ക് ഈ പ്രോഗ്രാം പൂർത്തിയാക്കാൻ സാധിക്കും.",
        },
        {
            id: 8,
            question:
                "ഒരു വർഷത്തിനുള്ളിൽ പൂർത്തിയാക്കാൻ പറ്റുന്ന പ്രോഗ്രാമാണോ?",
            answer: "അഞ്ചാം ക്ലാസ്സ് മുതൽ പ്ലസ്‌ടു വരെയുള്ള കുട്ടികൾക്ക് ഒരു വർഷത്തിനുള്ളിൽ പൂർത്തിയാക്കാൻ കഴിയുന്ന തരത്തിലുള്ള ക്ലാസ്സുകളാണ്   ടെക്ക് സ്ക്കൂളിങ്ങിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്നത്.",
        },
        {
            id: 9,
            question: "സ്കൂൾ പഠനത്തോടൊപ്പം കൊണ്ടുപോകാൻ സാധിക്കുന്ന സിലബസ് ആണോ?",
            answer: "തീർച്ചയായും. കുട്ടികൾ എല്ലാ ദിവസവും അവരുടെ ഏതെങ്കിലും ഒരു മണിക്കൂർ ഒഴിവുസമയം ടെക്കീസ് ക്ലബിന്റെ പഠനത്തിനായി കൃത്യമായി ഉപയോഗിച്ചാൽ, അതുവഴി ആ കുട്ടിക്ക് ഒരു എഞ്ചിനീയർ ആകുവാൻ സാധിക്കും.",
        },
        {
            id: 10,
            question: "ടെക്കീസ് ക്ലബ്ബിലെ പ്രോഗ്രാമിന്റെ കാലാവധി?",
            answer: "ഒരു വർഷമാണ് പ്രോഗ്രാമിന്റെ കാലാവധി. ഒരു വർഷം കൊണ്ട് പ്രോഗ്രാം പൂർത്തിയായില്ലെങ്കിൽ വീണ്ടും Renew ചെയ്തുകൊണ്ട് ടെക്കീസ് ക്ലബ്ബിലെ പ്രോഗ്രാം പൂർത്തിയാക്കാവുന്നതാണ്. ",
        },
        {
            id: 11,
            question: "സർട്ടിഫിക്കറ്റുകൾ എങ്ങനെയാണ് ലഭിക്കുന്നത്?",
            answer: "ഓരോ പ്രൊഫഷനുകളും വിജയകരമായി പൂർത്തിയാക്കിയതിനുശേഷം ഓൺലൈൻ ആയാണ് സർട്ടിഫിക്കറ്റുകൾ ലഭിക്കുന്നത്.",
        },
        {
            id: 12,
            question: "എങ്ങനെയാണ് Doubt Clear ചെയ്യാൻ സാധിക്കുക?",
            answer: "പ്ലാറ്റ്ഫോം സംബന്ധമായും പഠന സംബന്ധമായുമുള്ള ഏത് സംശയങ്ങൾക്കും ഉത്തരം നൽകാൻ 24×7 എഞ്ചിനീയേഴ്സിന്റെ സഹായം ലഭ്യമാണ്.",
        },
        {
            id: 13,
            question: "ടെക്കീസ് ക്ലബ്ബിലെ ഫീസ് എത്രയാണ്?",
            answer: "ടെക്ക് സ്ക്കൂളിങ്ങിൽ പ്രതിമാസം 500 രൂപ നിരക്കിലാണ്  മെമ്പർഷിപ്പ് എടുത്ത് പഠിക്കാൻ സാധിക്കുന്നത്. ഒരു വർഷം ഒന്നിച്ചു ഫീസ്  അടക്കുമ്പോൾ 4000 രൂപയാണ്  ഫീസ്.",
        },
        {
            id: 14,
            question: "എങ്ങനെയാണ് പെയ്മെന്റ് ചെയ്യാൻ സാധിക്കുക?",
            answer: "സ്റ്റെപ് 1: www.steyp.com വെബ്സൈറ്റ് വഴി ലോഗിൻ ചെയ്യുക.\n\n സ്റ്റെപ് 2: ലോഗിൻ ചെയ്തതിനുശേഷം ഇഷ്ടമുള്ള Package തിരഞ്ഞെടുക്കുക.\n\n സ്റ്റെപ് 3: Package തിരഞ്ഞെടുത്തതിനുശേഷം Credit card, Debit card, Net banking, UPI എന്നിവയിലേതെങ്കിലും മാർഗ്ഗം ഉപയോഗപ്പെടുത്തി Payment ചെയ്യാവുന്നതാണ്.",
        },
        {
            id: 15,
            question: "Refund പോളിസി നിങ്ങൾ നൽകുന്നുണ്ടോ? ",
            answer: "ഉണ്ട്. അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്ത് ആദ്യത്തെ പെയ്മെന്റിന് ശേഷമുള്ള ഏഴ് ദിവസത്തിനുള്ളിലാണ് Refund ലഭ്യമാവുക.",
        },
        {
            id: 16,
            question: "Certificate-ന്  Value  ഉണ്ടോ?",
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
                        type={type}
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
                        <Answer
                            className={data.id === selectedFaq && "active"}
                            type={type}
                        >
                            {data.answer}
                        </Answer>
                    </FaqCard>
                ))}
            </FaqContainer>
        </Contaniner>
    );
}

export default FAQSection;

const Contaniner = styled.div`
    padding: 80px 0 150px;
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
        color: #0fa76f;
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
    max-width: 800px;
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
    background-color: ${(props) =>
        props.type === "vacation" ? "#F8FBF4" : "#fbf5f2"};
    padding: 0 30px;

    border-radius: 4px;
    min-height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &.active {
        background-color: ${(props) =>
            props.type === "vacation" ? "#F8FBF4" : "#faeae2"};
        background-color: ${(props) =>
            props.type === "vacation" ? "#F3F9EB" : "#faeae2"};

        padding-bottom: 20px;
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
    font-size: 16px;
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
    width: 20px;
    min-width: 20px;
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
    color: #545454;
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
        background-color: ${(props) =>
            props.type === "vacation" ? "#F3F9EB" : "#faeae2"};
    }
    @media all and (max-width: 460px) {
        font-size: 13px;
    }
`;

const AnswerLink = styled(Link)``;
