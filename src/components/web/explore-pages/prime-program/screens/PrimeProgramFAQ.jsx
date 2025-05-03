import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

function FAQSection() {
    const [faq, setFaq] = useState([
        {
            id: 1,
            question: "Will I get certificate for courses?",
            answer: "Yes, Prime programs comes with certificate. After completing the program you get unlock the certificate.",
        },
        {
            id: 2,
            question: "Do I get support for tech questions?",
            answer: "We provide platform related support for queries. Technical support for the programs will be provided for our Techies Hub program.",
        },
        {
            id: 3,
            question:
                "Do we have to pay a separate fee for the future program?",
            answer: "While you are in the subscription you are not required to pay extra for the future program that is going to be released",
        },
        {
            id: 4,
            question: "Can I cancel my Subscription or refund period?",
            answer: "We do not charge automatically to renew your membership. We will notify you so.",
        },
        {
            id: 5,
            question: "Can I download videos?",
            answer: "As our videos are hosted on our online platform. Offline downloaded videos are not available.",
        },
    ]);
    const [selectedFaq, setSelectedFaq] = useState("");
    return (
        <Contaniner className="wrapper">
            <Title>Frequently Asked Questions</Title>
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
                                    alt="arrow"
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
    background-color: #f8fbf4;
    padding: 0 30px;

    border-radius: 4px;
    min-height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &.active {
        background-color: #e0f2ca;

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
    @media all and (max-width: 360px) {
        width: 18px;
        min-width: 18px;
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
        background-color: #e0f2ca;
    }
    @media all and (max-width: 460px) {
        font-size: 13px;
    }
`;

const AnswerLink = styled(Link)``;
