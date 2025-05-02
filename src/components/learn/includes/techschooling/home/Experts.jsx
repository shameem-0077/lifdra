import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider from "react-slick";
import { communityConfig } from "../../../../../axiosConfig";

export default function Experts() {
    const [page, setPage] = useState(1);
    const [team, setTeam] = useState([]);
    const [pagination, setPagination] = useState([]);
    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const handlePaginations = () => {
        pagination.has_next_page && setPage(page + 1);
    };
    
    useEffect(() => {
        const fetchData = () => {
            communityConfig
                .get("/team/team-members/tech-schooling/", {
                    params: {
                        page: page,
                    },
                })
                .then((response) => {
                    const { StatusCode, data, pagination_data } = response.data;
                    if (StatusCode === 6000) {
                        setTeam((prev) => prev.concat(data));
                        setPagination(pagination_data);
                    }
                })
                .catch((error) => console.log(error));
        };
        fetchData();
    }, [page]);

    const settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // centerPadding: "50px",
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <MainContainer className="experts-slider">
            <Title>Our expert team is behind you</Title>
            <Description className="g-regular">
                An expert panel of team members including Students Relationship
                Managers, Support Engineers, Student Coordinators will be
                available for a student 24/7 for follow up and support
            </Description>

            <PrevArrow onClick={previous}>
                <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.svg"
                    alt="Arrow"
                    width="100%"
                />
            </PrevArrow>
            <NextArrow onClick={next}>
                <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.svg"
                    alt="Arrow"
                    width="100%"
                />
            </NextArrow>

            <CardWrapper
                {...settings}
                ref={(c) => {
                    slider = c;
                }}
                afterChange={(e) => {
                    if (e === team.length - 3) {
                        handlePaginations();
                    }
                }}
            >
                {team.map((team_member) => (
                    <Cards key={team_member.id}>
                        <CardImage src={team_member.photo} alt="" />
                        <CardName>{team_member.name}</CardName>
                        <CardDesignation>
                            {team_member.designation}
                        </CardDesignation>
                    </Cards>
                ))}
            </CardWrapper>
        </MainContainer>
    );
}

const CardWrapper = styled(CardSlider)`
    padding: 0 50px;
    @media (max-width: 1400px) {
        padding: 0 35px;
    }
    @media (max-width: 480px) {
        padding: 0 10px;
    }
    .slick-slide {
        height: inherit;
        display: flex !important;
    }
    .slick-track {
        display: flex !important;
    }
    .slick-slide > div {
        display: flex !important;
        width: 100%;
    }
`;
const MainContainer = styled.div`
    text-align: center;
    position: relative;
    padding: 45px 0 55px;
    @media (max-width: 768px) {
        padding: 35px 0 45px;
    }
    @media (max-width: 480px) {
        padding: 32px 32px 42px;
    }
`;
const Title = styled.h1`
    text-align: center;
    font-family: "gordita_medium";
    font-size: 30px;
    margin-bottom: 0px;
    @media all and (max-width: 980px) {
        font-size: 24px;
    }
    @media all and (max-width: 768px) {
        font-size: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 21px;
    }
`;

const Description = styled.h3`
    color: #8d98a5;
    margin: 3px auto 20px;
    font-size: 15px;
    max-width: 80%;
    @media (max-width: 768px) {
        max-width: 82%;
    }
    @media (max-width: 480px) {
        font-size: 13px;
        margin-top: 3px;
        width: 100%;
        max-width: unset;
    }
`;

const Cards = styled.div`
    text-align: left;
    background: #f5f5f5;
    border-radius: 5px;
    width: 50%;
    display: inline-block;
    padding: 30px;
    @media (max-width: 1440px) {
        padding: 20px;
    }
    @media (max-width: 1280px) {
        padding: 15px;
    }
`;
const PrevArrow = styled.div`
    width: 42;
    height: 42px;
    position: absolute;
    left: 0;
    top: 60%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
    }
`;
const NextArrow = styled.div`
    width: 42;
    height: 42px;
    position: absolute;
    right: 0;
    top: 60%;
    transform: translateY(-50%);
    z-index: 50;
    cursor: pointer;
    @media (max-width: 980px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
    }
`;
const CardImage = styled.img`
    width: 70%;
    margin: 0 auto;
`;

const CardName = styled.h2`
    padding-top: 9px;
    font-size: 21px;
    &:after {
        content: "";
        border-bottom: 3px solid #fad32b;
        display: block;
        width: 66px;
    }
    @media (max-width: 1280px) {
        font-size: 20px;
    }
    @media (max-width: 980px) {
        font-size: 20px;
    }
    @media (max-width: 640px) {
        font-size: 19px;
    }
    @media (max-width: 360px) {
        font-size: 17px;
    }
`;

const CardDesignation = styled.h4`
    color: #8d98af;
    font-size: 14px;
    font-family: "gordita_medium";
`;
