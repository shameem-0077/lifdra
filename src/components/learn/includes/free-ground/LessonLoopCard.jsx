import React, { useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FreeLessonsNewCard from "./FreeLessonsNewCard";

export default function LessonLoopCard({ data }) {
    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <LoopContainer className="anim-fade">
            <TitleContainer>
                <Title>{data.name}</Title>
            </TitleContainer>
            <CardsContainer className="lessons-slider">
                <SlideWrapper>
                    {data.topics.map((data, index) => (
                        <FreeLessonsNewCard key={index} data={data} />
                    ))}
                </SlideWrapper>
            </CardsContainer>
        </LoopContainer>
    );
}

const LoopContainer = styled.div`
    margin-bottom: 28px;
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 768px) {
        padding: 0 7px;
        margin-bottom: 26px;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 22px;
    @media (max-width: 640px) {
        margin-bottom: 14px;
    }
`;
const Title = styled.h3`
    font-family: "gordita_medium";
    font-size: 18px;
    color: #737373;
    @media (max-width: 640px) {
        font-size: 18px;
    }
`;
const ButtonsContainer = styled.div`
    display: flex;
`;
const CardsContainer = styled.div`
    padding: 0 22px;
`;
const SlideWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        grid-row-gap: 11px;
    }
`;
