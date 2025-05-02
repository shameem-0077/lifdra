import React from "react";
import styled from "styled-components";
import FreeLessonsNewCard from "./FreeLessonsNewCard";

export default function MobileLessonLoopCard({ data }) {
    return (
        <LoopContainer>
            <TitleContainer>
                <Title>{data.name}</Title>
            </TitleContainer>
            <CardsContainer className="lessons-slider">
                {data.topics.map((data, index) => (
                    <FreeLessonsNewCard key={index} data={data} />
                ))}
            </CardsContainer>
        </LoopContainer>
    );
}

const LoopContainer = styled.div`
    margin-bottom: 18px;
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 768px) {
        margin-bottom: 26px;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 0 18px;
    @media (max-width: 640px) {
        margin-bottom: 14px;
    }
`;
const Title = styled.h3`
    font-family: "gordita_bold";
    font-size: 21px;
    color: #737373;
    @media (max-width: 640px) {
        font-size: 18px;
    }
`;
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    gap: unset;
    padding: 0 18px;
    &::-webkit-scrollbar {
        display: none;
    }
`;
